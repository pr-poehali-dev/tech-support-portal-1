import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const GET_BOOKINGS_URL = "https://functions.poehali.dev/5ea706eb-3495-4a2a-b941-a04c5bed6873";
const ADMIN_PASSWORD = "nexus2024";

interface Booking {
  id: number;
  name: string;
  phone: string;
  address: string;
  service: string;
  date: string;
  time: string;
  comment: string;
  created_at: string;
}

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuth(true);
    } else {
      setError("Неверный пароль");
    }
  };

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    fetch(GET_BOOKINGS_URL)
      .then((r) => r.json())
      .then((data) => setBookings(data.bookings || []))
      .catch(() => setError("Ошибка загрузки заявок"))
      .finally(() => setLoading(false));
  }, [auth]);

  if (!auth) {
    return (
      <div
        className="min-h-screen flex items-center justify-center grid-bg"
        style={{ background: "var(--dark)" }}
      >
        <div
          className="corner-box p-10 w-full max-w-sm"
          style={{ background: "var(--dark-card)", border: "1px solid rgba(0,245,255,0.25)" }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Icon name="Lock" size={20} style={{ color: "var(--cyan)" }} />
            <span className="section-label text-sm">Панель администратора</span>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="section-label text-xs mb-1 block opacity-55">Пароль</label>
              <input
                type="password"
                className="input-cyber text-sm"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                autoFocus
              />
            </div>
            {error && <div className="text-red-400 text-xs">{error}</div>}
            <button type="submit" className="btn-cyber-filled text-sm py-3 mt-2">
              Войти
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid-bg" style={{ background: "var(--dark)", color: "#e0f7ff" }}>
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(0,245,255,0.1)", background: "rgba(6,12,20,0.95)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-6 h-6"
            style={{
              background: "var(--cyan)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />
          <span className="font-bold tracking-widest text-sm" style={{ fontFamily: "Oswald, sans-serif", color: "var(--cyan)" }}>
            NEXUS / ЗАЯВКИ
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="section-label text-xs">Всего: {bookings.length}</span>
          </div>
          <button
            className="btn-cyber text-xs py-2 px-4"
            onClick={() => {
              setLoading(true);
              fetch(GET_BOOKINGS_URL)
                .then((r) => r.json())
                .then((data) => setBookings(data.bookings || []))
                .finally(() => setLoading(false));
            }}
          >
            <Icon name="RefreshCw" size={14} />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-20 section-label opacity-50">Загрузка...</div>
        )}

        {!loading && bookings.length === 0 && (
          <div className="text-center py-20 flex flex-col items-center gap-4">
            <Icon name="Inbox" size={40} style={{ color: "rgba(0,245,255,0.2)" }} />
            <span className="section-label opacity-40">Заявок пока нет</span>
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="flex flex-col gap-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="card-cyber p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {/* Имя и телефон */}
                <div>
                  <div className="section-label text-xs opacity-45 mb-1">Клиент</div>
                  <div className="font-bold text-white" style={{ fontFamily: "Oswald, sans-serif" }}>{b.name}</div>
                  <a
                    href={`tel:${b.phone}`}
                    className="text-sm mt-1 block"
                    style={{ color: "var(--cyan)" }}
                  >
                    {b.phone}
                  </a>
                </div>

                {/* Адрес и услуга */}
                <div>
                  <div className="section-label text-xs opacity-45 mb-1">Услуга</div>
                  <div className="text-sm text-white">{b.service || "—"}</div>
                  <div className="text-xs opacity-50 mt-1">{b.address || "—"}</div>
                </div>

                {/* Дата и время */}
                <div>
                  <div className="section-label text-xs opacity-45 mb-1">Запись</div>
                  <div className="text-sm text-white">{b.date || "—"} {b.time ? `в ${b.time}` : ""}</div>
                  {b.comment && (
                    <div className="text-xs opacity-50 mt-1 italic">«{b.comment}»</div>
                  )}
                </div>

                {/* Дата создания */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="section-label text-xs opacity-45 mb-1">Поступила</div>
                    <div className="text-xs opacity-60" style={{ fontFamily: "IBM Plex Mono, monospace" }}>
                      {b.created_at}
                    </div>
                  </div>
                  <div
                    className="section-label text-xs px-2 py-1 mt-2 inline-block"
                    style={{ border: "1px solid rgba(0,245,255,0.2)", background: "rgba(0,245,255,0.05)" }}
                  >
                    #{b.id}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
