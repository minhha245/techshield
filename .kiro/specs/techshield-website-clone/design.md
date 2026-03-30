# Design Document: TechShield Website Clone

## Overview

Clone trang web techshield.vn/vi bằng Next.js 15 (App Router) + Tailwind CSS + TypeScript + next-intl. Đây là một single-page website tĩnh giới thiệu công ty TechShield — một công ty IT/cybersecurity — với đầy đủ các section theo thứ tự: Navbar, Hero, About, Services, Partners, News, CTA, Footer. Website hỗ trợ song ngữ VI/EN thông qua next-intl.

Toàn bộ nội dung là dữ liệu tĩnh (static data), không có backend hay database. Routing chỉ gồm một route chính `/` (locale prefix `/vi` và `/en`). Ảnh được tối ưu qua Next.js Image component.

---

## Architecture

### App Router Structure

```
src/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root layout: NextIntlClientProvider, fonts, metadata
│       ├── page.tsx            # Single page: render all sections in order
│       └── not-found.tsx       # 404 fallback
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── PartnersSection.tsx
│       ├── NewsSection.tsx
│       └── CtaSection.tsx
├── lib/
│   └── data.ts                 # Static content data (news, services, partners)
├── i18n/
│   ├── request.ts              # next-intl server config
│   └── routing.ts              # defineRouting (locales, defaultLocale)
├── messages/
│   ├── vi.json
│   └── en.json
├── middleware.ts               # next-intl createMiddleware
└── tailwind.config.ts
```

### Routing & Navigation

```
/          → redirect → /vi  (defaultLocale)
/vi        → [locale]/page.tsx với locale="vi"
/en        → [locale]/page.tsx với locale="en"
```

next-intl middleware xử lý locale detection và redirect. Không có dynamic routes hay API routes.

Smooth scroll navigation dùng native CSS `scroll-behavior: smooth` + `href="#section-id"`. Language switcher dùng `useRouter` + `usePathname` từ next-intl để chuyển locale mà không reload trang.

---

## Components and Interfaces

### Component Tree

```
[locale]/layout.tsx
└── NextIntlClientProvider
    └── [locale]/page.tsx
        ├── Navbar
        │   ├── Logo (Next/Image)
        │   ├── NavLinks (smooth scroll anchors)
        │   └── LanguageSwitcher
        ├── HeroSection          id="hero"
        ├── AboutSection         id="about"
        │   ├── HighlightCard × 4
        │   └── CertBadge × 2 (ISO 27001, CISSP)
        ├── ServicesSection      id="services"
        │   └── ServiceCard × 4
        ├── PartnersSection      id="partners"
        │   └── PartnerLogo × 6 (Next/Image)
        ├── NewsSection          id="news"
        │   └── NewsCard × 3 (Next/Image thumbnail)
        ├── CtaSection           id="contact"
        └── Footer
            ├── Address
            ├── NavLinks
            └── Copyright
```

### Component Interfaces (TypeScript)

```typescript
// lib/data.ts types
interface ServiceItem {
  id: string;
  icon: string;          // lucide-react icon name hoặc SVG path
  titleKey: string;      // i18n key
  descriptionKey: string;
}

interface PartnerItem {
  id: string;
  name: string;          // "Microsoft", "Cisco", ...
  logo: string;          // /images/partners/{name}.png
  altKey: string;        // i18n key cho alt text
}

interface NewsItem {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  date: string;          // ISO 8601: "2024-01-15"
  thumbnail: string;     // /images/news/{slug}.jpg
}

interface HighlightCard {
  id: string;
  icon: string;
  labelKey: string;
}
```

### Navbar

- `position: fixed; top: 0; z-index: 50` — luôn hiển thị trên cùng
- Scroll-aware: thêm `bg-white shadow` khi `scrollY > 0` (dùng `useEffect` + `window.addEventListener('scroll', ...)`)
- NavLinks: `<a href="#about">`, `<a href="#services">`, ... — smooth scroll qua CSS
- LanguageSwitcher: button toggle VI/EN, dùng `useRouter().replace(pathname, { locale: newLocale })`
- Navbar là `'use client'` vì dùng `useEffect` và `window` (browser API) — theo skill `rsc-boundaries`

