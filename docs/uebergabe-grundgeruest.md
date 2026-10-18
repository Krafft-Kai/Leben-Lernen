# Übergabe: Grundgerüst fertigstellen (Etappe 0, Teil 2)

Stand 18. Oktober 2026. Teil 1 liegt auf `main`. Diese Datei beschreibt, was fehlt. Wer sie abarbeitet, liest zuerst `CLAUDE.md` und `docs/struktur.md` (besonders „Seitentypen“ und „Entscheidungen vom 18. Oktober“).

## Was schon da ist

| Pfad | Inhalt | Status |
|---|---|---|
| `CLAUDE.md`, `README.md` | Leitplanken, Ablauf, Einrichtung | fertig |
| `docs/struktur.md`, `docs/prompts.md`, `docs/leitfragen/*.md` | Plan, Prompt-Bibliothek, Leitfragen (erzeugt mit `npm run leitfragen`) | fertig |
| `daten/phasen.json`, `daten/themen.json` | 12 Phasen, 9 Altersgruppen, 4 Zielgruppen, 12 Themen mit Leitfragen und Matrix | fertig |
| `daten/schema-aussage.json`, `schema-seite.json`, `schema-kopf.json` | JSON-Schemata | fertig |
| `daten/navigator.json` | Stationen, Übergänge, Altersphasen, Quellen, Protokoll des Navigators | fertig |
| `daten/koepfe/_startliste.json`, `daten/protokoll.json` | Startliste, Projektprotokoll | fertig |
| `daten/themen/`, `daten/seiten/` | leer (kommt mit P1/P4) | – |
| `package.json`, `eleventy.config.js` | Eleventy 3, Ajv, Pagefind; Filter `datum`, `datumKurz`, `issueLink`, `woerter`, `limit`, `where`, `json`, `prozent`, `alter`; HtmlBasePlugin mit `PATH_PREFIX` | fertig |
| `site/_data/daten.js` | lädt alles aus `daten/` und berechnet `themen[].zellen`, `schwerpunkte`, `abschnitte`, `phasen[].themen/stationenObjekte/altersphasen`, `protokoll` (zusammengeführt), `statistik`, `mythen`, `stand` | fertig, aber noch nicht gegen Vorlagen getestet |
| `site/_data/site.js` | Titel, URL, `pathPrefix`, Repo, giscus-Platzhalter, Issue-Vorlage, Herausgeber-Platzhalter | fertig |
| `site/assets/css/stil.css` | komplettes Stilblatt: Tokens hell/dunkel, Kopf, Rollen-Filter, Ampel, Status, Themenfarben (`[data-thema]`), Kacheln, Held, Kreislauf, Hilft/Schadet, Aussage-Karte, Checkliste, Matrix, Zeitstrahl, Stationen, Quellen, Protokoll, Fuß, Druck | fertig |
| `site/assets/fonts/` | Atkinson Hyperlegible, Bricolage Grotesque (variabel), IBM Plex Mono, mit Lizenzen; `@font-face` steht in `stil.css` | fertig |
| `scripts/leitfragen.js` | erzeugt `docs/leitfragen/` | fertig |
| `.github/ISSUE_TEMPLATE/anmerkung.yml` | Issue-Formular mit Feldern `seite`, `bezug`, `was`, `quelle` | fertig |

## Was fehlt

### 1. Vorlagen in `site/` (Nunjucks)

Alle Texte Deutsch. Keine Fakten in Vorlagen; alles aus `daten` (globale Daten `daten.*` und `site.*`).

