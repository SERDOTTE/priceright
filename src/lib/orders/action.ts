'use server'

import { createClient } from "../supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";

const CustomerFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Customer's name is required.")
        .max(100, "Name must be less than 100 characters."),
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address.")
        .max(50, "Email must be less than 50 characters."),
    country: z
        .string()
        .trim()
        .min(1, "Country is required")
        .max(100, "Country must be less than 100 characters"),
    phone: z
        .string()
        .trim()
        .min(1, "Customer's phone number is required.")
        .max(
            20,
            "Phone number must be less than 20 characters."
        ),
});

export type State = {
    errors?: {
        name?: string[];
        email?: string[];
        country?: string[]
        phone?: string[]
    };
    message?: string | null;
    success?: boolean;
}

/**
 * Converts FormData into a validated object.
 */
function getCustomerData(
    formData: FormData
) {
    return {
        name:
            String(
                formData.get("name") ?? ""
            ),
        email:
            String(
                formData.get("email") ?? ""
            ),
        country:
            String(
                formData.get("country") ?? ""
            ),
        phone:
            String(
                formData.get("phone") ?? ""
            ),
    };
}


export async function createCustomer(prevState: State, formData: FormData): Promise<State> {

    const supabase = await createClient();
    const parsed = CustomerFormSchema.safeParse(getCustomerData(formData));
    // if (!parsed.success) {
    //     throw new Error('Invalid project input.' + parsed.error.toString());
    // }
    if (!parsed.success) {
        return {
            errors: parsed.error.flatten().fieldErrors,
            message: 'Missing or invalid fields. Failed to create project.',
        };
    }

    const { name, email, country, phone } = parsed.data;

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return { message: 'Unauthorized: You must be logged in.' };
        }
        const { data, error } = await supabase
            .from('customers')
            .insert({
                user_id: user.id,
                name,
                email,
                country,
                phone,
            });
        if (error) {
            console.error("Supabase insert error:", error);
            return { message: 'Database error: Failed to create customer.' };
        }
        revalidatePath('/dashboard/customers');
        return { success: true, message: 'Customer created successfully!' };
    } catch (error) {
        console.error("Unexpected error:", error);
        return {
            message: 'Database Error: Failed to create project.'
        }
    }
}

// export async function deleteProject(id: number) {
//     await sql`DELETE FROM projects WHERE id = ${id}`;
//     revalidatePath('/projects');
// }

// export async function updateProject(id: string | number, prevState: State, formData: FormData): Promise<State> {
//     const parsed = ProjectFormSchema.safeParse(getProjectData(formData));

//     if (!parsed.success) {
//         return {
//             errors: parsed.error.flatten().fieldErrors,
//             message: 'Missing or invalid fields. Failed to create project.',
//         };
//     }

//     const { title, description, type, technologies, link } = parsed.data;

//     try {
//         await sql`UPDATE projects  
//         SET 
//         title = ${title},
//         description = ${description},
//         type = ${type},
//         technologies = ${technologies as any}::text[],
//         link = ${link}
//         WHERE id = ${id}`;
//     } catch (error) {
//         // throw new Error("Failed to update project.");
//         return {
//             message: 'Database Error: Failed to create project.'
//         }
//     }
//     revalidatePath('/projects');
//     revalidatePath('/projects/edit');
//     return {
//         message: 'Project updated successfully.',
//         errors: {},
//         success: true,
//     };
// }

export async function selectAllCustomers() {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase
            .from('customers')
            .select('*');
        if (error) throw error;
        return data;
        console.log(data);
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}


