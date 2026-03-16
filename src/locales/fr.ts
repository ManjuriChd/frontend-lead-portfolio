const fr = {
  hero: {
    eyebrow: 'Architecte Frontend · UI Lead',
    title: 'Un parcours professionnel au service de vos projets',
    intro:
      "Brève présentation de mon profil et de mes objectifs professionnels. Architecte Frontend et UI Lead avec plus de 10 ans d’expérience dans l’aéronautique, les télécommunications et la santé, je conçois des interfaces accessibles, performantes et évolutives.",
    ctaPrimary: 'Commencer',
    ctaSecondary: 'Besoin d’aide ? Contactez-moi',
    ctaResume: 'Télécharger le CV'
  },
  nav: {
    experience: 'Expérience',
    projects: 'Portfolio',
    expertise: 'Expertise technique',
    certifications: 'Certifications',
    contact: 'Contact'
  },
  sections: {
    experienceTitle: 'Expérience',
    experienceSubtitle:
      'Un esprit d’architecte frontend avec une exécution de UI Lead, mesurée par la vélocité, la qualité et l’impact.',
    portfolioTitle: 'Portfolio',
    portfolioSubtitle:
      'Problème → Solution → Impact. Une sélection de réalisations dans des contextes produits et entreprise.',
    expertiseTitle: 'Expertise technique',
    expertiseSubtitle:
      'Compétences alignées sur les responsabilités d’Architecte Frontend et de UI Lead dans des environnements d’entreprise.',
    certificationsTitle: 'Certifications',
    certificationsSubtitle:
      'Apprentissage continu en frontend, UI/UX, gestion de versions et ingénierie assistée par l’IA.',
    contactTitle: 'Discutons de votre projet',
    contactSubtitle:
      'Ouvert aux opportunités en tant qu’Architecte Frontend, UI Lead ou responsable senior UI.'
  },
  expertisePanels: [
    {
      title: 'Ingénierie Frontend',
      items: [
        'Vue, React, Angular, TypeScript, JavaScript (ES6+)',
        'HTML5, CSS3, LESS, SASS, Tailwind, Bootstrap',
        'Design responsive, mobile-first et compatibilité multi-navigateurs'
      ]
    },
    {
      title: 'Design Systems',
      items: [
        'Bibliothèques de composants et guides de styles évolutifs',
        'Storybook pour l’isolation, la réutilisabilité et la documentation',
        'Patrons UX cohérents et onboarding des développeurs'
      ]
    },
    {
      title: 'Architecture & Delivery',
      items: [
        'Intégrations RESTful; exposition à GraphQL',
        'OAuth 2.0 et RBAC pour un accès sécurisé',
        'Optimisation des performances et qualité (WCAG, tests)',
        'Animation Agile/Scrum et collaboration avec les parties prenantes'
      ]
    }
  ]
} as const;

export default fr;

