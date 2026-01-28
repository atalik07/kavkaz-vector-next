"use client";

import { useMemo, useState } from "react";
import { ru } from "@/lib/copy/ru"; // ✅ Добавили импорт базы

type AnyJson = Record<string, any>;

// --- КОНФИГУРАЦИЯ КНОПОК ---
const CTA_MODES = [
  { value: "tgAccount", label: "TG Аккаунт" },
  { value: "tgGroup", label: "TG Группа/Каталог" },
  { value: "override", label: "Своя ссылка" },
];

const CTA_REGISTRY = [
  { key: "heroPrimary", label: "Hero: Получить прайс" },
  { key: "aboutExcursion", label: "About: На экскурсию" },
  { key: "portfolio", label: "Portfolio: Перейти в Telegram" },
  { key: "stepsManager", label: "Steps: Менеджер" },
  { key: "stepsCatalog", label: "Steps: Каталог" },
  { key: "bottomCalc", label: "Низ: Запросить расчёт" },
  { key: "bottomTerms", label: "Низ: Запросить условия" },
  { key: "contactsManager", label: "Контакты: Telegram иконка" },
];
// -----------------------------

function encodeBasic(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

// Хелпер для чтения вложенных полей
function getStr(obj: any, path: string, fallback = ""): string {
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object") return fallback;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : fallback;
}

// Хелпер для записи вложенных полей
function setStr(obj: AnyJson, path: string, value: string) {
  const parts = path.split(".");
  let cur: any = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const k = parts[i];
    if (!cur[k] || typeof cur[k] !== "object") cur[k] = {};
    cur = cur[k];
  }
  cur[parts[parts.length - 1]] = value;
}

