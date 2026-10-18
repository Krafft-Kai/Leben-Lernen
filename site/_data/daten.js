// Lädt alle Inhalte aus daten/ und berechnet, was die Vorlagen brauchen.
// Die Vorlagen in site/ enthalten keine Fakten; alles kommt von hier.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "..");
const DATEN = path.join(ROOT, "daten");

const lesen = rel => JSON.parse(fs.readFileSync(path.join(DATEN, rel), "utf8"));
const jsonDateien = ordner => {
  const dir = path.join(DATEN, ordner);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".json") && !f.startsWith("_")).sort()
    .map(f => ({ datei: `${ordner}/${f}`, inhalt: JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) }));
};

const OEFFENTLICH = new Set(["geprueft", "korrigiert", "in_diskussion"]);
const AMPEL = {
  stark: { name: "Stark", kurz: "Forschung ist sich einig" },
  mittel: { name: "Mittel", kurz: "gut belegt, mit Lücken" },
  schwach: { name: "Schwach", kurz: "erste Hinweise" },
  umstritten: { name: "Umstritten", kurz: "gute Studien widersprechen sich" },
  mythos: { name: "Mythos", kurz: "mehrfach widerlegt" }
};
const AMPEL_RANG = ["stark", "mittel", "schwach", "umstritten", "mythos"];
const zaehleNach = (liste, key) => liste.reduce((acc, x) => { acc[x[key]] = (acc[x[key]] || 0) + 1; return acc; }, {});
const STATUS_SEITE = {
  geplant: { name: "geplant", kurz: "Recherche steht aus" },
  recherchiert: { name: "recherchiert", kurz: "Aussagen liegen vor, Faktencheck steht aus" },
  geprueft: { name: "geprüft", kurz: "Aussagen geprüft, Texte folgen" },
  texte: { name: "Texte im Entwurf", kurz: "Zielgruppen-Texte liegen vor" },
  veroeffentlicht: { name: "veröffentlicht", kurz: "vollständig" }
};

