<template>
  <!-- Wrapper must have .dark so descendants can use dark: variants (Tailwind requires .dark on an ancestor) -->
  <div :class="{ dark: isDark }" class="min-h-screen">
    <div
      class="min-h-screen transition-colors"
      :style="{
        backgroundColor: isDark ? '#081738' : '#e2e2e2',
        color: isDark ? '#f9fafb' : '#020617'
      }"
    >
    <a
      href="#content"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-slate-900 focus:px-3 focus:py-2 focus:text-white focus:ring-2 focus:ring-blue-500 dark:bg-white dark:focus:text-slate-900"
    >
      Skip to content
    </a>

    <!-- Header: Venus-style with theme toggle + hamburger menu -->
    <header
      class="sticky top-0 z-50 border-b-0 text-slate-900 bg-white shadow-lg shadow-slate-300/70 transition-colors duration-500 dark:bg-slate-900 dark:text-blue-100"
      :style="{
        // Even more prominent, soothing shadow for light mode.
        boxShadow: isDark
          ? '0 8px 32px 0 rgba(32,42,68,0.14)'
          : '0 10px 36px -6px rgba(160,180,210,0.18), 0 2px 8px 0 rgba(50, 50, 80, 0.04)',
        backgroundColor: isDark
          ? undefined
          : 'rgb(255 255 255 / var(--tw-bg-opacity, 1))'
      }"
    >
      <Disclosure v-slot="{ open, close }" as="div">
        <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <a
            href="#"
            class="text-2xl font-bold tracking-tighter text-slate-600 dark:text-slate-200 shadow-lg px-2 py-1 rounded bg-white/80 dark:bg-slate-900/70"
            style="box-shadow: 0 4px 20px 0 rgba(130,140,180,0.17);"
          >
            Manjuri Choudhury
          </a>
          <div class="flex items-center gap-2">
          <!-- Desktop nav -->
          <nav
            aria-label="Primary"
            class="hidden items-center gap-1 sm:flex sm:gap-2"
          >
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :aria-current="activeSection === link.href ? 'page' : undefined"
              :class="[
                'rounded-md px-4 py-2 text-base font-semibold transition focus:outline-none shadow-sm',
                activeSection === link.href
                  // Active: use same background color as hover in light mode
                  ? 'text-slate-900 bg-slate-300/80 dark:bg-slate-100 dark:text-slate-900 shadow-xl'
                  : 'text-slate-700 hover:bg-slate-300/80 hover:text-slate-900 dark:text-blue-100 dark:hover:bg-slate-700 dark:hover:text-white'
              ]"
              @click="activeSection = link.href"
              style="outline: none; box-shadow: none;"
            >
              {{ t.nav[link.key] }}
            </a>
          </nav>
          <!-- Theme toggle -->
          <button
            type="button"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            class="rounded-full p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none dark:text-blue-100 dark:hover:bg-slate-700 dark:hover:text-white"
            @click="toggleTheme"
          >
            <span v-if="isDark" class="block h-5 w-5" aria-hidden="true">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span v-else class="block h-5 w-5" aria-hidden="true">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </span>
          </button>
          <!-- Language switcher -->
          <label class="sr-only" for="lang-select">Select language</label>
          <select
            id="lang-select"
            v-model="currentLocale"
            class="hidden rounded-md border border-slate-300 bg-slate-100 px-2 py-1 text-xs text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200/60 dark:border-slate-600 dark:bg-slate-700 dark:text-blue-100 sm:block"
          >
            <option value="en">EN</option>
            <option value="fr">FR</option>
            <option value="de">DE</option>
          </select>
          <!-- Hamburger button: visible only on mobile -->
            <DisclosureButton
              class="rounded-full p-2 sm:hidden text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-200/60"
              :aria-label="open ? 'Close menu' : 'Open menu'"
              :aria-expanded="open"
              aria-controls="mobile-menu"
            >
              <span v-if="!open" class="block h-5 w-5" aria-hidden="true">
                <svg class="text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span v-else class="block h-5 w-5" aria-hidden="true">
                <svg class="text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </DisclosureButton>
          </div>
        </div>
        <!-- Mobile menu (Headless UI disclosure panel) -->
        <DisclosurePanel
          as="div"
          id="mobile-menu"
          static
          class="overflow-hidden transition-all duration-200 ease-out sm:hidden"
          :class="open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
          role="region"
          aria-label="Mobile navigation"
        >
          <nav
            class="border-t border-slate-200 px-4 py-3 bg-gradient-to-tr from-slate-200 via-slate-100 to-blue-50 dark:from-slate-900 dark:to-slate-700"
            aria-label="Primary mobile"
          >
            <a
              v-for="link in navLinks"
              :key="link.href"
              :href="link.href"
              :aria-current="activeSection === link.href ? 'page' : undefined"
              :class="[
                'block rounded-md px-3 py-2.5 text-base font-medium transition shadow hover:shadow-lg',
                activeSection === link.href
                      // Active mobile: same bg as hover in light mode
                      ? 'bg-slate-300/80 text-slate-900 dark:bg-slate-100 dark:text-slate-900 shadow-xl'
                  : 'text-slate-700 hover:bg-slate-300/80 hover:text-slate-900 dark:text-blue-100 dark:hover:bg-slate-700 dark:hover:text-white'
              ]"
              @click="handleMobileNavClick(link.href, close)"
            >
              {{ t.nav[link.key] }}
            </a>
          </nav>
        </DisclosurePanel>
      </Disclosure>
    </header>

    <main id="content">
      <!-- Hero: Venus-style two-column (content + photo) -->
      <section
        aria-label="Hero"
        class="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50"
      >
        <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
          <div class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div class="order-2 lg:order-1">
              <p
                class="text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400"
              >
                {{ t.hero.eyebrow }}
              </p>
              <h1
                class="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
              >
                {{ t.hero.title }}
              </h1>
              <p
                class="mt-4 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-300"
              >
                {{ t.hero.intro }}
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  class="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus:ring-white dark:focus:ring-offset-slate-900"
                >
                  {{ t.hero.ctaPrimary }}
                </a>
                <a
                  href="#contact"
                  class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:border-slate-600 dark:bg-transparent dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
                >
                  {{ t.hero.ctaSecondary }}
                </a>
                <a
                  href="/Manjuri_profile.pdf"
                  target="_blank"
                  rel="noreferrer"
                  class="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:ring-slate-500"
                >
                  {{ t.hero.ctaResume }}
                </a>
              </div>
            </div>
            <div class="order-1 flex justify-center lg:order-2">
              <div
                class="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-slate-200 shadow-xl dark:bg-slate-700"
              >
                <img
                  :src="heroImageSrc"
                  :alt="heroImageAlt"
                  class="h-full w-full object-cover object-center"
                  @error="heroImageError = true"
                />
                <div
                  v-if="heroImageError"
                  class="absolute inset-0 flex items-center justify-center bg-slate-300 text-slate-500 dark:bg-slate-600 dark:text-slate-400"
                >
                  <span class="text-sm">Add my_photo_1.jpg to public/</span>
                </div>
              </div>
            </div>
          </div>
          <!-- Stats strip -->
          <dl
            class="mt-12 grid grid-cols-2 gap-6 border-t border-slate-200 pt-10 dark:border-slate-700 sm:grid-cols-4"
          >
            <div
              v-for="m in metrics"
              :key="m.label"
              class="text-center sm:text-left"
            >
              <dt
                class="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400"
              >
                {{ m.label }}
              </dt>
              <dd
                class="mt-1 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
              >
                {{ m.value }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- Experience: blog-style cards -->
      <section
        id="experience"
        class="scroll-mt-20 bg-slate-50 py-12 dark:bg-slate-900 md:py-16 lg:py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl xl:max-w-5xl">
            <h2
              class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ t.sections.experienceTitle }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl lg:max-w-none xl:max-w-none xl:whitespace-nowrap">
              {{ t.sections.experienceSubtitle }}
            </p>
          </div>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <article
              v-for="role in experience"
              :key="`${role.company}-${role.timeframe}`"
              class="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50"
            >
              <div class="flex flex-1 flex-col p-6">
                <div class="flex items-start justify-between gap-4">
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400"
                    >
                      {{ role.company }}
                    </p>
                    <h3
                      class="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-white"
                    >
                      {{ role.title }}
                    </h3>
                    <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ role.program }}</p>
                  </div>
                  <p class="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {{ role.timeframe }}
                  </p>
                </div>
                <ul class="mt-4 flex-1 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  <li
                    v-for="(h, i) in role.highlights.slice(0, 3)"
                    :key="i"
                    class="flex gap-2"
                  >
                    <span
                      class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500 dark:bg-blue-400"
                    ></span>
                    <span>{{ h }}</span>
                  </li>
                </ul>
                <dl
                  v-if="role.outcomes?.length"
                  class="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 dark:border-slate-700"
                >
                  <div
                    v-for="o in role.outcomes"
                    :key="o.label"
                    class="text-center sm:text-left"
                  >
                    <dt class="text-xs text-slate-500 dark:text-slate-400">{{ o.label }}</dt>
                    <dd class="mt-0.5 text-sm font-semibold text-slate-900 dark:text-white">
                      {{ o.value }}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Projects: Venus blog-style grid -->
      <section
        id="projects"
        class="scroll-mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-700 dark:bg-slate-800/50 md:py-16 lg:py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl xl:max-w-5xl">
            <h2
              class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ t.sections.portfolioTitle }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300 lg:max-w-none xl:max-w-none xl:whitespace-nowrap">
              {{ t.sections.portfolioSubtitle }}
            </p>
          </div>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <article
              v-for="p in projects"
              :key="p.title"
              class="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
            >
              <div class="flex flex-1 flex-col p-6">
                <p
                  class="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400"
                >
                  {{ p.tags.split(' • ')[0] }}
                </p>
                <h3
                  class="mt-2 text-lg font-semibold leading-snug text-slate-900 line-clamp-2 dark:text-white"
                >
                  {{ p.title }}
                </h3>
                <p
                  class="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2 dark:text-slate-300"
                >
                  {{ p.impact }}
                </p>
                <p class="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                  Problem · Solution · Impact
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- Technical Expertise: Venus services-style cards -->
      <section
        id="expertise"
        class="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900 md:py-16 lg:py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl xl:max-w-5xl">
            <h2
              class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ t.sections.expertiseTitle }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300 lg:max-w-none xl:max-w-none whitespace-pre-line">
              {{ t.sections.expertiseSubtitle }}
            </p>
          </div>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="panel in expertisePanels"
              :key="panel.title"
              class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-700 dark:bg-slate-800/50"
            >
              <h3 class="text-base font-semibold text-slate-900 dark:text-white">{{ panel.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {{ panel.items.join('. ') }}
              </p>
              <a
                href="#contact"
                class="mt-4 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Get in touch →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Certifications: tag-style grid -->
      <section
        id="certifications"
        class="scroll-mt-20 border-t border-slate-200 bg-white py-12 dark:border-slate-700 dark:bg-slate-800/50 md:py-16 lg:py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <h2
              class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ t.sections.certificationsTitle }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t.sections.certificationsSubtitle }}
            </p>
          </div>
          <div class="mt-10 flex flex-wrap gap-3">
            <span
              v-for="b in certifications"
              :key="b"
              class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200"
            >
              {{ b }}
            </span>
          </div>
          <p class="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Additional: Lovable, OpenAI/ChatGPT, AI for Everyone, GenAI for Developers/DevOps, and more.
          </p>
        </div>
      </section>

      <!-- Contact: Venus "Let's discuss" style -->
      <section
        id="contact"
        class="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-12 dark:border-slate-700 dark:bg-slate-900 md:py-16 lg:py-20"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <h2
              class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl"
            >
              {{ t.sections.contactTitle }}
            </h2>
            <p class="mt-2 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {{ t.sections.contactSubtitle }}
            </p>
          </div>
          <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <component
              v-for="c in contactCards"
              :key="c.label"
              :is="c.href ? 'a' : 'div'"
              class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              :href="c.href"
              :target="c.target"
              :rel="c.rel"
            >
              <p class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {{ c.label }}
              </p>
              <p class="mt-2 text-base font-semibold text-slate-900 dark:text-white">{{ c.value }}</p>
            </component>
          </div>
        </div>
      </section>

      <!-- Footer: minimal -->
      <footer
        class="border-t border-slate-200 bg-white py-8 dark:border-slate-700 dark:bg-slate-800/50"
      >
        <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p class="text-center text-sm text-slate-500 dark:text-slate-400">
            © {{ new Date().getFullYear() }} Manjuri Choudhury. Frontend Architect · UI Lead · Scalable Design Systems.
          </p>
        </div>
      </footer>
    </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import { computed, onMounted, ref } from 'vue';
