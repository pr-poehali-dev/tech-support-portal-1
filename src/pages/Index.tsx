import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const IMG1 = "https://cdn.poehali.dev/projects/17be7819-c3a5-4be8-8aef-5cc7cf2ac6c1/files/1ea1596c-c982-40f0-b13c-4d9f6741c16c.jpg";
const IMG2 = "https://cdn.poehali.dev/projects/17be7819-c3a5-4be8-8aef-5cc7cf2ac6c1/files/60c7d496-afe6-4b8e-8f23-8656603ad67f.jpg";
const IMG3 = "https://cdn.poehali.dev/projects/17be7819-c3a5-4be8-8aef-5cc7cf2ac6c1/files/d1380789-43ea-4730-8e0e-2b47726c1d0d.jpg";

const SERVICES = [
  {
    icon: "Shield",
    num: "01",
    title: "Кибербезопасность",
    desc: "Комплексная защита инфраструктуры. Аудит, пентест, реагирование на инциденты в режиме 24/7.",
    tags: ["Аудит", "Пентест", "SOC"],
  },
  {
    icon: "Cpu",
    num: "02",
    title: "IT-инфраструктура",
    desc: "Проектирование и поддержка отказоустойчивых систем. Облако, гибрид, on-premise.",
    tags: ["Cloud", "Hybrid", "On-premise"],
  },
  {
    icon: "Zap",
    num: "03",
    title: "Автоматизация",
    desc: "Роботизация процессов, ИИ-интеграции, снижение операционных расходов до 60%.",
    tags: ["RPA", "AI/ML", "DevOps"],
  },
  {
    icon: "MonitorCheck",
    num: "04",
    title: "Удалённая поддержка",
    desc: "Оперативное подключение к вашей системе. Решаем задачи без выезда специалиста.",
    tags: ["24/7", "Remote", "SLA"],
  },
];

const PORTFOLIO = [
  {
    img: IMG1,
    num: "PRJ-001",
    title: "Цифровой командный центр",
    category: "Инфраструктура",
    year: "2024",
  },
  {
    img: IMG2,
    num: "PRJ-002",
    title: "Система защиты периметра",
    category: "Кибербезопасность",
    year: "2024",
  },
  {
    img: IMG3,
    num: "PRJ-003",
    title: "Нейросетевой мониторинг",
    category: "AI / Автоматизация",
    year: "2023",
  },
];

function NavBar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(6,12,20,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,245,255,0.1)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo("hero")}>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div
              className="absolute inset-0 animate-rotate-slow"
              style={{
                border: "1px solid rgba(0,245,255,0.4)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
            <div
              className="w-3 h-3"
              style={{
                background: "var(--cyan)",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              }}
            />
          </div>
          <span
            className="text-xl font-bold tracking-widest animate-flicker"
            style={{ fontFamily: "Oswald, sans-serif", color: "var(--cyan)" }}
          >
            NEXUS
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: "Услуги", id: "services" },
            { label: "Портфолио", id: "portfolio" },
            { label: "Контакты", id: "contacts" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="section-label hover:opacity-100 opacity-60 transition-opacity duration-200 text-xs"
            >
              {item.label}
            </button>
          ))}
          <button className="btn-cyber text-sm py-2 px-6" onClick={onBook}>
            Записаться
          </button>
        </nav>

        <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--cyan)" }}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ background: "rgba(6,12,20,0.98)", borderBottom: "1px solid rgba(0,245,255,0.1)" }}
        >
          {[
            { label: "Услуги", id: "services" },
            { label: "Портфолио", id: "portfolio" },
            { label: "Контакты", id: "contacts" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="section-label text-left py-2 opacity-80 hover:opacity-100"
            >
              {item.label}
            </button>
          ))}
          <button className="btn-cyber-filled text-sm mt-2" onClick={onBook}>
            Записаться
          </button>
        </div>
      )}
    </header>
  );
}

