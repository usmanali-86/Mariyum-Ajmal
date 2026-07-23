import {
  Award,
  Briefcase,
  Code2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type SkillCategory = {
  category: string;
  items: string[];
};

type ExperienceItem = {
  icon: typeof Briefcase;
  role: string;
  company: string;
  time: string;
  description: string;
};

type RevealProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  className?: string;
};

const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "TypeScript",
      "Next.js",
      "Redux",
      "React Query",
      "Lit",
      "Tailwind CSS",
      "Bootstrap",
      "HTML5/CSS",
      "JavaScript",
      "Webpack",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "SQL", "REST APIs"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "VS Code",
      "Azure DevOps",
      "Jira",
      "DB Visualizer",
    ],
  },
  {
    category: "Other",
    items: [
      "CI/CD",
      "Accessibility (WCAG 2.2)",
      "Agile",
      "Cross-Browser",
    ],
  },
];

const experience: ExperienceItem[] = [
  {
    icon: Briefcase,
    role: " Senior Frontend Engineer",
    company: "i2c Inc. — Fintech",
    time: "Apr 2023 — Present",
    description:
      "Leading development of responsive, scalable web apps in React.js and Node.js. Built reusable UI components, optimized database queries by 20%, and mentored junior developers.",
  },
  {
    icon: Briefcase,
    role: " SeniorFrontend Engineer",
    company: "Soft Enterprise",
    time: "May 2022 — Oct 2022",
    description:
      "Built dynamic websites with WordPress, Elementor and custom JavaScript. Improved SEO, performance and cross-browser compatibility.",
  },
  {
    icon: GraduationCap,
    role: "BS Computer Science",
    company: "University",
    time: "2016 — 2020",
    description:
      "Bachelor of Science in Computer Science with a focus on web technologies, software engineering and modern application development.",
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
      className={`about-reveal about-reveal-${direction} ${
        isVisible ? "about-reveal-visible" : ""
      } ${className}`}
      style={
        {
          "--about-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function About() {
  return (
    <>
      <section
        id="about"
        className="relative isolate overflow-hidden py-16 sm:py-20 md:py-24 lg:py-28"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute -left-28 top-16 h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />

        <div className="pointer-events-none absolute -right-32 top-1/3 h-72 w-72 rounded-full bg-primary-glow/10 blur-3xl sm:h-96 sm:w-96" />

        <div className="pointer-events-none absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

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
          <Reveal direction="up">
            <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 md:mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                About me
              </div>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Crafting digital{" "}
                <span className="text-gradient">experiences</span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:mt-5 sm:text-base sm:leading-8 md:text-lg">
               Senior Frontend Engineer with{" "}
                <span className="font-semibold text-foreground">
                  4+ years of professional experience
                </span>{" "}
                building scalable and accessible web applications. I enjoy
                converting Figma designs into pixel-perfect, production-ready
                interfaces.
              </p>
            </div>
          </Reveal>

          {/* Skills cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {skillCategories.map((skillGroup, index) => (
              <Reveal
                key={skillGroup.category}
                delay={index * 120}
                direction="up"
                className="h-full"
              >
                <article className="about-skill-card group relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-border/80 bg-gradient-card p-5 shadow-card-soft backdrop-blur-sm transition-all duration-500 sm:min-h-[240px] sm:p-6">
                  {/* Hover background */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.06]" />

                  {/* Decorative circle */}
                  <div className="about-card-circle pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/10 transition-all duration-700 group-hover:scale-150 group-hover:bg-primary/15" />

                  <div className="relative z-10">
                    <div className="about-icon-wrapper inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow sm:h-14 sm:w-14">
                      <Code2 className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>

                    <h3 className="mt-5 text-lg font-bold transition-colors duration-300 group-hover:text-primary sm:text-xl">
                      {skillGroup.category}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <span
                          key={skill}
                          className="about-skill-tag rounded-lg border border-primary/10 bg-primary/10 px-2.5 py-1.5 text-[11px] font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/15 sm:text-xs"
                          style={
                            {
                              "--tag-delay": `${skillIndex * 45}ms`,
                            } as CSSProperties
                          }
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-all duration-500 group-hover:w-full" />
                </article>
              </Reveal>
            ))}
          </div>

          {/* Experience heading */}
          <Reveal delay={100}>
            <div className="mb-7 mt-14 flex items-center gap-3 sm:mb-9 sm:mt-18 md:mt-20">
              <span className="h-10 w-1 rounded-full bg-gradient-primary" />

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  My journey
                </span>

                <h3 className="mt-1 text-2xl font-bold sm:text-3xl">
                  Experience &amp; Education
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute bottom-5 left-5 top-5 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent sm:left-6" />

            <div className="space-y-6 sm:space-y-8">
              {experience.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Reveal
                    key={`${item.role}-${item.company}`}
                    delay={index * 150}
                    direction="right"
                  >
                    <div className="relative pl-12 sm:pl-16">
                      {/* Timeline icon */}
                      <div className="about-timeline-icon absolute left-0 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-gradient-primary text-primary-foreground shadow-glow sm:h-12 sm:w-12">
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>

                      {/* Timeline card */}
                      <article className="about-timeline-card group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-5 shadow-card-soft backdrop-blur-md transition-all duration-500 sm:p-6 md:p-7">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-primary opacity-0 transition-opacity duration-500 group-hover:opacity-[0.04]" />

                        <div className="relative z-10">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                            <div className="min-w-0">
                              <h4 className="text-lg font-bold transition-colors duration-300 group-hover:text-primary sm:text-xl">
                                {item.role}
                              </h4>

                              <p className="mt-1 text-sm font-semibold text-muted-foreground sm:text-base">
                                {item.company}
                              </p>
                            </div>

                            <span className="w-fit shrink-0 rounded-full border border-primary/15 bg-primary/10 px-3 py-1.5 text-[11px] font-semibold text-primary sm:text-xs">
                              {item.time}
                            </span>
                          </div>

                          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-7">
                            {item.description}
                          </p>
                        </div>

                        <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-primary transition-all duration-500 group-hover:w-full" />
                      </article>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Certification badge */}
          <Reveal delay={200} direction="scale">
            <div className="mt-10 sm:mt-12">
              <div className="about-certificate group flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-center shadow-card-soft backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow sm:w-fit sm:flex-row sm:justify-start sm:rounded-full sm:px-5 sm:py-3 sm:text-left">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
                  <Award className="h-4 w-4" />
                </span>

                <p className="text-xs font-medium leading-6 text-muted-foreground sm:text-sm">
                  <span className="font-bold text-foreground">Certified:</span>{" "}
                  Frontend Developer Internship · GitHub Copilot Fundamentals
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .about-reveal {
          opacity: 0;
          transition:
            opacity 800ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 800ms cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--about-delay, 0ms);
          will-change: opacity, transform;
        }

        .about-reveal-up {
          transform: translateY(40px);
        }

        .about-reveal-left {
          transform: translateX(40px);
        }

        .about-reveal-right {
          transform: translateX(-40px);
        }

        .about-reveal-scale {
          transform: scale(0.92);
        }

        .about-reveal-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
        }

        .about-skill-card:hover {
          transform: translateY(-8px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow:
            0 18px 45px hsl(var(--primary) / 0.12),
            0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .about-icon-wrapper {
          animation: aboutIconFloat 3.5s ease-in-out infinite;
        }

        .about-skill-card:nth-child(2) .about-icon-wrapper {
          animation-delay: -0.8s;
        }

        .about-skill-card:nth-child(3) .about-icon-wrapper {
          animation-delay: -1.6s;
        }

        .about-skill-card:nth-child(4) .about-icon-wrapper {
          animation-delay: -2.4s;
        }

        .about-card-circle {
          animation: aboutCirclePulse 5s ease-in-out infinite;
        }

        .about-skill-tag {
          animation: aboutTagPulse 4s ease-in-out infinite;
          animation-delay: var(--tag-delay, 0ms);
        }

        .about-timeline-card:hover {
          transform: translateX(6px);
          border-color: hsl(var(--primary) / 0.35);
          box-shadow:
            0 18px 45px hsl(var(--primary) / 0.1),
            0 8px 20px rgba(0, 0, 0, 0.05);
        }

        .about-timeline-icon {
          animation: aboutTimelinePulse 2.8s ease-in-out infinite;
        }

        .about-certificate:hover span {
          animation: aboutAwardRotate 0.7s ease-in-out;
        }

        @keyframes aboutIconFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-6px) rotate(3deg);
          }
        }

        @keyframes aboutCirclePulse {
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

        @keyframes aboutTagPulse {
          0%,
          100% {
            box-shadow: 0 0 0 hsl(var(--primary) / 0);
          }

          50% {
            box-shadow: 0 0 14px hsl(var(--primary) / 0.08);
          }
        }

        @keyframes aboutTimelinePulse {
          0%,
          100% {
            box-shadow:
              0 0 0 0 hsl(var(--primary) / 0.25),
              0 8px 25px hsl(var(--primary) / 0.2);
          }

          50% {
            box-shadow:
              0 0 0 9px hsl(var(--primary) / 0),
              0 8px 30px hsl(var(--primary) / 0.3);
          }
        }

        @keyframes aboutAwardRotate {
          0% {
            transform: rotate(0deg) scale(1);
          }

          50% {
            transform: rotate(12deg) scale(1.12);
          }

          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        @media (max-width: 639px) {
          .about-reveal-up {
            transform: translateY(28px);
          }

          .about-reveal-left,
          .about-reveal-right {
            transform: translateY(28px);
          }

          .about-reveal-visible {
            transform: translate3d(0, 0, 0) scale(1);
          }

          .about-skill-card:hover {
            transform: translateY(-4px);
          }

          .about-timeline-card:hover {
            transform: translateY(-3px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-reveal,
          .about-reveal-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .about-icon-wrapper,
          .about-card-circle,
          .about-skill-tag,
          .about-timeline-icon {
            animation: none;
          }

          .about-skill-card:hover,
          .about-timeline-card:hover {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}

export default About;