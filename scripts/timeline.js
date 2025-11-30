import { TIMELINE_DATA } from "../data/timeline-data.js";
// ---Utilities ------------------------------------------------------------
const locale = "de-CH"; // für Datumsformatierung

function parseMonth(ym) {
  if (!ym) return null;
  const [y, m = 1] = ym.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1);
}

function monthLabel(ym) {
  if (!ym) return "";
  const d = parseMonth(ym);
  return d.toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

function periodLabel(start, end) {
  const s = monthLabel(start);
  const e = end ? monthLabel(end) : "heute";
  return `${s} – ${e}`;
}

function byDateDesc(a, b) {
  const aEnd = parseMonth(a.end) || new Date();
  const bEnd = parseMonth(b.end) || new Date();
  // primär nach Enddatum (neuere zuerst), sekundär nach Start
  return bEnd - aEnd || parseMonth(b.start) - parseMonth(a.start);
}

// --- 3) Rendering ------------------------------------------------------------
const state = { filter: "Alle", visible: 6 };
const LOAD_STEP = 5;

const tlEl = document.getElementById("timeline");

function typeClass(typ) {
  const t = (typ || "").toLowerCase();
  if (t.startsWith("beruf")) return "type-beruf";
  if (t.startsWith("bild")) return "type-bildung";
  if (t.startsWith("zert")) return "type-zertifikat";
  return "";
}

function render() {
  const items = TIMELINE_DATA.slice()
    .sort(byDateDesc)
    .filter((x) => (state.filter === "Alle" ? true : x.typ === state.filter));

  const visible = items.slice(0, state.visible);

  const markup = visible
    .map((x, i) => {
      const highlights = (x.highlights || [])
        .map((h) => `<li>${escapeHtml(h)}</li>`)
        .join("");
      const link = x.link
        ? `<div class="actions"><a href="${
            x.link.url
          }" target="_blank" rel="noopener">${escapeHtml(
            x.link.label
          )}</a></div>`
        : "";
      const categoryClass = typeClass(x.typ);
      const typeChip = x.typ
        ? `<span class="type-chip ${categoryClass}">${escapeHtml(x.typ)}</span>`
        : "";

      return `
          <li class="tl-item ${categoryClass}" data-type="${escapeHtml(
            x.typ || ""
          )}" style="animation-delay:${i * 50}ms">
            <span class="dot ${categoryClass}" aria-hidden="true"></span>
            <article class="tl-card" tabindex="0">
              <div class="meta">
                <time datetime="${x.start}">${periodLabel(
        x.start,
        x.end
      )}</time>
                ${typeChip}
              </div>
              <h3 class="title">${escapeHtml(x.titel)}${
        x.firma ? ` <span class="org">${escapeHtml(x.firma)}</span>` : ""
      }</h3>
              ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
              ${link}
            </article>
          </li>`;
    })
    .join("");

  const hasMore = state.visible < items.length;
  const loadMoreEntry = hasMore ? renderLoadMore() : "";

  tlEl.innerHTML = markup + loadMoreEntry;
}

function renderLoadMore() {
  return `
    <li class="tl-item load-more">
      <span class="dot" aria-hidden="true"></span>
      <article class="tl-card load-more-card">
        <button
          type="button"
          class="load-more-btn"
          data-load-more="true"
          aria-label="Mehr Einträge anzeigen"
        >
          Mehr anzeigen
        </button>
      </article>
    </li>`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// --- 4) Interaktionen --------------------------------------------------------
document.querySelectorAll(".controls button[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".controls button")
      .forEach((b) => b.setAttribute("aria-pressed", "false"));
    btn.setAttribute("aria-pressed", "true");
    state.filter = btn.dataset.filter;
    state.visible = 6; // reset pagination
    render();
  });
});

tlEl.addEventListener("click", (event) => {
  const btn = event.target.closest("[data-load-more]");
  if (!btn) return;
  const previousVisible = state.visible;
  state.visible += LOAD_STEP;
  render();
  // Fokussiert den nächsten neu sichtbaren Eintrag für Tastaturnutzer*innen
  const focusIndex = previousVisible + 1;
  const nextItem = tlEl.querySelector(
    `.tl-item:nth-child(${focusIndex}) .tl-card`
  );
  if (nextItem) nextItem.focus();
});

// Initial render
render();
