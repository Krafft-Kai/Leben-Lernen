// Grunddaten der Website. Pfad und Adresse lassen sich über Umgebungsvariablen umstellen,
// z. B. für den späteren Umzug auf eine Unterseite der Firmenwebsite:
//   SITE_URL=https://www.example.de PATH_PREFIX=/leben-lernen/ npm run build
const pathPrefix = process.env.PATH_PREFIX || "/Leben-Lernen/";
const url = (process.env.SITE_URL || "https://krafft-kai.github.io").replace(/\/$/, "");

module.exports = {
  titel: "Leben Lernen",
  untertitel: "Bildungswege und gesunde Entwicklung von der Krippe bis ins hohe Alter",
  beschreibung: "Was in jeder Lebensphase für Lernen und gesunde Entwicklung zählt, welche Bildungswege es in Niedersachsen gibt und was Forschung dazu sagt. KI-recherchiert, belegt, offen diskutiert.",
  sprache: "de",
  url,
  pathPrefix,
  repo: "Krafft-Kai/Leben-Lernen",
  repoUrl: "https://github.com/Krafft-Kai/Leben-Lernen",
  // Kommentare über giscus (GitHub Discussions). Werte von https://giscus.app eintragen, siehe README.
  giscus: {
    repo: "Krafft-Kai/Leben-Lernen",
    repoId: "",
    category: "Anmerkungen",
    categoryId: "",
    mapping: "pathname"
  },
  // Vorlage für „Korrektur vorschlagen“ (Issue-Formular in .github/ISSUE_TEMPLATE/anmerkung.yml)
  issueVorlage: "anmerkung.yml",
  heute: new Date().toISOString().slice(0, 10),
  // Herausgeber: bitte vor der Veröffentlichung ausfüllen (Impressum).
  herausgeber: {
    name: "",
    anschrift: "",
    email: "",
    vertretung: ""
  }
};