- `_includes/layouts/base.njk`: `<html lang="de" data-rolle="alle">`, Meta (Titel „… · Leben Lernen“, description, `og:*`), `stil.css`, Skip-Link, Kopf (`.kopf`: Marke, `.hauptnav` mit Alter · Themen · Navigator · Köpfe · Mythen · Werkstatt · Suche, `.rollen` als `.seg` mit Alle/Eltern/Lehrkräfte/Jugendliche/Erwachsene), KI-Leiste (`.ki-leiste`: Badge „KI“ + „Inhalte sind KI-recherchiert und geprüft, nicht redaktionell. Maßgeblich sind Leitlinien, Gesetze und die Beratung von Fachleuten.“ + Link Methodik), `<main class="seite inhalt">`, Fuß (`.fuss`: Stand `daten.stand`, Links Methodik · Protokoll · Werkstatt · Impressum · GitHub, Theme-Umschalter, Hinweis „Keine KI-Funktionen auf dieser Seite, keine Tracker“), `app.js`. Pagefind: `<main data-pagefind-body>`.
- `_includes/layouts/seite.njk`: erweitert base; Kopfzeile mit `eyebrow`, `h1`, `lede`, `.seitenmeta` (Stand, Status, Link „Korrektur vorschlagen“ via `site | issueLink(page-ähnliches Objekt, bezug)`), Inhalt, dann `components/quellen.njk`, `components/protokoll.njk`, `components/kommentare.njk`.
- `_includes/components/`: `ampel.njk` (Makro `ampel(stufe)` → `<span class="ampel" data-ampel="…">`), `status.njk`, `aussage.njk` (Makro: `.aussage` mit Satz, Ampel, Wirkung, Studientyp, Phasen, `details` Erklärung + Gehirn + Gegenstimmen + Empfehlung, Quellenliste, Link „Korrektur vorschlagen“ mit `bezug = aussage.id`, Status-Badge bei `in_diskussion`), `quellen.njk`, `protokoll.njk`, `kommentare.njk` (giscus, wenn `site.giscus.repoId`, sonst Hinweis + Issue-Link; `data-lang="de"`, `data-theme="preferred_color_scheme"`, `data-mapping="pathname"`, `data-loading="lazy"`), `kreislauf.njk` (6 Schritte aus struktur.md), `kacheln.njk` (12 Themen), `stationen.njk`.
- Seiten:
  - `index.njk` → `/`: Held (h1 „Leben <span>Lernen</span>“, Lede), Einstieg mit Altersregler 0–80 (springt zur Phasenseite, `app.js`) und Schnellwahl (1, 4, 6, 10, 13, 16, 19, 24, 45, 67), Zahlen (`statistik`: Schwerpunktseiten, davon veröffentlicht, geprüfte Aussagen, Quellen), Themenkacheln, Navigator-Teaser, Kreislauf, letzte 5 Protokolleinträge.
  - `alter/index.njk` → `/alter/`: Altersregler + 12 Phasenkarten.
  - `alter/phase.njk` (Pagination über `daten.phasen`, `permalink: /alter/{{ phase.slug }}/`): Alter, Mittelpunkt, „Was jetzt ansteht“ aus `phase.altersphasen[].todo`, Stationen (`stationen.njk`, Link `/navigator/#s-<id>`), Themen in dieser Phase (`phase.themen`: ● Link zur Schwerpunktseite mit Status, ○ Link zur Themenseite), Warnsignale (`phase.warnsignale`, `wann_hilfe`), geprüfte Aussagen der Phase.
  - `themen/index.njk` → `/themen/`: Kacheln + Matrix-Kurzfassung.
  - `themen/thema.njk` (Pagination über `daten.themen`, `permalink: /themen/{{ thema.slug }}/`, `data-thema`): Beschreibung, Leitfragen, Zeitstrahl (`thema.zellen`: ● Link, ○ Hinweis, – leer, jeweils Status), Kernaussagen (geprüfte, `ampel == "stark"` zuerst), Mythen, Köpfe (`thema.koepfe`, sonst Startliste-Einträge als „geplant“), Quellen.
  - `themen/schwerpunkt.njk` (Pagination über `daten.schwerpunkte`, `permalink: /themen/{{ zelle.slug }}/`): bei `status == "geplant"` Banner „Diese Seite ist geplant. Recherche steht aus.“ + `<meta name="robots" content="noindex">` + Leitfragen + Phasen-Mittelpunkt + Stationen + Kommentare. Sonst: Kernaussage je Zielgruppe (`data-fuer`), Hilft/Schadet (`.hilft-schadet` mit `aussage.njk`), Einordnung, Kasten Gehirn (`seite.gehirn`), Kasten Weltweit bewährt (`seite.weltweit`, Land, Praxis, Beleg, Übertragbarkeit, Ampel, Quelle), Tipps je Zielgruppe, Mythos-Check, Wann Hilfe + Hilfsangebote, Link zur Checkliste, Quellen, Protokoll, Kommentare.
  - `themen/checkliste.njk` (Pagination über `daten.schwerpunkte`, nur mit `seite`, `permalink: /themen/{{ zelle.slug }}/checkliste/`): Druckseite mit Checkliste je Zielgruppe (`.checkliste`), Kernaussage, Quellenangabe, Stand, URL; Knopf „Drucken“ (`window.print()`).
  - `navigator/index.njk` → `/navigator/`: siehe Abschnitt 2.
  - `koepfe/index.njk`, `koepfe/kopf.njk` (Pagination über `daten.koepfe`, `permalink: /koepfe/{{ kopf.id }}/`): Kurz, Studien, Kritik/Replikation, Praxis, Kernaussagen mit Ampel. Leere Liste → Startliste anzeigen, Hinweis „noch nicht recherchiert“.
  - `mythen/index.njk`: `daten.mythen` + Mythen aus `seiten`; leer → Erklärung.
  - `methodik/index.njk`: Evidenzampel-Tabelle, Quellenrang, Kreislauf, Transparenz, Was es über KI zeigt, Warum keine KI-Funktionen, Wie kommentieren (Text aus struktur.md, als Vorlage ausformuliert; das ist Methodik, keine Fachaussage).
  - `werkstatt/index.njk`: Matrix 12 × 9 (`.matrix`, ● als Link mit `data-status`, ○ als `.o`, – als Strich), Legende, Zähler je Status, Aussagen je Thema nach Status, offene Diskussionen.
  - `protokoll/index.njk`: `daten.protokoll` als `.protokoll`.
  - `suche/index.njk`: Pagefind-UI (`/pagefind/pagefind-ui.css`, `/pagefind/pagefind-ui.js`, `new PagefindUI({ element: "#suche", showSubResults: true, translations: {…deutsch…} })`).
  - `impressum.njk`: Impressum und Datenschutz mit Platzhaltern aus `site.herausgeber` („[Bitte ergänzen]“), Hinweis zu giscus (lädt von GitHub, nur nach Interaktion), zu selbst gehosteten Schriften und zu fehlenden Trackern.
  - `robots.txt`, `404.njk`.

