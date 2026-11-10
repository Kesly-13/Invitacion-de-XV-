import { useEffect, useRef, useState } from "react";

const EVENT = new Date("2026-12-19T19:30:00-05:00");
const MAP = "https://maps.app.goo.gl/x1VNGNFMpaok7rDA8";

type IconName = "heart" | "play" | "pause" | "pin" | "gift" | "dress" | "crown";
function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const p: Record<IconName, React.ReactNode> = {
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.9-8.8a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    play: <path d="m8 5 11 7-11 7V5Z" />,
    pause: <path d="M8 5v14M16 5v14" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    gift: (
      <>
        <path d="M3 10h18v11H3zM2 7h20v4H2zM12 7v14" />
        <path d="M12 7H7.7A2.7 2.7 0 1 1 12 3.8V7Zm0 0h4.3A2.7 2.7 0 1 0 12 3.8V7Z" />
      </>
    ),
    dress: (
      <>
        <path d="M9 3c0 2 1.2 3 3 3s3-1 3-3M9 3 7 9l3 2-5 10h14l-5-10 3-2-2-6M10 11h4" />
      </>
    ),
    crown: (
      <>
        <path d="m3 7 5 4 4-7 4 7 5-4-2 11H5L3 7Z" />
        <path d="M5 18h14" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {p[name]}
    </svg>
  );
}
function Butterfly({ className = "" }: { className?: string }) {
  return (
    <span className={`butterfly ${className}`} aria-hidden="true">
      <svg viewBox="0 0 52 44" role="presentation">
        <path className="wing upper left" d="M24 21C18 5 4 2 3 12c-1 9 10 15 21 12Z" />
        <path className="wing upper right" d="M28 21C34 5 48 2 49 12c1 9-10 15-21 12Z" />
        <path className="wing lower left" d="M24 23C13 21 7 27 11 34c4 7 12 2 15-7Z" />
        <path className="wing lower right" d="M28 23c11-2 17 4 13 11-4 7-12 2-15-7Z" />
        <path className="antennae" d="M25 10C21 4 17 4 15 6M27 10c4-6 8-6 10-4" />
        <path className="body" d="M26 11c2 0 3 3 3 7 0 8-1 17-3 20-2-3-3-12-3-20 0-4 1-7 3-7Z" />
        <circle className="head" cx="26" cy="10" r="2.5" />
      </svg>
    </span>
  );
}
function MagicRain({ className = "" }: { className?: string }) {
  return (
    <div className={`magic-rain ${className}`} aria-hidden="true">
      {Array.from({ length: 18 }, (_, index) => {
        const style = {
          "--rain-x": `${(index * 37 + 9) % 96}%`,
          "--rain-delay": `${-((index * 1.37) % 10)}s`,
          "--rain-duration": `${7 + (index % 6) * 1.15}s`,
          "--rain-size": `${2 + (index % 4)}px`,
          "--rain-drift": `${-14 + (index % 7) * 5}px`,
        } as React.CSSProperties;
        return <i key={index} style={style} />;
      })}
    </div>
  );
}
function Ambient({ variant = 0 }: { variant?: number }) {
  return (
    <div className={`ambient ambient-${variant}`} aria-hidden="true">
      <MagicRain />
      <Butterfly className="ambient-bf first" />
      <Butterfly className="ambient-bf second" />
      <i className="glint g1" />
      <i className="glint g2" />
      <i className="glint g3" />
      <i className="glint g4" />
      <i className="light-dot d1" />
      <i className="light-dot d2" />
      <i className="light-dot d3" />
    </div>
  );
}
function Flowers({ where }: { where: "top" | "bottom" }) {
  return (
    <div className={`flowers ${where}`} aria-hidden="true">
      <i />
      <i />
      <i />
      <b />
      <b />
      <b />
    </div>
  );
}
function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <Butterfly />
      <span />
    </div>
  );
}
function Section({
  children,
  className = "",
  id,
  ambient = 0,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  ambient?: number;
}) {
  return (
    <section id={id} className={`section reveal ${className}`}>
      <Ambient variant={ambient} />
      {children}
    </section>
  );
}
function Countdown() {
  const calculate = () => {
    const d = Math.max(0, EVENT.getTime() - Date.now());
    return {
      días: Math.floor(d / 86400000),
      horas: Math.floor(d / 3600000) % 24,
      minutos: Math.floor(d / 60000) % 60,
      segundos: Math.floor(d / 1000) % 60,
    };
  };
  const [time, setTime] = useState(calculate);
  useEffect(() => {
    const t = setInterval(() => setTime(calculate()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="countdown" role="timer">
      {Object.entries(time).map(([k, v]) => (
        <div key={k}>
          <strong>{String(v).padStart(2, "0")}</strong>
          <span>{k}</span>
        </div>
      ))}
    </div>
  );
}
function Calendar() {
  const days = [null, null, ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="calendar" aria-label="Diciembre de 2026, día 19">
      <div className="week">
        {["D", "L", "M", "M", "J", "V", "S"].map((x, i) => (
          <b key={i}>{x}</b>
        ))}
      </div>
      <div className="days">
        {days.map((d, i) => (
          <span className={d === 19 ? "selected" : ""} key={i}>
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [opened]);

  const toggleMusic = async () => {
  const player = audio.current;

  if (!player) return;

  try {
    if (player.paused) {
      await player.play();
      setPlaying(true);
    } else {
      player.pause();
      setPlaying(false);
    }
  } catch (error) {
    console.error("Error al reproducir la música:", error);
    setPlaying(false);
  }
};
  const open = () => {
    setOpened(true);
    if (audio.current) {
      void audio.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
    setTimeout(
      () => document.querySelector("#presentacion")?.scrollIntoView({ behavior: "smooth" }),
      950,
    );
  };
  return (
    <main>
     <audio
  ref={audio}
  src="/assets/ma-belle-evangeline-instrumental.mp3"
  preload="auto"
  onPlay={() => setPlaying(true)}
  onPause={() => setPlaying(false)}
  onEnded={() => setPlaying(false)}
  onError={() => console.error("No se pudo cargar el archivo de música")}
/>
      <div className={`opening ${opened ? "is-open" : ""}`} aria-hidden={opened}>
        <div className="cover">
          <MagicRain className="cover-rain" />
          <Flowers where="top" />
          <div className="cover-title">
            <Icon name="crown" size={48} />
            <span>Mis XV años</span>
            <h1>
              Verónica
              <br />
              Ospina Ruiz
            </h1>
          </div>
          <Butterfly className="bf-one" />
          <Butterfly className="bf-two" />
          <Butterfly className="bf-three" />
          <div className="cover-glints" aria-hidden="true">
            <i className="glint cg1" />
            <i className="glint cg2" />
            <i className="glint cg3" />
            <i className="glint cg4" />
            <i className="light-dot cd1" />
            <i className="light-dot cd2" />
          </div>
          <div className="envelope">
            <div className="env-back" />
            <div className="letter">Una noche mágica</div>
            <div className="env-left" />
            <div className="env-right" />
            <div className="env-front" />
            <div className="flap" />
          </div>
          <button className="seal" onClick={open} aria-label="Abrir la invitación">
            <Icon name="crown" size={30} />
            <small>XV</small>
          </button>
          <p className="hint">
            Presiona en el sello para
            <br />
            abrir la invitación
          </p>
          <Flowers where="bottom" />
        </div>
      </div>

      <div className="page">
        <Section id="presentacion" className="hero" ambient={1}>
            <img
    src="/assets/floresarco.png"
    className="cover-floral-arch"
    alt=""
  />
          <div className="spark a" />
          <div className="spark b" />
          <div className="spark c" />
          <Icon name="crown" size={54} />
          <p className="eyebrow">Mis XV años</p>
          <h2>
            Verónica
            <br />
            Ospina Ruiz
          </h2>
          <p className="intro">
            Existen momentos en la vida que anhelamos con mucho cariño. Uno de esos momentos ha
            llegado.
          </p>
          <div className="princess">
            <div />
            <img
              src="/assets/princess.png"
              alt="Ilustración original de Verónica con vestido verde esmeralda"
            />
            <Butterfly className="p-one" />
            <Butterfly className="p-two" />
          </div>
        </Section>

        <Section className="parents" ambient={2}>
          <Divider />
          <p className="body">
            Con la bendición de Dios y el amor de mi familia, me siento feliz de llegar a este
            momento de mi vida.
          </p>
          <div className="ornament">◆</div>
          <h3>Mis Padres</h3>
          <p className="names">
            Liliana Ruiz Fernandez
            <br />
            Carlos Andrés Ospina Sandoval
          </p>
          <p className="small">Tienen el honor de invitar a los XV de su hija.</p>
          <div className="plaque">Verónica Ospina Ruiz</div>
        </Section>

        <Section className="music" ambient={1}>
          <Butterfly className="m-bf" />
          <p className="eyebrow">Una melodía para esta noche</p>
          <h3>Ma Belle Evangeline · Instrumental</h3>
          <div className="player">
            <i />
            <button
              onClick={toggleMusic}
              aria-label={playing ? "Pausar canción" : "Reproducir canción"}
              aria-pressed={playing}
            >
              <Icon name={playing ? "pause" : "play"} size={35} />
            </button>
            <i />
          </div>
          <p className="music-help">
            <Icon name="heart" size={17} /> Presiona para escuchar la canción
          </p>
          <div className={`bars ${playing ? "active" : ""}`}>
            {[1, 2, 3, 4, 5].map((x) => (
              <i key={x} />
            ))}
          </div>
        </Section>

        <Section className="date" ambient={2}>
          <Divider />
          <p className="moment">
            Hay momentos inolvidables
            <br />
            que se atesoran en el corazón para siempre
          </p>
          <div className="date-line">
            <span>Sábado</span>
            <strong>19</strong>
            <span>7:30 p. m.</span>
          </div>
          <h3>El gran día</h3>
          <Calendar />
          <p className="month">Diciembre · 2026</p>
          <h3>Tan solo faltan</h3>
          <Countdown />
        </Section>

        <Section className="location" ambient={1}>
          <div className="princess-crop">
            <img src="/assets/princess.png" alt="" aria-hidden="true" />
          </div>
          <Butterfly className="loc-bf" />
          <div className="arch">
            <div className="bouquet" />
            <h3>Recepción</h3>
            <Icon name="pin" size={40} />
            <p>
              Cra. 4 #8-70
              <br />
              <strong>barrio Dinamon</strong>
            </p>
            <a href={MAP} target="_blank" rel="noreferrer">
              Ver ubicación
            </a>
          </div>
        </Section>

        <Section className="dress" ambient={2}>
          <Divider />
          <div className="frame">
            <h3>Código de vestimenta</h3>
            <Icon name="dress" size={50} />
            <strong>Elegante</strong>
            <p>
              El verde esmeralda y todas las tonalidades de verde están reservados exclusivamente
              para la quinceañera.
            </p>
            <p className="warning">Los invitados deben evitar cualquier tonalidad de verde.</p>
          </div>
        </Section>
        <Section className="gifts" ambient={1}>
          <div className="frame gift">
            <div className="bouquet" />
            <h3>Regalos</h3>
            <Icon name="gift" size={52} />
            <strong>Lluvia de sobres</strong>
            <p>
              Tu presencia es mi mejor regalo. Si deseas tener un detalle conmigo, será recibido con
              mucho cariño.
            </p>
          </div>
        </Section>

        <Section className="final" ambient={2}>
          <Flowers where="top" />
          <p className="eyebrow">Con mucho amor</p>
          <h3>
            Una noche, un sueño,
            <br />
            mil recuerdos
          </h3>
          <p>Gracias por ser parte de este momento tan especial.</p>
          <div className="final-princess">
            <img src="/assets/princess.png" alt="Princesa con vestido verde esmeralda" />
          </div>
          <div className="monogram">
            V<small>XV</small>
          </div>
          <Butterfly className="final-bf" />
        </Section>
      </div>
    </main>
  );
}
