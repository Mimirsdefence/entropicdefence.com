import type { Dictionary } from './sv'

// Slovenski prevod (sl) — vse strani. Ključi so enaki kot v `sv.ts`.
export const sl: Dictionary = {
  // ── Naslovi dokumentov in meta (App.tsx) ─────────────────────────────
  meta: {
    home: {
      title: 'Entropic Defence — Neprekinjeno varovanje pred tujimi akterji',
      description:
        'Entropic Defence AB. Več kot 40 let varnostnega dela na najvišji svetovni varnostni stopnji. Neprekinjeno varovanje, zunanji varnostni pregledi in svetovanje za podjetja, državne organe in kritično infrastrukturo.',
    },
    checkout: {
      title: 'Izberite paket — Entropic Defence',
      description:
        'Fiksne cene za neprekinjeno varovanje: zunanji pregled, notranja revizija in varnostno vodenje. Od 18 700 kr na mesec.',
    },
    checkoutExtern: {
      title: 'Neprekinjeni varnostni pregled — Entropic Defence',
      description:
        'Fiksna cena glede na število izpostavljenih naslovov. Mesečni, tedenski ali dnevni pregled s poročilom, odpravo in prilagojenim svetovalnim časom.',
    },
    checkoutIntern: {
      title: 'Notranja varnostna revizija — Entropic Defence',
      description:
        'Tri varnostne ravni — običajna, visoka in vojaška stopnja. Pravice, beleženje in izolacija. Orodja AI skrajšajo čas na šestino.',
    },
    checkoutLedning: {
      title: 'Varnostno vodenje — Entropic Defence',
      description:
        'Strateško varnostno svetovanje za vodstvo in upravo, usposabljanje zaposlenih in varnostni strokovnjak 24/7, ki prihaja kmalu.',
    },
    success: {
      title: 'Povpraševanje prejeto — Entropic Defence',
      description: 'Vaše povpraševanje je prejeto. Svetovalec se bo oglasil v najkrajšem času.',
    },
    businessProfile: {
      title: 'Business Profile — Entropic Defence',
      description:
        'Varnostni račun vašega podjetja: naročnina, prejemniki poročil (PGP) in nastavitve računa.',
    },
    papers: {
      title: 'Papers — Entropic Defence',
      description:
        'Znanstvena poročila, hipoteze in eseji o umetni inteligenci, teoretični fiziki, filozofiji in varnosti.',
    },
    legal: {
      title: 'Pravno — Entropic Defence',
      description: 'Politika zasebnosti, pogoji uporabe in informacije o piškotkih.',
    },
    support: {
      title: 'Podpora in pogosta vprašanja — Entropic Defence',
      description: 'Pogosta vprašanja in podpora strankam. Naša dežurna služba odgovarja 24 ur na dan.',
    },
    advisories: {
      title: 'Obvestila in razkritja — Entropic Defence',
      description:
        'Usklajeno poročanje o ranljivostih. Ste našli ranljivost v naših sistemih? To jemljemo resno.',
    },
    status: {
      title: 'Varnostni status — Entropic Defence',
      description:
        'Spremljajte svoj varnostni pregled v realnem času. Poročila se dostavijo šifrirano s PGP.',
    },
    notFound: {
      title: 'Strani ni mogoče najti — Entropic Defence',
      description: 'Stran, ki jo iščete, ne obstaja — ali je bila premaknjena na varnejše mesto.',
    },
  },

  // ── Skupne besede in fraze ───────────────────────────────────────────
  common: {
    vatNote: 'Cene brez DDV',
    launchPrice: 'Uvodna cena',
    exclVat: 'brez DDV',
    perMonthShort: '/mesec',
    perMonth: 'na mesec',
    perConsultantHour: 'na svetovalno uro',
    perHour: '/ uro',
    perAssignment: 'na nalogo',
    quote: 'Ponudba',
    recommended: 'Priporočeno',
    mostPopular: 'Najbolj priljubljeno',
    comingSoon: 'Kmalu na voljo',
    allPackages: 'Vsi paketi',
    active: 'Aktivno',
    ongoing: 'V teku',
    from: 'Od',
    currency: 'kr',
    chooseLanguage: 'Izberite jezik',
    language: 'Jezik',
    // Izbirnik obdobja
    periodLabel: 'Obračunsko obdobje',
    periods: {
      month: 'Mesec',
      quarter: 'Četrtletje',
      year: 'Leto',
    },
    savings: {
      quarter: '10 % popusta',
      year: '3 mesece brezplačno',
    },
  },

  // ── Navigacija ───────────────────────────────────────────────────────
  nav: {
    services: 'Storitve',
    advisories: 'Obvestila',
    papers: 'Papers',
    support: 'Podpora',
    talkToConsultant: 'Pogovor s svetovalcem',
    homeAria: 'Entropic Defence — domača stran',
    mainMenu: 'Glavni meni',
    mobileMenu: 'Mobilni meni',
    closeMenu: 'Zapri meni',
    openMenu: 'Odpri meni',
  },

  // ── Noga ─────────────────────────────────────────────────────────────
  footer: {
    tagline:
      'Neprekinjeno varovanje pred tujimi akterji. Več kot 40 let na najvišji svetovni varnostni stopnji — za podjetja, državne organe in kritično infrastrukturo.',
    columnNavigation: 'Navigacija',
    columnCompany: 'Podjetje',
    linkServices: 'Storitve',
    linkAdvisories: 'Obvestila',
    linkPapers: 'Papers',
    linkStatus: 'Varnostni status',
    linkPackages: 'Izberite paket',
    linkBusinessProfile: 'Business Profile',
    linkSupport: 'Podpora in pogosta vprašanja',
    linkLegal: 'Pravno',
    location: 'Stockholm · Švedska',
    copyright: '© 2026 Entropic Defence. Vse pravice pridržane.',
  },

  // ── Plavajoči gumb CTA ───────────────────────────────────────────────
  floatingCta: 'Pogovor s svetovalcem 24/7',

  // ── Obrazci ──────────────────────────────────────────────────────────
  forms: {
    company: 'Podjetje *',
    companyPlaceholder: 'Entropic Defence AB',
    orgNumber: 'Matična številka',
    orgNumberPlaceholder: '559999-9999',
    contactPerson: 'Kontaktna oseba *',
    namePlaceholder: 'Ime in priimek',
    workEmail: 'Službeni e-naslov *',
    emailPlaceholder: 'ime@podjetje.si',
    interestedIn: 'Zanima me *',
    choosePackage: 'Izberite paket …',
    notSure: 'Nisem prepričan — potrebujem nasvet',
    describe: 'Opišite svojo dejavnost in ogroženost',
    describePlaceholder: 'Na kratko o vaši dejavnosti, sistemih in tem, kar želite zaščititi …',
    sendRequest: 'Pošlji povpraševanje',
    sending: 'Pošiljanje …',
    sendError:
      'Pri pošiljanju sporočila je prišlo do napake. Poskusite znova ali nam pišite neposredno.',
    consentBefore: 'S pošiljanjem se strinjate z našo ',
    consentLink: 'politiko zasebnosti',
    consentAfter: '. Vaših podatkov nikoli ne delimo s tretjimi osebami.',
  },

  // ── Domača stran ─────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: 'Neprekinjeno varovanje · Švedska',
      titleLead: 'Varnost, ki ',
      titleHighlight: 'upogne sliko groženj',
      titleEnd: ' — 24 ur na dan.',
      description:
        'Entropic Defence ščiti podjetja, državne organe in kritično infrastrukturo pred tujimi akterji. Več kot 40 let na najvišji svetovni varnostni stopnji — od vladnih in vojaških sistemov do vaše dejavnosti.',
      ctaPrimary: 'Pogovor s svetovalcem',
      ctaSecondary: 'Oglejte si varnostne pakete',
    },
    stats: [
      { value: '40+', label: 'let na najvišji svetovni varnostni stopnji' },
      { value: '24/7', label: 'neprekinjeno spremljanje in lov na grožnje' },
      { value: '100%', label: 'neodvisno svetovanje' },
    ],
    trustStrip: [
      'Ozadje',
      'Vladni projekti',
      'Vojaški sistemi',
      'Kritična infrastruktura',
      'Molčečnost kot standard',
    ],
    hotbild: {
      eyebrow: 'Slika groženj se je spremenila',
      titleLead: 'Ni več vprašanje ',
      titleEm: 'ali',
      titleMiddle: ' bo kdo poskusil — vprašanje je ',
      titleHighlight: 'kdaj',
      titleEnd: '.',
      description:
        'Z državno podporo delujoči akterji prav zdaj kartirajo evropske organizacije — dobavne verige, zaposlene in izpostavljene sisteme. Kdor ne nadzoruje sebe, je že pod nadzorom.',
      terminal: [
        'grožnje: akterji z državno podporo',
        'vektorji: dobavna veriga · notranji · AI',
        'izpostavljenost: kartiranje poteka',
        'status:',
      ],
      terminalActive: 'NEPREKINJEN NADZOR AKTIVEN',
    },
    services: {
      eyebrow: 'Storitve',
      title: 'Štirje načini, kako varujemo vašo dejavnost.',
      items: [
        {
          title: 'Neprekinjeni varnostni pregled',
          text: 'Zunanji pregledi, ki si nikoli ne vzamejo odmora — mesečno, tedensko ali dnevno. Najdemo, kar bi našel napadalec, in to zapremo.',
        },
        {
          title: 'Notranja varnostna revizija',
          text: 'Poglobljena utrditev vašega notranjega okolja: pravice, beleženje in izolacija. Celovit pregled, prilagojen vašemu profilu tveganja in zahtevam.',
        },
        {
          title: 'Varnostno vodenje',
          text: 'Strateško svetovanje za vodstvo in upravo — in varnostni strokovnjak 24/7, ki usposablja vaše zaposlene.',
        },
        {
          title: 'Lastna analiza z umetno inteligenco',
          text: 'Naša lastna orodja AI kartirajo grožnje, prepoznajo odstopanja in zapirajo ranljivosti v realnem času — preden napadalec lahko ukrepa.',
        },
      ],
    },
    background: {
      eyebrow: 'Štiri desetletja',
      title: '40 let na najvišji svetovni varnostni stopnji.',
      paragraphs: [
        'Entropic Defence je nastal iz spoznanja: evropski varnostni trg se odziva, namesto da bi preprečeval. Podjetje smo zgradili, da bi delali obratno.',
        'Naši svetovalci prihajajo iz obrambnega in obveščevalnega sveta. Varovali smo vladne sisteme, vojaška omrežja in za družbo kritično infrastrukturo — pred najbolj vztrajnimi nasprotniki, kar jih obstaja.',
      ],
      points: [
        'Izkušnje iz obrambe, obveščevalnih služb in državne uprave',
        'Molčečnost in varnostno varovanje pri vsakem projektu',
        'Neodvisnost — ne prodajamo strojne ali programske opreme',
        'Neprekinjenost — ista ekipa vas spremlja skozi čas',
      ],
    },
    process: {
      eyebrow: 'Kako delamo',
      title: 'Od prvega pogovora do neprekinjene varnosti.',
      steps: [
        {
          title: 'Pogovor',
          text: 'Razumemo vašo dejavnost, sisteme in to, kar je treba dejansko zaščititi.',
        },
        {
          title: 'Kartiranje in nadzor',
          text: 'Grožnje, napadalna površina ter zunanji in notranji pregledi za prepoznavanje vaših ranljivosti.',
        },
        {
          title: 'Ukrep',
          text: 'Naši svetovalci ostanejo in pomagajo vaši IT ekipi zapreti ugotovitve — brez poročila, ki bi samo obležalo.',
        },
        {
          title: 'Neprekinjenost',
          text: 'Varnost ni projekt z datumom zaključka. Vračamo se — in sistem ostaja pod nadzorom.',
        },
      ],
    },
    contact: {
      eyebrow: '24/7 · Takojšen odgovor',
      title: 'Pogovorite se s svetovalcem o svoji ogroženosti.',
      description:
        'Prvi pogovor in zunanji varnostni pregled sta brezplačna in brez obveznosti. Povejte nam o svoji dejavnosti — mi vam povemo, kje ste ranljivi.',
      ctaMail: 'Pišite nam neposredno',
      ctaSupport: 'Naši paketi',
    },
    papersCta: {
      text: 'Vas zanima, kako razmišljamo? Preberite naše članke o umetni inteligenci, fiziki in varnosti.',
      cta: 'Na Papers',
    },
  },

  // ── /checkout ────────────────────────────────────────────────────────
  checkout: {
    hero: {
      eyebrow: 'Izberite paket',
      titleLead: 'Varnost, ki je vredna ',
      titleHighlight: 'vsakega centa',
      titleEnd: '.',
      description:
        'Fiksne cene za neprekinjene preglede in notranjo revizijo — ponudba tam, kjer projekt zahteva več. Odprite paket in si oglejte cene ter ravni.',
    },
    categories: [
      {
        name: 'Neprekinjeni varnostni pregled',
        period: 'na mesec',
        description:
          'Zunanji pregledi, ki si nikoli ne vzamejo odmora — mesečno, tedensko ali dnevno. Poročilo, odprava in prilagojen svetovalni čas so vključeni.',
        features: [
          'Mesečni, tedenski ali dnevni pregled',
          'Fiksna cena glede na število izpostavljenih naslovov',
          'Odprava vsake ugotovitve',
          'Svetovalni čas od 48 h do 24/7',
        ],
      },
      {
        name: 'Notranja varnostna revizija',
        period: 'na svetovalno uro',
        description:
          'Sistem, utrjen od znotraj, približno enkrat na leto. Tri ravni — od običajne varnosti do vojaške stopnje.',
        features: [
          'Tri ravni glede na vaše potrebe',
          'Pravice, beleženje in izolacija',
          'Sistemi, ki se ne odzivajo na sondiranje',
          'Orodja AI skrajšajo čas na šestino',
        ],
      },
      {
        name: 'Varnostno vodenje',
        period: 'na nalogo',
        description:
          'Strateško svetovanje za vodstvo in upravo — in varnostni strokovnjak 24/7, ki usposablja vaše zaposlene. Strokovnjak prihaja kmalu.',
        features: [
          'Varnostna strategija na ravni vodstva',
          'Usposabljanje zaposlenih in uprave',
          'Podpora ob incidentih',
          'Strokovnjak za varnost 24/7 — kmalu',
        ],
      },
    ],
    seePackages: 'Oglejte si pakete in cene',
    scrollHint: 'Pomaknite se navzgor za ogled paketov',
    form: {
      title: 'Povejte nam o svoji dejavnosti.',
      description:
        'Več ko vemo, boljša je ponudba — še posebej za sisteme z več kot 100 izpostavljenimi naslovi in notranjo revizijo. Vse, kar pošljete, je zaupno.',
      bullets: [
        'Takojšen odgovor, vsak dan',
        'Prvi pogovor brezplačno',
        'Ponudba brez obveznosti',
        'PGP za zaupno komunikacijo',
      ],
    },
    options: {
      external: 'Neprekinjeni varnostni pregled',
      internal: 'Notranja varnostna revizija',
      leadership: 'Varnostno vodenje',
      unsure: 'Nisem prepričan — potrebujem nasvet',
    },
  },

  // ── /checkout/extern ─────────────────────────────────────────────────
  checkoutExtern: {
    hero: {
      eyebrow: 'Neprekinjeni varnostni pregled',
      titleLead: 'Fiksna cena za varnost, ki ',
      titleHighlight: 'nikoli ne počiva',
      titleEnd: '.',
      description:
        'Zunanji pregledi, ki si nikoli ne vzamejo odmora — mesečno, tedensko ali dnevno. Z vsakim paketom prejmete poročilo, odpravo in prilagojen svetovalni čas, ki vaši IT ekipi pomaga zapreti ugotovitve.',
    },
    tierLabel: 'Število izpostavljenih naslovov',
    tierAria: 'Izberite število izpostavljenih naslovov',
    tiers: {
      small: {
        label: 'Manj kot 20 izpostavljenih naslovov',
        short: 'Manj kot 20 naslovov',
        note: 'Manjši sistem z manj kot 20 izpostavljenimi naslovi.',
      },
      medium: {
        label: '20–100 izpostavljenih naslovov',
        short: '20–100 naslovov',
        note: 'Srednje veliki sistemi z več površinami in povezavami.',
      },
      large: {
        label: 'Več kot 100 izpostavljenih naslovov',
        short: 'Več kot 100 naslovov',
        note: 'Kompleksni sistemi — cena po analizi potreb.',
      },
    },
    plans: {
      manad: {
        name: 'Mesečni pregled',
        cadence: '1 zunanji pregled na mesec',
        description:
          'Osnova, ki teče ves čas: en celovit zunanji pregled vsak mesec, s predlogi ukrepov in prilagojenim svetovalnim časom za odpravo ugotovitev.',
        features: [
          '1 zunanji varnostni pregled vsak mesec',
          'Pisno poročilo z odpravo za vsako ugotovitev',
          '48 ur svetovalnega časa, ki vaši IT ekipi pomaga izvesti ukrepe',
          'Sprotno svetovanje vaši IT ekipi',
        ],
      },
      vecka: {
        name: 'Tedenski pregled',
        cadence: '1 zunanji pregled na teden',
        description:
          'Za organizacije, ki si ne morejo privoščiti ranljivosti več kot nekaj dni — pogostejši pregledi in prilagojen svetovalni čas za odpravo težav.',
        features: [
          '1 zunanji varnostni pregled vsak teden',
          'Pisno poročilo z odpravo za vsako ugotovitev',
          'prilagojen svetovalni čas za odpravo težav',
          'Prednostna obravnava kritičnih ugotovitev',
          'Četrtletni pregled za vodstvo',
        ],
      },
      dag: {
        name: 'Dnevni pregled',
        cadence: '1 zunanji pregled na dan',
        consultant: 'Svetovalni čas 24/7 · najvišja prioriteta',
        description:
          'Uporabljajo ga skoraj izključno obramba in državni organi. Napadalec nikoli ne dobi več kot en dan — pogosto manj.',
        features: [
          '1 zunanji varnostni pregled vsak dan',
          'Pisno poročilo z odpravo za vsako ugotovitev',
          'Svetovalni čas 24/7 z najvišjo prioriteto',
          'Prilagojeno obrambi, državni upravi in kritični infrastrukturi',
          'Varnostno varovanje in molčečnost najvišje stopnje',
        ],
      },
    },
    requestQuote: 'Zaprosite za ponudbo',
    bookCall: 'Rezervirajte pogovor',
    largeNote: 'Sistemi z več kot 100 izpostavljenimi naslovi se ovrednotijo po analizi potreb',
    consult: {
      eyebrow: 'Vključeno v vsak paket',
      title: 'Svetovalec, ki ostane — ne le poročilo.',
      cards: [
        {
          title: 'Odprava za vsako ugotovitev',
          text: 'Vsako poročilo natančno opiše, kaj je narobe in kako se odpravi — po prednostnem vrstnem redu glede na dejansko tveganje.',
        },
        {
          title: '48 ur po vsakem pregledu',
          text: 'V mesečnem pregledu je vključenih 48 ur svetovalnega časa, ki vaši IT ekipi pomaga izvesti ukrepe.',
        },
        {
          title: '24/7 v dnevnem paketu',
          text: 'Dnevni pregled vam daje svetovalni čas 24 ur na dan, s prednostjo pri kritičnih ugotovitvah.',
        },
      ],
    },
    form: {
      title: 'Rezervirajte pogovor o svoji napadalni površini.',
      description:
        'Povejte nam, koliko izpostavljenih naslovov in sistemov imate, in potrdili bomo ceno ter raven. Sistemi z več kot 100 izpostavljenimi naslovi zahtevajo najprej krajšo analizo potreb.',
      bullets: [
        'Takojšen odgovor, vsak dan',
        'Prvi pogovor brezplačno',
        'Ponudba brez obveznosti',
        'PGP za zaupno komunikacijo',
      ],
      options: {
        manad: 'Neprekinjeni varnostni pregled — Mesečni pregled',
        vecka: 'Neprekinjeni varnostni pregled — Tedenski pregled',
        dag: 'Neprekinjeni varnostni pregled — Dnevni pregled',
        large: 'Sistemi z več kot 100 izpostavljenimi naslovi — analiza potreb',
      },
    },
  },

  // ── /checkout/intern ─────────────────────────────────────────────────
  checkoutIntern: {
    hero: {
      eyebrow: 'Notranja varnostna revizija',
      titleLead: 'Varnost od znotraj — tam, kamor ',
      titleHighlight: 'nihče ne pogleda',
      titleEnd: '.',
      description:
        'Zunanji pregledi vidijo tisto, kar vidi napadalec. Mi gremo globlje: pravice, beleženje, izolacija in vse, kar odloča, ali se vdor ustavi pri enem računalniku — ali se razširi.',
    },
    rate: {
      eyebrow: 'Svetovalni čas',
      perHour: '/ uro',
      text: 'Plačate za dejansko delo — ne za to, da se učimo vašega sistema na vaš čas. Obseg in čas potrdimo po kratki analizi potreb.',
    },
    levels: {
      vanlig: {
        name: 'Običajna varnost',
        level: 'Raven 1',
        tagline: 'Še vedno višje, kot to dobavi kdor koli drug.',
        description:
          'Pregled pravic, beleženja, segmentacije in postopkov od znotraj. Zahtevajo ga mnogi revizorji — in zapre vrata, ki jih zunanji pregled nikoli ne vidi.',
        features: [
          'Pregled pravic in vlog',
          'Beleženje, alarmiranje in sledljivost',
          'Postopki za zaposlene in dobavitelje',
          'Končno poročilo s prednostnim načrtom ukrepov',
        ],
      },
      hog: {
        name: 'Visoka varnost',
        level: 'Raven 2',
        tagline: 'Povečana varnost, kjer notranjost ne zaupa nikomur — niti sebi.',
        description:
          'Arhitektura brez zaupanja, segmentirane cone in skrivnosti, ki nikoli ne zapustijo strojne opreme. Za organizacije z občutljivimi podatki in resničnimi vrednotami za zaščito.',
        features: [
          'Arhitektura brez zaupanja in mikrosegmentacija',
          'Upravljanje kriptografskih ključev in distribucija skrivnosti',
          'Zaščita pred notranjimi grožnjami in zaznavanje odstopanj',
          'Načrt odziva na notranji incident',
        ],
      },
      militar: {
        name: 'Vojaška stopnja',
        level: 'Raven 3',
        tagline: 'Sistemi se ne pokažejo niti takrat, ko jih kdo pinga.',
        description:
          'Najvišja notranja raven, ki jo izvedemo. Sistem obstaja, a ne vrne odgovora, prstnega odtisa ali rednega vzorca. Namenjeno obrambi, državni upravi in kritični infrastrukturi.',
        features: [
          'Skrita infrastruktura — brez odgovora na sondiranje',
          'Namerni šum proti prstnim odtisom in časovni analizi',
          'Fizična in logična izolacija ključnega gradiva',
          'Neprekinjena revizija celotne verige od znotraj',
          'Varnostno varovanje najvišje stopnje',
        ],
      },
    },
    requestReview: 'Zaprosite za revizijo',
    rateNote: 'Obračunano na svetovalno uro',
    efficiency: {
      eyebrow: 'Učinkovitost',
      title: 'Kjer človek potrebuje šest ur, potrebujemo eno.',
      paragraphFirst:
        'Skozi celotno revizijo delamo z lastnimi orodji AI. Zato kompleksni projekti trajajo približno šestino časa v primerjavi s samo človeškimi varnostnimi strokovnjaki — brez popuščanja pri kakovosti.',
      paragraphLead: 'Rezultat ni le hitrejši. Je ',
      paragraphHighlight: 'višja varnost',
      paragraphEnd: ', kot jo človek doseže sam.',
      cards: [
        {
          title: '1/6 časa',
          text: 'Orodja AI analizirajo sistem vzporedno s svetovalcem — ne za nazaj.',
        },
        {
          title: 'Višja varnost',
          text: 'Brez utrujenosti, brez bližnjic in nikjer, kamor bi skrili ugotovitev.',
        },
        {
          title: 'Neviden rezultat',
          text: 'Pri vojaški stopnji pustimo sistem, ki se ne odzove niti takrat, ko ga kdo sondira.',
        },
      ],
    },
    form: {
      title: 'Povejte nam, kaj je treba zaščititi.',
      description:
        'Bolj občutljivo je okolje, več želimo vedeti, preden damo oceno. Vse je zaupno in lahko poteka prek PGP.',
      bullets: [
        'Brezplačna analiza potreb',
        'Ocena v svetovalnih urah pred začetkom dela',
        'Delo poteka na lokaciji ali na daljavo',
        'Molčečnost in varnostno varovanje najvišje stopnje',
      ],
      options: {
        vanlig: 'Notranja varnostna revizija — Običajna varnost',
        hog: 'Notranja varnostna revizija — Visoka varnost',
        militar: 'Notranja varnostna revizija — Vojaška stopnja',
        unsure: 'Nisem prepričan — potrebujem nasvet',
      },
    },
  },

  // ── /checkout/ledning ────────────────────────────────────────────────
  checkoutLedning: {
    hero: {
      eyebrow: 'Varnostno vodenje',
      titleLead: 'Varnostno vodenje za tiste, ki ',
      titleHighlight: 'sprejemajo odločitve',
      titleEnd: '.',
      description:
        'Varnost je odgovornost vodstva. Upravi, vodstvu in varnostnemu vodji pomagamo sprejeti prave odločitve — preden se kaj zgodi, ne po tem.',
    },
    strategic: {
      title: 'Strateško varnostno vodenje',
      text: 'Višji varnostni svetovalec v vaši vodstveni ekipi. Pripravimo varnostno strategijo, usposobimo zaposlene in podpiramo ob incidentih — z molčečnostjo na vseh ravneh.',
      features: [
        'Varnostna strategija na ravni vodstva',
        'Usposabljanje zaposlenih in uprave',
        'Podpora ob incidentih',
        'Molčečnost na vseh ravneh',
        'Lahko se kombinira s pregledom in revizijo',
      ],
      requestQuote: 'Zaprosite za ponudbo',
    },
    expert: {
      title: 'Varnostni strokovnjak 24/7',
      text: 'Namenski varnostni strokovnjak — ki ga lahko vsak v vaši organizaciji vpraša kadar koli. Brez čakanja, brez vrste zahtevkov in brez vprašanja, ki bi bilo premajhno.',
      price: 'Kmalu na voljo',
      period: 'naročnina',
      features: [
        'Odgovor 24 ur na dan, vsak dan',
        'Na voljo vsem v organizaciji',
        'Sprotno usposabljanje zaposlenih',
        'Eskalacija k strokovnjaku ob resničnem incidentu',
      ],
      notifyMe: 'Obvestite me',
      note: 'Pustite svoj e-naslov v obrazcu — novico izveste prvi.',
    },
    expertVatNote: 'Varnostni strokovnjak 24/7 je v razvoju; cena bo določena ob lansiranju',
    form: {
      title: 'Pogovor o varnosti na ravni vodstva.',
      description:
        'Govorimo jezik vodstva, ne le tehnike. Povejte nam o svoji organizaciji in izzivih — predlagamo pristop in se oglasimo s ponudbo.',
      bullets: [
        'Prvi pogovor je vedno brezplačen',
        'Govorimo jezik vodstva, ne le tehnike',
        'Molčečnost na vseh ravneh',
        'Lahko se kombinira s pregledom in revizijo',
      ],
      options: {
        strategy: 'Varnostno vodenje — strateško svetovanje',
        training: 'Varnostno vodenje — usposabljanje zaposlenih',
        expert: 'Varnostni strokovnjak 24/7 — obvestite me ob lansiranju',
      },
    },
  },

  // ── Uspeh ────────────────────────────────────────────────────────────
  success: {
    eyebrow: 'Povpraševanje prejeto',
    titleLead: 'Hvala — oglasimo se ',
    titleHighlight: 'v 10 minutah',
    titleEnd: '.',
    description:
      'Vaše povpraševanje je zabeleženo. Varnostni svetovalec ga bo prebral in vas kontaktiral na navedenem službenem e-naslovu z naslednjimi koraki in prvo ponudbo.',
    panelTitle: 'Vse je prejeto.',
    panelText:
      'Želite zaupne informacije posredovati že zdaj? V potrditvenem e-sporočilu zaprosite za naš PGP ključ — ali nam pišite neposredno.',
    ctaHome: 'Nazaj na domačo stran',
    ctaPapers: 'Preberite naše članke',
  },

  // ── Business Profile ─────────────────────────────────────────────────
  businessProfile: {
    hero: {
      eyebrow: 'Business Profile',
      titleLead: 'Varnostni račun ',
      titleHighlight: 'vašega podjetja',
      titleEnd: '.',
      description:
        'Upravljajte naročnino, prejemnike poročil in račun. Polna funkcionalnost se aktivira, ko se portal zažene v fazi B.',
    },
    account: 'Račun',
    company: 'Podjetje',
    orgNumber: 'Matična številka',
    contactPerson: 'Kontaktna oseba',
    email: 'E-naslov',
    subscription: 'Naročnina',
    subscriptionName: 'Neprekinjeno varovanje',
    nextInvoice: 'Naslednji račun: —',
    managePayment: 'Upravljaj plačilo',
    upgradePackage: 'Nadgradi paket',
    pgpRecipients: 'Prejemniki poročil (PGP)',
    pgpText:
      'Varnostna poročila se dostavijo šifrirano vašemu odgovornemu za IT. Prejemnike in PGP ključe dodate, ko se portal zažene.',
    itResponsible: 'Odgovorni za IT',
    pgpKey: 'PGP ključ',
    noKeyAdded: 'Ni dodanega ključa',
    addRecipient: 'Dodaj prejemnika',
    accountActions: 'Dejanja na računu',
    pauseSubscription: 'Začasno ustavi naročnino',
    deleteAccount: 'Izbriši račun',
    logout: 'Odjava',
    phaseBNote: 'Aktivira se s prijavo v fazi B (varna overitev po e-pošti).',
  },

  // ── Papers ───────────────────────────────────────────────────────────
  papers: {
    hero: {
      eyebrow: 'Papers',
      titleLead: 'Misli in raziskave, ',
      titleHighlight: 'vredne branja',
      titleEnd: '.',
      description:
        'Znanstvena poročila, hipoteze in eseji o umetni inteligenci, teoretični fiziki, filozofiji in varnosti. Za stranke, raziskovalce in radovedne.',
    },
    coming: 'Prihaja',
    publishedSoon: 'Objavljeno v kratkem',
    categories: [
      {
        title: 'Umetna inteligenca',
        text: 'Varnostne posledice sistemov AI, sklepalni modeli in avtonomija.',
        papers: [
          { title: 'Ko model misli sam — avtonomni hekerji' },
          { title: 'AI kot napadalna površina: poziv, podatki in dobavna veriga' },
        ],
      },
      {
        title: 'Teoretična fizika',
        text: 'Entropija, informacija in čas — temeljne raziskave, ki oblikujejo naše razmišljanje o varnosti.',
        papers: [
          {
            title:
              'Entropija kot merilo inteligence: zakaj je harmonija učinkovitejše energijsko stanje',
          },
          { title: 'Čas, opazovanje in ranljivost — fizikalna perspektiva' },
        ],
      },
      {
        title: 'Filozofija',
        text: 'Etika, svoboda in odgovornost v svetu nadzora in nasprotnikov.',
        papers: [
          { title: 'Braniti odprto družbo z zaprtimi sredstvi' },
          { title: 'Zaupanje je ranljivost — in naš najpomembnejši vir' },
        ],
      },
      {
        title: 'Varnostne raziskave',
        text: 'Metode, nasprotniki in izkušnje iz štirih desetletij na terenu.',
        papers: [
          { title: 'Vztrajnost tujih akterjev: dolge kampanje proti švedskim ciljem' },
          { title: 'Neprekinjeno varovanje — zakaj enkratni pregledi ne zadoščajo' },
        ],
      },
    ],
    newsletter: {
      title: 'Novi članki naravnost k vam.',
      text: 'Naročite se na naše e-novice — največ eno sporočilo na mesec, šifrirano po želji in vedno z odjavo v enem kliku.',
      emailLabel: 'E-naslov',
      emailPlaceholder: 'sluzbeni@podjetje.si',
      subscribe: 'Naroči se',
    },
  },

  // ── Pravno ───────────────────────────────────────────────────────────
  legal: {
    hero: {
      eyebrow: 'Pravno',
      titleLead: 'Pravno, ',
      titleHighlight: 'jasno in kratko',
      titleEnd: '.',
      description:
        'Politika zasebnosti, pogoji uporabe in informacije o piškotkih. Napisani tako, da se berejo — ne da bi se zakopali.',
    },
    updatedPrefix: 'Nazadnje posodobljeno: 2026-09-13',
    sections: [
      {
        title: 'Politika zasebnosti',
        body: [
          'Entropic Defence AB („mi", „nas") spoštuje vašo zasebnost. Ta politika opisuje, kako obdelujemo osebne podatke, ko obiščete entropicdefence.com, nas kontaktirate ali najamete naše storitve.',
          'Zbiramo podatke, ki nam jih posredujete sami: ime, podjetje, matično številko, e-naslov in vsebino, ki jo vpišete v kontaktni obrazec. Podatke uporabljamo izključno za odgovarjanje na povpraševanja, pripravo ponudb in izpolnjevanje pogodb.',
          'Vaših podatkov nikoli ne prodamo in jih delimo le z izvajalci, ki so potrebni za delovanje storitve (npr. gostovanje), na podlagi pogodb, ki varujejo vaše podatke. Podatke izbrišemo, ko niso več potrebni, v skladu z veljavno računovodsko in varnostno zakonodajo.',
          'Pravna podlaga: zakoniti interes in/ali pogodba. Imate pravico zahtevati izpis, popravek, izbris in prenosljivost podatkov. Pišite nam na support@entropicdefence.com.',
        ],
      },
      {
        title: 'Pogoji uporabe',
        body: [
          'Vsebina na entropicdefence.com je objavljena v informativne namene. Prizadevamo si za točnost, vendar ne dajemo jamstev, da je vsebina vedno popolna ali aktualna.',
          'Vsa besedila, grafika in blagovne znamke pripadajo podjetju Entropic Defence AB, razen če je navedeno drugače. Vsebine ni dovoljeno kopirati, razširjati ali komercialno uporabljati brez pisnega dovoljenja.',
          'Storitve, opisane na spletni strani, vedno ureja ločena pisna pogodba. Nič na spletni strani ne predstavlja zavezujoče ponudbe.',
          'Za varnostna vprašanja o naših sistemih glejte stran Obvestila in razkritja.',
        ],
      },
      {
        title: 'Piškotki',
        body: [
          'Ne uporabljamo sledilnih piškotkov niti oglaševanja tretjih oseb. Edini možni piškotki so nujni sejni piškotki, potrebni za tehnično delovanje spletne strani.',
          'Če bomo v prihodnosti uvedli neobvezne analitične piškotke, bomo pred tem zaprosili za vaše soglasje v skladu z zakonodajo o elektronskih komunikacijah.',
          'Piškotke lahko kadar koli blokirate ali izbrišete v nastavitvah brskalnika. Spletna stran deluje v celoti tudi brez njih.',
        ],
      },
    ],
    questions: 'Vprašanja o pravu ali varstvu podatkov?',
  },

  // ── Podpora in pogosta vprašanja ─────────────────────────────────────
  support: {
    hero: {
      eyebrow: 'Podpora in pogosta vprašanja',
      titleLead: 'Pomoč, ko jo potrebujete — ',
      titleHighlight: '24 ur na dan',
      titleEnd: '.',
      description:
        'Izberite, ali želite neposredno kontaktirati našo dežurno službo ali poiskati odgovor med pogostimi vprašanji spodaj. Ob nujnih incidentih v zadevo vpišite INCIDENT.',
    },
    duty: {
      title: 'Pogovorite se z dežurno službo',
      text: 'Naša dežurna služba odgovarja 24 ur na dan. Pogosta vprašanja dobijo takojšen odgovor, incidenti pa se obravnavajo diskretno.',
      badge: 'Na voljo · 24/7',
    },
    faqTitle: 'Pogosta vprašanja',
    faqs: [
      {
        q: 'Kaj pomeni „neprekinjena varnost"?',
        a: 'Da varnost ni projekt z datumom zaključka, ampak trajajoč proces: spremljanje, lov na grožnje, pregled dobaviteljev in ponavljajoči se pregledi — 24 ur na dan, vse leto.',
      },
      {
        q: 'Ali res odgovarjate 24/7?',
        a: 'Da, naša dežurna služba je zasedena 24 ur na dan, vse dni v letu.',
      },
      {
        q: 'Kako se pošiljajo varnostna poročila?',
        a: 'Šifrirano s PGP na prejemnike, ki jih navedete — običajno odgovorni za IT ali varnostni vodja. Prejemnike in ključe določite sami.',
      },
      {
        q: 'Ste neodvisni?',
        a: 'Da. Ne prodajamo strojne ali programske opreme in ne prejemamo provizij od dobaviteljev. Naš edini prihodek je svetovanje, naša edina zvestoba pa vaša zaščita.',
      },
      {
        q: 'Koliko to stane?',
        a: 'Vsaka organizacija je edinstvena, zato vedno pripravimo ponudbo. Za manjše sisteme z manj izpostavljenimi naslovi imamo fiksne cene — oglejte si pakete pod „Izberite paket". Prvi pogovor je brezplačen in brez obveznosti.',
      },
      {
        q: 'Delate pod molčečnostjo?',
        a: 'Da. Molčečnost in varnostno varovanje sta standard pri vsakem projektu, ne glede na obseg. Pred prvim sestankom z veseljem podpišemo ločeno pogodbo o zaupnosti.',
      },
    ],
    contactTitle: 'Kontaktirajte nas',
    contactText: 'Pišite nam neposredno — naša dežurna služba odgovarja 24 ur na dan.',
    sentTitle: 'Sporočilo je poslano.',
    sentText: 'Prejeli boste takojšen odgovor. Ob nujnih zadevah e-sporočilo označite z INCIDENT.',
    form: {
      name: 'Ime *',
      namePlaceholder: 'Ime in priimek',
      email: 'E-naslov *',
      emailPlaceholder: 'ime@podjetje.si',
      subject: 'Zadeva *',
      subjectPlaceholder: 'Izberite zadevo …',
      subjectOptions: {
        serviceQuestion: 'Vprašanje o storitvah',
        ongoingSupport: 'Podpora za tekoče projekte',
        incident: 'Incident (nujne zadeve)',
        other: 'Drugo',
      },
      message: 'Sporočilo *',
      messagePlaceholder: 'Kako vam lahko pomagamo?',
      send: 'Pošlji sporočilo',
    },
  },

  // ── Obvestila in razkritja ───────────────────────────────────────────
  advisories: {
    hero: {
      eyebrow: 'Obvestila in razkritja',
      titleLead: 'Usklajeno ',
      titleHighlight: 'poročanje o ranljivostih',
      titleEnd: '.',
      description:
        'Ste našli ranljivost v naših sistemih ali storitvah? To jemljemo resno — in obljubljamo, da jo bomo obravnavali strokovno in hitro.',
    },
    report: 'Prijavite',
    reportText:
      'Podrobnosti nam pošljite po e-pošti. Za občutljive ugotovitve priporočamo uporabo našega PGP ključa.',
    pgpKey: 'PGP ključ',
    pgpText: 'Objavljen bo v kratkem. Kontaktirajte nas in ključ vam pošljemo takoj.',
    fingerprint: 'Prstni odtis: —',
    promise: 'Naša obljuba',
    promiseText:
      'Potrditev v 72 urah. Usklajena objava. Brez pravnih ukrepov proti tistemu, ki prijavi v dobri veri.',
    activeTitle: 'Aktivna obvestila',
    activeText:
      'Trenutno ni javnih varnostnih obvestil. Ko bo ranljivost odpravljena in usklajena, bomo tukaj objavili tehnični povzetek.',
  },

  // ── Varnostni status ─────────────────────────────────────────────────
  status: {
    hero: {
      eyebrow: 'Varnostni status',
      titleLead: 'Spremljajte svoj pregled ',
      titleHighlight: 'v realnem času',
      titleEnd: '.',
      description:
        'Tukaj vidite, kje v procesu je vaš varnostni pregled. Poročila se dostavijo šifrirano s PGP vašemu odgovornemu za IT.',
    },
    assignment: 'Projekt ED-2026-014',
    assignmentTitle: 'Neprekinjeno varovanje — vzorčna stranka',
    progress: 'V teku · 40 %',
    stages: [
      { title: 'Prevzem in načrtovanje', text: 'Kartiranje sistemov, ciljev in časovnega načrta.' },
      {
        title: 'Tehnični pregled',
        text: 'Preizkusi prodora in analiza ranljivosti infrastrukture ter aplikacij.',
      },
      { title: 'Človeški pregled', text: 'Pogovori, postopki in ozaveščenost zaposlenih.' },
      {
        title: 'Pregled dobaviteljev',
        text: 'Pregled dobavne verige in odvisnosti od tretjih oseb.',
      },
      {
        title: 'Poročilo in načrt ukrepov',
        text: 'Končno poročilo, šifrirano s PGP, vašemu odgovornemu za IT.',
      },
    ],
    pgpDelivery: 'Dostava prek PGP',
    pgpDeliveryText:
      'Končna poročila se pošljejo šifrirano vašemu odgovornemu za IT. Prejemnike in ključe dodajte v Business Profile.',
    manageRecipients: 'Upravljaj prejemnike',
  },

  // ── 404 ──────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: 'Koda napake 404',
    title: 'Izguba signala.',
    description:
      'Stran, ki jo iščete, ne obstaja — ali je bila premaknjena na varnejše mesto. Polje vas vodi nazaj.',
    ctaHome: 'Nazaj na domačo stran',
    ctaSupport: 'Kontaktirajte podporo',
  },
}

