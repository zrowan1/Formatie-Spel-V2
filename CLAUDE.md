# CLAUDE.md — De Formatie App

Dit bestand geeft Claude Code volledige context over het project zodat je direct verder kunt werken.

## Bronbestand

Het volledige spelontwerp staat in:

```
De_Formatie_Spellenavond_v2.docx
```

Dit is de **master bron** voor alle spelinhoud. Als je iets wilt uitbreiden of controleren — partijstandpunten, crisiskaarten, puntentelling, objectievenkaarten — lees dan dit bestand. De app is een digitale vertaling hiervan, maar het docx-bestand is leidend.

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

---

## Wat is dit project?

Een interactieve game master app voor **De Formatie**, een politiek gezelschapsspel voor 7-16 spelers dat door Rowan is ontworpen. De app begeleidt de hele avond: instructies, timers, crisiskaarten onthullen, stemmen bijhouden en puntentelling.

---

## Architectuur

Drie statische HTML-bestanden, geen build pipeline:

| Bestand | Doel | Gebruikt door |
|---------|------|---------------|
| **`index.html`** | Informateur-paneel (spelleider) | Spelleider op laptop |
| **`tv.html`** | Publiek TV-scherm | Op de TV via HDMI/AirPlay |
| **`player.html`** | Spelersdashboard app | Spelers op hun telefoon |

### Communicatie tussen schermen

**Paneel ↔ TV:** Via `localStorage`. De master schrijft een event-object, de TV pollt elke 300ms:

```js
// Master (index.html) stuurt een event:
localStorage.setItem('formatie_event', JSON.stringify({ type, data, ts: Date.now() }));

// TV (tv.html) leest het:
const ev = JSON.parse(localStorage.getItem('formatie_event'));
```

**Paneel ↔ Spelers:** Via Supabase (PostgreSQL + realtime). Spelers stemmen via hun telefoon, de spelleider ziet resultaten live.

> ⚠️ Paneel en TV moeten in dezelfde browser op dezelfde computer draaien. Speler-app werkt overal met internet.

---

## Partijen (15 stuks — dynamisch selecteerbaar)

| ID | Naam | Lijsttrekker | Kroonjuweel | Dealbreaker |
|----|------|--------------|-------------|-------------|
| PPP | Partij voor Plant en Planeet | Bloem Windmolen-de Vries | Vleesvrije Werkweek | KKB |
| FBL | Front voor Betaalbaar Luieren | Sjaak van de Hangmat | 3-daagse werkweek | DDP |
| KCV | Kunst, Cultuur en Vlaai | Floris-Jan van het Podium | Nationale Vlaaidag | PAN |
| WIFI | Werkelijk Innovatief Fantastisch Internet | Byte van Dijkstra | WiFi als grondrecht | FRR |
| DAM | De Absolute Middenpartij | Jan-Willem Gemiddeld | Draagvlak werkgroep | — |
| VBB | Verbond voor Bitterballen en Borrel | Henk Krokansen | BTW snacks naar 0% | PPP |
| KKB | De Koninklijke Kaasbeweging | Gouda van Leerdammer | Ministerie van Zuivel | PPP |
| DDP | De Dikke Portemonnee | Maximiliansen van Cashflow III | Belastingverlaging | FBL |
| FRR | Front voor Rust, Regels en Regelmaat | Gerrit Klokslag | De avondklok | PAN |
| PAN | Partij Absoluut Niks | Nihil "Nelis" van Niansen | Minimaal één wet afschaffen | FRR |
| OMA | Ouderenzorg, Memoires en Appeltaart | Tante Riet van de Rolstoel | Pensioenleeftijd 60 | WIFI |
| BNB | Boer en Nederlandsch Boerenverstand | Kees van den Trekker | Afschaffen stikstofregels | PPP |
| WOK | Wonen of Kraken | Vera van de Wachtlijst | Maximale huur €400 | DDP |
| KGW | Kerk, Gezin en Waarden | Dominee Adriaan van het Kruispad | Zondag rustdag | FBL |
| SVB | Sportief Verbond voor Beweging | Duco Spierenboer-Hardloper | Gym-uur ambtenaren | FBL |

Spelleider kiest bij start 6-10 partijen uit de 15 beschikbare. De zetels worden automatisch verdeeld (150 / aantal spelers).

### Karakter-quirks (voor roleplay)

