import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fachada LED — Documentación · Control ESP32 v5.1.0" },
      {
        name: "description",
        content:
          "Documentación oficial del proyecto Fachada LED: control inteligente de tiras RGB y reflectores 220V con ESP32. Instalación, componentes, esquema de conexión y uso.",
      },
      { property: "og:title", content: "Fachada LED — Documentación ESP32" },
      {
        property: "og:description",
        content:
          "Guía completa: componentes, GPIOs, armado, instalación y uso del sistema Fachada LED v5.1.0 (GPL-3.0).",
      },
    ],
  }),
  component: DocsPage,
});

/* -------- Data -------- */

const SECTIONS = [
  { id: "introduccion", label: "Introducción" },
  { id: "caracteristicas", label: "Características" },
  { id: "componentes", label: "Componentes" },
  { id: "gpio", label: "Conexiones GPIO" },
  { id: "esquema", label: "Esquema de armado" },
  { id: "instalacion", label: "Instalación" },
  { id: "uso", label: "Uso" },
  { id: "reset", label: "Reset de fábrica" },
  { id: "licencia", label: "Licencia" },
  { id: "autor", label: "Autor" },
];

const GPIO_ROWS: { gpio: string; func: string; comp: string; group: "T1" | "T2" | "T3" | "REF" | "SYS" }[] = [
  { gpio: "26", func: "Tira 1 — Rojo", comp: "Relé T1R", group: "T1" },
  { gpio: "27", func: "Tira 1 — Verde", comp: "Relé T1G", group: "T1" },
  { gpio: "14", func: "Tira 1 — Azul", comp: "Relé T1B", group: "T1" },
  { gpio: "25", func: "Tira 2 — Rojo", comp: "Relé T2R", group: "T2" },
  { gpio: "4", func: "Tira 2 — Verde", comp: "Relé T2G", group: "T2" },
  { gpio: "32", func: "Tira 2 — Azul", comp: "Relé T2B", group: "T2" },
  { gpio: "19", func: "Tira 3 — Rojo", comp: "Relé T3R", group: "T3" },
  { gpio: "18", func: "Tira 3 — Verde", comp: "Relé T3G", group: "T3" },
  { gpio: "5", func: "Tira 3 — Azul", comp: "Relé T3B", group: "T3" },
  { gpio: "22", func: "Reflector 1", comp: "Relé Ref1", group: "REF" },
  { gpio: "23", func: "Reflector 2", comp: "Relé Ref2", group: "REF" },
  { gpio: "0", func: "Botón BOOT (Reset)", comp: "Pulsador", group: "SYS" },
];

const GROUP_STYLES: Record<string, string> = {
  T1: "bg-red-50 text-red-700 ring-red-200",
  T2: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  T3: "bg-blue-50 text-blue-700 ring-blue-200",
  REF: "bg-amber-50 text-amber-700 ring-amber-200",
  SYS: "bg-neutral-100 text-neutral-700 ring-neutral-200",
};

const COMPONENTS = [
  { name: "ESP32 DevKit v1", qty: "1", note: "Microcontrolador principal con WiFi integrado." },
  { name: "Módulo relé 5V — 16 canales (o 2×8)", qty: "1", note: "Activación en LOW. Se usan 11 canales." },
  { name: "Tiras LED RGB 220V", qty: "3", note: "Un canal (R/G/B) por relé." },
  { name: "Reflectores 220V", qty: "2", note: "Controlados por relés independientes." },
  { name: "Fuente 5V ≥ 2A", qty: "1", note: "Alimenta ESP32 y bobinas de los relés." },
  { name: "Cable AWG 14 / 18", qty: "—", note: "AWG 14 para 220V, AWG 18–22 para señales." },
  { name: "Borneras, portafusibles, gabinete IP", qty: "—", note: "Recomendado para instalación fija." },
];

