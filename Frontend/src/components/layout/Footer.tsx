import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="border-t border-border/60 bg-background/70 supports-[backdrop-filter]:backdrop-blur"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col md:flex-col items-center justify-between gap-4">
          <div className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} ClubSender. Tüm hakları saklıdır.
          </div>
          </div>
      </div>
    </footer>
  );
}
