# Faktencheck: Medien, Gaming und KI

Stand: 18. Oktober 2026 · Prompt P3 · unabhängige Prüfung der Recherche (`berichte/medien-gaming-ki.md`).
Daten: `daten/themen/medien-gaming-ki.json`, 79 Aussagen.

KI-erstellt. Die Prüfung lief in sieben Teilmengen über Subagenten. Jede Quelle wurde dabei neu abgerufen: über Verlag, DOI, PubMed, Europe PMC, Crossref oder OpenAlex. Bei Verlagssperren wurde oft nur das Abstract gelesen, nicht der Volltext. `daten/protokoll.json` wurde nicht verändert.

## Zahlen

| | Anzahl |
|---|---|
| geprüft (unverändert bestätigt) | 23 |
| korrigiert | 56 |
| zurückgezogen | 0 |

**Ampel vorher → nachher:** stark 12 → 12 · mittel 34 → 32 · schwach 17 → 19 · umstritten 14 → 14 · mythos 2 → 2.
Ampelwechsel: **medien-ki-002** (mittel → schwach) und **medien-gaming-005** (mittel → schwach). Die Wirkung blieb bei allen Aussagen gleich.

Die meisten Korrekturen sind Präzisierungen: Zahlen, Population, Studiendesign, Kennzeichnung von Arbeitspapieren und fehlende Belege. Kein Befund hat sich ins Gegenteil verkehrt. Keine Quelle war erfunden.

## Die offenen Punkte der Recherche

- **Social Media und Psyche (medien-social-007):** „umstritten“ ist berechtigt. Orben & Przybylski 2019 sagen wörtlich „at most 0.4%“ (n = 355.358). Orben 2022 (Altersfenster), Riehm 2019 (RRR 1,60/1,78) und Tran (OR 2,73) wurden bestätigt. Bei medien-social-003 hieß es „Risiko“; es ist eine Odds Ratio, deshalb jetzt „Chance (Odds)“. Haidts Forderung stimmt mit seiner eigenen Quelle überein: kein Smartphone vor der High School (etwa 14), keine sozialen Medien vor 16. NASEM ist nun als Beleg ergänzt. In medien-social-006 stand vorher, NASEM halte Zugangssperren für nicht gerechtfertigt; das war nicht gedeckt. Jetzt stehen dort die tatsächlichen NASEM-Empfehlungen. Die Leopoldina-Position ist vollständiger: Verbot unter 13, Einwilligung der Eltern von 13 bis 15, Einschränkungen bis 17. Ein abgeschlossenes RCT zur Social-Media-Reduktion unter 18 gibt es weiterhin nicht.
- **Altersgrenzen und Handyverbote:** „umstritten“ bleibt bei medien-schule-003 und -004. Bestätigt sind Beland & Murphy (6,41 % SD) und Goodyear 2025 (kein Unterschied im Wohlbefinden). Abrahamsson 2026 (Norwegen) fand im Schnitt keinen Effekt, nur bei Mädchen Gewinne. Die Recherche hatte das als Gegenbefund dargestellt. Für Australien wurden die eSafety-Zahlen (52,4 % → 42,1 %) bestätigt, allerdings nur über die Pressemitteilung. Die gesetzliche Überprüfung ist nach s 239B bis Dezember 2027 fällig, nicht „um 2028“.
- **KI-Studien und Preprints:** Kosmyna 2025 ist weiterhin ein Preprint und als solcher gekennzeichnet (schwach). Gerlich ist ein Querschnitt (schwach). Das Weltbank-Papier zu Nigeria und die NBER-Papiere sind jetzt als Arbeitspapiere gekennzeichnet. **medien-ki-002** wurde auf „schwach“ gesenkt. Kestin 2025 umfasst zwei Unterrichtseinheiten mit einem Nachtest direkt danach, dazu kommt nur ein nicht begutachtetes Arbeitspapier. Die Effektspanne wurde auf 0,63–1,3 korrigiert.
- **Wang & Fan 2025:** Die Rückziehung ist bestätigt (Verlagsnotiz vom 22.04.2026, Crossref/Retraction Watch). Die DOI steht nur in medien-ki-009, und zwar als Warnbeispiel. Sie dient nirgends als positiver Beleg.
- **DGKJ-Leitlinie 027-075:** Die Richtwerte wurden in der Langfassung 2023 (Empfehlungen 25–27) und in der Elternfassung 06/2026 bestätigt: 0–3 bildschirmfrei, 3–6 höchstens 30 Minuten an einzelnen Tagen, 6–9 höchstens 30–45 Minuten, eigene Konsole nicht vor 9. Gültigkeit: Die Elternfassung Version 1.1 auf dem AWMF-Server nennt eine Verlängerung bis 14.07.2028. Die AWMF-Detailseite und die verlängerte Langfassung waren nicht abrufbar.
- **DGSMP:** Die Recherche sagte, die DGSMP trage die Leitlinie nicht mit. **Das war falsch.** In ihrer Stellungnahme vom 1. März 2023 lehnte sie den Entwurf ab („häufig lebensfremd“). Kapitel 9 der veröffentlichten Leitlinie hält dagegen fest: „Die DGSMP trägt die Leitlinie mit“. Sie fügt eine Anmerkung zur Verhältnisprävention und zur Gefahr der Stigmatisierung an. Korrigiert ist das in medien-bild-001 und -013. Einer der Subagenten hatte es zunächst falsch übernommen; die Hauptsitzung hat es gegen Kapitel 9 abgeglichen.
- **Mares & Pan 2013:** Die Meta-Analyse wurde laut UW-Madison im Auftrag von Sesame Workshop erstellt („Commissioned by Sesame Workshop“). Das steht jetzt als `finanzierung` in medien-bild-009. Den Volltext mit der Finanzierungsangabe konnten wir nicht öffnen.
- **ACTIVE-Studie (medien-erw-011):** „umstritten“ bleibt. Bestätigt sind HR 0,71 nach 10 Jahren sowie nach 20 Jahren HR 0,75 mit und HR 1,01 ohne Auffrischung. Neu eingetragen:
  - Die Messung hat gewechselt: Medicare-Diagnosen für nur 2.021 der 2.802 Teilnehmenden.
  - Die Reanalyse von Dickens 2026 findet nach Bonferroni-Korrektur keinen signifikanten Effekt mehr.
  - Interessenkonflikte: Ball (Posit Science: Beratung, Aktien, Beirat), Edwards (früher Visual Awareness/Posit Science) und Unverzagt (Software-Lizenzen).
- **Länderregeln:** Hessen (§ 69 Abs. 7 HSchG, Ministeriums-FAQ) und Baden-Württemberg (§ 23 Abs. 2b SchG) sind über Primärquellen bestätigt. **Bayern war veraltet:** Art. 56 Abs. 5 BayEUG schließt laut gesetze-bayern.de („Text gilt ab 02.10.2026“) die Freigabe für die Klassen 1–7 aus. Die Ausweitung ist also kein Entwurf mehr, sondern gilt. Für Bremen, Schleswig-Holstein, Thüringen und Sachsen fand sich keine Primärquelle. Sie stehen jetzt ohne Einzelangaben nur als „über Sekundärquellen erfasst“ da.
- **Rechtliches, „geplant“:** Folgendes ist korrekt als geplant oder nicht beschlossen gekennzeichnet:
  - der EU KIDS Act (Verordnungsvorschlag vom 17.09.2026, Konsultation bis 03.12.2026),
  - der Digital Fairness Act,
  - die Gesetzgebung von Ministerin Prien (kein Entwurf am 18.10.2026),
  - die Empfehlungen der Expertenkommission,
  - der Prüfauftrag des Landtags Niedersachsen (Drs. 19/11037, Beschluss 24.06.2026, Punkt 4).

  Bei medien-bild-004 heißt es jetzt „empfohlen, nicht beschlossen“ statt „geplant“, denn es gibt kein belegtes Vorhaben.
