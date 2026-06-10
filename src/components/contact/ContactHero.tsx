export default function ContactHero() {
  return (
    <section className="bg-[#FDE8EE]/40 py-16 border-b border-[#F2E0DA]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span
          className="text-[#E07A99] font-semibold text-sm tracking-widest uppercase mb-4 block"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          We'd Love to Hear From You
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-[#2C1810] mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Say Hello!
        </h1>
        <p
          className="text-[#6B4F44] text-base max-w-lg mx-auto"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Whether you have a question about our menu, need a custom cake for a
          special event, or just want to chat about pastries, we are here for
          you.
        </p>
      </div>
    </section>
  );
}
