// External map configuration: country status (ISO A2 -> category)
// This file was extracted from `render_map.js` so the static data
// can be edited independently from the rendering logic.
const STATUS = {
  CH: "home",
  FR: "visited",
  IT: "visited",
  ES: "wishlist",
  PT: "wishlist",
  DE: "visited",
  AT: "visited",
  BE: "wishlist",
  NL: "wishlist",
  LI: "wishlist",
  CZ: "wishlist",
  LU: "wishlist",
  // add more ISO A2 codes as needed, e.g. "AT": "visited"
};

// Test photo configuration (ISO A2 -> photo metadata array)
const COUNTRY_PHOTOS = {
  CH: [
    {
      src: "assets/travel/ch-alps.svg",
      alt: "Illustration inspired by the Swiss Alps",
      title: "Winter Peaks",
      description: "Bluebird day in the Bernese Oberland",
    },
    {
      src: "assets/travel/ch-lake.svg",
      alt: "Abstract depiction of a Swiss lake",
      title: "Lake Breeze",
      description: "Morning walk along Lake Thun",
    },
  ],
  DE: [
    {
      src: "assets/travel/de-berlin.svg",
      alt: "Graphic view of Berlin at night",
      title: "Berlin Lights",
      description: "Stroll through Museum Island",
    },
    {
      src: "assets/travel/de-bavaria.svg",
      alt: "Illustration of rolling Bavarian hills",
      title: "Bavarian Trails",
      description: "Hike around Neuschwanstein",
    },
  ],
  FR: [
    {
      src: "assets/travel/fr-paris.svg",
      alt: "Poster-like scene of Paris",
      title: "Paris Evenings",
      description: "Golden hour near the Seine",
    },
    {
      src: "assets/travel/fr-provence.svg",
      alt: "Lavender field inspired artwork",
      title: "Provence Fields",
      description: "Lavender bloom near Valensole",
    },
  ],
  IT: [
    {
      src: "assets/travel/it-rome.svg",
      alt: "Stylized Colosseum in Rome",
      title: "Roman Morning",
      description: "Breakfast close to the Pantheon",
    },
    {
      src: "assets/travel/it-tuscany.svg",
      alt: "Illustration of Tuscan hills",
      title: "Tuscan Hills",
      description: "Sunset cycling near Siena",
    },
  ],
  AT: [
    {
      src: "assets/travel/at-vienna.svg",
      alt: "Abstract Vienna skyline",
      title: "Vienna Opera",
      description: "Night at the Staatsoper",
    },
    {
      src: "assets/travel/at-alps.svg",
      alt: "Stylized Austrian Alps",
      title: "Alpine Sunrise",
      description: "Early start around Innsbruck",
    },
  ],
};
