var typedStrings = [
  "Ich bin <i>Business Analystin</i>",
  "Ich bin <i>Wirtschaftsinformatikerin</i>",
  "Ich bin <i>Schadenexpertin</i>",
  "Ich bin <i>Projektmitarbeiterin</i>",
  "Ich bin <i>Versicherungsprofi</i>",
  "Ich bin <i>Sportlerin</i>",
  "Ich bin <i>Versicherungsexpertin</i>",
  "Ich bin <i>Lebenslange Lernerin</i>",
  "Ich bin <i>Problemlöserin</i>",
  "Ich bin <i>Teamplayerin</i>",
  "Ich bin <i>Analytikerin</i>",
];

var typed = new Typed("#intro", {
  strings: typedStrings,
  typeSpeed: 48,
  backSpeed: 30,
  backDelay: 2100,
  loop: true,
  shuffle: true,
  smartBackspace: false,
  cursorChar: "▍",
  startDelay: 300,
  preStringTyped: function (_arrayPos, self) {
    // Randomize typing cadence
    var instance = self || this;
    var typeSpeed = 42 + Math.floor(Math.random() * 20);
    var backSpeed = 26 + Math.floor(Math.random() * 10);
    var pause = 1700 + Math.floor(Math.random() * 2000);
    instance.options.typeSpeed = typeSpeed;
    instance.options.backSpeed = backSpeed;
    instance.options.backDelay = pause;
  },
});
