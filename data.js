// ============================================================
// DATA MODULE
// ============================================================
// Centrale data voor De Formatie App
// Gebruikt in: index.html, tv.html, player.html
// ============================================================

// ============================================================
// PARTIJEN
// ============================================================
const PARTIES = [
  { id: 'PPP',  name: 'PPP',  full: 'Partij voor Plant en Planeet' },
  { id: 'FBL',  name: 'FBL',  full: 'Front voor Betaalbaar Luieren' },
  { id: 'KCV',  name: 'KCV',  full: 'Kunst, Cultuur en Vlaai' },
  { id: 'WIFI', name: 'WIFI', full: 'Werkelijk Innovatief Fantastisch Internet' },
  { id: 'DAM',  name: 'DAM',  full: 'De Absolute Middenpartij' },
  { id: 'VBB',  name: 'VBB',  full: 'Verbond voor Bitterballen en Borrel' },
  { id: 'KKB',  name: 'KKB',  full: 'De Koninklijke Kaasbeweging' },
  { id: 'DDP',  name: 'DDP',  full: 'De Dikke Portemonnee' },
  { id: 'FRR',  name: 'FRR',  full: 'Front voor Rust, Regels en Regelmaat' },
  { id: 'PAN',  name: 'PAN',  full: 'Partij Absoluut Niks' },
  { id: 'OMA',  name: 'OMA',  full: 'Ouderenzorg, Memoires en Appeltaart' },
  { id: 'BNB',  name: 'BNB',  full: 'Boer en Nederlandsch Boerenverstand' },
  { id: 'WOK',  name: 'WOK',  full: 'Wonen of Kraken' },
  { id: 'KGW',  name: 'KGW',  full: 'Kerk, Gezin en Waarden' },
  { id: 'SVB',  name: 'SVB',  full: 'Sportief Verbond voor Beweging' },
];

const PARTY_LEADERS = {
  PPP:  'Bloem Windmolen-de Vries',
  FBL:  'Sjaak van de Hangmat',
  KCV:  'Floris-Jan van het Podium',
  WIFI: 'Byte van Dijkstra',
  DAM:  'Jan-Willem Gemiddeld',
  VBB:  'Henk Krokansen',
  KKB:  'Gouda van Leerdammer',
  DDP:  'Maximiliansen van Cashflow III',
  FRR:  'Gerrit Klokslag',
  PAN:  'Nihil "Nelis" van Niansen',
  OMA:  'Tante Riet van de Rolstoel',
  BNB:  'Kees van den Trekker',
  WOK:  'Vera van de Wachtlijst',
  KGW:  'Dominee Adriaan van het Kruispad',
  SVB:  'Duco Spierenboer-Hardloper',
};

const PARTY_QUIRKS = {
  PPP:  'Mag het woord "economie" niet zeggen → zegt "eco-harmonie" + boom-knuffel-gebaar',
  FBL:  'Gaapt demonstratief, stelt constant voor om pauze te nemen',
  KCV:  'Citeert steeds verzonnen dichters en filosofen',
  WIFI: 'Vervangt alles door Engelse tech-termen ("coalition-API updaten")',
  DAM:  'Kan nooit ergens definitief voor of tegen zijn, maakt zinnen nooit af',
  VBB:  'Onderbouwt elk argument met een vergelijking met eten',
  KKB:  'Relateert werkelijk alles aan kaas',
  DDP:  'Noemt alles een "investering" of "groeikans"',
  FRR:  'Houdt iedereen streng aan de tijd, kijkt constant op horloge',
  PAN:  'Is het automatisch oneens met het laatste wat iemand zei',
  OMA:  'Vergeet halverwege wat ze wilde zeggen en vertelt een irrelevant verhaal over 1987',
  BNB:  'Elke politieke stelling "bewijst" hij met een anekdote over zijn koe Betsie',
  WOK:  'Elke zin eindigt met "...en mijn wachtlijst staat al op jaar zeven"',
  KGW:  'Citeert bijbelteksten die totaal niet van toepassing zijn, volkomen serieus',
  SVB:  'Elk debatpunt begint met "als in topsport..." en eindigt met aanmoedigend "kom op team!"',
};

