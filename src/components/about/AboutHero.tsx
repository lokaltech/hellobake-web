// components/about/AboutHero.tsx
export default function AboutHero() {
  return (
    <section className="relative w-full bg-[#FDE8EE]/40 py-20 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center relative z-10">
        <span
          className="text-[#E07A99] font-semibold text-sm tracking-widest uppercase mb-4"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Our Sweet Journey
        </span>
        <h1
          className="text-4xl md:text-6xl font-bold text-[#2C1810] leading-tight mb-6"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Baked with Love, <br className="hidden md:block" /> Every Single Day.
        </h1>
        <p
          className="text-[#6B4F44] text-lg max-w-2xl"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          We believe that every pastry has a story to tell. From our humble
          beginnings in a home kitchen to your dining table, we pour our hearts
          into every single batch.
        </p>
      </div>

      {/* Decorative background blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#E07A99]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#F2E0DA]/50 rounded-full blur-3xl" />
    </section>
  );
}