| Partij | Quirk |
|--------|-------|
| PPP | Mag "economie" niet zeggen → zegt "eco-harmonie" + boom-knuffel |
| FBL | Gaapt demonstratief, stelt constant voor om pauze te nemen |
| KCV | Citeert steeds verzonnen dichters en filosofen |
| WIFI | Vervangt alles door Engelse tech-termen |
| DAM | Kan nooit ergens definitief voor of tegen zijn |
| VBB | Onderbouwt elk argument met een vergelijking met eten |
| KKB | Relateert werkelijk alles aan kaas |
| DDP | Noemt alles een "investering" of "groeikans" |
| FRR | Houdt iedereen streng aan de tijd, kijkt op horloge |
| PAN | Is automatisch oneens met het laatste wat iemand zei |
| OMA | Vergeet halverwege wat ze wilde zeggen, vertelt verhaal over 1987 |
| BNB | "Bewijst" alles met een anekdote over koe Betsie |
| WOK | Eindigt elke zin met "...en mijn wachtlijst staat al op jaar zeven" |
| KGW | Citeert bijbelteksten die totaal niet van toepassing zijn |
| SVB | Begint elk punt met "als in topsport..." eindigt met "kom op team!" |

---

## Rondes

1. **Campagne** (30 min) — pitches, speed-debat, verkiezingen
2. **Formatie** (45 min) — 5 fasen, crisiskaarten, superkrachten informateur
3. **Regeerperiode** (30 min) — 8 wetsvoorstellen, stemmen
4. **Kabinetscrisis** (20 min) — 6 crises, geheime agenda's

---

## Puntentelling

| Categorie | Punten |
|-----------|--------|
| In de coalitie | +5 |
| Must-have in akkoord | +5 |
| Geheime bonus behaald | +3 |
| Dealbreaker geschonden | −5 |
| Per wet aan winnende kant | +1 |
| Amendement overgenomen | +2 |
| Geheime agenda behaald | +3 |
| MP overleeft alle 6 crises | +2 extra |

Score staat in `state.scores[partyId]` met keys: `coalition`, `mustHave`, `bonus`, `dealbreaker`, `regeer`, `agenda`, `mp`, `amendement`

### Geheime agenda's

Worden bij init willekeurig toegewezen op basis van aantal spelers:
- 6 spelers: 2× Loyalist, 2× Opstandeling, 1× Opportunist, 1× Kingmaker
- 7 spelers: 3× Loyalist, 2× Opstandeling, 1× Opportunist, 1× Kingmaker
- 8-10 spelers: schaalt mee

---

## State object (index.html)

```js
state = {
  selectedPartyIds: ['PPP','FBL',...],    // Geselecteerde partijen
  gameStarted: true,                       // Is spel gestart?
  seats: { PPP: 15, ... },                 // Zetels per partij
  coalition: { PPP: false, ... },          // In coalitie?
  scores: { PPP: { coalition:0, mustHave:0, ... }, ... },
  votes: { PPP: 'voor', ... },             // 'voor' | 'tegen' | null
  lawResults: { 1: 'passed', ... },        // Uitslag wetsvoorstellen
  agendas: { PPP: 'LOYALIST', ... },       // Toegewezen agenda per partij
  currentLaw: 1,                           // Actief wetsvoorstel
  crisisRevealed: {},                      // Key: `${deckId}_${cardNum}`
  agendaRevealed: {},                      // Key: partyId
  superpowersUsed: {},                     // Key: superpower id
  superpowerLog: [],                       // Geschiedenis gebruikte krachten
  timerSeconds: 120,
  timerRunning: false,
  timerLabel: 'Klaar om te starten',
  players: ['','',...],                    // Spelernamen
  assignments: {},                         // Partij → speler toewijzing
  coalitie: {                              // Coalitieakkoord
    titel: '',
    premier: '',
    ministeries: {},
    punten: ['', '', ...]
  },
  amendementen: {},                        // Per wet: wie amendement indiende
  gameId: '1234567890',                    // Uniek spel-ID voor Supabase
  currentVoteTopic: null,                  // Actieve stemming
  currentVoteLabel: '',
}
```

---

## Supabase Integratie

De app gebruikt Supabase voor realtime multiplayer:

| Tabel | Doel |
|-------|------|
| `game_sessions` | Game state, actieve stemmingen, agenda's |
| `player_votes` | Individuele stemmen van spelers |
| `election_votes` | Verkiezingsstemmen (ronde 1) |

### Realtime subscriptions
- `player_votes_feed` — luistert naar nieuwe stemmen
- `election_votes_feed` — luistert naar verkiezingsstemmen

---

## Event types (broadcast)

```js
// Naar TV
broadcast('phase', { phase: 'r2' });
broadcast('timer', { seconds: 120, label: 'Pitch', done: false });
broadcast('seats', { seats, coalition, parties: activeParties });
broadcast('crisis', { card: { title, text } });
broadcast('vote', { voor: 45, tegen: 32, majority: 38 });
broadcast('law', { law: { num, title, text } });
broadcast('agenda', { party: 'PPP', type: 'LOYALIST' });
broadcast('agendaAll', {});
broadcast('scores', { scores, parties });
broadcast('winner', { winner: { party, totalScore } });
broadcast('superpower', { log: superpowerLog });
broadcast('akkoord', { coalitie });
broadcast('setup', { parties, majority, totalSeats });
```

