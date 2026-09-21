import type { Dictionary } from './sv'

export const fi: Dictionary = {
  meta: {
    home: {
      title: 'Entropic Defence — Jatkuva turvallisuus ulkomaisia toimijoita vastaan',
      description:
        'Entropic Defence AB. Yli 40 vuotta turvallisuustyötä maailman korkeimmalla turvaluokituksella. Jatkuva turvallisuus, ulkoiset tarkastukset ja neuvonanto yrityksille, viranomaisille ja kriittiselle infrastruktuurille.',
    },
    checkout: {
      title: 'Valitse paketti — Entropic Defence',
      description:
        'Kiinteät hinnat jatkuvalle turvallisuudelle: ulkoinen tarkastus, sisäinen auditointi ja turvallisuusjohtaminen. Alkaen 24 900 kr kuukaudessa.',
    },
    checkoutExtern: {
      title: 'Jatkuva turvallisuustarkastus — Entropic Defence',
      description:
        'Kiinteä hinta altistuneiden osoitteiden määrän mukaan. Kuukausi-, viikko- tai päivätarkastus: raportti, korjaustoimet ja sovitettu konsulttiaika.',
    },
    checkoutIntern: {
      title: 'Sisäinen turvallisuusauditointi — Entropic Defence',
      description:
        'Kolme turvallisuustasoa — normaali, korkea ja sotilaallinen. Käyttöoikeudet, lokitus ja eristys. AI-työkalut vievät kuudesosan ajasta.',
    },
    checkoutLedning: {
      title: 'Turvallisuusjohtaminen — Entropic Defence',
      description:
        'Strategista turvallisuusneuvontaa johdolle ja hallitukselle, henkilöstön koulutusta sekä 24/7-turvallisuusasiantuntija, joka tulee pian.',
    },
    success: {
      title: 'Pyyntö vastaanotettu — Entropic Defence',
      description: 'Pyyntönne on vastaanotettu. Konsultti vastaa mahdollisimman pian.',
    },
    businessProfile: {
      title: 'Business Profile — Entropic Defence',
      description:
        'Yrityksenne turvallisuustili: tilaus, raporttien vastaanottajat (PGP) ja tiliasetukset.',
    },
    papers: {
      title: 'Papers — Entropic Defence',
      description:
        'Tieteellisiä raportteja, hypoteeseja ja esseitä tekoälystä, teoreettisesta fysiikasta, filosofiasta ja turvallisuudesta.',
    },
    legal: {
      title: 'Lakiasiat — Entropic Defence',
      description: 'Tietosuojaseloste, käyttöehdot ja evästetiedot.',
    },
    support: {
      title: 'Tuki & UKK — Entropic Defence',
      description: 'Usein kysytyt kysymykset ja asiakastuki. Päivystys vastaa ympäri vuorokauden.',
    },
    advisories: {
      title: 'Advisories & Disclosures — Entropic Defence',
      description:
        'Koordinoitu haavoittuvuusraportointi. Löysitkö haavoittuvuuden järjestelmistämme? Otamme sen vakavasti.',
    },
    status: {
      title: 'Turvallisuustilanne — Entropic Defence',
      description:
        'Seuraa turvallisuustarkastustanne reaaliajassa. Raportit toimitetaan PGP-salattuna.',
    },
    notFound: {
      title: 'Sivua ei löydy — Entropic Defence',
      description: 'Etsimäänne sivua ei ole — tai se on siirretty turvallisempaan paikkaan.',
    },
  },

  common: {
    vatNote: 'Hinnat alv 0 %',
    launchPrice: 'Lanseeraushinta',
    exclVat: 'alv 0 %',
    perMonthShort: '/kk',
    perMonth: 'kuukaudessa',
    perConsultantHour: 'konsulttitunnilta',
    perHour: '/ tunti',
    perAssignment: 'toimeksiannolta',
    quote: 'Tarjous',
    recommended: 'Suositeltu',
    mostPopular: 'Suosituin',
    comingSoon: 'Tulossa pian',
    allPackages: 'Kaikki paketit',
    active: 'Aktiivinen',
    ongoing: 'Käynnissä',
    from: 'Alkaen',
    currency: 'kr',
    chooseLanguage: 'Valitse kieli',
    language: 'Kieli',
    periodLabel: 'Laskutuskausi',
    periods: {
      month: 'Kuukausi',
      quarter: 'Neljännesvuosi',
      year: 'Vuosi',
    },
    savings: {
      quarter: 'Säästä 10 %',
      year: 'Säästä 25 %',
    },
  },

  nav: {
    services: 'Palvelut',
    advisories: 'Advisories',
    papers: 'Papers',
    support: 'Tuki',
    talkToConsultant: 'Keskustele konsultin kanssa',
    homeAria: 'Entropic Defence — etusivu',
    mainMenu: 'Päävalikko',
    mobileMenu: 'Mobiilivalikko',
    closeMenu: 'Sulje valikko',
    openMenu: 'Avaa valikko',
  },

  footer: {
    tagline:
      'Jatkuva turvallisuus ulkomaisia toimijoita vastaan. Yli 40 vuotta maailman korkeimmalla turvaluokituksella — yrityksille, viranomaisille ja kriittiselle infrastruktuurille.',
    columnNavigation: 'Navigointi',
    columnCompany: 'Yritys',
    linkServices: 'Palvelut',
    linkAdvisories: 'Advisories',
    linkPapers: 'Papers',
    linkStatus: 'Turvallisuustilanne',
    linkPackages: 'Valitse paketti',
    linkBusinessProfile: 'Business Profile',
    linkSupport: 'Tuki & UKK',
    linkLegal: 'Lakiasiat',
    location: 'Tukholma · Ruotsi',
    address: 'Sjöfartsgatan 9, 120 62 Nacka',
    copyright: '© 2026 Entropic Defence. Kaikki oikeudet pidätetään.',
  },

  floatingCta: 'Keskustele konsultin kanssa 24/7',

  forms: {
    company: 'Yritys *',
    companyPlaceholder: 'Entropic Defence AB',
    orgNumber: 'Y-tunnus',
    orgNumberPlaceholder: '559999-9999',
    contactPerson: 'Yhteyshenkilö *',
    namePlaceholder: 'Etunimi ja sukunimi',
    workEmail: 'Työsähköposti *',
    emailPlaceholder: 'nimi@yritys.fi',
    interestedIn: 'Kiinnostuksen kohde *',
    choosePackage: 'Valitse paketti…',
    notSure: 'En ole varma — tarvitsen neuvoja',
    describe: 'Kuvailkaa toimintaanne ja uhkakuvaanne',
    describePlaceholder: 'Lyhyesti toiminnastanne, järjestelmistänne ja siitä, mitä haluatte suojata…',
    sendRequest: 'Lähetä pyyntö',
    sending: 'Lähetetään…',
    consentBefore: 'Lähettämällä hyväksyt ',
    consentLink: 'tietosuojaselosteemme',
    consentAfter: '. Emme koskaan jaa tietojanne kolmansille osapuolille.',
  },

  home: {
    hero: {
      eyebrow: 'Jatkuva turvallisuus · Ruotsi',
      titleLead: 'Turvallisuutta, joka ',
      titleHighlight: 'taivuttaa uhkakuvaa',
      titleEnd: ' — ympäri vuorokauden.',
      description:
        'Entropic Defence suojaa yrityksiä, viranomaisia ja kriittistä infrastruktuuria ulkomaisia toimijoita vastaan. Yli 40 vuotta maailman korkeimmalla turvaluokituksella — hallitus- ja sotilasjärjestelmistä teidän toimintaanne.',
      ctaPrimary: 'Keskustele konsultin kanssa',
      ctaSecondary: 'Katso turvallisuuspakettimme',
    },
    stats: [
      { value: '40+', label: 'vuotta maailman korkeimmalla turvaluokituksella' },
      { value: '24/7', label: 'jatkuva valvonta ja uhkajahti' },
      { value: '100%', label: 'riippumatonta neuvontaa' },
    ],
    trustStrip: ['Valtionhallinnon toimeksiannot', 'Sotilaalliset järjestelmät', 'Kriittinen infrastruktuuri', 'Vaitiolovelvollisuus vakiona'],
    hotbild: {
      eyebrow: 'Uhkakuva on muuttunut',
      titleLead: 'Kysymys ei ole enää siitä, ',
      titleEm: 'yrittääkö',
      titleMiddle: ' joku — vaan siitä, ',
      titleHighlight: 'milloin',
      titleEnd: '.',
      description:
        'Valtiolliset toimijat kartoittavat ruotsalaisia yrityksiä juuri nyt — toimitusketjuja, työntekijöitä ja altistuneita järjestelmiä. Joka ei tarkista itseään, on jo tarkistettu.',
      terminal: [
        'uhkakuva: valtiolliset toimijat',
        'vektorit: supply chain · sisäpiiri · tekoäly',
        'altistuminen: kartoitus käynnissä',
        'tila:',
      ],
      terminalActive: 'JATKUVA VALVONTA AKTIIVINEN',
    },
    services: {
      eyebrow: 'Palvelut',
      title: 'Neljä tapaa suojata toimintaanne.',
      items: [
        {
          title: 'Jatkuva turvallisuustarkastus',
          text: 'Ulkoisia tarkastuksia, jotka eivät koskaan pysähdy — kuukausittain, viikoittain tai päivittäin. Löydämme sen, minkä hyökkääjä löytäisi, ja suljemme sen.',
        },
        {
          title: 'Sisäinen turvallisuusauditointi',
          text: 'Turvaamme järjestelmän sisältäpäin: käyttöoikeudet, lokitus ja eristys — noin kerran vuodessa.',
        },
        {
          title: 'Turvallisuusjohtaminen',
          text: 'Strategista neuvontaa johdolle ja hallitukselle — sekä 24/7-turvallisuusasiantuntija, joka kouluttaa henkilöstöänne.',
        },
        {
          title: 'Advisories & disclosures',
          text: 'Koordinoitu haavoittuvuusraportointi ja julkiset tekniset yhteenvedot, kun haavoittuvuudet on korjattu.',
        },
      ],
    },
    background: {
      eyebrow: 'Neljä vuosikymmentä',
      title: '40 vuotta maailman korkeimmalla turvaluokituksella.',
      paragraphs: [
        'Entropic Defence syntyi oivalluksesta: Ruotsin turvallisuusmarkkinat reagoivat sen sijaan että ennaltaehkäisisivät. Rakensimme yrityksen tekemään päinvastoin.',
        'Konsulttimme tulevat puolustus- ja tiedustelumaailmasta. Olemme suojanneet hallitusjärjestelmiä, sotilaallisia verkkoja ja yhteiskunnan kriittistä infrastruktuuria — kärsivällisimpiä vastustajia vastaan, joita on olemassa.',
      ],
      points: [
        'Kokemusta puolustuksesta, tiedustelusta ja viranomaistoiminnasta',
        'Vaitiolovelvollisuus ja turvallisuussuojaus jokaisessa toimeksiannossa',
        'Riippumattomia — emme myy laitteita emmekä ohjelmistoja',
        'Jatkuvuus — sama tiimi seuraa teitä pitkään',
      ],
    },
    process: {
      eyebrow: 'Näin toimimme',
      title: 'Ensimmäisestä puhelusta jatkuvaan turvallisuuteen.',
      steps: [
        {
          title: 'Kartoitus',
          text: 'Kartoitamme järjestelmät, toimittajat ja inhimilliset riskit — ja tunnistamme, missä olette haavoittuvimpia.',
        },
        {
          title: 'Tarkastus',
          text: 'Ulkoisia tarkastuksia, sisäinen auditointi tai molemmat. Jokainen löydös priorisoidaan todellisen riskin mukaan.',
        },
        {
          title: 'Korjaus',
          text: 'Konsulttimme jäävät avuksi ja auttavat IT:tänne sulkemaan löydökset — ei raportteja, jotka jäävät pölyttymään.',
        },
        {
          title: 'Jatkuvuus',
          text: 'Turvallisuus ei ole projekti, jolla on päättymispäivä. Palaamme — ja järjestelmä pysyy tarkastettuna.',
        },
      ],
    },
    contact: {
      eyebrow: '24/7 · Suora vastaus',
      title: 'Keskustele konsultin kanssa uhkakuvastanne.',
      description:
        'Ensimmäinen keskustelu ja ulkoinen turvallisuuskatselmus ovat maksuttomia ja velvoitteettomia. Kertokaa toiminnastanne — me kerromme, missä olette haavoittuvia.',
      ctaMail: 'Lähetä meille sähköpostia',
      ctaSupport: 'Tukeen',
    },
    papersCta: {
      text: 'Kiinnostaako ajattelumme? Lue paperimme tekoälystä, fysiikasta ja turvallisuudesta.',
      cta: 'Papereihin',
    },
  },

  checkout: {
    hero: {
      eyebrow: 'Valitse paketti',
      titleLead: 'Turvallisuutta, joka on ',
      titleHighlight: 'jokaisen sentin arvoinen',
      titleEnd: '.',
      description:
        'Kiinteät hinnat jatkuville tarkastuksille ja sisäiselle auditoinnille — tarjous, kun tehtävä vaatii enemmän. Avaa paketti nähdäksesi hinnat ja tasot.',
    },
    categories: [
      {
        name: 'Jatkuva turvallisuustarkastus',
        period: 'kuukaudessa',
        description:
          'Ulkoisia tarkastuksia, jotka eivät koskaan pysähdy — kuukausittain, viikoittain tai päivittäin. Raportti, korjaustoimet ja sovitettu konsulttiaika sisältyvät.',
        features: [
          'Kuukausi-, viikko- tai päivätarkastus',
          'Kiinteä hinta altistuneiden osoitteiden määrän mukaan',
          'Jokaisen löydöksen korjaustoimet',
          'Konsulttiaikaa 48 h:sta 24/7:ään',
        ],
      },
      {
        name: 'Sisäinen turvallisuusauditointi',
        period: 'konsulttitunnilta',
        description:
          'Tee järjestelmästä superturvallinen sisältäpäin, noin kerran vuodessa. Kolme tasoa — normaalista sotilaalliseen.',
        features: [
          'Kolme tasoa tarpeenne mukaan',
          'Käyttöoikeudet, lokitus ja eristys',
          'Järjestelmä, joka ei vastaa tunnusteluun',
          'AI-työkalut vievät kuudesosan ajasta',
        ],
      },
      {
        name: 'Turvallisuusjohtaminen',
        period: 'toimeksiannolta',
        description:
          'Strategista neuvontaa johdolle ja hallitukselle — sekä 24/7-turvallisuusasiantuntija, joka kouluttaa henkilöstöänne. Asiantuntija tulee pian.',
        features: [
          'Turvallisuusstrategia johtotasolla',
          'Henkilöstön ja hallituksen koulutus',
          'Tuki häiriötilanteissa',
          '24/7-turvallisuusasiantuntija — tulossa pian',
        ],
      },
    ],
    seePackages: 'Katso paketit ja hinnat',
    scrollHint: 'Vieritä ylöspäin nähdäksesi paketit',
    form: {
      title: 'Kertokaa toiminnastanne.',
      description:
        'Mitä enemmän tiedämme, sitä parempi tarjous — erityisesti yli 100 altistuneen osoitteen järjestelmille ja sisäiselle auditoinnille. Kaikki lähettämänne käsitellään vaitiolovelvollisuuden alaisena.',
      bullets: [
        'Suora vastaus, joka päivä',
        'Maksuton ensimmäinen keskustelu',
        'Velvoitteeton tarjous',
        'PGP saatavilla arkaluonteiseen viestintään',
      ],
    },
    options: {
      external: 'Jatkuva turvallisuustarkastus',
      internal: 'Sisäinen turvallisuusauditointi',
      leadership: 'Turvallisuusjohtaminen',
      unsure: 'En ole varma — tarvitsen neuvoja',
    },
  },

  checkoutExtern: {
    hero: {
      eyebrow: 'Jatkuva turvallisuustarkastus',
      titleLead: 'Kiinteä hinta turvallisuudelle, joka ',
      titleHighlight: 'ei koskaan pysähdy',
      titleEnd: '.',
      description:
        'Ulkoisia tarkastuksia, jotka eivät koskaan pysähdy — kuukausittain, viikoittain tai päivittäin. Jokaiseen pakettiin kuuluu raportti, korjaustoimet ja sovitettu konsulttiaika, joka auttaa IT-henkilöstöänne sulkemaan löydökset.',
    },
    tierLabel: 'Altistuneiden osoitteiden määrä',
    tierAria: 'Valitse altistuneiden osoitteiden määrä',
    tiers: {
      small: {
        label: 'Alle 20 altistunutta osoitetta',
        short: 'Alle 20 osoitetta',
        note: 'Pienet järjestelmät, joissa on alle 20 altistunutta osoitetta.',
      },
      medium: {
        label: '20–100 altistunutta osoitetta',
        short: '20–100 osoitetta',
        note: 'Keskisuuret järjestelmät, joissa on useita pintoja ja integraatioita.',
      },
      large: {
        label: 'Yli 100 altistunutta osoitetta',
        short: 'Yli 100 osoitetta',
        note: 'Monimutkaiset järjestelmät — hinnoitellaan tarveanalyysin mukaan.',
      },
    },
    plans: {
      manad: {
        name: 'Kuukausitarkastus',
        cadence: '1 ulkoinen tarkastus kuukaudessa',
        description:
          'Jatkuva perusta: yksi täydellinen ulkoinen tarkastus joka kuukausi, korjausehdotukset ja sovitettu konsulttiaika löydösten sulkemiseen.',
        features: [
          '1 ulkoinen turvallisuustarkastus joka kuukausi',
          'Kirjallinen raportti ja korjaustoimet jokaiseen löydökseen',
          '48 tunnin konsulttiaika, joka auttaa IT:tänne toteuttamaan korjaukset',
          'Jatkuvaa neuvontaa IT-henkilöstöllenne',
        ],
      },
      vecka: {
        name: 'Viikkotarkastus',
        cadence: '1 ulkoinen tarkastus viikossa',
        description:
          'Yrityksille, joilla ei ole varaa olla haavoittuvia muutamaa päivää kauempaa — tiheämpiä tarkastuksia ja 200 tuntia konsulttiaikaa kuukaudessa ongelmien sulkemiseen.',
        features: [
          '1 ulkoinen turvallisuustarkastus joka viikko',
          'Kirjallinen raportti ja korjaustoimet jokaiseen löydökseen',
          '200 tuntia konsulttiaikaa kuukaudessa ongelmien sulkemiseen',
          'Kriittisten löydösten priorisoitu käsittely',
          'Neljännesvuosittainen katsaus turvallisuusjohdolle',
        ],
      },
      dag: {
        name: 'Päivätarkastus',
        cadence: '1 ulkoinen tarkastus päivässä',
        consultant: '24/7-konsulttiaika · korkein prioriteetti',
        description:
          'Lähes yksinomaan puolustuksen ja viranomaisten käytössä. Hyökkääjä ei koskaan saa vuorokautta enempää aikaa — usein vähemmän.',
        features: [
          '1 ulkoinen turvallisuustarkastus joka päivä',
          'Kirjallinen raportti ja korjaustoimet jokaiseen löydökseen',
          '24/7-konsulttiaika korkeimmalla prioriteetilla',
          'Räätälöity puolustukselle, viranomaisille ja kriittiselle infrastruktuurille',
          'Turvallisuussuojaus ja vaitiolovelvollisuus korkeimman luokan mukaan',
        ],
      },
    },
    requestQuote: 'Pyydä tarjous',
    bookCall: 'Varaa keskustelu',
    largeNote: 'Yli 100 altistuneen osoitteen järjestelmät hinnoitellaan tarveanalyysin mukaan',
    consult: {
      eyebrow: 'Sisältyy jokaiseen pakettiin',
      title: 'Konsultti, joka jää — ei pelkkä raportti.',
      cards: [
        {
          title: 'Korjaustoimet jokaiseen löydökseen',
          text: 'Jokainen raportti kertoo tarkasti, mikä on vialla ja miten se korjataan — priorisoituna todellisen riskin mukaan.',
        },
        {
          title: '48 tuntia jokaisen tarkastuksen jälkeen',
          text: 'Kuukausitarkastukseen sisältyy 48 tunnin konsulttiaika, joka auttaa IT:tänne toteuttamaan korjaukset.',
        },
        {
          title: '24/7 päiväpaketissa',
          text: 'Päivätarkastus antaa konsulttiaikaa ympäri vuorokauden, kriittiset löydökset priorisoituna.',
        },
      ],
    },
    form: {
      title: 'Varaa keskustelu hyökkäyspinnastanne.',
      description:
        'Kertokaa, kuinka monta altistunutta osoitetta ja järjestelmää teillä on, niin vahvistamme hinnan ja tason. Yli 100 altistuneen osoitteen järjestelmät vaativat ensin lyhyen tarveanalyysin.',
      bullets: [
        'Suora vastaus, joka päivä',
        'Maksuton ensimmäinen keskustelu',
        'Velvoitteeton tarjous',
        'PGP saatavilla arkaluonteiseen viestintään',
      ],
      options: {
        manad: 'Jatkuva turvallisuustarkastus — Kuukausitarkastus',
        vecka: 'Jatkuva turvallisuustarkastus — Viikkotarkastus',
        dag: 'Jatkuva turvallisuustarkastus — Päivätarkastus',
        large: 'Yli 100 altistunutta osoitetta — tarveanalyysi',
      },
    },
  },

  checkoutIntern: {
    hero: {
      eyebrow: 'Sisäinen turvallisuusauditointi',
      titleLead: 'Turvallisuutta sisältäpäin — sinne, ',
      titleHighlight: 'minne kukaan muu ei katso',
      titleEnd: '.',
      description:
        'Ulkoiset tarkastukset näkevät sen, minkä hyökkääjä näkee. Me menemme syvemmälle: käyttöoikeudet, lokitus, eristys ja kaikki se, mikä ratkaisee, jääkö murto yhteen koneeseen — vai leviääkö se.',
    },
    rate: {
      eyebrow: 'Konsulttiaika',
      perHour: '/ tunti',
      text: 'Maksatte tehdystä työstä — ette siitä, että opettelemme järjestelmäänne hitaasti. Laajuus ja aika vahvistetaan lyhyen tarveanalyysin jälkeen.',
    },
    levels: {
      vanlig: {
        name: 'Normaali turvallisuus',
        level: 'Taso 1',
        tagline: 'Yrityksille, jotka tarvitsevat riippumattoman lausunnon ilman että kaikki tehdään kerralla.',
        features: [
          'Käyttöoikeuksien ja tilien läpikäynti',
          'Lokituksen ja jäljitettävyyden tarkastus',
          'Sähköpostin, päätelaitteiden ja verkon perussuojaus',
          'Kirjallinen raportti priorisoiduista toimenpiteistä',
        ],
      },
      hog: {
        name: 'Korkea turvallisuus',
        level: 'Taso 2',
        tagline: 'Yrityksille, joilla on arkaluonteista dataa, aktiivinen uhkakuva tai vaatimuksia asiakkailta ja sopimuksilta.',
        features: [
          'Kaikki Normaalista turvallisuudesta',
          'Verkon segmentointi ja tiukka käyttöoikeusmalli',
          'Järjestelmä, joka ei vastaa tunnusteluun',
          'Toistuvat sisäiset tarkastukset',
        ],
      },
      militar: {
        name: 'Sotilaallinen taso',
        level: 'Taso 3',
        tagline: 'Korotettu turvallisuus, jossa sisäpuoli ei luota kehenkään — ei edes itseensä.',
        features: [
          'Kaikki Korkeasta turvallisuudesta',
          'Kriittisten järjestelmien ja datan eristys',
          'Fyysinen turvallisuus ja kulunvalvonta',
          'Järjestelmä, joka ei vastaa tunnusteluun — kaikilla tasoilla',
        ],
      },
    },
    requestReview: 'Pyydä auditointi',
    rateNote: 'Laskutetaan konsulttitunnilta',
    efficiency: {
      eyebrow: 'Tehokkuus',
      title: 'Mihin ihminen tarvitsee kuusi tuntia, me tarvitsemme yhden.',
      paragraphLead: 'Tulos ei ole vain nopeampi. Se on ',
      paragraphHighlight: 'korkeampaa turvallisuutta',
      paragraphEnd: ' kuin mihin ihminen pystyy yksin.',
      cards: [
        {
          title: 'Kuudesosa ajasta',
          text: 'AI-työkalut analysoivat järjestelmää rinnakkain konsultin kanssa — eivät jälkikäteen.',
        },
        {
          title: 'Korkeampi turvallisuus',
          text: 'Ei väsymystä, ei oikopolkuja eikä piilopaikkaa yhdellekään löydökselle.',
        },
        {
          title: 'Näkymätön tulos',
          text: 'Sotilaallisella tasolla jätämme järjestelmän, joka ei edes vastaa, kun joku tunnustelee sitä.',
        },
      ],
    },
    form: {
      title: 'Kertokaa, mitä pitää suojata.',
      description:
        'Sisäinen auditointi räätälöidään aina. Kertokaa järjestelmistä, datasta ja vaatimuksista — palaamme tason ja tuntiarvion kanssa.',
      bullets: [
        'Maksuton tarveanalyysi',
        'Arvio konsulttitunneista ennen työn alkua',
        'Työ tehdään paikan päällä tai etänä',
        'Vaitiolovelvollisuus ja turvallisuussuojaus korkeimman luokan mukaan',
      ],
      options: {
        vanlig: 'Sisäinen turvallisuusauditointi — Normaali turvallisuus',
        hog: 'Sisäinen turvallisuusauditointi — Korkea turvallisuus',
        militar: 'Sisäinen turvallisuusauditointi — Sotilaallinen taso',
        unsure: 'En ole varma — tarvitsen neuvoja',
      },
    },
  },

  checkoutLedning: {
    hero: {
      eyebrow: 'Turvallisuusjohtaminen',
      titleLead: 'Turvallisuusjohtamista niille, jotka ',
      titleHighlight: 'tekevät päätökset',
      titleEnd: '.',
      description:
        'Turvallisuus on johdon vastuulla. Autamme hallitusta, johtoa ja turvallisuuspäällikköä tekemään oikeat päätökset — ennen kuin jotain tapahtuu, ei jälkeen.',
    },
    strategic: {
      title: 'Strateginen turvallisuusjohtaminen',
      text: 'Kokenut turvallisuusneuvonantaja johtoryhmäänne. Laadimme turvallisuusstrategian, koulutamme henkilöstön ja tuemme häiriötilanteissa — vaitiolovelvollisuus kaikilla tasoilla.',
      features: [
        'Turvallisuusstrategia johtotasolla',
        'Henkilöstön ja hallituksen koulutus',
        'Tuki häiriötilanteissa',
        'Vaitiolovelvollisuus kaikilla tasoilla',
        'Yhdistettävissä tarkastukseen ja auditointiin',
      ],
      requestQuote: 'Pyydä tarjous',
    },
    expert: {
      title: '24/7-turvallisuusasiantuntija',
      text: 'Oma turvallisuusasiantuntija — jolta koko organisaationne voi kysyä milloin tahansa. Ei odotusta, ei jonoa, ei liian pientä kysymystä.',
      price: 'Tulossa pian',
      period: 'tilaus',
      features: [
        'Vastaus ympäri vuorokauden, joka päivä',
        'Koko organisaation käytettävissä',
        'Kouluttaa henkilöstöä jatkuvasti',
        'Eskaloituu asiantuntijalle vakavassa häiriössä',
      ],
      notifyMe: 'Ilmoita minulle',
      note: 'Jätä sähköpostisi lomakkeeseen — saat tiedon ensimmäisten joukossa.',
    },
    expertVatNote: '24/7-turvallisuusasiantuntija on kehitteillä ja hinnoitellaan lanseerauksessa',
    form: {
      title: 'Puhutaan turvallisuudesta johtotasolla.',
      description:
        'Puhumme johdon kieltä, emme vain tekniikkaa. Kertokaa organisaatiostanne ja haasteistanne — ehdotamme järjestelyä ja palaamme tarjouksen kanssa.',
      bullets: [
        'Ensimmäinen keskustelu on aina maksuton',
        'Puhumme johdon kieltä, emme vain tekniikkaa',
        'Vaitiolovelvollisuus kaikilla tasoilla',
        'Yhdistettävissä tarkastukseen ja auditointiin',
      ],
      options: {
        strategy: 'Turvallisuusjohtaminen — strateginen neuvonta',
        training: 'Turvallisuusjohtaminen — henkilöstön koulutus',
        expert: '24/7-turvallisuusasiantuntija — ilmoita, kun se lanseerataan',
      },
    },
  },

  success: {
    eyebrow: 'Pyyntö vastaanotettu',
    titleLead: 'Kiitos — palaamme asiaan ',
    titleHighlight: '10 minuutin kuluessa',
    titleEnd: '.',
    description:
      'Pyyntönne on rekisteröity. Turvallisuuskonsultti lukee sen ja ottaa teihin yhteyttä ilmoittamaanne työsähköpostiin seuraavista vaiheista ja alustavasta tarjouksesta.',
    panelTitle: 'Kaikki on vastaanotettu.',
    panelText:
      'Haluatteko viestiä arkaluonteisista asioista jo nyt? Pyytäkää PGP-avaintamme vahvistussähköpostissa — tai lähettäkää meille sähköpostia suoraan.',
    ctaHome: 'Takaisin etusivulle',
    ctaPapers: 'Lue paperimme',
  },

  businessProfile: {
    hero: {
      eyebrow: 'Business Profile',
      titleLead: 'Yrityksenne ',
      titleHighlight: 'turvallisuustili',
      titleEnd: '.',
      description:
        'Hallitse tilausta, raporttien vastaanottajia ja tiliä. Täysi toiminnallisuus aktivoituu, kun portaali lanseerataan vaiheessa B.',
    },
    account: 'Tili',
    company: 'Yritys',
    orgNumber: 'Y-tunnus',
    contactPerson: 'Yhteyshenkilö',
    email: 'Sähköposti',
    subscription: 'Tilaus',
    subscriptionName: 'Jatkuva turvallisuus',
    nextInvoice: 'Seuraava lasku: —',
    managePayment: 'Hallitse maksua',
    upgradePackage: 'Päivitä paketti',
    pgpRecipients: 'Raporttien vastaanottajat (PGP)',
    pgpText:
      'Turvallisuusraportit toimitetaan salattuna IT-vastaavallenne. Lisää vastaanottajia ja PGP-avaimia, kun portaali lanseerataan.',
    itResponsible: 'IT-vastaava',
    pgpKey: 'PGP-avain',
    noKeyAdded: 'Ei lisättyä avainta',
    addRecipient: 'Lisää vastaanottaja',
    accountActions: 'Tilitoimenpiteet',
    pauseSubscription: 'Keskeytä tilaus',
    deleteAccount: 'Poista tili',
    logout: 'Kirjaudu ulos',
    phaseBNote: 'Aktivoidaan kirjautumisella vaiheessa B (turvallinen tunnistautuminen sähköpostilla).',
  },

  papers: {
    hero: {
      eyebrow: 'Papers',
      titleLead: 'Ajatuksia ja tutkimusta, jotka ',
      titleHighlight: 'kannattaa lukea',
      titleEnd: '.',
      description:
        'Tieteellisiä raportteja, hypoteeseja ja esseitä tekoälystä, teoreettisesta fysiikasta, filosofiasta ja turvallisuudesta. Asiakkaille, tutkijoille ja uteliaille.',
    },
    coming: 'Tulossa',
    publishedSoon: 'Julkaistaan pian',
    categories: [
      {
        title: 'Tekoäly',
        text: 'Tekoälyjärjestelmien turvallisuusvaikutukset, päättelykykyiset mallit ja autonomia.',
        papers: [
          { title: 'Kun malli ajattelee itse – Autonomiset hakkerit' },
          { title: 'Tekoäly hyökkäyspintana: promptit, data ja toimitusketju' },
        ],
      },
      {
        title: 'Teoreettinen fysiikka',
        text: 'Entropia, informaatio ja aika — perustutkimusta, joka muovaa tapaamme ajatella turvallisuutta.',
        papers: [
          { title: 'Älykkyyden fysikaalinen määritelmä' },
          { title: 'Kun viimeinen fotoni on hajonnut' },
        ],
      },
      {
        title: 'Filosofia',
        text: 'Etiikka, vapaus ja vastuu valvonnan ja vastustajien maailmassa.',
        papers: [
          { title: 'Tekoäly – demokraattisin koskaan luotu työkalu' },
          { title: 'Älykkäät, "itseään jakavat" työkalut – vastaus Faradayn paradoksiin' },
        ],
      },
      {
        title: 'Turvallisuustutkimus',
        text: 'Menetelmiä, vastustajia ja oppeja neljältä vuosikymmeneltä kentällä.',
        papers: [
          { title: 'Ulkomaisten toimijoiden kärsivällisyys: pitkät kampanjat ruotsalaisia kohteita vastaan' },
          { title: 'Jatkuva turvallisuus — miksi kertatarkastukset eivät riitä' },
        ],
      },
    ],
    newsletter: {
      title: 'Saa uudet paperit suoraan.',
      text: 'Tilaa uutiskirjeemme — korkeintaan yksi sähköposti kuukaudessa, halutessasi salattuna, ja aina yhdellä klikkauksella peruttavissa.',
      emailLabel: 'Sähköpostiosoite',
      emailPlaceholder: 'tyosahkoposti@yritys.fi',
      subscribe: 'Tilaa',
    },
  },

  legal: {
    hero: {
      eyebrow: 'Lakiasiat',
      titleLead: 'Juridiikkaa, ',
      titleHighlight: 'selkeästi ja lyhyesti',
      titleEnd: '.',
      description: 'Tietosuojaseloste, käyttöehdot ja evästetiedot. Kirjoitettu luettavaksi — ei haudattavaksi.',
    },
    updatedPrefix: 'Päivitetty viimeksi: 2026-09-13',
    sections: [
      {
        title: 'Tietosuojaseloste',
        body: [
          'Entropic Defence AB ("me", "meitä") vaalii yksityisyyttänne. Tämä seloste kuvaa, miten käsittelemme henkilötietoja, kun vierailette entropicdefence.com-sivustolla, otatte meihin yhteyttä tai käytätte palveluitamme.',
          'Keräämme tiedot, jotka itse annatte: nimi, yritys, y-tunnus, sähköposti ja se, mitä kirjoitatte yhteydenottolomakkeeseen. Käytämme tietoja vain pyyntöihin vastaamiseen, tarjousten tekemiseen ja sopimusten täyttämiseen.',
          'Emme koskaan myy tietojanne ja jaamme niitä vain niille palveluntarjoajille, joita palvelun tuottaminen edellyttää (esim. hosting), sopimuksin, jotka suojaavat tietojanne. Tiedot poistetaan, kun niitä ei enää tarvita, kuitenkin viimeistään voimassa olevan kirjanpito- ja turvallisuuslainsäädännön mukaisesti.',
          'Oikeusperuste: oikeutettu etu ja/tai sopimus. Teillä on oikeus pyytää rekisteriote, oikaisu, poisto ja tietojen siirto. Ottakaa yhteyttä: contact@entropicdefence.com.',
        ],
      },
      {
        title: 'Käyttöehdot',
        body: [
          'entropicdefence.com-sivuston sisältö tarjotaan tiedotustarkoituksessa. Pyrimme oikeellisuuteen mutta emme takaa, että sisältö on aina täydellistä tai ajantasaista.',
          'Kaikki tekstit, grafiikka ja tavaramerkit kuuluvat Entropic Defence AB:lle, ellei toisin mainita. Sisältöä ei saa kopioida, levittää tai käyttää kaupallisesti ilman kirjallista lupaa.',
          'Sivustolla kuvatut palvelut määritellään aina erillisellä kirjallisella sopimuksella. Mikään sivustolla ei muodosta sitovaa tarjousta.',
          'Turvallisuuteen liittyvissä kysymyksissä järjestelmistämme: katso Advisories & Disclosures -sivumme.',
        ],
      },
      {
        title: 'Evästeet',
        body: [
          'Emme käytä seurantaevästeitä emmekä kolmannen osapuolen mainontaa. Ainoat mahdolliset evästeet ovat välttämättömiä istuntoevästeitä, jotta sivusto toimii teknisesti.',
          'Jos tulevaisuudessa otamme käyttöön vapaaehtoisia analytiikkaevästeitä, pyydämme suostumuksenne ensin sähköisen viestinnän lain mukaisesti.',
          'Voitte aina estää tai poistaa evästeet selaimen asetuksista. Sivusto toimii täysin ilman niitä.',
        ],
      },
    ],
    questions: 'Kysymyksiä juridiikasta tai tietosuojasta?',
  },

  support: {
    hero: {
      eyebrow: 'Tuki & UKK',
      titleLead: 'Apua, kun sitä tarvitsette — ',
      titleHighlight: 'ympäri vuorokauden',
      titleEnd: '.',
      description:
        'Usein kysytyt kysymykset, suorat vastaukset ja suora yhteydenotto. Akuuteissa häiriöissä: lähettäkää sähköpostia ja merkitkää aiheeksi INCIDENT.',
    },
    duty: {
      title: 'Keskustele päivystyksemme kanssa',
      text: 'Päivystyksemme vastaa ympäri vuorokauden. Tavallisiin kysymyksiin saa suoran vastauksen, ja häiriötilanteissa tavoitatte aina ihmisen.',
      badge: 'Online · 24/7',
    },
    faqTitle: 'Usein kysytyt kysymykset',
    faqs: [
      {
        q: 'Mitä "jatkuva turvallisuus" tarkoittaa?',
        a: 'Että turvallisuus ei ole projekti, jolla on päättymispäivä, vaan jatkuva prosessi: valvontaa, uhkajahtia, toimittajien tarkastusta ja toistuvia kontrolleja — ympäri vuorokauden, ympäri vuoden.',
      },
      {
        q: 'Vastaatteko todella 24/7?',
        a: 'Kyllä. Päivystyksemme ottaa tehtäviä vastaan ympäri vuorokauden. Tavallisiin kysymyksiin saa suoran vastauksen, ja häiriötilanteissa tavoitatte aina ihmisen.',
      },
      {
        q: 'Miten turvallisuusraportit toimitetaan?',
        a: 'PGP-salattuna niille vastaanottajille, jotka ilmoitatte — yleensä IT-vastaava tai turvallisuuspäällikkö. Päätätte itse vastaanottajat ja avaimet.',
      },
      {
        q: 'Oletteko riippumattomia?',
        a: 'Kyllä. Emme myy laitteita emmekä ohjelmistoja emmekä ota provisioita toimittajilta. Ainoa tulomme on neuvonanto — ainoa lojaliteettimme on teidän suojanne.',
      },
      {
        q: 'Mitä se maksaa?',
        a: 'Jokainen yritys on ainutlaatuinen, siksi teemme aina tarjouksen. Ensimmäinen keskustelu on maksuton ja velvoitteeton. Katso pakettimme kohdasta "Valitse paketti".',
      },
      {
        q: 'Työskentelettekö vaitiolovelvollisuuden alaisena?',
        a: 'Kyllä. Vaitiolovelvollisuus ja turvallisuussuojaus ovat vakiona jokaisessa toimeksiannossa koosta riippumatta. Teemme mielellämme erilliset salassapitosopimukset ennen ensimmäistä tapaamista.',
      },
    ],
    contactTitle: 'Ota yhteyttä',
    contactText: 'Lähettäkää meille sähköpostia suoraan — päivystyksemme vastaa ympäri vuorokauden.',
    sentTitle: 'Viesti on lähetetty.',
    sentText: 'Saatte suoran vastauksen. Akuuteissa asioissa merkitkää sähköpostiin INCIDENT.',
    form: {
      name: 'Nimi *',
      namePlaceholder: 'Etunimi ja sukunimi',
      email: 'Sähköposti *',
      emailPlaceholder: 'nimi@yritys.fi',
      subject: 'Aihe *',
      subjectPlaceholder: 'Valitse aihe…',
      subjectOptions: {
        serviceQuestion: 'Kysymys palveluista',
        ongoingSupport: 'Tuki käynnissä olevalle toimeksiannolle',
        incident: 'Häiriö (akuutit asiat)',
        other: 'Muu',
      },
      message: 'Viesti *',
      messagePlaceholder: 'Miten voimme auttaa?',
      send: 'Lähetä viesti',
    },
  },

  advisories: {
    hero: {
      eyebrow: 'Advisories & Disclosures',
      titleLead: 'Koordinoitu ',
      titleHighlight: 'haavoittuvuusraportointi',
      titleEnd: '.',
      description:
        'Löysitkö haavoittuvuuden järjestelmistämme tai palveluistamme? Otamme sen vakavasti — ja lupaamme käsitellä sen ammattimaisesti ja nopeasti.',
    },
    report: 'Raportoi',
    reportText: 'Lähettäkää tiedot meille sähköpostitse. Käyttäkää mielellään PGP-avaintamme arkaluonteisiin löydöksiin.',
    pgpKey: 'PGP-avain',
    pgpText: 'Julkaistaan pian. Ottakaa yhteyttä, niin lähetämme avaimen suoraan.',
    fingerprint: 'Sormenjälki: —',
    promise: 'Lupauksemme',
    promiseText:
      'Vahvistus 72 tunnin kuluessa. Koordinoitu julkaisu. Ei oikeustoimia vilpittömässä mielessä raportoivaa vastaan.',
    activeTitle: 'Aktiiviset advisories',
    activeText:
      'Ei julkisia turvallisuusadvisoreita juuri nyt. Kun haavoittuvuus on korjattu ja koordinoitu, julkaisemme teknisen yhteenvedon täällä.',
  },

  status: {
    hero: {
      eyebrow: 'Turvallisuustilanne',
      titleLead: 'Seuraa tarkastustanne ',
      titleHighlight: 'reaaliajassa',
      titleEnd: '.',
      description:
        'Täältä näette tarkalleen, missä vaiheessa turvallisuustarkastuksenne on. Raportit toimitetaan PGP-salattuna IT-vastaavallenne.',
    },
    assignment: 'Toimeksianto ED-2026-014',
    assignmentTitle: 'Jatkuva turvallisuus — esimerkkiasiakas',
    progress: 'Käynnissä · 40%',
    stages: [
      { title: 'Vastaanotto ja suunnittelu', text: 'Järjestelmien, tavoitteiden ja aikataulun kartoitus.' },
      { title: 'Tekninen tarkastus', text: 'Penetraatiotestit ja haavoittuvuusanalyysi infrastruktuurista ja sovelluksista.' },
      { title: 'Inhimillinen tarkastus', text: 'Haastattelut, rutiinit ja henkilöstön tietoisuus.' },
      { title: 'Toimittajatarkastus', text: 'Toimitusketjun ja kolmannen osapuolen riippuvuuksien läpikäynti.' },
      { title: 'Raportti ja toimenpidesuunnitelma', text: 'Loppuraportti PGP-salattuna IT-vastaavallenne.' },
    ],
    pgpDelivery: 'PGP-toimitus',
    pgpDeliveryText:
      'Loppuraportit toimitetaan salattuna IT-vastaavallenne. Lisää vastaanottajia ja avaimia Business Profilessa.',
    manageRecipients: 'Hallitse vastaanottajia',
  },

  notFound: {
    eyebrow: 'Virhekoodi 404',
    title: 'Signaali katkesi.',
    description: 'Etsimäänne sivua ei ole — tai se on siirretty turvallisempaan paikkaan. Kenttä johdattaa teidät takaisin.',
    ctaHome: 'Takaisin etusivulle',
    ctaSupport: 'Ota yhteyttä tukeen',
  },
}
