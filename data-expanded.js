// ============================================================
// EXPANDED CONTENT MODULE
// ============================================================
// Extra kaarten, wetten, stellingen en crises om herhaling
// te voorkomen. Wordt geladen na de standaard data.
// ============================================================

// ============================================================
// EXTRA WETSVoorstellen (Set B: absurd, Set C: controversieel)
// ============================================================
const LAWS_EXTRA = [
  // ── Set B: Absurd ──
  { title: 'Wet Opvolging door Eend', text: 'Alle ministeriële beslissingen worden officieel bekrachtigd door een tamme eend genaamd Willem. Geen Willem, geen wet.', hint: 'PAN extatisch (afschaffen!). KCV: "Is dit performance art?" DDP: "Wat zijn de kosten van een eend?" FRR: "Regel de voeding van Willem!"' },
  { title: 'Verplicht Nationaal Kazoo-orkest', text: 'Elke Nederlander tussen 18 en 65 moet een kazoo bezitten en maandelijks meedoen aan een nationale repetitie via Zoom.', hint: 'KCV vóór (cultuur!). FRR sterk tegen (lawaai!). WIFI: "Kan dit async?" FBL: "Kan ik pauzeren tijdens de repetitie?"' },
  { title: 'Wet Verplichte Middagdut', text: 'Iedereen moet tussen 13:00 en 14:00 slapen. Wie wakker is, krijgt een boete. Uitzondering: politici in debat.', hint: 'FBL droomt hier al jaren van. PPP: "Slaap is natuurlijk." FRR: "Dit is onuitvoerbaar." DDP: "Productiviteit!"' },
  { title: 'BTW op Lucht naar 21%', text: 'Ademen wordt belast. Exemptie voor natuurgebieden en tijdens sport. Inflatieballonnen zijn nu luxe-artikelen.', hint: 'PAN vóór (belasting afschaffen... of juist meer?). DDP: "Nieuwe inkomstenbron!" PPP: "Lucht is van iedereen!" OMA: "In mijn tijd ademden we gratis."' },
  { title: 'Nationale Frikandel als Erfgoed', text: 'De frikandel wordt erkend als immaterieel cultureel erfgoed. Fabrieken worden monumenten. Snackbars krijgen subsidie.', hint: 'VBB/KKB in tranen. PPP sterk tegen (vleesindustrie). KCV: "Waarom geen stamppot?"' },
  { title: 'Verplicht Complottheorie-vak', text: 'Op alle scholen wordt een uur per week besteed aan het bedenken van nieuwe complotten. Creatief denken staat centraal.', hint: 'PAN vóór (overheid complotten!). WIFI: "Kan AI dat niet beter?" FRR: "Curriculum is al vol." KCV: "Theater van de absurditeit!"' },
  { title: 'Wet Anti-Horoscoop', text: 'Horoscopen worden verboden in overheidsgebouwen. Sterrenbeelden mogen niet op paspoorten staan.', hint: 'FRR vóór (regels!). KGW sterk tegen (astrologie is traditie?). PAN: "Alles verbieden!" DAM: "Misschien alleen op donderdag verbieden?"' },
  { title: 'De Digitale Detox Maandag', text: 'Elke maandag is Nederland offline. Geen internet, geen 5G, geen wifi. Alleen brieven en vaste telefoons.', hint: 'WIFI in shock. FBL vóór (rust!). OMA: "Zoals vroeger!" DDP: "Economische ramp!"' },
  { title: 'Ministerie van Knuffels', text: 'Er wordt een Ministerie van Knuffels opgericht dat de kwaliteit van omhelzingen waarborgt. Norm: minimaal 3 sec.', hint: 'FBL/KCV vóór. FRR: "Dit is géén serieuze overheid." VBB: "Kan na de borrel."' },
  { title: 'Wet Vervanging door Kat', text: 'Iedereen die zich ziek meldt, mag vervangen worden door een kat. De kat krijgt geen stemrecht, maar wel een stoel.', hint: 'FBL vóór (ziek = kat!). PAN: "Wetten afschaffen... maar deze houden we." DDP: "Wie betaalt de kattenbak?"' },

  // ── Set C: Controversieel ──
  { title: 'Wet Volledige Privacy Afschaffing', text: 'De overheid mag alle communicatie van burgers monitoren voor "veiligheid". Encryptie is verboden.', hint: 'FRR vóór (veiligheid!). PAN/WIFI sterk tegen. PPP: "Eco-terrorisme bestaat niet!" DDP: "Kosten-baten?"' },
  { title: 'Herinvoering Dienstplicht', text: 'Iedereen van 18-25 doet 6 maanden dienstplicht. Keuze: leger, zorg, of onderwijs.', hint: 'FRR/KGW vóór. FBL sterk tegen (6 maanden werken?!). PAN: "Afschaffen!" OMA: "Zoals vroeger, dat was goed."' },
  { title: 'Vermogensgrens van 5 Miljoen', text: 'Iedereen boven de 5 miljoen vermogen wordt jaarlijks voor 10% onteigend. Ondergrens: 50.000 euro vrijgesteld.', hint: 'WOK/PPP vóór. DDP sterk tegen. FRR: "Regels moeten helder zijn." BNB: "Dit is diefstal!"' },
  { title: 'Verbod op Religieuze Symbolen', text: 'In alle publieke gebouwen zijn religieuze kleding en symbolen verboden. Neutraliteit is verplicht.', hint: 'PAN vóór (alles afschaffen!). KGW sterk tegen. PPP: "Boom-knuffelen mag wel?" DAM: "Gevoelig..."' },
  { title: 'Verplichte DNA-registratie', text: 'Alle burgers moeten hun DNA afstaan aan een centrale database. "Voor uw eigen veiligheid."', hint: 'FRR/WIFI vóór (data = veiligheid!). PAN/PPP sterk tegen. DDP: "Wie betaalt de opslag?"' },
  { title: 'Wet Één-Kind-Beleid', text: 'Gezinnen mogen maximaal 1 kind krijgen. Overtreding: boete en geen kinderbijslag.', hint: 'PAN vóór (minder mensen = minder problemen). KGW sterk tegen (gezin!). OMA: "In mijn tijd hadden we 8 kinderen."' },
  { title: 'Afschaffing Grondwettelijke Rechtspraak', text: 'Rechters worden vervangen door AI en volksjury\'s via een app. Grondwet is "richtlijn".', hint: 'WIFI/PAN vóór. FRR/KGW sterk tegen. DDP: "Efficiënt!" KCV: "Dit is dystopische literatuur."' },
  { title: 'Verplichte Staatsreligie', text: 'Nederland krijgt een officiële staatsreligie. Andere religies zijn toegestaan, maar niet gesubsidieerd.', hint: 'KGW vóór (geen specifieke religie genoemd — spelers kunnen kiezen!). PAN sterk tegen. PPP: "Natuur is mijn religie!"' },
  { title: 'Verbod op Protesting', text: 'Demonstraties zijn verboden zonder 6 maanden van tevoren aangevraagde vergunning. Boete: 10.000 euro.', hint: 'FRR vóór (orde!). PAN/PPP/WOK sterk tegen. FBL: "Kan ik zittend protesteren?"' },
  { title: 'Staatsmonopolie op Voedsel', text: 'Alle voedselproductie en -distributie wordt genationaliseerd. Supermarkten worden staatsbedrijven.', hint: 'PPP/WOK vóór. DDP/BNB sterk tegen. KKB: "Maar de kaas dan?!" VBB: "Staats-bitterballen?"' },
];

