# ⚖ De Formatie — Interactieve Spelleiding App

Een volledig interactieve game master app voor **De Formatie**, een politiek gezelschapsspel voor 11 spelers.

## Wat is het?

De Formatie is een politieke spellenavond waarbij spelers Nederlandse politieke partijen spelen en proberen een coalitie te vormen. De app begeleidt de hele avond — van campagnepitch tot kabinetscrisis.

## Hoe werkt het

De app bestaat uit **twee HTML-bestanden** die samenwerken via `localStorage`:

| Bestand | Doel | Gebruikt door |
|---|---|---|
| `index.html` | Informateur-paneel | Spelleider op laptop |
| `tv.html` | Publiek scherm | Iedereen — op de TV |

De spelleider beheert alles op de laptop. Wat verzonden wordt verschijnt automatisch op het TV-scherm (geopend als apart browservenster, geprojecteerd via HDMI of screen mirroring).

## Snel starten

1. Clone dit repo
2. Open `index.html` in een browser (geen server nodig — werkt lokaal)
3. Klik op **"📺 Open TV-scherm"** — opent `tv.html` in een apart venster
4. Zet het TV-venster op de televisie via HDMI/AirPlay/screen mirroring
5. Spelen maar

> ⚠️ Beide vensters moeten in **dezelfde browser op dezelfde computer** open staan — ze communiceren via `localStorage`.

## Features

### Informateur-paneel (`index.html`)
- **Fase-navigatie** — stap-voor-stap instructies per ronde
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

## Spelinhoud

Het spel bevat:
- **10 politieke partijen** (PPP, FBL, KCV, WIFI, DAM, VBB, KKB, DDP, FRR, PAN)
- **4 rondes**: Campagne → Formatie → Regeerperiode → Kabinetscrisis
- **10 formatiecrisiskaarten** (willekeurig te trekken)
- **8 wetsvoorstellen** met informateur-hints
- **6 kabinetscrisiskaarten** (oplopend in ernst)
- **10 geheime agenda's** (Loyalist / Opstandeling / Opportunist / Kingmaker)
- Volledige puntentelling

## Tech stack

- Puur HTML/CSS/JS — geen frameworks, geen build tools
- Google Fonts (Playfair Display, EB Garamond, Oswald)
- `localStorage` voor communicatie tussen paneel en TV-scherm
- Werkt offline (na eerste load van fonts)

## Projectstructuur

```
formatie/
├── index.html      # Informateur-paneel (spelleider)
├── tv.html         # Publiek TV-scherm
├── README.md       # Dit bestand
└── CLAUDE.md       # Context voor Claude Code
```

## Ideeën voor uitbreiding

Zie `CLAUDE.md` voor een gedetailleerde backlog en technische context.