- **Digital-Omnibus-VO (EU) 2026/1744:** Sie existiert; der Text wurde auf EUR-Lex geöffnet. Beschlossen am 8.7.2026, im Amtsblatt am 24.7.2026, in Kraft seit 27.7.2026. Art. 4 ist abgeschwächt: Anbieter müssen KI-Kompetenz nur noch „unterstützen“. Die Hochrisikopflichten nach Anhang III gelten ab 2.12.2027. Präzisiert in medien-ki-013.
- **Phasen:** Geändert nur, wo die Zuordnung klar irreführend war:
  - medien-bild-012 (miniKIM: 2–5 Jahre, deshalb P1/P2),
  - medien-bild-016 (Studie mit 4- bis 17-Jährigen, deshalb P2–P5),
  - medien-ki-002 (+P7, Studierende),
  - medien-erw-008 und -009 (+P9),
  - medien-social-001, -003, -004 (erweitert).

  Weitere Kandidaten sind nur notiert, siehe unten (gaming-005, -007, -014, ki-001, ki-003).

## Wichtigste Korrekturen (Auswahl)

- **medien-social-003:** Odds Ratio statt „Risiko“. Die unbelegte Behauptung „meist Querschnitt“ ist entfernt.
- **medien-social-009:** Der Vergleich „in Deutschland ist der Anteil höher“ ist gestrichen, weil HBSC und DAK unterschiedlich messen.
- **medien-ki-011:** Die 74 % gelten für Jugendliche, die KI nutzen, nicht für alle. Für AIS.chat ist jetzt ein Beleg ergänzt (Kultusministerium, 13.02.2026).
- **medien-ki-012:** „Fachleute raten ab“ heißt jetzt „eine US-Kinderschutzorganisation (Common Sense Media) rät ab“. Character.AI hat ein Ende „angekündigt“, nicht „beendet“.
- **medien-gaming-004:** Das Verhältnis 2,5 : 1 betrifft Männer zu Frauen, nicht Jugendliche zu Erwachsenen. Das weite Konfidenzintervall der 1,96 % ist jetzt genannt.
- **medien-gaming-006:** Die Langzeitstudien messen Aggression, nicht Straftaten; das ist jetzt klargestellt. Das irreführende APA-Kernzitat ist ersetzt.
- **medien-gaming-007:** Beide Seiten der Kontroverse sind belegt (Hilgard 2017, Prescott 2018, APA 2020).
- **medien-gaming-013:** Ein falsch zugeordneter APA-Verweis ist entfernt. Ergänzt ist der schlechtere Wert in einer Gedächtnisaufgabe (Neufassung nach Rückzug bei Chaarani).
- **medien-schule-009:** Die Aussage „mehr Sitzungen wirken besser“ gilt nur für Jeong 2012. Cho 2025 ergibt r = 0,17.
- **medien-schule-011:** Gesunken ist der ICILS-Mittelwert (518 → 502), nicht der Anteil mit geringen Kompetenzen (40,8 %).
- **medien-erw-003:** Allcott 2020 hat 1.661 Personen ausgewertet, nicht 2.743.
- **medien-erw-008:** Finanzierung durch Google Jigsaw eingetragen.
- **medien-erw-010:** Interessenkonflikt Valenzuela (Lampit 2014) eingetragen.
- **medien-erw-013:** Die Forderung stammt von der Altersberichtskommission. Die Bundesregierung kündigt nur eine Prüfung an.

## Was ein Mensch entscheiden sollte

1. **Ampel-Ermessensfragen:**
   - medien-gaming-005 (DAK-Längsschnitt, jetzt schwach; mittel wäre vertretbar).
   - medien-gaming-006 und medien-erw-009 („mythos“: Gewalttaten durch Spiele sind eher nicht nachgewiesen als mehrfach widerlegt; „digitale Demenz“ bei Älteren stützt sich vor allem auf eine Meta-Analyse aus Beobachtungsdaten).
   - medien-bild-017 („umstritten“, obwohl ein Experte einer Übersichtsarbeit gegenübersteht).
   - medien-schule-004 und -008 (eher schwach?), medien-schule-005 (eher mittel?).
   - medien-social-012 und medien-erw-012 (umstritten?).
   - medien-ki-011 („stark“ für eine Einordnung aus Statistik und KMK ist großzügig).
2. **Wirkung bei medien-erw-011:** Passt „hilft“ zu einer umstrittenen Ampel, oder ist „einordnung“ besser?
3. **Regel für studientyp:** Sie fehlt bei gemischten Aussagen, in denen eine Leitlinie nur die Empfehlung stützt und eine Kohorte den Befund (z. B. medien-bild-010).
4. **Bericht der Recherche:** In `berichte/medien-gaming-ki.md` stehen noch die alten Angaben zur DGSMP („Stellungnahme 2023 dagegen“) und zu Bayern („Gesetzentwurf, geplant“). Der Recherchebericht bleibt als historisches Dokument unverändert. Maßgeblich sind die Daten und dieser Bericht.
5. **Die Omnibus-VO bringt ab 2.12.2026 neue Verbote in Art. 5**, etwa sexualisierte Deepfakes ohne Einwilligung. Das ist eventuell für eine spätere Jugendschutz-Aussage relevant.

## Alle Aussagen

