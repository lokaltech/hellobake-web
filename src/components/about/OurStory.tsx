// components/about/OurStory.tsx
import Image from "next/image";

export default function OurStory() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        {/* Image Container */}
        <div className="w-full md:w-1/2 relative">
          <div className="aspect-4/5 w-full rounded-3xl overflow-hidden shadow-xl relative z-10">
            {/* Replace with a real photo of your kitchen/baking process */}
            <div className="w-full h-full bg-[#F2E0DA] flex items-center justify-center">
              <span className="text-6xl text-[#E07A99]/30">📸</span>
            </div>

            <Image
              src="/about-page-product.png"
              alt="About Page Product"
              fill
              className="object-cover object-center"
            />
          </div>
          {/* Decorative offset border */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-[#E07A99] rounded-3xl z-0 hidden md:block" />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C1810]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            It started with a simple whisk and a dream.
          </h2>
          <div
            className="text-[#6B4F44] leading-relaxed flex flex-col gap-4 text-[15px]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <p>
              HelloBake was born out of a lifelong obsession with finding the
              perfect balance of flavors. What started as baking weekend treats
              for friends and family quickly blossomed into a neighborhood
              favorite.
            </p>
            <p>
              We don't believe in shortcuts. We wake up before the sun rises to
              proof our doughs, whisk our custards, and ensure that when we open
              our doors, the aroma alone is enough to make you smile.
            </p>
            <p className="font-medium text-[#2C1810]">
              Our mission is simple: to bring a little slice of joy to your day,
              one bite at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
