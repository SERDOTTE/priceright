import OrderNavLinks from "@/../components/orders/OrderNavLinks";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full">
      <div className="flex flex-col sm:flex-row w-full">
        <OrderNavLinks />
        {children}
      </div>
    </div>
  );
}
