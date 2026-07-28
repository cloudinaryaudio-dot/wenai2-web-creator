import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "wgenai2 — Next-generation intelligent creation" },
      { name: "description", content: "wgenai2 is a landing page for the next generation of intelligent creation. Build, iterate, and ship faster with AI-powered tools." },
      { property: "og:title", content: "wgenai2 — Next-generation intelligent creation" },
      { property: "og:description", content: "wgenai2 is a landing page for the next generation of intelligent creation. Build, iterate, and ship faster with AI-powered tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-24 sm:px-6 lg:px-8 lg:pt-32">
      <div className="glow-orb bg-primary/20 -right-32 top-0 h-96 w-96" />
      <div className="glow-orb bg-primary/10 -left-32 top-1/2 h-80 w-80" />

      <div className="relative mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Welcome to wgenai2</span>
        </div>

        <h1 className="mt-8 text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          Build intelligent systems{" "}
          <span className="text-primary">at the speed of thought.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          wgenai2 is a landing page for the next generation of intelligent creation. Explore what is possible when ideas, workflows, and AI come together in one place.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_40px_-12px_var(--color-primary)]"
          >
            Start building
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card/50 px-7 py-3 text-base font-semibold text-foreground transition-all hover:bg-card hover:text-primary"
          >
            Explore features
          </a>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Fast iteration
          </span>
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Built for scale
          </span>
          <span className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-native design
          </span>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "Rapid prototyping",
      description: "Move from concept to working prototype in minutes, not weeks. Iterate on ideas with instant feedback.",
      icon: Zap,
    },
    {
      title: "Intelligent workflows",
      description: "Automate repetitive tasks and let your system learn from every interaction.",
      icon: Sparkles,
    },
    {
      title: "Secure by default",
      description: "Enterprise-ready security and privacy controls designed into the foundation.",
      icon: Shield,
    },
  ];

  return (
    <section id="features" className="relative px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to ship faster
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A focused set of capabilities designed to help you go from idea to production with confidence.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:border-primary/30 hover:bg-card/80"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="glow-orb bg-primary/10 left-1/2 top-0 h-96 w-96 -translate-x-1/2" />

      <div className="relative mx-auto max-w-4xl rounded-3xl border border-border bg-card/50 p-8 backdrop-blur-sm sm:p-12 lg:p-16">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Why wgenai2?
        </h2>
        <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
          <p>
            Modern products need to move fast, learn continuously, and adapt to user needs. wgenai2 is built around the idea that intelligent tools should feel simple, responsive, and powerful from the first interaction.
          </p>
          <p>
            Whether you are building a new experience, streamlining operations, or exploring what is next, wgenai2 gives you a clear starting point with room to grow.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-4 pb-24 pt-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center sm:p-12">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join the early access list and be the first to experience wgenai2.
        </p>

        <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 rounded-full border border-input bg-background px-5 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            Join early access
          </button>
        </form>

        <p className="mt-4 text-sm text-muted-foreground">
          No spam. We will reach out when wgenai2 is ready for you.
        </p>
      </div>
    </section>
  );
}