---

## Stijl & design

- **Thema**: Donker parlementair — jaren-70 Tweede Kamer vibe
- **Kleuren**: Navy (`#0a1628`), goud (`#c9a84c`), cream (`#f5f0e8`), groen (`#27ae60`), rood (`#c0392b`)
- **Fonts**: Playfair Display (titels), EB Garamond (body), Oswald (labels/UI)
- **CSS**: Alleen custom properties + vanilla CSS, geen frameworks
- Alle CSS staat inline in de HTML-bestanden (geen aparte stylesheets)

---

## Datastructuren

### Crisis kaarten (Ronde 2 — Formatie)
`CRISIS_R2` — 25 crisiskaarten die de formatie verstoren

### Crisis kaarten (Ronde 4 — Kabinetscrisis)
`CRISIS_R4` — 6 crises (1 mild, 2 medium, 2 zwaar, 1 extreem), willekeurig geselecteerd uit `CRISIS_R4_POOL`

### Wetsvoorstellen
`LAWS_POOL` — 20 wetsvoorstellen, waarvan er 8 willekeurig worden gekozen per spel

### Stellingen (Speed-debat)
`STELLINGEN` — 35 stellingen voor het speed-debat in ronde 1

### Tutorial slides
`TUTORIAL_SLIDES` — 11 slides met speluitleg voor op de TV

### Ronde-specifieke slides
`ROUND_SLIDES.r1` t/m `ROUND_SLIDES.r4` — Uitleg per ronde

---

## Belangrijke functies

### State management
```js
saveState();           // Slaat state op in localStorage
initGameState();       // Initialiseert scores, seats, agendas
```

### Broadcast
```js
broadcast(type, data); // Stuurt event naar TV
```

### Supabase
```js
openVoting(topic, label);     // Open stemming voor spelers
closeVoting();                // Sluit stemming
openElection();               // Open verkiezingen (ronde 1)
closeElection();              // Sluit verkiezingen
pushAgendas();                // Synchroniseer agendas naar Supabase
startVoteSubscription();      // Start realtime listener
```

### UI rendering
```js
renderPhase(phase);           // Toont juiste ronde-content
renderVoteRows();             // Toont stemtabel
updateVoteResult();           // Berekent uitslag
renderCoalitionMeter();       // Toont coalitievoortgang
renderScores();               // Toont scoretabel
renderHemicycle();            // Toont halfrond zetelverdeling
```

---

## Projectstructuur

```
formatie/
├── index.html          # Informateur-paneel (spelleider) ~4000 regels
├── tv.html             # Publiek TV-scherm ~3000 regels
├── player.html         # Spelersdashboard app ~1200 regels
├── docker-compose.yml  # Docker setup voor lokale hosting
├── start.sh            # Dev server start script
├── README.md           # Gebruikersdocumentatie
├── CLAUDE.md           # Dit bestand — technische context
└── De_Formatie_Spellenavond_v2.docx  # Bronbestand spelregels
```

---

## Ontwikkel-commands

```bash
# Lokale dev server (Python)
python3 -m http.server 8080

# Of via start.sh
./start.sh

# Docker
sudo docker-compose up -d

# Bestanden bekijken
ls -la
```

---

## Backlog / ideeën voor uitbreiding

### Gepland / WIP
- [ ] **Audio effects** — toeter bij timer aflopen, dramatisch geluid bij crisis
- [ ] **Exporteer eindstand** — nette samenvatting als tekst/PDF
- [ ] **Spectator mode** — alleen kijken zonder te spelen

### Nice to have
- [ ] **WebSocket fallback** — voor multi-device zonder Supabase
- [ ] **Spelgeschiedenis** — log van alle acties tijdens het spel
- [ ] **Replay mode** — bekijk een gespeeld spel terug
- [ ] **Meer crisiskaarten** — uitbreiden van de pools

---

## Bekende beperkingen / aandachtspunten

1. **localStorage** werkt alleen binnen dezelfde browser. Paneel en TV moeten op dezelfde machine draaien.

2. **Supabase** is vereist voor de speler-app. Zonder internet werkt alleen het paneel + TV.

3. **Agenda's** worden willekeurig toegewezen bij elke page load VOOR het spel start. Eenmaal gestart, blijven ze behouden via localStorage.

4. **State** wordt opgeslagen in localStorage — bij verversen van de pagina blijft het spel bestaan.

5. **Timer** wordt gepauzeerd bij page refresh (wordt niet hervat automatisch).

6. **Game ID** wordt eenmalig gegenereerd — elk spel heeft een uniek ID voor Supabase.

---

## Security notes

- Supabase anon key is zichtbaar in de frontend — dit is OK voor read-only/demo gebruik
- Voor productie: gebruik Row Level Security (RLS) policies in Supabase
- Geen gevoelige data in de app — alleen spelstatus en stemmen
