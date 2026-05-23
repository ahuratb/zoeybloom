"use client";

import { FormEvent, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLang } from "@/hooks/useLang";
import SplitReveal from "@/components/ui/SplitReveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function ContactForm() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const checkRef = useRef<SVGPathElement>(null);
  const [sent, setSent] = useState(false);
  const [inquiry, setInquiry] = useState("");

  useGSAP(
    () => {
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".reveal-up"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    gsap.to(formRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        setSent(true);
        // animate success in next tick
        requestAnimationFrame(() => {
          if (successRef.current) {
            gsap.fromTo(
              successRef.current,
              { opacity: 0, y: 16, scale: 0.97 },
              { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "power3.out" }
            );
          }
          if (checkRef.current) {
            const len = checkRef.current.getTotalLength();
            gsap.set(checkRef.current, { strokeDasharray: len, strokeDashoffset: len });
            gsap.to(checkRef.current, {
              strokeDashoffset: 0,
              duration: 0.6,
              ease: "power2.out",
              delay: 0.2,
            });
          }
        });
      },
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-14 sm:py-20">
      <div className="text-center mb-10 reveal-up">
        <span className="block text-[11px] tracking-[0.3em] uppercase text-rose/80 mb-3">
          {t.contact.eyebrow}
        </span>
        <SplitReveal
          as="h2"
          className="font-display text-[clamp(1.9rem,5vw,2.6rem)] leading-tight text-ink"
        >
          {t.contact.title}
        </SplitReveal>
        <p className="mt-4 text-[14.5px] text-ink/60">{t.contact.sub}</p>
      </div>

      {/* Contact info strip */}
      <div className="flex flex-col gap-2.5 mb-6 reveal-up">
        <a
          href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
          className="flex items-center gap-3 text-[13px] text-ink/70 hover:text-rose transition-colors"
          dir="ltr"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose text-[15px]">✆</span>
          {t.contact.phone}
        </a>
        <a
          href={`mailto:${t.contact.emailAddress}`}
          className="flex items-center gap-3 text-[13px] text-ink/70 hover:text-rose transition-colors"
          dir="ltr"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose text-[15px]">✉</span>
          {t.contact.emailAddress}
        </a>
        <div className="flex items-start gap-3 text-[13px] text-ink/70">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose/10 text-rose text-[15px]">⌖</span>
          <span>{t.contact.address}</span>
        </div>
      </div>

      <div className="glass-frame rounded-[28px] p-6 sm:p-8 reveal-up relative overflow-hidden">
        {!sent ? (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="float-field">
              <input id="cf-name" type="text" required placeholder=" " autoComplete="name" />
              <label htmlFor="cf-name">{t.contact.name}</label>
            </div>
            <div className="float-field">
              <input id="cf-email" type="email" required placeholder=" " autoComplete="email" />
              <label htmlFor="cf-email">{t.contact.email}</label>
            </div>
            <div className="float-field">
              <input
                id="cf-wa"
                type="tel"
                placeholder=" "
                autoComplete="tel"
                dir="ltr"
              />
              <label htmlFor="cf-wa">{t.contact.whatsapp}</label>
            </div>
            <div className="float-field">
              <select
                id="cf-inq"
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                data-empty={inquiry === "" ? "true" : "false"}
                required
              >
                <option value="" disabled hidden />
                {t.contact.inquiryOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label htmlFor="cf-inq">{t.contact.inquiry}</label>
            </div>
            <div className="float-field">
              <textarea id="cf-msg" required placeholder=" " rows={4} />
              <label htmlFor="cf-msg">{t.contact.message}</label>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`https://wa.me/96541119050?text=${encodeURIComponent(
                  lang === "ar" ? "مرحباً زوي بلوم" : "Hi ZoeyBloom"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12.5px] text-ink/60 hover:text-rose transition-colors"
              >
                {t.contact.whatsappCta}
              </a>
              <MagneticButton
                type="submit"
                className="px-6 py-3 rounded-full bg-rose text-white text-sm font-medium
                           shadow-[0_12px_28px_-10px_rgba(232,69,107,0.55)] hover:bg-rose/90 transition-colors"
              >
                {t.contact.submitLabel}
              </MagneticButton>
            </div>
          </form>
        ) : (
          <div
            ref={successRef}
            className="flex flex-col items-center text-center gap-3 py-10"
          >
            <span className="inline-flex w-16 h-16 items-center justify-center rounded-full bg-rose/10 border border-rose/30">
              <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden>
                <path
                  ref={checkRef}
                  d="M9 18.5l6 6 12-13"
                  fill="none"
                  stroke="#E8456B"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h3 className="font-display text-2xl text-ink">{t.contact.successTitle}</h3>
            <p className="text-[14.5px] text-ink/65 max-w-[36ch]">
              {t.contact.successBody}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