import en from '../locales/en';
import fr from '../locales/fr';
import de from '../locales/de';

const THEME_KEY = 'portfolio-theme';

const isDark = ref(false);
const heroImageError = ref(false);
const activeSection = ref('#experience');

const messages = {
  en,
  fr,
  de
} as const;

type LocaleKey = keyof typeof messages;
const currentLocale = ref<LocaleKey>('en');
const t = computed(() => messages[currentLocale.value]);

const heroImageSrc = '/my_photo_1.jpg';
const heroImageAlt = 'Manjuri Choudhury, Frontend Architect and UI Lead';

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme(isDark.value);
  try {
    localStorage.setItem(THEME_KEY, isDark.value ? 'dark' : 'light');
  } catch {
    /* ignore */
  }
}

function applyTheme(dark: boolean) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  const body = document.body;
  if (dark) {
    html.classList.add('dark');
    body.classList.add('dark');
  } else {
    html.classList.remove('dark');
    body.classList.remove('dark');
  }
}

function handleMobileNavClick(href: string, close: () => void) {
  activeSection.value = href;
  close();
}

onMounted(() => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || (stored !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDark.value = true;
      applyTheme(true);
    } else {
      isDark.value = false;
      applyTheme(false);
    }
  } catch {
    applyTheme(false);
  }
});

