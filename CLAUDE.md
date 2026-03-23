# CLAUDE.md — De Formatie App

Dit bestand geeft Claude Code volledige context over het project zodat je direct verder kunt werken.

## Bronbestand

Het volledige spelontwerp staat in:

```
De_Formatie_Spellenavond_v2.docx
```

Dit is de **master bron** voor alle spelinhoud. Als je iets wilt uitbreiden of controleren — partijstandpunten, crisiskaarten, puntentelling, objectievenkaarten — lees dan dit bestand. De app is een digitale vertaling hiervan, maar het docx-bestand is leidend.

### Inhoud van het docx

| Sectie | Wat erin staat |
|---|---|
| Checklist materialen | Wat je fysiek nodig hebt voor een spellenavond |
| Overzicht van de avond | Rondes, tijdsduur, volgorde |
| Ronde 1 t/m 4 | Volledige spelregels per ronde |
| Puntentelling | Alle scorecategorieën met punten |
| Partijkaarten (10×) | Per partij: naam, lijsttrekker, wie ze zijn, standpunten, relaties, dealbreaker, kroonjuweel, karakter-quirk, speeltip |
| Geheime objectievenkaarten (10×) | Per partij: must-have, dealbreaker, geheime bonus |
| Crisiskaarten formatie (10×) | Tekst van elke crisiskaart |
| Wetsvoorstellen (8×) | Wet + hint voor de informateur |
| Kabinetscrisis kaarten (6×) | Tekst per crisis, oplopend in ernst |
| Geheime agenda's | Loyalist / Opstandeling / Opportunist / Kingmaker |
| Coalitieakkoord template | Invulformulier voor de coalitie |
| Scoreblad | Overzicht van alle scorecategorieën |
| Informateur-kaart | Taken en superkrachten van de spelleider |

### Docx uitlezen in Claude Code

```bash
# Tekst extraheren (makkelijkste manier)
pandoc De_Formatie_Spellenavond_v2.docx -o spelinhoud.md

# Of via Python
python3 -c "
import subprocess
result = subprocess.run(['pandoc', 'De_Formatie_Spellenavond_v2.docx', '-t', 'plain'], capture_output=True, text=True)
print(result.stdout)
"
```

### Partijdetails (volledig, uit het docx)

Elke partijkaart bevat de volgende velden — dit zijn de details die nog **niet** volledig in de app zitten maar relevant zijn voor uitbreidingen:

| Partij | Lijsttrekker | Kroonjuweel | Dealbreaker met |
|---|---|---|---|
| PPP | Bloem Windmolen-de Vries | Vleesvrije Werkweek | KKB |
| FBL | Sjaak van de Hangmat | 3-daagse werkweek | DDP |
| KCV | Floris-Jan van het Podium | Nationale Vlaaidag | PAN |
| WIFI | Byte van Dijkstra | WiFi als grondrecht | FRR |
| DAM | Jan-Willem Gemiddeld | Woord "draagvlak" + werkgroep | niemand |
| VBB | Henk Krokansen | BTW snacks naar 0% | PPP |
| KKB | Gouda van Leerdammer | Ministerie van Zuivel | PPP |
| DDP | Maximiliansen van Cashflow III | Belastingverlaging | FBL |
| FRR | Gerrit Klokslag | De avondklok | PAN |
| PAN | Nihil "Nelis" van Niansen | Minimaal één wet afschaffen | FRR |

**Karakter-quirks (voor partijkaart-weergave op TV):**

| Partij | Quirk |
|---|---|
| PPP | Mag het woord "economie" niet zeggen → zegt "eco-harmonie" + boom-knuffel-gebaar |
| FBL | Gaapt demonstratief, stelt constant voor om pauze te nemen |
| KCV | Citeert steeds verzonnen dichters en filosofen |
| WIFI | Vervangt alles door Engelse tech-termen ("coalition-API updaten") |
| DAM | Kan nooit ergens definitief voor of tegen zijn, maakt zinnen nooit af |
| VBB | Onderbouwt elk argument met een vergelijking met eten |
| KKB | Relateert werkelijk alles aan kaas |
| DDP | Noemt alles een "investering" of "groeikans" |
| FRR | Houdt iedereen streng aan de tijd, kijkt constant op horloge |
| PAN | Is het automatisch oneens met het laatste wat iemand zei |

