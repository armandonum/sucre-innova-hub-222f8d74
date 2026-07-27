import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, 
  Droplets, 
  HeartPulse, 
  Landmark, 
  Sparkles, 
  Store,
  Facebook,
  Instagram,
  Video,
  Phone } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import communityImage from "@/assets/community-action.jpg";

// IMPORTANTE: Reemplaza este enlace con la URL real de tu formulario de Google Forms.
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd5q-uD8pM_bl2zU6T_-QA1MEEPViNrxspJsoBbQWnyxJMEHw/viewform?usp=publish-editor";
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

/* ---------------- Data for Sponsors ---------------- */
const SPONSOR_LOGOS = [
  { name: "Innova", src: "/INNOVA.png" },
  { name: "USFX", src: "/USFX (1).png" },
  { name: "CORE 5G", src: "/CORE 5G.png" },
  { name: "Núcleo Linux", src: "/nucleo_Linux.png" },
  { name: "Federación Universitaria", src: "/FUL.png" },
  { name: "Chuquisaca", src: "/Logo_Vector_Chuquisaca-02.png" },
  { name: "Sociedad Científica", src: "/SOCIEDAD CIENTIFICA.png" },
];
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
  variant?: "primary" | "ghost" | "white" | "outline-red";
}) {
  const base = "group relative inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 active:scale-[0.97] overflow-hidden";
  const variants = {
    primary:
      "bg-foreground text-background hover:shadow-[0_20px_60px_-15px_var(--brand)] hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-foreground ring-1 ring-foreground/15 hover:ring-foreground hover:bg-foreground hover:text-background",
    white: "bg-white text-foreground hover:shadow-2xl hover:-translate-y-0.5",
    "outline-red":
      "bg-brand text-white hover:opacity-90 shadow-sm",
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
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-brand/30">
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
            <div className="inline-flex items-center gap-2 rounded-full bg-card/60 backdrop-blur px-4 py-1.5 ring-1 ring-foreground/10 text-xs font-medium tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
              </span>
              29 de agosto · USFX · Sucre, Bolivia
            </div>
          </Reveal>

          <div className="mt-8 grid md:grid-cols-2 gap-12 items-center">
            <Reveal delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-medium tracking-[-0.03em] leading-[0.95] text-balance">
                El futuro de Bolivia se{" "}
                <span className="italic font-normal text-shimmer">diseña</span>
                <br />
                en <span className="italic font-normal">48 horas.</span>
              </h1>
            </Reveal>
            <Reveal delay={150} className="hidden md:flex justify-center">
              <img src="/logo.jpeg" alt="Logo Sucre Innova" className="w-full max-w-sm rounded-2xl shadow-2xl" />
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="mt-10 grid md:grid-cols-2 gap-10 items-end">
              
              <div className="flex flex-wrap gap-3">
                <RegistrationButton variant="outline-red" className="h-14 pl-6 pr-3 gap-3 text-base">
                  Inscribirme ahora
                  <span className="ml-1 grid place-items-center size-10 rounded-full bg-white/15 backdrop-blur transition-transform group-hover:translate-x-1">
                    <ArrowRight />
                  </span>
                </RegistrationButton>
                <a href="#retos" className="inline-flex items-center justify-center h-14 px-6 rounded-full font-medium bg-slate-400 text-dark-gray hover:bg-slate-200 transition-colors">
                  Explorar los retos
                </a>
              </div>
            </div>
          </Reveal>

          {/* Countdown */}
          <Reveal delay={300}>
            <div className="mt-16 flex flex-wrap gap-4 items-end justify-center">

              <span className="text-xs uppercase tracking-[0.2em] text-foreground/50 mr-4 mb-2">Faltan</span>
              {[
                { v: d, l: "días" },
                { v: h, l: "horas" },
                { v: m, l: "min" },
                { v: s, l: "seg" },
              ].map((u) => (
                <div key={u.l} className="flex flex-col items-center min-w-[80px] md:min-w-[110px] rounded-2xl bg-card/70 backdrop-blur ring-1 ring-foreground/10 px-4 py-4 shadow-sm">
                  <span className="font-serif text-4xl md:text-6xl tabular-nums leading-none">
                    {String(u.v).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-[10px] uppercase tracking-widest text-foreground/50">{u.l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>



    {/* ABOUT + stats */}
<section className="py-28 px-6">
  <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
    
    {/* Columna de Texto Principal (7 columnas) */}
    <Reveal className="lg:col-span-7">
      <span className="text-xs uppercase tracking-[0.25em] text-amber-brand font-semibold">01 · El evento</span>
      <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
        Ideas que impactan.
        <br />
        
      </h2>
      
      <div className="mt-8 space-y-5 text-muted-foreground text-lg leading-relaxed max-w-[58ch]">
        <p>
          La Hackaton reúne a estudiantes de todas las disciplinas, profesionales y personas apasionadas por generar un cambio, para crear soluciones reales a problemáticas de nuestro entorno.
        </p>
        <p>
          Lo verdaderamente importante es contar con una propuesta integral.
        </p>

      </div>

      {/* Contadores */}
      <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg">
        {[
          { n: "60", l: "cupos" },
          { n: "12", l: "equipos" },
          { n: "48h", l: "presenciales" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-foreground text-background p-5">
            <div className="text-4xl md:text-5xl font-serif text-amber-600 font-normal">{s.n}</div>
            <div className="mt-2 text-[10px] uppercase tracking-widest text-slate-500 font-semibold">{s.l}</div>
          </div>
        ))}
      </div>
    </Reveal>

    {/* Columna de la Imagen (Reducida en proporciones y ancho) */}
    <Reveal delay={150} className="lg:col-span-5 flex justify-center lg:justify-end">
      <div className="relative w-full max-w-md aspect-[4/3] md:aspect-square rounded-[28px] overflow-hidden ring-1 ring-foreground/10 group">
        <img
          src={communityImage}
          alt="Participantes colaborando durante el evento"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          loading="lazy"
          width={1024} height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 text-foreground">
          <div className="font-serif italic text-lg md:text-xl leading-snug">
            "Sucre es una ciudad-taller: aquí las ideas toman forma entre su historia y el talento de su gente."
          </div>
        </div>
      </div>
    </Reveal>

  </div>
</section>

      {/* CHALLENGES */}
      <section id="retos" className="py-28 px-6 bg-card/50 backdrop-blur-xl rounded-t-[48px]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-brand font-semibold ">02 · Los retos</span>
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
      <section className="py-28 px-6 bg-card/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-brand font-semibold">03 · El equipo</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              La fórmula:{" "}
              <em className="text-brand">1 + 1 + 1</em>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-[48ch] leading-relaxed">
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
                  <span className="mt-1 grid place-items-center size-8 rounded-full bg-primary/20 text-primary font-serif shrink-0 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                    {i + 1}
                  </span>
                  <p className="text-foreground/85 pt-1">{t}</p>
                </li>
              ))}
            </ul>
          </Reveal>

         <Reveal delay={150}>
  
  <div className="relative max-w-sm mx-auto aspect-square rounded-[36px] bg-gradient-to-br from-brand/20 via-transparent to-brand-2/20 ring-1 ring-white/10 grid place-items-center overflow-hidden">
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
      {/* Reducimos el texto proporcionalmente */}
      <div className="font-serif text-5xl md:text-7xl leading-none">
        <span className="text-foreground">1</span>
        <span className="text-brand">+</span>
        <span className="text-foreground">1</span>
        <span className="text-brand">+</span>
        <span className="text-foreground">1</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Tecnología</span>
        <span>Sociales</span>
        <span>Negocios</span>
      </div>
    </div>
  </div>
</Reveal>
        </div>
      </section>

      {/* TIMELINE
      <section className="py-28 px-6 bg-card/50 backdrop-blur-xl rounded-b-[48px]">
        <div className="max-w-4xl mx-auto">
       

          <div className="mt-16 relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-foreground/20 to-transparent" />
            {SCHEDULE.map((it, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative pl-16 pb-12 group">
                  <span className="absolute left-[13px] top-2 size-6 rounded-full bg-card ring-2 ring-brand grid place-items-center">
                    <span className="size-2 rounded-full bg-brand group-hover:animate-ping" />
                  </span>
                  <div className="text-brand font-mono text-xs uppercase tracking-widest">{it.time}</div>
                  <h4 className="mt-2 font-serif text-2xl md:text-3xl">{it.title}</h4>
                  <p className="mt-2 text-muted-foreground max-w-[52ch]">{it.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.25em] text-amber-brand font-semibold">05 · Preguntas</span>
            <h2 className="mt-4 text-4xl md:text-6xl font-serif font-light tracking-tight text-balance">
              Lo que necesitás saber.
            </h2>
          </Reveal>

          <div className="mt-14 divide-y divide-foreground/10 border-y border-foreground/10">
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
                      className={`grid place-items-center size-10 rounded-full ring-1 ring-foreground/15 shrink-0 transition-transform duration-300 ${
                        open ? "rotate-45 bg-foreground text-background" : ""
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
                      <p className="pb-6 text-muted-foreground max-w-[62ch] leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      <section className="relative py-32 px-6 overflow-hidden">
  <div
    aria-hidden
    className="absolute inset-0 -z-10"
    style={{
      background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)",
    }}
  />
  <div aria-hidden className="absolute inset-0 -z-10 opacity-15 grain" />

  <div className="max-w-4xl mx-auto text-center text-white">
    <Reveal>
      <div className="font-mono text-sm uppercase tracking-[0.3em] text-white/80">
        29 · Agosto
      </div>

      <h2 className="mt-6 text-5xl md:text-8xl font-serif font-light tracking-tight text-balance leading-[0.95]">
        ¿Listo para escribir el
        <br />
        <em className="italic">próximo capítulo?</em>
      </h2>

      <p className="mt-8 text-white/90 text-lg max-w-[46ch] mx-auto">
        Cupos limitados a 60 participantes. La inscripción es individual y
        cierra el 25 de agosto.
      </p>


      <div className="mt-12">
        <RegistrationButton variant="white" className="h-16 pl-8 pr-4 gap-4 text-lg text-red-600">
          Registrar mi participación
          <span className="grid place-items-center size-12 rounded-full bg-foreground text-background">
            <ArrowRight />
          </span>
        </RegistrationButton>
      </div>
    </Reveal>
  </div>
</section>

      <Footer />
            {/* Sponsors marquee */}
      <section className="border-y border-foreground bg-card  overflow-hidden"> {/* Mantener bg-card para el tema oscuro */}
        <div className="flex animate-marquee whitespace-nowrap items-center">
          {[...SPONSOR_LOGOS, ...SPONSOR_LOGOS].map((sponsor, i) => (
            <img
              key={`${sponsor.name}-${i}`}
              src={sponsor.src}
              alt={sponsor.name}
              className="h-15 object-contain mx-8" 
              loading="lazy"
            />
          ))}
        </div>
      </section>

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
        scrolled ? "bg-white/90 backdrop-blur-lg border-b border-light-border" : "bg-white border-b border-transparent"
      }`}
    >
<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-dark-gray">
  <a href="#" className="flex items-center gap-2 font-serif italic text-xl tracking-tight">    
    {/* Logo corregido: h-8 o h-10 lo ajusta al Navbar */}
    <img 
      src="/logo.jpeg" 
      alt="Logo Sucre Innova" 
      className="h-9 w-auto rounded-lg object-contain" 
    />

    <span>Sucre <span className="text-brand">Innova</span></span>
  </a>

  <div className="hidden md:flex items-center gap-8 text-sm text-dark-gray/70">
    <a href="#retos" className="hover:text-dark-gray transition-colors">Retos</a>
    <a href="#" className="hover:text-dark-gray transition-colors">Equipos</a>
  </div>

  <RegistrationButton variant="outline-red" className="h-10 px-5 text-sm text-red-600">
    Inscribirme
  </RegistrationButton>
</div>
    </nav>
  );
}

function ChallengeCard({ number, title, description, icon: Icon }: (typeof CHALLENGES)[number]) {
  return (
    <div className="group relative p-8 rounded-3xl bg-white ring-1 ring-slate-900/10 overflow-hidden h-full transition-all duration-300 hover:-translate-y-1 hover:ring-brand hover:shadow-2xl shadow-lg">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ background: "var(--brand)" }}
      />
      <div className="relative flex items-start justify-between">
        <div className="grid place-items-center size-12 rounded-2xl bg-primary/10 text-primary">
          <Icon className="size-6" />
        </div>
        <span className="font-mono text-xs text-slate-400">{number}</span>
      </div>
      <h3 className="relative mt-8 font-serif text-2xl leading-tight text-balance text-slate-900">{title}</h3>
      <p className="relative mt-3 text-slate-600 text-sm leading-relaxed text-pretty">{description}</p>
      <div className="relative mt-8 flex items-center gap-2 text-slate-900 group-hover:text-brand text-sm font-medium  transition-colors duration-300 ">
        {/* Explorar reto <ArrowRight /> */}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-6 px-6 border-t border-foreground/10 bg-card">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
        {/* Identidad */}
        <div>
          <div className="font-serif italic text-2xl">
            Sucre <span className="text-brand">Innova</span>
          </div>
          <p className="mt-3 text-xs text-foreground/50 uppercase tracking-widest leading-relaxed">
            Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca
          </p>
        </div>

        {/* Cuándo y Dónde */}
        <div className="text-sm text-foreground/70 space-y-3">
          <div>
            <div className="font-medium text-foreground">Cuándo</div>
            <div className="mt-0.5 text-xs">Sábado 29 de agosto · 09:00</div>
          </div>
          <div>
            <div className="font-medium text-foreground">Dónde</div>
            <div className="mt-0.5 text-xs">Campus central USFX · Sucre</div>
          </div>
        </div>

        {/* Contacto y Redes */}
        <div className="flex flex-col md:items-end gap-3 text-sm">
          <div className="font-medium text-foreground">Contacto & Redes</div>
          
          {/* Teléfono / WhatsApp */}
          <a
            href="https://wa.me/59160300843"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground/70 hover:text-brand transition-colors inline-flex items-center gap-1.5"
          >
            <Phone className="size-3.5 text-brand" />
            +591 60300843
          </a>

          {/* Enlaces a Redes Sociales */}
          <div className="flex items-center gap-4 mt-1">
            <a
              href="https://www.facebook.com/share/15zF9FySkku/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 hover:bg-brand hover:text-white transition-all text-slate-700"
              title="Facebook"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href="https://www.instagram.com/sucreinnovausfx?utm_source=qr&igsh=MWpzZjZqeDBwMmh5cw=="
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 hover:bg-brand hover:text-white transition-all text-slate-700"
              title="Instagram"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href="https://www.tiktok.com/@sucreinnovausfx?_r=1&_t=ZS-98EeEkPMTvp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-slate-100 hover:bg-brand hover:text-white transition-all text-slate-700"
              title="TikTok"
            >
              <TikTokIcon className="size-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-foreground/10 text-xs text-foreground/40 flex justify-between">
        <span>© 2026 Sucre Innova USFX</span>
      </div>
    </footer>
  );
}
/* ---------------- Icons ---------------- */
function TikTokIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.901 2.858 2.895 2.895 0 0 1-2.888-2.887 2.896 2.896 0 0 1 2.888-2.887c.338 0 .66.058.961.162V9.458a6.31 6.31 0 0 0-.961-.073 6.333 6.333 0 0 0-6.333 6.333A6.333 6.333 0 0 0 9.588 22a6.333 6.333 0 0 0 6.334-6.333V9.281a8.163 8.163 0 0 0 4.782 1.528V7.362a4.856 4.856 0 0 1-1.115-.676z" />
    </svg>
  );
}
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
    icon: Droplets,
    title: "Gestión del Agua y Crisis Climática",
    description: "Uso sostenible del agua, gestión de cuencas y adaptación al cambio climático en Chuquisaca.",
  },
  {
    number: "02",
    icon: HeartPulse,
    title: "Salud Pública y Acceso Rural",
    description: "Telemedicina, gestión de citas y servicios para comunidades alejadas del centro urbano.",
  },
  {
    number: "03",
    icon: Store,
    title: "Digitalización Económica Local",
    description: "Impulso a PYMEs, comercio local y herramientas contra el contrabando.",
  },
  {
    number: "04",
    icon: BookOpen,
    title: "Educación y Deserción",
    description: "Retención estudiantil, experiencia académica y democratización del conocimiento.",
  },
  {
    number: "05",
    icon: Landmark,
    title: "Burocracia y Gobierno Abierto",
    description: "Digitalización de trámites, acceso a información pública y cercanía con la ciudadanía.",
  },
  {
    number: "✦",
    icon: Sparkles,
    title: "Reto libre",
    description: "¿Tenés una problemática urgente que no encaja? Proponela y defendela ante el jurado.",
  },
] as const;

// const SCHEDULE = [
//   { time: "22 – 28 Agosto", title: "Semana de formación", description: "Sesiones con expertos que viven las problemáticas en carne propia. Virtual + presencial." },
//   { time: "29 Agosto · 09:00", title: "Inauguración & equipos", description: "Bienvenida, charla central, presentación oficial de los 5 retos y conformación de equipos." },
//   { time: "29 Agosto · 14:00", title: "Desarrollo del prototipo", description: "Primera iteración, mentorías express y feedback rápido para afinar la propuesta." },
//   { time: "30 Agosto · 09:00", title: "Plan de implementación", description: "Cada equipo define cómo llevar el prototipo a la realidad con apoyo de mentores." },
//   { time: "30 Agosto · 16:00", title: "Pitch final & premiación", description: "10 min de presentación + 5 min de preguntas ante el jurado. Deliberación y ganadores." },
// ];

const FAQ = [
  { q: "¿Necesito saber programar?", a: "No. Al menos un miembro de cada equipo debe ser de área no tecnológica. Buscamos diseñadores, economistas, abogados, médicos, agrónomos, comunicadores y más." },
  { q: "¿Cuánto cuesta participar?", a: "La participación es completamente gratuita gracias al apoyo de la USFX y los sponsors del evento. Se incluye alimentación durante los dos días." },
  { q: "¿Puedo inscribirme con mi equipo ya armado?", a: "La inscripción es individual y los equipos se conforman durante la inauguración según las afinidades y los retos elegidos. Esto garantiza multidisciplinariedad." },

];
