# Prompt-Bibliothek

Jeder Prompt ist der Start einer eigenen Sitzung mit Claude. Platzhalter stehen in geschweiften Klammern. Die Leitplanken (P0) stehen in `CLAUDE.md` und gelten automatisch für alle Sitzungen; sie müssen nicht mitgeschickt werden.

Jede Sitzung endet mit einem Pull Request und einer kurzen Zusammenfassung: was neu ist, was unsicher bleibt. Vor dem Pull Request muss `npm test` grün sein.

Reihenfolge je Thema: P1 → P3 → P4. Erst wenn P3 durch ist, dürfen Aussagen auf Seiten erscheinen.

## S0 Grundgerüst (erledigt am 18.10.2026)

> Lege das Grundgerüst für das Projekt „Leben Lernen“ an: Ordner, CLAUDE.md, Leitfragen je Thema, Datenschemata, Navigator als Datensatz und Seite, Generator mit Validierung, Veröffentlichung über GitHub Pages, README.

## P1 Themen-Recherche

> Recherchiere das Thema „{THEMA}“ nach den Regeln in CLAUDE.md.
> Leitfragen und relevante Altersgruppen: `docs/leitfragen/{nn}-{thema}.md`.
> Köpfe, die du einordnen sollst: siehe `daten/koepfe/_startliste.json`, Einträge zu diesem Thema.
>
> Vorgehen:
> 1. Erst offizielle Empfehlungen und Leitlinien (Deutschland, EU, WHO), dann Reviews und Meta-Analysen, dann wichtige Einzelstudien.
> 2. Prüfe, was seit {DATUM_MINUS_24_MONATE} neu ist: Studien, Gesetze, Empfehlungen.
> 3. Prüfe verbreitete Mythen zum Thema.
> 4. Suche je Altersgruppe mindestens ein evaluiertes Beispiel aus einem anderen Land für den Kasten „Weltweit bewährt“, mit Beleg und Einschätzung der Übertragbarkeit.
> 5. Ordne jede Aussage einer Wirkung zu: hilft, schadet, neutral oder einordnung.
> 6. Nutze Subagenten für Teilfragen, damit dein Kontext schlank bleibt.
>
> Ergebnis:
> - `berichte/{thema}.md`: Bericht mit höchstens 2.500 Wörtern: Kernaussagen, Verlauf über die Lebensspanne, Blick ins Gehirn, Kontroversen, weltweit bewährte Praxis, offene Fragen, Quellenliste.
> - `daten/themen/{thema}.json`: 3 bis 10 Aussagen je relevanter Altersgruppe nach `daten/schema-aussage.json`, status „recherchiert“.
> Führe `npm test` aus und öffne einen Pull Request „Recherche: {THEMA}“.

## P2 Köpfe und Studien

> Analysiere {PERSON} ({FACHGEBIET}) nach den Regeln in CLAUDE.md.
> 1. Person, Institution, Schwerpunkt in drei Sätzen.
> 2. Die 3 bis 5 wichtigsten Studien oder Bücher: Jahr, Design, Stichprobe, Ergebnis mit Effektgröße, DOI oder Link.
> 3. Wie wurden die Befunde wiederholt oder kritisiert? Wer kritisiert, mit welchen Argumenten?
> 4. Was folgt praktisch für Eltern, Lehrkräfte oder Ältere, und wo ist Vorsicht nötig?
> 5. Evidenzampel je Kernaussage.
> Schreibe `daten/koepfe/{person}.json` nach `daten/schema-kopf.json`, führe `npm test` aus und öffne einen Pull Request „Köpfe: {PERSON}“.

## P3 Faktencheck (immer eine neue Sitzung, nie die der Recherche)

> Du bist unabhängige Faktenprüferin und hast `daten/themen/{thema}.json` nicht geschrieben.
> Prüfe jede Aussage nach den Regeln in CLAUDE.md:
> 1. Existiert die Quelle? Öffne Link oder DOI. Stimmen Autoren, Jahr, Titel?
> 2. Sagt die Quelle, was behauptet wird? Halte die entscheidende Stelle in höchstens 15 Wörtern fest.
> 3. Passt die Ampel? Ist die Aussage über- oder untertrieben? Passt die Wirkung (hilft/schadet)?
> 4. Gibt es neuere oder bessere Quellen, die widersprechen?
> Setze je Aussage status auf „geprueft“ oder „korrigiert“ und trage Änderungen unter „aenderungen“ ein (ausloeser: „Faktencheck“). Unbelegte Aussagen bekommen den Status „zurueckgezogen“ mit Begründung; gelöscht wird nichts.
> Schreibe `berichte/{thema}-faktencheck.md` mit allem, was ein Mensch ansehen sollte, führe `npm test` aus und öffne einen Pull Request „Faktencheck: {THEMA}“.