const navLinks = [
  { key: 'experience', href: '#experience' },
  { key: 'projects', href: '#projects' },
  { key: 'expertise', href: '#expertise' },
  { key: 'certifications', href: '#certifications' },
  { key: 'contact', href: '#contact' }
] as const;

const contact = {
  email: 'manjuri.chd@gmail.com',
  phone: '+91-9508622290',
  alternatePhone: '+91-9964579900',
  location: 'Bangalore, India',
  linkedinLabel: 'linkedin.com/in/manjurichd',
  linkedinHref: 'https://www.linkedin.com/in/manjurichd/'
};

const metrics = [
  { label: 'Team led', value: '20+ engineers' },
  { label: 'Productivity lift', value: '30%' },
  { label: 'Error reduction', value: '40%' },
  { label: 'Faster delivery', value: '30%' }
];

type Outcome = { label: string; value: string };
type ExperienceRole = {
  company: string;
  title: string;
  timeframe: string;
  program: string;
  highlights: string[];
  outcomes?: Outcome[];
};

const experience: ExperienceRole[] = [
  {
    company: 'GE Aerospace',
    title: 'Sr Software Engineer — UI Lead',
    timeframe: 'Feb 2017 – Present',
    program: '1Fleet Asset (1FA)',
    highlights: [
      'Leading 20+ front-end engineers and interns across parallel streams; mentoring, code reviews, and technical enablement.',
      'Drove requirement analysis and solution design with cross-functional stakeholders; improved delivery velocity by ~30%.',
      'Built a reusable UI component library and scalable design system; used Storybook to standardize UI and speed onboarding.',
      'Implemented WCAG 2.1 accessibility practices and responsive, cross-browser UI patterns.',
      'Improved performance via asset compression and CSS/JS refinements; reduced page load time by ~25%.',
      'Implemented OAuth 2.0 authentication and RBAC; partnered with centralized Auth teams for persona-based access.'
    ],
    outcomes: [
      { label: 'Manual error reduction', value: '40%' },
      { label: 'User satisfaction increase', value: '25%' },
      { label: 'Design system acceleration', value: '30% faster delivery' }
    ]
  },
  {
    company: 'Cognizant',
    title: 'Software Engineer',
    timeframe: 'Feb 2015 – Jan 2017',
    program: 'Insurance & Inventory Systems',
    highlights: [
      'Led frontend delivery for a responsive Stock Management System using AngularJS, JavaScript, HTML5, and LESS.',
      'Enabled real-time inventory tracking, backlog management, and analytics using RESTful API integrations.',
      'Built modules for policyholder onboarding, dependents, coverage status, and end-to-end claims processing.',
      'Delivered accessible, cross-device UIs with strong testing, debugging, and cross-browser validation.'
    ]
  },
  {
    company: 'Sapient Global Markets',
    title: 'Software Engineer',
    timeframe: 'Jul 2014 – Feb 2015',
    program: 'Pharmaceutical Inventory Management',
    highlights: [
      'Developed responsive medicine stock management workflows and interactive dashboards.',
      'Integrated RESTful APIs for real-time updates and dynamic UI rendering.',
      'Applied mobile-first and WCAG-aligned UI patterns; ensured cross-platform reliability.'
    ]
  },
  {
    company: 'Brillio',
    title: 'Software Engineer',
    timeframe: 'Jun 2012 – Jun 2014',
    program: 'Network Service Management (Verizon)',
    highlights: [
      'Built a network tracking application to monitor internet, wireless, wireline, and security service performance.',
      'Delivered responsive, accessible UIs with REST integrations for real-time status updates.',
      'Worked closely with UX and business stakeholders to align delivery with operational goals.'
    ]
  }
];

