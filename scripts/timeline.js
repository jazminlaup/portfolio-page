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

function timelineItemMarkup(item, index) {
  const highlights = (item.highlights || [])
    .map((h) => `<li>${escapeHtml(h)}</li>`)
    .join("");
  const link = item.link
    ? `<div class="actions"><a href="${
        item.link.url
      }" target="_blank" rel="noopener">${escapeHtml(item.link.label)}</a></div>`
    : "";
  const categoryClass = typeClass(item.typ);
  const typeChip = item.typ
    ? `<span class="type-chip ${categoryClass}">${escapeHtml(item.typ)}</span>`
    : "";

  return `
      <li class="tl-item ${categoryClass}" data-type="${escapeHtml(
        item.typ || ""
      )}" style="animation-delay:${index * 50}ms">
        <span class="dot" aria-hidden="true"></span>
        <article class="tl-card" tabindex="0">
          <div class="meta">
            <time datetime="${item.start}">${periodLabel(
    item.start,
    item.end
  )}</time>
            ${typeChip}
          </div>
          <h3 class="title">${escapeHtml(item.titel)}${
    item.firma ? ` <span class="org">${escapeHtml(item.firma)}</span>` : ""
  }</h3>
          ${highlights ? `<ul class="highlights">${highlights}</ul>` : ""}
          ${link}
        </article>
      </li>`;
}

function sortedFilteredItems() {
  return TIMELINE_DATA.slice()
    .sort(byDateDesc)
    .filter((x) => (state.filter === "Alle" ? true : x.typ === state.filter));
}

function render({ appendFromIndex = 0 } = {}) {
  const items = sortedFilteredItems();
  const visible = items.slice(0, state.visible);
  const hasMore = state.visible < items.length;

  if (appendFromIndex <= 0) {
    const markup =
      visible.map((item, index) => timelineItemMarkup(item, index)).join("") +
      (hasMore ? renderLoadMore() : "");
    tlEl.innerHTML = markup;
    return;
  }

  const loadMoreNode = tlEl.querySelector(".tl-item.load-more");
  if (loadMoreNode) loadMoreNode.remove();

  const newItems = visible.slice(appendFromIndex);
  const newMarkup = newItems
    .map((item, i) => timelineItemMarkup(item, appendFromIndex + i))
    .join("");
  tlEl.insertAdjacentHTML("beforeend", newMarkup);

  if (hasMore) {
    tlEl.insertAdjacentHTML("beforeend", renderLoadMore());
  }
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
  render({ appendFromIndex: previousVisible });
  // Fokussiert den nächsten neu sichtbaren Eintrag für Tastaturnutzer*innen
  const focusIndex = previousVisible + 1;
  const nextItem = tlEl.querySelector(
    `.tl-item:nth-child(${focusIndex}) .tl-card`
  );
  if (nextItem) nextItem.focus();
});

// Initial render
render();
