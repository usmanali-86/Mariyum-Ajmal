import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

type Msg = { from: "bot" | "user"; text: string; time: string };

const QUICK = [
  "What services do you offer?",
  "How can I hire you?",
  "What's your tech stack?",
  "How long have you worked at i2c?",
];

function reply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("hire") || q.includes("work") || q.includes("project"))
    return "Awesome! Please fill the Contact form below or email mariyumkhan11223@gmail.com — I usually reply within 24 hours.";
  if (q.includes("service"))
    return "I build React/Next.js web apps, design systems, REST API integrations, and pixel-perfect Figma to code conversions.";
  if (q.includes("stack") || q.includes("tech"))
    return "React, TypeScript, Next.js, Node.js, Tailwind, Redux, React Query — plus testing & CI/CD.";
  if (q.includes("i2c") || q.includes("experience") || q.includes("year"))
    return "I have 4+ years of professional experience overall, including 3+ years at i2c Inc. building fintech-grade interfaces.";
  if (q.includes("location") || q.includes("where"))
    return "Based in Lahore, Pakistan — available worldwide for remote work.";
  if (q.includes("linkedin"))
    return "Sure! https://www.linkedin.com/in/mariyum-ajmal-khan-758a4613b";
  if (q.includes("hi") || q.includes("hello") || q.includes("hey"))
    return "Hi there! 👋 How can I help you today?";
  return "Thanks for your message! For a detailed reply, please use the Contact form below — I'll respond personally within 24 hours.";
}

const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: "Hi! I'm Mariyum's assistant 👋 Ask me anything about her work, experience, or how to collaborate.", time: now() },
  ]);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "user", text: t, time: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "bot", text: reply(t), time: now() }]);
      setTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 group"
      >
        {!open && <span className="absolute inset-0 rounded-full animate-pulse-ring bg-primary" />}
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant transition-transform duration-300 group-hover:scale-110">
          {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </span>
        {!open && (
          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-sm text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Chat with me
          </span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[32rem] w-[22rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant animate-scale-in">
          {/* header */}
          <div className="relative flex items-center gap-3 bg-gradient-primary p-4 text-primary-foreground">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <Sparkles className="h-5 w-5" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-400" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold">Mariyum's Assistant</div>
              <div className="text-[11px] opacity-90">Online · Typically replies instantly</div>
            </div>
          </div>

          {/* messages */}
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto bg-gradient-hero p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-fade-up`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm shadow-card-soft ${
                  m.from === "user"
                    ? "rounded-br-sm bg-gradient-primary text-primary-foreground"
                    : "rounded-bl-sm bg-card border border-border text-foreground"
                }`}>
                  <div>{m.text}</div>
                  <div className={`mt-1 text-[10px] ${m.from === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{m.time}</div>
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-fade-up">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-border bg-card px-4 py-3 shadow-card-soft">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}
          </div>

          {/* quick replies */}
          {msgs.length <= 2 && (
            <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2">
              {QUICK.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition hover:bg-primary/10"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border bg-card p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