// ============================================================
// EXTRA FORMATIECRISISKAARTEN (Ronde 2)
// ============================================================
const CRISIS_R2_EXTRA = [
  // Sociale media
  { num: 26, title: 'Viral TikTok!', text: 'Een partij heeft per ongeluk een dansvideo op TikTok gezet in plaats van een partijstandpunt. De reacties zijn... gemengd. Die partij moet 30 seconden een politieke boodschap in dansvorm brengen. De groep bepaalt of dat +1 of −1 zetel oplevert.' },
  { num: 27, title: 'Instagram Live Mislukt!', text: 'De Informateur startte per ongeluk een livestream van de onderhandelingen. Alles is publiek! De volgende 2 minuten moeten alle gesprekken hardop gevoerd worden — fluisteren is verboden.' },
  { num: 28, title: 'Deepfake-schandaal!', text: 'Er circuleert een deepfake van de MP waarin hij/zij iets absurd belooft (bijv. gratis pizza voor iedereen). De MP heeft 30 seconden om het te ontkrachten — maar mag alleen onwaarheden gebruiken.' },
  // Internationaal
  { num: 29, title: 'EU-druk', text: 'Brussel eist dat Nederland binnen 2 minuten een standpunt inneemt over een obscure EU-richtlijn over banaankromming. De Informateur kiest welke partij dit verdedigt — succes = +2 zetels.' },
  { num: 30, title: 'Klimaattop in Davos!', text: 'De grootste partij is uitgenodigd voor een klimaattop. Ze moeten 30 seconden een toespraak houden — in het Engels. De groep bepaalt of het overtuigend was (+/− 2 zetels).' },
  { num: 31, title: 'Grensdiscussie!', text: 'België claimt plotseling Limburg. De Informateur kiest twee partijen die samen 1 minuut een verdediging moeten bedenken — in het Limburgs dialect. Rest bepaalt succes.' },
  // Persoonlijk
  { num: 32, title: 'De Vergissing!', text: 'Een speler heeft per ongeluk de verkeerde partij-quirk gebruikt (bijv. WIFI praat als KKB over kaas). De groep bepaalt: was het briljant (+1 zetel) of gênant (−1 zetel)?' },
  { num: 33, title: 'Stoelendans!', text: 'Iedereen staat op en loopt 30 seconden om de tafel. Op het signaal van de Informateur moet iedereen gaan zitten — maar er is één stoel te weinig. Wie staat, verliest 1 zetel.' },
  { num: 34, title: 'Telefoonverbod!', text: 'Iedereen legt zijn telefoon op tafel. De eerste die zijn telefoon aanraakt, verliest 2 zetels en moet de volgende crisiskaart voorlezen alsof het een sprookje is.' },
  { num: 35, title: 'De Verjaardag!', text: 'Het is de verjaardag van een willekeurige speler (de Informateur wijst aan). Alle partijen moeten een cadeau-idee bedenken dat past bij hun partij. Beste cadeau = +1 zetel.' },
  { num: 36, title: 'Wissel van Identiteit!', text: 'Twee spelers (willekeurig gekozen door de Informateur) wisselen van partij-quirk voor 2 minuten. Ze moeten hun nieuwe quirk volledig uitspelen.' },
  { num: 37, title: 'De Koffiecrisis!', text: 'De koffie is op. Alle onderhandelingen worden 1 minuut stilgelegd tot iemand een oplossing bedenkt. Oplossing = +1 zetel voor die partij. Geen oplossing = iedereen −1 zetel.' },
  { num: 38, title: 'Confetti!', text: 'De Informateur gooit confetti in de lucht (of roept "CONFETTI!"). Iedereen moet 10 seconden doen alsof er een feest is. Wie niet meedoet, verliest 1 zetel.' },
  { num: 39, title: 'De Spion!', text: 'Eén speler sluit de ogen. De Informateur wijst een "spion" aan die twee geheime deals mag afluisteren (speler met ogen dicht mag twee keer iemand aanwijzen die 10 seconden moeten fluisteren).' },
  { num: 40, title: 'Verkeerd Nummer!', text: 'De Informateur doet alsof hij/zij een telefoontje krijgt van "de Koning". De boodschap: één partij moet binnen 30 seconden een absurde eis stellen, anders valt het kabinet alvast.' },
  { num: 41, title: 'De Tijdreiziger!', text: 'Een speler (Informatieur kiest) doet alsof hij/zij uit 2050 komt. Vertel in 30 seconden hoe deze coalitie de toekomst heeft verpest of gered. De groep stemt: toekomst gered = +2 zetels.' },
  { num: 42, title: 'De Muzikale Onderbreking!', text: 'De Informateur zet willekeurig een nummer op (of neuriet iets). Zolang de muziek speelt, moet iedereen zingen in plaats van praten. Onderhandelen in zangvorm!' },
  { num: 43, title: 'De Complimentenronde!', text: 'Elke partij moet het compliment geven aan de partij die het meest tegenovergesteld is. Geen sarcastische complimenten toegestaan. De groep bepaalt of ze echt waren (+/− 1 zetel).' },
  { num: 44, title: 'De Stiltecirkel!', text: 'Iedereen mag 1 minuut alleen communiceren via gebaren. Wie praat, verliest 1 zetel. Deals mogen alleen gesloten worden met een handdruk.' },
  { num: 45, title: 'De Overrompeling!', text: 'De Informateur roept: "Verkiezingen over 30 seconden!" Alle partijen hebben 30 seconden voor een campagneslogan. De groep stemt op de beste: winnaar +3 zetels.' },
];

