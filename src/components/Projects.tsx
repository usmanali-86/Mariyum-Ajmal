import { ExternalLink } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type Project = {
  title: string;
  tags: string[];
  desc: string;
  period: string;
  icon: string;
  iconAlt: string;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const projects: Project[] = [
  {
    title: "UTILIFY — Email Template Builder",
    tags: ["Node.js", "Express", "React", "REST API"],
    desc: "Full-stack email template management tool with CRUD operations, SQL script generation, and seamless client-server communication.",
    period: "Jan — Feb 2025",
    icon:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    iconAlt: "React",
  },
  {
    title: "DSM Portal Application",
    tags: ["React.js", "TypeScript", "Theming"],
    desc: "Internal design system portal with reusable React components, light and dark themes, and optimized render performance.",
    period: "Apr 2024 — Present",
    icon:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    iconAlt: "TypeScript",
  },
  {
    title: "TBOM Cardholder Web App",
    tags: ["HTML", "CSS", "JS", "Bootstrap", "jQuery"],
    desc: "Secure Manage Your Card client-side application with 24/7 availability and frontend performance optimizations.",
    period: "Sep — Nov 2024",
    icon:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    iconAlt: "Bootstrap",
  },
  {
    title: "Credit/Debit Statements & Email Marketing",
    tags: ["Fintech", "Email", "PDF"],
    desc: "Accurate financial statement generation and optimized marketing email templates meeting strict fintech compliance.",
    period: "Apr 2023 — Present",
    icon:
      "https://api.iconify.design/mdi/email-outline.svg?color=%236366f1",
    iconAlt: "Email Marketing",
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
      className={`project-reveal ${
        isVisible ? "project-reveal-visible" : ""
      } ${className}`}
      style={
        {
          "--project-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function Projects() {
  return (
    <>
      <section
        id="projects"
        className="relative isolate overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
      >
        {/* Animated background */}
        <div className="project-blob project-blob-one pointer-events-none absolute -left-28 top-10 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="project-blob project-blob-two pointer-events-none absolute -right-28 top-1/3 h-72 w-72 rounded-full bg-primary-glow/15 blur-3xl sm:h-96 sm:w-96" />

        <div className="project-blob project-blob-three pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-accent/25 blur-3xl sm:h-72 sm:w-72" />

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
          {/* Heading */}
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 md:mb-16">
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur-sm sm:text-xs">
                Selected work
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Recent{" "}
                <span className="text-gradient">
                  projects
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8 md:text-lg">
                A selection of frontend and full-stack applications developed
                using modern technologies and scalable architecture.
              </p>
            </div>
          </Reveal>

          {/* Projects grid */}
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal
                key={project.title}
                delay={index * 130}
                className="h-full"
              >
                <article className="project-card group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-border/80 bg-gradient-card p-5 shadow-card-soft backdrop-blur-sm transition-all duration-500 sm:min-h-[340px] sm:p-6 lg:p-8">
                  {/* Hover background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.055]" />

                  {/* Decorative circle */}
                  <div className="project-circle pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-xl transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/20" />

                  {/* Shine animation */}
                  <div className="project-shine pointer-events-none absolute inset-y-0 -left-[140%] z-20 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                  <div className="relative z-10 flex h-full flex-col">
                    {/* Single project icon */}
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="project-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-white/90 p-2.5 shadow-glow sm:h-14 sm:w-14"
                        title={project.iconAlt}
                      >
                        <img
                          src={project.icon}
                          alt={`${project.iconAlt} icon`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <span className="project-external-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/70 text-muted-foreground backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                        <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>
                    </div>

                    {/* Project title */}
                    <h3 className="mt-5 break-words text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-primary sm:mt-6 sm:text-xl lg:text-2xl">
                      {project.title}
                    </h3>

                    {/* Period */}
                    <div className="mt-2">
                      <span className="inline-flex rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-xs">
                        {project.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground sm:text-[15px]">
                      {project.desc}
                    </p>

                    {/* Tags */}
                    <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tag}
                          className="project-tag rounded-lg border border-primary/10 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/15 sm:text-xs"
                          style={
                            {
                              "--tag-delay": `${tagIndex * 100}ms`,
                            } as CSSProperties
                          }
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Bottom line */}
                    <div className="mt-6 h-1 w-14 overflow-hidden rounded-full bg-primary/15">
                      <div className="project-line h-full w-full origin-left rounded-full bg-gradient-primary" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .project-reveal {
          opacity: 0;
          transform: translateY(38px) scale(0.97);
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--project-delay, 0ms);
          will-change: opacity, transform;
        }

        .project-reveal-visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .project-card {
          transform: translateY(0);
          will-change: transform;
        }

        .project-card:hover {
          transform: translateY(-10px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow:
            0 24px 55px hsl(var(--primary) / 0.12),
            0 10px 25px rgba(0, 0, 0, 0.06);
        }

        .project-card:hover .project-shine {
          animation: projectShine 900ms ease forwards;
        }

        .project-icon {
          animation: projectIconFloat 4s ease-in-out infinite;
          transition:
            transform 400ms ease,
            border-color 400ms ease,
            box-shadow 400ms ease;
        }

        .project-card:hover .project-icon {
          transform: translateY(-5px) rotate(4deg) scale(1.08);
          border-color: hsl(var(--primary) / 0.35);
        }

        .project-external-icon {
          animation: projectExternalFloat 3s ease-in-out infinite;
        }

        .project-circle {
          animation: projectCirclePulse 6s ease-in-out infinite;
        }

        .project-tag {
          animation: projectTagGlow 4s ease-in-out infinite;
          animation-delay: var(--tag-delay, 0ms);
        }

        .project-line {
          animation: projectLinePulse 3s ease-in-out infinite;
        }

        .project-blob {
          animation: projectBlobMove 13s ease-in-out infinite alternate;
          will-change: transform;
        }

        .project-blob-two {
          animation-delay: -4s;
          animation-duration: 16s;
        }

        .project-blob-three {
          animation-delay: -8s;
          animation-duration: 19s;
        }

        @keyframes projectIconFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-5px) rotate(2deg);
          }
        }

        @keyframes projectExternalFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes projectCirclePulse {
          0%,
          100% {
            opacity: 0.65;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.14);
          }
        }

        @keyframes projectTagGlow {
          0%,
          100% {
            box-shadow: 0 0 0 hsl(var(--primary) / 0);
          }

          50% {
            box-shadow: 0 0 12px hsl(var(--primary) / 0.08);
          }
        }

        @keyframes projectLinePulse {
          0%,
          100% {
            transform: scaleX(0.6);
            opacity: 0.7;
          }

          50% {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes projectShine {
          from {
            left: -140%;
          }

          to {
            left: 150%;
          }
        }

        @keyframes projectBlobMove {
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
          .project-reveal {
            transform: translateY(26px) scale(0.98);
          }

          .project-reveal-visible {
            transform: translateY(0) scale(1);
          }

          .project-card:hover {
            transform: translateY(-5px);
          }

          .project-blob {
            opacity: 0.7;
            filter: blur(55px);
          }
        }

        @media (hover: none) {
          .project-card:active {
            transform: scale(0.985);
            border-color: hsl(var(--primary) / 0.35);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .project-reveal,
          .project-reveal-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .project-icon,
          .project-external-icon,
          .project-circle,
          .project-tag,
          .project-line,
          .project-blob {
            animation: none;
          }

          .project-card:hover,
          .project-card:active {
            transform: none;
          }

          .project-card:hover .project-shine {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default Projects;