### LanguageSwitcher

```typescript
// Good: 'use client' vì dùng hooks và browser router
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';

// Render: "VI | EN" với locale hiện tại được highlight
// onClick: router.replace(pathname, { locale: targetLocale })
// Không reload trang, giữ scroll position
```

> Skill applied (rsc-boundaries): LanguageSwitcher và Navbar là Client Components vì dùng hooks/browser APIs.
> Tất cả sections còn lại (Hero, About, Services, Partners, News, CTA, Footer) là Server Components — không có 'use client'.

---

## Data Models

### i18n Locale Files Structure

```json
// messages/vi.json
{
  "nav": {
    "home": "Trang chủ",
    "about": "Giới thiệu",
    "services": "Dịch vụ",
    "partners": "Đối tác",
    "news": "Tin tức",
    "contact": "Liên hệ"
  },
  "hero": {
    "tagline": "Đối tác tin cậy trong kỷ nguyên số",
    "cta": "Về TechShield"
  },
  "about": {
    "heading": "Về TechShield",
    "intro": "TechShield là công ty chuyên cung cấp giải pháp an toàn thông tin và hạ tầng CNTT toàn diện...",
    "highlights": {
      "experience": "10+ năm kinh nghiệm",
      "solutions": "Giải pháp toàn diện",
      "support": "Hỗ trợ 24/7",
      "certifications": "Chứng nhận quốc tế"
    },
    "certBadgeAlt": {
      "iso": "Chứng nhận ISO 27001",
      "cissp": "Chứng nhận CISSP"
    }
  },
  "services": {
    "heading": "Dịch vụ của chúng tôi",
    "items": {
      "consulting": {
        "title": "Tư vấn An toàn thông tin",
        "description": "Đánh giá rủi ro, tư vấn chính sách bảo mật và triển khai giải pháp an toàn thông tin."
      },
      "infrastructure": {
        "title": "Thiết kế hạ tầng CNTT",
        "description": "Thiết kế và triển khai hạ tầng mạng, server, storage đáp ứng nhu cầu doanh nghiệp."
      },
      "equipment": {
        "title": "Mua bán thiết bị CNTT",
        "description": "Cung cấp thiết bị CNTT chính hãng từ các thương hiệu hàng đầu thế giới."
      },
      "hardware_software": {
        "title": "Tư vấn phần cứng/phần mềm",
        "description": "Tư vấn lựa chọn và triển khai giải pháp phần cứng, phần mềm phù hợp."
      }
    }
  },
  "partners": {
    "heading": "Đối tác chiến lược",
    "alt": {
      "microsoft": "Logo Microsoft",
      "cisco": "Logo Cisco",
      "vmware": "Logo VMware",
      "dell": "Logo Dell",
      "hpe": "Logo HP Enterprise",
      "fortinet": "Logo Fortinet"
    }
  },
  "news": {
    "heading": "Tin tức mới nhất",
    "readMore": "Xem thêm",
    "notAvailable": "Bài viết chưa có sẵn",
    "items": {
      "news1": {
        "title": "TechShield đạt chứng nhận ISO 27001:2022",
        "excerpt": "TechShield vừa hoàn thành quá trình đánh giá và đạt chứng nhận ISO 27001:2022 về hệ thống quản lý an toàn thông tin."
      },
      "news2": {
        "title": "Ra mắt dịch vụ SOC 24/7 mới",
        "excerpt": "TechShield chính thức ra mắt dịch vụ Security Operations Center hoạt động 24/7, giúp doanh nghiệp giám sát và phản ứng sự cố bảo mật."
      },
      "news3": {
        "title": "Hội thảo An toàn thông tin 2024",
        "excerpt": "TechShield tổ chức hội thảo chuyên đề về xu hướng an toàn thông tin năm 2024 với sự tham gia của hơn 200 chuyên gia."
      }
    }
  },
  "cta": {
    "heading": "Sẵn sàng bảo vệ doanh nghiệp của bạn?",
    "description": "Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí.",
    "button": "Liên hệ ngay"
  },
  "footer": {
    "address": "37 Ngõ 599 Phạm Văn Đồng, TDP Hoàng 15, Phường Nghĩa Đô, Hà Nội",
    "copyright": "© {year} TechShield. All rights reserved."
  }
}
```

