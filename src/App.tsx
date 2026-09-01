import React, { useMemo, useState } from "react";

type Dev = "A" | "B";
type Prio = "P0" | "P1" | "P2";

interface Task {
  id: string;
  dev: Dev;
  start: string;
  end: string;
  prio: Prio;
  area: string;
  title: string;
}

const TASKS: Task[] = [
  // Dev A — Back
  { id: "BE-01", dev: "A", start: "2026-09-01", end: "2026-09-02", prio: "P0", area: "security", title: "Configuration CORS + permissions DRF" },
  { id: "BE-05", dev: "A", start: "2026-09-01", end: "2026-09-01", prio: "P2", area: "admin", title: "Organisation dashboard Django par catégorie" },
  { id: "BE-15", dev: "A", start: "2026-09-01", end: "2026-09-02", prio: "P2", area: "model", title: "Référentiel CPAM/URSSAF" },
  { id: "BE-02", dev: "A", start: "2026-09-03", end: "2026-09-08", prio: "P0", area: "auth", title: "Connexion utilisateur JWT (login/refresh/logout)" },
  { id: "BE-03", dev: "A", start: "2026-09-09", end: "2026-09-11", prio: "P0", area: "auth", title: "Double authentification TOTP" },
  { id: "BE-16", dev: "A", start: "2026-09-14", end: "2026-09-15", prio: "P2", area: "api", title: "Exposition CCN/Prévoyance" },
  { id: "BE-06", dev: "A", start: "2026-09-14", end: "2026-09-18", prio: "P0", area: "calcul", title: "Règles de calcul IJSS" },
  { id: "BE-07", dev: "A", start: "2026-09-21", end: "2026-09-23", prio: "P1", area: "calcul", title: "Anomalies modulaires via PostgreSQL" },
  { id: "BE-08", dev: "A", start: "2026-09-24", end: "2026-09-25", prio: "P1", area: "model", title: "Extension modèle MoteurAnomalieDetectee" },
  { id: "BE-09", dev: "A", start: "2026-09-28", end: "2026-09-30", prio: "P1", area: "api", title: "Endpoints agrégation dashboard" },
  { id: "BE-10", dev: "A", start: "2026-10-01", end: "2026-10-05", prio: "P1", area: "api", title: "TemplateCourrier + génération courrier" },
  { id: "BE-11", dev: "A", start: "2026-10-04", end: "2026-10-05", prio: "P1", area: "api", title: "DocumentAnomalie (checklist pièces)" },
  { id: "BE-12", dev: "A", start: "2026-10-06", end: "2026-10-07", prio: "P1", area: "api", title: "JournalAction (historique métier)" },
  { id: "BE-13", dev: "A", start: "2026-10-08", end: "2026-10-08", prio: "P1", area: "api", title: "Endpoint changement de statut anomalie" },
  { id: "BE-14", dev: "A", start: "2026-10-09", end: "2026-10-13", prio: "P1", area: "automation", title: "Relances automatiques par email (Celery)" },
  { id: "BE-04", dev: "A", start: "2026-10-12", end: "2026-10-13", prio: "P2", area: "auth", title: "Extension rôles utilisateurs Vue client" },
  { id: "BE-17", dev: "A", start: "2026-10-14", end: "2026-10-16", prio: "P2", area: "vue-client", title: "Endpoints Vue client par profil" },

  // Dev B — Front
  { id: "FE-01", dev: "B", start: "2026-09-01", end: "2026-09-03", prio: "P0", area: "layout", title: "Navbar consultant modulaire (mobile-first)" },
  { id: "FE-02", dev: "B", start: "2026-09-01", end: "2026-09-02", prio: "P0", area: "layout", title: "Navbar client modulaire (mobile-first)" },
  { id: "FE-08", dev: "B", start: "2026-09-04", end: "2026-09-10", prio: "P1", area: "calcul", title: "Route calculateur IJSS" },
  { id: "FE-13", dev: "B", start: "2026-09-07", end: "2026-09-09", prio: "P0", area: "auth", title: "Page de connexion" },
  { id: "FE-14", dev: "B", start: "2026-09-10", end: "2026-09-11", prio: "P0", area: "auth", title: "Écran vérification 2FA (TOTP)" },
  { id: "FE-15", dev: "B", start: "2026-09-10", end: "2026-09-11", prio: "P1", area: "auth", title: "Flux mot de passe oublié / reset" },
  { id: "FE-16", dev: "B", start: "2026-09-14", end: "2026-09-15", prio: "P1", area: "auth", title: "Écran enrôlement 2FA" },
  { id: "FE-03", dev: "B", start: "2026-09-14", end: "2026-09-16", prio: "P0", area: "layout", title: "Sidebar modulaire (mobile-first)" },
  { id: "FE-04", dev: "B", start: "2026-09-17", end: "2026-09-22", prio: "P0", area: "routing", title: "Router applicatif + route accueil /" },
  { id: "FE-06", dev: "B", start: "2026-09-21", end: "2026-09-22", prio: "P1", area: "routing", title: "Route avancement /avancement" },
  { id: "FE-07", dev: "B", start: "2026-09-23", end: "2026-09-25", prio: "P1", area: "routing", title: "Route alertes & rappels /alertes" },
  { id: "FE-09", dev: "B", start: "2026-09-28", end: "2026-09-29", prio: "P2", area: "routing", title: "Route URSSAF et CPAM" },
  { id: "FE-10", dev: "B", start: "2026-09-30", end: "2026-10-01", prio: "P2", area: "routing", title: "Route CCN et prévoyance" },
  { id: "FE-05", dev: "B", start: "2026-10-01", end: "2026-10-06", prio: "P1", area: "routing", title: "Route anomalies /anomalies" },
  { id: "FE-11", dev: "B", start: "2026-10-05", end: "2026-10-08", prio: "P1", area: "component", title: "Drawer fiche anomalie" },
  { id: "FE-12", dev: "B", start: "2026-10-09", end: "2026-10-12", prio: "P1", area: "component", title: "Bandeau compteur de prescription temps réel" },
  { id: "FE-17", dev: "B", start: "2026-10-12", end: "2026-10-13", prio: "P2", area: "vue-client", title: "Vue client — Direction/DAF" },
  { id: "FE-18", dev: "B", start: "2026-10-14", end: "2026-10-15", prio: "P2", area: "vue-client", title: "Vue client — Responsable paie" },
  { id: "FE-19", dev: "B", start: "2026-10-16", end: "2026-10-16", prio: "P2", area: "vue-client", title: "Vue client — CDG Social" },
  { id: "FE-20", dev: "B", start: "2026-10-16", end: "2026-10-16", prio: "P2", area: "vue-client", title: "Sélecteur de profil Vue client" },
];

