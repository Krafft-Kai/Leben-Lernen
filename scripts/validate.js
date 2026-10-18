#!/usr/bin/env node
// Prüft daten/ gegen die Schemata und die Regeln aus CLAUDE.md.
// Aufruf: npm test (läuft auch vor jedem Build). Bei Fehlern Exit-Code 1.
const fs = require("fs");
const path = require("path");
const Ajv2020 = require("ajv/dist/2020");
const addFormats = require("ajv-formats");

const root = path.join(__dirname, "..");
const DATEN = path.join(root, "daten");
const rel = p => path.relative(root, p).split(path.sep).join("/");

const fehler = [];
const warnungen = [];
const fehlerAn = (datei, id, feld, text) => fehler.push({ datei, id, feld, text });

const lesen = datei => {
  try {
    return JSON.parse(fs.readFileSync(datei, "utf8"));
  } catch (e) {
    fehlerAn(rel(datei), null, null, `kein gültiges JSON: ${e.message}`);
    return undefined;
  }
};
const jsonDateien = ordner => {
  const dir = path.join(DATEN, ordner);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".json") && !f.startsWith("_")).sort().map(f => path.join(dir, f));
};

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const schema = name => ajv.compile(lesen(path.join(DATEN, name)));
const pruefeAussage = schema("schema-aussage.json");
const pruefeSeite = schema("schema-seite.json");
const pruefeKopf = schema("schema-kopf.json");

// Ajv-Meldungen in verständliches Deutsch übertragen
const ajvText = e => {
  const p = e.params || {};
  switch (e.keyword) {
    case "required": return `Pflichtfeld „${p.missingProperty}“ fehlt`;
    case "additionalProperties": return `unbekanntes Feld „${p.additionalProperty}“`;
    case "enum": return `Wert nicht erlaubt; erlaubt: ${p.allowedValues.join(", ")}`;
    case "type": return `falscher Typ, erwartet: ${p.type}`;
    case "pattern": return `Format stimmt nicht (Muster ${p.pattern})`;
    case "format": return `kein gültiges Format „${p.format}“`;
    case "minItems": return `mindestens ${p.limit} Einträge nötig`;
    case "maxItems": return `höchstens ${p.limit} Einträge erlaubt`;
    case "minLength": return `zu kurz, mindestens ${p.limit} Zeichen`;
    case "maxLength": return `zu lang, höchstens ${p.limit} Zeichen`;
    case "minProperties": return `mindestens ${p.limit} Eintrag nötig`;
    case "uniqueItems": return "Einträge doppelt";
    case "minimum": return `Wert zu klein, mindestens ${p.limit}`;
    case "maximum": return `Wert zu groß, höchstens ${p.limit}`;
    default: return e.message;
  }
};
const schemaFehler = (validate, obj, datei, id) => {
  if (validate(obj)) return true;
  for (const e of validate.errors) fehlerAn(datei, id, e.instancePath || "/", ajvText(e));
  return false;
};

const heute = new Date().toISOString().slice(0, 10);
const woerter = s => String(s || "").trim().split(/\s+/).filter(Boolean).length;

// ---------- 5. phasen.json und themen.json ----------
const phasenDatei = lesen(path.join(DATEN, "phasen.json")) || {};
const themenDatei = lesen(path.join(DATEN, "themen.json")) || {};
const phasen = phasenDatei.phasen || [];
const altersgruppen = phasenDatei.altersgruppen || [];
const themen = themenDatei.themen || [];

const eindeutig = (liste, key, datei, was) => {
  const gesehen = new Set();
  for (const x of liste) {
    if (gesehen.has(x[key])) fehlerAn(datei, x[key], key, `${was} doppelt`);
    gesehen.add(x[key]);
  }
  return gesehen;
};
const phasenIds = eindeutig(phasen, "id", "daten/phasen.json", "Phasen-ID");
eindeutig(phasen, "slug", "daten/phasen.json", "Phasen-Slug");
const gruppenSlugs = eindeutig(altersgruppen, "slug", "daten/phasen.json", "Altersgruppen-Slug");
const themenSlugs = eindeutig(themen, "slug", "daten/themen.json", "Themen-Slug");
eindeutig(themen, "nummer", "daten/themen.json", "Themen-Nummer");