type Project = {
  title: string;
  tags: string;
  problem: string;
  solution: string;
  impact: string;
};

const projects: Project[] = [
  {
    title: '1Fleet Asset (1FA) — Engine Asset Lifecycle UI',
    tags: 'Vue/React ecosystem • Design System • OAuth/RBAC • WCAG',
    problem:
      'Engineering and operations teams needed high-fidelity, real-time asset intelligence for compliance and predictive maintenance—without manual data errors.',
    solution:
      'Led UI architecture and delivery, implemented component library + Storybook, added responsive workflows, and enforced OAuth 2.0 + RBAC with persona-based access.',
    impact:
      'Reduced manual errors by ~40%, improved user satisfaction by ~25%, and accelerated delivery by ~30% through a scalable design system.'
  },
  {
    title: 'Stock Management System',
    tags: 'AngularJS • REST APIs • Responsive UI',
    problem:
      'Global inventory stakeholders needed real-time visibility into manufactured stock, backlogs, and deliveries across devices.',
    solution:
      'Built a responsive, API-driven frontend with backlog management and analytics; ensured cross-browser consistency and accessibility-aware UX.',
    impact: 'Improved operational visibility and responsiveness for inventory decision-making and execution.'
  },
  {
    title: 'Insurance Management Platform',
    tags: 'AngularJS • Modular UI • REST APIs',
    problem:
      'Insurance operations required a scalable UI for onboarding, dependent tracking, coverage status, and claims workflows.',
    solution:
      'Delivered key modules with dynamic client-side interactivity and strong validation; collaborated with UX and stakeholders for pixel-perfect delivery.',
    impact: 'Streamlined end-to-end workflows and improved usability through accessible, responsive design.'
  },
  {
    title: 'Network Tracking Application (Verizon)',
    tags: 'Enterprise dashboards • REST integration • Accessibility',
    problem:
      'Operations teams needed a centralized view of service delivery, issue resolution, and lifecycle status across diverse network services.',
    solution:
      'Built dashboard-centric UI with responsive, accessible patterns and real-time updates via RESTful integrations.',
    impact: 'Improved operational visibility and cross-platform reliability for critical service monitoring.'
  }
];

type ExpertisePanel = { title: string; items: string[] };
const expertisePanels = computed<ExpertisePanel[]>(() => t.value.expertisePanels);

const certifications = [
  'Meta Frontend Developer',
  'UI/UX',
  'Version Control',
  'Cursor AI',
  'GitHub Copilot',
  'Claude',
  'GenAI',
  'RAG & Agentic AI (IBM)',
  'Automation for Everyone'
];

const contactCards = [
  { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  { label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
  { label: 'Alternate phone', value: contact.alternatePhone, href: `tel:${contact.alternatePhone}` },
  { label: 'Location', value: contact.location },
  {
    label: 'LinkedIn',
    value: contact.linkedinLabel,
    href: contact.linkedinHref,
    target: '_blank',
    rel: 'noreferrer'
  }
];
</script>

<style>
/* Override Tailwind's .text-transparent utility within this app */
.text-transparent {
  --tw-text-opacity: 1;
  color: rgb(51 65 85 / var(--tw-text-opacity, 1));
  font-weight: 700;
}

/* Remove any default outline around nav containers while keeping focus styles on links */
nav[aria-label='Primary'],
nav[aria-label='Primary mobile'] {
  outline: none;
}
</style>
