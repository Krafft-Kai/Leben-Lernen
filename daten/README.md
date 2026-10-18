# daten/ – die einzige Quelle für alle Inhalte

Seiten werden aus diesen Dateien erzeugt, nie von Hand geschrieben. Eine Korrektur ändert eine Zeile hier; jede Seite zeigt sie beim nächsten Build.

| Datei oder Ordner | Inhalt | Schema |
|---|---|---|
| `phasen.json` | 12 Lebensphasen, 9 Altersgruppen der Matrix, 4 Zielgruppen | – |
| `themen.json` | 12 Themencluster mit Leitfragen und Matrix (Thema × Altersgruppe) | – |
| `themen/<thema>.json` | Belegte Aussagen eines Themas (Array) | `schema-aussage.json` |
| `seiten/<thema>.json` | Redaktionelle Bausteine der Schwerpunktseiten eines Themas (Array) | `schema-seite.json` |
| `koepfe/<person>.json` | Eine Forscherin oder ein Forscher mit Studien, Kritik, Replikation | `schema-kopf.json` |
| `koepfe/_startliste.json` | Startliste für Prompt P2 | – |
| `navigator.json` | Stationen, Übergänge, Altersphasen, Quellen und Protokoll des Navigators „Bildungswege Niedersachsen“ | im Datei-Kommentar beschrieben |
| `protokoll.json` | Änderungsprotokoll des Projekts | – |

## Regeln

- Jede Aussage hat mindestens eine Quelle mit DOI oder Link, eine Evidenzampel, ein Stand-Datum und einen Status. `npm test` prüft das; ohne grünen Test gibt es keinen Build.
- Kernzitate höchstens 15 Wörter.
- Schwerpunktseiten verweisen auf Aussagen nur über deren `id` und nur, wenn der Status `geprueft` oder `korrigiert` ist.
- IDs sind stabil. Was nicht mehr gilt, bekommt den Status `zurueckgezogen` und einen Eintrag unter `aenderungen`; gelöscht wird nichts.
- Prüfen: `npm test`. Leitfragen als Markdown erzeugen: `npm run leitfragen`.