// ============================================================
// EXTRA KABINETSCRISISKAARTEN (Ronde 4)
// ============================================================
const CRISIS_R4_EXTRA = [
  // MILD
  { severity: 'MILD', title: 'De Vergiste Tweet', text: 'De minister-president heeft per ongeluk geliked op een conspiracy-theorie over Nederlandse molens. De pers vraagt om opheldering. Is het een hack of slechte smaak?' },
  { severity: 'MILD', title: 'De Brief aan de Koning', text: 'De MP heeft een liefdesbrief aan de Koning gestuurd in plaats van een formatie-update. "Geliefde Koning, uw parlement smacht naar leiderschap..." Hoe leg je dit uit?' },
  // MEDIUM
  { severity: 'MEDIUM', title: 'Het Belastingparadijs', text: 'Uitgelekt: drie coalitiepartijen hebben donaties ontvangen van een belastingparadijs. De oppositie eist openbaarmaking. De Informateur wijst aan welke partijen dit zijn.' },
  { severity: 'MEDIUM', title: 'De Spion uit Brussel', text: 'Een EU-functionaris heeft beweerd dat de MP tijdens een diner heeft gezegd: "Nederland zou beter af zijn zonder de EU." Diplomatieke rel dreigt.' },
  { severity: 'MEDIUM', title: 'De Onderwijscrisis', text: 'Een coalitiepartij blijkt schoolboeken te hebben verkocht aan hun eigen familiebedrijf. De oppositie roept: "corruptie!" De Informateur kiest welke partij.' },
  // ZWAAR
  { severity: 'ZWAAR', title: 'De Staatsgreep!', text: 'Een oppositiepartij dreigt met een motie van wantrouwen tégen de hele coalitie. Alleen als ALLE coalitiepartijen samenwerken, overleeft het kabinet.' },
  { severity: 'ZWAAR', title: 'Het Internationaal Arrestatiebevel', text: 'De MP wordt beschuldigd van oorlogsmisdaden... in een land dat niemand kan spellen. De oppositie eist onderzoek. Is dit een framesetup of echt?' },
  // EXTREEM
  { severity: 'EXTREEM', title: 'De Aardbeving', text: 'Een aardbeving heeft Groningen getroffen. Het kabinet moet NU beslissen: helpen of bezuinigen? Alle partijen moeten in 1 minuut hun positie verdedigen. Het volk kijkt mee.' },
  { severity: 'EXTREEM', title: 'De Staat van Beleg', text: 'Nederland is in staat van beleg verklaard na een cyberaanval. De MP krijgt volmachten — maar de coalitie is verdeeld. Stemmen: meer macht aan de MP of verkiezingen?' },
];

