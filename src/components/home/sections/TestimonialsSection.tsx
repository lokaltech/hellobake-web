// components/home/sections/TestimonialsSection.tsx
const testimonials = [
  {
    name: "Anisa R.",
    location: "South Jakarta",
    initial: "A",
    quote:
      "Ordered a custom birthday cake and it was absolutely stunning. The taste matched the look — everyone couldn't stop talking about it!",
  },
  {
    name: "Budi S.",
    location: "Tangerang",
    initial: "B",
    quote:
      "The mille-feuille is to die for. Layers are perfectly crispy, cream is light and not too sweet. I order every weekend now.",
  },
  {
    name: "Dewi P.",
    location: "Bekasi",
    initial: "D",
    quote:
      "Fast delivery, beautiful packaging, and the cake tasted incredible. Will definitely order again for my next event!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-white border-t border-[#F2E0DA]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center bg-[#FDE8EE] rounded-full px-4 py-1.5 mb-4">
          <span
            className="text-[11px] font-bold tracking-widest text-[#E07A99] uppercase"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Customer Love
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-12"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          What Our Customers Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="border border-[#F2E0DA] rounded-3xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-[#E07A99] text-sm mb-4">
                  ★★★★★
                </div>
                <p
                  className="text-[#2C1810] text-[15px] leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FDE8EE] text-[#E07A99] flex items-center justify-center font-bold text-sm">
                  {t.initial}
                </div>
                <div>
                  <p
                    className="font-bold text-[#2C1810] text-[14px]"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-[#6B4F44] text-[12px]">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
