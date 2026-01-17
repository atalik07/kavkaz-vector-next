"use client";

import { useEffect, useMemo, useState } from "react";

type AnyJson = Record<string, any>;

function encodeBasic(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

function getStr(obj: any, path: string, fallback = ""): string {
  const parts = path.split(".");
  let cur = obj;
  for (const p of parts) {
    if (!cur || typeof cur !== "object") return fallback;
    cur = cur[p];
  }
  return typeof cur === "string" ? cur : fallback;
}

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

  async function load() {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await fetch("/api/admin/override", {
        headers: authHeader ? { Authorization: authHeader } : {},
      });

      if (res.status === 401) {
        setLoaded(false);
        setError("Неверный логин/пароль.");
        return;
      }

      const data = (await res.json()) as AnyJson;

      setOverrideJson(data);
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
    setSaving(true);
    setError(null);
    setNotice(null);

    // соберём новый объект на основе текущего overrideJson
    const next: AnyJson = structuredClone(overrideJson ?? {});
    setStr(next, "theme.accentColor", accentColor.trim());
    setStr(next, "telegram.account", tgAccount.trim());
    setStr(next, "telegram.group", tgGroup.trim());

    try {
      const res = await fetch("/api/admin/override", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader ? { Authorization: authHeader } : {}),
        },
        body: JSON.stringify(next),
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
      setNotice("Сохранено локально. На Vercel это заменим на GitHub-commit на следующем шаге.");
    } catch {
      setError("Ошибка сохранения.");
    } finally {
      setSaving(false);
    }
  }

  // авто-загрузка после ввода логина/пароля
  useEffect(() => {
    if (user && pass) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeader]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-extrabold tracking-tight">Админка</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        URL: <code>/optmebelug_adm</code>
      </p>

      <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/5">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">Логин</label>
          <input
            value={user}
            onChange={(e) => setUserState(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">Пароль</label>
          <input
            value={pass}
            onChange={(e) => setPassState(e.target.value)}
            type="password"
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
            {loading ? "Загрузка…" : "Загрузить"}
          </button>
        </div>
      </div>

      {loaded ? (
        <div className="mt-6 grid gap-4 rounded-2xl border border-black/10 bg-white p-5 dark:border-white/15 dark:bg-white/5">
          <div className="text-sm font-semibold text-black/70 dark:text-white/70">
            Основные настройки (MVP)
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-black/70 dark:text-white/70">
              Акцентный цвет (theme.accentColor)
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
                aria-label="Выбор цвета"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-black/70 dark:text-white/70">
              Telegram аккаунт (telegram.account)
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
              Telegram группа/каталог (telegram.group)
            </label>
            <input
              value={tgGroup}
              onChange={(e) => setTgGroup(e.target.value)}
              className="h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-base outline-none dark:border-white/15 dark:bg-white/5"
              placeholder="https://t.me/+invite"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={save}
              className="ui-btn inline-flex h-11 items-center justify-center rounded-xl bg-[color:var(--accent)] px-5 text-base font-semibold text-black hover:opacity-95 disabled:opacity-60"
              disabled={!user || !pass || saving}
            >
              {saving ? "Сохранение…" : "Сохранить"}
            </button>

            {notice ? (
              <div className="text-sm text-black/60 dark:text-white/60">{notice}</div>
            ) : null}

            {error ? (
              <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            ) : null}
          </div>

          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-semibold text-black/70 dark:text-white/70">
              Показать raw JSON
            </summary>
            <pre className="mt-3 max-h-[50vh] overflow-auto rounded-xl bg-black/5 p-4 text-xs text-black/80 dark:bg-white/5 dark:text-white/80">
              {JSON.stringify(overrideJson, null, 2)}
            </pre>
          </details>
        </div>
      ) : null}

      {!loaded ? (
        <p className="mt-6 text-sm text-black/60 dark:text-white/60">
          Введите логин/пароль и нажмите “Загрузить”.
        </p>
      ) : null}
    </main>
  );
}
