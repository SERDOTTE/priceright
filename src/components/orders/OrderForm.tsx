// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Customer } from "@/lib/orders/db";



// interface OrderFormProps {
//   customers: Customer[] | null;
// }

// export default function OrderForm({ customers }: OrderFormProps) {
//   const [formData, setFormData] = useState({
//     customerId: "",
//     description: "",
//     price: "",
//     dueDate: "",
//   });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Implementation for Supabase mutation
//     console.log("Submitting order:", formData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
//       <div className="space-y-2">
//         <label className="text-sm font-medium">Customer</label>
//         <Select value={formData.customerId}onValueChange={(val) => setFormData({ ...formData, customerId: val })}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select a customer" />
//           </SelectTrigger>
//           <SelectContent>
//             {customers.map((customer) => (
//               <SelectItem key={customer.id} value={customer.id}>
//                 {`${customer.first_name} ${customer.last_name}`}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <label className="text-sm font-medium">Order Description</label>
//         <Input 
//           required 
//           placeholder="Brief summary of work" 
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//         />
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Price ($)</label>
//           <Input 
//             type="number" 
//             required 
//             placeholder="0.00" 
//             className="tabular-nums"
//             onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           />
//         </div>
//         <div className="space-y-2">
//           <label className="text-sm font-medium">Due Date</label>
//           <Input 
//             type="date" 
//             required 
//             onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
//           />
//         </div>
//       </div>

//       <Button type="submit" className="block bg-callout bg text-white hover:bg-brand/90 cursor-pointer w-auto ml-auto">
//         + Create Order
//       </Button>
//     </form>
//   );
// }