// components/home/sections/FeaturesSection.tsx
const features = [
  {
    icon: "🌸",
    title: "Baked Fresh Daily",
    description:
      "Every item baked each morning. No preservatives, no shortcuts — just honest baking.",
  },
  {
    icon: "💝",
    title: "Made with Love",
    description:
      "Premium ingredients sourced from trusted local suppliers, crafted with real care.",
  },
  {
    icon: "✨",
    title: "Custom Orders Welcome",
    description:
      "Planning a celebration? We'll craft the perfect cake tailored to your vision.",
  },
];

export default function FeaturesSection() {
  return (
    // Added bg-[#FFFAF8] here
    <section className="py-20 px-6 bg-[#FFFAF8]">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center bg-[#FDE8EE] rounded-full px-4 py-1.5 mb-4">
          <span
            className="text-[11px] font-bold tracking-widest text-[#E07A99] uppercase"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Why HelloBake
          </span>
        </div>

        <h2
          className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-12"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          The HelloBake Difference
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#F2E0DA] rounded-3xl p-8 flex flex-col items-center"
            >
              <div className="w-14 h-14 bg-[#FDE8EE] rounded-full flex items-center justify-center mb-6 text-2xl">
                {feature.icon}
              </div>
              <h3
                className="font-bold text-[#2C1810] text-[18px] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[#6B4F44] text-[14px] leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
