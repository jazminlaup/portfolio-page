// Leaflet Karte von Europa initialisieren
document.addEventListener("DOMContentLoaded", function () {
  // Koordinaten für Europa (Zentrum)
  const europeCenter = [54.5973, 25.2797];
  const zoomLevel = 4;

  //Schwiez

  const homecountry = "Switzerland";

  // Länder die du besucht hast
  const visitedCountries = [
    "Germany",
    "France",
    "Italy",
    "Spain",
    "United Kingdom",
  ];

  // Karte erstellen
  const map = L.map("map").setView(europeCenter, zoomLevel);

  // OpenStreetMap Layer hinzufügen
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  }).addTo(map);

  // GeoJSON für Länder laden und anzeigen
  fetch(
    "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
  )
    .then((response) => response.json())
    .then((data) => {
      const geoJsonLayer = L.geoJSON(data, {
        style: function (feature) {
          const countryName = feature.properties.ADMIN;
          const isVisited = visitedCountries.includes(countryName);

          return {
            fillColor: isVisited ? "#4f8cff" : "#e0e0e0",
            weight: 1,
            opacity: 0.8,
            color: "#333",
            fillOpacity: isVisited ? 0.6 : 0.2,
          };
        },
        onEachFeature: function (feature, layer) {
          const countryName = feature.properties.ADMIN;
          const isVisited = visitedCountries.includes(countryName);

          layer.on("mouseover", function () {
            if (isVisited) {
              layer.setStyle({
                fillColor: "#ff6b6b",
                fillOpacity: 0.8,
                weight: 2,
              });
            } else {
              layer.setStyle({
                fillColor: "#ffd93d",
                fillOpacity: 0.4,
                weight: 2,
              });
            }
          });

          layer.on("mouseout", function () {
            layer.setStyle({
              fillColor: isVisited ? "#4f8cff" : "#e0e0e0",
              fillOpacity: isVisited ? 0.6 : 0.2,
              weight: 1,
            });
          });

          const popupText = isVisited
            ? `<strong>${countryName}</strong><br><span style="color: #4f8cff;">✓ Besucht</span>`
            : `<strong>${countryName}</strong><br><span style="color: #999;">Noch nicht besucht</span>`;

          layer.bindPopup(popupText);
        },
      }).addTo(map);
    })
    .catch((error) => console.error("Fehler beim Laden der GeoJSON:", error));

  // Marker für bekannte europäische Länder/Städte hinzufügen (optional)
  const locations = [
    { name: "Schweiz", coords: [46.8182, 8.2275], city: "Bern" },
    { name: "Deutschland", coords: [51.1657, 10.4515], city: "Berlin" },
    { name: "Frankreich", coords: [46.2276, 2.2137], city: "Paris" },
    { name: "Italien", coords: [41.8719, 12.5674], city: "Rom" },
    { name: "Spanien", coords: [40.4637, -3.7492], city: "Madrid" },
    {
      name: "Vereinigtes Königreich",
      coords: [55.3781, -3.436],
      city: "London",
    },
  ];

  // Marker hinzufügen
  locations.forEach((location) => {
    L.circleMarker(location.coords, {
      radius: 6,
      fillColor: "#4f8cff",
      color: "#000",
      weight: 2,
      opacity: 0.8,
      fillOpacity: 0.8,
    })
      .bindPopup(`<strong>${location.name}</strong><br>${location.city}`)
      .addTo(map);
  });
});
