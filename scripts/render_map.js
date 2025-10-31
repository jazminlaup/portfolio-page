// --- 1) Static country status (ISO2 -> category) ---
// NOTE: STATUS has been moved to `scripts/map_configuration.js`.
// Edit that file to change the country statuses.

// --- 2) Colors ---
const COLORS = {
  home: "#14b8a6", // teal
  visited: "#3b82f6", // blue
  wishlist: "#f59e0b", // amber
  none: "#e5e7eb", // gray
};

const highlightableStatuses = new Set(["home", "visited"]);
const galleryGrid = document.getElementById("travel-gallery-grid");
const galleryCards = [];
const regionFormatter =
  typeof Intl !== "undefined" && typeof Intl.DisplayNames === "function"
    ? new Intl.DisplayNames(["de-CH", "de", "en"], { type: "region" })
    : null;

function labelForCountry(code) {
  if (!code) return "Unbekannt";
  try {
    return regionFormatter ? regionFormatter.of(code) : code;
  } catch (error) {
    return code;
  }
}

function buildPhotoCard(countryCode, photo) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "photo-card";
  card.dataset.country = countryCode;
  card.setAttribute("role", "listitem");
  card.setAttribute("aria-pressed", "false");
  const photoTitle = photo.title || labelForCountry(countryCode);
  const photoDescription = photo.description || "";
  card.title = photoDescription
    ? `${photoTitle} \u2013 ${photoDescription}`
    : photoTitle;

  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.alt;
  figure.appendChild(img);

  const caption = document.createElement("figcaption");

  const meta = document.createElement("p");
  meta.className = "photo-meta";
  meta.textContent = labelForCountry(countryCode);

  const title = document.createElement("p");
  title.className = "photo-title";
  title.textContent = photoTitle;
  caption.append(meta, title);

  if (photoDescription) {
    const description = document.createElement("p");
    description.className = "photo-description";
    description.textContent = photoDescription;
    caption.appendChild(description);
  }

  figure.appendChild(caption);
  card.appendChild(figure);

  card.addEventListener("click", () =>
    highlightPhotos(countryCode, { scrollIntoView: false })
  );

  return card;
}

function renderPhotoGallery() {
  if (
    !galleryGrid ||
    typeof COUNTRY_PHOTOS === "undefined" ||
    typeof STATUS === "undefined"
  ) {
    return;
  }

  galleryGrid.innerHTML = "";
  galleryCards.length = 0;

  const entries = Object.entries(COUNTRY_PHOTOS).filter(([code]) =>
    highlightableStatuses.has(STATUS[code])
  );

  if (!entries.length) {
    const message = document.createElement("p");
    message.className = "photo-empty";
    message.textContent = "Noch keine Reisebilder hinterlegt.";
    galleryGrid.appendChild(message);
    return;
  }

  const fragment = document.createDocumentFragment();

  entries.forEach(([countryCode, photos]) => {
    photos.forEach((photo) => {
      const card = buildPhotoCard(countryCode, photo);
      fragment.appendChild(card);
      galleryCards.push(card);
    });
  });

  galleryGrid.appendChild(fragment);
}

function highlightPhotos(countryCode, options = {}) {
  if (!galleryCards.length) return;

  if (!countryCode) {
    galleryCards.forEach((card) => {
      card.classList.remove("is-active");
      card.setAttribute("aria-pressed", "false");
    });
    return;
  }

  const matches = galleryCards.filter(
    (card) => card.dataset.country === countryCode
  );

  if (!matches.length) {
    galleryCards.forEach((card) => {
      card.classList.remove("is-active");
      card.setAttribute("aria-pressed", "false");
    });
    return;
  }

  galleryCards.forEach((card) => {
    const isMatch = card.dataset.country === countryCode;
    card.classList.toggle("is-active", isMatch);
    card.setAttribute("aria-pressed", isMatch ? "true" : "false");
  });

  if (options.scrollIntoView !== false && matches[0]) {
    matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

renderPhotoGallery();

// --- 3) Map base ---
const mapContainer = document.getElementById("travel-map");

if (!mapContainer) {
  console.warn("Travel map container not found.");
} else {
  const map = L.map(mapContainer, {
    zoomControl: true,
    attributionControl: true,
  }).setView([54, 15], 4);

  // Optional tiles for context (remove if you want a pure choropleth)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // --- 4) Styling helpers ---
  function statusFor(feature) {
    const code = feature.properties?.ISO2;
    return code && STATUS[code] ? STATUS[code] : "none";
  }
  function styleFor(feature) {
    return {
      color: "#ffffff",
      weight: 1,
      fillOpacity: 1,
      fillColor: COLORS[statusFor(feature)],
    };
  }

  // --- 5) Render GeoJSON (static; no click handlers) ---
  let geoLayer;

  function perFeature(feature, layer) {
    const name = feature.properties?.NAME || "Unknown";
    const code = feature.properties?.ISO2;
    layer.bindTooltip(name, { sticky: true });

    // Subtle hover emphasis (no status changes)
    layer.on("mouseover", () => layer.setStyle({ weight: 2 }));
    layer.on("mouseout", () => layer.setStyle({ weight: 1 }));
    layer.on("click", () => highlightPhotos(code));
  }

  fetch("./data/europe-geo.json")
    .then((r) => r.json())
    .then((geo) => {
      geoLayer = L.geoJSON(geo, {
        style: styleFor,
        onEachFeature: perFeature,
      }).addTo(map);
      map.fitBounds(geoLayer.getBounds(), { padding: [10, 10] });
    });

  // --- 6) Legend ---
  const Legend = L.Control.extend({
    onAdd() {
      const div = L.DomUtil.create("div", "legend");
      div.innerHTML = `
        <div class="row"><span class="swatch" style="background:${COLORS.home}"></span> Zu Hause</div>
        <div class="row"><span class="swatch" style="background:${COLORS.visited}"></span> Besucht</div>
        <div class="row"><span class="swatch" style="background:${COLORS.wishlist}"></span> Wunschliste</div>
        <div class="row"><span class="swatch" style="background:${COLORS.none}"></span> Andere</div>
      `;
      return div;
    },
  });
  map.addControl(new Legend({ position: "bottomleft" }));
}
