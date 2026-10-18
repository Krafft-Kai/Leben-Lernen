# Leben Lernen: Struktur

Stand: 18. Oktober 2026. Übertragen aus dem Planungsdokument „Bildungswege: Struktur und Prompts“ vom 17. Oktober 2026 und um die Entscheidungen vom 18. Oktober ergänzt (siehe unten).

Die Seite verbindet den Navigator „Bildungswege Niedersachsen“ mit 12 Themenclustern über 12 Lebensphasen. Jede Aussage trägt eine Evidenzampel, eine Quelle und ein Stand-Datum. Erst steht diese Struktur, dann laufen die Prompts aus `docs/prompts.md`.

## Die Idee in einer Minute

**Leben Lernen** zeigt, welche Bildungswege es von der Krippe bis ins hohe Alter gibt und was in jeder Lebensphase für Lernen und gesunde Entwicklung zählt. KI recherchiert, prüft und baut alle Inhalte. Menschen diskutieren sie öffentlich, und die KI arbeitet die Hinweise sichtbar ein.

- **Für wen:** Eltern, Lehrkräfte, Jugendliche, Erwachsene und Ältere. Man wählt „Ich bin …“ und „Alter“.
- **Was drin ist:** der Bildungswege-Navigator für Niedersachsen und 12 Themen von Schlaf über Social Media bis Gedächtnis im Alter, immer mit Blick aufs Gehirn.
- **Warum man der Seite trauen kann:** Jede Aussage hat Evidenzampel, Quelle und Datum; das Änderungsprotokoll zeigt jede Korrektur.
- **Was es über KI zeigt:** wie weit KI-Recherche heute trägt, wo sie Fehler macht und wie offene Diskussion sie besser macht.
- **Wie es entsteht:** in Cloud-Sitzungen mit Claude, eine Etappe je Sitzung, jede Etappe als Pull Request.

### Der Kreislauf

1. **Recherche** (P1): Leitlinien, Reviews, Studien; Aussagen nach Schema.
2. **Faktencheck** (P3): eine zweite, unabhängige Sitzung öffnet jede Quelle.
3. **Texte** (P4): für vier Zielgruppen umgeschrieben, nur aus geprüften Aussagen.
4. **Veröffentlichen** (P5): Generator baut die Seiten, GitHub Pages liefert sie aus.
5. **Diskussion** (P6): Kommentare unter jeder Seite; berechtigte Hinweise gehen über eine Nachrecherche zurück in den Faktencheck.
6. **Update** (P7): vierteljährlich je Thema, was neu ist; Änderungen laufen wieder durch Schritt 2.

Die Diskussion ist der Prüfschritt. Nichts wird still geändert: jede Korrektur steht im Änderungsprotokoll mit Datum, Grund und Quelle.

## Leitplanken

Jede Aussage auf der Seite ist belegt, eingestuft, datiert und als KI-Inhalt gekennzeichnet. Die vollständigen Regeln stehen in `CLAUDE.md` und gelten automatisch für jede Sitzung.

### Evidenzampel für jede einzelne Aussage

| Stufe | Bedeutung | Typische Belege |
|---|---|---|
| **Stark** | Die Forschung ist sich einig | Leitlinien, mehrere Meta-Analysen mit gleichem Ergebnis |
| **Mittel** | Gut belegt, mit Lücken | Einzelne Meta-Analysen, mehrere gute Studien, die übereinstimmen |
| **Schwach** | Erste Hinweise | Einzelstudien, Querschnittsdaten, Tierversuche, kleine Stichproben |
| **Umstritten** | Gute Studien widersprechen sich | Widersprüchliche Meta-Analysen, offene Fachdebatte |
| **Mythos** | Mehrfach widerlegt | Befund in guten Studien nicht bestätigt |

**Quellenrang:** 1. Leitlinien und offizielle Empfehlungen (WHO, EFSA, BfR, DGE, BIÖG, Fachgesellschaften, Ministerien). 2. Systematische Reviews und Meta-Analysen. 3. Randomisierte Studien und große Längsschnittstudien. 4. Einzelstudien. 5. Expertenmeinung nur zur Einordnung. Blogs und Ratgeber ohne Belege zählen nicht; Herstellerfinanzierung wird gekennzeichnet.

**Blick aufs Gehirn:** Jede Themenseite hat einen Kasten „Was passiert im Gehirn?“. Er erklärt nur, was belegt ist, und kennzeichnet Tier- und Bildgebungsstudien. Neuromythen wie Lernstile oder „Zucker macht hyperaktiv“ werden aktiv geprüft.

**Transparenz:**

