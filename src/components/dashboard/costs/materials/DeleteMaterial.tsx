'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { deleteMaterial } from "@/lib/costs/action";
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";

interface DeleteProps {
    id: string | number;
}

export default function Delete({ id }: DeleteProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [implemented, setIsImplemented] = useState(false);

    // const handleDelete = async () => {
    //     if (isDeleting) return;
    //     setIsDeleting(true);

    //     try {
    //         const promise = async () => {
    //             setIsDeleting(true);
    //             const res = await deleteMaterial(id);
    //             if (!res.success) {
    //                 throw new Error(res.message || "Failed to delete order");
    //             }
    //             return res;
    //         };

    //         await toast.promise(promise(), {
    //             loading: "Deleting Order...",
    //             success: "Order deleted successfully!",
    //             error: (err) => err.message || "Failed to delete Order. Please try again.",
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsDeleting(false);
    //         setIsOpen(false);
    //     }
    // };

    return (
        <div className="inline-flex">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger render={<Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-10 w-10 shrink-0"
                    title="Remove row"
                >
                    <Trash2 className="size-4" />
                </Button>} />
                <PopoverContent>
                    <PopoverHeader>
                        <PopoverTitle>Are you sure you want to delete this order?</PopoverTitle>
                        <PopoverDescription>
                            This action cannot be undone.
                        </PopoverDescription>
                    </PopoverHeader>
                    <div className="flex gap-2 justify-center">
                        {!implemented ? (
                            <>
                                <p className="italic font-serif text-left">This feature is not implemented yet as deleting a material would affect created orders. </p>
                            </>
                        ) : (
                            <>
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    variant={"outline"}
                                    className={"bg-white px-5"}
                                    disabled={isDeleting}
                                >
                                    No
                                </Button>
                                <Button
                                    variant={"destructive"}
                                    className={"bg-action text-white border-action px-5"}
                                    disabled={isDeleting}
                                    // onClick={handleDelete} 
                                >
                                    {isDeleting ? "Deleting..." : "Yes"}
                                </Button>
                            </>
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
