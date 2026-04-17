# ⚖ De Formatie — Interactieve Spelleiding App

Een volledig interactieve game master app voor **De Formatie**, een politiek gezelschapsspel voor **6–10 spelers**.

## Wat is het?

De Formatie is een politieke spellenavond waarbij spelers Nederlandse politieke partijen spelen en proberen een coalitie te vormen. De app begeleidt de hele avond — van campagnepitch tot kabinetscrisis.

## Hoe werkt het

De app bestaat uit **drie HTML-bestanden**:

| Bestand | Doel | Gebruikt door |
|---|---|---|
| `index.html` | Informateur-paneel (spelleider) | Spelleider op laptop |
| `tv.html` | Publiek scherm | Op de TV via HDMI/AirPlay |
| `player.html` | Spelersdashboard (mobiel) | Spelers op hun telefoon |

**Paneel ↔ TV** communiceren via `localStorage` op dezelfde computer.  
**Paneel ↔ Spelers** communiceren via Supabase over internet, zodat spelers op hun telefoon kunnen stemmen en hun partijinfo zien.

> ⚠️ Het TV-scherm en het informateur-paneel moeten in de **zelfde browser op dezelfde computer** open staan — ze communiceren via `localStorage`.

## Snel starten

1. Clone dit repo
2. Open `index.html` in een browser (werkt lokaal)
3. Klik op **"📺 Open TV-scherm"** — opent `tv.html` in een apart venster
4. Zet het TV-venster op de televisie via HDMI/AirPlay/screen mirroring
5. Spelers gaan naar `player.html?party=XXX&game=YYYYYY` op hun telefoon
6. Spelen maar!

## Localhost tutorial

Wil je de app via een lokale server draaien — handig als je fonts offline wilt laden, of voor ontwikkeling — gebruik dan één van de opties hieronder.

### Optie 1: Python (geen installatie nodig)

```bash
cd pad/naar/formatie
python3 -m http.server 8080
```

Open daarna:
- **Informateur-paneel**: `http://localhost:8080/index.html`
- **TV-scherm**: `http://localhost:8080/tv.html`
- **Spelersdashboard**: `http://localhost:8080/player.html?party=PPP&game=123456`

Stop de server met `Ctrl+C`.

### Optie 2: start.sh

```bash
./start.sh
```

Dit start de Python server op poort 8080 en opent het paneel automatisch in je browser.

### Optie 3: Docker

```bash
cp .env.example .env
# Pas eventueel HTTP_PORT aan in .env
sudo docker compose up -d
```

De app is dan bereikbaar op het ingestelde poortnummer (standaard `8081`).

### Spelersdashboard testen

De speler-app heeft internet en Supabase nodig. Voor een test kun je een speler openen met:

```
player.html?party=PPP&game=TEST123
```

Vervang `PPP` door de partijcode en `TEST123` door het game-ID dat het paneel toont.

## Features

### Informateur-paneel (`index.html`)
- **Fase-navigatie** — stap-voor-stap instructies per ronde
- **Partijselectie** — kies 6–10 partijen uit 15 beschikbare
- **Zetelteller** — live aanpassen per partij, coalitie aanvinken
- **Timer** — snelknoppen voor 30 sec / 2 min / 10 min etc.
- **Crisiskaarten** — onthullen met dramatisch effect, willekeurig trekken
- **Wetsvoorstellen** — tekst + hint per wet, uitslag vastleggen
- **Stemming** — groen/rood per partij, automatische zeteltelling, uitslag
- **Puntentelling** — handmatig bijhouden per categorie per partij
- **Geheime agenda's** — per partij onthullen of alles tegelijk
- **Superkrachten Informateur** — bonuszetels, veto, gedwongen huwelijk, pers bellen

### TV-scherm (`tv.html`)
- Ontvang live updates van het informateur-paneel
- Grote zetelverdeling met coalitie-highlight en kleurcodering
- Stemmingsresultaten met groot vóór/tegen teller
- Crisis- en wetsvoorstelonthullingen met animaties
- Geheime agenda onthulling per partij
- Scorebord tussenstand
- Winnaar-reveal met eindranglijst
- Exit-poll animatie voor verkiezingen

### Spelersdashboard (`player.html`)
- Toon partijinfo: standpunten, kroonjuweel, must-have, dealbreaker
- Karakter-quirk en speeltip voor roleplay
- Geheime bonus en geheime agenda (ronde 4)
- Stem "voor" of "tegen" tijdens live stemmingen
- Verkiezingsstemmen uitbrengen (ronde 1)

## Spelinhoud

Het spel bevat:
- **15 politieke partijen** (PPP, FBL, KCV, WIFI, DAM, VBB, KKB, DDP, FRR, PAN, OMA, BNB, WOK, KGW, SVB)
- **4 rondes**: Campagne → Formatie → Regeerperiode → Kabinetscrisis
- **25 formatiecrisiskaarten** (willekeurig te trekken)
- **20 wetsvoorstellen** in de pool, waarvan er 8 per spel worden gekozen
- **6 kabinetscrisiskaarten** (oplopend in ernst)
- **4 typen geheime agenda's** (Loyalist / Opstandeling / Opportunist / Kingmaker)
- Volledige puntentelling

## Tech stack

- Puur HTML/CSS/JS — geen frameworks, geen build tools
- Google Fonts (Playfair Display, EB Garamond, Oswald)
- `localStorage` voor communicatie tussen paneel en TV-scherm
- **Supabase** voor realtime multiplayer (speler stemmen + partijdata)
- Docker + nginx voor hosting

## Projectstructuur

```
formatie/
├── index.html                         # Informateur-paneel (spelleider)
├── tv.html                            # Publiek TV-scherm
├── player.html                        # Spelersdashboard app
├── config.js                          # Supabase config + app instellingen
├── data.js                            # Centrale data (partijen, quirks, agenda's)
├── docker-compose.yml                 # Docker setup
├── nginx.conf                         # Nginx configuratie
├── start.sh                           # Dev server start script
├── .env.example                       # Voorbeeld environment variables
├── De_Formatie_Spellenavond_v2.docx   # Bronbestand spelregels
├── README.md                          # Dit bestand
├── CLAUDE.md                          # Uitgebreide technische context
└── AGENTS.md                          # Agent-werkcontext
```

## Meer informatie

- Zie `CLAUDE.md` voor uitgebreide technische context, state management, broadcast events en backlog.
- Zie `AGENTS.md` voor agent-werkcontext (waar je wat aanpast, constraints, etc.).