- KI-Hinweis, Stand-Datum und Änderungsprotokoll auf jeder Seite
- Kommentare unter jeder Seite und ein Link „Korrektur vorschlagen“ bei jeder Aussage und jeder Station
- Gesetzesvorhaben, die noch nicht beschlossen sind, werden als solche markiert
- Keine Einzelfallberatung; bei Gesundheit, Sucht und psychischer Belastung Verweis auf Fachleute und Hilfsangebote
- Deutschland zuerst, Schulrecht von Niedersachsen; internationale Studien als Vergleich und als Kasten „Weltweit bewährt“

## Lebensphasen

Zwölf Phasen bilden die Altersachse (`daten/phasen.json`). Sie passen zu den Stationen des Navigators, sodass „Mein Kind ist 5“ direkt auf Phase P2 und die Kita zeigt.

| Phase | Alter | Stationen im Navigator | Was gerade im Mittelpunkt steht |
|---|---|---|---|
| P0 Säugling | 0–1 | – | Bindung, Sprache, Schlaf, Betreuungsplatz suchen |
| P1 Kleinkind | 1–3 | Krippe, Tagespflege | Sprache, Bewegung, erste Bildschirme |
| P2 Kindergarten | 3–6 | Kita, Einschulung | Spiel, Sprache, Schulstart |
| P3 Grundschule | 6–10 | Grundschule, Ganztag | Lesen, Rechnen, Gewohnheiten, Schulwahl |
| P4 Übergang | 10–13 | Start Sekundarstufe I | Erstes Smartphone, beginnende Pubertät |
| P5 Frühe Jugend | 13–16 | Sekundarstufe I, Abschluss | Pubertät, Social Media, erste Risiken |
| P6 Späte Jugend | 16–19 | Sek II, Ausbildung, BBS | Abschluss, Autonomie, Substanzen |
| P7 Junge Erwachsene | 19–27 | Studium, Meister, Techniker | Selbstständigkeit, Geld, Berufsweg |
| P8 Erwerbsleben | 27–45 | Weiterbildung, Bildungszeit | Beruf und Familie, Elternrolle |
| P9 Mittleres Alter | 45–65 | Umschulung, Weiterbildung | Gesundheit, Neuorientierung |
| P10 Junge Alte | 65–80 | Lernen im Ruhestand | Gedächtnis, Teilhabe, Ehrenamt |
| P11 Hochaltrige | 80+ | – | Selbstständigkeit, Kognition, Kontakte |

Für die Matrix werden die Phasen zu neun Altersgruppen zusammengefasst: 0–3 (P0, P1), 3–6, 6–10, 10–13, 13–16, 16–19, 19–27, 27–65 (P8, P9), 65+ (P10, P11).

## Themencluster und Leitfragen

Zwölf Cluster (`daten/themen.json`). Die Leitfragen stehen je Thema in `docs/leitfragen/` und gehen wörtlich in den Recherche-Prompt; jede Recherche beantwortet auch „Was passiert dabei im Gehirn?“.

1. Entwicklung und Gehirn
2. Fördern und Lernen
3. Zukunftskompetenzen
4. Ernährung
5. Bewegung und Sport
6. Schlaf
7. Medien, Gaming und KI
8. Sucht und Risiko
9. Finanzen
10. Gesundheit und Schutz
11. Gute Schule und Unterricht
12. Lernen im Erwachsenenalter und Alter

## Matrix: Thema × Altersgruppe

● = Schwerpunkt mit eigener Seite, ○ = kurzer Abschnitt auf der Themen- und Altersseite, – = entfällt. Daraus ergeben sich 67 Schwerpunktseiten. Die Website zeigt diese Matrix unter „Werkstatt“ mit dem aktuellen Stand jeder Seite.

| Thema | 0–3 | 3–6 | 6–10 | 10–13 | 13–16 | 16–19 | 19–27 | 27–65 | 65+ |
|---|---|---|---|---|---|---|---|---|---|
| 1 Entwicklung und Gehirn | ● | ● | ● | ● | ● | ● | ○ | ○ | ● |
| 2 Fördern und Lernen | ● | ● | ● | ● | ● | ● | ○ | ○ | ○ |
| 3 Zukunftskompetenzen | – | ○ | ● | ● | ● | ● | ○ | ○ | – |
| 4 Ernährung | ● | ● | ● | ● | ● | ● | ○ | ○ | ● |
| 5 Bewegung und Sport | ● | ● | ● | ● | ● | ● | ○ | ● | ● |
| 6 Schlaf | ● | ● | ● | ● | ● | ● | ○ | ○ | ● |
| 7 Medien, Gaming und KI | ○ | ● | ● | ● | ● | ● | ● | ○ | ○ |
| 8 Sucht und Risiko | – | – | ○ | ● | ● | ● | ● | ○ | – |
| 9 Finanzen | – | ○ | ● | ● | ● | ● | ● | ○ | ○ |
| 10 Gesundheit und Schutz | ● | ● | ● | ● | ● | ● | ○ | ○ | ● |
| 11 Gute Schule und Unterricht | – | ○ | ● | ● | ● | ● | – | – | – |
| 12 Lernen im Alter | – | – | – | – | – | – | ○ | ● | ● |

