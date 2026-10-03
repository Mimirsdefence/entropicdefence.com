// Svensk källordbok — ALLA sajttexter.
// Översättningsfilerna typas mot `typeof sv`, så inga nycklar kan glömmas.
// Texterna är de slutgiltiga enligt RENAT (Punkt 1–8), så copy-fixarna
// ligger redan i ordboken när komponenterna migreras.

export const sv = {
  // ── Dokumenttitlar & meta (App.tsx) ────────────────────────────────
  meta: {
    home: {
      title: 'Entropic Defence — Kontinuerlig säkerhet mot utländska aktörer',
      description:
        'Entropic Defence AB. 40+ år av säkerhetsarbete i världens högsta säkerhetsklass. Kontinuerlig säkerhet, externa säkerhetskontroller och rådgivning för företag, myndigheter och kritisk infrastruktur.',
    },
    checkout: {
      title: 'Välj paket — Entropic Defence',
      description:
        'Fasta priser på kontinuerlig säkerhet: extern kontroll, intern revision och säkerhetsledning. Från 18 700 kr per månad.',
    },
    checkoutExtern: {
      title: 'Kontinuerlig säkerhetskontroll — Entropic Defence',
      description:
        'Fast pris efter antal exponerade adresser. Månads-, vecko- eller dagskontroll med rapport, remediering och anpassad konsultering.',
    },
    checkoutIntern: {
      title: 'Intern säkerhetsrevision — Entropic Defence',
      description:
        'Tre säkerhetsnivåer — vanlig, hög och militär grad. Behörigheter, loggning och isolation. AI-verktyg ger 1/6 av tiden.',
    },
    checkoutLedning: {
      title: 'Säkerhetsledning — Entropic Defence',
      description:
        'Strategisk säkerhetsrådgivning för ledning och styrelse, utbildning av personal och en 24/7 säkerhetsexpert som kommer snart.',
    },
    success: {
      title: 'Förfrågan mottagen — Entropic Defence',
      description: 'Er förfrågan är mottagen. En konsult återkommer snarast.',
    },
    businessProfile: {
      title: 'Business Profile — Entropic Defence',
      description:
        'Ert företags säkerhetskonto: prenumeration, rapportmottagare (PGP) och kontoinställningar.',
    },
    papers: {
      title: 'Papers — Entropic Defence',
      description:
        'Vetenskapliga rapporter, hypoteser och essäer om AI, teoretisk fysik, filosofi och säkerhet.',
    },
    legal: {
      title: 'Legal — Entropic Defence',
      description: 'Integritetspolicy, användarvillkor och cookieinformation.',
    },
    support: {
      title: 'Support & FAQ — Entropic Defence',
      description: 'Vanliga frågor och kundsupport. Vår jour svarar dygnet runt.',
    },
    advisories: {
      title: 'Advisories & Disclosures — Entropic Defence',
      description:
        'Koordinerad sårbarhetsrapportering. Har du hittat en sårbarhet i våra system? Vi tar det på allvar.',
    },
    disclosures: {
      title: 'Disclosures — Entropic Defence',
      description:
        'Vår proprietära AI-analys, verktyget Red Flag – Ethical hacker och vad vi kan berätta öppet om regeringsuppdrag och militära system.',
    },
    status: {
      title: 'Säkerhetsstatus — Entropic Defence',
      description:
        'Följ er säkerhetskontroll steg för steg. Uppdateringar och rapporter skickas via mejl till era ansvariga.',
    },
    notFound: {
      title: 'Sidan hittades inte — Entropic Defence',
      description: 'Sidan du söker finns inte — eller har flyttats till en säkrare plats.',
    },
  },

  // ── Gemensamma ord & fraser ─────────────────────────────────────────
  common: {
    vatNote: 'Priser exkl. moms',
    launchPrice: 'Lanseringspris',
    exclVat: 'exkl. moms',
    perMonthShort: '/mån',
    perMonth: 'per månad',
    perConsultantHour: 'per konsulttimme',
    perHour: '/ timme',
    perAssignment: 'per uppdrag',
    quote: 'Offert',
    recommended: 'Rekommenderad',
    mostPopular: 'Populärast',
    comingSoon: 'Kommer snart',
    allPackages: 'Alla paket',
    active: 'Aktiv',
    ongoing: 'Pågår',
    from: 'Från',
    currency: 'kr',
    chooseLanguage: 'Välj språk',
    language: 'Språk',
    // Periodväljare (Punkt 5)
    periodLabel: 'Faktureringsperiod',
    periods: {
      month: 'Månad',
      quarter: 'Kvartal',
      year: 'År',
    },
    savings: {
      quarter: '10 % rabatt',
      year: '3 fria månader ingår',
    },
  },

  // ── Navigering ──────────────────────────────────────────────────────
  nav: {
    services: 'Tjänster',
    advisories: 'Advisories',
    disclosures: 'Disclosures',
    papers: 'Papers',
    support: 'Support',
    talkToConsultant: 'Prata med en konsult',
    homeAria: 'Entropic Defence — startsidan',
    mainMenu: 'Huvudmeny',
    mobileMenu: 'Mobilmeny',
    closeMenu: 'Stäng meny',
    openMenu: 'Öppna meny',
  },

  // ── Footer ──────────────────────────────────────────────────────────
  footer: {
    tagline:
      'Kontinuerlig säkerhet mot utländska aktörer. 40+ år i världens högsta säkerhetsklass — för företag, myndigheter och kritisk infrastruktur.',
    columnNavigation: 'Navigering',
    columnCompany: 'Företag',
    linkServices: 'Tjänster',
    linkReviews: 'Granskningar',
    linkPapers: 'Papers',
    linkStatus: 'Säkerhetsstatus',
    linkPackages: 'Välj paket',
    linkBusinessProfile: 'Business Profile',
    linkSupport: 'Support & FAQ',
    linkLegal: 'Legal',
    location: 'Stockholm · Sverige',
    copyright: '© 2026 Entropic Defence. Alla rättigheter förbehållna.',
  },

  // ── Flytande CTA-knapp ──────────────────────────────────────────────
  floatingCta: 'Prata med en konsult 24/7',

  // ── Formulär ────────────────────────────────────────────────────────
  forms: {
    company: 'Företag *',
    companyPlaceholder: 'Entropic Defence AB',
    orgNumber: 'Organisationsnummer',
    orgNumberPlaceholder: '559999-9999',
    contactPerson: 'Kontaktperson *',
    namePlaceholder: 'För- och efternamn',
    workEmail: 'Jobbmejl *',
    emailPlaceholder: 'namn@foretag.se',
    interestedIn: 'Intresserad av *',
    choosePackage: 'Välj paket…',
    notSure: 'Inte säker — behöver råd',
    describe: 'Beskriv er verksamhet och hotbild',
    describePlaceholder: 'Kort om er verksamhet, system och vad ni vill skydda…',
    sendRequest: 'Skicka förfrågan',
    sending: 'Skickar…',
    sendError: 'Något gick fel när meddelandet skulle skickas. Försök igen eller mejla oss direkt.',
    consentBefore: 'Genom att skicka godkänner du vår ',
    consentLink: 'integritetspolicy',
    consentAfter: '. Vi delar aldrig dina uppgifter med tredje part.',
  },

  // ── Startsidan ──────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: 'Kontinuerlig säkerhet · Sverige',
      titleLead: 'Säkerhet som ',
      titleHighlight: 'böjer hotbilden',
      titleEnd: ' — dygnet runt.',
      description:
        'Entropic Defence skyddar företag, myndigheter och kritisk infrastruktur mot utländska aktörer. 40+ år i världens högsta säkerhetsklass — från regerings- och militärsystem till er verksamhet.',
      ctaPrimary: 'Prata med en konsult',
      ctaSecondary: 'Se våra säkerhetspaket',
    },
    stats: [
      { value: '40+', label: 'år i världens högsta säkerhetsklass' },
      { value: '24/7', label: 'kontinuerlig övervakning och hotjakt' },
      { value: '100%', label: 'oberoende rådgivning' },
    ],
    trustStrip: ['Bakgrund', 'Regeringsuppdrag', 'Militära system', 'Kritisk infrastruktur', 'Tystnadsplikt som standard'],
    hotbild: {
      eyebrow: 'Hotbilden har förändrats',
      titleLead: 'Det är inte längre frågan ',
      titleEm: 'om',
      titleMiddle: ' någon försöker — det är frågan ',
      titleHighlight: 'när',
      titleEnd: '.',
      description:
        'Statsunderstödda aktörer kartlägger europeiska verksamheter just nu — leverantörskedjor, anställda och exponerade system. Den som inte kontrollerar sig själv är redan kontrollerad.',
      terminal: [
        'hotbild: statsunderstödda aktörer',
        'vektorer: supply chain · insider · AI',
        'exponering: kartläggning pågår',
        'status:',
      ],
      terminalActive: 'KONTINUERLIG ÖVERVAKNING AKTIV',
    },
    services: {
      eyebrow: 'Tjänster',
      title: 'Fyra sätt vi skyddar er verksamhet.',
      items: [
        {
          title: 'Kontinuerlig säkerhetskontroll',
          text: 'Externa kontroller som aldrig tar paus — månadsvis, veckovis eller dagligen. Vi hittar det en angripare skulle hitta, och berättar hur ni stänger det.',
        },
        {
          title: 'Intern säkerhetsrevision',
          text: 'Djupgående härdning av er interna miljö: behörigheter, loggning och isolation. Genomgripande genomlysning anpassad efter er riskprofil och era krav.',
        },
        {
          title: 'Säkerhetsledning',
          text: 'Strategisk rådgivning för ledning och styrelse — och en 24/7 säkerhetsexpert som utbildar er personal.',
        },
        {
          title: 'Proprietär AI-analys',
          text: 'Våra egenutvecklade AI-verktyg kartlägger hotbilder, identifierar avvikelser och stänger sårbarheter i realtid — före en angripare hinner agera.',
        },
      ],
    },
    background: {
      eyebrow: 'Fyra decennier',
      title: '40 år i världens högsta säkerhetsklass.',
      paragraphs: [
        'Entropic Defence grundades ur en insikt: mycket av europeisk säkerhet är reaktivt i stället för förebyggande. Vi vill göra tvärtom och tror att proaktivitet är enda vägen till verklig säkerhet.',
        'Våra konsulter kommer från försvars- och underrättelsevärlden. Vi har skyddat regeringssystem, militära nätverk och samhällskritisk infrastruktur — mot de mest skickliga och tålmodiga motståndare som finns.',
      ],
      points: [
        'Erfarenhet från försvar, underrättelse och myndigheter',
        'Tystnadsplikt och säkerhetsskydd i varje uppdrag',
        'Oberoende — vi säljer ingen hårdvara eller mjukvara',
        'Kontinuitet — samma team följer er över tid',
      ],
    },
    process: {
      eyebrow: 'Så arbetar vi',
      title: 'Från första samtal till kontinuerlig säkerhet.',
      steps: [
        {
          title: 'Samtal',
          text: 'Vi förstår er verksamhet, era system och vad som faktiskt behöver skyddas.',
        },
        {
          title: 'Kartläggning & Kontroll',
          text: 'Hotbild, attackyta och externa/interna kontroller för att identifiera era sårbarheter.',
        },
        {
          title: 'Åtgärd',
          text: 'Våra konsulter stannar kvar och hjälper er IT att stänga fynden — ingen rapport som bara blir liggande.',
        },
        {
          title: 'Kontinuitet',
          text: 'Säkerhet är inte ett projekt med slutdatum. Vi återkommer — och systemet förblir kontrollerat.',
        },
      ],
    },
    contact: {
      eyebrow: '24/7 · Direktsvar',
      title: 'Prata med en konsult om er hotbild.',
      description:
        'Första samtalet och en extern säkerhetscheck är kostnadsfria och utan förpliktelser. Berätta om er verksamhet — vi berättar var ni är sårbara.',
      ctaMail: 'Mejla oss direkt',
      ctaSupport: 'Våra paket',
    },
    papersCta: {
      text: 'Nyfiken på hur vi tänker? Läs våra papers om AI, fysik och säkerhet.',
      cta: 'Till Papers',
    },
  },

  // ── Checkout (paketöversikt) ────────────────────────────────────────
  checkout: {
    hero: {
      eyebrow: 'Välj paket',
      titleLead: 'Säkerhet som är värd ',
      titleHighlight: 'vartenda öre',
      titleEnd: '.',
      description:
        'Fasta priser på kontinuerliga kontroller och intern revision — offert där uppdraget kräver mer. Öppna ett paket för att se priser och nivåer.',
    },
    categories: [
      {
        name: 'Kontinuerlig säkerhetskontroll',
        period: 'per månad',
        description:
          'Externa kontroller som aldrig tar paus — månadsvis, veckovis eller dagligen. Rapport, remediering och anpassad konsultering ingår.',
        features: [
          'Månads-, vecko- eller dagskontroll',
          'Fast pris efter antal exponerade adresser',
          'Remediering av varje fynd',
          'Konsultering 48h till 24/7',
        ],
      },
      {
        name: 'Intern säkerhetsrevision',
        period: 'per konsulttimme',
        description:
          'Super-säkra systemet inifrån, ungefär en gång per år. Tre nivåer — från vanlig säkerhet till militär grad.',
        features: [
          'Tre nivåer efter ert behov',
          'Behörigheter, loggning och isolation',
          'System som inte svarar vid sondering',
          'AI-verktyg ger 1/6 av tiden',
        ],
      },
      {
        name: 'Säkerhetsledning',
        period: 'per uppdrag',
        description:
          'Strategisk rådgivning för ledning och styrelse — och 24/7 säkerhetsexpert som utbildar er personal. Experten kommer snart.',
        features: [
          'Säkerhetsstrategi på ledningsnivå',
          'Utbildning av personal och styrelse',
          'Stöd vid incidenter',
          '24/7 säkerhetsexpert — kommer snart',
        ],
      },
    ],
    seePackages: 'Se paket & priser',
    scrollHint: 'Scrolla uppåt för att se paketen',
    form: {
      title: 'Berätta om er verksamhet.',
      description:
        'Ju mer vi vet, desto bättre offert — särskilt för system över 100 exponerade adresser och intern revision. Allt ni skickar behandlas under tystnadsplikt.',
      bullets: [
        'Direktsvar, alla dagar',
        'Kostnadsfritt första samtal',
        'Offert utan förpliktelser',
        'PGP finns för känslig kommunikation',
      ],
    },
    options: {
      external: 'Kontinuerlig säkerhetskontroll',
      internal: 'Intern säkerhetsrevision',
      leadership: 'Säkerhetsledning',
      unsure: 'Inte säker — behöver råd',
    },
  },

  // ── CheckoutExtern ───────────────────────────────────────────────────
  checkoutExtern: {
    hero: {
      eyebrow: 'Kontinuerlig säkerhetskontroll',
      titleLead: 'Fast pris på säkerhet som ',
      titleHighlight: 'aldrig tar paus',
      titleEnd: '.',
      description:
        'Externa kontroller som aldrig tar paus — månadsvis, veckovis eller dagligen. Med varje paket får ni rapport, remediering och en anpassad konsultering som hjälper er IT-personal att stänga fynden.',
    },
    tierLabel: 'Antal exponerade adresser',
    tierAria: 'Välj antal exponerade adresser',
    tiers: {
      small: {
        label: 'Under 20 exponerade adresser',
        short: 'Under 20 adresser',
        note: 'Litet system med färre än 20 exponerade adresser.',
      },
      medium: {
        label: '20–100 exponerade adresser',
        short: '20–100 adresser',
        note: 'Medelstora system med flera ytor och integrationer.',
      },
      large: {
        label: '100+ exponerade adresser',
        short: '100+ adresser',
        note: 'Komplexa system — prissätts efter behovsanalys.',
      },
    },
    plans: {
      manad: {
        name: 'Månadskontroll',
        cadence: '1 extern kontroll per månad',
        description:
          'Den löpande basen: en fullständig extern kontroll varje månad, med åtgärdsförslag och anpassad konsultering för att stänga fynden.',
        features: [
          '1 extern säkerhetskontroll varje månad',
          'Skriftlig rapport med remediering per fynd',
          '48 timmars konsultering som hjälper er IT att genomföra åtgärderna',
          'Löpande rådgivning till er IT-personal',
        ],
      },
      vecka: {
        name: 'Veckokontroll',
        cadence: '1 extern kontroll per vecka',
        description:
          'För verksamheter som inte har råd att vara sårbara i mer än några dagar — tätare kontroller och anpassad konsultering för att stänga problemen.',
        features: [
          '1 extern säkerhetskontroll varje vecka',
          'Skriftlig rapport med remediering per fynd',
          'anpassad konsultering för att stänga problemen',
          'Prioriterad hantering av kritiska fynd',
          'Kvartalsvis genomgång för säkerhetsledningen',
        ],
      },
      dag: {
        name: 'Daglig kontroll',
        cadence: '1 extern kontroll per dag',
        consultant: '24/7 konsultering · högsta prioritet',
        description:
          'Används nästan uteslutande av försvar och myndigheter. Angriparen får aldrig mer än ett dygn på sig — ofta mindre.',
        features: [
          '1 extern säkerhetskontroll varje dag',
          'Skriftlig rapport med remediering per fynd',
          '24/7 konsultering med högsta prioritet',
          'Anpassad för försvar, myndighet och kritisk infrastruktur',
          'Säkerhetsskydd och tystnadsplikt enligt högsta klass',
        ],
      },
    },
    requestQuote: 'Begär offert',
    bookCall: 'Boka ett samtal',
    largeNote: 'System över 100 exponerade adresser prissätts efter behovsanalys',
    consult: {
      eyebrow: 'Ingår i varje paket',
      title: 'En konsult som stannar kvar — inte bara en rapport.',
      cards: [
        {
          title: 'Remediering per fynd',
          text: 'Varje rapport beskriver exakt vad som är fel och hur det åtgärdas — prioriterat efter verklig risk.',
        },
        {
          title: '48 timmar efter varje kontroll',
          text: 'I Månadskontrollen ingår 48 timmars konsultering som hjälper er IT att genomföra åtgärderna.',
        },
        {
          title: '24/7 i dagspaketet',
          text: 'Daglig kontroll ger er konsultering dygnet runt, med prioritet på kritiska fynd.',
        },
      ],
    },
    form: {
      title: 'Boka ett samtal om er attackyta.',
      description:
        'Berätta hur många exponerade adresser och system ni har, så bekräftar vi pris och nivå. System över 100 exponerade adresser kräver en kortare behovsanalys först.',
      bullets: [
        'Direktsvar, alla dagar',
        'Kostnadsfritt första samtal',
        'Offert utan förpliktelser',
        'PGP finns för känslig kommunikation',
      ],
      options: {
        manad: 'Kontinuerlig säkerhetskontroll — Månadskontroll',
        vecka: 'Kontinuerlig säkerhetskontroll — Veckokontroll',
        dag: 'Kontinuerlig säkerhetskontroll — Daglig kontroll',
        large: 'System över 100 exponerade adresser — behovsanalys',
      },
    },
  },

  // ── CheckoutIntern ───────────────────────────────────────────────────
  checkoutIntern: {
    hero: {
      eyebrow: 'Intern säkerhetsrevision',
      titleLead: 'Säkerhet inifrån — där ',
      titleHighlight: 'ingen annan tittar',
      titleEnd: '.',
      description:
        'Externa kontroller ser det en angripare ser. Vi går djupare: behörigheter, loggning, isolation och allt det som avgör om ett intrång stannar vid en dator — eller sprider sig.',
    },
    rate: {
      eyebrow: 'Konsultering',
      perHour: '/ timme',
      text: 'Ni betalar för faktiskt arbete — inte för att vi ska lära oss ert system på er tid. Omfattning och tid bekräftas efter en kort behovsanalys.',
    },
    levels: {
      vanlig: {
        name: 'Vanlig säkerhet',
        level: 'Nivå 1',
        tagline: 'Fortfarande högre än vad någon annan aktör levererar.',
        description:
          'Genomgång av behörigheter, loggning, segmentering och rutiner inifrån. Krävs av många revisorer — och stänger dörrar som en extern kontroll aldrig ser.',
        features: [
          'Behörighets- och rollgenomgång',
          'Loggning, larmning och spårbarhet',
          'Rutiner för personal och leverantörer',
          'Slutrapport med prioriterad åtgärdsplan',
        ],
      },
      hog: {
        name: 'Hög säkerhet',
        level: 'Nivå 2',
        tagline: 'Förhöjd säkerhet där insidan inte litar på någon — inte ens sig själv.',
        description:
          'Nolltillitsarkitektur, segmenterade zoner och hemligheter som aldrig lämnar hårdvaran. För verksamheter med känsliga data och verkliga skyddsvärden.',
        features: [
          'Nolltillitsarkitektur och mikrosegmentering',
          'Kryptonyckelhantering och hemlighetsspridning',
          'Insider-skydd och anomalidetektering',
          'Beredskapsplan för intern incident',
        ],
      },
      militar: {
        name: 'Militär grad',
        level: 'Nivå 3',
        tagline: 'Systemen syns inte ens när någon pingar dem.',
        description:
          'Den högsta interna nivån vi levererar. Systemet existerar, men avger inget svar, inget fingeravtryck och ingen regelbundenhet. Reserverat för försvar, myndighet och kritisk infrastruktur.',
        features: [
          'Dold infrastruktur — inga svar vid sondering',
          'Avsiktligt brus mot fingeravtryck och tidsanalys',
          'Fysisk och logisk isolation av nyckelmaterial',
          'Kontinuerlig revision av hela kedjan inifrån',
          'Säkerhetskydd enligt högsta klass',
        ],
      },
    },
    requestReview: 'Begär revision',
    rateNote: 'Debiteras per konsulttimme',
    efficiency: {
      eyebrow: 'Effektivitet',
      title: 'Där en människa behöver sex timmar, behöver vi en.',
      paragraphFirst:
        'Vi arbetar med proprietära AI-verktyg genom hela revisionen. Det gör att komplexa uppdrag tar ungefär en sjättedel av tiden jämfört med enbart mänskliga säkerhetsexperter — utan att kompromissa med kvaliteten.',
      paragraphLead: 'Resultatet är inte bara snabbare. Det är ',
      paragraphHighlight: 'högre säkerhet',
      paragraphEnd: ' än en människa kan åstadkomma på egen hand.',
      cards: [
        {
          title: '1/6 av tiden',
          text: 'AI-verktygen analyserar systemet parallellt med konsulten — inte i efterhand.',
        },
        {
          title: 'Högre säkerhet',
          text: 'Ingen utmattning, inga genvägar och ingenstans att gömma ett fynd.',
        },
        {
          title: 'Osynligt resultat',
          text: 'På Militär grad lämnar vi ett system som inte ens svarar när någon sonderar det.',
        },
      ],
    },
    form: {
      title: 'Berätta vad som behöver skyddas.',
      description:
        'Ju känsligare miljö, desto mer vill vi veta innan vi ger ett estimat. Allt behandlas under tystnadsplikt och kan ske via PGP.',
      bullets: [
        'Kostnadsfri behovsanalys',
        'Estimat i konsulttimmar innan arbetet startar',
        'Arbetet sker på plats eller fjärrstyrt',
        'Tystnadsplikt och säkerhetsskydd enligt högsta klass',
      ],
      options: {
        vanlig: 'Intern säkerhetsrevision — Vanlig säkerhet',
        hog: 'Intern säkerhetsrevision — Hög säkerhet',
        militar: 'Intern säkerhetsrevision — Militär grad',
        unsure: 'Inte säker — behöver råd',
      },
    },
  },

  // ── CheckoutLedning ──────────────────────────────────────────────────
  checkoutLedning: {
    hero: {
      eyebrow: 'Säkerhetsledning',
      titleLead: 'Säkerhetsledning för dem som ',
      titleHighlight: 'fattar besluten',
      titleEnd: '.',
      description:
        'Säkerhet är ett ledningsansvar. Vi hjälper styrelse, ledning och säkerhetschef att fatta rätt beslut — innan något händer, inte efter.',
    },
    strategic: {
      title: 'Strategisk säkerhetsledning',
      text: 'En senior säkerhetsrådgivare i er ledningsgrupp. Vi tar fram säkerhetsstrategi, utbildar personalen och stöttar vid incidenter — med tystnadsplikt i alla led.',
      features: [
        'Säkerhetsstrategi på ledningsnivå',
        'Utbildning av personal och styrelse',
        'Stöd vid incidenter',
        'Tystnadsplikt i alla led',
        'Kan kombineras med kontroll och revision',
      ],
      requestQuote: 'Begär offert',
    },
    expert: {
      title: '24/7 säkerhetsexpert',
      text: 'En dedikerad säkerhetsexpert — som hela er organisation kan fråga när som helst. Ingen väntetid, ingen ärendekö, ingen fråga som är för liten.',
      price: 'Kommer snart',
      period: 'abonnemang',
      features: [
        'Svar dygnet runt, alla dagar',
        'Tillgänglig för alla i organisationen',
        'Utbildar personalen löpande',
        'Eskalerar till expert vid skarp incident',
      ],
      notifyMe: 'Meddela mig',
      note: 'Lämna din e-post i formuläret — du får besked först av alla.',
    },
    expertVatNote: '24/7 säkerhetsexpert är under utveckling och prissätts vid lansering',
    form: {
      title: 'Prata säkerhet på ledningsnivå.',
      description:
        'Vi talar ledningens språk, inte bara teknikens. Berätta om er organisation och era utmaningar — vi föreslår upplägg och återkommer med offert.',
      bullets: [
        'Första samtalet är alltid kostnadsfritt',
        'Vi talar ledningens språk, inte bara teknikens',
        'Tystnadsplikt i alla led',
        'Kan kombineras med kontroll och revision',
      ],
      options: {
        strategy: 'Säkerhetsledning — strategisk rådgivning',
        training: 'Säkerhetsledning — utbildning av personal',
        expert: '24/7 säkerhetsexpert — meddela mig när den lanseras',
      },
    },
  },

  // ── Success ──────────────────────────────────────────────────────────
  success: {
    eyebrow: 'Förfrågan mottagen',
    titleLead: 'Tack — vi återkommer ',
    titleHighlight: 'inom 10 minuter',
    titleEnd: '.',
    description:
      'Er förfrågan har registrerats. En säkerhetskonsult läser igenom den och kontaktar er på angiven jobbmejl med nästa steg och en första offert.',
    panelTitle: 'Allt är mottaget.',
    panelText:
      'Vill ni kommunicera känslig information redan nu? Be om vår PGP-nyckel i bekräftelsemailet — eller mejla oss direkt.',
    ctaHome: 'Tillbaka till startsidan',
    ctaPapers: 'Läs våra papers',
  },

  // ── Business Profile ─────────────────────────────────────────────────
  businessProfile: {
    hero: {
      eyebrow: 'Business Profile',
      titleLead: 'Ert företags ',
      titleHighlight: 'säkerhetskonto',
      titleEnd: '.',
      description:
        'Hantera prenumeration, rapportmottagare och konto. Full funktionalitet aktiveras när portalen lanseras i fas B.',
    },
    account: 'Konto',
    company: 'Företag',
    orgNumber: 'Organisationsnummer',
    contactPerson: 'Kontaktperson',
    email: 'E-post',
    subscription: 'Prenumeration',
    subscriptionName: 'Kontinuerlig säkerhet',
    nextInvoice: 'Nästa faktura: —',
    managePayment: 'Hantera betalning',
    upgradePackage: 'Uppgradera paket',
    pgpRecipients: 'Rapportmottagare (PGP)',
    pgpText:
      'Säkerhetsrapporter levereras krypterat till er IT-ansvarige. Lägg till mottagare och PGP-nycklar när portalen lanseras.',
    itResponsible: 'IT-ansvarig',
    pgpKey: 'PGP-nyckel',
    noKeyAdded: 'Ingen nyckel tillagd',
    addRecipient: 'Lägg till mottagare',
    accountActions: 'Kontoåtgärder',
    pauseSubscription: 'Pausa prenumeration',
    deleteAccount: 'Radera konto',
    logout: 'Logga ut',
    phaseBNote: 'Aktiveras med inloggning i fas B (säker autentisering via e-post).',
  },

  // ── Papers ───────────────────────────────────────────────────────────
  papers: {
    hero: {
      eyebrow: 'Papers',
      titleLead: 'Tankar och forskning ',
      titleHighlight: 'värda att läsa',
      titleEnd: '.',
      description:
        'Vetenskapliga rapporter, hypoteser och essäer om AI, teoretisk fysik, filosofi och säkerhet. För kunder, forskare och den nyfikne.',
    },
    coming: 'Kommande',
    publishedSoon: 'Publiceras inom kort',
    categories: [
      {
        title: 'Artificiell intelligens',
        text: 'Säkerhetsimplikationer av AI-system, resonerande modeller och autonomi.',
        papers: [
          { title: 'När modellen tänker själv — autonoma hackers' },
          { title: 'AI som attackyta: prompt, data och supply chain' },
        ],
      },
      {
        title: 'Teoretisk fysik',
        text: 'Entropi, information och tid — grundforskning som formar hur vi tänker om säkerhet.',
        papers: [
          { title: 'Entropi som intelligensmått: varför harmoni är ett mer effektivt energiläge' },
          { title: 'Tid, observation och sårbarhet — ett fysikaliskt perspektiv' },
        ],
      },
      {
        title: 'Filosofi',
        text: 'Etik, frihet och ansvar i en värld av övervakning och motståndare.',
        papers: [
          { title: 'Att försvara det öppna samhället med slutna medel' },
          { title: 'Förtroende är en sårbarhet — och vår viktigaste resurs' },
        ],
      },
      {
        title: 'Säkerhetsforskning',
        text: 'Metoder, motståndare och lärdomar från fyra decennier i fält.',
        papers: [
          { title: 'Utländska aktörers tålamod: långa kampanjer mot svenska mål' },
          { title: 'Kontinuerlig säkerhet — varför engångskontroller inte räcker' },
        ],
      },
    ],
    newsletter: {
      title: 'Få nya papers direkt.',
      text: 'Prenumerera på vårt nyhetsbrev — högst ett mejl i månaden, krypterat om du vill, och alltid avpublicerbart med ett klick.',
      emailLabel: 'E-postadress',
      emailPlaceholder: 'jobbmejl@foretag.se',
      subscribe: 'Prenumerera',
    },
  },

  // ── Legal ────────────────────────────────────────────────────────────
  legal: {
    hero: {
      eyebrow: 'Legal',
      titleLead: 'Juridik, ',
      titleHighlight: 'tydligt och kort',
      titleEnd: '.',
      description: 'Integritetspolicy, användarvillkor och cookieinformation. Skrivna för att läsas — inte för att begravas.',
    },
    updatedPrefix: 'Senast uppdaterad: 2026-10-03',
    sections: [
      {
        title: 'Integritetspolicy',
        body: [
          'Entropic Defence AB ("vi", "oss") värnar din integritet. Denna policy beskriver hur vi hanterar personuppgifter när du besöker entropicdefence.com, kontaktar oss eller anlitar våra tjänster.',
          'Vi samlar in de uppgifter du själv lämnar: namn, företag, organisationsnummer, e-post och det du skriver i kontaktformulär. Vi använder uppgifterna enbart för att besvara förfrågningar, offerera och fullgöra avtal.',
          'Vi säljer aldrig dina uppgifter och delar dem endast med de leverantörer som krävs för att driva tjänsten (t.ex. hosting) under avtal som skyddar dina uppgifter. Uppgifter raderas när de inte längre behövs, dock senast i enlighet med gällande bokförings- och säkerhetslagstiftning.',
          'Rättslig grund: berättigat intresse och/eller avtal. Du har rätt att begära registerutdrag, rättelse, radering och dataportabilitet. Kontakta oss på support@entropicdefence.com.',
        ],
      },
      {
        title: 'Användarvillkor',
        body: [
          'Innehållet på entropicdefence.com tillhandahålls i informationssyfte. Vi strävar efter korrekthet men lämnar inga garantier för att innehållet alltid är fullständigt eller aktuellt.',
          'Alla texter, grafik och varumärken tillhör Entropic Defence AB om inget annat anges. Innehåll får inte kopieras, spridas eller användas kommersiellt utan skriftligt tillstånd.',
          'Tjänster som beskrivs på webbplatsen regleras alltid av separat skriftligt avtal. Inget på webbplatsen utgör ett bindande anbud.',
          'Vid säkerhetsrelaterade frågor om våra system, se vår sida för Advisories & Disclosures.',
        ],
      },
      {
        id: 'tystnadsplikt',
        title: 'Tystnadsplikt',
        body: [
          'Beställare godkänner att våra agenter och konsulter har laglig rätt att genomföra penetrationstester inom de överenskomna ramarna. Där kritiska sårbarheter upptäcks skall dessa rapporteras så snabbt som möjligt till beställaren.',
          'Utförare skall ej genomföra tester som kan skadligt påverka infrastrukturen. Skrivna instruktioner skall godkännas av beställaren före eventuell test. Vi genomför aldrig destruktiva tester utan explicit godkännande.',
          'Vårt åtagande innefattar absolut tystnadsplikt om inte annat överenskommits. Vi berättar inte ens vilka våra kunder är.',
          'Sekretess är standard i varje uppdrag, oavsett storlek. Vi arbetar enligt fasta rutiner: lägsta möjliga behörighet i era system, krypterad lagring av fynd och rapporter, och avgränsade arbetsytor per kund.',
          'Vi tecknar gärna separat sekretessavtal (NDA) innan första mötet och kan arbeta under ert befintliga avtal. Våra konsulter är säkerhetsprövade och bundna av tystnadsplikt även efter uppdragets slut — och vi berättar aldrig vilka våra kunder är.',
        ],
      },
      {
        title: 'Cookies',
        body: [
          'Vi använder inga spårningscookies och ingen tredjepartsannonsering. De enda cookies som kan förekomma är nödvändiga sessionscookies för att webbplatsen ska fungera tekniskt.',
          'Om vi i framtiden inför valfria analyscookies kommer vi att be om ditt samtycke först, i enlighet med lagen om elektronisk kommunikation.',
          'Du kan alltid blockera eller radera cookies i din webbläsares inställningar. Webbplatsen fungerar fullt ut utan dem.',
        ],
      },
    ],
    questions: 'Frågor om juridik eller dataskydd?',
  },

  // ── Support & FAQ ────────────────────────────────────────────────────
  support: {
    hero: {
      eyebrow: 'Support & FAQ',
      titleLead: 'Hjälp när ni behöver den — ',
      titleHighlight: 'dygnet runt',
      titleEnd: '.',
      description:
        'Välj om du vill kontakta vår jour direkt eller hitta svar i vanliga frågor nedan. Vid akuta incidenter, märk ämnesraden med INCIDENT.',
    },
    duty: {
      title: 'Prata med vår jour',
      text: 'Vår jour svarar dygnet runt. Vanliga frågor får direktsvar och incidenter hanteras diskret.',
      badge: 'Online · 24/7',
    },
    faqTitle: 'Vanliga frågor',
    faqs: [
      {
        q: 'Vad menas med "kontinuerlig säkerhet"?',
        a: 'Att säkerhet inte är ett projekt med ett slutdatum, utan en pågående process: övervakning, hotjakt, granskning av leverantörer och återkommande kontroller — dygnet runt, året om.',
      },
      {
        q: 'Svarar ni verkligen 24/7?',
        a: 'Ja, vår jour är bemannad dygnet runt, alla dagar om året.',
      },
      {
        q: 'Hur skickas säkerhetsrapporter?',
        a: 'Krypterat med PGP till de rapportmottagare ni anger — vanligtvis IT-ansvarig eller säkerhetschef. Ni bestämmer själva mottagare och nycklar.',
      },
      {
        q: 'Är ni oberoende?',
        a: 'Ja. Vi säljer ingen hårdvara eller mjukvara och tar ingen provision från leverantörer. Vår enda intäkt är rådgivningen — vår enda lojalitet är ert skydd.',
      },
      {
        q: 'Vad kostar det?',
        a: 'Varje verksamhet är unik, därför offererar vi alltid. För mindre system med färre exponerade adresser har vi fasta priser — se våra paket under "Välj paket". Första samtalet är kostnadsfritt och utan förpliktelser.',
      },
      {
        q: 'Arbetar ni under tystnadsplikt?',
        a: 'Absolut konfidentialitet är standard i varje uppdrag, oavsett storlek. Vi tecknar gärna separata sekretessavtal innan första mötet. Våra konsulter är noggrant säkerhetsprövade.',
      },
    ],
    contactTitle: 'Kontakta oss',
    contactText: 'Mejla oss direkt — vår jour svarar dygnet runt.',
    sentTitle: 'Meddelandet är skickat.',
    sentText: 'Du får direktsvar. Vid akuta ärenden, märk mejlet med INCIDENT.',
    form: {
      name: 'Namn *',
      namePlaceholder: 'För- och efternamn',
      email: 'E-post *',
      emailPlaceholder: 'namn@foretag.se',
      subject: 'Ämne *',
      subjectPlaceholder: 'Välj ämne…',
      subjectOptions: {
        serviceQuestion: 'Fråga om tjänster',
        ongoingSupport: 'Support för pågående uppdrag',
        incident: 'Incident (akuta ärenden)',
        other: 'Övrigt',
      },
      message: 'Meddelande *',
      messagePlaceholder: 'Hur kan vi hjälpa er?',
      send: 'Skicka meddelande',
    },
  },

  // ── Advisories & Disclosures ─────────────────────────────────────────
  advisories: {
    hero: {
      eyebrow: 'Advisories & Disclosures',
      titleLead: 'Koordinerad ',
      titleHighlight: 'sårbarhetsrapportering',
      titleEnd: '.',
      description:
        'Har du hittat en sårbarhet i våra system eller tjänster? Vi tar det på allvar — och vi lovar att hantera det professionellt och snabbt.',
    },
    report: 'Rapportera',
    reportText: 'Mejla detaljerna till oss. Använd gärna vår PGP-nyckel för känsliga fynd.',
    pgpKey: 'PGP-nyckel',
    pgpText: 'Publiceras inom kort. Kontakta oss så skickar vi nyckeln direkt.',
    fingerprint: 'Fingerprint: —',
    promise: 'Vårt löfte',
    promiseText:
      'Bekräftelse inom 72 timmar. Koordinerad publicering. Inga rättsliga åtgärder mot den som rapporterar i god tro.',
    activeTitle: 'Aktiva advisories',
    activeText:
      'Inga publika säkerhetsadvisories just nu. När en sårbarhet åtgärdats och koordinerats publicerar vi en teknisk sammanfattning här.',
  },

  // ── Disclosures ──────────────────────────────────────────────────────
  // ── Säkerhetsstatus ──────────────────────────────────────────────────
  disclosures: {
    hero: {
      eyebrow: 'Disclosures',
      titleLead: 'Det vi kan ',
      titleHighlight: 'berätta öppet',
      titleEnd: '.',
      description:
        'Utvalda delar av vårt arbete som vi kan beskriva öppet — vår proprietära AI-analys och erfarenheten bakom våra uppdrag för regering och försvar. Allt annat förblir klassificerat.',
    },
    ai: {
      eyebrow: 'Proprietär AI-analys',
      title: 'Red Flag – Ethical hacker',
      lead:
        'Red Flag – Ethical hacker är vår egen analysplattform för AI-driven riskidentifiering. Specialiserade agenter kartlägger målet, hittar avvikelser och testar dem — automatiskt och kontinuerligt — medan varje fynd verifieras av en konsult innan det når en rapport. Det en manuell granskning stickprovstestar i mänsklig takt analyserar plattformen i sin helhet på minuter.',
      paragraphs: [
        'Vårt verktyg Red Flag – Ethical hacker består av ett antal agenter som är specialiserade på olika uppgifter, men som kan användas tillsammans för att nå mål som annars är svåra.',
        'Våra tester mot levande, viktig infrastruktur — framför allt i Schweiz — har visat en träffsäkerhet över 90 procent, med intrång uppnått hos stora företag (100 platser eller fler) inom minuter.',
        'Vi testar ständigt och lägger ibland till nya kapacitetsagenter som vi tror passar.',
      ],
      agentsTitle: 'Agenterna',
      methodLabel: 'Metod',
      agents: [
        {
          title: 'Pen X-agenten',
          lead:
            'En hackagent som kan användas för att testa eller penetrera utifrån, med normal åtkomst.',
          method: [
            'Använder alla tillgängliga verktyg för att försöka få åtkomst, eskalera behörigheter eller hitta hål i försvaret. Testar för zero day-sårbarheter och kända CVE:er.',
          ],
        },
        {
          title: 'Infrastrukturanalys-agenten',
          lead: 'Kartlägger och dokumenterar miljön.',
          method: [
            'Kartlägger infrastrukturen med ett admin-konto och verifierar att kartan är komplett.',
            'Testar enligt dokumentationen för infrastrukturanalys.',
            'Levererar en rapport som visar de kartlagda strukturerna. Den kan innehålla förslag på omstrukturering, men huvudsyftet är att ge underlag till Pen I-agenten.',
          ],
        },
        {
          title: 'Pen I-agenten',
          lead: 'Intern penetrationstestning — inuti nätverket, med admin-åtkomst.',
          method: [
            'Läser infrastrukturrapporten och testar för sårbarheter.',
            'Tar fram en plan för att åtgärda de risker som hittas.',
            'Bedömer arbetsinsatsen för att åtgärda sårbarheterna — till exempel isolering av nätverk och servrar och specifik härdning av utsatta punkter.',
            'Vår infrastrukturanalys testar vad som skulle hända om någon penetrerade de yttre lagren. Detta innebär manuellt arbete och ger en eller flera rapporter som IT-avdelningen kan använda som rekommendationer för olika säkerhetsnivåer, i prioritetsordning.',
          ],
        },
        {
          title: 'Triage-agenten',
          lead:
            'Verifieringsagent som startas av penetrationsagenterna när en skriftlig rapport finns.',
          method: [
            'Läser rapporten och testar igenom alla POC:er samt sparar bevis.',
            'Kommunicerar med penetrationsagenten så att rapporten bara innehåller verkliga, verifierade fynd med säkerhetspåverkan.',
          ],
        },
      ],
      manualTitle: 'Manuell granskning',
      manualText: [
        'AI har kommit långt, men den kan fortfarande hitta på saker — hur välskrivna prompts man än använder. Den är också begränsad inom områden som fantasi och saknar det vi kallar intuition.',
        'På grund av dessa begränsningar gör vi alltid en manuell bedömning av varje fynd och säkerställer att POC:erna är fullt fungerande. Minst en konsult följer dessutom AI:n under den inledande bedömningen.',
      ],
    },
    gov: {
      eyebrow: 'Regeringsuppdrag & militära system',
      title: 'Regeringsuppdrag',
      paragraphs: [
        'Grundaren av företaget har i stor utsträckning arbetat inom svensk regering och militär och har designat ett antal klassificerade system i nära samarbete med militär underrättelsetjänst och signalspaning.',
        'Inom allt säkerhetsarbete är de sista fem procenten de svåraste och dyraste att designa och implementera. Denna nivå av säkerhet är oftast förbehållen klassificerat hemliga system. Vi har tjugo års erfarenhet av denna nivå och kan göra ert system godtyckligt härdat — så nära 100 procent som det går. Var bara medveten om att kostnaden ökar snabbt för de allra sista procenten.',
      ],
      militaryTitle: 'Militära system',
      militaryText: [
        'Vi har arbetat många år med militära system och har därför lång erfarenhet av den nivå av driftsäkerhet och säkerhet som krävs för dessa. Vi kan ge rekommendationer för härdning av system och även för redundans och driftsäkerhet.',
      ],
    },
  },

  status: {
    hero: {
      eyebrow: 'Säkerhetsstatus',
      titleLead: 'Följ er kontroll ',
      titleHighlight: 'steg för steg',
      titleEnd: '.',
      description:
        'Här ser ni exakt var i processen er säkerhetskontroll befinner sig. Uppdateringar och rapporter når er via mejl — till er IT-ansvarige, ansvarige chef eller säkerhetschef.',
    },
    assignment: 'Uppdrag ED-2026-014',
    assignmentTitle: 'Kontinuerlig säkerhet — exempelkund',
    progress: 'Pågår · 40%',
    stages: [
      { title: 'Intag och planering', text: 'Kartläggning av system, mål och tidplan.' },
      { title: 'Teknisk granskning', text: 'Penetrationstester och sårbarhetsanalys av infrastruktur och applikationer.' },
      { title: 'Mänsklig granskning', text: 'Intervjuer, rutiner och medvetenhet hos personalen.' },
      { title: 'Leverantörsgranskning', text: 'Genomgång av supply chain och tredjepartsberoenden.' },
      { title: 'Rapport och åtgärdsplan', text: 'Slutrapport krypterad med PGP till utsedda mottagare.' },
    ],
    pgpDelivery: 'PGP-leverans',
    pgpDeliveryText:
      'Slutrapporter och löpande uppdateringar skickas till de mejladresser ni utser — IT-ansvarig, ansvarig chef eller säkerhetschef. Vill ni ha dem PGP-krypterade kommer vi överens om nyckel över säker kanal. Inga konton behövs.',
    manageRecipients: 'Mejla oss om mottagare',
  },

  // ── 404 ──────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: 'Felkod 404',
    title: 'Signalförlust.',
    description: 'Sidan du söker finns inte — eller har flyttats till en säkrare plats. Fältet leder dig tillbaka.',
    ctaHome: 'Tillbaka till startsidan',
    ctaSupport: 'Kontakta support',
  },
}

export type Dictionary = typeof sv
