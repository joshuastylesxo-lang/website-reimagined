import { useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2, MessageCircle, Loader2, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useCart } from "./cart/CartContext";
import { Checkbox } from "@/components/ui/checkbox";


export function CartDrawer() {
  const { items, count, total, originalTotal, isOpen, setOpen, inc, dec, remove, clear } = useCart();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [info, setInfo] = useState({ name: "", phone: "", address: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const savings = originalTotal - total;

  const WHATSAPP_NUMBER = "923255333222";

  const submit = async () => {
    if (items.length === 0) return toast.error("Add at least one service");
    if (!info.name.trim() || info.name.trim().length < 2) return toast.error("Enter your name");
    if (!info.phone.trim() || info.phone.trim().length < 7) return toast.error("Enter a valid phone");
    if (!acceptedTerms) return toast.error("Please accept the Terms & Conditions to continue");

    setSubmitting(true);
    try {
      const serviceList = items
        .map((i) => `• ${i.name} x${i.qty} — Rs ${(i.price * i.qty).toLocaleString()}`)
        .join("\n");

      const message =
        `Hello, I want to confirm my booking.\n\n` +
        `Name: ${info.name}\n` +
        `Phone: ${info.phone}\n` +
        (info.address.trim() ? `Address: ${info.address}\n` : "") +
        `\nSelected Services:\n${serviceList}\n\n` +
        `Total: Rs ${total.toLocaleString()}\n\n` +
        `Additional Notes:\n${info.notes.trim() || "—"}`;

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      const win = window.open(whatsappURL, "_blank", "noopener,noreferrer");
      if (!win) {
        toast.error("Unable to open WhatsApp. Please try again.");
        return;
      }

      toast.success("Booking sent! We'll contact you shortly.");
      clear();
      setOpen(false);
      setStep("cart");
      setInfo({ name: "", phone: "", address: "", notes: "" });
      setAcceptedTerms(false);
    } catch {
      toast.error("Unable to open WhatsApp. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 gap-0 [&>button.absolute]:hidden">
        <SheetHeader className="px-5 py-4 border-b">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-brand" />
              {step === "cart" ? `Your Cart (${count})` : "Checkout"}
            </SheetTitle>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              size="sm"
              className="h-9 rounded-full gap-1.5 px-3 font-semibold"
              aria-label="Back to services"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 grid place-items-center text-center px-6">
            <div>
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add services to get started.</p>
              <Button onClick={() => setOpen(false)} className="mt-5 rounded-full bg-brand text-brand-foreground hover:bg-brand">
                Browse services
              </Button>
            </div>
          </div>
        ) : step === "cart" ? (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="rounded-xl border border-border bg-card p-3 animate-fade-in">
                  <div className="flex justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">{i.categoryName}</p>
                      <p className="font-semibold text-sm leading-snug">{i.name}</p>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-xs line-through text-muted-foreground">Rs {i.original.toLocaleString()}</span>
                        <span className="text-sm font-bold text-brand">Rs {i.price.toLocaleString()}</span>
                        {i.unit && <span className="text-[11px] text-muted-foreground">{i.unit}</span>}
                      </div>
                    </div>
                    <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive transition shrink-0" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-brand/30 bg-brand/5 p-1">
                      <button onClick={() => dec(i.id)} className="h-7 w-7 grid place-items-center rounded-full bg-background hover:bg-brand hover:text-brand-foreground transition" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-5 text-center text-sm font-bold text-brand">{i.qty}</span>
                      <button onClick={() => inc(i.id)} className="h-7 w-7 grid place-items-center rounded-full bg-brand text-brand-foreground hover:scale-110 transition" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-bold">Rs {(i.price * i.qty).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-5 space-y-3 bg-background">
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">You save</span>
                  <span className="font-semibold text-brand">Rs {savings.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-brand">Rs {total.toLocaleString()}</span>
              </div>
              <Button onClick={() => setStep("checkout")} className="w-full h-12 rounded-full bg-brand hover:bg-brand text-brand-foreground font-semibold shadow-glow">
                Proceed to Checkout
              </Button>
              <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive transition">
                Clear cart
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="cn">Full Name</Label>
                <Input id="cn" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cp">Phone</Label>
                <Input id="cp" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} placeholder="03XX XXXXXXX" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ca">Address</Label>
                <Input id="ca" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} placeholder="House #, Street, Area, City" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cnt">Notes (optional)</Label>
                <Textarea id="cnt" value={info.notes} onChange={(e) => setInfo({ ...info, notes: e.target.value })} placeholder="Any special instructions..." />
              </div>
              <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm">
                <div className="flex justify-between font-semibold">
                  <span>Total ({count} item{count !== 1 ? "s" : ""})</span>
                  <span className="text-brand">Rs {total.toLocaleString()}</span>
                </div>
              </div>
              <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wide text-destructive">Terms &amp; Conditions — Liability Disclaimer</p>
                <p className="text-xs text-foreground/90 leading-relaxed">{LIABILITY_DISCLAIMER}</p>
                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <Checkbox
                    id="accept-terms"
                    checked={acceptedTerms}
                    onCheckedChange={(v) => setAcceptedTerms(v === true)}
                    className="mt-0.5"
                  />
                  <span className="text-xs font-semibold text-foreground">
                    I have read and accept the Terms &amp; Conditions.
                  </span>
                </label>
              </div>
            </div>
            <div className="border-t p-5 space-y-2 bg-background">
              <Button onClick={submit} disabled={submitting || !acceptedTerms} className="w-full h-12 rounded-full bg-brand hover:bg-brand text-brand-foreground font-semibold shadow-glow disabled:opacity-60">
                {submitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Opening WhatsApp…</>
                ) : (
                  <><MessageCircle className="mr-2 h-5 w-5" /> Confirm via WhatsApp</>
                )}
              </Button>
              <button onClick={() => setStep("cart")} className="w-full text-sm text-muted-foreground hover:text-foreground transition">
                ← Back to cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function CartButton({ className = "" }: { className?: string }) {
  const { count, setOpen } = useCart();
  return (
    <button
      onClick={() => setOpen(true)}
      className={`relative inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-muted/50 transition ${className}`}
      aria-label="Open cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-brand text-brand-foreground text-[11px] font-bold grid place-items-center animate-fade-in">
          {count}
        </span>
      )}
    </button>
  );
}