## Zielgruppen und Seitentypen

Jede Aussage wird einmal recherchiert und dann für vier Zielgruppen umgeschrieben. Oben auf jeder Seite wählt man „Ich bin …“ und „Alter“.

| Zielgruppe | Ansprache | Fokus |
|---|---|---|
| Eltern | Sie, alltagsnah, ohne Schuldgefühle | Was ist jetzt dran, was kann ich tun, wann Hilfe holen |
| Lehrkräfte und Erzieher | Sie, fachlich | Unterricht, Klasse, Elterngespräch, Schulrecht Niedersachsen |
| Jugendliche | Du, kurz, ehrlich, ohne Belehrung | Eigene Entscheidungen, Fakten statt Panik |
| Erwachsene und Ältere | Sie, praktisch | Weiterbildung, Gedächtnis, Angebote vor Ort |

| Seitentyp | Zweck | Bausteine | Erreicht über |
|---|---|---|---|
| Startseite | Einstieg | Rolle und Alter wählen, Navigator, Themenkacheln | – |
| Altersseite („Mein Kind ist 5“) | Alles zu einer Phase | Entwicklung jetzt, Bildungsweg jetzt, wichtigste Themen der Phase, Warnsignale | Altersregler, Navigator |
| Themenseite (z. B. Schlaf) | Ein Thema über alle Phasen | Kernaussagen, Zeitstrahl über die Lebensspanne, Blick ins Gehirn, Mythen, Kontroversen, Köpfe | Themenkacheln |
| Schwerpunktseite (Thema × Altersgruppe) | Konkreter Rat | Kernaussage, **Hilft / Schadet nebeneinander** mit Ampel und Quelle, Blick ins Gehirn, **Weltweit bewährt**, Tipps je Zielgruppe, Mythos-Check, wann Hilfe holen, **Checkliste zum Ausdrucken** | Matrix, Alters- und Themenseite |
| Köpfe und Studien | Forschende einordnen | Kernbefunde, Schlüsselstudien, Kritik, Replikation | Themenseite |
| Mythen-Check | Neuromythen und Irrtümer | Behauptung, Befund, Ampel, Quelle | Themenseite, Startseite |
| Navigator | Bildungswege Niedersachsen | Stufen- und Altersansicht, Stationen, Anschlüsse | Startseite, Altersseite |
| Methodik | Wie die Seite entsteht | Evidenzampel, Quellenrang, Kreislauf, KI-Hinweis | Fußzeile |
| Werkstatt | Stand der Arbeit | Matrix mit Status je Seite, offene Diskussionen | Fußzeile |

Auf jeder Seite stehen KI-Hinweis, Stand-Datum, Quellen, Kommentare und Änderungsprotokoll.

## Datenschema

Alle Inhalte liegen als JSON im Repository (`daten/`). Seiten werden aus diesen Daten erzeugt, nie von Hand geschrieben. Die Schemata:

- `daten/schema-aussage.json`: eine belegte Aussage mit Wirkung (hilft, schadet, neutral, einordnung), Ampel, Studientyp, Quellen, Gegenstimmen, Tipps je Zielgruppe, Status und Änderungen.
- `daten/schema-seite.json`: die Bausteine einer Schwerpunktseite; verweist auf Aussagen nur über IDs.
- `daten/schema-kopf.json`: eine Forscherin oder ein Forscher mit Studien, Kritik und Replikation.

`npm test` prüft alle Dateien gegen die Schemata und zusätzlich: jede Aussage hat Quelle und Ampel, Kernzitate haben höchstens 15 Wörter, Seiten verweisen nur auf geprüfte Aussagen.

## Köpfe und Studien

Die Startliste steht in `daten/koepfe/_startliste.json`. Sie stammt aus Vorwissen und wird in der Recherche geprüft und ergänzt. Wichtig ist jeweils die Gegenposition, denn bekannte Namen sind nicht automatisch der Forschungsstand.

## Umsetzung

