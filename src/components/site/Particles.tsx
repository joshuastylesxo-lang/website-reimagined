import { useMemo } from "react";

export function Particles({ count = 22 }: { count?: number }) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 12,
        opacity: Math.random() * 0.5 + 0.2,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-20px] rounded-full bg-white animate-particle-rise"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          }}
        />
      ))}
    </div>
  );
}