// ============================================================
// EXTRA STELLINGEN (Speed-debat)
// ============================================================
const STELLINGEN_EXTRA = [
  // Klimaat & milieu
  { text: "Koeien moeten een gasmasker dragen om methaan te filteren.", parties: ['PPP','BNB','KKB'] },
  { text: "Elke stad krijgt een verplichte windmolen in het centrum.", parties: ['PPP','DAM','WOK'] },
  { text: "Plastic wordt volledig verboden. Alles moet van kaas.", parties: ['PPP','KKB','PAN'] },
  // Werk & economie
  { text: "De overheid betaalt iedereen een basisinkomen van €3000 — maar je mag niet werken.", parties: ['FBL','DDP','PAN'] },
  { text: "Overtijd wordt beloond met vrije dagen, niet met geld.", parties: ['FBL','PPP','KCV'] },
  { text: "Werkgevers moeten verplicht een slaapkamer op kantoor hebben.", parties: ['FBL','WOK','VBB'] },
  // Cultuur
  { text: "Elke Nederlander moet jaarlijks een gedicht voordragen in het openbaar.", parties: ['KCV','FRR','PAN'] },
  { text: "Musea worden gratis, maar je moet een examen doen om naar binnen te mogen.", parties: ['KCV','WIFI','FRR'] },
  { text: "De nationale feestdag wordt vervangen door een Nationale Daggedichtendag.", parties: ['KCV','PAN','OMA'] },
  // Tech
  { text: "Elke Nederlander krijgt een verplichte robot-assistent.", parties: ['WIFI','DDP','PAN'] },
  { text: "Het internet wordt elke nacht uitgezet van 02:00 tot 06:00.", parties: ['WIFI','FRR','KGW'] },
  { text: "AI mag alleen nog maar gedichten schrijven, geen beleid.", parties: ['WIFI','KCV','PAN'] },
  // Midden
  { text: "De overheid mag alleen nog maar compromissen sluiten — geen winnaars.", parties: ['DAM','PAN','FBL'] },
  { text: "Elke wet moet eerst getest worden in een dorp van 100 inwoners.", parties: ['DAM','FRR','WIFI'] },
  { text: "Politici mogen nooit 'ja' of 'nee' zeggen — alleen 'misschien'.", parties: ['DAM','PAN','KCV'] },
  // Eten & drinken
  { text: "Hagelslag wordt erkend als medicijn.", parties: ['VBB','KKB','OMA'] },
  { text: "Elke maaltijd moet minimaal 50% uit kaas bestaan.", parties: ['KKB','VBB','PPP'] },
  { text: "Borrelen wordt verplicht voor alle ambtenaren van 15:00 tot 17:00.", parties: ['VBB','FBL','DAM'] },
  // Geld
  { text: "De euro wordt vervangen door aardappelen als betaalmiddel.", parties: ['DDP','BNB','PAN'] },
  { text: "Rijke mensen mogen niet stemmen — ze hebben al genoeg invloed.", parties: ['DDP','WOK','PAN'] },
  { text: "Belastingen worden bepaald door een draai aan het rad van fortuin.", parties: ['DDP','PAN','KCV'] },
  // Orde
  { text: "Elke straat krijgt een verplichte buurtbewaker met een fluitje.", parties: ['FRR','KGW','OMA'] },
  { text: "Ouders moeten verplicht een 'gedragsexamen' afleggen voor ze kinderen krijgen.", parties: ['FRR','PAN','KGW'] },
  { text: "Hardlopen in het park is alleen toegestaan met een vergunning.", parties: ['FRR','SVB','PAN'] },
  // Chaos
  { text: "De overheid wordt vervangen door een weekly lottery.", parties: ['PAN','DAM','WIFI'] },
  { text: "Nederland verhuist fysiek naar een ander continent.", parties: ['PAN','PPP','DDP'] },
  { text: "Alle wetten worden herschreven in rijm.", parties: ['PAN','KCV','OMA'] },
  // Ouderen
  { text: "Pensioenleeftijd wordt 45 — maar je mag pas stoppen als je 90 bent.", parties: ['OMA','PAN','FBL'] },
  { text: "Alle verzorgingstehuizen krijgen een discotheek.", parties: ['OMA','KCV','VBB'] },
  { text: "Ouderen krijgen voorrang op alles: files, kassa\'s, parkeerplaatsen.", parties: ['OMA','FRR','KGW'] },
  // Boeren
  { text: "Alle steden worden ontruimd en omgevormd tot weiland.", parties: ['BNB','PAN','PPP'] },
  { text: "Koeien krijgen stemrecht — maar alleen over landbouwbeleid.", parties: ['BNB','PAN','KKB'] },
  { text: "Boerenmarkten worden verplicht in elke straat, elke dag.", parties: ['BNB','VBB','KKB'] },
  // Wonen
  { text: "Leegstaande kantoren worden omgevormd tot dierentuinen.", parties: ['WOK','PAN','KCV'] },
  { text: "Huur mag niet hoger zijn dan 10% van je salaris.", parties: ['WOK','FBL','DDP'] },
  { text: "Iedereen krijgt een verplichte huisgenoot toegewezen door de staat.", parties: ['WOK','FRR','PAN'] },
  // Gezin
  { text: "Zondag wordt verplicht familiedag — alles dicht.", parties: ['KGW','OMA','FRR'] },
  { text: "Kinderen mogen niet meer dan 1 uur per dag schermtijd hebben.", parties: ['KGW','FRR','WIFI'] },
  { text: "Huwelijk is verplicht voor iedereen boven de 30.", parties: ['KGW','FRR','PAN'] },
  // Sport
  { text: "Werknemers moeten 10 push-ups doen voor elke vergadering.", parties: ['SVB','FRR','FBL'] },
  { text: "De Olympische Spelen worden verplicht voor alle Nederlanders.", parties: ['SVB','PAN','DDP'] },
  { text: "Fietspaden worden vervangen door hardloopbanen.", parties: ['SVB','PPP','PAN'] },
];