const PRIO_COLOR: Record<Prio, string> = { P0: "#ef4444", P1: "#f59e0b", P2: "#10b981" };
const DEV_COLOR: Record<Dev, string> = { A: "#6366f1", B: "#0ea5e9" };
const DEV_LABEL: Record<Dev, string> = { A: "Dev A (Back)", B: "Dev B (Front)" };

function parseDate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export default function App() {
  const [filter, setFilter] = useState<"ALL" | Dev>("ALL");

  const { minDate, totalDays, days } = useMemo(() => {
    const starts = TASKS.map((t) => parseDate(t.start).getTime());
    const ends = TASKS.map((t) => parseDate(t.end).getTime());
    const min = new Date(Math.min(...starts));
    min.setDate(min.getDate() - 1);
    const max = new Date(Math.max(...ends));
    max.setDate(max.getDate() + 1);
    const total = Math.round((max.getTime() - min.getTime()) / 86400000);
    const arr: Date[] = [];
    for (let i = 0; i <= total; i++) {
      const dt = new Date(min);
      dt.setDate(dt.getDate() + i);
      arr.push(dt);
    }
    return { minDate: min, maxDate: max, totalDays: total, days: arr };
  }, []);

  // Sort: by dev then start date
  const sorted = [...TASKS].sort((a, b) => {
    if (a.dev !== b.dev) return a.dev.localeCompare(b.dev);
    return parseDate(a.start).getTime() - parseDate(b.start).getTime();
  });
  const visible = filter === "ALL" ? sorted : sorted.filter((t) => t.dev === filter);

  const colWidth = 30;
  const rowHeight = 34;
  const labelWidth = 300;
  const chartWidth = (totalDays + 1) * colWidth;

  function dayIndex(dateStr: string): number {
    return Math.round((parseDate(dateStr).getTime() - minDate.getTime()) / 86400000);
  }

  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Gantt — Cockpit Consultant G2S</h1>
          <p className="text-xs text-slate-500 mt-0.5">01 sept. → 16 oct. 2026 · 37 issues · 2 développeurs · assistance IA</p>
        </div>
        <div className="flex items-center gap-2">
          {(["ALL", "A", "B"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                filter === f ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f === "ALL" ? "Tous" : DEV_LABEL[f]}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-600">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: DEV_COLOR.A }} /> Dev A (Back)</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ background: DEV_COLOR.B }} /> Dev B (Front)</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PRIO_COLOR.P0 }} /> P0 bloquant</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PRIO_COLOR.P1 }} /> P1</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PRIO_COLOR.P2 }} /> P2</span>
      </div>

      {/* Scroll container */}
      <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
        <div className="flex" style={{ minWidth: labelWidth + chartWidth }}>
          {/* Left labels */}
          <div style={{ width: labelWidth }} className="flex-shrink-0 border-r border-slate-200 sticky left-0 z-10 bg-white">
            <div style={{ height: 44 }} className="border-b border-slate-200 bg-slate-50 flex items-end px-3 pb-1.5 sticky top-0 z-10">
              <span className="text-xs font-semibold text-slate-500">Issue</span>
            </div>
            {visible.map((t, i) => (
              <div key={t.id} style={{ height: rowHeight }} className="flex items-center px-3 border-b border-slate-100 hover:bg-slate-50">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded mr-2 flex-shrink-0" style={{ background: DEV_COLOR[t.dev] + "22", color: DEV_COLOR[t.dev] }}>
                  {t.dev}
                </span>
                <span className="text-xs text-slate-700 font-mono mr-2 flex-shrink-0 w-12">{t.id}</span>
                <span className="text-[11px] text-slate-600 truncate" title={t.title}>{t.title}</span>
              </div>
            ))}
          </div>

          {/* Right timeline */}
          <div style={{ width: chartWidth }} className="relative">
            {/* Day headers sticky */}
            <div className="flex border-b border-slate-200 bg-slate-50 sticky top-0 z-10" style={{ height: 44 }}>
              {days.map((dt, i) => {
                const isWeekend = dt.getDay() === 0 || dt.getDay() === 6;
                const isMonthStart = dt.getDate() === 1;
                return (
                  <div key={i} style={{ width: colWidth }} className="flex flex-col items-center justify-end pb-1 border-r border-slate-100">
                    <span className={`text-[9px] ${isMonthStart ? "font-bold text-slate-700" : "text-slate-400"}`}>
                      {isMonthStart ? dt.toLocaleDateString("fr-FR", { month: "short" }) : ""}
                    </span>
                    <span className={`text-[10px] ${isWeekend ? "text-slate-300" : "text-slate-500"}`}>{dt.getDate()}</span>
                  </div>
                );
              })}
            </div>

            {/* Rows */}
            {visible.map((t, idx) => {
              const startIdx = dayIndex(t.start);
              const endIdx = dayIndex(t.end);
              const left = startIdx * colWidth;
              const width = (endIdx - startIdx + 1) * colWidth;
              return (
                <div key={t.id} style={{ height: rowHeight }} className="relative border-b border-slate-100">
                  {/* weekend bg + grid */}
                  {days.map((dt, i) => {
                    const isWeekend = dt.getDay() === 0 || dt.getDay() === 6;
                    return (
                      <div key={i} style={{ left: i * colWidth, width: colWidth, top: 0, bottom: 0 }}
                        className={`absolute border-r border-slate-100 ${isWeekend ? "bg-slate-50" : ""}`} />
                    );
                  })}
                  {/* bar */}
                  <div
                    className="absolute top-1 bottom-1 rounded-md flex items-center px-1.5 shadow-sm cursor-pointer"
                    style={{ left: left + 2, width: width - 4, background: `linear-gradient(90deg, ${DEV_COLOR[t.dev]}, ${DEV_COLOR[t.dev]}cc)`, borderLeft: `3px solid ${PRIO_COLOR[t.prio]}` }}
                    title={`${t.id} (${DEV_LABEL[t.dev]}) — ${t.title}\n${t.start} → ${t.end}\nPriorité: ${t.prio}`}
                  >
                    <span className="text-[9px] text-white font-medium truncate">{t.id}</span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: PRIO_COLOR[t.prio] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex flex-wrap gap-x-5 gap-y-1">
        <span>📊 {visible.length} tâches affichées</span>
        <span>🔴 P0: {visible.filter((t) => t.prio === "P0").length}</span>
        <span>🟡 P1: {visible.filter((t) => t.prio === "P1").length}</span>
        <span>🟢 P2: {visible.filter((t) => t.prio === "P2").length}</span>
        <span>🔵 Dev A: {visible.filter((t) => t.dev === "A").length}</span>
        <span>🟦 Dev B: {visible.filter((t) => t.dev === "B").length}</span>
        <span className="text-slate-400">Survole une barre pour le détail · weekends grisés</span>
      </div>
    </div>
  );
}