function HeroSection({ onBook }: { onBook: () => void }) {
  const [typed, setTyped] = useState("");
  const fullText = "Технологии, которые работают на вас.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div className="absolute top-24 left-8 opacity-20 hidden lg:block">
        <div style={{ width: 60, height: 60, borderTop: "1px solid var(--cyan)", borderLeft: "1px solid var(--cyan)" }} />
      </div>
      <div className="absolute bottom-24 right-8 opacity-20 hidden lg:block">
        <div style={{ width: 60, height: 60, borderBottom: "1px solid var(--cyan)", borderRight: "1px solid var(--cyan)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div
          className="inline-flex items-center gap-2 mb-8 px-4 py-2"
          style={{ border: "1px solid rgba(0,245,255,0.25)", background: "rgba(0,245,255,0.05)" }}
        >
          <div className="w-2 h-2 rounded-full animate-pulse-glow" style={{ background: "var(--cyan)" }} />
          <span className="section-label text-xs opacity-80">Система активна · Принимаем заявки</span>
        </div>

        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none tracking-tight"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          <span className="block text-white">МЫ СТРОИМ</span>
          <span className="block neon-text animate-flicker">ЦИФРОВОЕ</span>
          <span className="block text-white">БУДУЩЕЕ</span>
        </h1>

        <div
          className="text-lg md:text-xl mb-10 min-h-8"
          style={{ color: "rgba(224,247,255,0.55)", fontFamily: "IBM Plex Mono, monospace" }}
        >
          {typed}
          <span className="animate-blink" style={{ color: "var(--cyan)" }}>_</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-cyber-filled text-base px-10 py-4" onClick={onBook}>
            Записаться на консультацию
          </button>
          <button
            className="btn-cyber text-base px-10 py-4"
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          >
            Наши услуги
          </button>
        </div>

        <div
          className="grid grid-cols-3 gap-6 mt-20 pt-8"
          style={{ borderTop: "1px solid rgba(0,245,255,0.1)" }}
        >
          {[
            { num: "150+", label: "Проектов завершено" },
            { num: "8 лет", label: "На рынке" },
            { num: "99.9%", label: "Аптайм систем" },
          ].map((stat) => (
            <div key={stat.num} className="text-center">
              <div
                className="text-3xl md:text-4xl font-bold neon-text mb-1"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                {stat.num}
              </div>
              <div className="text-xs opacity-45" style={{ fontFamily: "IBM Plex Mono, monospace", letterSpacing: "0.1em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35 animate-float">
        <span className="section-label text-xs">Scroll</span>
        <Icon name="ChevronDown" size={18} style={{ color: "var(--cyan)" }} />
      </div>
    </section>
  );
}

function ServicesSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="services" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.03) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="hex-dot" />
            <span className="section-label">/ 01 — Услуги</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              ЧТО МЫ <span className="neon-text">ДЕЛАЕМ</span>
            </h2>
            <p className="text-sm max-w-sm opacity-45" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              Полный цикл технологических решений для вашего бизнеса
            </p>
          </div>
          <div className="cyber-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map((s) => (
            <div key={s.num} className="card-cyber corner-box p-8 group cursor-pointer">
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-12 h-12 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400"
                  style={{ border: "1px solid rgba(0,245,255,0.3)", background: "rgba(0,245,255,0.05)" }}
                >
                  <Icon name={s.icon} fallback="Cpu" size={22} style={{ color: "var(--cyan)" }} />
                </div>
                <span className="num-accent text-lg">{s.num}</span>
              </div>
              <h3
                className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors"
                style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}
              >
                {s.title}
              </h3>
              <p className="text-sm opacity-55 leading-relaxed mb-5">{s.desc}</p>
              <div className="flex gap-2 flex-wrap">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="section-label text-xs px-3 py-1"
                    style={{ border: "1px solid rgba(0,245,255,0.15)", background: "rgba(0,245,255,0.04)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-cyber text-sm px-12 py-4" onClick={onBook}>
            Обсудить проект
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24 px-6 relative grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="hex-dot" />
            <span className="section-label">/ 02 — Портфолио</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              НАШИ <span className="neon-text">ПРОЕКТЫ</span>
            </h2>
            <p className="text-sm max-w-sm opacity-45" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
              Реализованные решения для клиентов по всей России
            </p>
          </div>
          <div className="cyber-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PORTFOLIO.map((p) => (
            <div key={p.num} className="card-cyber group cursor-pointer overflow-hidden">
              <div className="relative overflow-hidden" style={{ height: 220 }}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(6,12,20,0.9) 0%, rgba(6,12,20,0.1) 60%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute top-4 right-4 px-2 py-1"
                  style={{ background: "rgba(6,12,20,0.8)", border: "1px solid rgba(0,245,255,0.3)" }}
                >
                  <span className="section-label text-xs opacity-80">{p.num}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="section-label text-xs opacity-55">{p.category}</span>
                  <span className="num-accent">{p.year}</span>
                </div>
                <h3
                  className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors"
                  style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}
                >
                  {p.title}
                </h3>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="section-label text-xs">Подробнее</span>
                  <Icon name="ArrowRight" size={14} style={{ color: "var(--cyan)" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BookingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", phone: "", address: "", service: "", date: "", time: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetch("https://functions.poehali.dev/31a46c07-8325-475d-82f8-691075236db3", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setError("Ошибка отправки. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(6,12,20,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg corner-box p-8"
        style={{
          background: "var(--dark-card)",
          border: "1px solid rgba(0,245,255,0.3)",
          boxShadow: "0 0 60px rgba(0,245,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 opacity-50 hover:opacity-100 transition-opacity"
          onClick={onClose}
        >
          <Icon name="X" size={20} style={{ color: "var(--cyan)" }} />
        </button>

        {!submitted ? (
          <>
            <div className="mb-6">
              <span className="section-label text-xs">Запись на сеанс</span>
              <h3
                className="text-2xl font-bold text-white mt-2"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                ЗАПИСЬ НА <span className="neon-text">КОНСУЛЬТАЦИЮ</span>
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label text-xs mb-1 block opacity-55">Имя</label>
                  <input
                    className="input-cyber text-sm"
                    placeholder="Иван Иванов"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="section-label text-xs mb-1 block opacity-55">Телефон</label>
                  <input
                    className="input-cyber text-sm"
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="section-label text-xs mb-1 block opacity-55">Адрес</label>
                <input
                  className="input-cyber text-sm"
                  placeholder="Ваш адрес"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="section-label text-xs mb-1 block opacity-55">Услуга</label>
                <select
                  className="input-cyber text-sm"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  required
                  style={{ cursor: "pointer", appearance: "none" }}
                >
                  <option value="" style={{ background: "#0a1220" }}>Выберите услугу</option>
                  <option value="cyber" style={{ background: "#0a1220" }}>Кибербезопасность</option>
                  <option value="infra" style={{ background: "#0a1220" }}>IT-инфраструктура</option>
                  <option value="auto" style={{ background: "#0a1220" }}>Автоматизация</option>
                  <option value="remote" style={{ background: "#0a1220" }}>Удалённая поддержка</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="section-label text-xs mb-1 block opacity-55">Дата</label>
                  <input
                    className="input-cyber text-sm"
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                    style={{ colorScheme: "dark" }}
                  />
                </div>
                <div>
                  <label className="section-label text-xs mb-1 block opacity-55">Время</label>
                  <select
                    className="input-cyber text-sm"
                    value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    required
                    style={{ cursor: "pointer", appearance: "none" }}
                  >
                    <option value="" style={{ background: "#0a1220" }}>Выбрать</option>
                    {["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map(t => (
                      <option key={t} value={t} style={{ background: "#0a1220" }}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="section-label text-xs mb-1 block opacity-55">Комментарий (необязательно)</label>
                <textarea
                  className="input-cyber text-sm resize-none"
                  rows={3}
                  placeholder="Кратко опишите задачу..."
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                />
              </div>

              {error && (
                <div className="text-xs text-red-400 px-3 py-2" style={{ border: "1px solid rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.05)" }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-cyber-filled w-full mt-2 text-sm py-4" disabled={loading}>
                {loading ? "Отправка..." : "Отправить заявку"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-8 gap-6">
            <div
              className="w-16 h-16 flex items-center justify-center animate-pulse-glow"
              style={{ border: "1px solid var(--cyan)", background: "rgba(0,245,255,0.08)" }}
            >
              <Icon name="Check" size={28} style={{ color: "var(--cyan)" }} />
            </div>
            <div>
              <h3 className="text-2xl font-bold neon-text mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                ЗАЯВКА ПРИНЯТА
              </h3>
              <p className="text-sm opacity-50">Свяжемся в течение 30 минут для подтверждения</p>
            </div>
            <button className="btn-cyber text-sm px-8 py-3" onClick={onClose}>
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ContactsSection({ onBook }: { onBook: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contacts" className="py-24 px-6 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 20% 100%, rgba(0,245,255,0.04) 0%, transparent 60%)" }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="hex-dot" />
            <span className="section-label">/ 03 — Контакты</span>
          </div>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2
              className="text-4xl md:text-6xl font-bold text-white"
              style={{ fontFamily: "Oswald, sans-serif" }}
            >
              ВЫЙТИ НА <span className="neon-text">СВЯЗЬ</span>
            </h2>
          </div>
          <div className="cyber-divider mt-8" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-8">
            <div
              className="corner-box p-8"
              style={{ background: "rgba(0,245,255,0.05)", border: "1px solid rgba(0,245,255,0.25)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Video" size={20} style={{ color: "var(--cyan)" }} />
                <span className="section-label text-xs">Удалённая консультация</span>
              </div>
              <h3
                className="text-xl font-bold text-white mb-2"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Запишитесь на сеанс онлайн
              </h3>
              <p className="text-sm opacity-55 mb-6 leading-relaxed">
                Решаем задачи без выезда. Подключимся удалённо и разберём вашу ситуацию — быстро и конфиденциально.
              </p>
              <button className="btn-cyber-filled text-sm" onClick={onBook}>
                Ваш адрес: Алексеевка, Благовещенский р-н, с. Алексеевка, д. 43
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 906 824 84 83" },
                { icon: "Mail", label: "Email", val: "skotolikov@mail.ru" },
                { icon: "MapPin", label: "Адрес", val: "Алексеевка, Центральная улица, дом 43, Благовещенский р-н" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Пт 9:00–19:00 / Поддержка 24/7" },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ border: "1px solid rgba(0,245,255,0.1)", background: "rgba(0,245,255,0.02)" }}
                >
                  <div
                    className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{ border: "1px solid rgba(0,245,255,0.2)" }}
                  >
                    <Icon name={c.icon} fallback="Circle" size={16} style={{ color: "var(--cyan)" }} />
                  </div>
                  <div>
                    <div className="section-label text-xs opacity-45 mb-0.5">{c.label}</div>
                    <div className="text-sm text-white">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-cyber corner-box p-8">
            {!sent ? (
              <>
                <div className="mb-6">
                  <span className="section-label text-xs opacity-55">Быстрое сообщение</span>
                  <h3
                    className="text-xl font-bold text-white mt-1"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    Напишите нам
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="section-label text-xs mb-1 block opacity-55">Имя</label>
                    <input
                      className="input-cyber text-sm"
                      placeholder="Иван Иванов"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="section-label text-xs mb-1 block opacity-55">Email</label>
                    <input
                      className="input-cyber text-sm"
                      type="email"
                      placeholder="ivan@company.ru"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="section-label text-xs mb-1 block opacity-55">Сообщение</label>
                    <textarea
                      className="input-cyber text-sm resize-none"
                      rows={5}
                      placeholder="Расскажите о вашей задаче..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                  <button type="submit" className="btn-cyber-filled text-sm py-4 mt-2">
                    Отправить сообщение
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center py-12 gap-5">
                <div
                  className="w-14 h-14 flex items-center justify-center animate-pulse-glow"
                  style={{ border: "1px solid var(--cyan)", background: "rgba(0,245,255,0.08)" }}
                >
                  <Icon name="CheckCheck" size={24} style={{ color: "var(--cyan)" }} />
                </div>
                <div>
                  <h3 className="text-xl font-bold neon-text mb-2" style={{ fontFamily: "Oswald, sans-serif" }}>
                    СООБЩЕНИЕ ОТПРАВЛЕНО
                  </h3>
                  <p className="text-sm opacity-45">Ответим в течение 1 рабочего часа</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6" style={{ borderTop: "1px solid rgba(0,245,255,0.08)" }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-5 h-5"
            style={{
              background: "var(--cyan)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              opacity: 0.7,
            }}
          />
          <span
            className="font-bold tracking-widest opacity-55 text-sm"
            style={{ fontFamily: "Oswald, sans-serif", color: "var(--cyan)" }}
          >
            NEXUS
          </span>
        </div>
        <div className="section-label text-xs opacity-25">
          © 2024 NEXUS Technologies. Все права защищены.
        </div>
        <div className="flex items-center gap-2 opacity-30">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="section-label text-xs">Systems online</span>
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div style={{ background: "var(--dark)", minHeight: "100vh" }}>
      <NavBar onBook={() => setBookingOpen(true)} />
      <HeroSection onBook={() => setBookingOpen(true)} />
      <ServicesSection onBook={() => setBookingOpen(true)} />
      <PortfolioSection />
      <ContactsSection onBook={() => setBookingOpen(true)} />
      <Footer />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}