| ID | Status | Ampel | Befund |
|---|---|---|---|
| medien-bild-001 | korrigiert | stark | Richtwert 0–3 Jahre in Langfassung, Elternfassung, BIÖG und WHO bestätigt. Falsch war die Gegenstimme, die DGSMP habe die Leitlinie nicht mitgetragen: Sie lehnte im März 2023 den Entwurf ab, trägt die veröffentlichte Fassung aber mit Anmerkung mit. Gültigkeit (verlängert bis 14.07.2028) ergänzt. |
| medien-bild-002 | geprueft | mittel | Meta-Analyse Strouse & Samson 2021 bestätigt: 59 Berichte, 0–6 Jahre, Defizit etwa eine halbe Standardabweichung, kleiner mit dem Alter, Hinweis auf Publikationsverzerrung. AAP-Zitat wörtlich bestätigt. |
| medien-bild-003 | geprueft | mittel | Effektgrößen Madigan et al. 2020 (42 Studien, 18.905 Kinder; r = −0,14, −0,19, +0,17) wörtlich im Abstract bestätigt. Kirkorian 2009 (Laborexperiment) und Hutton 2020 (Querschnitt, n = 47, DTI) korrekt wiedergegeben und gekennzeichnet. |
| medien-bild-004 | korrigiert | mittel | Effektgrößen Toledo-Vargas 2025 (21 Studien, 14.900 Teilnehmende, r = −0,14/0,15/−0,10/0,23) bestätigt; Vélez 2026 und McDaniel & Radesky 2018 korrekt. HE 2 der Expertenkommission bestätigt; Rechtslage von „geplant“ auf „empfohlen, nicht beschlossen“ präzisiert. |
| medien-bild-005 | geprueft | mittel | Madigan 2019 (2.441 Kinder, β = −0,06/−0,08), Vasconcellos 2025 (117 Längsschnittstudien, b = 0,06 in beide Richtungen, stärker bei Gaming) und Eirich 2022 (87 Studien, r = 0,11/0,07, I² = 87,8 %) im Abstract bestätigt. |
| medien-bild-006 | korrigiert | mittel | Effektgröße der Meta-Analyse 2026 korrigiert (g = 0,16 statt 0,26; 43 von 65 Studien gepoolt). Wu 2025 und Mendelsohn 2011 bestätigt. |
| medien-bild-007 | korrigiert | stark | Richtwert 3–6 Jahre (höchstens 30 Minuten an einzelnen Tagen, nicht ohne Eltern; Konsens) in der Langfassung bestätigt, ebenso BIÖG (30 Min. täglich), WHO (≤ 1 Std.) und AAP (<1 Std. als mögliche Spanne). Nur Quellen ergänzt. |
| medien-bild-008 | geprueft | mittel | Madigan 2020: Bildungsprogramme r = 0,13, Mitschauen r = 0,16 bestätigt. AAP 2026 betont gemeinsame Nutzung; passendes Kernzitat gesetzt. |
| medien-bild-009 | korrigiert | mittel | Mares & Pan 2013 (24 Studien, >10.000 Kinder, 15 Länder) und Kearney & Levine 2019 bestätigt. Beauftragung durch Sesame Workshop ergänzt. |
| medien-bild-010 | korrigiert | schwach | Radesky 2023 (422 Kinder, r = 0,20 bei Jungen, beidseitig bei hoher Surgency) und Leitlinien-Empfehlung 2 wörtlich bestätigt. Konok 2024 als zweite Kohorte und AAP 2026 als Beleg der Gegenstimme ergänzt. Ampel „schwach“ bleibt: zwei kleine Kohorten mit Elternangaben. |
| medien-bild-011 | geprueft | mittel | Furenes, Kucirkova & Bus 2021 bestätigt: 39 Studien, 1.812 Kinder (1–8 Jahre), schlechteres Verständnis bei rein digitalisierten Büchern, Vorteil erwachsener Begleitung, Vorteil geschichtsnaher digitaler Extras. Ampel „mittel“ passt (eine Meta-Analyse). |
| medien-bild-012 | korrigiert | mittel | Alle Zahlen der miniKIM-Pressemitteilung (23 %, 44 %, jedes fünfte Kind mit Tablet, ein Viertel zur Beschäftigung, Bilderbuch 27 %, 600 Eltern) bestätigt. Phasen korrigiert, da die Studie 2–5 Jahre abdeckt. |
| medien-bild-013 | korrigiert | stark | Leitlinienwerte gegen die Elternfassung 2026-06 geprüft: 6–9 Jahre höchstens 30–45 Min an einzelnen Tagen mit Erwachsenem, 9–12 Jahre 45–60 Min, eigene Konsole nicht vor neun, Internet nicht unter 9 Jahren – alles bestätigt. BIÖG (7–11 Jahre max. 1 Stunde, Stand 11/2025) und AAP 2026 (1–2 Stunden oder mehr) bestätigt; DGSMP-Kritik mit Quelle belegt. |
| medien-bild-014 | geprueft | mittel | KIM-2024-Pressemitteilung bestätigt: 1.225 Kinder, 54 % täglich online (+7 Punkte), 8- bis 9-Jährige 23 % → 40 %, 46 % eigenes Smartphone, 55 % ohne Steuerung der Nutzungszeit. Tipp „Smartphone nicht vor 12“ deckt sich mit der Elternfassung der Leitlinie. |
| medien-bild-015 | geprueft | mittel | Delgado et al. 2018 bestätigt: 54 Studien, 171.055 Teilnehmende, g = −0,21, größerer Vorteil bei Zeitdruck und Sachtexten, nicht bei reinen Erzähltexten. Furenes 2021 stützt den Befund für Kinder. |
| medien-bild-016 | korrigiert | schwach | Schmidt-Persson et al. 2024 bestätigt (Cluster-RCT, Sekundäranalyse, 2 Wochen, d = 0,53, Elternangaben im SDQ). Phasen auf 4–17 Jahre erweitert, Erklärung präzisiert. Ampel „schwach“ passt (eine kleine, kurze Studie). |
| medien-bild-017 | korrigiert | umstritten | Appel & Schreiner 2014 über OpenAlex-Abstract geprüft, Spitzer 2015 und Replik 2015 über Crossref-Metadaten (Titel, Autoren, Heft 4/2015) bestätigt. Erklärung um weitere Befunde der Übersicht ergänzt und die Bewertung als die der Autoren gekennzeichnet. |
| medien-social-001 | korrigiert | schwach | Orben et al. 2022 (Nat Commun) geöffnet: Stichproben, Altersfenster (w 11–13 und 19, m 14–15 und 19) und kleine Effekte bestätigt. Kausale Formulierung entschärft, Phasen an die Altersfenster angepasst. |
| medien-social-002 | korrigiert | schwach | Sherman et al. 2016 und Maza et al. 2023 geöffnet; Befunde, β-Werte (0,09–0,19) und Bildgebungs-Kennzeichnung korrekt. Gegenstimme präzisiert: Maza hat psychische Gesundheit nicht untersucht, statt sie als Nullbefund darzustellen. |
| medien-social-003 | korrigiert | mittel | Tran et al. (online 2021, Heft 2023) und Kowalski et al. 2014 geöffnet: OR 2,73 (95 % KI 2,25–3,31), 17 Studien, 79.202 Jugendliche bestätigt. Odds-Ratio korrekt als Chance statt Risiko formuliert, nicht belegte Designangabe entfernt, Phasen auf 10–19 Jahre erweitert. |
| medien-social-004 | korrigiert | mittel | Williford et al. 2013 (KiVa, n = 18.412) und Shi et al. 2025 (44 RCTs, 65.707 Teilnehmende, g −0,15/−0,11, ≥ 5 Stunden wirksamer, geringe Beweissicherheit) geöffnet; Inhalt bestätigt. Nur Phasen erweitert. |
| medien-social-005 | geprueft | stark | KIDS-Act-FAQ und BIK-Meldung geöffnet: Vorschlag vom 17.09.2026, Verordnungsvorschlag, Parlament und Rat müssen zustimmen, Konsultation bis 03.12.2026; Altersstufen, 1 h/Tag, 6 % Bußgeld bestätigt. DSA-Leitlinien vom 14.07.2025 (freiwillig) und EP-Entschließung 26.11.2025 (483/92/86, nicht bindend) bestätigt. Alles nicht Beschlossene ist als geplant gekennzeichnet. |
| medien-social-006 | korrigiert | umstritten | Leopoldina-Diskussionspapier Nr. 40 (Volltext), BMBFSFJ- und Ärzteblatt-Meldungen sowie NASEM-Highlights geöffnet. Empfehlungen (13 Jahre, 56 Empfehlungen, Handys bis Klasse 7, Alternative risikobasiert) bestätigt. NASEM-Gegenstimme auf das Belegte reduziert, Elternzustimmung 13–15 und Abschlussbericht vom 11.09.2026 ergänzt; Gesetzgebung bleibt als geplant gekennzeichnet. |
| medien-social-007 | korrigiert | umstritten | Twenge et al. 2018 (n = 506.820), Orben & Przybylski 2019 („explaining at most 0.4% of the variation in well-being“, n = 355.358), Odgers 2024 (Nature-Buchkritik) und Haidts „Four New Norms“ geöffnet; Darstellung fair und korrekt. „Umstritten“ bestätigt; NASEM ergänzt. |
| medien-social-008 | korrigiert | schwach | Riehm et al. 2019 geöffnet: n = 6.595, 12–15 Jahre, adjustierte RRR 1,60 (3–6 h) und 1,78 (> 6 h) für internalisierende Probleme, kein klarer Zusammenhang bei externalisierenden Problemen bestätigt. Nur Datenzeitraum korrigiert. |
| medien-social-009 | korrigiert | mittel | WHO-HBSC (7 % → 11 %, Mädchen 13 %, Jungen 9 %, ~280.000, 44 Länder und Regionen) und DAK/UKE 2026 (21,5 % riskant, 6,6 % pathologisch, ~1.000 Eltern-Kind-Paare) bestätigt. Unzulässigen Ländervergleich in der Aussage entfernt. |
| medien-social-010 | korrigiert | schwach | eSafety-Kurzbericht (31.07.2026) geöffnet: 52,4 % → 42,1 % Konten, 85,9 % → 81,5 % Nutzung, 43,3 % → 36,3 % ausgeschlossen, „too early“ bestätigt. Gesetzestext geöffnet; Frist der gesetzlichen Überprüfung korrigiert. |
| medien-social-011 | geprueft | schwach | Gordon et al. 2021 geöffnet: Cluster-RCT, n = 892, 11–15 Jahre, 8 Schulen, 4 Wochen; bescheidene Effekte bei Mädchen nach 6 Monaten (Diätverhalten, depressive Symptome), kaum bei Jungen bestätigt. |
| medien-social-012 | korrigiert | mittel | Burnell et al. 2025 (32 RCTs, g = 0,17, nur Erwachsene), Hunt et al. 2018 und Thimm-Kaiser & Keyes 2025 geöffnet und bestätigt. May et al. 2025 und das laufende IRL-Register ergänzt. Ampel „mittel“ bleibt. |
| medien-social-013 | geprueft | mittel | JIM-Pressemitteilung 4/2025 geöffnet: 1.200 Befragte 12–19 Jahre, knapp vier Stunden, unter 3 h (12–13) bis über 4,5 h (18–19), 68 %, rund 30 % müde, WhatsApp vor Instagram, Snapchat, TikTok bestätigt. |
| medien-gaming-001 | korrigiert | umstritten | Bediou 2018 und Sala 2018 bestätigt (Zahlen g = 0,55/0,34, 30 % Bias). Neuere Meta-Analyse Bediou 2023 ergänzt; sie fand keine signifikanten Moderatoren, die Bereichsspezifik (Aufmerksamkeit, räumliches Denken) stützt sich damit vor allem auf 2018. Ampel umstritten bleibt. |
| medien-gaming-002 | geprueft | mittel | Beide Studien geprüft: 38.935 Spielende, sechs Wochen, sieben Publisher; kleiner positiver Zusammenhang 2021. Interessenkonflikt-Erklärung (keine) im Volltext bestätigt. Keine Änderung. |
| medien-gaming-003 | korrigiert | stark | WHO-FAQ (drei Merkmale, 12 Monate, kleiner Anteil), ICD-11-Inkrafttreten und BfArM-Stand (ICD-10-GM gilt weiter, kein Termin) bestätigt. Gehirn-Text präzisiert, weil d = 0,84 aus einer Meta-Analyse über mehrere Verhaltenssüchte stammt. |
| medien-gaming-004 | korrigiert | mittel | Stevens et al. bestätigt (3,05 %, 1,96 %, 77 %, 2,5:1); Jahr 2021 (Print, online 2020). Text präzisiert: sehr weiter Unsicherheitsbereich der 1,96 %, 2,5:1 betrifft Männer zu Frauen. Meta-Analyse Kim 2022 ergänzt, die die Größenordnung bestätigt. |
| medien-gaming-005 | korrigiert | mittel → **schwach** | Alle Zahlen der DAK-Studie 2026 bestätigt (4,5 %, 6,6 %, > 700.000, fast dreimal, 89/105 Minuten, keine Altersunterschiede, nicht signifikanter Anstieg). Ampel auf schwach gesenkt, weil eine einzelne Fragebogen-Studie mit rund 1.000 Familien vorliegt. |
| medien-gaming-006 | korrigiert | mythos | Drummond 2020 (r = 0,059; 0,012) und APA-Resolution Feb. 2020 bestätigt. Ampel „mythos“ beibehalten, weil die Aussage auf schwere Gewalt zielt; Erklärung macht nun klar, dass die Langzeitstudien Aggression messen und die APA die Gewalt-Zuschreibung ablehnt. |
| medien-gaming-007 | korrigiert | umstritten | Anderson 2010, Mathur & VanderWeele 2019 und Drummond 2020 bestätigt. Für Ausgewogenheit Hilgard 2017 (Bias-Kritik) und Prescott 2018 (kleiner Effekt in Langzeitstudien) sowie APA 2020 ergänzt. Ampel „umstritten“ ist fair: Prescott und Drummond finden ähnlich kleine Effekte, deuten sie aber gegensätzlich. |
| medien-gaming-008 | korrigiert | mittel | Spicer 2021 (12/13, r = 0,27, r = 0,40 aus sechs Befragungen) und Zendle & Cairns 2018 (n = 7.422, η² 0,054 vs. 0,004) bestätigt. Meta-Analyse Garea 2021 ergänzt (r = 0,26). Ampel mittel bleibt, da alle Daten Querschnitte sind. |
| medien-gaming-009 | korrigiert | stark | § 10b Abs. 3 JuSchG, Bayerische Drucksache 19/3110 (rund 30 %, USK-Regeln seit Januar 2023), EP-Entschließung 26.11.2025 (nicht legislativ, 483 Ja) und DFA „in Vorbereitung“ bestätigt. 30-%-Angabe präzisiert; § 14 JuSchG und ein USK-Prüftitel als Beleg für den Zusatzhinweis ergänzt. |
| medien-gaming-012 | korrigiert | stark | Zeitgrenzen, Konsolen-Empfehlung (nicht vor 9 Jahren), „doppelt so viel Zeit“ und Verlängerung bis 14.07.2028 in der Elternversion bestätigt. Kleine Präzisierung: 16–18 Jahre nur als Orientierungswert. |
| medien-gaming-013 | korrigiert | schwach | Originalartikel und Rückzugs-/Ersatzmitteilung geprüft: Kernbefund bleibt, aber Vielspielende zeigten mehr Aufmerksamkeits-, Depressions- und ADHS-Werte und schlechtere List-Sorting-Leistung. Fehlzuordnung der APA-Aussage in den Gegenstimmen entfernt. |
| medien-gaming-014 | korrigiert | schwach | Alle Zahlen bestätigt (33 Schulen, 422 Jugendliche, 39,8 % vs. 27,7 %, d = 0,67, keine signifikante Inzidenzsenkung). Ergänzt: Durchführung durch Psychologinnen und Psychologen, ungleiche Ausgangswerte. Ampel schwach (Einzel-RCT) passt. |
| medien-schule-001 | korrigiert | stark | Handreichung (12.11.2025), Pflicht zu Schulregeln und Landtagsbeschluss 19/11037 (24.06.2026, Prüfauftrag Primarbereich korrekt als geplant) bestätigt. Bayern war veraltet: Der geltende Text von Art. 56 Abs. 5 BayEUG schließt die Freigabe bis Jahrgangsstufe 7 aus; Primärquelle ergänzt. |
| medien-schule-002 | korrigiert | schwach | Handreichung, Leopoldina-Zitat und niederländisches Monitoring bestätigt; Ampel schwach passt. Nur die 23,1 % wurden als Anteil der Schulen präzisiert. |
| medien-schule-003 | korrigiert | umstritten | Effektgrößen Beland & Murphy (6,41 % bzw. 14,23 % SD) und Kessel (keine Wirkung) bestätigt; „umstritten“ ist berechtigt. d = 0,16 bezieht sich auf Leistung und Soziales zusammen; norwegische Studie und Kennzeichnung des NBER-Arbeitspapiers ergänzt. |
| medien-schule-004 | korrigiert | umstritten | Zahlen aus SMART Schools (n = 1.227, −0,48, −0,67 h) bestätigt. „Umstritten“ bleibt vertretbar, weil Durchschnitt null ist, aber Untergruppen (Mädchen) profitieren und Leopoldina/Rapid Review anders werten; Norwegen-Befund präzisiert. |
| medien-schule-005 | korrigiert | schwach | Mobbing-Befunde aus Norwegen, Spanien und Rapid Review bestätigt; niederländische Angaben präzisiert und begutachtete Fassung der Norwegen-Studie ergänzt. Ampel schwach bleibt. |
| medien-schule-006 | korrigiert | umstritten | Parry (k = 56, n = 7.093, nur Arbeitsgedächtnis) und fehlgeschlagene Replikation bestätigt. Zweite Meta-Analyse (Böttger et al. 2023, g = −0,14) ergänzt; beide finden kleine Gedächtnisnachteile. „Umstritten“ bleibt berechtigt. |
| medien-schule-007 | korrigiert | mittel | UNESCO-Artikel (Update 24.01.2025) mit Kernzitat, 14-Länder-Studie und 79 Systemen (40 %) bestätigt; Wortlaut zu Verboten präzisiert. |
| medien-schule-008 | korrigiert | umstritten | BIÖG-Richtwerte (kein Handy vor 9, keine unbeaufsichtigte Internetnutzung vor 12, Smartphone ca. 11–12, vorher einfaches Handy) und Gegenstudien bestätigt; nur Jahr der klicksafe-Seite korrigiert. |
| medien-schule-009 | korrigiert | stark | Jeong 2012 (51 Programme, d = 0,37) und Cho 2025 (160 Programme, r = 0,17 ≈ d 0,35) bestätigt; Ampel stark passt. Zuordnung der Sitzungszahl korrigiert, weil Cho keinen klaren Dosis-Effekt fand. |
| medien-schule-010 | korrigiert | mittel | Huang (49 Experimente, d = 0,60) und Roozenbeek 2022 (sechs RCTs) bestätigt. Lateral-Reading-Studie nur über Zusammenfassung erreichbar; Stundenzahl daher entschärft. |
| medien-schule-011 | korrigiert | mittel | ICILS-2023-Zahlen (502/476, 523/518, 40,8 %) in der KMK-Mitteilung vom 12.11.2024 bestätigt; 41 % ist korrekt gerundet. Aussage präzisiert, weil der Mittelwert sank, nicht der Anteil. |
| medien-ki-001 | geprueft | schwach | Bastani 2025 (PNAS) im Volltext geprüft: knapp 1.000 Lernende, Türkei, +48 % Übung (GPT Base), −17 % in der Prüfung ohne KI gegenüber Kontrolle, GPT Tutor mildert den Schaden weitgehend. Fan 2024 (117 Studierende, bessere Aufsätze, kein höherer Wissenszuwachs) bestätigt. |
| medien-ki-002 | korrigiert | mittel → **schwach** | Kestin 2025 (Sci Rep) und Weltbank-Arbeitspapier 11125 im Volltext geprüft; Zahlen stimmen. Ampel auf schwach gesenkt (eine kurze RCT plus Arbeitspapier), Erklärung präzisiert, P7 ergänzt. |
| medien-ki-003 | korrigiert | mittel | Kulik & Fletcher 2016 (Median 0,66 aus 50 Studien), VanLehn 2011 (0,76 bzw. 0,79) und die KMK-Empfehlung (ITS-Studienlage systematisieren; Forschungslage zu generativer KI unzureichend) bestätigt. Nur „mittlerer Effekt“ zu „Median“ präzisiert. |
| medien-ki-004 | geprueft | stark | Rowland 2014 im Volltext geprüft: k = 159, g = 0,50 (KI 0,42–0,58), Abruf stärker als Wiedererkennen. Adesope 2017 bestätigt Vorteil von Übungstests. Ampel stark passt. |
| medien-ki-005 | geprueft | umstritten | Sparrow 2011, Camerer 2018 (21 Replikationen, Sparrow-Experiment 1 nicht repliziert) und Sparrows Antwort (abweichendes Stroop-Verfahren) geprüft. Darstellung und Ampel umstritten passen. |
| medien-ki-006 | korrigiert | schwach | Kosmyna 2025 (arXiv, v2 Dez. 2025, weiterhin nicht begutachtet) und Kommentar Stankovic et al. (arXiv, 29.12.2025) geprüft: 54 Personen, 18 in Sitzung 4, Zitat wörtlich. Preprint im Aussagetext erkennbar, Ampel schwach passt. Beleg für die Aussage der Erstautorin ergänzt. |
| medien-ki-007 | geprueft | schwach | Lee et al. 2025 (CHI; 319 Personen, 936 Beispiele, Zitat wörtlich) und Gerlich 2025 (666 Personen, negativer Zusammenhang, Jüngere stärker) geprüft; Korrektur 10.3390/soc15090252 betrifft laut Metadaten einen Tabellenfehler. Ampel schwach, Querschnitt passt. |
| medien-ki-008 | geprueft | schwach | Brynjolfsson, Li, Raymond 2025 (QJE) geprüft: 5.172 Beschäftigte, +15 % gelöste Anfragen pro Stunde, Gewinne vor allem für weniger Erfahrene, kleine Qualitätsverluste bei den Erfahrensten; Zitat wörtlich. |
| medien-ki-009 | geprueft | umstritten | Rückziehung selbst geprüft: Crossref (update-to: retraction, Quelle Verlag und Retraction Watch, Datensatz 70475) und Verlagsseite (Retraction Note vom 22.04.2026, Grund: Unstimmigkeiten in der Meta-Analyse; Autoren antworteten nicht). Originalzahlen (51 Studien, g = 0,867) bestätigt. In medien-gaming-ki.json dient die Arbeit nirgends als positiver Beleg; DOI nur in dieser Aussage. |
| medien-ki-010 | geprueft | umstritten | SWK-Impulspapier (verabschiedet Januar 2024; Verzicht in Grundschule und früher Sek I; ab Jahrgangsstufe 8 regelmäßiger Einsatz zu erwägen) und KMK-Empfehlung vom 10.10.2024 („erörterungsbedürftig“) wörtlich bestätigt. Keine neuere KMK-Position zur Grundschule gefunden. |
| medien-ki-011 | korrigiert | stark | JIM 2025 (84 %, 2024: 57 %; 74 %; 57 %) und KMK 2024 (Abschaffung oder Weiterentwicklung von Prüfungsformaten; Prozessorientierung) wörtlich bestätigt. Bezugsgröße der 74 % korrigiert (KI-Nutzende) und Quelle für AIS.chat Niedersachsen ergänzt. |
| medien-ki-012 | korrigiert | schwach | Common-Sense-Bericht (1.060 Jugendliche, 72 %/52 %, 33 %, 34 %, Empfehlung unter 18) und UN News (Altersgrenze 13 erwägen) wörtlich geprüft, Art. 5 Abs. 1 b KI-VO auf EUR-Lex bestätigt. Herkunft der Empfehlung, eine Formulierung und die Character.AI-Angabe präzisiert. |
| medien-ki-013 | korrigiert | stark | Verordnung (EU) 2026/1744 auf EUR-Lex geöffnet: existiert (8.7.2026, ABl. L 24.7.2026). Sie fasst Art. 4 neu (Maßnahmen zur Unterstützung, kein garantiertes Niveau) und verschiebt Anhang-III-Hochrisikopflichten (u. a. Bildung) auf 2.12.2027. Originaltext Art. 4, Art. 5 und Anhang III Nr. 3 KI-VO bestätigt; OECD/EU-Rahmen (vier Bereiche, Beitrag zu PISA 2029 MAIL) und UNESCO (12 Kompetenzen, 2024) bestätigt. |
| medien-erw-001 | geprueft | mittel | Zahlen (24 Länder, 83 Stichproben, 33.831 Personen, 15–35 Jahre, Studien 2014–2020, Länderrang) am Abstract bestätigt (Verlagsseite gesperrt, Abstract über OSF-Preprint-Eintrag und Crossref-Metadaten geprüft). |
| medien-erw-002 | korrigiert | mittel | r = −0,12, 45 Studien, stärkere Effekte bei problematischer Nutzung und Multitasking im Unterricht bestätigt. Unbelegte Aussage zum Querschnitts-Anteil entschärft. |
| medien-erw-003 | korrigiert | mittel | Effektgrößen 0,09/−0,19/−0,16 SD und Lambert-Daten bestätigt; Stichprobengröße bei Allcott et al. korrigiert (1.661 ausgewertet statt 2.743 angeworben). |
| medien-erw-004 | geprueft | mittel | Sechs RCTs (n = 6.464) und YouTube-Feldstudie (n = 22.632), fünf Techniken und Effekte über politische Lager bestätigt; Jigsaw-Affiliation von Goldberg bestätigt. |
| medien-erw-005 | geprueft | mittel | 21 Studien, 14.900 Kinder, r-Werte (−0,14; 0,13; 0,15; 0,23) und Scoping-Review-Befund (Versinken stärker als kurze Unterbrechung) bestätigt. |
| medien-erw-006 | geprueft | umstritten | Parry & Le Roux: 118 Messungen, z = 0,09 (Leistung), z = 0,20 (Selbstauskunft), 72,9 % Studierendenstichproben bestätigt; Uncapher & Wagner und Abrahamse et al. 2026 passen zur Darstellung. |
| medien-erw-007 | korrigiert | mittel | 63 %, 16 %, 27 %, 49 % und EU-Ziel 80 % im PDF bestätigt; die 16 % beziehen sich auf arbeitgeberfinanzierte digitale Weiterbildung – Text präzisiert. |
| medien-erw-008 | korrigiert | mittel | 13 Befragungen, 19.735 Personen, 12 Länder, d ≈ 0,08–0,38, 50- vs. 20-Sekunden-Videos bestätigt. Phase P9 ergänzt, Finanzierung durch Google Jigsaw präzisiert. |
| medien-erw-009 | korrigiert | mythos | OR 0,42 (0,35–0,52), HR 0,74, 57 Studien, 411.430 Personen und HR 0,57 bei Cho et al. bestätigt; Slegers-RCT ohne kognitiven Effekt bestätigt. Ampel „mythos“ beibehalten: Die These der digitalen Demenz bei Älteren wird von einer großen Meta-Analyse (136 Studien, auch Längsschnitte, robust in den besten Studien), Kohortendaten und einem RCT ohne Schaden übereinstimmend nicht gestützt. |
| medien-erw-010 | korrigiert | mittel | g = 0,22 (52 RCTs, 4.885 Personen) und Moderatoren bestätigt; Aufmerksamkeit ergänzt, Interessenkonflikt Valenzuela ergänzt. Simons et al. 2016 inkl. der offenen Briefe (70+ vs. 133) bestätigt. |
| medien-erw-011 | korrigiert | umstritten | HR 0,71 (10 J.) und HR 0,75/1,01 (20 J.) bestätigt. Interessenkonflikte (Ball: Beraterin, Aktien, Beirat Posit Science; Edwards: frühere Beratung) eingetragen; Outcome-Wechsel (Test/Interview vs. Medicare-Abrechnung) und Dickens-Reanalyse (Bonferroni, alle KI schließen 1 ein) dargestellt. Ampel „umstritten“ bestätigt. |
| medien-erw-012 | geprueft | schwach | Shah et al. (SMD 0,02/−0,11, 5 Studien, ≥ 3 Monate), Jin et al. (6 RCTs, 391 Personen, SMD −0,08), Chang et al. (25 RCTs, d = 0,31, I² 85 %, Kongress-Abstract) und Miura et al. (kein Effekt) bestätigt. |
| medien-erw-013 | korrigiert | mittel | D21-Werte (36 % der 69–78-Jährigen, 12 % ab 79, 49 % gesamt, 69 % ohne Wissensaneignung bei den Ältesten) und Altersbericht-Zitat bestätigt; Urheber der Forderung präzisiert, Quellentyp DigitalPakt korrigiert. Telefon 0228/24 99 93-54 (Mo–Do 10–16 Uhr) bestätigt. |