**Geheime bonussen per partij (objectievenkaarten):**

| Partij | Geheime bonus |
|---|---|
| PPP | Wordt Minister van Klimaat & Natuur (+3) |
| FBL | Woord "vrij" of "rust" staat in de TITEL van het akkoord (+3) |
| KCV | Nationale Vlaaidag wordt écht feestdag in het akkoord (+3) |
| WIFI | Woord "digitaal", "innovatie" of "tech" staat in het akkoord (+3) |
| DAM | In coalitie zónder dat één DAM-standpunt letterlijk in akkoord staat (+3) |
| VBB | Wordt Minister van Feestelijk Beleid (+3) |
| KKB | Woord "kaas" staat in de TITEL van het akkoord (+3) |
| DDP | Wordt Minister van Financiën (+3) |
| FRR | Minimaal 4 concrete regels/verplichtingen in het akkoord (+3) |
| PAN | Kabinet is een minderheidskabinet (+3) |

## Wat is dit project?

Een interactieve game master app voor **De Formatie**, een politiek gezelschapsspel voor 11 spelers dat door Rowan is ontworpen. De app begeleidt de avond: instructies, timers, crisiskaarten onthullen, stemmen bijhouden en puntentelling.

## Architectuur

Twee statische HTML-bestanden, geen build pipeline:

- **`index.html`** — Informateur-paneel. Alle spelbesturing. De spelleider gebruikt dit op zijn laptop.
- **`tv.html`** — Publiek TV-scherm. Toont wat de spelleider verzendt. Op de TV via HDMI/AirPlay.

### Communicatie tussen de twee schermen

Via `localStorage`. De master schrijft een event-object, de TV pollt elke 300ms:

```js
// Master (index.html) stuurt een event:
localStorage.setItem('formatie_event', JSON.stringify({ type, data, ts: Date.now() }));

// TV (tv.html) leest het:
const ev = JSON.parse(localStorage.getItem('formatie_event'));
```

Event types die bestaan: `phase`, `timer`, `seats`, `crisis`, `vote`, `law`, `agenda`, `agendaAll`, `scores`, `winner`, `superpower`

> ⚠️ Beide vensters moeten in dezelfde browser op dezelfde computer draaien.

## Speldata (hardcoded in beide bestanden)

### Partijen (10 stuks)
```
PPP  — Partij voor Plant en Planeet
FBL  — Front voor Betaalbaar Luieren
KCV  — Kunst, Cultuur en Vlaai
WIFI — Werkelijk Innovatief Fantastisch Internet
DAM  — De Absolute Middenpartij
VBB  — Verbond voor Bitterballen en Borrel
KKB  — De Koninklijke Kaasbeweging
DDP  — De Dikke Portemonnee
FRR  — Front voor Rust, Regels en Regelmaat
PAN  — Partij Absoluut Niks
```

Alle partijen starten met 15 zetels (totaal 150). De spelleider past dit aan na de stemronde.

### Rondes
1. **Campagne** (30 min) — pitches, speed-debat, stemming
2. **Formatie** (45 min) — 5 fasen, crisiskaarten, superkrachten informateur
3. **Regeerperiode** (30 min) — 8 wetsvoorstellen, stemmen
4. **Kabinetscrisis** (20 min) — 6 crises, geheime agenda's

### Puntentelling
| Categorie | Punten |
|---|---|
| In de coalitie | +5 |
| Must-have in akkoord | +5 |
| Geheime bonus behaald | +3 |
| Dealbreaker geschonden | -5 |
| Per wet aan winnende kant | +1 |
| Amendement overgenomen | +2 |
| Geheime agenda behaald | +3 |
| MP overleeft alle 6 crises | +2 extra |

Score staat in `state.scores[partyId]` met keys: `coalition`, `mustHave`, `bonus`, `dealbreaker`, `regeer`, `agenda`, `mp`

### Geheime agenda's
Worden bij init willekeurig toegewezen: 3× Loyalist, 3× Opstandeling, 2× Opportunist, 2× Kingmaker

## State object (index.html)

