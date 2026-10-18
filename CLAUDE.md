# Leben Lernen – Leitplanken für jede Sitzung

Du arbeitest am Projekt „Leben Lernen“: eine öffentliche Website, die Eltern, Lehrkräfte, Jugendliche und Erwachsene über Bildungswege und gesunde Entwicklung von der Geburt bis ins hohe Alter informiert. Inhalte entstehen mit KI, sind belegt, eingestuft, datiert und werden offen diskutiert. Die Seite zeigt nebenbei, wie weit KI-Recherche heute trägt, wo sie Fehler macht und wie offene Diskussion sie besser macht.

## Regeln für jede Aussage (P0)

1. **Nur belegte Aussagen.** Jede braucht mindestens eine Quelle mit DOI oder Link, die du selbst geöffnet hast. Erfinde nie Studien, Zahlen oder Zitate. Was du nicht belegen kannst, markierst du als „nicht belegt“ und nimmst es nicht in `daten/` auf.
2. **Quellenrang:** (1) Leitlinien und offizielle Empfehlungen (WHO, EFSA, BfR, DGE, BIÖG, Fachgesellschaften, Ministerien), (2) systematische Reviews und Meta-Analysen, (3) randomisierte Studien und große Längsschnittstudien, (4) Einzelstudien, (5) Expertenmeinung nur zur Einordnung. Keine Blogs und Ratgeber ohne Belege; Herstellerfinanzierung kennzeichnen.
3. **Evidenzampel:** stark (Leitlinien oder mehrere Meta-Analysen mit gleichem Ergebnis), mittel (einzelne Meta-Analysen oder mehrere übereinstimmende gute Studien), schwach (Einzelstudien, Querschnitt, Tierversuche, kleine Stichproben), umstritten (gute Studien widersprechen sich), mythos (mehrfach widerlegt).
4. **Wirkung:** Jede Aussage trägt eine Richtung: hilft, schadet, neutral oder einordnung. Was schadet, wird genauso streng belegt wie das, was hilft.
5. **Aktualität:** Nenne bei Empfehlungen das Jahr. Prüfe ausdrücklich, was sich in den letzten 24 Monaten geändert hat.
6. **Deutschland zuerst:** deutsche Empfehlungen und Rechtslage (Bund, Niedersachsen), dann internationale Vergleiche. Evaluierte Praxis aus anderen Ländern kommt in den Kasten „Weltweit bewährt“, mit Beleg und Einschätzung der Übertragbarkeit. Gesetzesvorhaben, die noch nicht beschlossen sind, kennzeichnest du als geplant.
7. **Gehirn:** Erkläre, was im Gehirn passiert, nur soweit belegt. Kennzeichne Tier- und Bildgebungsstudien. Benenne Neuromythen.
8. **Kontroversen offen darstellen:** wer vertritt was, mit welchen Belegen. Bekannte Namen sind nicht automatisch der Forschungsstand.
9. **Sprache:** Deutsch, klar, Sätze unter 20 Wörtern, keine Panikmache, keine Verharmlosung. Eltern, Lehrkräfte und Erwachsene per Sie, Jugendliche per Du. Keine individuelle medizinische, rechtliche oder finanzielle Beratung; verweise auf Fachleute und Hilfsangebote.
10. **Zitate höchstens 15 Wörter**, sonst eigene Worte. Keine längeren Passagen aus Quellen übernehmen.
11. **Daten immer nach Schema:** `daten/schema-aussage.json`, `daten/schema-seite.json`, `daten/schema-kopf.json`. IDs sind stabil; nichts wird gelöscht, sondern mit Status `zurueckgezogen` und Begründung im Protokoll behalten.
12. **Jede Sitzung endet** mit grünem `npm test`, einem Pull Request und einer kurzen Zusammenfassung: was neu ist, was unsicher bleibt.

## Was auf der Website gilt

- **Keine KI-Funktionen auf der Seite.** Keine Live-Anfragen an ein Modell, keine Chatfelder: Sie würden Kontingent der Nutzerinnen und Nutzer verbrauchen. Die KI arbeitet im Hintergrund (Recherche, Faktencheck, Korrekturen), sichtbar im Änderungsprotokoll.
- **Kommentare ja.** Unter jeder Seite ein Kommentarfeld (giscus über GitHub Discussions, konfiguriert in `site/_data/site.js`) und bei jeder Aussage und Station ein Link „Korrektur vorschlagen“, der ein vorausgefülltes GitHub-Issue öffnet. Beides ist der Eingang für Prompt P6.
- **Auf jeder Seite:** KI-Hinweis, Stand-Datum, Quellen, Kommentare, Änderungsprotokoll.
- **Seiten werden erzeugt, nie von Hand geschrieben.** Inhalte liegen ausschließlich in `daten/`. Vorlagen in `site/` enthalten keine Fakten.
- **Zugänglich und schlank:** barrierefrei, mobil zuerst, hell und dunkel, keine Tracker, keine externen Skripte außer giscus und Schriften.

## Repository

```
CLAUDE.md            diese Datei
README.md            Ablauf, Befehle, Einrichtung
docs/struktur.md     Idee, Leitplanken, Lebensphasen, Themen, Matrix, Seitentypen, Fahrplan
docs/prompts.md      Prompt-Bibliothek S0, P1–P7, N1
docs/leitfragen/     eine Datei je Thema, erzeugt aus daten/themen.json (npm run leitfragen)
daten/               alle Inhalte als JSON, siehe daten/README.md
berichte/            Recherche- und Faktencheck-Berichte im Klartext (Markdown)
scripts/validate.js  prüft daten/ gegen die Schemata und die Regeln oben
site/                Eleventy-Generator: Vorlagen, Daten-Lader, Stile, Navigator
public/              Build-Ausgabe, nicht im Repository
.github/workflows/   Build und Veröffentlichung auf GitHub Pages
```

Befehle: `npm install`, `npm test` (Validierung), `npm run build` (Website nach `public/`), `npm run dev` (lokaler Server), `npm run leitfragen`.

## Arbeitsweise in einer Sitzung

- Lies zuerst `docs/struktur.md` und den Prompt deiner Etappe in `docs/prompts.md`.
- Eine Sitzung bearbeitet eine Etappe (ein Thema, eine Person, eine Korrektur). Nicht mehrere Themen in einer Sitzung.
- Faktencheck (P3) läuft immer in einer neuen Sitzung, nie in der Sitzung der Recherche.
- Nutze Subagenten für Teilfragen, damit der Kontext schlank bleibt. Fasse Zwischenergebnisse in `berichte/` zusammen.
- Keine persönlichen Daten aus Kommentaren oder Issues übernehmen.
- Commits auf Deutsch, Betreff im Imperativ, z. B. „Recherche Schlaf: 42 Aussagen, status recherchiert“. Pull Request mit Zusammenfassung und offenen Punkten.
- Änderungen an `daten/navigator.json` nur mit Quelle und Eintrag unter `protokoll` in derselben Datei.
