# Leben Lernen

Eine öffentliche Website über Bildungswege und gesunde Entwicklung von der Krippe bis ins hohe Alter: für Eltern, Lehrkräfte, Jugendliche, Erwachsene und Ältere. Alle Inhalte werden mit KI recherchiert und geprüft, jede Aussage trägt eine Evidenzampel, eine Quelle und ein Stand-Datum, und jede Korrektur steht im Änderungsprotokoll. Das Projekt zeigt zugleich, wie weit KI-Recherche heute trägt, wo sie Fehler macht und wie offene Diskussion sie besser macht.

Enthalten ist der Navigator **Bildungswege Niedersachsen**: Stationen von der Krippe bis zum Lernen im Ruhestand, nach Bildungsstufe und nach Alter.

- Struktur, Lebensphasen, Themen, Matrix und Fahrplan: [`docs/struktur.md`](docs/struktur.md)
- Leitplanken für jede Sitzung: [`CLAUDE.md`](CLAUDE.md)
- Prompt-Bibliothek: [`docs/prompts.md`](docs/prompts.md)
- Daten und Schemata: [`daten/README.md`](daten/README.md)

## So entsteht die Seite

1. **Recherche** je Thema (Prompt P1) schreibt belegte Aussagen nach `daten/themen/<thema>.json`.
2. **Faktencheck** in einer zweiten, unabhängigen Sitzung (P3) öffnet jede Quelle und setzt den Status auf `geprueft` oder `korrigiert`.
3. **Texte** für vier Zielgruppen (P4) entstehen nur aus geprüften Aussagen und landen in `daten/seiten/<thema>.json`.
4. **Build** erzeugt aus `daten/` die Website; `npm test` verhindert jeden Build mit unbelegten Aussagen.
5. **Diskussion**: Kommentare unter jeder Seite und „Korrektur vorschlagen“ bei jeder Aussage. Berechtigte Hinweise gehen über eine Nachrecherche (P6) zurück in den Faktencheck.
6. **Update** vierteljährlich je Thema (P7).

Jede Etappe ist eine eigene Sitzung mit Claude und endet mit einem Pull Request, den ein Mensch prüft und übernimmt. Auf der Website selbst laufen keine KI-Funktionen.

## Befehle

```bash
npm install          # einmalig
npm test             # prüft daten/ gegen Schemata und Regeln (Quelle, Ampel, Zitatlänge, Verweise)
npm run build        # baut die Website nach public/ (ruft vorher npm test auf)
npm run dev          # lokaler Server mit Live-Reload unter http://localhost:8080/
npm run leitfragen   # erzeugt docs/leitfragen/*.md neu aus daten/themen.json
```

Veröffentlicht wird automatisch: Jeder Push auf `main` baut die Seite und legt sie auf GitHub Pages ab (`.github/workflows/pages.yml`). Für einen späteren Umzug auf eine Unterseite der Firmenwebsite genügt `PATH_PREFIX=/leben-lernen/ npm run build`.

## Einmalige Einrichtung

**GitHub Pages:** Repository → Settings → Pages → Build and deployment → Source: „GitHub Actions“. Danach ist die Seite unter `https://krafft-kai.github.io/Leben-Lernen/` erreichbar.

**Kommentare (giscus):**

1. Repository → Settings → General → Features → „Discussions“ einschalten.
2. Die giscus-App installieren: https://github.com/apps/giscus (nur für dieses Repository).
3. Auf https://giscus.app das Repository eintragen, als Zuordnung „Pfad der Seite“ (pathname) und eine Kategorie wählen (empfohlen: „Anmerkungen“, Typ Announcement, damit nur über die Seite kommentiert wird). giscus zeigt dann `data-repo-id` und `data-category-id`.
4. Beide Werte in `site/_data/site.js` unter `giscus` eintragen und pushen.

Bis dahin zeigt jede Seite statt des Kommentarfelds den Link „Korrektur vorschlagen“, der ein vorausgefülltes GitHub-Issue öffnet. Der Link bleibt auch danach.

**Cloud-Sitzungen:** Die Recherche braucht freien Netzwerkzugang zu Studien und Behördenseiten; Bauen und Texte kommen mit dem Standard aus. Pro Sitzung ein Prompt aus `docs/prompts.md`.

## Stand

18. Oktober 2026: Grundgerüst steht (Etappe 0). Noch kein Thema recherchiert; die Werkstatt-Seite zeigt den Stand jeder der 67 Schwerpunktseiten. Nächster Schritt: Pilot mit „Schlaf“ und „Medien, Gaming und KI“ (Prompts P1 und P3).

## Lizenz

Noch festzulegen. Vorschlag: Code unter MIT, Inhalte unter CC BY 4.0.
