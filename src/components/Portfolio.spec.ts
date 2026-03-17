import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Portfolio from './Portfolio.vue';

describe('Portfolio.vue', () => {
  const mockMatchMedia = (matches = false) =>
    vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn()
    }));

  beforeEach(() => {
    vi.clearAllMocks();
    const getItem = vi.fn().mockReturnValue(null);
    const setItem = vi.fn();
    Object.defineProperty(window, 'localStorage', {
      value: { getItem, setItem, removeItem: vi.fn(), clear: vi.fn(), length: 0, key: vi.fn() },
      writable: true
    });
    window.matchMedia = mockMatchMedia(false);
  });

  describe('rendering', () => {
    it('renders the component', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.exists()).toBe(true);
    });

    it('renders skip to content link', () => {
      const wrapper = mount(Portfolio);
      const skipLink = wrapper.find('a[href="#content"]');
      expect(skipLink.exists()).toBe(true);
      expect(skipLink.text()).toContain('Skip to content');
    });

    it('renders header with name', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Manjuri Choudhury');
    });

    it('renders main content with id content', () => {
      const wrapper = mount(Portfolio);
      const main = wrapper.find('main#content');
      expect(main.exists()).toBe(true);
    });
  });

  describe('hero section', () => {
    it('renders hero section with default locale content', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Strategic UI Lead');
      expect(wrapper.text()).toContain('Explore Portfolio');
      expect(wrapper.text()).toContain('Contact');
      expect(wrapper.text()).toContain('Download resume');
    });

    it('renders hero CTAs with correct hrefs', () => {
      const wrapper = mount(Portfolio);
      const projectsLink = wrapper.find('a[href="#projects"]');
      const contactLink = wrapper.find('a[href="#contact"]');
      expect(projectsLink.exists()).toBe(true);
      expect(contactLink.exists()).toBe(true);
    });

    it('renders resume link pointing to PDF', () => {
      const wrapper = mount(Portfolio);
      const resumeLink = wrapper.find('a[href="/Manjuri_profile.pdf"]');
      expect(resumeLink.exists()).toBe(true);
      expect(resumeLink.attributes('target')).toBe('_blank');
      expect(resumeLink.attributes('rel')).toBe('noreferrer');
    });

    it('renders hero image with expected src and alt', () => {
      const wrapper = mount(Portfolio);
      const img = wrapper.find('img[alt*="Manjuri"]');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe('/my_photo_1.jpg');
    });

    it('renders metrics strip with expected labels', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Team led');
      expect(wrapper.text()).toContain('20+ engineers');
      expect(wrapper.text()).toContain('Productivity lift');
      expect(wrapper.text()).toContain('30%');
    });
  });

  describe('navigation', () => {
    it('renders all nav links', () => {
      const wrapper = mount(Portfolio);
      const navLinks = wrapper.findAll('nav[aria-label="Primary"] a');
      expect(navLinks.length).toBe(5);
    });

    it('renders nav link labels in default locale', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Experience');
      expect(wrapper.text()).toContain('Portfolio');
      expect(wrapper.text()).toContain('Technical expertise');
      expect(wrapper.text()).toContain('Certifications');
      expect(wrapper.text()).toContain('Contact');
    });

    it('sets activeSection when nav link is clicked', async () => {
      const wrapper = mount(Portfolio);
      const projectsLink = wrapper.findAll('nav[aria-label="Primary"] a')[1];
      await projectsLink.trigger('click');
      expect(projectsLink.attributes('aria-current')).toBe('page');
    });

    it('has correct section hrefs', () => {
      const wrapper = mount(Portfolio);
      const hrefs = wrapper.findAll('nav[aria-label="Primary"] a').map((a) => a.attributes('href'));
      expect(hrefs).toContain('#experience');
      expect(hrefs).toContain('#projects');
      expect(hrefs).toContain('#expertise');
      expect(hrefs).toContain('#certifications');
      expect(hrefs).toContain('#contact');
    });
  });

  describe('theme toggle', () => {
    it('renders theme toggle button', () => {
      const wrapper = mount(Portfolio);
      const themeBtn = wrapper.find('button[aria-label*="Switch to"]');
      expect(themeBtn.exists()).toBe(true);
    });

    it('toggles theme on button click', async () => {
      const wrapper = mount(Portfolio);
      const themeBtn = wrapper.find('button[aria-label*="Switch to"]');
      expect(themeBtn.attributes('aria-label')).toContain('dark');
      await themeBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(themeBtn.attributes('aria-label')).toContain('light');
      await themeBtn.trigger('click');
      await wrapper.vm.$nextTick();
      expect(themeBtn.attributes('aria-label')).toContain('dark');
    });

    it('applies dark class to root when dark mode', async () => {
      const wrapper = mount(Portfolio);
      const themeBtn = wrapper.find('button[aria-label*="Switch to"]');
      await themeBtn.trigger('click');
      await wrapper.vm.$nextTick();
      const root = wrapper.find('.min-h-screen').element;
      expect(root.classList.contains('dark')).toBe(true);
    });

    it('persists theme to localStorage on toggle', async () => {
      const setItem = vi.fn();
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn().mockReturnValue(null),
          setItem,
          removeItem: vi.fn(),
          clear: vi.fn(),
          length: 0,
          key: vi.fn()
        },
        writable: true
      });
      const wrapper = mount(Portfolio);
      const themeBtn = wrapper.find('button[aria-label*="Switch to"]');
      await themeBtn.trigger('click');
      expect(setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
    });
  });

  describe('language switcher', () => {
    it('renders language select with en, fr, de options', () => {
      const wrapper = mount(Portfolio);
      const select = wrapper.find('#lang-select');
      expect(select.exists()).toBe(true);
      const options = select.findAll('option');
      expect(options.length).toBe(3);
      expect(options.map((o) => o.element.value)).toEqual(['en', 'fr', 'de']);
    });

    it('updates hero text when locale is changed to French', async () => {
      const wrapper = mount(Portfolio);
      const select = wrapper.find('#lang-select');
      await select.setValue('fr');
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toMatch(/Parcours|Portfolio|Contact|Télécharger/);
    });

    it('updates hero text when locale is changed to German', async () => {
      const wrapper = mount(Portfolio);
      const select = wrapper.find('#lang-select');
      await select.setValue('de');
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toMatch(/Erfahrung|Portfolio|Kontakt|Lebenslauf/);
    });
  });

  describe('mobile menu', () => {
    it('renders hamburger button with aria attributes', () => {
      const wrapper = mount(Portfolio);
      const hamburger = wrapper.find('button[aria-controls="mobile-menu"]');
      expect(hamburger.exists()).toBe(true);
      expect(hamburger.attributes('aria-label')).toContain('Open menu');
    });

    it('toggles mobile menu on hamburger click', async () => {
      const wrapper = mount(Portfolio);
      const hamburger = wrapper.find('button[aria-controls="mobile-menu"]');
      const mobileMenu = wrapper.find('#mobile-menu');
      expect(mobileMenu.classes()).toContain('max-h-0');
      await hamburger.trigger('click');
      await wrapper.vm.$nextTick();
      expect(mobileMenu.classes()).toContain('max-h-64');
      await hamburger.trigger('click');
      await wrapper.vm.$nextTick();
      expect(mobileMenu.classes()).toContain('max-h-0');
    });

    it('closes mobile menu when a nav link is clicked', async () => {
      const wrapper = mount(Portfolio);
      const hamburger = wrapper.find('button[aria-controls="mobile-menu"]');
      await hamburger.trigger('click');
      await wrapper.vm.$nextTick();
      const mobileNavLinks = wrapper.findAll('#mobile-menu a');
      await mobileNavLinks[0].trigger('click');
      await wrapper.vm.$nextTick();
      const mobileMenu = wrapper.find('#mobile-menu');
      expect(mobileMenu.classes()).toContain('max-h-0');
    });
  });

  describe('experience section', () => {
    it('renders experience section with title', () => {
      const wrapper = mount(Portfolio);
      const section = wrapper.find('#experience');
      expect(section.exists()).toBe(true);
      expect(section.text()).toContain('Experience');
    });

    it('renders experience cards for all roles', () => {
      const wrapper = mount(Portfolio);
      const articles = wrapper.find('#experience').findAll('article');
      expect(articles.length).toBe(4);
    });

    it('renders GE Aerospace and Cognizant roles', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('GE Aerospace');
      expect(wrapper.text()).toContain('Sr Software Engineer — UI Lead');
      expect(wrapper.text()).toContain('Cognizant');
      expect(wrapper.text()).toContain('Software Engineer');
    });
  });

  describe('projects section', () => {
    it('renders projects section with id projects', () => {
      const wrapper = mount(Portfolio);
      const section = wrapper.find('#projects');
      expect(section.exists()).toBe(true);
      expect(section.text()).toContain('Portfolio');
    });

    it('renders project cards', () => {
      const wrapper = mount(Portfolio);
      const articles = wrapper.find('#projects').findAll('article');
      expect(articles.length).toBe(4);
    });

    it('renders 1Fleet Asset and Stock Management project titles', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('1Fleet Asset (1FA)');
      expect(wrapper.text()).toContain('Stock Management System');
    });
  });

  describe('expertise section', () => {
    it('renders expertise section with id expertise', () => {
      const wrapper = mount(Portfolio);
      const section = wrapper.find('#expertise');
      expect(section.exists()).toBe(true);
      expect(section.text()).toContain('Technical expertise');
    });

    it('renders expertise panels', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Frontend Engineering');
      expect(wrapper.text()).toContain('Get in touch');
    });
  });

  describe('certifications section', () => {
    it('renders certifications section with id certifications', () => {
      const wrapper = mount(Portfolio);
      const section = wrapper.find('#certifications');
      expect(section.exists()).toBe(true);
      expect(section.text()).toContain('Certifications');
    });

    it('renders certification tags', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('Meta Frontend Developer');
      expect(wrapper.text()).toContain('UI/UX');
      expect(wrapper.text()).toContain('Version Control');
    });
  });

  describe('contact section', () => {
    it('renders contact section with id contact', () => {
      const wrapper = mount(Portfolio);
      const section = wrapper.find('#contact');
      expect(section.exists()).toBe(true);
      expect(section.text()).toMatch(/discuss.*project|Let'?s discuss/i);
    });

    it('renders contact email and phone', () => {
      const wrapper = mount(Portfolio);
      expect(wrapper.text()).toContain('manjuri.chd@gmail.com');
      expect(wrapper.text()).toContain('+91-9508622290');
      expect(wrapper.text()).toContain('Bangalore, India');
    });

    it('renders LinkedIn link with correct href', () => {
      const wrapper = mount(Portfolio);
      const linkedInLink = wrapper.find('a[href="https://www.linkedin.com/in/manjurichd/"]');
      expect(linkedInLink.exists()).toBe(true);
      expect(linkedInLink.attributes('target')).toBe('_blank');
      expect(linkedInLink.attributes('rel')).toBe('noreferrer');
    });
  });

  describe('footer', () => {
    it('renders footer with current year', () => {
      const wrapper = mount(Portfolio);
      const footer = wrapper.find('footer');
      expect(footer.exists()).toBe(true);
      const year = new Date().getFullYear();
      expect(footer.text()).toContain(String(year));
      expect(footer.text()).toContain('Manjuri Choudhury');
    });
  });

  describe('hero image error state', () => {
    it('shows fallback message when hero image fails', async () => {
      const wrapper = mount(Portfolio);
      const img = wrapper.find('img[alt*="Manjuri"]');
      await img.trigger('error');
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain('Add my_photo_1.jpg to public/');
    });
  });
});
