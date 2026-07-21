import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import communityImage from "@/assets/community-action.jpg";

// IMPORTANTE: Reemplaza este enlace con la URL real de tu formulario de Google Forms.
const GOOGLE_FORM_URL = "https://forms.google.com";
const EVENT_DATE = new Date("2026-08-29T09:00:00-04:00");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hackatón Sucre Innova USFX — 29 de Agosto" },
      { name: "description", content: "48 horas de innovación multidisciplinaria en la USFX. 29 de agosto. Resuelve retos reales de Bolivia: agua, salud rural, economía digital, educación y gobierno abierto." },
      { property: "og:title", content: "Hackatón Sucre Innova USFX — 29 de Agosto" },
      { property: "og:description", content: "48 horas para diseñar el futuro de Bolivia. Inscríbete." },
    ],
  }),
  component: Index,
});

/* ---------------- Utilities ---------------- */

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff / 3_600_000) % 24);
  const m = Math.floor((diff / 60_000) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 800ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Reusable UI ---------------- */

function RegistrationButton({
  children,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "white";
}) {
  const base = "group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-[0.97] overflow-hidden";
  const variants = {
    primary:
      "bg-ink text-white hover:shadow-[0_20px_60px_-15px_var(--brand)] hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-ink ring-1 ring-ink/15 hover:ring-ink hover:bg-ink hover:text-white",
    white: "bg-white text-ink hover:shadow-2xl hover:-translate-y-0.5",
  };
  return (
    <a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(120deg, var(--brand), var(--brand-2))" }}
        />
      )}
    </a>
  );
}

/* ---------------- Page ---------------- */