```json
// messages/en.json — cấu trúc tương tự, giá trị tiếng Anh
{
  "nav": {
    "home": "Home",
    "about": "About",
    "services": "Services",
    "partners": "Partners",
    "news": "News",
    "contact": "Contact"
  },
  "hero": {
    "tagline": "Your Trusted Partner in the Digital Era",
    "cta": "About TechShield"
  },
  "about": {
    "heading": "About TechShield",
    "intro": "TechShield is a company specializing in comprehensive information security and IT infrastructure solutions...",
    "highlights": {
      "experience": "10+ Years of Experience",
      "solutions": "Comprehensive Solutions",
      "support": "24/7 Support",
      "certifications": "International Certifications"
    },
    "certBadgeAlt": {
      "iso": "ISO 27001 Certification",
      "cissp": "CISSP Certification"
    }
  },
  "services": {
    "heading": "Our Services",
    "items": {
      "consulting": {
        "title": "Information Security Consulting",
        "description": "Risk assessment, security policy consulting, and information security solution deployment."
      },
      "infrastructure": {
        "title": "IT Infrastructure Design",
        "description": "Design and deploy network, server, and storage infrastructure to meet enterprise needs."
      },
      "equipment": {
        "title": "IT Equipment Sales",
        "description": "Supply genuine IT equipment from the world's leading brands."
      },
      "hardware_software": {
        "title": "Hardware/Software Consulting",
        "description": "Consulting on selecting and deploying appropriate hardware and software solutions."
      }
    }
  },
  "partners": {
    "heading": "Strategic Partners",
    "alt": {
      "microsoft": "Microsoft Logo",
      "cisco": "Cisco Logo",
      "vmware": "VMware Logo",
      "dell": "Dell Logo",
      "hpe": "HP Enterprise Logo",
      "fortinet": "Fortinet Logo"
    }
  },
  "news": {
    "heading": "Latest News",
    "readMore": "Read More",
    "notAvailable": "Article not yet available",
    "items": {
      "news1": {
        "title": "TechShield Achieves ISO 27001:2022 Certification",
        "excerpt": "TechShield has completed the assessment process and achieved ISO 27001:2022 certification for information security management systems."
      },
      "news2": {
        "title": "Launch of New 24/7 SOC Service",
        "excerpt": "TechShield officially launches a 24/7 Security Operations Center service, helping enterprises monitor and respond to security incidents."
      },
      "news3": {
        "title": "Information Security Conference 2024",
        "excerpt": "TechShield organizes a specialized conference on information security trends in 2024 with the participation of over 200 experts."
      }
    }
  },
  "cta": {
    "heading": "Ready to Protect Your Business?",
    "description": "Contact us today for a free consultation.",
    "button": "Contact Us"
  },
  "footer": {
    "address": "37 Ngõ 599 Phạm Văn Đồng, TDP Hoàng 15, Nghia Do Ward, Hanoi",
    "copyright": "© {year} TechShield. All rights reserved."
  }
}
```

### Static Data (lib/data.ts)

