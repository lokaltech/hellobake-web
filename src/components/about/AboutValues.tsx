// components/about/AboutValues.tsx
const values = [
  {
    icon: "🌾",
    title: "Premium Ingredients",
    description:
      "We source only the finest flours, pure butter, and real vanilla. No artificial preservatives, ever.",
  },
  {
    icon: "🤲",
    title: "Crafted by Hand",
    description:
      "Every croissant is folded and every cake is frosted by real human hands with meticulous care.",
  },
  {
    icon: "💖",
    title: "Baked Fresh Daily",
    description:
      "If it's on our shelf, it was baked this morning. We believe you deserve the freshest pastries possible.",
  },
];

export default function AboutValues() {
  return (
    <section className="bg-white py-20 border-y border-[#F2E0DA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl font-bold text-[#2C1810] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            The HelloBake Promise
          </h2>
          <p
            className="text-[#6B4F44] max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            We refuse to compromise on quality. Here is what you can expect from
            every single order.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-[#FDF3F6] transition-colors duration-300"
            >
              <span className="text-4xl mb-4">{value.icon}</span>
              <h3
                className="text-lg font-bold text-[#2C1810] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {value.title}
              </h3>
              <p
                className="text-[14px] text-[#6B4F44] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
