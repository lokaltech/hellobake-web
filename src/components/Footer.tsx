// components/Footer.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const exploreLinks = [{ label: "Our Menu", href: "/menu" }];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const hours = [
  { day: "Mon – Fri", time: "08:00 – 20:00", highlight: false },
  { day: "Saturday", time: "08:00 – 22:00", highlight: false },
  { day: "Sunday", time: "09:00 – 18:00", highlight: true },
];

const bottomLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default async function Footer() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "default" },
  });

  const waNumber = settings?.whatsappNumber || "6285121118121";
  const igUrl = settings?.instagramUrl || "https://instagram.com/hellobake.id";
  const tiktokUrl = settings?.tiktokUrl || "https://tiktok.com/@hellobake.id";

  const socialLinks = [
    {
      href: igUrl,
      label: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: tiktokUrl,
      label: "TikTok",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" />
        </svg>
      ),
    },
    {
      href: `https://wa.me/${waNumber}`,
      label: "WhatsApp",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#2C1810] text-[#F5E6E0]">
      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.4fr] gap-10">
        {/* Brand column */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="size-9 rounded-full bg-[#FDE8EE] flex items-center justify-center text-lg shrink-0">
              🎂
            </div>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hello<span className="text-[#E07A99]">Bake</span>
            </span>
          </div>

          <p
            className="text-sm text-[#A07060] leading-relaxed max-w-52 mb-5"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Handcrafted cakes & pastries baked fresh daily in Jakarta, made with
            love and real butter.
          </p>

          <div className="flex gap-2.5 mb-5">
            {socialLinks.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="size-9 rounded-full bg-[#3D2218] border border-[#4E2E20] flex items-center justify-center text-[#C09080] hover:text-[#E07A99] hover:border-[#E07A99] transition-colors duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          <span
            className="inline-flex items-center gap-1.5 bg-[#3D2218] border border-[#4E2E20] rounded-full px-3 py-1.5 text-xs text-[#E07A99]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Jakarta, Indonesia
          </span>
        </div>

        {/* Explore column */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Explore
          </p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {exploreLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#A07060] hover:text-[#E07A99] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company column */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Company
          </p>
          <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
            {companyLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-sm text-[#A07060] hover:text-[#E07A99] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours column */}
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Opening Hours
          </p>

          <div className="flex flex-col gap-2.5 mb-5">
            {hours.map(({ day, time, highlight }) => (
              <div key={day} className="flex justify-between text-sm">
                <span
                  className="text-[#C8A898]"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {day}
                </span>
                <span
                  className={
                    highlight ? "text-[#E07A99] font-medium" : "text-[#A07060]"
                  }
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {time}
                </span>
              </div>
            ))}
          </div>

          {/* DYNAMIC WHATSAPP BOX */}
          <div className="bg-[#3D2218] border border-[#4E2E20] rounded-xl px-4 py-3.5">
            <p
              className="text-xs text-[#A07060] mb-1"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Order via WhatsApp
            </p>
            <a
              href={`https://wa.me/${waNumber}`}
              className="text-sm text-[#E07A99] font-medium hover:text-[#F0A0BC] transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              +{waNumber.slice(0, 2)} {waNumber.slice(2, 5)}{" "}
              {waNumber.slice(5, 9)} {waNumber.slice(9)}
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#3D2218]">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span
            className="text-xs text-[#6B4030]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            © {new Date().getFullYear()} HelloBake. All rights reserved.
          </span>
          <ul className="flex gap-5 list-none p-0 m-0">
            {bottomLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-xs text-[#6B4030] hover:text-[#A07060] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