export default function AdminPage() {
  const [user, setUserState] = useState("");
  const [pass, setPassState] = useState("");

  const [overrideJson, setOverrideJson] = useState<AnyJson>({});
  const [loaded, setLoaded] = useState(false);

  // Отдельные стейты для верхних полей
  const [accentColor, setAccentColor] = useState("");
  const [tgAccount, setTgAccount] = useState("");
  const [tgGroup, setTgGroup] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const authHeader = useMemo(() => {
    if (!user || !pass) return "";
    return encodeBasic(user, pass);
  }, [user, pass]);

  // ✅ Хелпер для обновления JSON напрямую (для кнопок)
  function updateJson(path: string, value: string) {
    setOverrideJson((prev) => {
      const next = structuredClone(prev);
      setStr(next, path, value);
      return next;
    });
  }

  async function load() {
    if (!user || !pass) {
      setError("Введите логин и пароль.");
      return;
    }

    setLoading(true);
    setError(null);
    setNotice(null);

    try {
      const res = await fetch("/api/admin/override", {
        method: "GET",
        headers: { Authorization: authHeader },
        cache: "no-store",
      });

      if (res.status === 401) {
        setLoaded(false);
        setError("Неверный логин/пароль.");
        return;
      }

      if (!res.ok) {
        setLoaded(false);
        setError(`Ошибка загрузки: HTTP ${res.status} ${res.statusText}`);
        return;
      }

      const data = (await res.json()) as AnyJson;

      setOverrideJson(data);
      // Инициализируем инпуты из загруженного JSON
      setAccentColor(getStr(data, "theme.accentColor", ""));
      setTgAccount(getStr(data, "telegram.account", ""));
      setTgGroup(getStr(data, "telegram.group", ""));
      setLoaded(true);
    } catch {
      setLoaded(false);
      setError("Ошибка загрузки override.");
    } finally {
      setLoading(false);
    }
  }

  async function save() {
    if (!user || !pass) {
      setError("Введите логин и пароль.");
      return;
    }

    if (!loaded) {
      setError("Сначала нажмите “Войти”.");
      return;
    }

    setSaving(true);
    setError(null);
    setNotice(null);

    // Берем текущий JSON (где уже лежат изменения кнопок)
    const next: AnyJson = structuredClone(overrideJson ?? {});
    
    // Принудительно обновляем верхние поля из стейтов
    setStr(next, "theme.accentColor", accentColor.trim());
    setStr(next, "telegram.account", tgAccount.trim());
    setStr(next, "telegram.group", tgGroup.trim());

    try {
      const res = await fetch("/api/admin/override", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(next, null, 2),
      });

      if (res.status === 401) {
        setError("Неверный логин/пароль.");
        return;
      }

      let out: any = null;
      try {
        out = await res.json();
      } catch {}

      if (!res.ok || !out?.ok) {
        const details =
          out?.error ? String(out.error) : `HTTP ${res.status} ${res.statusText}`;
        setError(`Не удалось сохранить override: ${details}`);
        return;
      }

      setOverrideJson(next);
      setNotice("Сохранено. Изменения появятся через 3-5 минут.");
    } catch {
      setError("Ошибка сохранения.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 pb-20">
      <h1 className="text-2xl font-extrabold tracking-tight">Админка</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        URL: <code>/optmebelug_adm</code>
      </p>

      {/* --- БЛОК ЛОГИНА --- */}
      <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/5">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Логин
          </label>
          <input
            value={user}
            onChange={(e) => setUserState(e.target.value)}
            autoComplete="username"
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Пароль
          </label>
          <input
            value={pass}
            onChange={(e) => setPassState(e.target.value)}
            type="password"
            autoComplete="current-password"
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={load}
            className="ui-btn inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 text-base font-semibold text-black hover:opacity-95 disabled:opacity-60"
            disabled={!user || !pass || loading}
          >
            {loading ? "Авторизация…" : "Войти"}
          </button>

          <button
            type="button"
            onClick={save}
            className="ui-btn inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 text-base font-semibold text-black hover:opacity-95 disabled:opacity-60"
            disabled={!user || !pass || saving || !loaded}
          >
            {saving ? "Сохранение…" : "Сохранить"}
          </button>
        </div>

        {notice && <div className="text-sm text-green-600 font-medium">{notice}</div>}
        {error && <div className="text-sm text-red-600 font-medium">{error}</div>}
      </div>

      {loaded ? (
        <div className="space-y-6 mt-6">
          
          {/* --- ОСНОВНЫЕ НАСТРОЙКИ --- */}
          <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/5">
            <div className="text-lg font-bold text-black/80 dark:text-white/80 border-b border-white/10 pb-2 mb-2">
              Основные настройки
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-black/70 dark:text-white/70">
                Акцентный цвет
              </label>
              <div className="flex gap-3">
                <input
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
                  placeholder="#ff4b2b"
                />
                <input
                  type="color"
                  value={accentColor || "#ff4b2b"}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="h-11 w-14 rounded-xl border border-black/10 bg-white p-2 dark:border-white/15 dark:bg-white/5"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-black/70 dark:text-white/70">
                Telegram аккаунт (Менеджер)
              </label>
              <input
                value={tgAccount}
                onChange={(e) => setTgAccount(e.target.value)}
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
                placeholder="https://t.me/username"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold text-black/70 dark:text-white/70">
                Telegram группа/каталог
              </label>
              <input
                value={tgGroup}
                onChange={(e) => setTgGroup(e.target.value)}
                className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
                placeholder="https://t.me/+invite"
              />
            </div>
          </div>

          {/* --- РЕЕСТР КНОПОК --- */}
          <div className="grid gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/5">
            <div className="text-lg font-bold text-black/80 dark:text-white/80 border-b border-white/10 pb-2 mb-2">
              Управление кнопками
            </div>
            
            <div className="grid gap-6">
              {CTA_REGISTRY.map((cta) => {
                // 1. Получаем базу из ru.ts (дефолт)
                // @ts-ignore
                const base = ru.cta?.[cta.key] || { mode: 'tgAccount' };
                
                // 2. Смотрим overrideJson (текущее значение)
                const pathMode = `cta.${cta.key}.mode`;
                const pathOverride = `cta.${cta.key}.override`;
                
                // Если в override есть значение, берем его, иначе берем из базы
                const currentMode = getStr(overrideJson, pathMode, "") || base.mode;
                const currentOverride = getStr(overrideJson, pathOverride, "") || base.override || "";

                return (
                  <div key={cta.key} className="bg-black/5 dark:bg-white/5 p-4 rounded-xl">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <span className="font-semibold text-sm">{cta.label}</span>
                      <select
                        value={currentMode}
                        onChange={(e) => updateJson(pathMode, e.target.value)}
                        className="h-9 rounded-lg border border-black/10 bg-white px-2 text-sm outline-none dark:border-white/15 dark:bg-white/5"
                      >
                        {CTA_MODES.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>

                    {currentMode === "override" ? (
                      <input
                        type="text"
                        value={currentOverride}
                        onChange={(e) => updateJson(pathOverride, e.target.value)}
                        className="h-9 w-full rounded-lg border border-black/10 bg-white px-3 text-sm outline-none dark:border-white/15 dark:bg-white/5"
                        placeholder="https://..."
                      />
                    ) : (
                      <div className="text-xs text-black/50 dark:text-white/50 px-1">
                        Используется ссылка: {currentMode === "tgAccount" ? "На аккаунт менеджера" : "На группу/каталог"}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          Введите логин/пароль и нажмите “Войти”.
        </p>
      )}
    </main>
  );
}