## P4 Zielgruppen-Texte

> Erzeuge aus den geprüften Aussagen in `daten/themen/{thema}.json` die Bausteine für alle Schwerpunktseiten dieses Themas laut Matrix in `daten/themen.json`.
> Je Seite (Thema × Altersgruppe) nach `daten/schema-seite.json`:
> - je Zielgruppe (Eltern, Lehrkräfte, Jugendliche, Erwachsene): Kernaussage in einem Satz, 3 bis 5 Tipps, eine Checkliste mit höchstens 8 Punkten zum Abhaken; Tonfall laut `daten/phasen.json` → zielgruppen.
> - `hilft` und `schadet`: die IDs der passenden Aussagen, wichtigste zuerst.
> - `gehirn`: 2 bis 4 Sätze, nur Belegtes.
> - `weltweit`: 1 bis 3 evaluierte Beispiele aus anderen Ländern mit Beleg, Ampel und Übertragbarkeit.
> - `mythen`: Behauptung, Befund, ID der belegenden Aussage.
> - `wann_hilfe` und `hilfsangebote`, wo es um Gesundheit, Sucht oder psychische Belastung geht.
> Nutze nur Aussagen mit status „geprueft“ oder „korrigiert“ und erfinde nichts dazu.
> Schreibe `daten/seiten/{thema}.json`, führe `npm test` und `npm run build` aus, sieh dir eine der Seiten an und öffne einen Pull Request „Texte: {THEMA}“.

## P5 Website weiterentwickeln

> Der Generator liegt in `site/` (Eleventy) und erzeugt aus `daten/` die Website nach `public/`.
> Aufgabe: {WAS GENAU}.
> Regeln: Gestaltung wie bisher (Farben je Bildungsbereich, Schriften, Evidenzampel als Chips), barrierefrei, mobil zuerst, hell und dunkel. Keine KI-Funktionen auf der Seite. Jede Seite behält KI-Hinweis, Stand-Datum, Quellen, Kommentare und Änderungsprotokoll.
> Führe `npm test` und `npm run build` aus, prüfe das Ergebnis im Browser und öffne einen Pull Request „Website: {WAS}“.

## P6 Korrektur aus der Diskussion

> Zur Seite „{SEITE}“ gibt es diesen Kommentar (Discussion oder Issue {NUMMER}): „{KOMMENTAR}“. Betroffen ist Aussage {ID} in `daten/themen/{thema}.json` (oder Station {ID} in `daten/navigator.json`).
> 1. Ist das eine Tatsachenfrage, eine Meinung oder ein Erfahrungsbericht?
> 2. Prüfe die Tatsachenfrage mit neuer Recherche nach CLAUDE.md.
> 3. Entscheide: bleibt, präzisieren, korrigieren oder zurückziehen.
> 4. Ändere die Aussage, trage den Eintrag unter „aenderungen“ ein (Datum, was, warum, Quelle, ausloeser: „Kommentar {NUMMER}“) und ergänze `daten/protokoll.json`, wenn es mehr als eine Aussage betrifft.
> 5. Schlag eine freundliche Antwort an die kommentierende Person vor (höchstens 60 Wörter). Du postest sie nicht selbst.
> Persönliche Daten aus Kommentaren übernimmst du nie. Führe `npm test` aus und öffne einen Pull Request „Korrektur: {ID}“.

## P7 Vierteljährliches Update

> Prüfe das Thema „{THEMA}“ auf Neues seit {LETZTES_UPDATE}: neue Leitlinien, Meta-Analysen, große Studien, Gesetze und Verordnungen (Bund, Niedersachsen, EU).
> Nenne für jede Neuerung die betroffene Aussage (ID) und schlage vor: bestätigen, ergänzen oder korrigieren, jeweils mit Quelle.
> Ist nichts Relevantes neu, schreib das ausdrücklich in `berichte/{thema}-update-{DATUM}.md`.
> Änderungen an Aussagen gehen anschließend durch P3. Öffne einen Pull Request „Update: {THEMA}“.

## N1 Navigator pflegen

> Prüfe `daten/navigator.json` auf Neues seit {LETZTES_UPDATE}: Schulgesetz, Verordnungen (AVO-Sek I, BbS-VO), Hochschulgesetz, Kita-Gesetz, Bildungszeitgesetz in Niedersachsen.
> Ändere Stationen und Übergänge nur mit Quelle, ergänze `quellen` und `protokoll` in der Datei. Geplante, noch nicht beschlossene Änderungen kennzeichnest du als solche.
> Führe `npm test` und `npm run build` aus, prüfe die Karte im Browser und öffne einen Pull Request „Navigator: Update {DATUM}“.
