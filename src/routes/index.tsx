import { createFileRoute } from "@tanstack/react-router";
import communityImage from "@/assets/community-action.jpg";

// IMPORTANTE: Reemplaza este enlace con la URL real de tu formulario de Google Forms.
const GOOGLE_FORM_URL = "https://forms.google.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hackatón Sucre Innova USFX — Innovación para Bolivia" },
      { name: "description", content: "Participa en la hackathon multidisciplinaria de la USFX. Resuelve retos reales de Bolivia en 48 horas. Inscríbete ahora." },
      { property: "og:title", content: "Hackatón Sucre Innova USFX" },
      { property: "og:description", content: "48 horas para resolver retos reales de Bolivia. Inscríbete ahora." },
    ],
  }),
  component: Index,
});

function RegistrationButton({
  children,
  className,
  variant = "primary",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "white";
}) {
  const base = "inline-flex items-center justify-center rounded-full font-medium transition-transform active:scale-95";
  const variants = {
    primary: "bg-brand text-white ring-1 ring-brand hover:brightness-110",
    secondary: "bg-white text-ink ring-1 ring-black/5 hover:bg-neutral-50",
    white: "bg-white text-brand hover:scale-[1.02]",
  };
  return (
    <a
      href={GOOGLE_FORM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className ?? ""}`}
    >
      {children}
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-surface font-sans text-ink selection:bg-brand/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold tracking-tight text-lg">Sucre Innova USFX</span>
          <RegistrationButton variant="primary" className="text-sm h-9 px-4">
            Inscribirme ahora
          </RegistrationButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 px-6 bg-brand/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-start gap-8">
            <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
              100% presencial en la USFX
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none text-balance max-w-[20ch]">
              El futuro de Bolivia se diseña hoy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-[56ch] text-pretty">
              Únete a la Hackatón Sucre Innova USFX. 48 horas de innovación,
              prototipos y comunidad para resolver problemáticas reales de
              Chuquisaca y Bolivia.
            </p>
            <div className="flex flex-wrap gap-4">
              <RegistrationButton
                variant="primary"
                className="h-12 pl-6 pr-8 gap-3"
              >
                Llenar formulario de registro
              </RegistrationButton>
              <a
                href="#retos"
                className="inline-flex items-center justify-center h-12 px-8 rounded-full font-medium bg-white text-ink ring-1 ring-black/5 hover:bg-neutral-50 transition-colors"
              >
                Ver los retos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About / Why participate */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight mb-6">
              ¿Qué es Sucre Innova?
            </h2>
            <div className="space-y-4 text-muted-foreground text-pretty">
              <p>
                Es un evento multidisciplinario de innovación tecnológica y
                social organizado por Innova, la Federación Universitaria, el
                Centro de Estudiantes CORE 5G y la Comunidad Núcleo Linux, con
                el apoyo académico de la USFX.
              </p>
              <p>
                No se trata solo de código: se aceptan prototipos de todo tipo,
                desde maquetas y wireframes hasta modelos de negocio y MVPs
                funcionales. Lo importante es la aplicabilidad y viabilidad de
                tu solución.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-100 rounded-2xl ring-1 ring-black/5">
                <div className="text-2xl font-semibold text-brand">60</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Participantes máx.</div>
              </div>
              <div className="p-4 bg-neutral-100 rounded-2xl ring-1 ring-black/5">
                <div className="text-2xl font-semibold text-brand">12</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Equipos</div>
              </div>
              <div className="p-4 bg-neutral-100 rounded-2xl ring-1 ring-black/5">
                <div className="text-2xl font-semibold text-brand">3-5</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Integrantes</div>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-neutral-100 rounded-[32px] ring-1 ring-black/5 overflow-hidden">
            <img
              src={communityImage}
              alt="Estudiantes colaborando durante la hackatón en un patio universitario"
              className="w-full h-full object-cover"
              loading="lazy"
              width={1024}
              height={1024}
            />
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section id="retos" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Cinco retos para innovar
            </h2>
            <p className="text-muted-foreground max-w-[56ch] text-pretty">
              Los proyectos deben abordar problemáticas reales de Bolivia. Elige
              el eje que más te apasione y desarrolla una solución con impacto.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ChallengeCard
              number="01"
              title="Gestión del Agua y Crisis Climática"
              description="Soluciones para el uso sostenible del agua, la gestión de cuencas y la adaptación al cambio climático en Chuquisaca."
            />
            <ChallengeCard
              number="02"
              title="Salud Pública y Acceso en Zonas Rurales"
              description="Mejora el acceso a salud, telemedicina, citas y gestión de servicios en comunidades alejadas del centro urbano."
            />
            <ChallengeCard
              number="03"
              title="Digitalización de la Economía Local"
              description="Impulsa a PYMEs, comercio local y herramientas contra el contrabando mediante tecnología accesible."
            />
            <ChallengeCard
              number="04"
              title="Educación y Deserción Escolar/Universitaria"
              description="Propuestas para retener estudiantes, mejorar la experiencia académica y democratizar el acceso al conocimiento."
            />
            <ChallengeCard
              number="05"
              title="Burocracia, Tramitología y Gobierno Abierto"
              description="Digitaliza trámites, facilita el acceso a la información pública y acerca el Estado a la ciudadanía."
            />
          </div>
        </div>
      </section>

      {/* Team Formation */}
      <section className="py-24 px-6 bg-ink text-white rounded-[40px] mx-4 mb-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight mb-6">
              Forma tu equipo
            </h2>
            <p className="text-neutral-400 text-lg mb-8 max-w-[48ch] text-pretty">
              No necesitas llegar con un equipo cerrado. Durante la jornada
              inaugural facilitaremos dinámicas de networking para que encuentres
              los perfiles que complementen tu idea.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-brand shrink-0"></div>
                <p className="text-neutral-300">
                  Equipos de 3 a 5 personas de diferentes facultades y áreas.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-brand shrink-0"></div>
                <p className="text-neutral-300">
                  Cada equipo debe incluir al menos un miembro de área no
                  tecnológica: salud, economía, ciencias sociales, derecho,
                  agronomía, etc.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-brand shrink-0"></div>
                <p className="text-neutral-300">
                  Los equipos se conforman el primer día según la problemática o
                  idea que decidan abordar.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 size-2 rounded-full bg-brand shrink-0"></div>
                <p className="text-neutral-300">
                  Mentorías técnicas y de negocio disponibles durante todo el
                  evento.
                </p>
              </li>
            </ul>
          </div>
          <div className="aspect-square bg-white/5 rounded-[32px] ring-1 ring-white/10 grid place-items-center p-8">
            <div className="text-center">
              <div className="text-6xl font-semibold text-brand mb-2">1+1+1</div>
              <p className="text-sm text-neutral-400 uppercase tracking-widest">
                Tecnología + sociales + negocios
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold tracking-tight mb-12 text-center">
            Cronograma del evento
          </h2>
          <div className="space-y-0 divide-y divide-ink/5">
            <ScheduleItem
              time="Semana previa"
              title="Formación con mentores"
              description="7 días de sesiones virtuales y presenciales con expertos que explican las problemáticas reales desde quienes las viven."
            />
            <ScheduleItem
              time="Día 1 — Mañana"
              title="Inauguración y conformación de equipos"
              description="Bienvenida, charla central, presentación oficial de los 5 retos, formación de equipos y asignación de espacios."
            />
            <ScheduleItem
              time="Día 1 — Tarde y Noche"
              title="Desarrollo del prototipo"
              description="Primera iteración de la solución, mentorías y feedback rápido para afinar la propuesta."
            />
            <ScheduleItem
              time="Día 2 — Mañana"
              title="Plan de implementación"
              description="Cada equipo define el plan para llevar su prototipo a la realidad con el apoyo de mentores."
            />
            <ScheduleItem
              time="Día 2 — Tarde"
              title="Pitch final y premiación"
              description="10 minutos de presentación + 5 minutos de preguntas ante el jurado. Deliberación, anuncio de ganadores y cierre."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-brand">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl font-semibold tracking-tight text-white mb-6 text-balance">
            ¿Listo para construir el Bolivia que queremos?
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-[48ch]">
            Las plazas son limitadas para garantizar una experiencia de calidad.
            Regístrate individualmente y forma parte del cambio.
          </p>
          <RegistrationButton
            variant="white"
            className="h-14 pl-4 pr-8 gap-4 text-lg"
          >
            <div className="size-10 bg-brand/10 rounded-full flex items-center justify-center">
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </div>
            Registrar mi participación
          </RegistrationButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-ink/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-semibold tracking-tight">Sucre Innova USFX</span>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca
            </p>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground font-medium">
            <a href="#" className="hover:text-brand transition-colors">
              Bases del evento
            </a>
            <a href="#" className="hover:text-brand transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ChallengeCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="p-8 bg-neutral-100 ring-1 ring-black/5 rounded-[24px] flex flex-col gap-4 h-full">
      <div className="size-10 bg-brand/10 rounded-xl flex items-center justify-center">
        <span className="text-brand font-bold">{number}</span>
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
        {description}
      </p>
    </div>
  );
}

function ScheduleItem({
  time,
  title,
  description,
}: {
  time: string;
  title: string;
  description: string;
}) {
  return (
    <div className="py-8 flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12">
      <span className="text-brand font-semibold whitespace-nowrap sm:w-40">
        {time}
      </span>
      <div>
        <h4 className="font-medium mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
