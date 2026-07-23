import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mariyum Ajmal Khan —Senior Frontend Engineer" },
      { name: "description", content: "Senior Frontend Engineer with 4+ years building scalable React, TypeScript & Node.js applications. Based in Lahore, available worldwide." },
      { property: "og:title", content: "Mariyum Ajmal Khan — Senior Frontend Engineer" },
      { property: "og:description", content: "Portfolio of Mariyum Ajmal Khan — Senior Frontend Engineer specializing in React, TypeScript & scalable web apps." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      <Footer />
      <ChatWidget />
      <Toaster position="top-right" richColors />
    </main>
  );
}
