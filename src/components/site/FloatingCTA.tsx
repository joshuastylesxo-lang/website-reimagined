import { MessageCircle, Phone } from "lucide-react";
import { useCart } from "./cart/CartContext";

export function FloatingCTA() {
  const { count } = useCart();
  // On mobile, lift above the sticky cart bar when it's visible.
  const mobileBottom = count > 0 ? "bottom-[5.25rem]" : "bottom-3";
  return (
    <div
      className={`fixed right-3 sm:right-5 sm:bottom-5 ${mobileBottom} z-40 flex flex-col gap-2 sm:gap-3`}
    >
      <a
        href="https://wa.me/923255333222"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-green-500 text-white flex items-center justify-center shadow-glow hover:scale-110 hover:-translate-y-1 transition-all animate-float"
      >
        <MessageCircle className="h-7 w-7 sm:h-9 sm:w-9" />
      </a>
      <a
        href="tel:+923255333222"
        aria-label="Call"
        className="h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-brand text-brand-foreground flex items-center justify-center shadow-glow hover:scale-110 hover:-translate-y-1 transition-all"
      >
        <Phone className="h-7 w-7 sm:h-9 sm:w-9" />
      </a>
    </div>
  );
}