Gebaut wird in diesem Repository. Jede Etappe ist eine eigene Sitzung mit Claude, die Dateien schreibt und einen Pull Request öffnet; du prüfst und übernimmst. `CLAUDE.md` liest jede Sitzung automatisch.

Repository-Aufbau:

```
Leben-Lernen/
├─ CLAUDE.md                 Leitplanken (Prompt P0) und Projektkonventionen
├─ README.md                 Ablauf, Befehle, Einrichtung
├─ docs/struktur.md          dieses Dokument
├─ docs/prompts.md           Prompt-Bibliothek S0, P1–P7
├─ docs/leitfragen/          eine Datei je Thema, erzeugt aus daten/themen.json
├─ daten/                    alle Inhalte als JSON (siehe daten/README.md)
├─ berichte/                 Recherche- und Faktencheck-Berichte im Klartext
├─ scripts/                  Validierung, Leitfragen-Export
├─ site/                     Vorlagen und Generator (Eleventy)
├─ public/                   fertige Seiten, vom Build erzeugt, nicht im Repository
└─ .github/workflows/        Build und Veröffentlichung auf GitHub Pages
```

Umgebungen für Cloud-Sitzungen: Recherche braucht freien Zugriff auf Studien und Behördenseiten (Netzwerkzugang „Full“); Bauen und Texte kommen mit dem Standard („Trusted“) aus.

## Fahrplan

Sieben Etappen mit rund 45 Sitzungen; der Pilot mit zwei Themen zeigt, wie weit das Guthaben wirklich reicht. Die Kosten sind grobe Schätzungen aus dem Planungsdokument vom 17. Oktober 2026.

| Etappe | Sitzungen | Prompts | Ergebnis | Kosten grob |
|---|---|---|---|---|
| 0 Grundgerüst | 1 | S0 | Repository, CLAUDE.md, Leitfragen, Navigator übernommen, Generator | 5 $ |
| 1 Pilot: Schlaf und Medien | 4 | P1, P3 | Zwei geprüfte Themen, echte Kosten pro Sitzung gemessen | 30 $ |
| 2 Übrige 10 Themen | 20 | P1, P3 | Alle Themen recherchiert und geprüft | 120 $ |
| 3 Köpfe und Studien | 5 | P2 | Rund 25 Personen, je Sitzung 5 | 25 $ |
| 4 Zielgruppen-Texte | 12 | P4 | 67 Schwerpunktseiten in vier Fassungen | 30 $ |
| 5 Website | 1–3 | P5 | Seite online über GitHub Pages | 20 $ |
| 6 Diskussion öffnen | laufend | P6 | Korrekturen mit Änderungsprotokoll | je 1–2 $ |
| 7 Updates | 12 je Quartal | P7, P3 | Seite bleibt aktuell | 40 $ je Quartal |

Damit es günstig bleibt: Recherche und Faktencheck mit dem stärksten Modell, Texte und Bau mit einem schnelleren; eine Sitzung pro Thema, nicht pro Lebensphase; Subagenten für Teilfragen; nach jeder Etappe den Verbrauch prüfen.

## Entscheidungen vom 18. Oktober 2026

- **Name:** „Leben Lernen“ für die Seite; „Bildungswege Niedersachsen“ bleibt der Name des Navigators.
- **Hosting:** zuerst GitHub Pages aus diesem Repository, später als Unterseite der Firmenwebsite. Der Pfad ist im Generator konfigurierbar (`PATH_PREFIX`).
- **Keine KI-Funktionen auf der Seite:** Sie würden Kontingent der Nutzerinnen und Nutzer verbrauchen. Der KI-Wegfinder des Navigators entfällt; eine Beispielantwort zeigt, wie eine KI-Antwort aussähe. Die KI arbeitet im Hintergrund: Recherche, Faktencheck, Korrekturen.
- **Kommentare ja:** unter jeder Seite ein Kommentarfeld (giscus, GitHub Discussions) und bei jeder Aussage und Station ein Link „Korrektur vorschlagen“, der ein vorausgefülltes GitHub-Issue öffnet. Kommentare und Issues sind der Eingang für Prompt P6.
- **Zusätzliche Bausteine je Schwerpunktseite:** Hilft / Schadet nebeneinander, Kasten „Weltweit bewährt“, Checkliste zum Ausdrucken.
- **Ansprache (Vorschlag, noch zu bestätigen):** Eltern, Lehrkräfte, Erwachsene per Sie; Jugendliche per Du. Der Navigator duzt bisher durchgehend; ob er auf Sie wechselt, ist offen.
- **Lizenz:** noch festzulegen. Vorschlag: Code MIT, Inhalte CC BY 4.0.