## Offene Zweifel je Aussage

- **medien-bild-001:** Die Verlängerung bis 2028 steht in der Elternfassung auf dem AWMF-Server; die AWMF-Detailseite selbst (JavaScript-App) und die verlängerte Langfassung (Serverfehler 500) konnten nicht geöffnet werden.
- **medien-bild-004:** Ob Bundesregierung oder G-BA HE 2 aufgreifen wollen, ist nicht geprüft.
- **medien-bild-005:** Madigan 2019 fand selbst keinen Effekt in Gegenrichtung; die Rückrichtung stützt sich auf Vasconcellos 2025.
- **medien-bild-006:** Tipp „U7a, U8 und U9 sprechen das Thema ausdrücklich an“ nicht gegen die G-BA-Kinder-Richtlinie geprüft.
- **medien-bild-009:** Volltext von Mares & Pan nicht geöffnet (Verlag 403); Abstract über files.comminit.com, Auftraggeber über zwei Pressemitteilungen der UW-Madison geprüft.
- **medien-bild-010:** studientyp bleibt „Kohorte“, obwohl formal eine Leitlinie unter den Quellen ist: die Leitlinie stützt nur die Empfehlung (S2k-Konsens), nicht den Zusammenhang. Bitte Regel für solche Mischaussagen festlegen.
- **medien-bild-011:** Phasen nur P2, die Meta-Analyse umfasst 1–8 Jahre; P1 und P3 könnten ergänzt werden.
- **medien-bild-012:** Die Befragung ist repräsentativ nur für Eltern in Online-Haushalten (Online-Befragung). „Bilderbuch 27 %“ heißt: Darauf möchten die Kinder laut Eltern am wenigsten verzichten.
- **medien-bild-013:** Der EJPH-Beitrag (Martin & Schwarz 2025) beschreibt für 9–12 Jahre „without daily use or personal game consoles“; die Elternfassung sagt nur „Eigene Spielkonsole: Nicht vor neun“. Kleine Abweichung zwischen den Fassungen, die Langfassung (AWMF) wurde nicht geprüft. Der EJPH-Text ist eine Kurzbeschreibung der Leitlinie, keine eigene Leitlinie. Hauptsitzung: DGSMP-Angabe nach Abgleich mit Kapitel 9 korrigiert.
- **medien-bild-014:** Die Studie umfasst 6–13 Jahre; P4 könnte ergänzt werden.
- **medien-bild-015:** Delgado 2018 beruht überwiegend auf älteren Schülerinnen, Schülern und Erwachsenen; die Zuordnung nur zu P3 ist eine Übertragung. Weitere übereinstimmende Meta-Analysen (z. B. Clinton 2019) könnten die Ampel auf „stark“ heben, wurden aber nicht geöffnet.
- **medien-bild-017:** Ampel „umstritten“ ist fraglich: Es widersprechen sich keine guten Studien, sondern ein Experte und eine Übersichtsarbeit; „schwach“ oder „mythos“ für die These „digitale Demenz“ wären ebenfalls vertretbar. Spitzer 2015 und Appel/Schreiner 2015 nur als Metadaten zugänglich (Hogrefe 403), Inhalt nicht gelesen. Neuere Meta-Analysen zu digitaler Demenz bei Kindern wurden nicht geprüft.
- **medien-social-003:** Kowalski et al. 2014 hat eine Korrektur (10.1037/a0036634); Inhalt nicht geprüft.
- **medien-social-004:** Ampel „mittel“ vertretbar, obwohl Shi et al. die Beweissicherheit als niedrig bis sehr niedrig einstufen.
- **medien-social-005:** Für die EP-Entschließung ist nur eine Nachrichtenquelle (DutchNews) belegt; die Pressemitteilung des Europäischen Parlaments wäre als Primärquelle besser. Leopoldina-DOI-Landingpage blockiert automatische Abrufe; Inhalt über die PDF-Kopie auf pure.mpg.de geprüft.
- **medien-social-006:** NASEM: Bericht im Dezember 2023 erschienen, Buch/DOI 2024 – Jahr 2024 beibehalten. Ob der Bericht Altersgrenzen ausdrücklich ablehnt, konnte am Volltext nicht geprüft werden. Phasen [P4] könnten auf P4–P6 erweitert werden (Schutz bis 18).
- **medien-social-007:** Twenge et al. 2018 hat ein Corrigendum (10.1177/2167702618824060); Inhalt nicht geprüft. Neuere Längsschnitt-Meta-Analysen (z. B. JAMA Pediatrics 2025/26) finden kleine Zusammenhänge; die Einstufung „umstritten“ bleibt vertretbar.
- **medien-social-010:** Der eSafety-Bericht selbst (esafety.gov.au) war nicht abrufbar (403); Zahlen stammen aus der Medienmitteilung von eSafety über Medianet.
- **medien-social-012:** Ferguson 2024 (10.1037/ppm0000541): Abstract bei APA nicht abrufbar, nur Crossref-Metadaten; Kernergebnis (d = 0,088, KI schließt 0 ein) nur über die Kritik von Rausch/Haidt (After Babel) gesehen. Es gibt eine Korrektur (10.1037/ppm0000586). Mit Ferguson als Gegenbefund wäre auch „umstritten“ vertretbar; beide Seiten finden aber kleine Effekte.
- **medien-social-013:** Phasen [P6] decken nur einen Teil der Stichprobe (12–19 Jahre) ab; P5 könnte ergänzt werden.
- **medien-gaming-001:** Die Aussage nennt gezielt Aufmerksamkeit und räumliches Denken; die Neuauflage 2023 fand keine signifikanten Moderatoren (geringe Teststärke). Ein Mensch könnte prüfen, ob die Aussage vorsichtiger formuliert werden soll. Phase nur P7; Studien betreffen meist junge Erwachsene, passt.
- **medien-gaming-003:** Phase nur P6; die Diagnose gilt altersübergreifend. Nur notiert.
- **medien-gaming-004:** Mit zwei übereinstimmenden Meta-Analysen wäre formal auch „stark“ denkbar; wegen hoher Heterogenität und Screening-Fragebögen bleibt „mittel“. Phase nur P7, obwohl viele Stichproben Jugendliche sind; nur notiert.
- **medien-gaming-005:** Ampelabsenkung ist eine Ermessensfrage: Die Studie ist ein wiederholter, repräsentativ angelegter Längsschnitt. Ein Mensch sollte entscheiden, ob „mittel“ für deutsche Panelstudien vertretbar bleibt. Phase P4 (10–13) deckt nur einen Teil der 10- bis 17-Jährigen ab; P5 wäre passend, nur notiert.
- **medien-gaming-006:** „mythos“ heißt laut Projekt „mehrfach widerlegt“. Streng genommen sagt die APA, tödliche Gewalt sei zu wenig erforscht; belegt ist eher „kein Nachweis“ als eine Widerlegung. Die Abgrenzung zu 007 ist fair, solange 006 eindeutig von Gewalttaten spricht. Mögliche Ergänzung: Markey et al. 2015 (Kriminalitätsdaten, 10.1037/ppm0000030), konnte ich nicht im Volltext öffnen.
- **medien-gaming-007:** Phase nur P6, obwohl Studien 9- bis 19-Jährige betreffen; P4/P5 wären passend, nur notiert.
- **medien-gaming-008:** Phase nur P7; Lootboxen betreffen besonders Minderjährige, die Studien sind aber überwiegend mit Erwachsenen. Nur notiert.
- **medien-gaming-009:** Der Digital Fairness Act soll laut Fachkommentaren Ende 2026 vorgeschlagen werden; Status bei nächster Prüfung erneut ansehen. Die USK ist eine Selbstkontrolle der Games-Branche; ob ein Finanzierungshinweis nötig ist, konnte ich nicht auf einer USK-Seite belegen. Quelltyp „Expertenkonsens“ für die EP-Pressemitteilung passt schlecht.
- **medien-gaming-013:** Der Ersatzartikel selbst (neue Fassung) hat keine eigene DOI-Quelle im Datensatz; die Mitteilung 10.1001/jamanetworkopen.2023.6895 beschreibt die Änderungen ausreichend.
- **medien-gaming-014:** Phase nur P6, Durchschnittsalter 15,1 Jahre; P5 wäre passend. Nur notiert.
- **medien-schule-001:** Inkrafttreten und Gesetzblatt der bayerischen Änderung nicht gefunden; Ministeriumsseite km.bayern.de nennt noch den Stand 2022 (nur Grundschule). Für Thüringen, Sachsen, Bremen und Schleswig-Holstein keine Primärquelle (Gesetz/Erlass) gefunden; Angaben nur aus epd und Bildungsserver – nicht in den Aussagetext übernehmen, bis Primärquellen vorliegen. Drs. 19/11037 ist eine Entschließung, kein Gesetz; Quelltyp „Gesetz“ mangels passendem Typ beibehalten. Phasen nur P4, obwohl Regeln alle Schulstufen betreffen (nur notiert).
- **medien-schule-002:** Phasen nur P3, die Empfehlung gilt laut Handreichung auch für Klassen 5–6 (P4) – nur notiert.
- **medien-schule-003:** Wirkung „hilft“ bei Ampel „umstritten“ vertretbar, alternativ „einordnung“ – bitte redaktionell entscheiden.
- **medien-schule-004:** Man könnte auch „schwach“ vergeben: Für den Durchschnittseffekt stimmen die Studien überein (kein Effekt); Streit besteht nur bei Untergruppen.
- **medien-schule-005:** Bei drei übereinstimmenden Quellen (Review, zwei quasi-experimentelle Studien) wäre auch „mittel“ vertretbar.
- **medien-schule-006:** Beide Meta-Analysen zeigen in dieselbe Richtung (kleiner Gedächtnisnachteil); man könnte die Kernaussage auch als „schwach belegter kleiner Effekt“ statt „umstritten“ einstufen.
- **medien-schule-007:** GEM-Report-PDF auf unesdoc war gesperrt (403); Inhalt nur über den UNESCO-Artikel geprüft.
- **medien-schule-008:** „Umstritten“ beruht auf einer kleinen Kohorte (n = 263) und einem Arbeitspapier; streng genommen eher „schwach“. Die Empfehlung selbst ist Konsens (S2k-Leitlinie).
- **medien-schule-010:** Roozenbeek & van der Linden 2019 hat eine Korrektur (10.1057/s41599-019-0294-x), keinen Rückzug. Stundenzahl der Wineburg-Studie (laut Suchergebnis sechs 1-stündige Lektionen) nicht im Original gesehen.
- **medien-schule-011:** Nur Pressemitteilung als Quelle; der nationale ICILS-Bericht (Eickelmann et al. 2024) wäre die Primärquelle.
- **medien-ki-001:** Die Studie umfasste die Klassen 9 bis 11 (etwa 14–17 Jahre); phasen könnte zusätzlich P5 enthalten. Die −17 % sind relativ zur Durchschnittsleistung der Kontrollgruppe (−0,054 Punkte von 1).
- **medien-ki-002:** Ob das Nigeria-Papier inzwischen fachbegutachtet erschienen ist, wurde nicht gefunden. Kestin misst nur den unmittelbaren Lernzuwachs, keine Behaltensleistung.
- **medien-ki-003:** Phasen nur P3: Die Evaluationen bei Kulik & Fletcher stammen überwiegend aus Sekundarstufe und Hochschule; eine Ergänzung um P4–P7 wäre zu prüfen. Die VanLehn-Folien sind als Zusatzquelle verzichtbar, da die Zahlen im Abstract von VanLehn 2011 stehen.
- **medien-ki-004:** Der Schluss auf KI-Nutzung („verzichtet auf genau diesen Abruf“) ist eine Folgerung, kein Befund der Meta-Analysen.
- **medien-ki-005:** Das Einzelergebnis zu Sparrow steht bei Camerer in Abbildung 1/Ergänzungsmaterial; im Fließtext geprüft wurde nur die Gesamtquote und Sparrows Gegenrede, die die Nicht-Replikation voraussetzt.
- **medien-ki-007:** MDPI-Seiten (Gerlich, Korrektur) blockiert (403); Inhalte über Crossref/OpenAlex-Metadaten und Abstract geprüft, den Wortlaut der Korrektur nicht.
- **medien-ki-009:** Die Retraction Note wurde am 02.07.2026 ergänzt (Hinweisgeber Ingebrigtsen und Lukic). Deng et al. 2025 wurde nicht geprüft.
- **medien-ki-011:** Die Basis der 57 Prozent (Vertrauen) wurde nicht eindeutig geprüft. Ampel „stark“ für eine Einordnung aus Statistik und KMK-Empfehlung ist vertretbar, aber großzügig. Laut Pressemitteilung wurde der Name des Chatbots nachträglich geändert.
- **medien-ki-012:** UNESCO-Leitfaden (DOI 10.54675/EWZM9535) leitet auf unesdoc weiter (403); nur Metadaten über OpenAlex und die UN-News-Meldung geöffnet. Common Sense Media ist eine Interessenvertretung; ob die Ampel schwach bei Wirkung „schadet“ trägt, hängt fast nur an Befragungsdaten.
- **medien-ki-013:** UNESCO-Rahmen nur über Crossref-Metadaten und die UNESCO-Artikelseite geprüft (unesdoc blockiert). Die Omnibus-Verordnung führt ab 2. Dezember 2026 zusätzlich neue Verbote ein (u. a. sexualisierte Deepfakes ohne Zustimmung); das könnte für Aussagen zu Jugendschutz relevant sein.
- **medien-erw-001:** Volltext der Zeitschrift (Elsevier) nicht zugänglich; Zahlen und Kernzitat am Abstract der OSF-Fassung (osf.io/fsn6v) geprüft. Die Stichprobe (15–35 Jahre) reicht über P7 hinaus (P5–P8); phasen unverändert gelassen.
- **medien-erw-003:** Allcott et al. im Wortlaut über die Autorenfassung (web.stanford.edu/~gentzkow/research/facebook.pdf) geprüft, AER-Volltext gesperrt. Neuere, größere Deaktivierungs-Experimente zur US-Wahl 2020 (Allcott et al. 2024) könnten ergänzt werden; nicht geöffnet. Lambert 2022 ist RCT mit Selbstauskunft und hoher Erwartbarkeit.
- **medien-erw-004:** Die Studie testet junge bis mittelalte Erwachsene; phasen P7 ist eng, aber nicht irreführend.
- **medien-erw-005:** Braune-Krickau et al. ist ein Scoping-Review (12 Studien), als „Systematischer Review“ typisiert – vertretbar, aber schwächer.
- **medien-erw-006:** Nach Trim-and-Fill war der Leistungseffekt bei Parry & Le Roux nicht mehr signifikant (z = 0,03); könnte ergänzt werden.
- **medien-erw-009:** Ampel „mythos“ ist für die Schadensthese vertretbar, aber alle Belege für den Zusammenhang sind Beobachtungsdaten aus einer einzigen Meta-Analyse; eine strengere Lesart wäre „mittel“. Benge & Scullin nennen Rückwirkung (fitte Menschen nutzen mehr Technik) ausdrücklich offen. Appel & Schreiner 2014 prüfen Mythen zu Internetnutzung allgemein, nicht kognitives Altern; als Beleg für Ältere schwach.
- **medien-erw-010:** Lampit 2014 ist über zehn Jahre alt; eine neuere Meta-Analyse wurde in kurzer Suche nicht gefunden.
- **medien-erw-011:** Dickens' Reanalyse stützt sich nur auf veröffentlichte Kennzahlen und wurde laut Danksagung mit KI-Unterstützung (Copilot) erstellt; weitere unabhängige Kritik an Edwards 2017 fand ich in kurzer Suche nicht. Booster-Untergruppe: Auffrischung war nur unter Personen mit ≥ 8 Sitzungen randomisiert; Selektionseffekte bleiben möglich. Wirkung „hilft“ bei Ampel „umstritten“ prüfen (ggf. „einordnung“).
- **medien-erw-012:** Bei einer neueren, größeren positiven Analyse (wenn auch nur als Abstract) wäre auch „umstritten“ vertretbar; „schwach“ wegen geringer Studienqualität beibehalten. Miura et al. untersuchten Menschen mit subjektiven Gedächtnissorgen; Einsamkeit war nur Nebenzielgröße.
- **medien-erw-013:** Die D21-Zahlen beziehen sich auf Generationen (Nachkriegsgeneration 1946–1955), nicht exakt auf Altersjahre; die Umrechnung 69–78 Jahre stammt aus dem Bericht selbst.