```typescript
// Dữ liệu không phụ thuộc locale (slug, date, image paths)
export const NEWS_ITEMS: NewsItem[] = [
  { id: "news1", slug: "iso-27001-2022", titleKey: "news.items.news1.title", excerptKey: "news.items.news1.excerpt", date: "2024-03-15", thumbnail: "/images/news/iso-cert.jpg" },
  { id: "news2", slug: "soc-24-7",       titleKey: "news.items.news2.title", excerptKey: "news.items.news2.excerpt", date: "2024-02-20", thumbnail: "/images/news/soc-launch.jpg" },
  { id: "news3", slug: "conference-2024",titleKey: "news.items.news3.title", excerptKey: "news.items.news3.excerpt", date: "2024-01-10", thumbnail: "/images/news/conference.jpg" },
];

export const PARTNERS: PartnerItem[] = [
  { id: "microsoft", name: "Microsoft",    logo: "/images/partners/microsoft.png",  altKey: "partners.alt.microsoft" },
  { id: "cisco",     name: "Cisco",        logo: "/images/partners/cisco.png",      altKey: "partners.alt.cisco" },
  { id: "vmware",    name: "VMware",       logo: "/images/partners/vmware.png",     altKey: "partners.alt.vmware" },
  { id: "dell",      name: "Dell",         logo: "/images/partners/dell.png",       altKey: "partners.alt.dell" },
  { id: "hpe",       name: "HP Enterprise",logo: "/images/partners/hpe.png",        altKey: "partners.alt.hpe" },
  { id: "fortinet",  name: "Fortinet",     logo: "/images/partners/fortinet.png",   altKey: "partners.alt.fortinet" },
];

export const SERVICES: ServiceItem[] = [
  { id: "consulting",       icon: "Shield",      titleKey: "services.items.consulting.title",       descriptionKey: "services.items.consulting.description" },
  { id: "infrastructure",   icon: "Server",      titleKey: "services.items.infrastructure.title",   descriptionKey: "services.items.infrastructure.description" },
  { id: "equipment",        icon: "ShoppingCart",titleKey: "services.items.equipment.title",         descriptionKey: "services.items.equipment.description" },
  { id: "hardware_software",icon: "Cpu",         titleKey: "services.items.hardware_software.title", descriptionKey: "services.items.hardware_software.description" },
];

export const HIGHLIGHTS: HighlightCard[] = [
  { id: "experience",    icon: "Clock",   labelKey: "about.highlights.experience" },
  { id: "solutions",     icon: "Layers",  labelKey: "about.highlights.solutions" },
  { id: "support",       icon: "Headphones", labelKey: "about.highlights.support" },
  { id: "certifications",icon: "Award",   labelKey: "about.highlights.certifications" },
];
```

---

## Routing & Navigation Design

### next-intl Setup

```typescript
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
  localePrefix: 'always',   // /vi/... và /en/...
});

// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
export default createMiddleware(routing);
export const config = { matcher: ['/', '/(vi|en)/:path*'] };

// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

### Smooth Scroll Navigation

- Mỗi section có `id` tương ứng: `hero`, `about`, `services`, `partners`, `news`, `contact`
- Navbar links: `<a href="#about">` — browser native smooth scroll
- `html { scroll-behavior: smooth; }` trong global CSS
- Hero CTA button: `onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}` — cần `'use client'` vì dùng browser API `document`
- CTA contact button: scroll đến `#contact` (Footer section) — tương tự, cần `'use client'`

> Skill applied (rsc-boundaries): Bất kỳ component nào dùng `document`, `window`, hay event handlers phải có `'use client'`. Tách CTA button thành client component riêng thay vì làm cả section thành client.

### Language Switcher — Locale Preservation

```typescript
// Chuyển locale mà không reload, giữ scroll position
const router = useRouter();
const pathname = usePathname();

const switchLocale = (newLocale: string) => {
  router.replace(pathname, { locale: newLocale });
};
```

---

## Styling Approach

### Tailwind Config

```typescript
// tailwind.config.ts
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0052CC',   // TechShield blue
          dark:    '#003D99',
          light:   '#E6F0FF',
        },
        accent: '#FF6B35',      // CTA orange
        neutral: {
          900: '#1A1A2E',       // Dark text
          600: '#4A5568',       // Body text
          100: '#F7FAFC',       // Light bg
        },
      },
      fontFamily: {
        // Good: dùng CSS variable từ next/font — theo skill font
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      container: {
        center: true,
        padding: { DEFAULT: '1rem', md: '2rem', lg: '4rem' },
        screens: { xl: '1280px' },
      },
    },
  },
};
```