const PARTY_CROWN_JEWELS = {
  PPP:  'Vleesvrije Werkweek',
  FBL:  '3-daagse werkweek',
  KCV:  'Nationale Vlaaidag als officiële feestdag',
  WIFI: 'WiFi als grondrecht',
  DAM:  'Werkgroep over het woord "draagvlak"',
  VBB:  'BTW op snacks naar 0%',
  KKB:  'Ministerie van Zuivel',
  DDP:  'Belastingverlaging',
  FRR:  'De avondklok',
  PAN:  'Minimaal één wet afschaffen',
  OMA:  'Pensioenleeftijd terug naar 60 + gratis stamppot in elk verzorgingstehuis',
  BNB:  'Alle stikstofregels afgeschaft',
  WOK:  'Maximale huurprijs €400 per maand',
  KGW:  'Zondag als verplichte nationale rustdag',
  SVB:  'Verplicht gym-uur per werkdag voor alle ambtenaren',
};

const PARTY_INTROS = {
  PPP:  'De enige partij die de planeet boven de portemonnee stelt. Bloem Windmolen-de Vries strijdt voor een vleesvrije werkweek en een groenere toekomst — ook als dat "eco-harmonisch" klinkt.',
  FBL:  'Rust is een recht, geen luxe. Sjaak van de Hangmat pleit voor de 3-daagse werkweek en betaalbaar niksdoen voor iedereen. Eventueel na de pauze.',
  KCV:  'Schoonheid, cultuur en gebak als staatszaak. Floris-Jan van het Podium wil de Nationale Vlaaidag invoeren als officiële feestdag. De filosofen zijn het erover eens — ook al bestaan ze niet.',
  WIFI: 'Internet is een grondrecht. Byte van Dijkstra wil WiFi voor iedereen en innovatie als nationaal speerpunt. De coalition-API moet worden geüpdatet.',
  DAM:  'Niemand blij, niemand boos. Jan-Willem Gemiddeld zoekt draagvlak, vormt werkgroepen en houdt zijn opties open. Definitief besluiten doet hij misschien... later.',
  VBB:  'Gezelligheid is beleid. Henk Krokansen wil de BTW op snacks naar 0% — want een land dat samenkomt bij bitterballen, formeert beter.',
  KKB:  'Nederland is kaas, kaas is Nederland. Gouda van Leerdammer eist een Ministerie van Zuivel en beschermt de Hollandse identiteit met hart en ziel.',
  DDP:  'Minder belasting, meer groei. Maximiliansen van Cashflow III ziet in elke uitgave een investering en in elke bezuiniging een groeikans. De markt lost het op.',
  FRR:  'Orde, structuur en een avondklok. Gerrit Klokslag houdt iedereen aan de tijd en eist concrete regels in elk akkoord. Vergaderen zonder agenda is bij FRR verboden.',
  PAN:  'Minder is meer. Nihil "Nelis" van Niansen wil wetten schrappen, regels afschaffen en de overheid terugdringen. Hij is het trouwens niet eens met wat net werd gezegd.',
  OMA:  'Vroeger was alles beter, en dat bewijzen wij met cijfers. Tante Riet van de Rolstoel strijdt voor een eerlijk pensioen en gratis stamppot in elk verzorgingstehuis.',
  BNB:  'Gewoon boerenverstand, dat is alles wat dit land nodig heeft. Kees van den Trekker laat zijn koe Betsie zien hoe beleid werkt en eist dat alle stikstofregels per direct de prullenbak in gaan.',
  WOK:  'Een dak boven je hoofd is geen luxe, het is een recht. Vera van de Wachtlijst staat zelf op jaar zeven van de wachtlijst en vecht voor een maximale huurprijs van €400.',
  KGW:  'Het gezin is de hoeksteen van de samenleving, en de zondag is heilig. Dominee Adriaan van het Kruispad baseert elk standpunt op een passende bijbeltekst.',
  SVB:  'Een gezond kabinet begint met een gezond lichaam. Duco Spierenboer-Hardloper wil een verplicht gym-uur voor alle ambtenaren en behandelt elke coalitieonderhandeling als een teamwedstrijd. Kom op team!',
};

const PARTY_DEALBREAKERS = {
  PPP: 'KKB', FBL: 'DDP', KCV: 'PAN', WIFI: 'FRR',
  DAM: null,   VBB: 'PPP', KKB: 'PPP', DDP: 'FBL', FRR: 'PAN', PAN: 'FRR',
  OMA: 'WIFI', BNB: 'PPP', WOK: 'DDP', KGW: 'FBL', SVB: 'FBL',
};

