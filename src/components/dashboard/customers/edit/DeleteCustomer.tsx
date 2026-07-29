'use Client'

import { useState } from "react";
import { toast } from "sonner";
import { deleteCustomer } from "@/lib/customers/action";
import { Trash2 } from "lucide-react";

interface DeleteProps {
    id: string | number;
}

export default function Delete({ id }: DeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);
        try {
            await toast.promise(
                new Promise((resolve, reject) => {
                    deleteCustomer(id)
                        .then(() => resolve(true))
                        .catch((error) => reject(error));
                }),
                {
                    loading: "Deleting Customer...",
                    success: () => "Customer deleted successfully!",
                    error: "Failed to delete Customer. Please try again.",
                }
            );
            // window.location.reload();
        } catch {
            setIsDeleting(false);
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ color: '#FF4A3C' }}
            className="inline-flex items-center justify-center size-7 rounded-lg border border-action/30 bg-action/10 hover:bg-action/20 transition-all"
            title="Delete Order"
        >
            <Trash2 className="size-3.5" />
        </button>
    )
}