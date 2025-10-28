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
    layer.bindTooltip(name, { sticky: true });

    // Subtle hover emphasis (no status changes)
    layer.on("mouseover", () => layer.setStyle({ weight: 2 }));
    layer.on("mouseout", () => layer.setStyle({ weight: 1 }));
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
