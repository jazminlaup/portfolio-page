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

// (Keep as a plain `const` so it can be consumed by `render_map.js` when
// this script is loaded before `render_map.js` in the page.)
