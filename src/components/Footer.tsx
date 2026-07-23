import { Linkedin, Mail, Heart, MapPin, Phone, ArrowUp, Github, Twitter, Send } from "lucide-react";

const links = {
  Navigate: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  Services: [
    { label: "Web Development", href: "#services" },
    { label: "UI Implementation", href: "#services" },
    { label: "Responsive Design", href: "#services" },
    { label: "API Integration", href: "#services" },
  ],
};

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-border bg-gradient-to-br from-card via-background to-card">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-primary-glow/15 blur-3xl animate-blob" style={{ animationDelay: "4s" }} />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="animate-slide-up lg:col-span-1">
            <a href="#home" className="inline-flex items-center gap-2 text-2xl font-bold">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow animate-glow-pulse">
                M
              </span>
              <span className="text-gradient">Mariyum</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Frontend Engineer crafting scalable, beautiful & accessible web experiences with React, TypeScript & Node.js.
            </p>
            <div className="mt-5 flex gap-2">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com/in/mariyum-ajmal-khan-758a4613b", label: "LinkedIn" },
                { Icon: Mail, href: "mailto:mariyumkhan11223@gmail.com", label: "Email" },
                { Icon: Github, href: "#", label: "GitHub" },
                { Icon: Twitter, href: "#", label: "Twitter" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary hover:bg-gradient-primary hover:shadow-glow hover:-translate-y-1 hover:scale-110"
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  <Icon className="h-4 w-4 text-primary transition-colors group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Navigate</h4>
            <ul className="mt-5 space-y-3">
              {links.Navigate.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all hover:text-primary hover:translate-x-1"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Services</h4>
            <ul className="mt-5 space-y-3">
              {links.Services.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-all hover:text-primary hover:translate-x-1"
                  >
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">Get in touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <a href="mailto:mariyumkhan11223@gmail.com" className="hover:text-primary transition-colors break-all">
                  mariyumkhan11223@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                <a href="tel:+923074501496" className="hover:text-primary transition-colors">+92 307 4501496</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} <span className="font-semibold text-foreground">Mariyum Ajmal Khan</span> · Crafted with{" "}
            <Heart className="inline h-3 w-3 text-destructive fill-destructive animate-pulse" /> in Lahore. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="group flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium transition-all hover:border-primary hover:bg-primary/5 hover:-translate-y-1"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 text-primary transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
}
