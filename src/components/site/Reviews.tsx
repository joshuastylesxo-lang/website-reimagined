import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Muhammad Usman", text: "Great work and professional staff. Solved my AC issue in under an hour.", rating: 5 },
  { name: "Voltify Store", text: "GOOD JOB — reliable team for all our shop maintenance needs.", rating: 5 },
  { name: "Ayesha Khan", text: "Got my entire house painted with AllFix. The finish was flawless and they cleaned up everything!", rating: 5 },
  { name: "Bilal Ahmed", text: "Their solar installation team was excellent. Saved 60% on my electricity bill already.", rating: 5 },
  { name: "Fatima Riaz", text: "Booked a plumber at midnight and they actually came. True 24/7 service. Highly recommended.", rating: 5 },
  { name: "Hamza Tariq", text: "CCTV installation was clean, professional and reasonably priced. Very satisfied.", rating: 4 },
  { name: "Sana Malik", text: "Tank cleaning was done thoroughly. The team was polite and very hygienic.", rating: 5 },
  { name: "Zain ul Abideen", text: "Carpentry work for my kitchen turned out beautiful. Skilled craftsmen!", rating: 5 },
  { name: "Mariam Sheikh", text: "Quick electrical repair, fair price, and friendly staff. Will use again.", rating: 5 },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-12 sm:py-20 lg:py-32 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-14">
          <span className="inline-block text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-brand mb-2 sm:mb-3">
            Loved by clients
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Real reviews, <span className="text-gradient-brand">real results</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3 sm:mt-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-semibold text-sm sm:text-base">4.3</span>
            <span className="text-muted-foreground text-sm sm:text-base">on Google</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <div
              key={r.name}
              className="card-hover group relative rounded-2xl border border-border bg-card p-5 sm:p-7 animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Quote className="absolute top-4 right-4 sm:top-5 sm:right-5 h-6 w-6 sm:h-8 sm:w-8 text-brand/15 group-hover:text-brand/30 group-hover:scale-110 transition-all" />
              <div className="flex mb-2 sm:mb-3">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed">"{r.text}"</p>
              <div className="mt-4 sm:mt-5 flex items-center gap-3 pt-4 sm:pt-5 border-t border-border">
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-brand to-brand/60 flex items-center justify-center text-brand-foreground font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{r.name}</div>
                  <div className="text-xs text-muted-foreground">Verified Customer</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