```js
state = {
  seats: { PPP: 15, FBL: 15, ... },         // Zetels per partij
  coalition: { PPP: false, FBL: false, ... }, // In coalitie?
  scores: { PPP: { coalition:0, mustHave:0, bonus:0, dealbreaker:0, regeer:0, agenda:0, mp:0 }, ... },
  votes: { PPP: null, ... },                  // 'voor' | 'tegen' | null
  lawResults: { 1: 'passed', 2: 'rejected', ... },
  agendas: { PPP: 'LOYALIST', ... },          // Toegewezen agenda per partij
  currentLaw: 1,                              // Actief wetsvoorstel
  crisisRevealed: {},                         // Key: `${deckId}_${cardNum}`
  agendaRevealed: {},                         // Key: partyId
  superpowersUsed: {},                        // Key: superpower id
  timerSeconds: 120,
  timerRunning: false,
  timerLabel: 'Klaar om te starten',
}
```

## Stijl & design

- **Thema**: Donker parlementair — jaren-70 Tweede Kamer vibe
- **Kleuren**: Navy (`#0a1628`), goud (`#c9a84c`), cream (`#f5f0e8`)
- **Fonts**: Playfair Display (titels), EB Garamond (body), Oswald (labels/UI)
- **CSS**: Alleen custom properties + vanilla CSS, geen frameworks
- Alle CSS staat inline in de HTML-bestanden (geen aparte stylesheets)

## Backlog / ideeën voor uitbreiding

Dingen die nog niet bestaan maar logisch zijn om toe te voegen:

### Hoge prioriteit
- [ ] **Coalitieakkoord invulformulier** — digitale versie van het template, exporteerbaar als tekst om op TV te tonen
- [ ] **Amendement-tracking** — per wetsvoorstel bijhouden welk amendement werd ingediend en door wie; geeft automatisch +2 punten
- [ ] **Automatische puntentoewijzing bij coalitie** — als je een partij aanvinkt als coalitie, automatisch +5 toevoegen aan `scores[id].coalition`
- [ ] **Superkrachten-log** — zichtbare geschiedenis van gebruikte superkrachten

### Medium prioriteit
- [ ] **Spelersoverzicht scherm op TV** — toon alle partijkaarten met lijsttrekker en kroonjuweel (handig bij start)
- [ ] **Tijdlijn/log** — scrollbare log van wat er is gebeurd tijdens de avond
- [ ] **Geluid** — toeter bij timer aflopen, dramatisch geluid bij crisiskaart onthullen (Web Audio API of gewoon een audio-element)
- [ ] **Volledige partijkaart view op TV** — klik op partij → toon grote kaart op TV (voor campagnepitches)

### Nice to have
- [ ] **Exporteer eindstand** — genereer een nette samenvatting van de avond (coalitie, akkoord, scores)
- [ ] **Herstart knop** — reset alle state voor een nieuwe potje
- [ ] **Responsive layout** — op dit moment geoptimaliseerd voor laptop + TV, niet voor telefoon
- [ ] **QR-code op TV-scherm** — zodat spelers een "spectator view" kunnen openen op hun telefoon

## Bekende beperkingen / aandachtspunten

- `localStorage` werkt alleen binnen dezelfde browser op dezelfde machine. Als je het via een lokale server wilt hosten zodat de TV echt een apart apparaat is, moet je dit vervangen door WebSockets of een tool als PartyKit / BroadcastChannel API.
- De geheime agenda's worden willekeurig toegewezen bij elke page load. Als de spelleider de pagina refresht, veranderen de agenda's. Fix: sla ze op in localStorage na eerste toewijzing.
- Scores worden niet opgeslagen bij refresh. Voor persistentie: `JSON.stringify(state)` in localStorage wegschrijven bij elke wijziging.
- De TV-pagina heeft geen fallback als `localStorage` leeg is — toont standby scherm, dat is prima.

## Handige commando's voor Claude Code

```bash
# Bestanden bekijken
ls -la

# Live preview via Python (geen Node nodig)
python3 -m http.server 8080
# Open dan http://localhost:8080/index.html

# Of via Node
npx serve .
```

Geen npm install nodig — het project heeft geen dependencies.
