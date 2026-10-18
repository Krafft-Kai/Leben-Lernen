#!/usr/bin/env node
// Erzeugt docs/leitfragen/<nn>-<thema>.md aus daten/themen.json und daten/phasen.json.
// Aufruf: npm run leitfragen
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const themen = JSON.parse(fs.readFileSync(path.join(root, "daten/themen.json"), "utf8"));
const phasen = JSON.parse(fs.readFileSync(path.join(root, "daten/phasen.json"), "utf8"));
const outDir = path.join(root, "docs/leitfragen");
fs.mkdirSync(outDir, { recursive: true });

const gruppen = Object.fromEntries(phasen.altersgruppen.map(g => [g.slug, g]));
const phasenById = Object.fromEntries(phasen.phasen.map(p => [p.id, p]));
const symbol = { schwerpunkt: "●", abschnitt: "○", keine: "–" };

for (const f of fs.readdirSync(outDir)) if (f.endsWith(".md")) fs.unlinkSync(path.join(outDir, f));

for (const t of themen.themen) {
  const nn = String(t.nummer).padStart(2, "0");
  const lines = [];
  lines.push(`# ${t.nummer} ${t.name}`);
  lines.push("");
  lines.push(`Erzeugt aus \`daten/themen.json\`; Änderungen bitte dort. Slug: \`${t.slug}\`.`);
  lines.push("");
  lines.push(t.beschreibung);
  lines.push("");
  lines.push("## Leitfragen");
  lines.push("");
  t.leitfragen.forEach((q, i) => lines.push(`${i + 1}. ${q}`));
  lines.push("");
  lines.push("Jede Recherche beantwortet zusätzlich: Was passiert dabei im Gehirn? Was ist Mythos? Was hat sich in den letzten 24 Monaten geändert? Welche Praxis aus anderen Ländern ist evaluiert?");
  lines.push("");
  lines.push("## Altersgruppen und Lebensphasen");
  lines.push("");
  lines.push("| Altersgruppe | Lebensphasen | Gewicht |");
  lines.push("|---|---|---|");
  themen.altersgruppen.forEach((slug, i) => {
    const g = gruppen[slug];
    const w = t.matrix[i];
    const ph = g.phasen.map(id => `${id} ${phasenById[id].name}`).join(", ");
    const label = w === "schwerpunkt" ? "● eigene Schwerpunktseite" : w === "abschnitt" ? "○ kurzer Abschnitt" : "– entfällt";
    lines.push(`| ${g.name} | ${ph} | ${label} |`);
  });
  lines.push("");
  const sp = t.matrix.filter(m => m === "schwerpunkt").length;
  lines.push(`Schwerpunktseiten: ${sp}. Aussagen werden je Altersgruppe mit Gewicht ● oder ○ recherchiert (3 bis 10 je Gruppe), Seiten entstehen nur für ●.`);
  lines.push("");
  lines.push("## Was im Mittelpunkt der Phasen steht");
  lines.push("");
  const relevant = new Set();
  themen.altersgruppen.forEach((slug, i) => { if (t.matrix[i] !== "keine") gruppen[slug].phasen.forEach(p => relevant.add(p)); });
  for (const p of phasen.phasen) if (relevant.has(p.id)) lines.push(`- **${p.id} ${p.name} (${p.bis == null ? `${p.von}+` : `${p.von}–${p.bis}`})**: ${p.mittelpunkt}`);
  lines.push("");
  fs.writeFileSync(path.join(outDir, `${nn}-${t.slug}.md`), lines.join("\n"));
}
console.log(`${themen.themen.length} Leitfragen-Dateien nach ${path.relative(root, outDir)}/ geschrieben.`);