module.exports = () => {
  const phasenDatei = lesen("phasen.json");
  const themenDatei = lesen("themen.json");
  const navigator = lesen("navigator.json");
  const protokollDatei = lesen("protokoll.json");

  const phasen = phasenDatei.phasen;
  const altersgruppen = phasenDatei.altersgruppen;
  const zielgruppen = phasenDatei.zielgruppen;
  const themen = themenDatei.themen;
  const gruppeBySlug = Object.fromEntries(altersgruppen.map(g => [g.slug, g]));
  const phaseById = Object.fromEntries(phasen.map(p => [p.id, p]));
  const themaBySlug = Object.fromEntries(themen.map(t => [t.slug, t]));
  const stationById = Object.fromEntries(navigator.stationen.map(s => [s.id, s]));

  // Phasen → Altersgruppe
  for (const p of phasen) p.gruppe = gruppeBySlug[p.altersgruppe];
  for (const g of altersgruppen) g.phasenObjekte = g.phasen.map(id => phaseById[id]);

  // Aussagen
  const aussagen = [];
  for (const { datei, inhalt } of jsonDateien("themen")) {
    const liste = Array.isArray(inhalt) ? inhalt : inhalt.aussagen || [];
    for (const a of liste) aussagen.push({ ...a, datei, oeffentlich: OEFFENTLICH.has(a.status), ampelInfo: AMPEL[a.ampel] });
  }
  const aussageById = Object.fromEntries(aussagen.map(a => [a.id, a]));
  const aussagenByThema = {};
  for (const a of aussagen) (aussagenByThema[a.thema] ||= []).push(a);

  // Seiten
  const seiten = [];
  for (const { datei, inhalt } of jsonDateien("seiten")) {
    const liste = Array.isArray(inhalt) ? inhalt : inhalt.seiten || [];
    for (const s of liste) seiten.push({ ...s, datei });
  }
  const seiteByKey = Object.fromEntries(seiten.map(s => [`${s.thema}|${s.altersgruppe}`, s]));

  // Köpfe
  const koepfe = jsonDateien("koepfe").map(({ datei, inhalt }) => ({ ...inhalt, datei }))
    .sort((a, b) => a.name.localeCompare(b.name, "de"));
  const startlistePfad = path.join(DATEN, "koepfe/_startliste.json");
  const startliste = fs.existsSync(startlistePfad) ? JSON.parse(fs.readFileSync(startlistePfad, "utf8")).eintraege : [];

  // Aussagen je Thema × Altersgruppe
  const aussagenFuer = (themaSlug, gruppe, nurOeffentlich = true) => {
    const ph = new Set(gruppe.phasen);
    return (aussagenByThema[themaSlug] || []).filter(a => a.phasen.some(p => ph.has(p)) && (!nurOeffentlich || a.oeffentlich));
  };

  const quellenAus = liste => {
    const seen = new Map();
    for (const a of liste) for (const q of a.quellen || []) {
      const k = q.doi_oder_url || q.titel;
      if (!seen.has(k)) seen.set(k, { ...q, aussagen: [a.id] }); else seen.get(k).aussagen.push(a.id);
    }
    return [...seen.values()].sort((x, y) => (y.jahr || 0) - (x.jahr || 0));
  };
  const aenderungenAus = (liste, seite) => {
    const out = [];
    for (const a of liste) for (const ae of a.aenderungen || []) out.push({ ...ae, bezug: a.id, bezugTyp: "Aussage" });
    if (seite) for (const ae of seite.aenderungen || []) out.push({ ...ae, bezug: "Seite", bezugTyp: "Seite" });
    return out.sort((x, y) => (y.datum || "").localeCompare(x.datum || ""));
  };

  // Tipps je Zielgruppe: aus der Seite (P4), sonst gesammelt aus den geprüften Aussagen
  const tippsJeZielgruppe = (seite, liste) => zielgruppen.map(z => {
    const text = seite && seite.zielgruppen && seite.zielgruppen[z.id];
    const tipps = text ? text.tipps : [...new Set(liste.flatMap(a => (a.tipps && a.tipps[z.id]) || []))];
    return { ...z, kernaussage: text ? text.kernaussage : null, tipps, checkliste: (text && text.checkliste) || [], gespraech: (text && text.gespraech) || null };
  }).filter(z => z.kernaussage || z.tipps.length || z.checkliste.length);

  // Schwerpunktseiten (●) und Abschnitte (○)
  const schwerpunkte = [];
  const abschnitte = [];
  for (const t of themen) {
    t.zellen = [];
    themenDatei.altersgruppen.forEach((slug, i) => {
      const gruppe = gruppeBySlug[slug];
      const gewicht = t.matrix[i];
      const alle = aussagenFuer(t.slug, gruppe, false);
      const oeff = alle.filter(a => a.oeffentlich);
      const seite = seiteByKey[`${t.slug}|${slug}`] || null;
      let status = "geplant";
      if (seite && seite.status === "veroeffentlicht") status = "veroeffentlicht";
      else if (seite) status = "texte";
      else if (oeff.length) status = "geprueft";
      else if (alle.length) status = "recherchiert";
      const zelle = {
        thema: t, gruppe, gewicht, status, statusInfo: STATUS_SEITE[status],
        slug: `${t.slug}/${slug}`, url: `/themen/${t.slug}/${slug}/`,
        titel: (seite && seite.titel) || `${t.name} · ${gruppe.name}`,
        aussagen: oeff, anzahlAussagen: alle.length, anzahlGeprueft: oeff.length,
        seite,
        hilft: seite && seite.hilft ? seite.hilft.map(id => aussageById[id]).filter(Boolean) : oeff.filter(a => a.wirkung === "hilft"),
        schadet: seite && seite.schadet ? seite.schadet.map(id => aussageById[id]).filter(Boolean) : oeff.filter(a => a.wirkung === "schadet"),
        einordnung: seite && seite.einordnung ? seite.einordnung.map(id => aussageById[id]).filter(Boolean) : oeff.filter(a => a.wirkung === "neutral" || a.wirkung === "einordnung"),
        mythen: (seite && seite.mythen ? seite.mythen.map(m => ({ ...m, aussage: aussageById[m.aussage_id] })) : oeff.filter(a => a.ampel === "mythos").map(a => ({ behauptung: a.aussage, befund: a.erklaerung, aussage: a }))),
        quellen: quellenAus(oeff),
        aenderungen: aenderungenAus(oeff, seite),
        stand: [seite && seite.stand, ...oeff.map(a => a.stand)].filter(Boolean).sort().pop() || null,
        // Für die Vorlagen: Tipps und Checklisten je Zielgruppe, Gehirn und Warnsignale aus den Aussagen
        tipps: tippsJeZielgruppe(seite, oeff),
        gehirnAussagen: oeff.filter(a => a.gehirn),
        hilfeAussagen: oeff.filter(a => a.wann_hilfe),
        stationen: [...new Set(gruppe.phasen.flatMap(id => phaseById[id].stationen))].map(id => stationById[id]).filter(Boolean)
      };
      zelle.kernaussagen = zelle.tipps.filter(z => z.kernaussage);
      zelle.mitTipps = zelle.tipps.filter(z => z.tipps.length);
      zelle.mitCheckliste = zelle.tipps.filter(z => z.checkliste.length);
      t.zellen.push(zelle);
      if (gewicht === "schwerpunkt") schwerpunkte.push(zelle);
      else if (gewicht === "abschnitt") abschnitte.push(zelle);
    });
    t.oeffentlich = (aussagenByThema[t.slug] || []).filter(a => a.oeffentlich);
    t.anzahlAussagen = (aussagenByThema[t.slug] || []).length;
    t.mythen = t.oeffentlich.filter(a => a.ampel === "mythos");
    t.koepfe = koepfe.filter(k => (k.themen || []).includes(t.slug));
    t.quellen = quellenAus(t.oeffentlich);
    t.stand = t.oeffentlich.map(a => a.stand).filter(Boolean).sort().pop() || null;
    t.anzahlSchwerpunkte = t.matrix.filter(m => m === "schwerpunkt").length;
    t.kernaussagen = t.oeffentlich.filter(a => a.ampel !== "mythos").sort((x, y) => AMPEL_RANG.indexOf(x.ampel) - AMPEL_RANG.indexOf(y.ampel));
    t.aenderungen = aenderungenAus(t.oeffentlich);
    t.aussagenStatus = zaehleNach(aussagenByThema[t.slug] || [], "status");
    t.abschnitte = t.zellen.filter(z => z.gewicht === "abschnitt");
    t.startliste = startliste.filter(e => e.thema === t.slug);
    t.url = `/themen/${t.slug}/`;
  }

  // Lebensphasen: Themen, Stationen, Navigator-Altersphasen
  for (const p of phasen) {
    p.stationenObjekte = p.stationen.map(id => stationById[id]).filter(Boolean);
    p.themen = themen.map(t => {
      const z = t.zellen.find(z => z.gruppe.slug === p.altersgruppe);
      return z && z.gewicht !== "keine" ? z : null;
    }).filter(Boolean);
    const bis = p.bis == null ? 200 : p.bis;
    p.altersphasen = navigator.altersphasen.filter(a => a.von <= bis - 1 && a.bis >= p.von);
    p.aussagen = aussagen.filter(a => a.oeffentlich && a.phasen.includes(p.id));
    p.warnsignale = p.aussagen.filter(a => a.wann_hilfe);
    p.url = `/alter/${p.slug}/`;
    p.index = phasen.indexOf(p);
    p.quellen = quellenAus(p.aussagen);
    p.aenderungen = aenderungenAus(p.aussagen);
    p.stand = p.aussagen.map(a => a.stand).filter(Boolean).sort().pop() || null;
  }

  // Protokoll zusammenführen
  const protokoll = [];
  for (const e of protokollDatei.eintraege) protokoll.push({ ...e, typ: "projekt" });
  for (const e of navigator.protokoll) protokoll.push({ datum: e.datum.split(".").reverse().join("-"), bereich: "Navigator", text: e.text, typ: "navigator", url: "/navigator/" });
  for (const a of aussagen) for (const ae of a.aenderungen || []) protokoll.push({ datum: ae.datum, bereich: themaBySlug[a.thema]?.name || a.thema, text: `${a.id}: ${ae.was} (${ae.warum}${ae.quelle ? `; Quelle: ${ae.quelle}` : ""})`, typ: "aussage", url: `/themen/${a.thema}/` });
  for (const s of seiten) for (const ae of s.aenderungen || []) protokoll.push({ datum: ae.datum, bereich: `${themaBySlug[s.thema]?.name || s.thema} · ${gruppeBySlug[s.altersgruppe]?.name || s.altersgruppe}`, text: `${ae.was} (${ae.warum})`, typ: "seite", url: `/themen/${s.thema}/${s.altersgruppe}/` });
  protokoll.sort((a, b) => (b.datum || "").localeCompare(a.datum || ""));

  // Statistik für Werkstatt und Startseite
  const zaehle = (liste, key) => liste.reduce((acc, x) => { acc[x[key]] = (acc[x[key]] || 0) + 1; return acc; }, {});
  const statistik = {
    schwerpunkte: schwerpunkte.length,
    seitenStatus: zaehle(schwerpunkte, "status"),
    aussagen: aussagen.length,
    aussagenStatus: zaehle(aussagen, "status"),
    aussagenAmpel: zaehle(aussagen.filter(a => a.oeffentlich), "ampel"),
    koepfe: koepfe.length,
    offeneDiskussionen: aussagen.filter(a => a.status === "in_diskussion").length,
    quellen: quellenAus(aussagen.filter(a => a.oeffentlich)).length
  };
  const mythen = aussagen.filter(a => a.oeffentlich && a.ampel === "mythos");
  // Mythen-Checks der Schwerpunktseiten (seite.mythen), Seiten mit Checkliste, offene Diskussionen
  const mythenSeiten = schwerpunkte.filter(z => z.seite && z.seite.mythen).flatMap(z => z.mythen.map(m => ({ ...m, zelle: z })));
  const checklisten = schwerpunkte.filter(z => z.seite);
  const offeneDiskussionen = aussagen.filter(a => a.status === "in_diskussion");
  // Navigator-Protokoll mit ISO-Datum für die Protokoll-Komponente
  const navigatorProtokoll = navigator.protokoll.map(e => ({ datum: e.datum.split(".").reverse().join("-"), text: e.text }));
  const stand = [protokoll[0]?.datum, ...aussagen.map(a => a.stand)].filter(Boolean).sort().pop();

  return {
    phasen, altersgruppen, zielgruppen, themen, aussagen, aussageById, seiten, koepfe, startliste,
    navigator, navigatorProtokoll, protokoll, schwerpunkte, abschnitte, statistik, mythen, mythenSeiten, checklisten, offeneDiskussionen, stand,
    ampel: AMPEL, statusSeite: STATUS_SEITE, themaBySlug, gruppeBySlug, phaseById, stationById
  };
};
