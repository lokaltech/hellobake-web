interface ContactInfoProps {
  whatsappNumber: string;
}

export default function ContactInfo({ whatsappNumber }: ContactInfoProps) {
  const formattedPhone = `+${whatsappNumber.slice(0, 2)} ${whatsappNumber.slice(2, 5)} ${whatsappNumber.slice(5, 9)} ${whatsappNumber.slice(9)}`;

  return (
    <div className="flex flex-col gap-8 bg-white border border-[#F2E0DA] rounded-3xl p-8 shadow-sm h-full">
      <h3
        className="text-2xl font-bold text-[#2C1810]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Get in Touch
      </h3>

      <div className="flex flex-col gap-6">
        {/* Location */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center shrink-0 text-[#E07A99]">
            📍
          </div>
          <div>
            <h4
              className="font-bold text-[#2C1810] text-sm mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Bakery
            </h4>
            <p
              className="text-[#6B4F44] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Jakarta, Indonesia
              <br />
              <span className="text-xs italic mt-1 block">
                Walk-ins welcome!
              </span>
            </p>
          </div>
        </div>

        {/* Hours */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center shrink-0 text-[#E07A99]">
            ⏰
          </div>
          <div>
            <h4
              className="font-bold text-[#2C1810] text-sm mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Opening Hours
            </h4>
            <p
              className="text-[#6B4F44] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Mon - Fri: 07:00 AM - 08:00 PM
              <br />
              Sat: 08:00 AM - 06:00 PM
              <br />
              Sun: 08:00 AM - 05:00 PM
            </p>
          </div>
        </div>

        {/* Direct WA fallback */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#FDE8EE] flex items-center justify-center shrink-0 text-[#E07A99]">
            💬
          </div>
          <div>
            <h4
              className="font-bold text-[#2C1810] text-sm mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              WhatsApp
            </h4>
            <p
              className="text-[#6B4F44] text-sm leading-relaxed"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {formattedPhone}
              <br />
              <span className="text-xs italic mt-1 block">
                Fastest response time
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
