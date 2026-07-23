import {
  ArrowRight,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import profileAsset from "@/assets/mariyum-profile.jpeg";

const techStack = [
  "React.js",
  "TypeScript",
  "Node.js",
  "Next.js",
  "Tailwind CSS",
  "Redux",
  "GraphQL",
  "PostgreSQL",
  "Git",
  "Figma",
  "REST APIs",
  "TanStack",
];

const stats = [
  {
    number: 4,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: 20,
    suffix: "+",
    label: "Projects",
  },
  {
    number: 10,
    suffix: "+",
    label: "Technologies",
  },
];

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function CountUp({
  end,
  duration = 1500,
  suffix = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;

        hasAnimated.current = true;

        const startTime = performance.now();

        const animateCounter = (currentTime: number) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);

          const easedProgress =
            1 - Math.pow(1 - progress, 3);

          setCount(Math.floor(easedProgress * end));

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            setCount(end);
          }
        };

        requestAnimationFrame(animateCounter);
        observer.disconnect();
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [duration, end]);

  return (
    <span ref={elementRef}>
      {count}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative isolate min-h-screen overflow-hidden bg-gradient-hero pt-24 sm:pt-28 md:pt-32"
      >
        {/* Animated background blobs */}
        <div className="hero-blob hero-blob-one pointer-events-none absolute -left-24 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl sm:h-80 sm:w-80 md:h-96 md:w-96" />

        <div className="hero-blob hero-blob-two pointer-events-none absolute right-[-100px] top-[28%] h-64 w-64 rounded-full bg-primary-glow/25 blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-96" />

        <div className="hero-blob hero-blob-three pointer-events-none absolute bottom-16 left-[30%] h-52 w-52 rounded-full bg-accent/40 blur-3xl sm:h-64 sm:w-64 md:h-80 md:w-80" />

        {/* Background grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Background light */}
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-4 pb-16 sm:px-6 sm:pb-20 md:grid-cols-2 md:gap-12 md:px-8 md:pb-24 lg:gap-20">
          {/* Hero content */}
          <div className="order-2 text-center md:order-1 md:text-left">
            {/* Availability badge */}
            {/* <div
              className="hero-fade-up inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-primary backdrop-blur-sm sm:px-4 sm:text-xs"
              style={
                {
                  "--animation-delay": "0.05s",
                } as CSSProperties
              }
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>

              Available for new opportunities
            </div> */}

            {/* Main heading */}
            <h1
              className="hero-fade-up mt-5 text-[2.35rem] font-bold leading-[1.08] tracking-[-0.035em] text-foreground min-[380px]:text-[2.7rem] sm:text-5xl md:mt-6 md:text-[3.4rem] lg:text-6xl xl:text-7xl"
              style={
                {
                  "--animation-delay": "0.15s",
                } as CSSProperties
              }
            >
              Hi, I&apos;m{" "}
              <span className="text-gradient">
                Mariyum
              </span>

              <span className="mt-1 block text-foreground/90 sm:mt-2">
                Frontend Engineer
              </span>
            </h1>

            {/* Description */}
            <p
              className="hero-fade-up mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground min-[380px]:text-[15px] sm:mt-6 sm:text-lg sm:leading-8 md:mx-0 md:text-lg lg:text-xl lg:leading-9"
              style={
                {
                  "--animation-delay": "0.25s",
                } as CSSProperties
              }
            >
              4+ years of professional experience crafting
              scalable, responsive web applications with React.js,
              TypeScript and Node.js, including{" "}
              <span className="font-semibold text-foreground">
                4+ years at i2c Inc.
              </span>{" "}
              shipping fintech-grade interfaces.
            </p>

            {/* Contact information */}
            <div
              className="hero-fade-up mt-6 flex flex-col items-center justify-center gap-3 text-sm font-medium text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-3 md:items-start md:justify-start"
              style={
                {
                  "--animation-delay": "0.35s",
                } as CSSProperties
              }
            >
              <span className="inline-flex items-center gap-2">
                <MapPin
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary"
                />

                Pakistan
              </span>

              <a
                href="mailto:mariyumkhan11223@gmail.com"
                className="inline-flex max-w-full items-center gap-2 break-all transition-colors duration-300 hover:text-primary sm:break-normal"
              >
                <Mail
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-primary"
                />

                mariyumkhan11223@gmail.com
              </a>
            </div>

            {/* Action buttons */}
            <div
              className="hero-fade-up mt-7 flex w-full flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center md:justify-start"
              style={
                {
                  "--animation-delay": "0.45s",
                } as CSSProperties
              }
            >
              <a
                href="#contact"
                className="hero-primary-button group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-glow min-[420px]:w-auto"
              >
                Let&apos;s talk

                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/mariyum-ajmal-khan-758a4613b"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Mariyum's LinkedIn profile"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-primary/30 bg-card/80 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-primary hover:bg-primary/5 min-[420px]:w-auto"
              >
                <Linkedin
                  aria-hidden="true"
                  className="h-4 w-4 text-primary"
                />

                LinkedIn
              </a>
            </div>

            {/* Stats */}
            <div
              className="hero-fade-up mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3 sm:mt-10 sm:gap-4 md:gap-5"
              style={
                {
                  "--animation-delay": "0.55s",
                } as CSSProperties
              }
            >
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="hero-stat-card group rounded-2xl border border-border/80 bg-card/60 px-4 py-4 shadow-card-soft backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow sm:px-3 sm:py-5 lg:px-5"
                  style={
                    {
                      "--stat-delay": `${0.65 + index * 0.1}s`,
                    } as CSSProperties
                  }
                >
                  <div className="text-3xl font-bold leading-none text-gradient sm:text-[2rem] lg:text-4xl">
                    <CountUp
                      end={stat.number}
                      suffix={stat.suffix}
                    />
                  </div>

                  <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground sm:text-[9px] lg:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile image */}
          <div
            className="hero-profile-entry order-1 mx-auto flex w-full max-w-[290px] items-center justify-center sm:max-w-[360px] md:order-2 md:max-w-[430px] lg:max-w-[500px]"
            style={
              {
                "--animation-delay": "0.2s",
              } as CSSProperties
            }
          >
            <div className="hero-profile-float relative flex aspect-square w-full items-center justify-center">
              {/* Outer glow */}
              <div className="hero-profile-glow pointer-events-none absolute inset-[8%] rounded-full bg-gradient-primary opacity-30 blur-3xl" />

              {/* Decorative rings */}
              <div className="pointer-events-none absolute inset-[1%] rounded-full border border-primary/10" />

              <div className="pointer-events-none absolute inset-[6%] rounded-full border border-primary/10" />

              {/* Rotating photo border */}
              <div className="relative aspect-square w-[82%] overflow-hidden rounded-full p-[3px] sm:p-1">
                <div
                  className="hero-rotating-ring absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--primary), var(--primary-glow), var(--accent), var(--primary))",
                  }}
                />

                <div className="group relative z-10 h-full w-full overflow-hidden rounded-full bg-card ring-4 ring-background shadow-elegant">
                  <img
                    src={profileAsset}
                    alt="Mariyum Ajmal Khan, Frontend Engineer"
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Image shading */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-white/5" />

                  {/* Shimmer effect */}
                  <div className="hero-shimmer pointer-events-none absolute inset-y-0 -left-[130%] w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                </div>
              </div>

              {/* Sparkle badge */}
              <span className="hero-sparkle-badge absolute bottom-[8%] right-[8%] z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border-4 border-background bg-gradient-primary text-primary-foreground shadow-glow sm:h-13 sm:w-13 md:h-14 md:w-14">
                <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
              </span>

              {/* Orbit animations */}
              <div className="pointer-events-none absolute inset-[1%] z-20 hidden sm:block">
                <div className="hero-orbit-clockwise absolute inset-0">
                  <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-glow" />

                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary-glow shadow-glow" />
                </div>

                <div className="hero-orbit-reverse absolute inset-[5%]">
                  <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-accent-foreground/60 shadow-sm" />

                  <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary/70 shadow-glow" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology marquee */}
        <div className="relative z-10 overflow-hidden border-y border-border/60 bg-card/40 py-4 backdrop-blur-md sm:py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-background/80 to-transparent sm:w-24" />

          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-background/80 to-transparent sm:w-24" />

          <div className="hero-marquee flex w-max items-center">
            {[0, 1].map((groupIndex) => (
              <div
                key={groupIndex}
                aria-hidden={groupIndex === 1}
                className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12"
              >
                {techStack.map((technology) => (
                  <span
                    key={`${groupIndex}-${technology}`}
                    className="group inline-flex items-center gap-2 whitespace-nowrap text-xs font-semibold text-muted-foreground transition-colors duration-300 hover:text-primary sm:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-primary transition-transform duration-300 group-hover:scale-150" />

                    {technology}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All animations are included in this file */}
      <style>{`
        .hero-fade-up {
          opacity: 0;
          transform: translateY(28px);
          animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
          animation-delay: var(--animation-delay, 0s);
        }

        .hero-profile-entry {
          opacity: 0;
          transform: translateY(24px) scale(0.92);
          animation: heroProfileEntry 1s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
          animation-delay: var(--animation-delay, 0s);
        }

        .hero-stat-card {
          opacity: 0;
          transform: translateY(18px);
          animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1)
            forwards;
          animation-delay: var(--stat-delay, 0s);
        }

        .hero-blob {
          animation: heroBlob 10s ease-in-out infinite alternate;
          will-change: transform;
        }

        .hero-blob-two {
          animation-delay: -3s;
          animation-duration: 13s;
        }

        .hero-blob-three {
          animation-delay: -6s;
          animation-duration: 15s;
        }

        .hero-profile-float {
          animation: heroProfileFloat 5s ease-in-out infinite;
          will-change: transform;
        }

        .hero-profile-glow {
          animation: heroGlowPulse 3s ease-in-out infinite;
        }

        .hero-rotating-ring {
          animation: heroRingRotate 9s linear infinite;
          will-change: transform;
        }

        .hero-shimmer {
          animation: heroShimmer 4.5s ease-in-out infinite;
        }

        .hero-sparkle-badge {
          animation: heroSparklePulse 2.5s ease-in-out infinite;
        }

        .hero-orbit-clockwise {
          animation: heroRingRotate 18s linear infinite;
          will-change: transform;
        }

        .hero-orbit-reverse {
          animation: heroRingRotateReverse 24s linear infinite;
          will-change: transform;
        }

        .hero-marquee {
          animation: heroMarquee 28s linear infinite;
          will-change: transform;
        }

        .hero-marquee:hover {
          animation-play-state: paused;
        }

        .hero-primary-button {
          position: relative;
          overflow: hidden;
        }

        .hero-primary-button::before {
          content: "";
          position: absolute;
          inset: 0;
          transform: translateX(-120%);
          background: linear-gradient(
            110deg,
            transparent 20%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 80%
          );
          transition: transform 0.7s ease;
        }

        .hero-primary-button:hover::before {
          transform: translateX(120%);
        }

        @keyframes heroFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heroProfileEntry {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.92);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heroBlob {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }

          50% {
            transform: translate3d(24px, -18px, 0) scale(1.08);
          }

          100% {
            transform: translate3d(-14px, 22px, 0) scale(0.96);
          }
        }

        @keyframes heroProfileFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes heroGlowPulse {
          0%,
          100% {
            opacity: 0.22;
            transform: scale(0.96);
          }

          50% {
            opacity: 0.4;
            transform: scale(1.07);
          }
        }

        @keyframes heroRingRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes heroRingRotateReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes heroShimmer {
          0%,
          35% {
            left: -130%;
          }

          65%,
          100% {
            left: 150%;
          }
        }

        @keyframes heroSparklePulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0.35);
          }

          50% {
            transform: scale(1.08);
            box-shadow: 0 0 0 12px hsl(var(--primary) / 0);
          }
        }

        @keyframes heroMarquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 767px) {
          .hero-blob {
            filter: blur(55px);
            opacity: 0.75;
          }

          .hero-profile-float {
            animation-duration: 6s;
          }

          .hero-marquee {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-fade-up,
          .hero-profile-entry,
          .hero-stat-card {
            opacity: 1;
            transform: none;
            animation: none;
          }

          .hero-blob,
          .hero-profile-float,
          .hero-profile-glow,
          .hero-rotating-ring,
          .hero-shimmer,
          .hero-sparkle-badge,
          .hero-orbit-clockwise,
          .hero-orbit-reverse,
          .hero-marquee {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default Hero;