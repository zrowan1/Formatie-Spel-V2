// ============================================================
// SCENARIO MODULE — Spelmodi voor De Formatie
// ============================================================
// Elke scenario verandert fundamentele regels van het spel.
// Wordt geladen in index.html en beïnvloedt state & UI.
// ============================================================

const SCENARIOS = {
  standard: {
    id: 'standard',
    name: 'Standaard',
    subtitle: 'De klassieke Formatie-ervaring',
    description: 'Meerderheidscoalitie, 8 wetten, 6 crises, 150 zetels. Zoals het bedoeld is.',
    icon: '⚖',
    config: {
      lawCount: 8,
      crisisR2Count: null,      // null = alle beschikbaar
      crisisR4Count: 6,
      majorityThreshold: null,  // null = standaard berekening
      allowMinority: false,
      agendasEnabled: true,
      newsEvents: false,
      plotTwists: false,
      dilemmas: false,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  chaos: {
    id: 'chaos',
    name: 'Chaos-Formatie',
    subtitle: 'Dubbel zoveel crises, willekeurige verkiezingen',
    description: '12 formatiecrisiskaarten, verkiezingen via dobbelsteen, niets is voorspelbaar.',
    icon: '🌪',
    config: {
      lawCount: 8,
      crisisR2Count: 12,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: false,
      agendasEnabled: true,
      newsEvents: false,
      plotTwists: true,
      dilemmas: false,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  minority: {
    id: 'minority',
    name: 'Minderheidskabinet',
    subtitle: 'Coalitie onder de 50% is toegestaan',
    description: 'Coalitie mag onder de 50% zitten, maar elke wet kost een extra stemronde. 6 wetten.',
    icon: '🪑',
    config: {
      lawCount: 6,
      crisisR2Count: null,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: true,
      agendasEnabled: true,
      newsEvents: false,
      plotTwists: false,
      dilemmas: false,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  speed: {
    id: 'speed',
    name: 'De Snelle Formatie',
    subtitle: 'Alles gaat 2× zo snel',
    description: '4 wetten, 3 crises, kortere timers. Voor als je maar één uur hebt.',
    icon: '⏱',
    config: {
      lawCount: 4,
      crisisR2Count: 10,
      crisisR4Count: 3,
      majorityThreshold: null,
      allowMinority: false,
      agendasEnabled: true,
      newsEvents: false,
      plotTwists: false,
      dilemmas: false,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  memoryhole: {
    id: 'memoryhole',
    name: 'Het Vergeetputje',
    subtitle: 'Geen agenda\'s — in plaats daarvan dilemma\'s',
    description: 'Geen geheime agenda\'s. Elke speler krijgt een dilemma dat halverwege wordt onthuld.',
    icon: '🕳',
    config: {
      lawCount: 8,
      crisisR2Count: null,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: false,
      agendasEnabled: false,
      newsEvents: false,
      plotTwists: false,
      dilemmas: true,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  mediahype: {
    id: 'mediahype',
    name: 'Mediahype',
    subtitle: 'Elke ronde een nieuwsbericht dat de zetels beweegt',
    description: 'Elke ronde start met een nieuwsbericht: +2 of −2 zetels voor willekeurige partijen.',
    icon: '📰',
    config: {
      lawCount: 8,
      crisisR2Count: null,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: false,
      agendasEnabled: true,
      newsEvents: true,
      plotTwists: false,
      dilemmas: false,
      variableDealbreakers: false,
      variableBonuses: false,
    }
  },
  dynasties: {
    id: 'dynasties',
    name: 'Dynastieën',
    subtitle: 'Wisselende dealbreakers & bonussen',
    description: 'Dealbreakers en geheime bonussen worden willekeurig getrokken per spel. Nooit hetzelfde.',
    icon: '🎭',
    config: {
      lawCount: 8,
      crisisR2Count: null,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: false,
      agendasEnabled: true,
      newsEvents: false,
      plotTwists: false,
      dilemmas: false,
      variableDealbreakers: true,
      variableBonuses: true,
    }
  },
  allin: {
    id: 'allin',
    name: 'Alles op Alles',
    subtitle: 'De complete chaos-ervaring',
    description: 'Mediahype + plot twists + variabele dynamiek. Alles tegelijk. Alleen voor veteranen.',
    icon: '🔥',
    config: {
      lawCount: 8,
      crisisR2Count: 12,
      crisisR4Count: 6,
      majorityThreshold: null,
      allowMinority: true,
      agendasEnabled: true,
      newsEvents: true,
      plotTwists: true,
      dilemmas: false,
      variableDealbreakers: true,
      variableBonuses: true,
    }
  }
};

// Helper: huidige scenario config ophalen uit state
function getScenarioConfig(state) {
  const id = state?.scenario || 'standard';
  return SCENARIOS[id]?.config || SCENARIOS.standard.config;
}

function getScenarioInfo(state) {
  const id = state?.scenario || 'standard';
  return SCENARIOS[id] || SCENARIOS.standard;
}

// ============================================================
// DILEMMAS (voor "Het Vergeetputje" scenario)
// ============================================================
const DILEMMAS_POOL = [
  { text: 'Je partijleider heeft een controversiële uitspraak gedaan. Je MOET je excuses aanbieden aan één andere partij — die krijgt +2 zetels van jou.', type: 'apology' },
  { text: 'Een anonieme bron lekt dat je geheime deals hebt gemaakt. Je moet NU één deal publiekelijk onthullen of 3 zetels verliezen.', type: 'leak' },
  { text: 'Je campagne is door het dak gegaan! Kies: +3 zetels voor jezelf OF geef +2 zetels aan twee andere partijen.', type: 'campaign' },
  { text: 'Een coalitiepartner vraagt om een "gunst". Stem de volgende wet automatisch VOOR, ongeacht inhoud, of verlies je coalitieplek.', type: 'favor' },
  { text: 'De pers ontdekt je ware agenda. Je moet een nieuwe "publieke" agenda verzinnen en die 1 minuut verdedigen.', type: 'expose' },
  { text: 'Je partij is intern verdeeld. Kies: splits je zetels (geef 3 aan een nieuwe "splinter") of verlies 2 zetels aan onvrede.', type: 'split' },
  { text: 'Een lobbyist biedt je een deal: +4 zetels nu, maar je MOET je kroonjuweel opgeven in het akkoord.', type: 'lobby' },
  { text: 'Je wordt gevraagd voor een live TV-debat. Win je het (groep bepaalt): +3 zetels. Verlies je: -2 zetels.', type: 'debate' },
];

function drawDilemmas(activePartyIds) {
  const shuffled = [...DILEMMAS_POOL].sort(() => Math.random() - 0.5);
  const result = {};
  activePartyIds.forEach((id, i) => {
    result[id] = shuffled[i % shuffled.length];
  });
  return result;
}

// ============================================================
// NEWS EVENTS (voor "Mediahype" scenario)
// ============================================================
const NEWS_EVENTS = [
  { headline: 'PEILING SCHOK: Oppositie wint aanhang', effect: 'opposition_boost', text: 'De grootste oppositiepartij krijgt +2 zetels.' },
  { headline: 'SOCIAL MEDIA STORM rond één partij', effect: 'random_boost', text: 'Een willekeurige partij krijgt +2 zetels (viral moment).' },
  { headline: 'LEK UIT HET KABINET', effect: 'random_drop', text: 'Een willekeurige partij verliest −2 zetels (schandaal).' },
  { headline: 'ECONOMISCH HERSTEL GEFEILD', effect: 'all_stable', text: 'Iedereen houdt zetels, maar coalitiepartijen krijgen +1 zetel.' },
  { headline: 'EU-TOESPRAAK MIST LADING', effect: 'mp_drop', text: 'De grootste coalitiepartij verliest −2 zetels.' },
  { headline: 'TIKTOK-TREND HELPT KLEINE PARTIJ', effect: 'smallest_boost', text: 'De kleinste partij krijgt +2 zetels.' },
  { headline: 'ONWEER OP KONINGSDAG', effect: 'festive_drop', text: 'VBB en KCV verliezen elk −2 zetels (feestverstoring).' },
  { headline: 'KLIMAATRAPPORT VRIJGEVEN', effect: 'green_boost', text: 'PPP krijgt +2 zetels, BNB verliest −2 zetels.' },
];

function drawNewsEvent(activePartyIds, seats) {
  const ev = NEWS_EVENTS[Math.floor(Math.random() * NEWS_EVENTS.length)];
  const result = { ...ev, targets: [], delta: 0 };
  const sorted = [...activePartyIds].sort((a, b) => (seats[b] || 0) - (seats[a] || 0));
  switch (ev.effect) {
    case 'opposition_boost':
      // grootste niet-coalitiepartij — fallback: kleinste
      result.targets = [sorted[sorted.length - 1] || sorted[0]];
      result.delta = 2;
      break;
    case 'random_boost':
      result.targets = [activePartyIds[Math.floor(Math.random() * activePartyIds.length)]];
      result.delta = 2;
      break;
    case 'random_drop':
      result.targets = [activePartyIds[Math.floor(Math.random() * activePartyIds.length)]];
      result.delta = -2;
      break;
    case 'all_stable':
      result.targets = [];
      result.delta = 0;
      break;
    case 'mp_drop':
      result.targets = [sorted[0]];
      result.delta = -2;
      break;
    case 'smallest_boost':
      result.targets = [sorted[sorted.length - 1]];
      result.delta = 2;
      break;
    case 'festive_drop':
      result.targets = ['VBB', 'KCV'].filter(id => activePartyIds.includes(id));
      result.delta = -2;
      break;
    case 'green_boost':
      result.targets = ['PPP'];
      result.delta = 2;
      // BNB drop is separate handling by caller if needed
      break;
  }
  return result;
}

// ============================================================
// PLOT TWISTS (voor "Chaos-Formatie" en "Alles op Alles")
// ============================================================
const PLOT_TWISTS = [
  { title: 'Influencer gaat viral', text: 'Kies een partij. Die krijgt +5 zetels voor de rest van deze ronde.', effect: 'viral', value: 5 },
  { title: 'Schandaal in de pers', text: 'Kies een partij. Die verliest hun geheime bonusdoel voor deze ronde.', effect: 'scandal' },
  { title: 'Surprise-alliantie', text: 'Trek twee partijen. Zij krijgen een gedeeld doel: als beide in de coalitie zitten, krijgen ze elk +2 punten.', effect: 'alliance' },
  { title: 'Verkiezingsfraude-gerucht', text: 'Kies een partij. Die verliest −3 zetels. De Informateur mag zelf verdelen waar die zetels naartoe gaan.', effect: 'fraud', value: -3 },
  { title: 'Eurovisie-effect', text: 'De partij met de meeste punten op dit moment verliest 2 zetels (jaloersie).', effect: 'eurovision', value: -2 },
  { title: 'Noodwet', text: 'De volgende wet wordt met +3 zetels doorgerekend (extra steun van "het volk").', effect: 'emergency', value: 3 },
];

function drawPlotTwist() {
  return PLOT_TWISTS[Math.floor(Math.random() * PLOT_TWISTS.length)];
}

// ============================================================
// VARIABLE DEALBREAKERS (voor "Dynastieën" / "Alles op Alles")
// ============================================================
const DEALBREAKER_POOL = [
  ['PPP', 'KKB'], ['PPP', 'VBB'], ['PPP', 'BNB'],
  ['FBL', 'DDP'], ['FBL', 'FRR'], ['FBL', 'KGW'], ['FBL', 'SVB'],
  ['KCV', 'PAN'], ['KCV', 'FRR'],
  ['WIFI', 'FRR'], ['WIFI', 'OMA'],
  ['VBB', 'PPP'], ['VBB', 'PAN'],
  ['KKB', 'PPP'], ['KKB', 'PAN'],
  ['DDP', 'FBL'], ['DDP', 'PAN'], ['DDP', 'WOK'],
  ['FRR', 'PAN'], ['FRR', 'FBL'],
  ['PAN', 'FRR'], ['PAN', 'KCV'], ['PAN', 'DDP'],
  ['OMA', 'WIFI'], ['OMA', 'PAN'],
  ['BNB', 'PPP'], ['BNB', 'PAN'],
  ['WOK', 'DDP'], ['WOK', 'PAN'],
  ['KGW', 'FBL'], ['KGW', 'PAN'],
  ['SVB', 'FBL'], ['SVB', 'PAN'],
];

function drawVariableDealbreakers(activePartyIds) {
  // Start with no dealbreakers
  const result = {};
  activePartyIds.forEach(id => { result[id] = null; });
  // Filter pool to only pairs where both are active
  const valid = DEALBREAKER_POOL.filter(([a, b]) => activePartyIds.includes(a) && activePartyIds.includes(b));
  // Shuffle and assign without double-assigning
  const shuffled = [...valid].sort(() => Math.random() - 0.5);
  const used = new Set();
  for (const [a, b] of shuffled) {
    if (used.has(a) || used.has(b)) continue;
    // Random direction: a hates b OR b hates a
    if (Math.random() < 0.5) {
      result[a] = b;
    } else {
      result[b] = a;
    }
    used.add(a);
    used.add(b);
  }
  return result;
}

// ============================================================
// VARIABLE BONUSES (voor "Dynastieën" / "Alles op Alles")
// ============================================================
const BONUS_POOL = [
  { text: 'Wordt Minister van Klimaat & Natuur (+3)', party: 'PPP' },
  { text: 'Woord "vrij" of "rust" staat in de TITEL van het akkoord (+3)', party: 'FBL' },
  { text: 'Nationale Vlaaidag wordt écht feestdag in het akkoord (+3)', party: 'KCV' },
  { text: 'Woord "digitaal", "innovatie" of "tech" staat in het akkoord (+3)', party: 'WIFI' },
  { text: 'In coalitie zóNDER dat één DAM-standpunt letterlijk in akkoord staat (+3)', party: 'DAM' },
  { text: 'Wordt Minister van Feestelijk Beleid (+3)', party: 'VBB' },
  { text: 'Woord "kaas" staat in de TITEL van het akkoord (+3)', party: 'KKB' },
  { text: 'Wordt Minister van Financiën (+3)', party: 'DDP' },
  { text: 'Minimaal 4 concrete regels/verplichtingen in het akkoord (+3)', party: 'FRR' },
  { text: 'Kabinet is een minderheidskabinet (+3)', party: 'PAN' },
  { text: 'Woord "pensioen" staat in de TITEL van het akkoord (+3)', party: 'OMA' },
  { text: 'Geen enkele milieuregel in het akkoord (+3)', party: 'BNB' },
  { text: 'Maximale huurprijs staat letterlijk in het akkoord (+3)', party: 'WOK' },
  { text: 'Zondag als rustdag staat in het akkoord (+3)', party: 'KGW' },
  { text: 'Woord "sport" of "gezondheid" staat in het akkoord (+3)', party: 'SVB' },
  // Extra cross-party bonussen
  { text: 'Je partij heeft de MEESTE zetels aan het einde van Ronde 2 (+3)', party: null },
  { text: 'Je zit in de coalitie met precies 3 andere partijen (+3)', party: null },
  { text: 'Het akkoord bevat het woord "Nederland" minstens 3 keer (+3)', party: null },
  { text: 'Je hebt nooit tegen een coalitiepartner gestemd (+3)', party: null },
  { text: 'Je kroonjuweel staat in het akkoord ÉN je bent niet de grootste partij (+3)', party: null },
  { text: 'Je hebt tijdens de formatie minstens 2 publieke deals aangekondigd (+3)', party: null },
  { text: 'Je eindigt het spel met minder zetels dan je begon (+3) — "morele overwinning"', party: null },
  { text: 'De MP is van je dealbreaker-partij en jij zit óók in de coalitie (+3) — "verzoening"', party: null },
];

function drawVariableBonuses(activePartyIds) {
  const result = {};
  // First assign party-specific bonuses where possible
  const partySpecific = BONUS_POOL.filter(b => b.party && activePartyIds.includes(b.party));
  const generic = BONUS_POOL.filter(b => !b.party);
  const shuffledGeneric = [...generic].sort(() => Math.random() - 0.5);
  activePartyIds.forEach(id => {
    const specific = partySpecific.find(b => b.party === id);
    if (specific && Math.random() < 0.6) {
      result[id] = specific.text;
    } else {
      result[id] = (shuffledGeneric.pop() || generic[0]).text;
    }
  });
  return result;
}

// ============================================================
// HELPER FUNCTIES VOOR VARIABELE DEALBREAKERS / BONUSSEN
// ============================================================
// Deze functies kijken eerst naar state.variableDealbreakers / 
// state.variableBonuses, en vallen terug op de statische data.js waarden.
// ============================================================

function getPartyDealbreaker(partyId, state) {
  if (state?.variableDealbreakers && partyId in state.variableDealbreakers) {
    return state.variableDealbreakers[partyId];
  }
  if (typeof PARTY_DEALBREAKERS !== 'undefined') {
    return PARTY_DEALBREAKERS[partyId] || null;
  }
  return null;
}

function getPartyBonus(partyId, state) {
  if (state?.variableBonuses && partyId in state.variableBonuses) {
    return state.variableBonuses[partyId];
  }
  if (typeof PARTY_BONUSES !== 'undefined') {
    return PARTY_BONUSES[partyId] || '—';
  }
  return '—';
}

// Exporteer voor Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SCENARIOS,
    getScenarioConfig,
    getScenarioInfo,
    DILEMMAS_POOL,
    drawDilemmas,
    NEWS_EVENTS,
    drawNewsEvent,
    PLOT_TWISTS,
    drawPlotTwist,
    DEALBREAKER_POOL,
    drawVariableDealbreakers,
    BONUS_POOL,
    drawVariableBonuses,
    getPartyDealbreaker,
    getPartyBonus,
  };
}