### 2. Navigator-Port

Quelle: der Originalstand ist das Artefakt „Bildungswege Niedersachsen“; sein Markup und Skript sind in `docs/navigator-original.html` abgelegt (nur Referenz, wird nicht gebaut).

- `site/assets/css/navigator.css`: die Navigator-Stile aus dem Original (Abschnitte „Steuerleiste“, „Legende“, „Karte“, „Infokarten“), Tokens kommen aus `stil.css`.
- `site/assets/js/navigator.js`: das Original-Skript ohne KI-Wegfinder (`EXAMPLES`, `EXAMPLE_ANSWER`, `ask`, `buildPrompt`, `SAMPLE_COPY`, `sampleApi`, `renderAnswer`, `route-on/off`) und ohne `window.claude`. Daten kommen aus `<script id="navigator-data" type="application/json">{{ daten.navigator | json | safe }}</script>`; eine kleine Funktion bildet die lesbaren Schlüssel (`titel, kurz, bereich, meilenstein, bbs, offen, stufe{spalte,zeile}, alter{von,bis,zeile}|{bei,zeile}, meta_stufe, meta_alter, dauer, zugang, abschluss, wo, hinweis`) auf die internen Namen des Skripts ab (`t, s, sec, ms, bbs, open, p, a, pm, am, dur, zug, abs, wo, note`), Übergänge `{von,nach,bedingung,hinweis}` auf `{f,t,c,note}`, Altersphasen `{von,bis,fokus,titel,text,todo}` auf `{from,to,focus,title,text,todo}`. Jede Station bekommt `id="s-<id>"`, damit `/navigator/#s-kita` sie auswählt (beim Laden `location.hash` auswerten). Der Knopf „Diskutieren“ wird zu zwei Links in der Stationskarte: „Kommentieren“ (→ `#kommentare`) und „Korrektur vorschlagen“ (Issue-Link mit `bezug = Station <id>`; Basis-URL als `data-issue-basis` am Container).
- `site/navigator/index.njk`: Kopfbereich, Steuerleiste (Ansicht, Alter, Schnellwahl, BBS-Haken), Legende, Karte, Infokarten (Alter, Station), **Beispiel-Kasten** „So würde eine KI-Antwort aussehen“ mit dem bisherigen Beispiel (Hauptschulabschluss → Ausbildung → Berufsabschluss → Techniker) und dem Satz, warum es auf der Seite keine Live-KI gibt, Quellen (`daten.navigator.quellen`), Protokoll (`daten.navigator.protokoll`), Kommentare.

