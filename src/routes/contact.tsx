import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AllFix Maintenance Services" },
      { name: "description", content: "Get in touch with AllFix Maintenance Services in Bahria Town, Islamabad. Open 24/7." },
      { property: "og:title", content: "Contact AllFix" },
      { property: "og:description", content: "Reach AllFix in Bahria Town, Islamabad — open 24/7." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: MapPin, title: "Address", body: "Plaza no: 181, Civic Center, Bahria Town, Islamabad" },
    { icon: Phone, title: "Phone", body: "0325 5333222", href: "tel:+923255333222" },
    { icon: Clock, title: "Hours", body: "9:00 AM – 9:00 PM · 7 days a week" },
  ];

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-brand mb-3">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold">
            Visit us in <span className="text-gradient-brand">Bahria Town</span>
          </h1>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href ?? "#"}
              className="card-hover group rounded-2xl border border-border bg-card p-5 sm:p-7 flex gap-4 items-start"
            >
              <div className="h-12 w-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center transition-all group-hover:bg-brand group-hover:text-brand-foreground group-hover:rotate-6">
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-semibold mb-1">{c.title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{c.body}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden border border-border shadow-card">
          <iframe
            title="AllFix Maintenance Services Location"
            src="https://www.google.com/maps?q=Civic+Center+Bahria+Town+Islamabad&output=embed"
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