### Font Setup

```typescript
// app/[locale]/layout.tsx — Good: import font một lần duy nhất ở layout
// Skill applied (font): dùng next/font/google, không dùng <link> tag hay @import CSS
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],  // vietnamese subset cho tiếng Việt
  variable: '--font-inter',
  display: 'swap',
});

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.locale} className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

> Skill applied (font): Không import font trong từng component. Không dùng `<link href="fonts.googleapis.com">`. Dùng `vietnamese` subset để hỗ trợ ký tự tiếng Việt.

### Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| mobile | ≥ 320px | 1 column, hamburger menu |
| tablet | ≥ 768px | 2 columns cho cards |
| desktop | ≥ 1280px | 4 columns cho cards, full navbar |

### Section Layout Pattern

```tsx
// Mỗi section dùng pattern nhất quán:
<section id="about" className="py-16 md:py-24 bg-white">
  <div className="container mx-auto px-4">
    <h2 className="text-3xl font-bold text-center mb-12">...</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* cards */}
    </div>
  </div>
</section>
```

---

## Performance Considerations

### Next.js Image Optimization

```tsx
// Good: Hero — priority=true vì là LCP image (above the fold)
// Skill applied (image): priority cho ảnh đầu trang
<Image src="/images/hero-bg.jpg" alt="..." fill sizes="100vw" priority />

// Good: Partner logos — explicit width/height, objectFit contain
<Image src={partner.logo} alt={altText} width={160} height={80}
  style={{ objectFit: 'contain' }} />

// Good: News thumbnails — fill + sizes cho responsive grid
<Image src={news.thumbnail} alt={news.title} fill
  sizes="(max-width: 768px) 100vw, 33vw" />
```

> Skill applied (image): Luôn dùng `next/image`, không dùng `<img>`. Thêm `sizes` khi dùng `fill` để tránh download ảnh quá lớn. `priority` chỉ cho LCP image (hero).

### Lighthouse ≥ 80 Strategies

- Server Components mặc định cho tất cả sections (chỉ Navbar, LanguageSwitcher, ScrollButton là `'use client'`)
- Font: `next/font/google` với `display: 'swap'` và `vietnamese` subset
- CSS: Tailwind purge loại bỏ unused classes
- Images: WebP/AVIF tự động qua Next.js Image
- No layout shift: explicit `width`/`height` cho tất cả images, `sizes` cho fill images
- Minimal JS bundle: tách client components nhỏ nhất có thể

### Missing Image Fallback

```tsx
// components/ui/ImageWithFallback.tsx
'use client';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