// Lückenlos: jede Phase und jede Altersgruppe beginnt dort, wo die vorige endet; die letzte ist nach oben offen.
const lueckenlos = (liste, datei, was) => {
  if (!liste.length) return fehlerAn(datei, null, was, "Liste ist leer");
  if (liste[0].von !== 0) fehlerAn(datei, liste[0].slug || liste[0].id, "von", `${was} muss bei 0 beginnen`);
  liste.forEach((x, i) => {
    const naechste = liste[i + 1];
    if (naechste && x.bis !== naechste.von) fehlerAn(datei, x.slug || x.id, "bis", `Lücke oder Überschneidung zur nächsten ${was} (${x.bis} ≠ ${naechste.von})`);
    if (!naechste && x.bis !== null) fehlerAn(datei, x.slug || x.id, "bis", `letzte ${was} muss nach oben offen sein (bis: null)`);
  });
};
lueckenlos(phasen, "daten/phasen.json", "Phase");
lueckenlos(altersgruppen, "daten/phasen.json", "Altersgruppe");
for (const p of phasen) {
  if (!gruppenSlugs.has(p.altersgruppe)) fehlerAn("daten/phasen.json", p.id, "altersgruppe", `Altersgruppe „${p.altersgruppe}“ gibt es nicht`);
}
const phasenInGruppen = altersgruppen.flatMap(g => g.phasen || []);
for (const g of altersgruppen) for (const id of g.phasen || []) {
  if (!phasenIds.has(id)) fehlerAn("daten/phasen.json", g.slug, "phasen", `Phase „${id}“ gibt es nicht`);
  const p = phasen.find(x => x.id === id);
  if (p && p.altersgruppe !== g.slug) fehlerAn("daten/phasen.json", g.slug, "phasen", `Phase ${id} gehört laut phasen[] zu „${p.altersgruppe}“`);
}
for (const p of phasen) if (!phasenInGruppen.includes(p.id)) fehlerAn("daten/phasen.json", p.id, "altersgruppe", "Phase fehlt in den Altersgruppen");

const matrixGruppen = themenDatei.altersgruppen || [];
if (JSON.stringify(matrixGruppen) !== JSON.stringify(altersgruppen.map(g => g.slug))) {
  fehlerAn("daten/themen.json", null, "altersgruppen", "Reihenfolge der Altersgruppen passt nicht zu daten/phasen.json");
}
const themaEnum = pruefeAussage.schema.properties.thema.enum;
let summeSchwerpunkte = 0;
for (const t of themen) {
  if (!themaEnum.includes(t.slug)) fehlerAn("daten/themen.json", t.slug, "slug", "Thema fehlt in der Liste erlaubter Themen in schema-aussage.json");
  if (!Array.isArray(t.matrix) || t.matrix.length !== 9) fehlerAn("daten/themen.json", t.slug, "matrix", "Matrix braucht genau 9 Einträge");
  for (const w of t.matrix || []) if (!["schwerpunkt", "abschnitt", "keine"].includes(w)) fehlerAn("daten/themen.json", t.slug, "matrix", `unbekannter Wert „${w}“`);
  if (!Array.isArray(t.leitfragen) || !t.leitfragen.length) fehlerAn("daten/themen.json", t.slug, "leitfragen", "keine Leitfragen");
  summeSchwerpunkte += (t.matrix || []).filter(w => w === "schwerpunkt").length;
}
if (themen.length !== 12) fehlerAn("daten/themen.json", null, "themen", `12 Themen erwartet, gefunden: ${themen.length}`);
if (summeSchwerpunkte !== 67) fehlerAn("daten/themen.json", null, "matrix", `67 Schwerpunktseiten erwartet, gefunden: ${summeSchwerpunkte}`);

