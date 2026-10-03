import type { Dictionary } from './sv'

export const pl: Dictionary = {
  // ── Tytuły dokumentów i meta (App.tsx) ────────────────────────────────
  meta: {
    home: {
      title: 'Entropic Defence — Ciągłe bezpieczeństwo przeciwko zagranicznym podmiotom',
      description:
        'Entropic Defence AB. Ponad 40 lat pracy w obszarze bezpieczeństwa na najwyższym światowym poziomie klasyfikacji. Ciągłe bezpieczeństwo, zewnętrzne kontrole bezpieczeństwa i doradztwo dla firm, instytucji publicznych i infrastruktury krytycznej.',
    },
    checkout: {
      title: 'Wybierz pakiet — Entropic Defence',
      description:
        'Stałe ceny za ciągłe bezpieczeństwo: kontrola zewnętrzna, audyt wewnętrzny i zarządzanie bezpieczeństwem. Od 18 700 kr miesięcznie.',
    },
    checkoutExtern: {
      title: 'Ciągła kontrola bezpieczeństwa — Entropic Defence',
      description:
        'Stała cena zależna od liczby ujawnionych adresów. Kontrole miesięczne, tygodniowe lub dzienne z raportem, usuwaniem usterek i dopasowanym czasem konsultanta.',
    },
    checkoutIntern: {
      title: 'Wewnętrzny audyt bezpieczeństwa — Entropic Defence',
      description:
        'Trzy poziomy bezpieczeństwa — zwykłe, wysokie i wojskowe. Uprawnienia, logowanie i izolacja. Narzędzia AI skracają czas pracy do 1/6.',
    },
    checkoutLedning: {
      title: 'Zarządzanie bezpieczeństwem — Entropic Defence',
      description:
        'Strategiczne doradztwo bezpieczeństwa dla zarządu i kierownictwa, szkolenia personelu oraz ekspert bezpieczeństwa 24/7 — już wkrótce.',
    },
    success: {
      title: 'Zapytanie przyjęte — Entropic Defence',
      description: 'Otrzymaliśmy Państwa zapytanie. Konsultant skontaktuje się jak najszybciej.',
    },
    businessProfile: {
      title: 'Business Profile — Entropic Defence',
      description:
        'Konto bezpieczeństwa Państwa firmy: subskrypcja, odbiorcy raportów (PGP) i ustawienia konta.',
    },
    papers: {
      title: 'Papers — Entropic Defence',
      description:
        'Raporty naukowe, hipotezy i eseje o AI, fizyce teoretycznej, filozofii i bezpieczeństwie.',
    },
    legal: {
      title: 'Legal — Entropic Defence',
      description: 'Polityka prywatności, warunki korzystania i informacje o plikach cookie.',
    },
    support: {
      title: 'Wsparcie i FAQ — Entropic Defence',
      description: 'Najczęstsze pytania i wsparcie klienta. Nasz dyżur odpowiada przez całą dobę.',
    },
    advisories: {
      title: 'Advisories i ujawnienia — Entropic Defence',
      description:
        'Skoordynowane zgłaszanie podatności. Znalazłeś podatność w naszych systemach? Traktujemy to poważnie.',
    },
    status: {
      title: 'Status bezpieczeństwa — Entropic Defence',
      description: 'Śledźcie kontrolę bezpieczeństwa krok po kroku. Aktualizacje i raporty wysyłamy e-mailem do osób odpowiedzialnych.',
    },
    notFound: {
      title: 'Nie znaleziono strony — Entropic Defence',
      description: 'Strona, której szukasz, nie istnieje — lub została przeniesiona w bezpieczniejsze miejsce.',
    },
  },

  // ── Wspólne (Nav.tsx, Footer.tsx, korty pakietów) ─────────────────────
  common: {
    vatNote: 'Ceny netto (bez VAT)',
    launchPrice: 'Cena startowa',
    exclVat: 'bez VAT',
    perMonthShort: '/mies.',
    perMonth: 'miesięcznie',
    perConsultantHour: 'za godzinę konsultanta',
    perHour: '/ godzina',
    perAssignment: 'za zlecenie',
    quote: 'Wycena',
    recommended: 'Polecany',
    mostPopular: 'Najpopularniejszy',
    comingSoon: 'Wkrótce',
    allPackages: 'Wszystkie pakiety',
    active: 'Aktywny',
    ongoing: 'W toku',
    from: 'Od',
    currency: 'kr',
    chooseLanguage: 'Wybierz język',
    language: 'Język',
    periodLabel: 'Okres rozliczeniowy',
    periods: {
      month: 'Miesiąc',
      quarter: 'Kwartał',
      year: 'Rok',
    },
    savings: {
      quarter: '10 % zniżki',
      year: '3 miesiące gratis',
    },
  },

  // ── Nawigacja (Nav.tsx) ───────────────────────────────────────────────
  nav: {
    services: 'Usługi',
    advisories: 'Advisories',
    papers: 'Papers',
    support: 'Wsparcie',
    talkToConsultant: 'Porozmawiaj z konsultantem',
    homeAria: 'Entropic Defence — strona główna',
    mainMenu: 'Menu główne',
    mobileMenu: 'Menu mobilne',
    closeMenu: 'Zamknij menu',
    openMenu: 'Otwórz menu',
  },

  // ── Stopka (Footer.tsx) ───────────────────────────────────────────────
  footer: {
    tagline:
      'Ciągłe bezpieczeństwo przeciwko zagranicznym podmiotom. Ponad 40 lat na najwyższym światowym poziomie klasyfikacji — dla firm, instytucji publicznych i infrastruktury krytycznej.',
    columnNavigation: 'Nawigacja',
    columnCompany: 'Firma',
    linkServices: 'Usługi',
    linkAdvisories: 'Advisories',
    linkPapers: 'Papers',
    linkStatus: 'Status bezpieczeństwa',
    linkPackages: 'Wybierz pakiet',
    linkBusinessProfile: 'Business Profile',
    linkSupport: 'Wsparcie i FAQ',
    linkLegal: 'Legal',
    location: 'Sztokholm · Szwecja',
    copyright: '© 2026 Entropic Defence. Wszelkie prawa zastrzeżone.',
  },

  // ── Pływające CTA ─────────────────────────────────────────────────────
  floatingCta: 'Porozmawiaj z konsultantem 24/7',

  // ── Formularze ────────────────────────────────────────────────────────
  forms: {
    company: 'Firma *',
    companyPlaceholder: 'Entropic Defence AB',
    orgNumber: 'Numer rejestrowy',
    orgNumberPlaceholder: '559999-9999',
    contactPerson: 'Osoba kontaktowa *',
    namePlaceholder: 'Imię i nazwisko',
    workEmail: 'E-mail służbowy *',
    emailPlaceholder: 'imie@firma.pl',
    interestedIn: 'Zainteresowanie *',
    choosePackage: 'Wybierz pakiet…',
    notSure: 'Nie wiem — potrzebuję porady',
    describe: 'Opiszcie Państwa działalność i profil zagrożeń',
    describePlaceholder: 'Krótko o działalności, systemach i tym, co chcecie chronić…',
    sendRequest: 'Wyślij zapytanie',
    sending: 'Wysyłanie…',
    sendError:
      'Coś poszło nie tak podczas wysyłania. Spróbujcie ponownie lub napiszcie do nas bezpośrednio.',
    consentBefore: 'Wysyłając formularz akceptujecie naszą ',
    consentLink: 'politykę prywatności',
    consentAfter: '. Nigdy nie udostępniamy Państwa danych osobom trzecim.',
  },

  // ── Strona główna (Home.tsx) ──────────────────────────────────────────
  home: {
    hero: {
      eyebrow: 'Ciągłe bezpieczeństwo · Szwecja',
      titleLead: 'Bezpieczeństwo, które ',
      titleHighlight: 'nagina zagrożenia',
      titleEnd: ' — przez całą dobę.',
      description:
        'Entropic Defence chroni firmy, instytucje publiczne i infrastrukturę krytyczną przed zagranicznymi podmiotami. Ponad 40 lat na najwyższym światowym poziomie klasyfikacji — od systemów rządowych i wojskowych po Państwa działalność.',
      ctaPrimary: 'Porozmawiaj z konsultantem',
      ctaSecondary: 'Zobacz nasze pakiety bezpieczeństwa',
    },

    stats: [
      { value: '40+', label: 'lat na najwyższym światowym poziomie klasyfikacji' },
      { value: '24/7', label: 'ciągły monitoring i polowanie na zagrożenia' },
      { value: '100%', label: 'niezależne doradztwo' },
    ],

    trustStrip: [
      'Doświadczenie',
      'Zlecenia rządowe',
      'Systemy wojskowe',
      'Infrastruktura krytyczna',
      'Poufność jako standard',
    ],

    hotbild: {
      eyebrow: 'Profil zagrożeń się zmienił',
      titleLead: 'Nie jest już pytaniem, ',
      titleEm: 'czy',
      titleMiddle: ' ktoś próbuje — pytaniem jest ',
      titleHighlight: 'kiedy',
      titleEnd: '.',
      description:
        'Podmioty wspierane przez państwo kartują europejskie firmy właśnie teraz — łańcuchy dostaw, pracowników i ujawnione systemy. Kto nie kontroluje siebie, jest już kontrolowany.',
      terminal: [
        'zagrożenie: podmioty wspierane przez państwo',
        'wektory: łańcuch dostaw · insider · AI',
        'ekspozycja: kartowanie w toku',
        'status:',
      ],
      terminalActive: 'CIĄGŁY MONITORING AKTYWNY',
    },

    services: {
      eyebrow: 'Usługi',
      title: 'Cztery sposoby, w jakie chronimy Państwa firmę.',
      items: [
        {
          title: 'Ciągła kontrola bezpieczeństwa',
          text: 'Zewnętrzne kontrole, które nigdy nie robią przerwy — miesięczne, tygodniowe lub dzienne. Znajdujemy to, co znalazłby napastnik, i zamykamy to.',
        },
        {
          title: 'Wewnętrzny audyt bezpieczeństwa',
          text: 'Dogłębne utwardzenie Państwa środowiska wewnętrznego: uprawnienia, logowanie i izolacja. Pełny przegląd dopasowany do Państwa profilu ryzyka i wymagań.',
        },
        {
          title: 'Zarządzanie bezpieczeństwem',
          text: 'Strategiczne doradztwo dla kierownictwa i zarządu — oraz ekspert bezpieczeństwa 24/7, który szkoli Państwa personel.',
        },
        {
          title: 'Własna analiza AI',
          text: 'Nasze autorskie narzędzia AI kartują zagrożenia, wykrywają anomalie i zamykają podatności w czasie rzeczywistym — zanim napastnik zdąży zadziałać.',
        },
      ],
    },

    background: {
      eyebrow: 'Cztery dekady',
      title: '40 lat na najwyższym światowym poziomie klasyfikacji.',
      paragraphs: [
        'Entropic Defence powstała z jednego wniosku: europejski rynek bezpieczeństwa reaguje, zamiast zapobiegać. Zbudowaliśmy firmę, aby robić dokładnie odwrotnie.',
        'Nasi konsultanci pochodzą ze świata obrony i służb. Chroniliśmy systemy rządowe, sieci wojskowe i infrastrukturę krytyczną — przed najcierpliwszymi przeciwnikami, jacy istnieją.',
      ],
      points: [
        'Doświadczenie z obrony, służb i administracji',
        'Poufność i ochrona bezpieczeństwa w każdym zleceniu',
        'Niezależność — nie sprzedajemy sprzętu ani oprogramowania',
        'Ciągłość — ten sam zespół towarzyszy Państwu przez lata',
      ],
    },

    process: {
      eyebrow: 'Jak pracujemy',
      title: 'Od pierwszej rozmowy do ciągłego bezpieczeństwa.',
      steps: [
        {
          title: 'Rozmowa',
          text: 'Poznajemy Państwa działalność, systemy i to, co naprawdę wymaga ochrony.',
        },
        {
          title: 'Kartowanie i kontrola',
          text: 'Profil zagrożeń, powierzchnia ataku oraz kontrole zewnętrzne i wewnętrzne, aby zidentyfikować Państwa podatności.',
        },
        {
          title: 'Działania',
          text: 'Nasi konsultanci zostają i pomagają Państwa działowi IT zamknąć ustalenia — żaden raport nie leży bezczynnie.',
        },
        {
          title: 'Ciągłość',
          text: 'Bezpieczeństwo to nie projekt z datą końcową. Wracamy — a system pozostaje pod kontrolą.',
        },
      ],
    },

    contact: {
      eyebrow: '24/7 · Bezpośrednia odpowiedź',
      title: 'Porozmawiajcie z konsultantem o Państwa zagrożeniach.',
      description:
        'Pierwsza rozmowa i zewnętrzna kontrola bezpieczeństwa są bezpłatne i bez zobowiązań. Opowiedzcie o swojej działalności — a my powiemy, gdzie jesteście narażeni.',
      ctaMail: 'Napiszcie do nas bezpośrednio',
      ctaSupport: 'Nasze pakiety',
    },

    papersCta: {
      text: 'Ciekawi, jak myślimy? Przeczytajcie nasze papers o AI, fizyce i bezpieczeństwie.',
      cta: 'Do Papers',
    },
  },

  // ── /checkout ─────────────────────────────────────────────────────────
  checkout: {
    hero: {
      eyebrow: 'Wybierz pakiet',
      titleLead: 'Bezpieczeństwo warte ',
      titleHighlight: 'każdego grosza',
      titleEnd: '.',
      description:
        'Stałe ceny za ciągłe kontrole i audyt wewnętrzny — wycena tam, gdzie zlecenie wymaga więcej. Otwórzcie pakiet, aby zobaczyć ceny i poziomy.',
    },

    categories: [
      {
        name: 'Ciągła kontrola bezpieczeństwa',
        period: 'miesięcznie',
        description:
          'Zewnętrzne kontrole, które nigdy nie robią przerwy — miesięczne, tygodniowe lub dzienne. Raport, usuwanie usterek i dopasowany czas konsultanta w cenie.',
        features: [
          'Kontrola miesięczna, tygodniowa lub dzienna',
          'Stała cena zależna od liczby ujawnionych adresów',
          'Usuwanie każdej usterki',
          'Czas konsultanta od 48 h do 24/7',
        ],
      },
      {
        name: 'Wewnętrzny audyt bezpieczeństwa',
        period: 'za godzinę konsultanta',
        description:
          'System zabezpieczony od środka, mniej więcej raz w roku. Trzy poziomy — od zwykłego bezpieczeństwa do stopnia wojskowego.',
        features: [
          'Trzy poziomy dopasowane do potrzeb',
          'Uprawnienia, logowanie i izolacja',
          'Systemy, które nie odpowiadają na sondowanie',
          'Narzędzia AI skracają czas pracy do 1/6',
        ],
      },
      {
        name: 'Zarządzanie bezpieczeństwem',
        period: 'za zlecenie',
        description:
          'Strategiczne doradztwo dla kierownictwa i zarządu — oraz ekspert bezpieczeństwa 24/7, który szkoli Państwa personel. Ekspert już wkrótce.',
        features: [
          'Strategia bezpieczeństwa na poziomie zarządu',
          'Szkolenia personelu i zarządu',
          'Wsparcie w sytuacjach incydentów',
          'Ekspert bezpieczeństwa 24/7 — już wkrótce',
        ],
      },
    ],

    seePackages: 'Zobacz pakiety i ceny',
    scrollHint: 'Przewińcie w górę, aby zobaczyć pakiety',

    form: {
      title: 'Opowiedzcie o swojej działalności.',
      description:
        'Im więcej wiemy, tym lepsza wycena — szczególnie dla systemów powyżej 100 ujawnionych adresów i audytu wewnętrznego. Wszystko, co Państwo przesyłacie, jest objęte poufnością.',
      bullets: [
        'Bezpośrednia odpowiedź, każdego dnia',
        'Pierwsza rozmowa bezpłatna',
        'Wycena bez zobowiązań',
        'PGP dostępne dla poufnej komunikacji',
      ],
    },
    options: {
      external: 'Ciągła kontrola bezpieczeństwa',
      internal: 'Wewnętrzny audyt bezpieczeństwa',
      leadership: 'Zarządzanie bezpieczeństwem',
      unsure: 'Nie wiem — potrzebuję porady',
    },
  },

  // ── /checkout/extern ──────────────────────────────────────────────────
  checkoutExtern: {
    hero: {
      eyebrow: 'Ciągła kontrola bezpieczeństwa',
      titleLead: 'Stała cena za bezpieczeństwo, które ',
      titleHighlight: 'nigdy nie robi przerwy',
      titleEnd: '.',
      description:
        'Zewnętrzne kontrole, które nigdy nie robią przerwy — miesięczne, tygodniowe lub dzienne. Każdy pakiet obejmuje raport, usuwanie usterek i dopasowany czas konsultanta, który pomaga Państwa działowi IT zamknąć ustalenia.',
    },

    tierLabel: 'Liczba ujawnionych adresów',
    tierAria: 'Wybierz liczbę ujawnionych adresów',

    tiers: {
      small: {
        label: 'Poniżej 20 ujawnionych adresów',
        short: 'Poniżej 20 adresów',
        note: 'Mały system z mniej niż 20 ujawnionymi adresami.',
      },
      medium: {
        label: '20–100 ujawnionych adresów',
        short: '20–100 adresów',
        note: 'Systemy średniej wielkości z wieloma powierzchniami i integracjami.',
      },
      large: {
        label: '100+ ujawnionych adresów',
        short: '100+ adresów',
        note: 'Złożone systemy — wycena po analizie potrzeb.',
      },
    },

    plans: {
      manad: {
        name: 'Kontrola miesięczna',
        cadence: '1 kontrola zewnętrzna miesięcznie',
        description:
          'Stała podstawa: jedna pełna kontrola zewnętrzna każdego miesiąca, z propozycjami działań i dopasowanym czasem konsultanta na zamknięcie ustaleń.',
        features: [
          '1 zewnętrzna kontrola bezpieczeństwa co miesiąc',
          'Raport pisemny z usuwaniem każdej usterki',
          '48 godzin czasu konsultanta, który pomaga Państwa działowi IT wdrożyć działania',
          'Bieżące doradztwo dla Państwa działu IT',
        ],
      },
      vecka: {
        name: 'Kontrola tygodniowa',
        cadence: '1 kontrola zewnętrzna tygodniowo',
        description:
          'Dla firm, których nie stać na narażenie dłużej niż kilka dni — częstsze kontrole i dopasowany czas konsultanta na zamknięcie problemów.',
        features: [
          '1 zewnętrzna kontrola bezpieczeństwa co tydzień',
          'Raport pisemny z usuwaniem każdej usterki',
          'Dopasowany czas konsultanta na zamknięcie problemów',
          'Priorytetowa obsługa krytycznych ustaleń',
          'Przegląd kwartalny dla osób odpowiedzialnych za bezpieczeństwo',
        ],
      },
      dag: {
        name: 'Kontrola dzienna',
        cadence: '1 kontrola zewnętrzna dziennie',
        consultant: 'Czas konsultanta 24/7 · najwyższy priorytet',
        description:
          'Stosowana niemal wyłącznie przez wojsko i administrację. Napastnik nigdy nie ma więcej niż dobę — często mniej.',
        features: [
          '1 zewnętrzna kontrola bezpieczeństwa każdego dnia',
          'Raport pisemny z usuwaniem każdej usterki',
          'Czas konsultanta 24/7 z najwyższym priorytetem',
          'Dopasowana do obrony, administracji i infrastruktury krytycznej',
          'Ochrona bezpieczeństwa i poufność najwyższej klasy',
        ],
      },
    },

    requestQuote: 'Poproś o wycenę',
    bookCall: 'Zamów rozmowę',
    largeNote: 'Systemy powyżej 100 ujawnionych adresów wyceniamy po analizie potrzeb',

    consult: {
      eyebrow: 'W cenie każdego pakietu',
      title: 'Konsultant, który zostaje — nie tylko raport.',
      cards: [
        {
          title: 'Usuwanie usterek jedna po drugiej',
          text: 'Każdy raport opisuje dokładnie, co jest nie tak i jak to naprawić — z priorytetem według realnego ryzyka.',
        },
        {
          title: '48 godzin po każdej kontroli',
          text: 'W Kontroli miesięcznej zawarto 48 godzin czasu konsultanta, który pomaga Państwa działowi IT wdrożyć działania.',
        },
        {
          title: '24/7 w pakiecie dziennym',
          text: 'Kontrola dzienna daje czas konsultanta przez całą dobę, z priorytetem dla krytycznych ustaleń.',
        },
      ],
    },

    form: {
      title: 'Zamówcie rozmowę o Państwa powierzchni ataku.',
      description:
        'Napiszcie, ile ujawnionych adresów i systemów posiadacie, a potwierdzimy cenę i poziom. Systemy powyżej 100 ujawnionych adresów wymagają najpierw krótkiej analizy potrzeb.',
      bullets: [
        'Bezpośrednia odpowiedź, każdego dnia',
        'Pierwsza rozmowa bezpłatna',
        'Wycena bez zobowiązań',
        'PGP dostępne dla poufnej komunikacji',
      ],
      options: {
        manad: 'Ciągła kontrola bezpieczeństwa — Kontrola miesięczna',
        vecka: 'Ciągła kontrola bezpieczeństwa — Kontrola tygodniowa',
        dag: 'Ciągła kontrola bezpieczeństwa — Kontrola dzienna',
        large: 'Systemy powyżej 100 ujawnionych adresów — analiza potrzeb',
      },
    },
  },

  // ── /checkout/intern ──────────────────────────────────────────────────
  checkoutIntern: {
    hero: {
      eyebrow: 'Wewnętrzny audyt bezpieczeństwa',
      titleLead: 'Bezpieczeństwo od środka — tam, gdzie ',
      titleHighlight: 'nikt obcy nie patrzy',
      titleEnd: '.',
      description:
        'Zewnętrzne kontrole widzą to, co widzi napastnik. My idziemy głębiej: uprawnienia, logowanie, izolacja i wszystko to, co decyduje o tym, czy włamanie zatrzyma się na jednym komputerze — czy rozprzestrzeni się dalej.',
    },

    rate: {
      eyebrow: 'Czas konsultanta',
      perHour: '/ godzina',
      text: 'Płacą Państwo za rzeczywistą pracę — nie za to, żebyśmy uczyli się Państwa systemu na Państwa koszt. Zakres i czas potwierdzamy po krótkiej analizie potrzeb.',
    },

    levels: {
      vanlig: {
        name: 'Zwykłe bezpieczeństwo',
        level: 'Poziom 1',
        tagline: 'Nadal wyżej, niż dostarcza jakikolwiek inny dostawca.',
        description:
          'Przegląd od środka: uprawnienia, logowanie, segmentacja i procedury. Wymagany przez wielu audytorów — i zamyka drzwi, których zewnętrzna kontrola nigdy nie widzi.',
        features: [
          'Przegląd uprawnień i ról',
          'Logowanie, alerty i identyfikowalność',
          'Procedury dla personelu i dostawców',
          'Raport końcowy z priorytetowym planem działań',
        ],
      },
      hog: {
        name: 'Wysokie bezpieczeństwo',
        level: 'Poziom 2',
        tagline: 'Podwyższone bezpieczeństwo, w którym wnętrze nie ufa nikomu — nawet sobie.',
        description:
          'Architektura zero trust, podzielone strefy i sekrety, które nigdy nie opuszczają sprzętu. Dla firm z wrażliwymi danymi i realnymi aktywami do ochrony.',
        features: [
          'Architektura zero trust i mikrosegmentacja',
          'Zarządzanie kluczami szyfrującymi i dystrybucja sekretów',
          'Ochrona przed insiderem i wykrywanie anomalii',
          'Plan gotowości na wewnętrzny incydent',
        ],
      },
      militar: {
        name: 'Stopień wojskowy',
        level: 'Poziom 3',
        tagline: 'Systemy nie pojawiają się nawet wtedy, gdy ktoś je sonduje.',
        description:
          'Najwyższy wewnętrzny poziom, jaki dostarczamy. System istnieje, ale nie wysyła odpowiedzi, odcisku palca ani regularności. Zarezerwowany dla obrony, administracji i infrastruktury krytycznej.',
        features: [
          'Ukryta infrastruktura — brak odpowiedzi na sondowanie',
          'Celowy szum przeciw odciskom palca i analizie czasowej',
          'Fizyczna i logiczna izolacja materiału kluczowego',
          'Ciągły audyt całego łańcucha od środka',
          'Ochrona bezpieczeństwa najwyższej klasy',
        ],
      },
    },

    requestReview: 'Zamów audyt',
    rateNote: 'Rozliczenie za godzinę konsultanta',

    efficiency: {
      eyebrow: 'Efektywność',
      title: 'Tam, gdzie człowiek potrzebuje sześciu godzin, my potrzebujemy jednej.',
      paragraphFirst:
        'Podczas całego audytu pracujemy z autorskimi narzędziami AI. Dzięki temu złożone zlecenia zajmują około jednej szóstej czasu w porównaniu z pracą wyłącznie ludzkich ekspertów bezpieczeństwa — bez kompromisów w jakości.',
      paragraphLead: 'Rezultat jest nie tylko szybszy. To ',
      paragraphHighlight: 'wyższe bezpieczeństwo',
      paragraphEnd: ' niż człowiek jest w stanie osiągnąć samodzielnie.',
      cards: [
        {
          title: '1/6 czasu',
          text: 'Narzędzia AI analizują system równolegle z konsultantem — nie po fakcie.',
        },
        {
          title: 'Wyższe bezpieczeństwo',
          text: 'Żadnego zmęczenia, żadnych skrótów i żadnego miejsca, w którym można ukryć ustalenie.',
        },
        {
          title: 'Niewidoczny rezultat',
          text: 'Na stopniu wojskowym zostawiamy system, który nie odpowiada nawet wtedy, gdy ktoś go sonduje.',
        },
      ],
    },

    form: {
      title: 'Powiedzcie, co wymaga ochrony.',
      description:
        'Im bardziej wrażliwe środowisko, tym więcej chcemy wiedzieć przed podaniem szacunku. Wszystko jest objęte poufnością i może zostać przesłane przez PGP.',
      bullets: [
        'Bezpłatna analiza potrzeb',
        'Szacunek w godzinach konsultanta przed rozpoczęciem pracy',
        'Praca odbywa się na miejscu lub zdalnie',
        'Poufność i ochrona bezpieczeństwa najwyższej klasy',
      ],
      options: {
        vanlig: 'Wewnętrzny audyt bezpieczeństwa — Zwykłe bezpieczeństwo',
        hog: 'Wewnętrzny audyt bezpieczeństwa — Wysokie bezpieczeństwo',
        militar: 'Wewnętrzny audyt bezpieczeństwa — Stopień wojskowy',
        unsure: 'Nie wiem — potrzebuję porady',
      },
    },
  },
  // ── /checkout/ledning ─────────────────────────────────────────────────
  checkoutLedning: {
    hero: {
      eyebrow: 'Zarządzanie bezpieczeństwem',
      titleLead: 'Zarządzanie bezpieczeństwem dla tych, którzy ',
      titleHighlight: 'podejmują decyzje',
      titleEnd: '.',
      description:
        'Bezpieczeństwo to odpowiedzialność kierownictwa. Pomagamy zarządowi, kierownictwu i osobie odpowiedzialnej za bezpieczeństwo podejmować właściwe decyzje — zanim coś się stanie, a nie po fakcie.',
    },
    strategic: {
      title: 'Strategiczne zarządzanie bezpieczeństwem',
      text: 'Starszy doradca bezpieczeństwa w Państwa zespole kierowniczym. Opracowujemy strategię bezpieczeństwa, szkolimy personel i wspieramy w sytuacjach incydentów — z obowiązkiem poufności na każdym szczeblu.',
      features: [
        'Strategia bezpieczeństwa na poziomie kierownictwa',
        'Szkolenia personelu i zarządu',
        'Wsparcie w sytuacjach incydentów',
        'Obowiązek poufności na każdym szczeblu',
        'Można połączyć z kontrolą i audytem',
      ],
      requestQuote: 'Poproś o wycenę',
    },
    expert: {
      title: 'Ekspert bezpieczeństwa 24/7',
      text: 'Dedykowany ekspert bezpieczeństwa — o którego cała organizacja może zapytać w dowolnym momencie. Bez czekania, bez kolejki zgłoszeń i bez pytań zbyt błahych.',
      price: 'Wkrótce',
      period: 'subskrypcja',
      features: [
        'Odpowiedź przez całą dobę, każdego dnia',
        'Dostępny dla wszystkich w organizacji',
        'Na bieżąco szkoli personel',
        'Eskaluje do specjalisty podczas realnego incydentu',
      ],
      notifyMe: 'Powiadom mnie',
      note: 'Zostawcie swój e-mail w formularzu — dowiecie się pierwsi.',
    },
    expertVatNote: 'Ekspert bezpieczeństwa 24/7 jest w przygotowaniu; cenę podamy przy starcie',
    form: {
      title: 'Porozmawiajmy o bezpieczeństwie na poziomie kierownictwa.',
      description:
        'Mówimy językiem kierownictwa, nie tylko technologii. Opowiedzcie o swojej organizacji i wyzwaniach — zaproponujemy rozwiązanie i wrócimy z wyceną.',
      bullets: [
        'Pierwsza rozmowa jest zawsze bezpłatna',
        'Mówimy językiem kierownictwa, nie tylko technologii',
        'Obowiązek poufności na każdym szczeblu',
        'Można połączyć z kontrolą i audytem',
      ],
      options: {
        strategy: 'Zarządzanie bezpieczeństwem — doradztwo strategiczne',
        training: 'Zarządzanie bezpieczeństwem — szkolenia personelu',
        expert: 'Ekspert bezpieczeństwa 24/7 — powiadom mnie o starcie',
      },
    },
  },

  // ── Potwierdzenie ─────────────────────────────────────────────────────
  success: {
    eyebrow: 'Zapytanie przyjęte',
    titleLead: 'Dziękujemy — wracamy do Państwa ',
    titleHighlight: 'w ciągu 10 minut',
    titleEnd: '.',
    description:
      'Państwa zapytanie zostało zarejestrowane. Konsultant bezpieczeństwa przeczyta je i skontaktuje się na podany służbowy adres e-mail z kolejnymi krokami i pierwszą wyceną.',
    panelTitle: 'Wszystko dotarło.',
    panelText:
      'Chcą Państwo przekazać informacje wrażliwe już teraz? Poproście o nasz klucz PGP w e-mailu potwierdzającym — albo napiszcie do nas bezpośrednio.',
    ctaHome: 'Powrót na stronę główną',
    ctaPapers: 'Przeczytajcie nasze papers',
  },

  // ── Business Profile ──────────────────────────────────────────────────
  businessProfile: {
    hero: {
      eyebrow: 'Business Profile',
      titleLead: 'Konto bezpieczeństwa ',
      titleHighlight: 'Państwa firmy',
      titleEnd: '.',
      description:
        'Zarządzajcie subskrypcją, odbiorcami raportów i kontem. Pełna funkcjonalność zostanie uruchomiona razem z portalem w fazie B.',
    },
    account: 'Konto',
    company: 'Firma',
    orgNumber: 'Numer rejestrowy',
    contactPerson: 'Osoba kontaktowa',
    email: 'E-mail',
    subscription: 'Subskrypcja',
    subscriptionName: 'Ciągłe bezpieczeństwo',
    nextInvoice: 'Następna faktura: —',
    managePayment: 'Zarządzaj płatnością',
    upgradePackage: 'Ulepsz pakiet',
    pgpRecipients: 'Odbiorcy raportów (PGP)',
    pgpText:
      'Raporty bezpieczeństwa dostarczamy zaszyfrowane do osoby odpowiedzialnej za IT. Dodawanie odbiorców i kluczy PGP będzie możliwe po uruchomieniu portalu.',
    itResponsible: 'Osoba odpowiedzialna za IT',
    pgpKey: 'Klucz PGP',
    noKeyAdded: 'Nie dodano klucza',
    addRecipient: 'Dodaj odbiorcę',
    accountActions: 'Działania na koncie',
    pauseSubscription: 'Wstrzymaj subskrypcję',
    deleteAccount: 'Usuń konto',
    logout: 'Wyloguj się',
    phaseBNote: 'Aktywne po logowaniu w fazie B (bezpieczne uwierzytelnianie e-mailem).',
  },

  // ── Papers ────────────────────────────────────────────────────────────
  papers: {
    hero: {
      eyebrow: 'Papers',
      titleLead: 'Myśli i badania ',
      titleHighlight: 'warte lektury',
      titleEnd: '.',
      description:
        'Raporty naukowe, hipotezy i eseje o AI, fizyce teoretycznej, filozofii i bezpieczeństwie. Dla klientów, badaczy i ciekawych świata.',
    },
    coming: 'W przygotowaniu',
    publishedSoon: 'Publikacja wkrótce',
    categories: [
      {
        title: 'Sztuczna inteligencja',
        text: 'Konsekwencje bezpieczeństwa systemów AI, modele rozumujące i autonomia.',
        papers: [
          { title: 'Gdy model myśli samodzielnie — autonomiczni hakerzy' },
          { title: 'AI jako powierzchnia ataku: prompt, dane i łańcuch dostaw' },
        ],
      },
      {
        title: 'Fizyka teoretyczna',
        text: 'Entropia, informacja i czas — badania podstawowe, które kształtują nasze myślenie o bezpieczeństwie.',
        papers: [
          { title: 'Entropia jako miara inteligencji: dlaczego harmonia to efektywniejszy stan energii' },
          { title: 'Czas, obserwacja i podatność — perspektywa fizyczna' },
        ],
      },
      {
        title: 'Filozofia',
        text: 'Etyka, wolność i odpowiedzialność w świecie nadzoru i przeciwników.',
        papers: [
          { title: 'Obrona otwartego społeczeństwa środkami zamkniętymi' },
          { title: 'Zaufanie jest podatnością — i naszym najważniejszym zasobem' },
        ],
      },
      {
        title: 'Badania nad bezpieczeństwem',
        text: 'Metody, przeciwnicy i wnioski z czterech dekad w terenie.',
        papers: [
          { title: 'Cierpliwość zagranicznych podmiotów: długie kampanie przeciw polskim celom' },
          { title: 'Ciągłe bezpieczeństwo — dlaczego jednorazowe kontrole nie wystarczają' },
        ],
      },
    ],
    newsletter: {
      title: 'Otrzymujcie nowe papers bezpośrednio.',
      text: 'Zapiszcie się do naszego newslettera — najwyżej jeden e-mail w miesiącu, na życzenie zaszyfrowany i zawsze z możliwością wypisania jednym kliknięciem.',
      emailLabel: 'Adres e-mail',
      emailPlaceholder: 'poczta@firma.pl',
      subscribe: 'Zapisz się',
    },
  },

  // ── Legal ─────────────────────────────────────────────────────────────
  legal: {
    hero: {
      eyebrow: 'Legal',
      titleLead: 'Prawo, ',
      titleHighlight: 'jasno i krótko',
      titleEnd: '.',
      description:
        'Polityka prywatności, warunki korzystania i informacje o plikach cookie. Napisane tak, żeby dało się je przeczytać — nie żeby je zakopać.',
    },
    updatedPrefix: 'Ostatnia aktualizacja: 2026-09-13',
    sections: [
      {
        title: 'Polityka prywatności',
        body: [
          'Entropic Defence AB („my”, „nas”) dba o Państwa prywatność. Niniejsza polityka opisuje, jak przetwarzamy dane osobowe, gdy odwiedzają Państwo entropicdefence.com, kontaktują się z nami lub korzystają z naszych usług.',
          'Zbieramy dane, które przekazują nam Państwo sami: imię i nazwisko, firmę, numer rejestrowy, e-mail oraz treść wpisaną w formularzu kontaktowym. Dane wykorzystujemy wyłącznie do odpowiedzi na zapytania, przygotowania wyceny i realizacji umów.',
          'Nigdy nie sprzedajemy Państwa danych i udostępniamy je wyłącznie dostawcom niezbędnym do prowadzenia usługi (np. hosting) na podstawie umów chroniących Państwa dane. Dane usuwamy, gdy przestają być potrzebne, nie później niż zgodnie z obowiązującymi przepisami o rachunkowości i bezpieczeństwie.',
          'Podstawa prawna: uzasadniony interes i/lub umowa. Mają Państwo prawo do uzyskania kopii danych, sprostowania, usunięcia i przenoszenia danych. Kontakt: support@entropicdefence.com.',
        ],
      },
      {
        title: 'Warunki korzystania',
        body: [
          'Treści na entropicdefence.com udostępniamy w celach informacyjnych. Dbamy o ich poprawność, ale nie gwarantujemy, że są zawsze kompletne i aktualne.',
          'Wszystkie teksty, grafiki i znaki towarowe należą do Entropic Defence AB, o ile nie zaznaczono inaczej. Kopiowanie, rozpowszechnianie i wykorzystywanie komercyjne bez pisemnej zgody są zabronione.',
          'Usługi opisane na stronie reguluje zawsze odrębna umowa pisemna. Nic na stronie nie stanowi wiążącej oferty.',
          'W sprawach bezpieczeństwa naszych systemów zapraszamy na stronę Advisories & Disclosures.',
        ],
      },
      {
        title: 'Pliki cookie',
        body: [
          'Nie używamy plików cookie do śledzenia ani reklam podmiotów trzecich. Jedyne pliki cookie, jakie mogą wystąpić, to niezbędne pliki sesyjne potrzebne do technicznego działania strony.',
          'Jeśli w przyszłości wprowadzimy opcjonalne pliki cookie analityczne, najpierw poprosimy o Państwa zgodę, zgodnie z przepisami o komunikacji elektronicznej.',
          'Pliki cookie można w każdej chwili zablokować lub usunąć w ustawieniach przeglądarki. Strona działa w pełni również bez nich.',
        ],
      },
    ],
    questions: 'Pytania o prawo lub ochronę danych?',
  },

  // ── Wsparcie i FAQ ────────────────────────────────────────────────────
  support: {
    hero: {
      eyebrow: 'Wsparcie i FAQ',
      titleLead: 'Pomoc, gdy jej potrzebujecie — ',
      titleHighlight: 'przez całą dobę',
      titleEnd: '.',
      description:
        'Wybierzcie kontakt z naszym dyżurem albo odpowiedzi w najczęstszych pytaniach poniżej. W Nagłych przypadkach oznaczcie temat wiadomości słowem INCIDENT.',
    },
    duty: {
      title: 'Porozmawiajcie z naszym dyżurem',
      text: 'Nasz dyżur odpowiada przez całą dobę. Na zwykłe pytania odpowiadamy od razu, a incydenty prowadzimy dyskretnie.',
      badge: 'Online · 24/7',
    },
    faqTitle: 'Najczęstsze pytania',
    faqs: [
      {
        q: 'Co oznacza „ciągłe bezpieczeństwo”?',
        a: 'Że bezpieczeństwo nie jest projektem z datą końcową, lecz stałym procesem: monitoring, polowanie na zagrożenia, przegląd dostawców i powtarzalne kontrole — przez całą dobę, przez cały rok.',
      },
      {
        q: 'Czy naprawdę odpowiadacie 24/7?',
        a: 'Tak, nasz dyżur pracuje przez całą dobę, każdego dnia w roku.',
      },
      {
        q: 'Jak przekazujecie raporty bezpieczeństwa?',
        a: 'Zaszyfrowane PGP do wskazanych odbiorców — zwykle osoby odpowiedzialnej za IT lub za bezpieczeństwo. Odbiorców i klucze ustalają Państwo sami.',
      },
      {
        q: 'Czy jesteście niezależni?',
        a: 'Tak. Nie sprzedajemy sprzętu ani oprogramowania i nie bierzemy prowizji od dostawców. Naszym jedynym przychodem jest doradztwo, a naszą jedyną lojalnością jest ochrona Państwa.',
      },
      {
        q: 'Ile to kosztuje?',
        a: 'Każda organizacja jest inna, dlatego zawsze przygotowujemy wycenę. Dla mniejszych systemów z mniejszą liczbą ujawnionych adresów mamy stałe ceny — zobaczcie pakiety w sekcji „Wybierz pakiet”. Pierwsza rozmowa jest bezpłatna i bez zobowiązań.',
      },
      {
        q: 'Pracujecie na zasadzie poufności?',
        a: 'Tak. Poufność i ochrona bezpieczeństwa są standardem w każdym zleceniu, niezależnie od jego rozmiaru. Chętnie podpiszemy odrębne umowy o zachowaniu poufności przed pierwszym spotkaniem.',
      },
    ],
    contactTitle: 'Kontakt',
    contactText: 'Napiszcie do nas bezpośrednio — nasz dyżur odpowiada przez całą dobę.',
    sentTitle: 'Wiadomość wysłana.',
    sentText: 'Odpowiemy od razu. W nagłych sprawach oznaczcie wiadomość słowem INCIDENT.',
    form: {
      name: 'Imię i nazwisko *',
      namePlaceholder: 'Imię i nazwisko',
      email: 'E-mail *',
      emailPlaceholder: 'imie@firma.pl',
      subject: 'Temat *',
      subjectPlaceholder: 'Wybierz temat…',
      subjectOptions: {
        serviceQuestion: 'Pytanie o usługi',
        ongoingSupport: 'Wsparcie dla bieżącego zlecenia',
        incident: 'Incydent (sprawy pilne)',
        other: 'Inne',
      },
      message: 'Wiadomość *',
      messagePlaceholder: 'Jak możemy Państwu pomóc?',
      send: 'Wyślij wiadomość',
    },
  },

  // ── Advisories & Disclosures ──────────────────────────────────────────
  advisories: {
    hero: {
      eyebrow: 'Advisories & Disclosures',
      titleLead: 'Skoordynowane ',
      titleHighlight: 'zgłaszanie podatności',
      titleEnd: '.',
      description:
        'Znaleźli Państwo podatność w naszych systemach lub usługach? Traktujemy to poważnie — i obiecujemy zająć się tym profesjonalnie i szybko.',
    },
    report: 'Zgłoś',
    reportText: 'Wyślijcie szczegóły e-mailem. Do wrażliwych ustaleń użyjcie naszego klucza PGP.',
    pgpKey: 'Klucz PGP',
    pgpText: 'Publikacja wkrótce. Napiszcie do nas, a prześlemy klucz od razu.',
    fingerprint: 'Fingerprint: —',
    promise: 'Nasza obietnica',
    promiseText:
      'Potwierdzenie w ciągu 72 godzin. Skoordynowana publikacja. Żadnych kroków prawnych wobec osób zgłaszających w dobrej wierze.',
    activeTitle: 'Aktywne advisories',
    activeText:
      'Obecnie brak publicznych advisories bezpieczeństwa. Gdy podatność zostanie usunięta i skoordynowana, opublikujemy tu techniczne podsumowanie.',
  },

  // ── Status bezpieczeństwa ─────────────────────────────────────────────
  status: {
    hero: {
      eyebrow: 'Status bezpieczeństwa',
      titleLead: 'Śledźcie kontrolę ',
      titleHighlight: 'krok po kroku',
      titleEnd: '.',
      description:
        'Tutaj widzą Państwo dokładnie, na jakim etapie jest kontrola bezpieczeństwa. Aktualizacje i raporty docierają do Państwa e-mailem — do osoby odpowiedzialnej za IT, odpowiedzialnego kierownika lub szefa bezpieczeństwa.',
    },
    assignment: 'Zlecenie ED-2026-014',
    assignmentTitle: 'Ciągłe bezpieczeństwo — klient przykładowy',
    progress: 'W toku · 40%',
    stages: [
      { title: 'Przyjęcie i planowanie', text: 'Kartowanie systemów, celów i harmonogramu.' },
      { title: 'Przegląd techniczny', text: 'Testy penetracyjne i analiza podatności infrastruktury oraz aplikacji.' },
      { title: 'Przegląd ludzki', text: 'Rozmowy, procedury i świadomość personelu.' },
      { title: 'Przegląd dostawców', text: 'Analiza łańcucha dostaw i zależności od podmiotów trzecich.' },
      { title: 'Raport i plan działań', text: 'Raport końcowy zaszyfrowany PGP do wskazanych odbiorców.' },
    ],
    pgpDelivery: 'Dostawa PGP',
    pgpDeliveryText:
      'Raporty końcowe i bieżące aktualizacje wysyłamy na wskazane adresy e-mail — do osoby odpowiedzialnej za IT, odpowiedzialnego kierownika lub szefa bezpieczeństwa. Jeśli chcą Państwo otrzymać je zaszyfrowane PGP, ustalimy klucz bezpiecznym kanałem. Konta nie są potrzebne.',
    manageRecipients: 'Napiszcie do nas o odbiorcach',
  },

  // ── 404 ───────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: 'Kod błędu 404',
    title: 'Utrata sygnału.',
    description:
      'Strona, której szukacie, nie istnieje — lub została przeniesiona w bezpieczniejsze miejsce. Pole prowadzi Państwa z powrotem.',
    ctaHome: 'Powrót na stronę główną',
    ctaSupport: 'Kontakt z wsparciem',
  },
}
