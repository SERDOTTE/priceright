// import OrderForm from "@/components/orders/OrderForm";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
                <p className="text-slate-500">Capture client requirements and generate a quote.</p>
            </div>
            <div className="flex max-sm:flex-col max-sm:gap-2 max-sm:items-start sm:max-w-250 my-0 mx-auto justify-between items-center rounded-lg mb-6 shadow-md/20 p-8 max-w-7xl ">
                <div className="container mx-auto py-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Form Section */}
                        <div className="md:col-span-2">
                            {/* <OrderForm customers={null}/> */}
                        </div>

                        {/* Sidebar Summary */}
                        <div className="md:col-span-1">
                            <div className="sticky top-24">
                                {/* <PriceSummary /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}