import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type ReactNode,
} from "react";
import { z } from "zod";
import {
  CheckCircle2,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email is too long"),

  subject: z
    .string()
    .trim()
    .min(2, "Subject must contain at least 2 characters")
    .max(150, "Subject is too long"),

  message: z
    .string()
    .trim()
    .min(10, "Message must contain at least 10 characters")
    .max(1000, "Message cannot exceed 1000 characters"),
});

type ContactItem = {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
};

type FieldProps = {
  name: string;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  maxLength?: number;
};

const contacts: ContactItem[] = [
  {
    icon: Mail,
    label: "Email",
    value: "mariyumkhan11223@gmail.com",
    href: "mailto:mariyumkhan11223@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 307 4501496",
    href: "tel:+923074501496",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pakistan",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "mariyum-ajmal-khan",
    href: "https://www.linkedin.com/in/mariyum-ajmal-khan-758a4613b",
    external: true,
  },
];

function Reveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: RevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.unobserve(element);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`contact-reveal contact-reveal-${direction} ${
        isVisible ? "contact-reveal-visible" : ""
      } ${className}`}
      style={
        {
          "--contact-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

function ContactCard({
  contact,
  index,
}: {
  contact: ContactItem;
  index: number;
}) {
  const Icon = contact.icon;

  const content = (
    <>
      <div
        className="contact-info-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 sm:h-12 sm:w-12"
        style={
          {
            "--icon-delay": `${index * 0.4}s`,
          } as CSSProperties
        }
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:text-xs">
          {contact.label}
        </div>

        <div className="mt-1 break-words text-sm font-semibold leading-6 text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
          {contact.value}
        </div>
      </div>
    </>
  );

  const className =
    "contact-info-card group relative flex min-h-[82px] w-full items-center gap-3 overflow-hidden rounded-2xl border border-border/80 bg-gradient-card p-4 text-left shadow-card-soft backdrop-blur-sm transition-all duration-500 sm:gap-4 sm:p-5";

  if (contact.href) {
    return (
      <a
        href={contact.href}
        target={contact.external ? "_blank" : undefined}
        rel={contact.external ? "noopener noreferrer" : undefined}
        className={className}
        aria-label={`${contact.label}: ${contact.value}`}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.05]" />

        <div className="contact-info-shine pointer-events-none absolute inset-y-0 -left-[140%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

        <div className="relative z-10 flex w-full items-center gap-3 sm:gap-4">
          {content}
        </div>
      </a>
    );
  }

  return (
    <div className={className}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.05]" />

      <div className="relative z-10 flex w-full items-center gap-3 sm:gap-4">
        {content}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  maxLength = 255,
}: FieldProps) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="text-sm font-semibold text-foreground"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        required
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="contact-input mt-2 min-h-12 w-full rounded-xl border border-input bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10"
      />
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loading) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    const result = schema.safeParse(data);

    if (!result.success) {
      toast.error(result.error.issues[0]?.message || "Please check the form");
      return;
    }

    setLoading(true);

    const emailBody = [
      `Name: ${result.data.name}`,
      `Email: ${result.data.email}`,
      "",
      result.data.message,
    ].join("\n");

    const mailtoLink = `mailto:mariyumkhan11223@gmail.com?subject=${encodeURIComponent(
      result.data.subject,
    )}&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoLink;

    window.setTimeout(() => {
      setLoading(false);
      setSent(true);
      form.reset();
      setMessageLength(0);
      toast.success("Opening your email client...");
    }, 700);
  };

  return (
    <>
      <section
        id="contact"
        className="relative isolate overflow-hidden bg-gradient-hero py-16 sm:py-20 md:py-24 lg:py-28"
      >
        {/* Animated background blobs */}
        <div className="contact-blob contact-blob-one pointer-events-none absolute -left-28 top-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        <div className="contact-blob contact-blob-two pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-primary-glow/20 blur-3xl sm:h-96 sm:w-96" />

        <div className="contact-blob contact-blob-three pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent/25 blur-3xl sm:h-72 sm:w-72" />

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section heading */}
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 md:mb-16">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm sm:text-xs">
                Contact
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Let&apos;s{" "}
                <span className="text-gradient">build together</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:mt-5 md:text-lg">
                Have a project in mind or just want to say hi? Drop me a
                message. I usually reply within 24 hours.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-5 lg:gap-8">
            {/* Contact information */}
            <div className="space-y-4 lg:col-span-2">
              {contacts.map((contact, index) => (
                <Reveal
                  key={contact.label}
                  delay={index * 110}
                  direction="right"
                >
                  <ContactCard contact={contact} index={index} />
                </Reveal>
              ))}
            </div>

            {/* Contact form */}
            <Reveal
              delay={180}
              direction="scale"
              className="min-w-0 lg:col-span-3"
            >
              <form
                onSubmit={onSubmit}
                noValidate
                className="contact-form relative min-h-[500px] overflow-hidden rounded-2xl border border-border/80 bg-card/85 p-4 shadow-elegant backdrop-blur-xl sm:rounded-3xl sm:p-6 md:p-8"
              >
                {/* Form glow */}
                <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-gradient-primary opacity-10 blur-sm" />

                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

                {sent ? (
                  <div className="contact-success relative z-10 flex min-h-[450px] flex-col items-center justify-center px-2 py-10 text-center sm:px-6 sm:py-16">
                    <div className="contact-success-icon flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 sm:h-24 sm:w-24">
                      <CheckCircle2 className="h-12 w-12 text-primary sm:h-14 sm:w-14" />
                    </div>

                    <h3 className="mt-6 text-2xl font-bold sm:text-3xl">
                      Message ready to send!
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                      Your email application should have opened. Complete the
                      email there, and I will get back to you as soon as
                      possible.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-6 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10 space-y-5 sm:space-y-6">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        Send a message
                      </span>

                      <h3 className="mt-2 text-xl font-bold sm:text-2xl">
                        Tell me about your project
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        Fill out the form below and your email application will
                        open with the message ready.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field
                        name="name"
                        label="Your name"
                        placeholder="Jane Doe"
                        autoComplete="name"
                        maxLength={100}
                      />

                      <Field
                        name="email"
                        label="Email address"
                        type="email"
                        placeholder="jane@company.com"
                        autoComplete="email"
                        maxLength={255}
                      />
                    </div>

                    <Field
                      name="subject"
                      label="Subject"
                      placeholder="Project inquiry"
                      autoComplete="off"
                      maxLength={150}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <label
                          htmlFor="message"
                          className="text-sm font-semibold text-foreground"
                        >
                          Message
                        </label>

                        <span className="text-[11px] font-medium text-muted-foreground">
                          {messageLength}/1000
                        </span>
                      </div>

                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        maxLength={1000}
                        required
                        placeholder="Tell me about your project..."
                        onChange={(event) =>
                          setMessageLength(event.target.value.length)
                        }
                        className="contact-input mt-2 min-h-[150px] w-full resize-y rounded-xl border border-input bg-background/80 px-4 py-3 text-sm leading-6 text-foreground outline-none transition-all duration-300 placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10 sm:min-h-[170px]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="contact-submit-button group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 sm:text-base"
                    >
                      <span className="relative z-10 inline-flex items-center gap-2">
                        {loading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Opening email...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .contact-reveal {
          opacity: 0;
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--contact-delay, 0ms);
          will-change: opacity, transform;
        }

        .contact-reveal-up {
          transform: translateY(38px);
        }

        .contact-reveal-left {
          transform: translateX(38px);
        }

        .contact-reveal-right {
          transform: translateX(-38px);
        }

        .contact-reveal-scale {
          transform: scale(0.96);
        }

        .contact-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow:
            0 18px 45px hsl(var(--primary) / 0.1),
            0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .contact-info-card:hover .contact-info-shine {
          animation: contactShine 850ms ease forwards;
        }

        .contact-info-icon {
          animation: contactIconFloat 4s ease-in-out infinite;
          animation-delay: var(--icon-delay, 0s);
        }

        .contact-form {
          transition:
            transform 400ms ease,
            border-color 400ms ease,
            box-shadow 400ms ease;
        }

        .contact-form:hover {
          border-color: hsl(var(--primary) / 0.25);
          box-shadow:
            0 25px 65px hsl(var(--primary) / 0.1),
            0 12px 30px rgba(0, 0, 0, 0.05);
        }

        .contact-input:hover {
          border-color: hsl(var(--primary) / 0.35);
        }

        .contact-submit-button::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-130%);
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 80%
          );
          transition: transform 700ms ease;
        }

        .contact-submit-button:hover::before {
          transform: translateX(130%);
        }

        .contact-success {
          animation: contactSuccessEntry 700ms
            cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .contact-success-icon {
          animation: contactSuccessPulse 2.5s ease-in-out infinite;
        }

        .contact-blob {
          animation: contactBlobMove 13s ease-in-out infinite alternate;
          will-change: transform;
        }

        .contact-blob-two {
          animation-delay: -4s;
          animation-duration: 16s;
        }

        .contact-blob-three {
          animation-delay: -8s;
          animation-duration: 19s;
        }

        @keyframes contactIconFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-4px) rotate(2deg);
          }
        }

        @keyframes contactShine {
          from {
            left: -140%;
          }

          to {
            left: 150%;
          }
        }

        @keyframes contactSuccessEntry {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.96);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes contactSuccessPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0.25);
          }

          50% {
            transform: scale(1.06);
            box-shadow: 0 0 0 14px hsl(var(--primary) / 0);
          }
        }

        @keyframes contactBlobMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(28px, -22px, 0) scale(1.08);
          }

          100% {
            transform: translate3d(-18px, 26px, 0) scale(0.95);
          }
        }

        @media (max-width: 639px) {
          .contact-reveal-up,
          .contact-reveal-left,
          .contact-reveal-right {
            transform: translateY(26px);
          }

          .contact-reveal-scale {
            transform: translateY(26px) scale(0.98);
          }

          .contact-reveal-visible {
            transform: translate3d(0, 0, 0) scale(1);
          }

          .contact-info-card:hover {
            transform: translateY(-3px);
          }

          .contact-blob {
            opacity: 0.7;
            filter: blur(55px);
          }
        }

        @media (hover: none) {
          .contact-info-card:active {
            transform: scale(0.985);
            border-color: hsl(var(--primary) / 0.35);
          }

          .contact-form:hover {
            border-color: hsl(var(--border));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-reveal,
          .contact-reveal-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .contact-info-icon,
          .contact-success-icon,
          .contact-blob {
            animation: none;
          }

          .contact-info-card:hover,
          .contact-info-card:active {
            transform: none;
          }

          .contact-submit-button::before {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Contact;