function Index() {
  const { d, h, m, s } = useCountdown(EVENT_DATE);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-surface font-sans text-ink selection:bg-brand/30">
      <Nav />

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40 px-6 grain">
        {/* animated background */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-40 animate-float-slow" style={{ background: "radial-gradient(circle, var(--brand) 0%, transparent 70%)" }} />
          <div className="absolute top-20 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-30 animate-float-slower" style={{ background: "radial-gradient(circle, var(--brand-2) 0%, transparent 70%)" }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-1.5 ring-1 ring-ink/10 text-xs font-medium tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              29 de agosto · USFX · Sucre, Bolivia
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-8 text-5xl md:text-7xl lg:text-[8.5rem] font-serif font-light tracking-[-0.03em] leading-[0.95] text-balance">
              El futuro de Bolivia se{" "}
              <span className="italic font-normal text-shimmer">diseña</span>
              <br />
              en <span className="italic font-normal">48 horas.</span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10 grid md:grid-cols-2 gap-10 items-end">
              <p className="text-lg md:text-xl text-ink/70 max-w-[52ch] text-pretty leading-relaxed">
                Hackatón multidisciplinaria de Innova, USFX, CORE 5G y Núcleo Linux.
                Cinco retos reales. Sesenta mentes brillantes. Una ciudad milenaria
                convertida en laboratorio de ideas.
              </p>
              <div className="flex flex-wrap gap-3">
                <RegistrationButton variant="primary" className="h-14 pl-6 pr-3 gap-3 text-base">
                  Inscribirme ahora
                  <span className="ml-1 grid place-items-center size-10 rounded-full bg-white/15 backdrop-blur transition-transform group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </RegistrationButton>
                <a href="#retos" className="inline-flex items-center gap-2 h-14 px-6 rounded-full font-medium ring-1 ring-ink/15 hover:bg-white transition-colors">
                  Explorar los retos
                </a>
              </div>
            </div>
          </Reveal>

          {/* Countdown */}
          <Reveal delay={300}>
            <div className="mt-16 flex flex-wrap gap-4 items-end">
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50 mr-4 mb-2">Faltan</span>
              {[
                { v: d, l: "días" },
                { v: h, l: "horas" },
                { v: m, l: "min" },
                { v: s, l: "seg" },
              ].map((u) => (
                <div key={u.l} className="flex flex-col items-center min-w-[80px] md:min-w-[110px] rounded-2xl bg-white/70 backdrop-blur ring-1 ring-ink/10 px-4 py-4 shadow-sm">
                  <span className="font-serif text-4xl md:text-6xl tabular-nums leading-none">
                    {String(u.v).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-[10px] uppercase tracking-widest text-ink/50">{u.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sponsors marquee */}
      <section className="border-y border-ink/5 bg-white py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-16 text-ink/40 font-serif italic text-xl">
          {[...Array(2)].flatMap((_, i) =>
            ["Innova", "USFX", "CORE 5G", "Núcleo Linux", "Federación Universitaria", "Chuquisaca"].map((n) => (
              <span key={`${i}-${n}`} className="tracking-tight">
                — {n}
              </span>
            ))
          )}
        </div>
      </section>

      {/* ABOUT + stats */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">01 · El evento</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              No es solo código.
              <br />
              Es <em className="text-brand">Bolivia resolviéndose a sí misma.</em>
            </h2>
            <div className="mt-8 space-y-5 text-ink/70 text-lg leading-relaxed max-w-[58ch]">
              <p>
                Sucre Innova reúne durante una semana intensa a estudiantes de
                todas las facultades para prototipar soluciones a problemáticas
                reales del país. Aceptamos maquetas, wireframes, modelos de
                negocio y MVPs funcionales.
              </p>
              <p>
                Lo importante es la <strong className="text-ink">aplicabilidad</strong> y
                la <strong className="text-ink">viabilidad</strong> de tu solución
                — no el stack que uses.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
              {[
                { n: "60", l: "cupos" },
                { n: "12", l: "equipos" },
                { n: "48h", l: "presenciales" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-ink text-white p-5">
                  <div className="text-4xl md:text-5xl font-serif">{s.n}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-[36px] overflow-hidden ring-1 ring-ink/10 group">
              <img
                src={communityImage}
                alt="Estudiantes colaborando durante la hackatón"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                loading="lazy"
                width={1024} height={1024}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-serif italic text-2xl leading-snug">
                  "Chuquisaca es una ciudad-taller: aquí las ideas se prototipan
                  entre patios coloniales y aulas universitarias."
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGES */}
      <section id="retos" className="py-28 px-6 bg-ink text-white rounded-t-[48px]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">02 · Los retos</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance max-w-4xl">
              Cinco frentes donde tu solución puede cambiarlo todo.
            </h2>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHALLENGES.map((c, i) => (
              <Reveal key={c.number} delay={i * 80}>
                <ChallengeCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM FORMATION */}
      <section className="py-28 px-6 bg-ink text-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">03 · El equipo</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              La fórmula:{" "}
              <em className="text-brand">1 + 1 + 1</em>
            </h2>
            <p className="mt-6 text-white/70 text-lg max-w-[48ch] leading-relaxed">
              No necesitas llegar con equipo. El primer día facilitamos dinámicas
              de networking para que encuentres los perfiles que completan tu idea.
            </p>
            <ul className="mt-10 space-y-5">
              {[
                "Equipos de 3 a 5 personas de distintas facultades.",
                "Al menos un miembro de área no tecnológica: salud, economía, derecho, ciencias sociales, agronomía.",
                "Los equipos se conforman en la inauguración según la problemática elegida.",
                "Mentorías técnicas y de negocio disponibles todo el evento.",
              ].map((t, i) => (
                <li key={i} className="flex gap-4 items-start group">
                  <span className="mt-1 grid place-items-center size-8 rounded-full bg-brand/20 text-brand font-serif shrink-0 transition-all group-hover:bg-brand group-hover:text-white">
                    {i + 1}
                  </span>
                  <p className="text-white/85 pt-1">{t}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative aspect-square rounded-[36px] bg-gradient-to-br from-brand/20 via-transparent to-brand-2/20 ring-1 ring-white/10 grid place-items-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-brand/30"
                    style={{
                      width: `${40 + i * 20}%`,
                      height: `${40 + i * 20}%`,
                      animation: `pulse-ring 3s ${i * 0.6}s ease-out infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="relative text-center">
                <div className="font-serif text-7xl md:text-9xl leading-none">
                  <span className="text-white">1</span>
                  <span className="text-brand">+</span>
                  <span className="text-white">1</span>
                  <span className="text-brand">+</span>
                  <span className="text-white">1</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 text-[10px] uppercase tracking-widest text-white/60">
                  <span>Tecnología</span>
                  <span>Sociales</span>
                  <span>Negocios</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-28 px-6 bg-ink text-white rounded-b-[48px]">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">04 · Cronograma</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              De la formación al pitch final.
            </h2>
          </Reveal>

          <div className="mt-16 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-white/20 to-transparent" />
            {SCHEDULE.map((it, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative pl-16 pb-12 group">
                  <span className="absolute left-[13px] top-2 size-6 rounded-full bg-ink ring-2 ring-brand grid place-items-center">
                    <span className="size-2 rounded-full bg-brand group-hover:animate-ping" />
                  </span>
                  <div className="text-brand font-mono text-xs uppercase tracking-widest">{it.time}</div>
                  <h4 className="mt-2 font-serif text-2xl md:text-3xl">{it.title}</h4>
                  <p className="mt-2 text-white/60 max-w-[52ch]">{it.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-brand font-semibold">05 · Preguntas</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              Lo que necesitás saber.
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
            {FAQ.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full text-left py-6 flex items-center justify-between gap-6 group"
                  >
                    <span className="font-serif text-xl md:text-2xl group-hover:text-brand transition-colors">
                      {f.q}
                    </span>
                    <span
                      className={`grid place-items-center size-10 rounded-full ring-1 ring-ink/15 shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45 bg-ink text-white" : ""
                      }`}
                    >
                      <Plus />
                    </span>
                  </button>
                  <div
                    className="grid transition-all duration-500 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 text-ink/70 max-w-[62ch] leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)" }} />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-30 grain" />
        <div className="max-w-4xl mx-auto text-center text-white">
          <Reveal>
            <div className="font-mono text-sm uppercase tracking-[0.3em] text-white/80">29 · Agosto</div>
            <h2 className="mt-6 text-5xl md:text-8xl font-serif font-light tracking-tight text-balance leading-[0.95]">
              ¿Listo para escribir el
              <br />
              <em>próximo capítulo?</em>
            </h2>
            <p className="mt-8 text-white/85 text-lg max-w-[46ch] mx-auto">
              Cupos limitados a 60 participantes. La inscripción es individual y
              cierra el 25 de agosto.
            </p>
            <div className="mt-12">
              <RegistrationButton variant="white" className="h-16 pl-8 pr-4 gap-4 text-lg">
                Registrar mi participación
                <span className="grid place-items-center size-12 rounded-full bg-ink text-white">
                  <ArrowRight />
                </span>
              </RegistrationButton>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ---------------- Sub components ---------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/80 backdrop-blur-xl border-b border-ink/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 font-serif italic text-xl tracking-tight">
          Sucre <span className="text-brand">Innova</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-ink/70">
          <a href="#retos" className="hover:text-ink transition-colors">Retos</a>
          <a href="#" className="hover:text-ink transition-colors">Equipos</a>
          <a href="#" className="hover:text-ink transition-colors">Cronograma</a>
        </div>
        <RegistrationButton variant="primary" className="h-10 px-5 text-sm">
          Inscribirme
        </RegistrationButton>
      </div>
    </nav>
  );
}

function ChallengeCard({ number, title, description, icon }: (typeof CHALLENGES)[number]) {
  return (
    <div className="group relative p-8 rounded-3xl bg-white/[0.03] ring-1 ring-white/10 overflow-hidden h-full transition-all duration-500 hover:bg-white/[0.06] hover:-translate-y-1 hover:ring-brand/40">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ background: "var(--brand)" }}
      />
      <div className="relative flex items-start justify-between">
        <div className="grid place-items-center size-12 rounded-2xl bg-brand/10 text-brand text-2xl">
          {icon}
        </div>
        <span className="font-mono text-xs text-white/40">{number}</span>
      </div>
      <h3 className="relative mt-8 font-serif text-2xl leading-tight text-balance">{title}</h3>
      <p className="relative mt-3 text-white/60 text-sm leading-relaxed text-pretty">{description}</p>
      <div className="relative mt-8 flex items-center gap-2 text-brand text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        Explorar reto <ArrowRight />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-ink/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="font-serif italic text-2xl">Sucre <span className="text-brand">Innova</span></div>
          <p className="mt-3 text-xs text-ink/50 uppercase tracking-widest">
            Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca
          </p>
        </div>
        <div className="text-sm text-ink/60">
          <div className="font-medium text-ink">Cuándo</div>
          <div className="mt-1">Sábado 29 de agosto · 09:00</div>
          <div className="mt-4 font-medium text-ink">Dónde</div>
          <div className="mt-1">Campus central USFX · Sucre</div>
        </div>
        <div className="flex md:justify-end gap-6 text-sm text-ink/60 font-medium">
          <a href="#" className="hover:text-brand transition-colors">Bases</a>
          <a href="#" className="hover:text-brand transition-colors">Contacto</a>
          <a href="#" className="hover:text-brand transition-colors">Instagram</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-ink/5 text-xs text-ink/40 flex justify-between">
        <span>© 2026 Sucre Innova USFX</span>
        <span>Hecho con café boliviano.</span>
      </div>
    </footer>
  );
}

/* ---------------- Icons ---------------- */

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function Plus() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* ---------------- Data ---------------- */

const CHALLENGES = [
  {
    number: "01",
    icon: "💧",
    title: "Gestión del Agua y Crisis Climática",
    description: "Uso sostenible del agua, gestión de cuencas y adaptación al cambio climático en Chuquisaca.",
  },
  {
    number: "02",
    icon: "🩺",
    title: "Salud Pública y Acceso Rural",
    description: "Telemedicina, gestión de citas y servicios para comunidades alejadas del centro urbano.",
  },
  {
    number: "03",
    icon: "🛒",
    title: "Digitalización Económica Local",
    description: "Impulso a PYMEs, comercio local y herramientas contra el contrabando.",
  },
  {
    number: "04",
    icon: "📚",
    title: "Educación y Deserción",
    description: "Retención estudiantil, experiencia académica y democratización del conocimiento.",
  },
  {
    number: "05",
    icon: "🏛️",
    title: "Burocracia y Gobierno Abierto",
    description: "Digitalización de trámites, acceso a información pública y cercanía con la ciudadanía.",
  },
  {
    number: "✦",
    icon: "🌱",
    title: "Reto libre",
    description: "¿Tenés una problemática urgente que no encaja? Proponela y defendela ante el jurado.",
  },
] as const;

const SCHEDULE = [
  { time: "22 – 28 Agosto", title: "Semana de formación", description: "Sesiones con expertos que viven las problemáticas en carne propia. Virtual + presencial." },
  { time: "29 Agosto · 09:00", title: "Inauguración & equipos", description: "Bienvenida, charla central, presentación oficial de los 5 retos y conformación de equipos." },
  { time: "29 Agosto · 14:00", title: "Desarrollo del prototipo", description: "Primera iteración, mentorías express y feedback rápido para afinar la propuesta." },
  { time: "30 Agosto · 09:00", title: "Plan de implementación", description: "Cada equipo define cómo llevar el prototipo a la realidad con apoyo de mentores." },
  { time: "30 Agosto · 16:00", title: "Pitch final & premiación", description: "10 min de presentación + 5 min de preguntas ante el jurado. Deliberación y ganadores." },
];

const FAQ = [
  { q: "¿Necesito saber programar?", a: "No. Al menos un miembro de cada equipo debe ser de área no tecnológica. Buscamos diseñadores, economistas, abogados, médicos, agrónomos, comunicadores y más." },
  { q: "¿Cuánto cuesta participar?", a: "La participación es completamente gratuita gracias al apoyo de la USFX y los sponsors del evento. Se incluye alimentación durante los dos días." },
  { q: "¿Puedo inscribirme con mi equipo ya armado?", a: "La inscripción es individual y los equipos se conforman durante la inauguración según las afinidades y los retos elegidos. Esto garantiza multidisciplinariedad." },
  { q: "¿Qué debo presentar al final?", a: "Un prototipo (puede ser maqueta, wireframe, MVP funcional o modelo de negocio) y un pitch de 10 minutos ante el jurado." },
  { q: "¿Cuál es el premio?", a: "Los equipos ganadores reciben mentoría continuada, acceso a incubación y premios en efectivo para llevar su solución a la realidad." },
];
