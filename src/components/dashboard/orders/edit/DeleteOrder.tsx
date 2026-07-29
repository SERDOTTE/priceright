'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteOrder } from "@/lib/orders/action";

interface DeleteProps {
    id: string | number;
}

export default function Delete({ id }: DeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;
        setIsDeleting(true);

        try {
            const promise = async () => {
                const res = await deleteOrder(id);
                if (!res.success) {
                    throw new Error(res.message || "Failed to delete order");
                }
                return res;
            };

            await toast.promise(promise(), {
                loading: "Deleting Order...",
                success: "Order deleted successfully!",
                error: (err) => err.message || "Failed to delete Order. Please try again.",
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ color: '#FF4A3C' }}
            className="inline-flex items-center justify-center size-7 rounded-lg border border-action/30 bg-action/10 hover:bg-action/20 transition-all disabled:opacity-50"
            title="Delete Order"
        >
            <Trash2 className="size-3.5" />
        </button>
    );
}