import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-dvh w-full bg-header">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          <Image
            src="/licensed-image.jpg"
            alt="Retail shopping background"
            fill
            className="object-cover"
            priority
          />
          {/* Theme-aligned overlay for text readability */}
          <div className="absolute inset-0 bg-black opacity-85" />
        </div>

        {/* Content Container - Left Aligned */}
        <div className="relative flex h-full items-center px-0 sm:px-12 max-sm:flex max-sm:justify-center max-sm:text-center">
          <div className="w-[62.5%] max-sm:w-[90%] p-8 rounded-lg sm:ml-12 text-text-body">
            <section>
              <h1 className="text-hero font-black leading-tight">
                Always Pay the <span className="text-callout">Right Price</span>, <br /> Never Overspend
              </h1>
              <p className="text-body leading-relaxed tracking-wide font-light italic max-sm:leading-snug mt-6 text-white">
                Track prices across stores in real-time, get smart deal alerts,
                and ensure you never miss out on savings again.
              </p>
            </section>
            
            {/* Divider */}
            <span className="border-t-2 border-subheading block my-8 max-sm:my-6 w-16 max-sm:mx-auto"></span>
            
            <div className="flex justify-start max-sm:justify-center mt-8">
              <div className="flex gap-4 max-sm:flex-col w-full sm:w-auto">
                <Link
                  href="/signin"
                  className="text-button flex justify-center items-center border-2 border-button-bg text-button-bg px-10 py-3.5 rounded-lg font-bold hover:bg-button-bg hover:text-button-text transition-all duration-300 ease-in-out"
                >
                  Log in
                </Link>
                <Link 
                  href="/signup"
                  className="text-button flex justify-center items-center border-2 border-button-bg bg-button-bg text-button-text px-10 py-3.5 rounded-lg font-bold shadow-[0_4px_14px_0_rgba(251,133,0,0.39)] hover:bg-callout hover:border-callout hover:shadow-[0_6px_20px_rgba(255,183,3,0.23)] transition-all duration-300 ease-in-out"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex justify-center bg-header">
        {/* Using items-stretch to ensure left and right columns equal height */}
        <div className="sm:max-w-[120rem] flex flex-row max-sm:flex-col w-full justify-center items-stretch shadow-2xl">
          
          {/* Left Column: Welcome Section */}
          <section className="flex-1 bg-header2 px-6 py-16 lg:py-24 text-center text-text-body w-full flex items-center justify-center">
            <div className="max-w-xl mx-auto space-y-8">
              <h2 className="text-heading font-bold px-2 leading-tight">
                Stop Overpaying. <br className="sm:hidden" />
                <span className="text-header bg-callout px-3 py-1.5 rounded-lg sm:ml-2 inline-block mt-4 sm:mt-0 transform -rotate-2 shadow-lg">
                  Start Saving.
                </span>
              </h2>
              <p className="text-body font-light leading-relaxed px-4 sm:px-8 text-gray-100">
                It’s easy to overpay when you don't know the true market value. PRICERIGHT tracks exactly what items cost across your favorite retailers, helping you lock in the lowest price and save money on every purchase.
              </p>
              <span className="flex justify-center w-full pt-4">
                <span className="block size-3 rounded-full bg-subheading shadow-[0_0_12px_rgba(33,158,188,0.8)]"></span>
              </span>
            </div>
          </section>

          {/* Right Column: Features Section */}
          <section className="flex-1 bg-background p-12 lg:p-24 flex flex-col justify-center border-l-0 sm:border-l-4 border-callout">
            <div className="max-w-md mx-auto space-y-10 w-full">
              <h3 className="text-heading font-extrabold text-header">
                Smart Shopping
              </h3>

              <div className="space-y-6">
                {[
                  { title: "Real-Time Tracking", desc: "Compare live prices from hundreds of retailers instantly.", dotColor: "var(--color-subheading)" },
                  { title: "Smart Deal Alerts", desc: "Get notified the second your favorite items drop in price.", dotColor: "var(--color-button-bg)" },
                  { title: "Price History Charts", desc: "Never buy at the peak again with comprehensive historical data.", dotColor: "var(--color-header)" }
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-5 items-start bg-text-body/40 p-5 rounded-2xl shadow-sm hover:bg-text-body/60 transition-colors duration-300">
                    <div 
                      className="mt-2 size-3.5 rounded-full shrink-0 shadow-sm" 
                      style={{ backgroundColor: feature.dotColor }}
                    />
                    <div>
                      <h4 className="font-bold text-header text-(length:--text-subheading) tracking-wide">
                        {feature.title}
                      </h4>
                      <p className="text-header2 font-medium text-body mt-2 leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link
                  href="/tracker"
                  className="text-button inline-flex items-center justify-center w-full sm:w-auto border-2 border-header bg-header text-text-body px-10 py-3.5 rounded-lg font-bold shadow-lg hover:bg-subheading hover:border-subheading hover:shadow-xl transition-all duration-300 ease-in-out"
                >
                  Start Tracking
                </Link>
              </div>
            </div>
          </section>
          
        </div>
      </main>
    </div>
  );
}