const PARTY_BONUSES = {
  PPP:  'Wordt Minister van Klimaat & Natuur (+3)',
  FBL:  'Woord "vrij" of "rust" staat in de TITEL van het akkoord (+3)',
  KCV:  'Nationale Vlaaidag wordt écht feestdag in het akkoord (+3)',
  WIFI: 'Woord "digitaal", "innovatie" of "tech" staat in het akkoord (+3)',
  DAM:  'In coalitie zóNDER dat één DAM-standpunt letterlijk in akkoord staat (+3)',
  VBB:  'Wordt Minister van Feestelijk Beleid (+3)',
  KKB:  'Woord "kaas" staat in de TITEL van het akkoord (+3)',
  DDP:  'Wordt Minister van Financiën (+3)',
  FRR:  'Minimaal 4 concrete regels/verplichtingen in het akkoord (+3)',
  PAN:  'Kabinet is een minderheidskabinet (+3)',
  OMA:  'Woord "pensioen" staat in de TITEL van het akkoord (+3)',
  BNB:  'Geen enkele milieuregel in het akkoord (+3)',
  WOK:  'Maximale huurprijs staat letterlijk in het akkoord (+3)',
  KGW:  'Zondag als rustdag staat in het akkoord (+3)',
  SVB:  'Woord "sport" of "gezondheid" staat in het akkoord (+3)',
};

// ============================================================
// AGENDA DEFINITIES
// ============================================================
const AGENDA_DEFINITIONS = {
  LOYALIST:     { label: '🏛 Loyalist',     text: 'Jij steunt de Minister-President altijd. Stem bij ALLE 6 kabinetscrises VOOR het kabinet (of onthouding). Doe je dit, verdien je +3 punten.', goal: 'Stem NOOIT tegen het kabinet bij de crises.' },
  OPSTANDELING: { label: '✊ Opstandeling',  text: 'Jij wil het kabinet ten val brengen. Stem bij minimaal 2 van de 6 crises TEGEN het kabinet. Doe je dit, verdien je +3 punten.', goal: 'Stem minimaal 2× TEGEN het kabinet.' },
  OPPORTUNIST:  { label: '🎲 Opportunist',   text: 'Jij zit in de coalitie maar saboteert van binnenuit. Zit in de coalitie EN stem minimaal 1× TEGEN het kabinet bij een crisis. Doe je dit, +3 punten.', goal: 'In coalitie + stem minimaal 1× TEGEN.' },
  KINGMAKER:    { label: '👑 Kingmaker',     text: 'Jij zit NIET in de coalitie, maar de MP overleeft toch alle 6 crises. Als dit lukt zonder jou in de coalitie, verdien je +3 punten.', goal: 'Niet in coalitie, maar MP overleeft alles.' },
};

// ============================================================
// AGENDA VERDELING (aantal spelers → agenda verdeling)
// ============================================================
const AGENDA_DISTRIBUTION = {
  6:  ['LOYALIST','LOYALIST','OPSTANDELING','OPSTANDELING','OPPORTUNIST','KINGMAKER'],
  7:  ['LOYALIST','LOYALIST','LOYALIST','OPSTANDELING','OPSTANDELING','OPPORTUNIST','KINGMAKER'],
  8:  ['LOYALIST','LOYALIST','LOYALIST','OPSTANDELING','OPSTANDELING','OPSTANDELING','OPPORTUNIST','KINGMAKER'],
  9:  ['LOYALIST','LOYALIST','LOYALIST','OPSTANDELING','OPSTANDELING','OPSTANDELING','OPPORTUNIST','OPPORTUNIST','KINGMAKER'],
  10: ['LOYALIST','LOYALIST','LOYALIST','OPSTANDELING','OPSTANDELING','OPSTANDELING','OPPORTUNIST','OPPORTUNIST','KINGMAKER','KINGMAKER'],
};

// ============================================================
// FASE LABELS (voor TV scherm)
// ============================================================
const PHASE_LABELS = {
  prep:  'Voorbereiding',
  r1:    'Ronde 1 — Campagne',
  r2:    'Ronde 2 — Formatie',
  r3:    'Ronde 3 — Regeerperiode',
  r4:    'Ronde 4 — Kabinetscrisis',
  score: 'Eindstand',
};

// ============================================================
// EXPORTEER VOOR TESTING (Node.js)
// ============================================================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PARTIES,
    PARTY_LEADERS,
    PARTY_QUIRKS,
    PARTY_CROWN_JEWELS,
    PARTY_INTROS,
    PARTY_DEALBREAKERS,
    PARTY_BONUSES,
    AGENDA_DEFINITIONS,
    AGENDA_DISTRIBUTION,
    PHASE_LABELS
  };
}