### 3. `scripts/validate.js`

Mit Ajv (draft 2020-12, `ajv-formats`) prüfen; bei Fehlern Exit-Code 1 und verständliche Meldung (Datei, ID, Feld). Prüfungen:

1. `daten/themen/*.json`: Array von Aussagen nach `schema-aussage.json`; IDs eindeutig über alle Dateien; `thema` passt zum Dateinamen; `quellen` nicht leer; `ampel` gesetzt; jedes `kernzitat` höchstens 15 Wörter; `stand` nicht in der Zukunft.
2. `daten/seiten/*.json`: Array nach `schema-seite.json`; `thema` existiert; `altersgruppe` ist in der Matrix dieses Themas `schwerpunkt`; alle IDs in `hilft`, `schadet`, `einordnung`, `mythen[].aussage_id` existieren und haben Status `geprueft`, `korrigiert` oder `in_diskussion`; keine ID doppelt in hilft und schadet.
3. `daten/koepfe/*.json` (ohne `_`): nach `schema-kopf.json`, IDs eindeutig.
4. `daten/navigator.json`: alle `uebergaenge` verweisen auf existierende Stationen; `phasen.json` → `stationen` existieren; Themen-Matrix hat 9 Einträge je Thema; Summe „schwerpunkt“ = 67.
5. `daten/phasen.json`, `daten/themen.json`: Slugs eindeutig, Altersgruppen lückenlos.
Ausgabe am Ende: Anzahl Aussagen je Status, Seiten, Köpfe. Ohne Daten (leere Ordner) läuft der Test grün durch.

### 4. `.github/workflows/pages.yml`

Auslöser `push` auf `main` und `workflow_dispatch`. Jobs: `build` (Node 22, `npm ci`, `npm run build`, `actions/upload-pages-artifact` mit `path: public`), `deploy` (`actions/deploy-pages`, Umgebung `github-pages`, Rechte `pages: write`, `id-token: write`). Zusätzlich `pruefen.yml`: bei Pull Requests `npm ci && npm test && npm run build`.

### 5. `site/assets/js/app.js`

Rollen-Filter (`.rollen .seg button` → `document.documentElement.dataset.rolle`, `localStorage` Schlüssel `ll-rolle`), Theme-Umschalter (auto/hell/dunkel, `data-theme`, Schlüssel `ll-theme`), Altersregler (Phase zum Alter finden, Link aktualisieren, `change` → Seite wechseln), Drucken-Knopf. Alle `localStorage`-Zugriffe in `try/catch`.

### 6. Testlauf

`npm test`, `npm run build`, `npx eleventy --serve` oder `npx http-server public`; Startseite, eine Phasenseite, eine Themenseite, eine Schwerpunktseite (geplant), Navigator (Stufen- und Altersansicht, Station auswählen, Hash-Link), Werkstatt, Suche im Browser ansehen; Konsole ohne Fehler; Druckansicht der Checkliste (es gibt noch keine Seite mit `seite`, daher nur Vorlage prüfen, etwa mit einem temporären Testdatensatz, der nicht committet wird).

### 7. Abschluss

`.gitignore` enthält `node_modules/` und `public/`. Branch `grundgeruest-2`, Commit auf Deutsch, Pull Request „Grundgerüst Teil 2: Vorlagen, Navigator, Validierung, Veröffentlichung“ mit Zusammenfassung und offenen Punkten (giscus-IDs eintragen, Pages auf „GitHub Actions“ stellen, Impressum ausfüllen, Lizenz festlegen). Falls kein Pull Request möglich ist: Branch pushen und im Abschluss den Branch-Namen nennen.
