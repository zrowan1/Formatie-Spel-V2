# AGENTS.md — De Formatie App

> Agent-focused context voor het werken aan dit project.

## Wat is dit?

Een volledig browser-based game master app voor **De Formatie**, een politiek gezelschapsspel. De app begeleidt 6–10 spelers door 4 rondes: campagne, formatie, regeerperiode en kabinetscrisis.

## Architectuur (belangrijk)

**Geen build pipeline. Geen frameworks. Puur HTML/CSS/JS.**

| Bestand | Doel | Communicatie |
|---------|------|--------------|
| `index.html` | Spelleider paneel (~4200 regels) | LocalStorage → TV; Supabase → spelers |
| `tv.html` | Publiek TV-scherm (~2900 regels) | Leest localStorage van paneel |
| `player.html` | Spelersdashboard op mobiel (~1100 regels) | Supabase realtime subscriptions |
| `data.js` | Gedeelde data: partijen, quirks, agenda's, etc. | Wordt geladen door alle 3 schermen |
| `config.js` | Supabase credentials + app config | Wordt geladen door alle 3 schermen |

### Communicatie

- **Paneel ↔ TV:** `localStorage` polling (elke 300ms). Werkt **alleen in dezelfde browser op dezelfde machine**.
- **Paneel ↔ Spelers:** Supabase (PostgreSQL + realtime). Spelers stemmen op hun telefoon, paneel ziet resultaten live.

## Quick start (lokaal)

```bash
# Dev server
./start.sh

# Of direct
python3 -m http.server 8080

# Docker (productie-like)
cp .env.example .env
sudo docker compose up -d
```

## Bron van waarheid voor spelinhoud

`De_Formatie_Spellenavond_v2.docx` is de master bron. De app is een digitale vertaling hiervan. Pandoc is beschikbaar om deze uit te lezen:

```bash
pandoc De_Formatie_Spellenavond_v2.docx -t plain
```

## Belangrijke constraints

1. **Paneel en TV moeten in dezelfde browser zitten** — anders werkt localStorage niet.
2. **Speler-app heeft internet + Supabase nodig** — zonder internet werkt alleen paneel + TV.
3. **State wordt in localStorage bewaard** — page refresh reset de timer (pauze), maar houdt het spel.
4. **Agenda's worden éénmalig random toegekend** — pas vóór start, daarna frozen via localStorage.
5. **Game ID is uniek per spel** — gegenereerd bij init, gebruikt als Supabase primary key.

## Waar moet je zijn voor...

| Wijziging | Bestand |
|-----------|---------|
| Nieuwe partij toevoegen | `data.js` + `index.html` (kleuren/hemicycle) + `player.html` (standpunten) |
| Nieuwe crisiskaart | `index.html` (zoek `CRISIS_R2` of `CRISIS_R4_POOL`) |
| Nieuwe wet | `index.html` (zoek `LAWS_POOL`) |
| Nieuwe stelling speed-debat | `index.html` (zoek `STELLINGEN`) |
| UI thema aanpassen | Inline CSS in betreffende HTML |
| Supabase credentials wijzigen | `config.js` (of `.env` voor backend) |
| Spelersaantal wijzigen | `config.js` (`MIN_PLAYERS`, `MAX_PLAYERS`) + `data.js` (`AGENDA_DISTRIBUTION`) |

## Data structuren (kort)

- `PARTIES` — 15 partijen, dynamisch selecteerbaar (6–10 per spel)
- `PARTY_LEADERS`, `PARTY_QUIRKS`, `PARTY_CROWN_JEWELS`, `PARTY_INTROS`, `PARTY_BONUSES`, `PARTY_DEALBREAKERS`
- `AGENDA_DEFINITIONS` — 4 types: Loyalist, Opstandeling, Opportunist, Kingmaker
- `AGENDA_DISTRIBUTION` — mapping aantal spelers → verdeling agenda's
- `PHASE_LABELS` — prep, r1, r2, r3, r4, score

## State object (index.html)

```js
state = {
  selectedPartyIds: ['PPP','FBL',...],
  gameStarted: true,
  seats: { PPP: 15, ... },
  coalition: { PPP: false, ... },
  scores: { PPP: { coalition:0, mustHave:0, bonus:0, dealbreaker:0, regeer:0, agenda:0, mp:0, amendement:0 }, ... },
  votes: { PPP: 'voor' | 'tegen' | null, ... },
  lawResults: { 1: 'passed' | 'rejected', ... },
  agendas: { PPP: 'LOYALIST', ... },
  currentLaw: 1,
  crisisRevealed: {},
  agendaRevealed: {},
  superpowersUsed: {},
  superpowerLog: [],
  timerSeconds: 120,
  timerRunning: false,
  timerLabel: 'Klaar om te starten',
  players: ['','',...],
  assignments: {},
  coalitie: { titel: '', premier: '', ministeries: {}, punten: ['',...] },
  amendementen: {},
  gameId: '1234567890',
  currentVoteTopic: null,
  currentVoteLabel: '',
}
```

## Broadcast events (paneel → TV)

```js
broadcast('phase', { phase: 'r2' });
broadcast('timer', { seconds: 120, label: 'Pitch', done: false });
broadcast('seats', { seats, coalition, parties });
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

## Supabase tabellen

| Tabel | Doel |
|-------|------|
| `game_sessions` | Game state, actieve stemmingen, agenda's |
| `player_votes` | Individuele stemmen van spelers |
| `election_votes` | Verkiezingsstemmen (ronde 1) |

## Stijl & Design

- **Thema:** Donker parlementair, jaren-70 Tweede Kamer vibe
- **Kleuren:** Navy `#0a1628`, Goud `#c9a84c`, Cream `#f5f0e8`, Groen `#27ae60`, Rood `#c0392b`
- **Fonts:** Playfair Display (titels), EB Garamond (body), Oswald (UI/labels)
- **CSS:** Inline in HTML, geen externe stylesheets

## Security

- Supabase anon key is zichtbaar in frontend — OK voor demo-use, niet ideaal voor productie.
- Geen gevoelige data in de app (alleen spelstatus en stemmen).
- Voor productie: RLS policies in Supabase instellen.

## Veelvoorkomende wijzigingen

### Partij toevoegen
1. Voeg toe aan `data.js`: `PARTIES`, `PARTY_LEADERS`, `PARTY_QUIRKS`, `PARTY_CROWN_JEWELS`, `PARTY_INTROS`, `PARTY_BONUSES`, `PARTY_DEALBREAKERS`.
2. Voeg kleur toe in `index.html` (zoek `PARTY_COLORS`).
3. Voeg standpunten toe in `player.html` (`PARTY_STANDPUNTEN`, `PARTY_MUST_HAVE`, `PARTY_RELATIES`, `PARTY_SPEELTIP`).
4. Check `AGENDA_DISTRIBUTION` in `data.js` — meestal geen wijziging nodig.

### Nieuwe crisis-/wetkaart
1. Zoek in `index.html` naar `CRISIS_R2`, `CRISIS_R4_POOL` of `LAWS_POOL`.
2. Voeg object toe aan de array. Geen andere bestanden nodig.

### Nieuwe timer-duur of drempelwaarde
1. `config.js` bevat `TIMER_WARNING_THRESHOLD` en `TIMER_DANGER_THRESHOLD`.
2. De timer knoppen zelf staan inline in `index.html`.

## Testen

- Open `index.html` en `tv.html` in **dezelfde browser** (anders werkt localStorage niet).
- Voor speler-app: internet vereist, gebruik `?party=PPP&game=TEST123` op `player.html`.
- Reset spel: "Reset alles" knop in paneel, of clear localStorage.