## Nicht erreichbare Quellen

- medien-bild-001: https://register.awmf.org/de/leitlinien/detail/027-075 (JavaScript-App, Inhalt nicht abrufbar)
- medien-bild-001: https://register.awmf.org/assets/guidelines/027-075l_S2k_Praevention-dysregulierten-Bildschirmmediengebrauchs-Kinder-Jugendliche_2023-09-verlaengert.pdf (HTTP 500)
- medien-bild-009: https://doi.org/10.1016/j.appdev.2013.01.001 (ScienceDirect 403; Abstract über files.comminit.com geprüft)
- medien-bild-017: https://econtent.hogrefe.com/doi/10.1026/0033-3042/a000251 (HTTP 403, nur Crossref-Metadaten)
- medien-bild-017: https://econtent.hogrefe.com/doi/10.1026/0033-3042/a000252 (HTTP 403, nur Crossref-Metadaten)
- medien-social-010: https://www.esafety.gov.au/research/social-media-age-restrictions-evaluation/early-days-early-insights-three-months-report (HTTP 403; nicht als Quelle aufgenommen)
- medien-social-012: 10.1037/ppm0000541 (APA PsycNet lädt nur per JavaScript; Abstract nicht abrufbar, Metadaten über Crossref geprüft)
- medien-schule-007: https://unesdoc.unesco.org/ark:/48223/pf0000385723/PDF/385723eng.pdf.multi (HTTP 403)
- medien-schule-010: 10.1037/edu0000740 (APA PsycNet lädt nur per JavaScript, kein Abstract abrufbar)
- medien-ki-001: https://www.pnas.org/doi/10.1073/pnas.2422633122 (403); Volltext stattdessen über Europe PMC PMC12232635 geöffnet
- medien-ki-007: https://www.mdpi.com/2075-4698/15/9/252 (403, Metadaten über Crossref/OpenAlex geöffnet)
- medien-ki-012: https://doi.org/10.54675/EWZM9535 → unesdoc.unesco.org (403); Metadaten über OpenAlex geprüft
- medien-ki-013: https://doi.org/10.54675/JKJB9835 und 10.54675/ZJTE2084 → unesdoc (403); Crossref-Metadaten und https://www.unesco.org/en/articles/ai-competency-framework-students geöffnet
- medien-erw-001: https://doi.org/10.1016/j.chb.2021.107138 (Elsevier 403; Abstract über OSF-API geprüft)

Hinweis: Wo bei einer Quelle nur Metadaten oder Abstract erreichbar waren (z. B. UNESCO, MDPI), trägt sie ein Abrufdatum. Geprüft wurden dann Existenz, Autoren, Jahr und Titel, nicht der Volltext. Drei Quellen tragen kein Abrufdatum, weil kein Inhalt abrufbar war: Ferguson 2024 (medien-social-012, Gegenstimme jetzt als „nur über Sekundärberichte“ gekennzeichnet), Wineburg 2022 (medien-schule-010, ersetzt durch eine geöffnete Studienzusammenfassung) und UNESCO GEM 2023 (medien-schule-007).
