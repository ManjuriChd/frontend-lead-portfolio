const de = {
  hero: {
    eyebrow: 'Frontend-Architekt · UI Lead',
    title: 'Mein beruflicher Werdegang im Überblick',
    intro:
      'Eine kurze Einführung in mein Profil und meine beruflichen Ziele. Frontend-Architekt und UI Lead mit über 10 Jahren Erfahrung in Luftfahrt, Telekommunikation und Health-Tech – mit Fokus auf zugängliche, performante und skalierbare Weboberflächen.',
    ctaPrimary: 'Loslegen',
    ctaSecondary: 'Brauchen Sie Hilfe? Kontakt',
    ctaResume: 'Lebenslauf herunterladen'
  },
  nav: {
    experience: 'Erfahrung',
    projects: 'Portfolio',
    expertise: 'Technische Expertise',
    certifications: 'Zertifizierungen',
    contact: 'Kontakt'
  },
  sections: {
    experienceTitle: 'Erfahrung',
    experienceSubtitle:
      'Frontend-Architekt-Denken mit UI-Lead-Umsetzung – messbar in Geschwindigkeit, Qualität und Wirkung.',
    portfolioTitle: 'Portfolio',
    portfolioSubtitle:
      'Problem → Lösung → Impact. Eine kuratierte Auswahl von Projekten aus Enterprise- und Produktteams.',
    expertiseTitle: 'Technische Expertise',
    expertiseSubtitle:
      'Fachkompetenzen, abgestimmt auf die Rolle als Frontend-Architekt und UI Lead in Enterprise-Umgebungen.',
    certificationsTitle: 'Zertifizierungen',
    certificationsSubtitle:
      'Kontinuierliches Lernen in Frontend, UI/UX, Versionsverwaltung und KI-gestützter Entwicklung.',
    contactTitle: 'Lassen Sie uns Ihr Projekt besprechen',
    contactSubtitle:
      'Offen für Positionen als Frontend-Architekt, UI Lead oder Senior UI Leadership.'
  },
  expertisePanels: [
    {
      title: 'Frontend-Entwicklung',
      items: [
        'Vue, React, Angular, TypeScript, JavaScript (ES6+)',
        'HTML5, CSS3, LESS, SASS, Tailwind, Bootstrap',
        'Responsives, mobile-first Design und Cross-Browser-Kompatibilität'
      ]
    },
    {
      title: 'Designsysteme',
      items: [
        'Skalierbare Komponentenbibliotheken und Styleguides',
        'Storybook für Isolation, Wiederverwendbarkeit und Dokumentation',
        'Konsistente UX-Patterns und schnelles Onboarding von Entwickler:innen'
      ]
    },
    {
      title: 'Architektur & Delivery',
      items: [
        'RESTful-Integrationen; Erfahrung mit GraphQL',
        'OAuth 2.0 und RBAC für sicheren Zugriff',
        'Performance-Optimierung und Qualitätspraktiken (WCAG, Tests)',
        'Agile/Scrum-Moderation und enge Stakeholder-Zusammenarbeit'
      ]
    }
  ]
} as const;

export default de;

