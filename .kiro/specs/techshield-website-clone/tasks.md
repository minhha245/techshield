# Implementation Plan: TechShield Website Clone

## Overview

Implement a bilingual (VI/EN) single-page website using Next.js 15 App Router, Tailwind CSS, TypeScript, and next-intl. All content is static. The implementation follows RSC boundary rules: only Navbar, LanguageSwitcher, and ScrollButton are Client Components.

## Tasks

- [x] 1. Project setup
  - Initialize Next.js 15 project with TypeScript and App Router: `npx create-next-app@latest --typescript --tailwind --app --src-dir`
  - Install dependencies: `npm install next-intl`, `npm install --save-dev fast-check jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom ts-jest`
  - Configure `jest.config.ts` with `testEnvironment: 'jsdom'`, `setupFilesAfterFramework: ['@testing-library/jest-dom']`, and moduleNameMapper for `next-intl` and `next/image`
  - Create `__mocks__/next-intl.ts` stub (exports `useTranslations`, `useLocale`, `NextIntlClientProvider` as no-ops for tests)
  - Create `__mocks__/next/image.tsx` stub (renders plain `<img>` for tests)
  - _Requirements: 10.6_

- [x] 2. Tailwind and font configuration
  - [x] 2.1 Configure `tailwind.config.ts` with custom colors (`primary`, `accent`, `neutral`), `fontFamily.sans: ['var(--font-inter)', 'sans-serif']`, and container settings
    - _Requirements: 10.3_
  - [x] 2.2 Add `html { scroll-behavior: smooth; }` to `src/app/globals.css`
    - _Requirements: 1.3_

- [x] 3. TypeScript interfaces and static data
  - [x] 3.1 Create `src/lib/data.ts` with interfaces `ServiceItem`, `PartnerItem`, `NewsItem`, `HighlightCard` and export constants `SERVICES`, `PARTNERS`, `NEWS_ITEMS`, `HIGHLIGHTS` with all 4/6/3/4 items respectively
    - _Requirements: 5.1, 6.1, 7.1, 4.2_

- [x] 4. i18n setup
  - [x] 4.1 Create `src/i18n/routing.ts`
    - _Requirements: 2.1, 2.4_
  - [x] 4.2 Create `src/i18n/request.ts`
    - _Requirements: 2.1, 2.4_
  - [x] 4.3 Create `src/middleware.ts`
    - _Requirements: 2.1, 2.4_
  - [x] 4.4 Create `src/messages/vi.json`
    - _Requirements: 2.6, 3.1, 4.1, 5.1, 6.3, 7.3, 8.1, 9.1_
  - [x] 4.5 Create `src/messages/en.json`
    - _Requirements: 2.6, 3.1, 4.1, 5.1, 6.3, 7.3, 8.1, 9.1_

- [x] 5. Root layout and page
  - [x] 5.1 Create `src/app/[locale]/layout.tsx`
    - _Requirements: 1.1, 2.1, 10.1_
  - [x] 5.2 Create `src/app/[locale]/page.tsx`
    - _Requirements: 1.1_
  - [x] 5.3 Create `src/app/[locale]/not-found.tsx`
    - _Requirements: 10.6_

- [x] 6. Navbar and LanguageSwitcher (Client Components)
  - [x] 6.1 Create `src/components/ui/ScrollButton.tsx`
  - [x] 6.2 Create `src/components/layout/Navbar.tsx`
  - [x] 6.3 Create `LanguageSwitcher`
  - [ ]* 6.4 Write unit test for LanguageSwitcher: mock `useRouter`, `usePathname`, `useLocale`; assert `router.replace` is called with correct locale on button click
    - _Requirements: 2.2, 2.3_
  - [ ]* 6.5 Write property test for LanguageSwitcher — Property 3: LanguageSwitcher invokes router with correct locale
    - For any current locale in `['vi', 'en']`, clicking the other locale button must call `router.replace` with that locale and preserve pathname
    - **Property 3: LanguageSwitcher invokes router with correct locale**
    - **Validates: Requirements 2.2, 2.3**

- [x] 7. HeroSection
  - [x] 7.1 Create `src/components/sections/HeroSection.tsx`

- [x] 8. AboutSection
  - [x] 8.1 Create `src/components/sections/AboutSection.tsx`

- [x] 9. ServicesSection
  - [x] 9.1 Create `src/components/sections/ServicesSection.tsx`

- [x] 10. PartnersSection
  - [x] 10.1 Create `src/components/sections/PartnersSection.tsx`

- [x] 11. NewsSection
  - [x] 11.1 Create `src/components/sections/NewsSection.tsx`

- [x] 12. CtaSection
  - [x] 12.1 Create `src/components/sections/CtaSection.tsx`

- [x] 13. Footer
  - [x] 13.1 Create `src/components/layout/Footer.tsx`

- [x] 14. ImageWithFallback component
  - [x] 14.1 Create `src/components/ui/ImageWithFallback.tsx`

- [ ] 15. Checkpoint - Ensure all tests pass
  - Run `npx jest --run` and verify all unit and property tests pass. Ask the user if any questions arise.

- [ ] 16. Cross-cutting property tests
  - [ ]* 16.1 Write property test — Property 1: Scroll navigation targets exist
    - For any nav link or scroll-trigger button rendered in Navbar or CtaSection, the `href` anchor or `targetId` must correspond to a section `id` present in the page
    - **Property 1: Scroll navigation targets exist**
    - **Validates: Requirements 1.3, 8.3**
  - [ ]* 16.2 Write property test — Property 2: All translatable text matches the active locale
    - For any locale in `['vi', 'en']`, every rendered text string with a translation key must match the value in the corresponding locale file
    - **Property 2: All translatable text matches the active locale**
    - **Validates: Requirements 2.3, 3.1, 3.2, 4.1, 4.2, 4.4, 5.1, 5.3, 6.3, 6.4, 7.3, 7.5, 8.1, 8.2, 8.4**
  - [ ]* 16.3 Write property test — Property 10: Next.js Image components include optimization attributes
    - For any image rendered on the page, the underlying `<img>` must include a `srcset` attribute and a non-empty `alt` attribute
    - **Property 10: Next.js Image components include optimization attributes**
    - **Validates: Requirements 10.2**

- [ ] 17. Responsive layout verification
  - [ ] 17.1 Verify Navbar collapses to hamburger menu on mobile (< 768px) — implement mobile menu toggle as `'use client'` within Navbar
    - _Requirements: 1.5_
  - [ ] 17.2 Verify grid layouts: Services and About use `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`; Partners use `grid-cols-2 md:grid-cols-3 lg:grid-cols-6`; News use `grid-cols-1 md:grid-cols-3`
    - _Requirements: 1.5_

- [x] 18. Final checkpoint - Build verification
  - [x] Run `npx next build` and confirm zero TypeScript errors and zero build errors.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (10 properties total from design.md)
- Unit tests validate specific examples and edge cases
- RSC boundary: only Navbar, LanguageSwitcher, ScrollButton, ImageWithFallback are `'use client'`
- Copyright year must be computed server-side in Footer to avoid hydration mismatch
- All images must use `next/image`, never `<img>`
- Font imported once in layout.tsx only, consumed via CSS variable `--font-inter`
