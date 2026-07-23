import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type ServiceItem = {
  title: string;
  desc: string;
  image: string;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const services: ServiceItem[] = [
  {
    title: "Web Development",
    desc: "Scalable, responsive web apps built with React.js, Next.js and TypeScript — production-ready and performant.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "UI Implementation",
    desc: "Pixel-perfect Figma to code conversion with accessibility and cross-browser support baked in.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Responsive Design",
    desc: "Mobile-first interfaces that look and feel great on every screen size and device.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Reusable Components",
    desc: "Design systems and component libraries that speed up development and keep your UI consistent.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "API Integration",
    desc: "REST API design and integration with Node.js and Express for a clean and reliable data flow.",
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Performance Optimization",
    desc: "Faster load times, smaller bundles and smoother experiences across browsers and devices.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=85",
  },
];

function Reveal({
  children,
  delay = 0,
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
      className={`services-reveal ${
        isVisible ? "services-reveal-visible" : ""
      } ${className}`}
      style={
        {
          "--services-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function Services() {
  return (
    <>
      <section
        id="services"
        className="relative isolate overflow-hidden bg-gradient-hero py-16 sm:py-20 md:py-24 lg:py-28"
      >
        {/* Animated background circles */}
        <div className="services-blob services-blob-one pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        <div className="services-blob services-blob-two pointer-events-none absolute -right-28 top-1/3 h-64 w-64 rounded-full bg-primary-glow/20 blur-3xl sm:h-80 sm:w-80 lg:h-96 lg:w-96" />

        <div className="services-blob services-blob-three pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-accent/30 blur-3xl sm:h-72 sm:w-72" />

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
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
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm sm:text-xs">
                Services
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                What I{" "}
                <span className="text-gradient">
                  do best
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:mt-5 md:text-lg">
                From idea to deployment, I build polished frontend experiences
                that businesses and users love.
              </p>
            </div>
          </Reveal>

          {/* Services grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <Reveal
                key={service.title}
                delay={index * 120}
                className="h-full"
              >
                <article className="services-card group relative flex h-full min-h-[270px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-gradient-card p-5 shadow-card-soft backdrop-blur-sm transition-all duration-500 sm:min-h-[300px] sm:p-6 lg:p-7">
                  {/* Hover gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]" />

                  {/* Decorative circle */}
                  <div className="services-card-circle pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/15" />

                  {/* Shine animation */}
                  <div className="services-card-shine pointer-events-none absolute inset-y-0 -left-[130%] z-20 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Service image */}
                    <div className="services-image-wrapper relative h-20 w-20 overflow-hidden rounded-2xl border border-border/50 bg-background shadow-glow sm:h-24 sm:w-24">
                      <img
                        src={service.image}
                        alt={`${service.title} service`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-white/10" />

                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>

                    {/* Service information */}
                    <h3 className="mt-5 text-xl font-bold leading-tight transition-colors duration-300 group-hover:text-primary sm:mt-6 sm:text-[1.35rem]">
                      {service.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                      {service.desc}
                    </p>

                    {/* Bottom line */}
                    <div className="mt-5 h-1 w-12 overflow-hidden rounded-full bg-primary/15 sm:mt-6">
                      <div className="services-progress-line h-full w-full rounded-full bg-gradient-primary" />
                    </div>
                  </div>

                  {/* Bottom border animation */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .services-reveal {
          opacity: 0;
          transform: translateY(38px) scale(0.97);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--services-delay, 0ms);
          will-change: opacity, transform;
        }

        .services-reveal-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .services-card {
          transform: translateY(0);
          will-change: transform;
        }

        .services-card:hover {
          transform: translateY(-10px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow:
            0 24px 55px hsl(var(--primary) / 0.12),
            0 10px 25px rgba(0, 0, 0, 0.06);
        }

        .services-image-wrapper {
          animation: servicesImageFloat 4s ease-in-out infinite;
        }

        .services-reveal:nth-child(2) .services-image-wrapper {
          animation-delay: -0.7s;
        }

        .services-reveal:nth-child(3) .services-image-wrapper {
          animation-delay: -1.4s;
        }

        .services-reveal:nth-child(4) .services-image-wrapper {
          animation-delay: -2.1s;
        }

        .services-reveal:nth-child(5) .services-image-wrapper {
          animation-delay: -2.8s;
        }

        .services-reveal:nth-child(6) .services-image-wrapper {
          animation-delay: -3.5s;
        }

        .services-card-circle {
          animation: servicesCirclePulse 5s ease-in-out infinite;
        }

        .services-card:hover .services-card-shine {
          animation: servicesShine 900ms ease forwards;
        }

        .services-progress-line {
          transform-origin: left;
          animation: servicesLinePulse 3s ease-in-out infinite;
        }

        .services-blob {
          animation: servicesBlobMove 12s ease-in-out infinite alternate;
          will-change: transform;
        }

        .services-blob-two {
          animation-delay: -4s;
          animation-duration: 15s;
        }

        .services-blob-three {
          animation-delay: -7s;
          animation-duration: 18s;
        }

        @keyframes servicesImageFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-6px) rotate(2deg);
          }
        }

        @keyframes servicesCirclePulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.12);
          }
        }

        @keyframes servicesShine {
          from {
            left: -130%;
          }

          to {
            left: 150%;
          }
        }

        @keyframes servicesLinePulse {
          0%,
          100% {
            transform: scaleX(0.65);
            opacity: 0.7;
          }

          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes servicesBlobMove {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(28px, -20px, 0) scale(1.08);
          }

          100% {
            transform: translate3d(-18px, 25px, 0) scale(0.95);
          }
        }

        @media (max-width: 639px) {
          .services-reveal {
            transform: translateY(25px) scale(0.98);
          }

          .services-reveal-visible {
            transform: translateY(0) scale(1);
          }

          .services-card:hover {
            transform: translateY(-5px);
          }

          .services-blob {
            opacity: 0.7;
            filter: blur(55px);
          }
        }

        @media (hover: none) {
          .services-card:active {
            transform: scale(0.98);
            border-color: hsl(var(--primary) / 0.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-reveal,
          .services-reveal-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .services-image-wrapper,
          .services-card-circle,
          .services-progress-line,
          .services-blob {
            animation: none;
          }

          .services-card:hover,
          .services-card:active {
            transform: none;
          }

          .services-card:hover .services-card-shine {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default Services;