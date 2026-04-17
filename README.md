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

### Optie 3: Docker (met HTTPS)

```bash
cp .env.example .env
# Pas eventueel HTTP_PORT en HTTPS_PORT aan in .env
sudo docker compose up -d
```

De app is dan bereikbaar op:
- **HTTP**: `http://localhost:8081` (standaard)
- **HTTPS**: `https://localhost` of `https://<jouw-ip>` met self-signed certificaat

### Spelersdashboard testen

De speler-app heeft internet en Supabase nodig. Voor een test kun je een speler openen met:

```
player.html?party=PPP&game=TEST123
```

Vervang `PPP` door de partijcode en `TEST123` door het game-ID dat het paneel toont.

## Testen & Debuggen

Om het spel zonder 6–10 fysieke spelers te testen zijn twee hulpmiddelen ingebouwd:

### Debug-paneel (`?debug=1`)
Open het spelleiderspaneel met de URL-parameter `?debug=1`:

```
https://jouw-ip/index.html?debug=1
```

In de sidebar verschijnt een rood **Debug / Simulatie** paneel met:
- **Start testspel (6 of 10)** — selecteert willekeurig partijen, vult bot-namen in en start het spel
- **Simuleer verkiezingsstemmen** — injecteert willekeurige verkiezingsstemmen in Supabase
- **Simuleer stemmen (random / coalitie=voor)** — vult ontbrekende stemmen in Supabase voor de huidige stemming
- **Timer shortcuts** — zet de timer op 5 sec of 0 (skip)
- **Forceer volgende fase** — springt direct naar de volgende ronde

### Solo-modus (`?solo=1`)
Open het paneel met `?solo=1`:

```
https://jouw-ip/index.html?solo=1
```

In deze modus:
- Supabase wordt volledig omzeild
- Bij elke stemming verschijnt er een overlay in het paneel waarin je per partij direct **voor/tegen** kunt kiezen (met een 🎲 Random knop)
- Bij verkiezingen krijg je een overlay om per partij de **10 stemfiches** te verdelen (ook met Random)
- Ideaal voor snelle flow-tests **zonder internet**

**Beide tegelijk:** `https://jouw-ip/index.html?debug=1&solo=1`

## Features

### Informateur-paneel (`index.html`)
- **Fase-navigatie** — stap-voor-stap instructies per ronde
- **Partijselectie** — kies 6–10 partijen uit 15 beschikbare
- **Scenario-keuze** — kies uit meerdere scenario's (Standaard, Vergeetputje, Chaos, Minority, etc.)
- **Zetelteller** — live aanpassen per partij, coalitie aanvinken
- **Timer** — snelknoppen voor 30 sec / 2 min / 10 min etc.
- **Crisiskaarten** — onthullen met dramatisch effect, willekeurig trekken
- **Wetsvoorstellen** — tekst + hint per wet, uitslag vastleggen, amendementen toevoegen
- **Stemming** — groen/rood per partij, automatische zeteltelling, uitslag
- **Speed-debat** — automatisch paren maken met bijpassende stellingen
- **Puntentelling** — handmatig bijhouden per categorie per partij
- **Geheime agenda's** — per partij onthullen of alles tegelijk
- **Coalitieakkoord** — titel, premier, ministeries en punten invullen
- **Superkrachten Informateur** — bonuszetels, veto, gedwongen huwelijk, pers bellen
- **Debug & Solo modus** — ingebouwde testtools voor snelle validatie

### TV-scherm (`tv.html`)
- Ontvang live updates van het informateur-paneel
- Grote zetelverdeling met coalitie-highlight en kleurcodering
- Stemmingsresultaten met groot vóór/tegen teller
- Crisis- en wetsvoorstelonthullingen met animaties
- Geheime agenda onthulling per partij
- Scorebord tussenstand
- Winnaar-reveal met eindranglijst
- Exit-poll animatie voor verkiezingen
- Tutorial / speluitleg modus

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
- **Scenarios** met variabele dealbreakers, bonussen, dilemmas en plot twists
- Volledige puntentelling

## Tech stack

- Puur HTML/CSS/JS — geen frameworks, geen build tools
- Google Fonts (Playfair Display, EB Garamond, Oswald)
- `localStorage` voor communicatie tussen paneel en TV-scherm
- **Supabase** voor realtime multiplayer (speler stemmen + partijdata)
- Docker + nginx voor hosting (inclusief self-signed SSL)

## Projectstructuur

```
formatie/
├── index.html                         # Informateur-paneel (spelleider)
├── tv.html                            # Publiek TV-scherm
├── player.html                        # Spelersdashboard app
├── config.js                          # Supabase config + app instellingen
├── data.js                            # Centrale data (partijen, quirks, agenda's)
├── data-scenarios.js                  # Scenario configuraties
├── data-expanded.js                   # Extra spelinhoud
├── docker-compose.yml                 # Docker setup (HTTP + HTTPS)
├── nginx.conf                         # Nginx configuratie
├── ssl.crt / ssl.key                  # Self-signed SSL certificaat
├── start.sh                           # Dev server start script
├── .env.example                       # Voorbeeld environment variables
├── De_Formatie_Spellenavond_v2.docx   # Bronbestand spelregels
├── README.md                          # Dit bestand
├── CLAUDE.md                          # Uitgebreide technische context
└── AGENTS.md                          # Agent-werkcontext & debug/solo docs
```

## Meer informatie

- Zie `CLAUDE.md` voor uitgebreide technische context, state management, broadcast events en backlog.
- Zie `AGENTS.md` voor agent-werkcontext, waar je wat aanpast, constraints, en debug/solo modus documentatie.
