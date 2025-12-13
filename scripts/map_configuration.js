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
  IE: "visited",
  GR: "visited",
  BE: "wishlist",
  NL: "wishlist",
  LI: "wishlist",
  CZ: "wishlist",
  LU: "wishlist",
  // add more ISO A2 codes as needed, e.g. "AT": "visited"
};

// Test photo configuration (ISO A2 -> photo metadata array)
const COUNTRY_PHOTOS = {
  AT: [
    {
      src: "assets/travel/photos/at/at-20230222-110036.jpg",
      alt: "Wanderin blickt auf die verschneiten Berge bei Alpbach",
      title: "Kammwanderung am Wiedersberger Horn",
      description: "Kurze Pause mit Weitblick über das winterliche Alpbachtal.",
    },
    {
      src: "assets/travel/photos/at/at-20230222-111358.jpg",
      alt: "Spur im Schnee führt über einen Grat in Tirol",
      title: "Wintergrat Richtung Wiedersberger Horn",
      description: "Die Spur durch frischen Schnee führt über sanfte Kuppen und Tannen.",
    },
  ],
  CH: [
    {
      src: "assets/travel/photos/ch/ch-20201121-141345.jpg",
      alt: "Schneebedeckte Bank am gefrorenen Trübsee",
      title: "Gefrorener Bergsee am Brienzergrat",
      description: "Erste Wintertage: eine stille Bank vor täglich zufrierendem See.",
    },
    {
      src: "assets/travel/photos/ch/ch-20210729-094350.jpg",
      alt: "Alpenrosen Blüten am Wanderweg unter blauem Himmel",
      title: "Alpenrosen oberhalb von Adelboden",
      description: "Sommerliche Bergtour mit Blütenteppich und Weitblick.",
    },
    {
      src: "assets/travel/photos/ch/ch-20210828-110112.jpg",
      alt: "Nebel säumt einen Pfad am Brienzergrat",
      title: "Nebelstimmung am Brienzergrat",
      description: "Wolkenschaum schwappt über den Grat und legt den Weg frei.",
    },
    {
      src: "assets/travel/photos/ch/ch-20230626-132208.jpg",
      alt: "Hängebrücke über dem Aletschgletscher-Tal",
      title: "Hängebrücke bei Belalp",
      description: "Mutprobe: Holzbohlen hoch über dem grünen Gletscherbach.",
    },
  ],
  DE: [
    {
      src: "assets/travel/photos/de/de-20240519-125109.jpg",
      alt: "Farbig beleuchteter Tunnel in München",
      title: "Lichttunnel an der Isarphilharmonie",
      description: "Architektur-Entdeckung: ein Gang voller farbiger Reflexionen.",
    },
    {
      src: "assets/travel/photos/de/de-img-0345.jpg",
      alt: "Leuchtinstallation im Hanseviertel Hamburg",
      title: "Winterlichter im Hanseviertel",
      description: "Schwebender Lichtervorhang über den Dächern der Speicherstadt.",
    },
  ],
  FR: [
    {
      src: "assets/travel/photos/fr/fr-20220905-183644.jpg",
      alt: "Graue Katze balanciert auf einer Steinmauer in Provence",
      title: "Hauskatze in Bormes-les-Mimosas",
      description: "Neugieriger Hofbewohner posiert zwischen Küstenpinien.",
    },
    {
      src: "assets/travel/photos/fr/fr-20220906-134725.jpg",
      alt: "Blick auf Calanque d'Aiguebelle zwischen Felsen",
      title: "Fenster zur Calanque",
      description: "Rauer Küstenabschnitt mit türkisem Wasser nahe Hyères.",
    },
    {
      src: "assets/travel/photos/fr/fr-20220907-154632.jpg",
      alt: "Bunte Fischerhäuser in einer Bucht bei Le Pradet",
      title: "Mini-Hafen von Le Pradet",
      description: "Kleine Anlegestelle mit bunten Fassaden und Kiesstrand.",
    },
    {
      src: "assets/travel/photos/fr/fr-20220909-192518.jpg",
      alt: "Sonnenuntergang über den Kalkküsten der Provence",
      title: "Sonnenuntergang am Cap Benat",
      description: "Die Wellen rollen gegen den hellen Kalkstein kurz vor der Dämmerung.",
    },
  ],
  GR: [
    {
      src: "assets/travel/photos/gr/gr-20240903-200149.jpg",
      alt: "Strandliegen unter Bastschirmen in Chalkidiki",
      title: "Sonnenuntergang in Chalkidiki",
      description: "Vorhang auf für ruhige Abendstunden am Beach Club.",
    },
    {
      src: "assets/travel/photos/gr/gr-20240905-123029.jpg",
      alt: "Segelboot vor der Insel Kea in tiefblauem Wasser",
      title: "Segeltag vor Kea",
      description: "Kristallklares Wasser zwischen kargen Inseln und einsamen Buchten.",
    },
  ],
  IE: [
    {
      src: "assets/travel/photos/ie/ie-2019-0261.jpg",
      alt: "Strandspaziergang in Howth bei Wind und Sonne",
      title: "Howth Beach im Herbstlicht",
      description: "Sand, Seegras und der Wind am Stadtrand von Dublin.",
    },
    {
      src: "assets/travel/photos/ie/ie-2019-0591.jpg",
      alt: "Ausflugsschiff Harbour Queen II in Connemara",
      title: "Bootsfahrt zur Robbenbank",
      description: "Die Harbour Queen II legt zur Tour in der Killary Bay ab.",
    },
    {
      src: "assets/travel/photos/ie/ie-2019-0621.jpg",
      alt: "Kleine Seilbahn an der Atlantikküste",
      title: "Cable Car nach Dursey Island",
      description: "Legendäre Seilbahn über die rauen Wellen im County Cork.",
    },
    {
      src: "assets/travel/photos/ie/ie-2019-0677.jpg",
      alt: "Irisches Schaf mit pinker Markierung",
      title: "Schafpause am Healy Pass",
      description: "Weiches Fell trifft auf grüne Weiden und herbstliche Moore.",
    },
  ],
  IT: [
    {
      src: "assets/travel/photos/it/it-20200815-122708.jpg",
      alt: "Felsige Gipfel in den Alpen oberhalb von Livigno",
      title: "Ridge bei Livigno",
      description: "Schroffe und grüne Berghänge im Valtellina.",
    },
    {
      src: "assets/travel/photos/it/it-20200815-130404.jpg",
      alt: "Wanderpause mit Blick auf die Ortlergruppe",
      title: "Panoramapause bei Bormio",
      description: "Eine Verschnaufpause mit den schneebedeckten Gipfeln im Rücken.",
    },
    {
      src: "assets/travel/photos/it/it-20210809-162826.jpg",
      alt: "Fähre passiert Riomaggiore in den Cinque Terre",
      title: "Bootsfahrt vor Riomaggiore",
      description: "Farbenfrohe Häuser klettern den Hang hinauf, während das Boot vorbeizieht.",
    },
  ],
};