const STEPS = [
  {
    title: "Preparar el hardware",
    body: "Monta el ESP32 y el módulo de relés en un gabinete ventilado. Separa físicamente el cableado de baja tensión (5V) del de 220V.",
  },
  {
    title: "Cableado de señales",
    body: "Conecta cada GPIO indicado en la tabla al IN correspondiente del relé. Une los GND del ESP32 y del módulo de relés.",
  },
  {
    title: "Cableado de potencia (220V)",
    body: "Cada canal RGB de cada tira pasa por un relé (normalmente abierto). Los reflectores se cablean del mismo modo. Usa fusibles y respeta la fase.",
  },
  {
    title: "Cargar el firmware",
    body: "Abre sketch_jun1a_V2.ino en Arduino IDE, selecciona ESP32 Dev Module, instala ArduinoJson y sube el código.",
  },
  {
    title: "Conectar y configurar",
    body: "Conéctate a la red Fachada_LED (clave 12345678) y abre http://192.168.4.1 para acceder al panel web.",
  },
];

/* -------- Component -------- */

function DocsPage() {
  const [active, setActive] = useState("introduccion");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(s.id);
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const copy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900" style={{ fontFamily: "var(--font-sans)" }}>
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-neutral-900 text-white">
              <span className="text-sm font-bold">FL</span>
            </div>
            <div>
              <div className="text-sm font-semibold leading-tight">Fachada LED</div>
              <div className="text-xs text-neutral-500 leading-tight">Documentación · v5.1.0</div>
            </div>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              GPL-3.0
            </span>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
              ESP32
            </span>
            <a
              href="#instalacion"
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800"
            >
              Empezar
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-10 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:self-start">
          <nav className="space-y-1">
            <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Contenido
            </div>
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active === s.id
                    ? "bg-neutral-900 text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="min-w-0 space-y-20">
          {/* Hero */}
          <section id="introduccion" className="scroll-mt-24">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-neutral-500">
              <span>Proyecto</span>
              <span>›</span>
              <span>Fachada LED</span>
              <span>›</span>
              <span className="text-neutral-900">Introducción</span>
            </div>
            <h1
              className="text-4xl font-semibold tracking-tight text-neutral-900 md:text-5xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Control inteligente de fachada con ESP32
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600">
              Sistema para controlar 3 tiras LED RGB y 2 grupos de reflectores mediante relés a 220V,
              con programación horaria, modo dinámico, escenas personalizadas y sincronización NTP.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["11 relés", "8 horarios NVS", "Web responsive", "WiFi AP + NTP", "Reset por BOOT"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 font-medium text-neutral-700 ring-1 ring-neutral-200"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatCard k="v5.1.0" v="Versión actual" />
              <StatCard k="11" v="Relés controlados" />
              <StatCard k="8" v="Horarios programables" />
            </div>
          </section>

          {/* Características */}
          <section id="caracteristicas" className="scroll-mt-24">
            <H2>Características</H2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Control de 11 relés (3 tiras RGB + 2 reflectores)",
                "Hasta 8 horarios programados guardados en memoria NVS",
                'Opción "Personalizado" para elegir colores por tira',
                "Modo dinámico (Bolivia ↔ Blanco cada 30 segundos)",
                "Sincronización automática de hora vía NTP",
                "Interfaz web responsive",
                "Persistencia total de configuraciones",
                "Reset de fábrica por botón BOOT",
              ].map((f) => (
                <li
                  key={f}
                  className="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-700"
                >
                  <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-neutral-900 text-[10px] text-white">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* Componentes */}
          <section id="componentes" className="scroll-mt-24">
            <H2>Componentes requeridos</H2>
            <p className="mt-2 text-neutral-600">
              Lista mínima para replicar el proyecto. Todo se consigue en tiendas de electrónica locales.
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-4 py-3">Componente</th>
                    <th className="px-4 py-3">Cantidad</th>
                    <th className="px-4 py-3">Notas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {COMPONENTS.map((c) => (
                    <tr key={c.name} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-medium text-neutral-900">{c.name}</td>
                      <td className="px-4 py-3 text-neutral-700">{c.qty}</td>
                      <td className="px-4 py-3 text-neutral-600">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout kind="warn" title="Seguridad eléctrica">
              El circuito trabaja con <strong>220V</strong>. Toda intervención debe hacerse con el sistema
              desenergizado. Se recomienda supervisión de un electricista para la instalación final.
            </Callout>
          </section>

          {/* GPIO */}
          <section id="gpio" className="scroll-mt-24">
            <H2>Conexiones GPIO (ESP32)</H2>
            <p className="mt-2 text-neutral-600">
              Los relés se activan con nivel <Code>LOW</Code> (<Code>RELAY_ON LOW</Code>).
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-neutral-200">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wider text-neutral-500">
                  <tr>
                    <th className="px-4 py-3">GPIO</th>
                    <th className="px-4 py-3">Función</th>
                    <th className="px-4 py-3">Componente</th>
                    <th className="px-4 py-3">Grupo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {GPIO_ROWS.map((r) => (
                    <tr key={r.gpio} className="hover:bg-neutral-50">
                      <td className="px-4 py-3 font-mono font-semibold text-neutral-900">{r.gpio}</td>
                      <td className="px-4 py-3 text-neutral-700">{r.func}</td>
                      <td className="px-4 py-3 font-mono text-neutral-600">{r.comp}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${GROUP_STYLES[r.group]}`}
                        >
                          {r.group}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Esquema */}
          <section id="esquema" className="scroll-mt-24">
            <H2>Esquema de armado</H2>
            <p className="mt-2 text-neutral-600">
              Distribución lógica del sistema: el ESP32 envía señales a la placa de relés, que a su vez
              conmuta la línea de 220V hacia las tiras y reflectores.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-6">
                <div className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Diagrama de bloques
                </div>
                <pre className="overflow-x-auto text-xs leading-6 text-neutral-800">{`
 ┌────────────┐   señales   ┌────────────────┐
 │   ESP32    │────────────▶│  Módulo Relés  │
 │  DevKit    │    (LOW)    │   5V · 11 ch   │
 └─────┬──────┘             └───────┬────────┘
       │ 5V                         │ 220V
       │                            ├──▶ Tira 1 (R/G/B)
       │                            ├──▶ Tira 2 (R/G/B)
       │                            ├──▶ Tira 3 (R/G/B)
       │                            ├──▶ Reflector 1
       │                            └──▶ Reflector 2
 ┌─────┴──────┐
 │ Fuente 5V  │
 └────────────┘
`}</pre>
              </div>

              <div className="space-y-3">
                <InfoRow k="Alimentación lógica" v="5V estabilizados para ESP32 y bobinas de relés." />
                <InfoRow k="Alimentación de potencia" v="220V AC conmutados por los contactos NA de cada relé." />
                <InfoRow k="Aislamiento" v="Optoacopladores integrados en el módulo de relés." />
                <InfoRow k="Tierras" v="GND común entre ESP32 y módulo de relés (sólo en el lado 5V)." />
                <InfoRow k="Protección" v="Fusible en la fase antes de las cargas 220V." />
              </div>
            </div>
          </section>

          {/* Instalación */}
          <section id="instalacion" className="scroll-mt-24">
            <H2>Instalación paso a paso</H2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="flex gap-4 rounded-lg border border-neutral-200 bg-white p-5"
                >
                  <div className="grid h-9 w-9 flex-none place-items-center rounded-full bg-neutral-900 text-sm font-semibold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">{s.title}</div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Librerías requeridas (Arduino IDE)
                </div>
                <button
                  onClick={() =>
                    copy("ArduinoJson\nWiFi (incluida)\nWebServer (incluida)\nNTPClient (opcional)", "libs")
                  }
                  className="text-xs font-medium text-neutral-600 hover:text-neutral-900"
                >
                  {copied === "libs" ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-4 text-xs leading-6 text-neutral-100">
{`ArduinoJson
WiFi          (incluida en el core ESP32)
WebServer     (incluida en el core ESP32)
NTPClient     (opcional, ya incluido)`}
              </pre>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Acceso a la interfaz
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-5 text-sm">
                <div className="grid gap-2 sm:grid-cols-3">
                  <div>
                    <div className="text-xs text-neutral-500">Red WiFi</div>
                    <div className="font-mono font-semibold">Fachada_LED</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Contraseña</div>
                    <div className="font-mono font-semibold">12345678</div>
                  </div>
                  <div>
                    <div className="text-xs text-neutral-500">Panel web</div>
                    <div className="font-mono font-semibold">http://192.168.4.1</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Uso */}
          <section id="uso" className="scroll-mt-24">
            <H2>Uso de la interfaz web</H2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <UseCard title="Escenas" desc="Control rápido de iluminaciones predefinidas (Bolivia, blanco, apagado, dinámico)." />
              <UseCard title="Horarios" desc="Programa encendido y apagado automático. Hasta 8 horarios guardados en NVS." />
              <UseCard title="Personalizado" desc="Elige colores independientes por cada tira y guarda la configuración." />
              <UseCard title="Config" desc="Cambia la red WiFi, sincroniza la hora por NTP o realiza un reset de fábrica." />
            </div>
          </section>

          {/* Reset */}
          <section id="reset" className="scroll-mt-24">
            <H2>Reset de fábrica</H2>
            <p className="mt-2 text-neutral-600">
              Mantén presionado el botón <Code>BOOT</Code> (GPIO 0) durante varios segundos para borrar
              la configuración y volver al modo Access Point inicial.
            </p>
            <Callout kind="info" title="¿Qué se borra?">
              Credenciales WiFi guardadas, horarios programados y escenas personalizadas almacenadas en NVS.
            </Callout>
          </section>

          {/* Licencia */}
          <section id="licencia" className="scroll-mt-24">
            <H2>Licencia</H2>
            <p className="mt-2 text-neutral-600">
              Este proyecto es <strong>Software Libre</strong> bajo la{" "}
              <strong>Licencia Pública General GNU v3.0 (GPL-3.0)</strong>. Puedes usarlo, modificarlo y
              redistribuirlo respetando los términos de la licencia.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-200">
              GPL-3.0 · Software Libre
            </div>
          </section>

          {/* Autor */}
          <section id="autor" className="scroll-mt-24">
            <H2>Autor</H2>
            <div className="mt-4 rounded-lg border border-neutral-200 bg-white p-6">
              <div className="text-lg font-semibold text-neutral-900">Armando Nuñez Condori</div>
              <div className="mt-1 text-sm text-neutral-600">
                Proyecto <strong>Fachada LED</strong> — desarrollado para el control inteligente de fachadas
                con ESP32.
              </div>
            </div>
          </section>

          <footer className="border-t border-neutral-200 pt-8 text-xs text-neutral-500">
            Fachada LED v5.1.0 · Documentación generada para el proyecto de control de fachada.
          </footer>
        </main>

        {/* Right rail */}
        <aside className="hidden lg:sticky lg:top-20 lg:block lg:h-[calc(100vh-6rem)] lg:self-start">
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs">
            <div className="mb-2 font-semibold uppercase tracking-wider text-neutral-500">
              En esta página
            </div>
            <ul className="space-y-1.5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={`block truncate ${
                      active === s.id ? "font-semibold text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------- Small pieces -------- */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-semibold tracking-tight text-neutral-900 md:text-3xl"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h2>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.85em] text-neutral-800">
      {children}
    </code>
  );
}

function StatCard({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-5">
      <div className="text-2xl font-semibold text-neutral-900" style={{ fontFamily: "var(--font-serif)" }}>
        {k}
      </div>
      <div className="mt-1 text-sm text-neutral-500">{v}</div>
    </div>
  );
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{k}</div>
      <div className="mt-1 text-sm text-neutral-700">{v}</div>
    </div>
  );
}

function UseCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="group rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900">
      <div className="font-semibold text-neutral-900">{title}</div>
      <div className="mt-1 text-sm text-neutral-600">{desc}</div>
    </div>
  );
}

function Callout({
  kind,
  title,
  children,
}: {
  kind: "info" | "warn";
  title: string;
  children: React.ReactNode;
}) {
  const styles =
    kind === "warn"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-blue-200 bg-blue-50 text-blue-900";
  const tag = kind === "warn" ? "⚠" : "ⓘ";
  return (
    <div className={`mt-6 rounded-lg border p-4 text-sm ${styles}`}>
      <div className="font-semibold">
        <span className="mr-2">{tag}</span>
        {title}
      </div>
      <div className="mt-1 leading-relaxed">{children}</div>
    </div>
  );
}