export function ImageWithFallback({ src, alt, fallbackSrc = '/images/placeholder.png', ...props }: ImageProps & { fallbackSrc?: string }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
```

---

## Error Handling

- **Missing images**: `ImageWithFallback` component hiển thị placeholder với alt text đúng locale
- **Invalid locale**: middleware redirect về `defaultLocale` (`vi`)
- **Missing translation key**: next-intl fallback về key string thay vì crash
- **Build errors**: TypeScript strict mode + `next build` CI check
- **Hydration mismatch**: tránh dùng `Date.now()` hay `Math.random()` trong render; copyright year dùng server-side `new Date().getFullYear()`; `window`/`document` chỉ dùng trong `useEffect` hoặc event handlers bên trong `'use client'` components

> Skill applied (hydration-error): Copyright year render server-side tránh timezone mismatch. Scroll event listener chỉ chạy trong `useEffect`. Không dùng `window` ở top-level render.

---

## Testing Strategy

### Dual Testing Approach

**Unit tests** (Jest + React Testing Library):
- Kiểm tra từng component render đúng với props/translations
- Kiểm tra LanguageSwitcher gọi đúng router method
- Kiểm tra ImageWithFallback fallback khi ảnh lỗi
- Kiểm tra NavLinks có đúng href anchors

**Property-based tests** (fast-check):
- Mỗi property test chạy tối thiểu 100 iterations
- Tag format: `// Feature: techshield-website-clone, Property {N}: {property_text}`
- Mỗi correctness property được implement bởi đúng 1 property-based test

### Property-Based Testing Library

Dùng **fast-check** (TypeScript-native, phổ biến trong Next.js/React ecosystem):

```bash
npm install --save-dev fast-check
```

### Test Configuration

```typescript
// jest.config.ts
import type { Config } from 'jest';
const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
  moduleNameMapper: { '^next-intl$': '<rootDir>/__mocks__/next-intl.ts' },
};
export default config;
```

### Unit Test Focus Areas

- Specific examples: render Hero với locale `vi` → tagline tiếng Việt
- Edge cases: locale không hợp lệ → fallback `vi`
- Integration: LanguageSwitcher click → router.replace được gọi đúng
- Error conditions: ảnh thiếu → placeholder hiển thị với alt text


---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Scroll navigation targets exist

*For any* navigation link or scroll-trigger button in the Navbar or CTA section, the anchor target (e.g. `#about`, `#services`, `#contact`) must correspond to a section ID that exists in the rendered page DOM.

**Validates: Requirements 1.3, 8.3**

---

### Property 2: All translatable text matches the active locale

*For any* locale in `['vi', 'en']`, when the page is rendered with that locale, every visible text string that has a translation key must match the value defined in the corresponding locale file (`vi.json` or `en.json`). No text from a different locale should appear.

**Validates: Requirements 2.3, 3.1, 3.2, 4.1, 4.2, 4.4, 5.1, 5.3, 6.3, 6.4, 7.3, 7.5, 8.1, 8.2, 8.4**

---

### Property 3: LanguageSwitcher invokes router with correct locale

*For any* current locale, when the LanguageSwitcher button for the other locale is clicked, `router.replace` must be called with the target locale as the new locale parameter, and the current pathname must be preserved.

**Validates: Requirements 2.2, 2.3**

---

### Property 4: Service cards render all required fields

*For any* service item in the services data array, the rendered ServiceCard component must contain a non-empty title, a non-empty description, and an icon element.

**Validates: Requirements 5.2**

---

### Property 5: News cards render all required fields

*For any* news item in the news data array, the rendered NewsCard component must contain a non-empty title, a non-empty excerpt, a publication date string, and an image element (thumbnail).

**Validates: Requirements 7.2**

---

### Property 6: Partner logos have non-empty alt text

*For any* partner in the partners data array and *for any* locale in `['vi', 'en']`, the rendered partner logo image must have a non-empty `alt` attribute that matches the locale's translation for that partner's alt key.

**Validates: Requirements 6.2, 6.4**

---

### Property 7: Footer address is locale-invariant

*For any* pair of locales `(vi, en)`, the physical company address string rendered in the Footer must be identical regardless of which locale is active. Locale switching must not alter the address text.

**Validates: Requirements 9.4**

---

### Property 8: Footer nav links match Navbar nav links

*For any* locale, the set of navigation link labels rendered in the Footer must be equal to the set of navigation link labels rendered in the Navbar (same keys, same translated values).

**Validates: Requirements 9.2**

---

### Property 9: Image fallback preserves alt text on error

*For any* image rendered via `ImageWithFallback`, when an `onError` event is triggered (simulating a missing asset), the component must switch to the fallback `src` while keeping the original `alt` attribute unchanged and non-empty.

**Validates: Requirements 10.5**

---

### Property 10: Next.js Image components include optimization attributes

*For any* image element rendered on the page, the underlying `<img>` tag must include a `srcset` attribute (indicating Next.js Image optimization is active) and must have a non-empty `alt` attribute.

**Validates: Requirements 10.2**
