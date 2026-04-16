import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WhatsAppButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#20bd5a] text-white z-50 hover:-translate-y-1 transition-transform"
      onClick={() => window.open("https://wa.me/966111234567", "_blank")}
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Chat on WhatsApp</span>
    </Button>
  );
}