// ---------- 4. navigator.json ----------
const navigator = lesen(path.join(DATEN, "navigator.json")) || {};
const NAV = "daten/navigator.json";
const stationIds = eindeutig(navigator.stationen || [], "id", NAV, "Station");
for (const s of navigator.stationen || []) {
  for (const feld of ["id", "titel", "kurz", "bereich", "stufe", "alter"]) if (s[feld] == null) fehlerAn(NAV, s.id, feld, "Pflichtfeld fehlt");
  if (navigator.bereiche && !navigator.bereiche[s.bereich]) fehlerAn(NAV, s.id, "bereich", `Bereich „${s.bereich}“ ist nicht unter bereiche beschrieben`);
  if (s.alter && s.alter.bei == null && (s.alter.von == null || s.alter.bis == null)) fehlerAn(NAV, s.id, "alter", "braucht {von, bis, zeile} oder {bei, zeile}");
}
(navigator.uebergaenge || []).forEach((u, i) => {
  for (const feld of ["von", "nach"]) if (!stationIds.has(u[feld])) fehlerAn(NAV, `uebergaenge[${i}]`, feld, `Station „${u[feld]}“ gibt es nicht`);
});
(navigator.altersphasen || []).forEach((a, i) => {
  if (!stationIds.has(a.fokus)) fehlerAn(NAV, `altersphasen[${i}]`, "fokus", `Station „${a.fokus}“ gibt es nicht`);
});
if (navigator.beispiel) {
  for (const id of navigator.beispiel.weg || []) if (!stationIds.has(id)) fehlerAn(NAV, "beispiel", "weg", `Station „${id}“ gibt es nicht`);
  if (!navigator.beispiel.quelle) fehlerAn(NAV, "beispiel", "quelle", "Quelle fehlt");
}
for (const q of navigator.quellen || []) if (!/^https?:\/\//.test(q.url || "")) fehlerAn(NAV, q.titel, "url", "Quelle braucht einen Link");
for (const p of phasen) for (const id of p.stationen || []) {
  if (!stationIds.has(id)) fehlerAn("daten/phasen.json", p.id, "stationen", `Station „${id}“ gibt es nicht in daten/navigator.json`);
}

// ---------- 1. daten/themen/*.json ----------
const aussageById = new Map();
const statusZaehler = {};
for (const datei of jsonDateien("themen")) {
  const r = rel(datei);
  const inhalt = lesen(datei);
  if (inhalt === undefined) continue;
  if (!Array.isArray(inhalt)) { fehlerAn(r, null, "/", "Datei muss ein Array von Aussagen enthalten"); continue; }
  const themaDatei = path.basename(datei, ".json");
  if (!themenSlugs.has(themaDatei)) fehlerAn(r, null, "Dateiname", `Thema „${themaDatei}“ gibt es nicht in daten/themen.json`);
  inhalt.forEach((a, i) => {
    const id = (a && a.id) || `[${i}]`;
    schemaFehler(pruefeAussage, a, r, id);
    if (!a || typeof a !== "object") return;
    if (a.id) {
      if (aussageById.has(a.id)) fehlerAn(r, a.id, "id", `ID doppelt (auch in ${aussageById.get(a.id).datei})`);
      else aussageById.set(a.id, { ...a, datei: r });
    }
    if (a.thema !== themaDatei) fehlerAn(r, id, "thema", `„${a.thema}“ passt nicht zum Dateinamen ${themaDatei}.json`);
    if (!Array.isArray(a.quellen) || !a.quellen.length) fehlerAn(r, id, "quellen", "keine Quelle angegeben");
    if (!a.ampel) fehlerAn(r, id, "ampel", "keine Evidenzampel gesetzt");
    (a.quellen || []).forEach((q, j) => {
      if (q && q.kernzitat && woerter(q.kernzitat) > 15) fehlerAn(r, id, `quellen[${j}].kernzitat`, `Kernzitat hat ${woerter(q.kernzitat)} Wörter, erlaubt sind höchstens 15`);
    });
    if (a.stand && a.stand > heute) fehlerAn(r, id, "stand", `Stand ${a.stand} liegt in der Zukunft`);
    (a.aenderungen || []).forEach((ae, j) => {
      if (ae && ae.datum && ae.datum > heute) fehlerAn(r, id, `aenderungen[${j}].datum`, `Datum ${ae.datum} liegt in der Zukunft`);
    });
    if (a.status === "zurueckgezogen" && !(a.aenderungen || []).length) fehlerAn(r, id, "aenderungen", "zurückgezogene Aussage braucht eine Begründung unter aenderungen");
    statusZaehler[a.status] = (statusZaehler[a.status] || 0) + 1;
  });
}

// ---------- 2. daten/seiten/*.json ----------
const SEITEN_STATUS = new Set(["geprueft", "korrigiert", "in_diskussion"]);
const themaBySlug = Object.fromEntries(themen.map(t => [t.slug, t]));
const seitenSchluessel = new Set();
let anzahlSeiten = 0;
for (const datei of jsonDateien("seiten")) {
  const r = rel(datei);
  const inhalt = lesen(datei);
  if (inhalt === undefined) continue;
  if (!Array.isArray(inhalt)) { fehlerAn(r, null, "/", "Datei muss ein Array von Schwerpunktseiten enthalten"); continue; }
  const themaDatei = path.basename(datei, ".json");
  inhalt.forEach((s, i) => {
    const id = s && s.thema && s.altersgruppe ? `${s.thema}/${s.altersgruppe}` : `[${i}]`;
    anzahlSeiten++;
    schemaFehler(pruefeSeite, s, r, id);
    if (!s || typeof s !== "object") return;
    const t = themaBySlug[s.thema];
    if (!t) { fehlerAn(r, id, "thema", `Thema „${s.thema}“ gibt es nicht`); return; }
    if (s.thema !== themaDatei) fehlerAn(r, id, "thema", `„${s.thema}“ passt nicht zum Dateinamen ${themaDatei}.json`);
    const idx = matrixGruppen.indexOf(s.altersgruppe);
    if (idx < 0 || t.matrix[idx] !== "schwerpunkt") fehlerAn(r, id, "altersgruppe", `„${s.altersgruppe}“ ist für ${s.thema} kein Schwerpunkt (●) in der Matrix`);
    if (seitenSchluessel.has(id)) fehlerAn(r, id, "altersgruppe", "Schwerpunktseite doppelt");
    seitenSchluessel.add(id);
    if (s.stand && s.stand > heute) fehlerAn(r, id, "stand", `Stand ${s.stand} liegt in der Zukunft`);
    const verweise = [
      ...(s.hilft || []).map((x, j) => [`hilft[${j}]`, x]),
      ...(s.schadet || []).map((x, j) => [`schadet[${j}]`, x]),
      ...(s.einordnung || []).map((x, j) => [`einordnung[${j}]`, x]),
      ...(s.mythen || []).map((m, j) => [`mythen[${j}].aussage_id`, m && m.aussage_id])
    ];
    for (const [feld, aid] of verweise) {
      const a = aussageById.get(aid);
      if (!a) fehlerAn(r, id, feld, `Aussage „${aid}“ gibt es nicht`);
      else if (!SEITEN_STATUS.has(a.status)) fehlerAn(r, id, feld, `Aussage „${aid}“ hat Status „${a.status}“; erlaubt sind geprueft, korrigiert, in_diskussion`);
      else if (a.thema !== s.thema) warnungen.push(`${r} · ${id} · ${feld}: Aussage „${aid}“ gehört zum Thema ${a.thema}`);
    }
    const hilft = new Set(s.hilft || []);
    for (const aid of s.schadet || []) if (hilft.has(aid)) fehlerAn(r, id, "schadet", `Aussage „${aid}“ steht in hilft und schadet`);
  });
}

// ---------- 3. daten/koepfe/*.json ----------
const kopfIds = new Map();
let anzahlKoepfe = 0;
for (const datei of jsonDateien("koepfe")) {
  const r = rel(datei);
  const k = lesen(datei);
  if (k === undefined) continue;
  anzahlKoepfe++;
  schemaFehler(pruefeKopf, k, r, (k && k.id) || path.basename(datei, ".json"));
  if (!k || typeof k !== "object") continue;
  if (kopfIds.has(k.id)) fehlerAn(r, k.id, "id", `ID doppelt (auch in ${kopfIds.get(k.id)})`);
  kopfIds.set(k.id, r);
  for (const slug of k.themen || []) if (!themenSlugs.has(slug)) fehlerAn(r, k.id, "themen", `Thema „${slug}“ gibt es nicht`);
  (k.kernaussagen || []).forEach((ka, j) => {
    if (ka.aussage_id && !aussageById.has(ka.aussage_id)) fehlerAn(r, k.id, `kernaussagen[${j}].aussage_id`, `Aussage „${ka.aussage_id}“ gibt es nicht`);
  });
  if (k.stand && k.stand > heute) fehlerAn(r, k.id, "stand", `Stand ${k.stand} liegt in der Zukunft`);
}

// ---------- Ausgabe ----------
for (const w of warnungen) console.warn(`Hinweis: ${w}`);
if (fehler.length) {
  console.error(`\n${fehler.length} Fehler in daten/:\n`);
  for (const f of fehler) {
    const teile = [f.datei, f.id, f.feld].filter(Boolean).join(" · ");
    console.error(`  ✗ ${teile}: ${f.text}`);
  }
  console.error("\nBitte korrigieren und npm test erneut ausführen.");
  process.exit(1);
}

const statusText = Object.keys(statusZaehler).length
  ? Object.entries(statusZaehler).map(([s, n]) => `${s} ${n}`).join(", ")
  : "keine";
console.log("daten/ ist gültig.");
console.log(`  Aussagen: ${aussageById.size} (${statusText})`);
console.log(`  Schwerpunktseiten mit Texten: ${anzahlSeiten} von ${summeSchwerpunkte}`);
console.log(`  Köpfe: ${anzahlKoepfe}`);
console.log(`  Navigator: ${stationIds.size} Stationen, ${(navigator.uebergaenge || []).length} Übergänge`);