// ============================================================
// COMBINED POOL HELPERS
// ============================================================
function getAllLaws() {
  // Base LAWS_POOL is defined in index.html; this adds extras
  if (typeof LAWS_POOL !== 'undefined') {
    return [...LAWS_POOL, ...LAWS_EXTRA];
  }
  return [...LAWS_EXTRA];
}

function getAllCrisisR2() {
  if (typeof CRISIS_R2 !== 'undefined') {
    return [...CRISIS_R2, ...CRISIS_R2_EXTRA];
  }
  return [...CRISIS_R2_EXTRA];
}

function getAllCrisisR4Pool() {
  if (typeof CRISIS_R4_POOL !== 'undefined') {
    return [...CRISIS_R4_POOL, ...CRISIS_R4_EXTRA];
  }
  return [...CRISIS_R4_EXTRA];
}

function getAllStellingen() {
  if (typeof STELLINGEN !== 'undefined') {
    return [...STELLINGEN, ...STELLINGEN_EXTRA];
  }
  return [...STELLINGEN_EXTRA];
}

// Exporteer voor Node.js testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    LAWS_EXTRA,
    CRISIS_R2_EXTRA,
    CRISIS_R4_EXTRA,
    STELLINGEN_EXTRA,
    getAllLaws,
    getAllCrisisR2,
    getAllCrisisR4Pool,
    getAllStellingen,
  };
}
