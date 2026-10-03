import type { Dictionary } from './sv'

export const en: Dictionary = {
  meta: {
    home: {
      title: 'Entropic Defence — Continuous security against foreign actors',
      description:
        'Entropic Defence AB. 40+ years of security work at the world’s highest security classification. Continuous security, external security reviews and advisory services for companies, government agencies and critical infrastructure.',
    },
    checkout: {
      title: 'Choose a package — Entropic Defence',
      description:
        'Fixed prices for continuous security: external review, internal audit and security management. From 18 700 kr per month.',
    },
    checkoutExtern: {
      title: 'Continuous security review — Entropic Defence',
      description:
        'Fixed price based on the number of exposed addresses. Monthly, weekly or daily reviews with reporting, remediation and dedicated consulting.',
    },
    checkoutIntern: {
      title: 'Internal security audit — Entropic Defence',
      description:
        'Three security levels — standard, high and military grade. Permissions, logging and isolation. AI tools deliver in 1/6 of the time.',
    },
    checkoutLedning: {
      title: 'Security management — Entropic Defence',
      description:
        'Strategic security advisory for management and board, training for your staff and a 24/7 security expert arriving soon.',
    },
    success: {
      title: 'Request received — Entropic Defence',
      description: 'We have received your request. A consultant will get back to you shortly.',
    },
    businessProfile: {
      title: 'Business Profile — Entropic Defence',
      description:
        'Your company security account: subscription, report recipients (PGP) and account settings.',
    },
    papers: {
      title: 'Papers — Entropic Defence',
      description:
        'Research papers, hypotheses and essays on AI, theoretical physics, philosophy and security.',
    },
    legal: {
      title: 'Legal — Entropic Defence',
      description: 'Privacy policy, terms of use and cookie information.',
    },
    support: {
      title: 'Support & FAQ — Entropic Defence',
      description: 'Frequently asked questions and customer support. Our duty desk answers around the clock.',
    },
    advisories: {
      title: 'Advisories & Disclosures — Entropic Defence',
      description:
        'Coordinated vulnerability disclosure. Found a vulnerability in our systems? We take it seriously.',
    },
    status: {
      title: 'Security status — Entropic Defence',
      description:
        'Follow your security review step by step. Updates and reports are sent by email to your responsible staff.',
    },
    notFound: {
      title: 'Page not found — Entropic Defence',
      description: 'The page you are looking for does not exist — or has been moved to a safer place.',
    },
  },

  common: {
    vatNote: 'Prices excl. VAT',
    launchPrice: 'Launch price',
    exclVat: 'excl. VAT',
    perMonthShort: '/mo',
    perMonth: 'per month',
    perConsultantHour: 'per consultant hour',
    perHour: '/ hour',
    perAssignment: 'per engagement',
    quote: 'Quote',
    recommended: 'Recommended',
    mostPopular: 'Most popular',
    comingSoon: 'Coming soon',
    allPackages: 'All packages',
    active: 'Active',
    ongoing: 'In progress',
    from: 'From',
    currency: 'kr',
    chooseLanguage: 'Choose language',
    language: 'Language',
    // Billing period selector (point 5)
    periodLabel: 'Billing period',
    periods: {
      month: 'Month',
      quarter: 'Quarter',
      year: 'Year',
    },
    savings: {
      quarter: '10 % discount',
      year: '3 months free included',
    },
  },

  nav: {
    services: 'Services',
    advisories: 'Advisories',
    papers: 'Papers',
    support: 'Support',
    talkToConsultant: 'Talk to a consultant',
    homeAria: 'Entropic Defence — home page',
    mainMenu: 'Main menu',
    mobileMenu: 'Mobile menu',
    closeMenu: 'Close menu',
    openMenu: 'Open menu',
  },

  footer: {
    tagline:
      'Continuous security against foreign actors. 40+ years at the world’s highest security classification — for companies, government agencies and critical infrastructure.',
    columnNavigation: 'Navigation',
    columnCompany: 'Company',
    linkServices: 'Services',
    linkAdvisories: 'Advisories',
    linkPapers: 'Papers',
    linkStatus: 'Security status',
    linkPackages: 'Choose a package',
    linkBusinessProfile: 'Business Profile',
    linkSupport: 'Support & FAQ',
    linkLegal: 'Legal',
    location: 'Stockholm · Sweden',
    copyright: '© 2026 Entropic Defence. All rights reserved.',
  },

  floatingCta: 'Talk to a consultant 24/7',

  forms: {
    company: 'Company *',
    companyPlaceholder: 'Entropic Defence AB',
    orgNumber: 'Company registration number',
    orgNumberPlaceholder: '559999-9999',
    contactPerson: 'Contact person *',
    namePlaceholder: 'First and last name',
    workEmail: 'Work email *',
    emailPlaceholder: 'name@company.com',
    interestedIn: 'Interested in *',
    choosePackage: 'Choose a package…',
    notSure: 'Not sure — I need advice',
    describe: 'Describe your business and the threat you face',
    describePlaceholder: 'Briefly about your business, your systems and what you want to protect…',
    sendRequest: 'Send request',
    sending: 'Sending…',
    sendError:
      'Something went wrong while sending the message. Please try again or email us directly.',
    consentBefore: 'By sending this you accept our ',
    consentLink: 'privacy policy',
    consentAfter: '. We never share your information with third parties.',
  },

  // ── Home page ────────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: 'Continuous security · Sweden',
      titleLead: 'Security that ',
      titleHighlight: 'bends the threat',
      titleEnd: ' — around the clock.',
      description:
        'Entropic Defence protects companies, government agencies and critical infrastructure against foreign actors. 40+ years at the world’s highest security classification — from government and military systems to your business.',
      ctaPrimary: 'Talk to a consultant',
      ctaSecondary: 'See our security packages',
    },
    stats: [
      { value: '40+', label: 'years at the world’s highest security classification' },
      { value: '24/7', label: 'continuous monitoring and threat hunting' },
      { value: '100%', label: 'independent advisory' },
    ],
    trustStrip: [
      'Background',
      'Government assignments',
      'Military systems',
      'Critical infrastructure',
      'Confidentiality as standard',
    ],
    hotbild: {
      eyebrow: 'The threat has changed',
      titleLead: 'It is no longer a question ',
      titleEm: 'if',
      titleMiddle: ' someone tries — it is a question ',
      titleHighlight: 'when',
      titleEnd: '.',
      description:
        'State-sponsored actors are mapping European businesses right now — supply chains, employees and exposed systems. Whoever does not review themselves is already under review.',
      terminal: [
        'threat: state-sponsored actors',
        'vectors: supply chain · insider · AI',
        'exposure: mapping in progress',
        'status:',
      ],
      terminalActive: 'CONTINUOUS MONITORING ACTIVE',
    },
    services: {
      eyebrow: 'Services',
      title: 'Four ways we protect your business.',
      items: [
        {
          title: 'Continuous security review',
          text: 'External reviews that never pause — monthly, weekly or daily. We find what an attacker would find, and we tell you how to close it.',
        },
        {
          title: 'Internal security audit',
          text: 'In-depth hardening of your internal environment: permissions, logging and isolation. A thorough review adapted to your risk profile and requirements.',
        },
        {
          title: 'Security management',
          text: 'Strategic advisory for management and board — and a 24/7 security expert who trains your staff.',
        },
        {
          title: 'Proprietary AI analysis',
          text: 'Our in-house AI tools map threats, identify anomalies and close vulnerabilities in real time — before an attacker gets the chance to act.',
        },
      ],
    },
    background: {
      eyebrow: 'Four decades',
      title: '40 years at the world’s highest security classification.',
      paragraphs: [
        'Entropic Defence was founded on one insight: much of European security is reactive instead of preventive. We want to do the opposite and believe being proactive is the only way to get to real security.',
        'Our consultants come from the defence and intelligence community. We have protected government systems, military networks and critical national infrastructure — against the most skilled and patient adversaries there are.',
      ],
      points: [
        'Experience from defence, intelligence and government',
        'Confidentiality and security vetting in every engagement',
        'Independent — we sell no hardware and no software',
        'Continuity — the same team stays with you over time',
      ],
    },
    process: {
      eyebrow: 'How we work',
      title: 'From the first conversation to continuous security.',
      steps: [
        {
          title: 'Conversation',
          text: 'We understand your business, your systems and what actually needs protecting.',
        },
        {
          title: 'Mapping & Control',
          text: 'Threat picture, attack surface and external/internal reviews to identify your vulnerabilities.',
        },
        {
          title: 'Action',
          text: 'Our consultants stay and help your IT close the findings — no report left lying on a shelf.',
        },
        {
          title: 'Continuity',
          text: 'Security is not a project with an end date. We come back — and the system stays reviewed.',
        },
      ],
    },
    contact: {
      eyebrow: '24/7 · Direct answers',
      title: 'Talk to a consultant about the threat you face.',
      description:
        'The first conversation and an external security check are free and without obligation. Tell us about your business — we will tell you where you are vulnerable.',
      ctaMail: 'Email us directly',
      ctaSupport: 'Our packages',
    },
    papersCta: {
      text: 'Curious how we think? Read our papers on AI, physics and security.',
      cta: 'To Papers',
    },
  },

  // ── Checkout (package overview) ──────────────────────────────────────
  checkout: {
    hero: {
      eyebrow: 'Choose a package',
      titleLead: 'Security that is worth ',
      titleHighlight: 'every krona',
      titleEnd: '.',
      description:
        'Fixed prices for continuous reviews and internal audits — a quote where the engagement requires more. Open a package to see prices and levels.',
    },
    categories: [
      {
        name: 'Continuous security review',
        period: 'per month',
        description:
          'External reviews that never pause — monthly, weekly or daily. Reporting, remediation and dedicated consulting included.',
        features: [
          'Monthly, weekly or daily review',
          'Fixed price based on the number of exposed addresses',
          'Remediation of every finding',
          'Consulting 48h to 24/7',
        ],
      },
      {
        name: 'Internal security audit',
        period: 'per consultant hour',
        description:
          'The system secured from the inside, roughly once a year. Three levels — from standard security to military grade.',
        features: [
          'Three levels to match your needs',
          'Permissions, logging and isolation',
          'Systems that do not answer when probed',
          'AI tools deliver in 1/6 of the time',
        ],
      },
      {
        name: 'Security management',
        period: 'per engagement',
        description:
          'Strategic advisory for management and board — and a 24/7 security expert who trains your staff. The expert is coming soon.',
        features: [
          'Security strategy at management level',
          'Training for staff and board',
          'Support during incidents',
          '24/7 security expert — coming soon',
        ],
      },
    ],
    seePackages: 'See packages & prices',
    scrollHint: 'Scroll up to see the packages',
    form: {
      title: 'Tell us about your business.',
      description:
        'The more we know, the better the quote — especially for systems with more than 100 exposed addresses and for internal audits. Everything you send is handled under confidentiality.',
      bullets: [
        'Direct answers, every day',
        'First conversation free of charge',
        'Quote without obligation',
        'PGP available for sensitive communication',
      ],
    },
    options: {
      external: 'Continuous security review',
      internal: 'Internal security audit',
      leadership: 'Security management',
      unsure: 'Not sure — I need advice',
    },
  },

  // ── CheckoutExtern ───────────────────────────────────────────────────
  checkoutExtern: {
    hero: {
      eyebrow: 'Continuous security review',
      titleLead: 'A fixed price for security that ',
      titleHighlight: 'never pauses',
      titleEnd: '.',
      description:
        'External reviews that never pause — monthly, weekly or daily. Every package includes reporting, remediation and dedicated consulting that helps your IT staff close the findings.',
    },
    tierLabel: 'Number of exposed addresses',
    tierAria: 'Choose the number of exposed addresses',
    tiers: {
      small: {
        label: 'Under 20 exposed addresses',
        short: 'Under 20 addresses',
        note: 'A small system with fewer than 20 exposed addresses.',
      },
      medium: {
        label: '20–100 exposed addresses',
        short: '20–100 addresses',
        note: 'Medium-sized systems with several surfaces and integrations.',
      },
      large: {
        label: '100+ exposed addresses',
        short: '100+ addresses',
        note: 'Complex systems — priced after a needs analysis.',
      },
    },
    plans: {
      manad: {
        name: 'Monthly review',
        cadence: '1 external review per month',
        description:
          'The ongoing baseline: one complete external review every month, with recommended actions and dedicated consulting to close the findings.',
        features: [
          '1 external security review every month',
          'Written report with remediation per finding',
          '48 hours of consulting helping your IT carry out the actions',
          'Ongoing advisory for your IT staff',
        ],
      },
      vecka: {
        name: 'Weekly review',
        cadence: '1 external review per week',
        description:
          'For businesses that cannot afford to be vulnerable for more than a few days — more frequent reviews and dedicated consulting to close the issues.',
        features: [
          '1 external security review every week',
          'Written report with remediation per finding',
          'dedicated consulting to close the issues',
          'Priority handling of critical findings',
          'Quarterly review for the security management',
        ],
      },
      dag: {
        name: 'Daily review',
        cadence: '1 external review per day',
        consultant: '24/7 consulting · highest priority',
        description:
          'Used almost exclusively by defence and government. The attacker never gets more than a day — often less.',
        features: [
          '1 external security review every day',
          'Written report with remediation per finding',
          '24/7 consulting with the highest priority',
          'Tailored for defence, government and critical infrastructure',
          'Security vetting and confidentiality at the highest classification',
        ],
      },
    },
    requestQuote: 'Request a quote',
    bookCall: 'Book a call',
    largeNote: 'Systems with more than 100 exposed addresses are priced after a needs analysis',
    consult: {
      eyebrow: 'Included in every package',
      title: 'A consultant who stays — not just a report.',
      cards: [
        {
          title: 'Remediation per finding',
          text: 'Every report describes exactly what is wrong and how to fix it — prioritised by real risk.',
        },
        {
          title: '48 hours after every review',
          text: 'The Monthly review includes 48 hours of consulting that helps your IT carry out the actions.',
        },
        {
          title: '24/7 in the daily package',
          text: 'Daily review gives you consulting around the clock, with priority on critical findings.',
        },
      ],
    },
    form: {
      title: 'Book a call about your attack surface.',
      description:
        'Tell us how many exposed addresses and systems you have and we will confirm price and level. Systems with more than 100 exposed addresses require a short needs analysis first.',
      bullets: [
        'Direct answers, every day',
        'First conversation free of charge',
        'Quote without obligation',
        'PGP available for sensitive communication',
      ],
      options: {
        manad: 'Continuous security review — Monthly review',
        vecka: 'Continuous security review — Weekly review',
        dag: 'Continuous security review — Daily review',
        large: 'Systems with more than 100 exposed addresses — needs analysis',
      },
    },
  },

  // ── CheckoutIntern ───────────────────────────────────────────────────
  checkoutIntern: {
    hero: {
      eyebrow: 'Internal security audit',
      titleLead: 'Security from the inside — where ',
      titleHighlight: 'nobody else looks',
      titleEnd: '.',
      description:
        'External reviews see what an attacker sees. We go deeper: permissions, logging, isolation and everything that decides whether a breach stops at one computer — or spreads.',
    },
    rate: {
      eyebrow: 'Consulting',
      perHour: '/ hour',
      text: 'You pay for actual work — not for us learning your system on your time. Scope and hours are confirmed after a short needs analysis.',
    },
    levels: {
      vanlig: {
        name: 'Standard security',
        level: 'Level 1',
        tagline: 'Still higher than what any other provider delivers.',
        description:
          'A review from the inside of permissions, logging, segmentation and routines. Required by many auditors — and it closes doors an external review never sees.',
        features: [
          'Permission and role review',
          'Logging, alerting and traceability',
          'Routines for staff and suppliers',
          'Final report with a prioritised action plan',
        ],
      },
      hog: {
        name: 'High security',
        level: 'Level 2',
        tagline: 'Elevated security, where the inside trusts nobody — not even itself.',
        description:
          'Zero-trust architecture, segmented zones and secrets that never leave the hardware. For businesses with sensitive data and genuine assets to protect.',
        features: [
          'Zero-trust architecture and micro-segmentation',
          'Encryption key management and secret distribution',
          'Insider protection and anomaly detection',
          'Response plan for internal incidents',
        ],
      },
      militar: {
        name: 'Military grade',
        level: 'Level 3',
        tagline: 'The systems do not even show up when someone pings them.',
        description:
          'The highest internal level we deliver. The system exists, but returns no answer, no fingerprint and no regularity. Reserved for defence, government and critical infrastructure.',
        features: [
          'Hidden infrastructure — no answers when probed',
          'Deliberate noise against fingerprinting and timing analysis',
          'Physical and logical isolation of key material',
          'Continuous audit of the entire chain from the inside',
          'Security vetting at the highest classification',
        ],
      },
    },
    requestReview: 'Request an audit',
    rateNote: 'Billed per consultant hour',
    efficiency: {
      eyebrow: 'Efficiency',
      title: 'Where a human needs six hours, we need one.',
      paragraphFirst:
        'We work with proprietary AI tools throughout the audit. That makes complex engagements take roughly one sixth of the time compared with human security experts alone — without compromising on quality.',
      paragraphLead: 'The result is not just faster. It is ',
      paragraphHighlight: 'higher security',
      paragraphEnd: ' than a human can achieve on their own.',
      cards: [
        {
          title: '1/6 of the time',
          text: 'The AI tools analyse the system in parallel with the consultant — not afterwards.',
        },
        {
          title: 'Higher security',
          text: 'No fatigue, no shortcuts and nowhere to hide a finding.',
        },
        {
          title: 'Invisible result',
          text: 'At Military grade we leave behind a system that does not even answer when someone probes it.',
        },
      ],
    },
    form: {
      title: 'Tell us what needs protecting.',
      description:
        'The more sensitive the environment, the more we want to know before giving an estimate. Everything is handled under confidentiality and can be sent via PGP.',
      bullets: [
        'Needs analysis free of charge',
        'Estimate in consultant hours before work starts',
        'Work takes place on site or remotely',
        'Confidentiality and security vetting at the highest classification',
      ],
      options: {
        vanlig: 'Internal security audit — Standard security',
        hog: 'Internal security audit — High security',
        militar: 'Internal security audit — Military grade',
        unsure: 'Not sure — I need advice',
      },
    },
  },

  // ── CheckoutLedning ──────────────────────────────────────────────────
  checkoutLedning: {
    hero: {
      eyebrow: 'Security management',
      titleLead: 'Security management for those who ',
      titleHighlight: 'make the decisions',
      titleEnd: '.',
      description:
        'Security is a management responsibility. We help the board, the management team and the security officer make the right decisions — before something happens, not after.',
    },
    strategic: {
      title: 'Strategic security management',
      text: 'A senior security adviser in your management team. We develop the security strategy, train your staff and support you during incidents — under confidentiality at every level.',
      features: [
        'Security strategy at management level',
        'Training for staff and board',
        'Support during incidents',
        'Confidentiality at every level',
        'Can be combined with review and audit',
      ],
      requestQuote: 'Request a quote',
    },
    expert: {
      title: '24/7 security expert',
      text: 'A dedicated security expert — whom your whole organisation can ask at any time. No waiting, no ticket queue, no question too small.',
      price: 'Coming soon',
      period: 'subscription',
      features: [
        'Answers around the clock, every day',
        'Available to everyone in the organisation',
        'Trains your staff continuously',
        'Escalates to a specialist during a live incident',
      ],
      notifyMe: 'Notify me',
      note: 'Leave your email in the form — you will be the first to know.',
    },
    expertVatNote: 'The 24/7 security expert is under development and will be priced at launch',
    form: {
      title: 'Talk security at management level.',
      description:
        'We speak the language of management, not only of technology. Tell us about your organisation and your challenges — we will suggest an approach and come back with a quote.',
      bullets: [
        'The first conversation is always free of charge',
        'We speak the language of management, not only of technology',
        'Confidentiality at every level',
        'Can be combined with review and audit',
      ],
      options: {
        strategy: 'Security management — strategic advisory',
        training: 'Security management — training for staff',
        expert: '24/7 security expert — notify me at launch',
      },
    },
  },

  // ── Success ──────────────────────────────────────────────────────────
  success: {
    eyebrow: 'Request received',
    titleLead: 'Thank you — we will get back to you ',
    titleHighlight: 'within 10 minutes',
    titleEnd: '.',
    description:
      'Your request has been registered. A security consultant will read through it and contact you at the work email provided, with the next steps and an initial quote.',
    panelTitle: 'Everything has been received.',
    panelText:
      'Want to share sensitive information already? Ask for our PGP key in the confirmation email — or email us directly.',
    ctaHome: 'Back to the home page',
    ctaPapers: 'Read our papers',
  },

  // ── Business Profile ─────────────────────────────────────────────────
  businessProfile: {
    hero: {
      eyebrow: 'Business Profile',
      titleLead: 'Your company ',
      titleHighlight: 'security account',
      titleEnd: '.',
      description:
        'Manage subscription, report recipients and account. Full functionality is activated when the portal launches in phase B.',
    },
    account: 'Account',
    company: 'Company',
    orgNumber: 'Company registration number',
    contactPerson: 'Contact person',
    email: 'Email',
    subscription: 'Subscription',
    subscriptionName: 'Continuous security',
    nextInvoice: 'Next invoice: —',
    managePayment: 'Manage payment',
    upgradePackage: 'Upgrade package',
    pgpRecipients: 'Report recipients (PGP)',
    pgpText:
      'Security reports are delivered encrypted to your IT manager. Add recipients and PGP keys when the portal launches.',
    itResponsible: 'IT manager',
    pgpKey: 'PGP key',
    noKeyAdded: 'No key added',
    addRecipient: 'Add recipient',
    accountActions: 'Account actions',
    pauseSubscription: 'Pause subscription',
    deleteAccount: 'Delete account',
    logout: 'Sign out',
    phaseBNote: 'Activated with sign-in in phase B (secure authentication via email).',
  },

  // ── Papers ───────────────────────────────────────────────────────────
  papers: {
    hero: {
      eyebrow: 'Papers',
      titleLead: 'Thoughts and research ',
      titleHighlight: 'worth reading',
      titleEnd: '.',
      description:
        'Research papers, hypotheses and essays on AI, theoretical physics, philosophy and security. For clients, researchers and the curious.',
    },
    coming: 'Upcoming',
    publishedSoon: 'Published shortly',
    categories: [
      {
        title: 'Artificial intelligence',
        text: 'Security implications of AI systems, reasoning models and autonomy.',
        papers: [
          { title: 'When the model thinks for itself — autonomous hackers' },
          { title: 'AI as an attack surface: prompts, data and supply chain' },
        ],
      },
      {
        title: 'Theoretical physics',
        text: 'Entropy, information and time — fundamental research that shapes how we think about security.',
        papers: [
          {
            title:
              'Entropy as a measure of intelligence: why harmony is a more efficient energy state',
          },
          { title: 'Time, observation and vulnerability — a physical perspective' },
        ],
      },
      {
        title: 'Philosophy',
        text: 'Ethics, freedom and responsibility in a world of surveillance and adversaries.',
        papers: [
          { title: 'Defending the open society with closed means' },
          { title: 'Trust is a vulnerability — and our most important resource' },
        ],
      },
      {
        title: 'Security research',
        text: 'Methods, adversaries and lessons from four decades in the field.',
        papers: [
          { title: 'The patience of foreign actors: long campaigns against Swedish targets' },
          { title: 'Continuous security — why one-off reviews are not enough' },
        ],
      },
    ],
    newsletter: {
      title: 'Get new papers first.',
      text: 'Subscribe to our newsletter — at most one email a month, encrypted if you prefer, and always one click to unsubscribe.',
      emailLabel: 'Email address',
      emailPlaceholder: 'work@company.com',
      subscribe: 'Subscribe',
    },
  },

  // ── Legal ────────────────────────────────────────────────────────────
  legal: {
    hero: {
      eyebrow: 'Legal',
      titleLead: 'Legal, ',
      titleHighlight: 'clear and short',
      titleEnd: '.',
      description:
        'Privacy policy, terms of use and cookie information. Written to be read — not to be buried.',
    },
    updatedPrefix: 'Last updated: 2026-09-13',
    sections: [
      {
        title: 'Privacy policy',
        body: [
          'Entropic Defence AB ("we", "us") cares about your privacy. This policy describes how we process personal data when you visit entropicdefence.com, contact us or engage our services.',
          'We collect the information you provide yourself: name, company, registration number, email and what you write in contact forms. We use the information solely to answer enquiries, provide quotes and perform agreements.',
          'We never sell your information and share it only with the suppliers required to run the service (for example hosting), under agreements that protect your information. Information is deleted when it is no longer needed, and at the latest in accordance with applicable accounting and security legislation.',
          'Legal basis: legitimate interest and/or contract. You have the right to request a register extract, rectification, erasure and data portability. Contact us at support@entropicdefence.com.',
        ],
      },
      {
        title: 'Terms of use',
        body: [
          'The content on entropicdefence.com is provided for information purposes. We strive for accuracy but give no guarantee that the content is always complete or current.',
          'All texts, graphics and trademarks belong to Entropic Defence AB unless otherwise stated. Content may not be copied, distributed or used commercially without written permission.',
          'Services described on the website are always governed by a separate written agreement. Nothing on the website constitutes a binding offer.',
          'For security-related questions about our systems, see our Advisories & Disclosures page.',
        ],
      },
      {
        title: 'Cookies',
        body: [
          'We use no tracking cookies and no third-party advertising. The only cookies that may occur are necessary session cookies so that the website works technically.',
          'If we introduce optional analytics cookies in the future, we will ask for your consent first, in accordance with the Swedish Electronic Communications Act.',
          'You can always block or delete cookies in your browser settings. The website works fully without them.',
        ],
      },
    ],
    questions: 'Questions about legal matters or data protection?',
  },

  // ── Support & FAQ ────────────────────────────────────────────────────
  support: {
    hero: {
      eyebrow: 'Support & FAQ',
      titleLead: 'Help when you need it — ',
      titleHighlight: 'around the clock',
      titleEnd: '.',
      description:
        'Choose whether to contact our duty desk directly or find answers in the frequently asked questions below. For urgent incidents, mark the subject line with INCIDENT.',
    },
    duty: {
      title: 'Talk to our duty desk',
      text: 'Our duty desk answers around the clock. Routine questions get direct answers and incidents are handled discreetly.',
      badge: 'Online · 24/7',
    },
    faqTitle: 'Frequently asked questions',
    faqs: [
      {
        q: 'What does "continuous security" mean?',
        a: 'That security is not a project with an end date, but an ongoing process: monitoring, threat hunting, supplier review and recurring reviews — around the clock, all year round.',
      },
      {
        q: 'Do you really answer 24/7?',
        a: 'Yes, our duty desk is staffed around the clock, every day of the year.',
      },
      {
        q: 'How are security reports delivered?',
        a: 'Encrypted with PGP to the report recipients you specify — usually the IT manager or the security officer. You decide the recipients and the keys.',
      },
      {
        q: 'Are you independent?',
        a: 'Yes. We sell no hardware or software and take no commission from suppliers. Our only revenue is the advisory work — our only loyalty is your protection.',
      },
      {
        q: 'What does it cost?',
        a: 'Every business is unique, so we always quote individually. For smaller systems with fewer exposed addresses we have fixed prices — see our packages under "Choose a package". The first conversation is free of charge and without obligation.',
      },
      {
        q: 'Do you work under confidentiality?',
        a: 'Absolute confidentiality is standard in every engagement, whatever its size. We are happy to sign a separate non-disclosure agreement before the first meeting. Our consultants are thoroughly vetted.',
      },
    ],
    contactTitle: 'Contact us',
    contactText: 'Email us directly — our duty desk answers around the clock.',
    sentTitle: 'The message has been sent.',
    sentText: 'You will get a direct answer. For urgent matters, mark the email with INCIDENT.',
    form: {
      name: 'Name *',
      namePlaceholder: 'First and last name',
      email: 'Email *',
      emailPlaceholder: 'name@company.com',
      subject: 'Subject *',
      subjectPlaceholder: 'Choose a subject…',
      subjectOptions: {
        serviceQuestion: 'Question about our services',
        ongoingSupport: 'Support for an ongoing engagement',
        incident: 'Incident (urgent matters)',
        other: 'Other',
      },
      message: 'Message *',
      messagePlaceholder: 'How can we help you?',
      send: 'Send message',
    },
  },

  // ── Advisories & Disclosures ─────────────────────────────────────────
  advisories: {
    hero: {
      eyebrow: 'Advisories & Disclosures',
      titleLead: 'Coordinated ',
      titleHighlight: 'vulnerability disclosure',
      titleEnd: '.',
      description:
        'Have you found a vulnerability in our systems or services? We take it seriously — and we promise to handle it professionally and quickly.',
    },
    report: 'Report',
    reportText: 'Email the details to us. Please use our PGP key for sensitive findings.',
    pgpKey: 'PGP key',
    pgpText: 'Published shortly. Contact us and we will send you the key directly.',
    fingerprint: 'Fingerprint: —',
    promise: 'Our promise',
    promiseText:
      'Acknowledgement within 72 hours. Coordinated publication. No legal action against anyone who reports in good faith.',
    activeTitle: 'Active advisories',
    activeText:
      'No public security advisories right now. Once a vulnerability has been remediated and coordinated, we publish a technical summary here.',
  },

  // ── Security status ──────────────────────────────────────────────────
  status: {
    hero: {
      eyebrow: 'Security status',
      titleLead: 'Follow your review ',
      titleHighlight: 'step by step',
      titleEnd: '.',
      description:
        'Here you see exactly where in the process your security review stands. Updates and reports reach you by email — to your IT manager, responsible manager or security officer.',
    },
    assignment: 'Engagement ED-2026-014',
    assignmentTitle: 'Continuous security — sample client',
    progress: 'In progress · 40%',
    stages: [
      { title: 'Intake and planning', text: 'Mapping of systems, objectives and timeline.' },
      {
        title: 'Technical review',
        text: 'Penetration testing and vulnerability analysis of infrastructure and applications.',
      },
      { title: 'Human review', text: 'Interviews, routines and awareness among your staff.' },
      { title: 'Supplier review', text: 'Review of supply chain and third-party dependencies.' },
      { title: 'Report and action plan', text: 'Final report encrypted with PGP to the recipients you designate.' },
    ],
    pgpDelivery: 'PGP delivery',
    pgpDeliveryText:
      'Final reports and ongoing updates are sent to the email addresses you designate — IT manager, responsible manager or security officer. If you prefer PGP encryption, we agree on a key over a secure channel. No accounts needed.',
    manageRecipients: 'Email us about recipients',
  },

  // ── 404 ──────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: 'Error code 404',
    title: 'Signal lost.',
    description:
      'The page you are looking for does not exist — or has been moved to a safer place. The field leads you back.',
    ctaHome: 'Back to the home page',
    ctaSupport: 'Contact support',
  },
}
