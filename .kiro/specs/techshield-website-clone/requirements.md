# Requirements Document

## Introduction

Xây dựng một website clone của techshield.vn/vi sử dụng Next.js và Tailwind CSS. Website tái tạo toàn bộ nội dung và bố cục của trang gốc, hỗ trợ song ngữ Tiếng Việt và Tiếng Anh thông qua hệ thống i18n. Trang web giới thiệu công ty TechShield — một công ty IT/cybersecurity — bao gồm các section: Hero, About, Services, Partners, News, CTA và Footer.

## Glossary

- **Website**: Ứng dụng web Next.js được xây dựng trong dự án này
- **i18n**: Internationalization — hệ thống hỗ trợ đa ngôn ngữ (Tiếng Việt và Tiếng Anh)
- **Locale**: Ngôn ngữ hiện tại đang được hiển thị (`vi` hoặc `en`)
- **Navbar**: Thanh điều hướng cố định ở đầu trang
- **Hero_Section**: Section đầu tiên của trang chứa tagline và CTA chính
- **About_Section**: Section giới thiệu công ty và 4 điểm nổi bật
- **Services_Section**: Section liệt kê các dịch vụ nổi bật
- **Partners_Section**: Section hiển thị logo các đối tác chiến lược
- **News_Section**: Section hiển thị 3 bài tin tức dạng card
- **CTA_Section**: Section kêu gọi hành động liên hệ
- **Footer**: Phần cuối trang chứa links và địa chỉ công ty
- **Language_Switcher**: Thành phần cho phép người dùng chuyển đổi ngôn ngữ VI/EN
- **Renderer**: Hệ thống Next.js render trang

---

## Requirements

### Requirement 1: Cấu trúc trang và điều hướng

**User Story:** As a visitor, I want to navigate a well-structured single-page website, so that I can find information about TechShield easily.

#### Acceptance Criteria

1. THE Website SHALL render a single-page layout containing Navbar, Hero_Section, About_Section, Services_Section, Partners_Section, News_Section, CTA_Section, and Footer in that order.
2. THE Navbar SHALL display the TechShield logo, navigation links (Trang chủ, Giới thiệu, Dịch vụ, Đối tác, Tin tức, Liên hệ), and a Language_Switcher.
3. WHEN a visitor clicks a navigation link, THE Navbar SHALL scroll smoothly to the corresponding section on the page.
4. WHILE a visitor scrolls down the page, THE Navbar SHALL remain fixed at the top of the viewport.
5. THE Website SHALL be fully responsive and render correctly on mobile (≥ 320px), tablet (≥ 768px), and desktop (≥ 1280px) viewports.

---

### Requirement 2: Hỗ trợ song ngữ (i18n)

**User Story:** As a visitor, I want to switch between Vietnamese and English, so that I can read the content in my preferred language.

#### Acceptance Criteria

1. THE Website SHALL support two locales: `vi` (Tiếng Việt) and `en` (English).
2. THE Language_Switcher SHALL display the current active locale and allow switching between `vi` and `en`.
3. WHEN a visitor selects a locale via the Language_Switcher, THE Renderer SHALL re-render all visible text content in the selected locale without a full page reload.
4. THE Website SHALL default to the `vi` locale on initial load.
5. WHEN a visitor switches locale, THE Website SHALL preserve the current scroll position.
6. THE i18n system SHALL store all translatable strings in separate locale files (`vi.json` and `en.json`) so that no hardcoded strings appear in component code.

---

### Requirement 3: Hero Section

**User Story:** As a visitor, I want to see a compelling hero section, so that I immediately understand TechShield's value proposition.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the company tagline "Đối tác tin cậy trong kỷ nguyên số" (vi) / "Your Trusted Partner in the Digital Era" (en).
2. THE Hero_Section SHALL display a CTA button with the label "Về TechShield" (vi) / "About TechShield" (en).
3. WHEN a visitor clicks the CTA button, THE Hero_Section SHALL scroll the page to the About_Section.
4. THE Hero_Section SHALL display a full-width background image or gradient consistent with the original site's visual style.

---

### Requirement 4: About Section

**User Story:** As a visitor, I want to learn about TechShield's background and strengths, so that I can evaluate the company's credibility.

#### Acceptance Criteria

1. THE About_Section SHALL display a company introduction paragraph in the active locale.
2. THE About_Section SHALL display exactly 4 highlight cards with the following content:
   - "10+ năm kinh nghiệm" / "10+ Years of Experience"
   - "Giải pháp toàn diện" / "Comprehensive Solutions"
   - "Hỗ trợ 24/7" / "24/7 Support"
   - "Chứng nhận quốc tế" / "International Certifications"
3. THE About_Section SHALL display the certifications ISO 27001 and CISSP as badges or icons.
4. WHEN the locale changes, THE About_Section SHALL update all text content to match the selected locale.

---

### Requirement 5: Services Section

**User Story:** As a visitor, I want to see TechShield's service offerings, so that I can determine if they meet my needs.

#### Acceptance Criteria

1. THE Services_Section SHALL display exactly 4 service cards with the following titles in the active locale:
   - "Tư vấn An toàn thông tin" / "Information Security Consulting"
   - "Thiết kế hạ tầng CNTT" / "IT Infrastructure Design"
   - "Mua bán thiết bị CNTT" / "IT Equipment Sales"
   - "Tư vấn phần cứng/phần mềm" / "Hardware/Software Consulting"
2. THE Services_Section SHALL display each service card with a title, a short description, and an icon or illustration.
3. WHEN the locale changes, THE Services_Section SHALL update all text content to match the selected locale.

---

### Requirement 6: Partners Section

**User Story:** As a visitor, I want to see TechShield's strategic partners, so that I can assess the company's ecosystem and credibility.

#### Acceptance Criteria

1. THE Partners_Section SHALL display logos for exactly 6 partners: Microsoft, Cisco, VMware, Dell, HP Enterprise, and Fortinet.
2. THE Partners_Section SHALL display each partner logo at a consistent size with appropriate alt text in the active locale.
3. THE Partners_Section SHALL display a section heading in the active locale.
4. WHEN the locale changes, THE Partners_Section SHALL update the section heading and all alt text to match the selected locale.

---

### Requirement 7: News Section

**User Story:** As a visitor, I want to read recent news from TechShield, so that I can stay informed about the company's activities.

#### Acceptance Criteria

1. THE News_Section SHALL display exactly 3 news article cards.
2. THE News_Section SHALL display each news card with a title, a short excerpt, a publication date, and a thumbnail image.
3. THE News_Section SHALL display all news content in the active locale.
4. WHEN a visitor clicks a news card, THE Website SHALL navigate to a detail page or display a placeholder indicating the article is not yet available.
5. WHEN the locale changes, THE News_Section SHALL update all text content to match the selected locale.

---

### Requirement 8: CTA Section

**User Story:** As a visitor, I want a clear call-to-action to contact TechShield, so that I can easily reach out for services.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a heading and a short description encouraging visitors to contact TechShield, in the active locale.
2. THE CTA_Section SHALL display a contact button with a label in the active locale (e.g., "Liên hệ ngay" / "Contact Us").
3. WHEN a visitor clicks the contact button, THE CTA_Section SHALL navigate to the Footer or a contact form section.
4. WHEN the locale changes, THE CTA_Section SHALL update all text content to match the selected locale.

---

### Requirement 9: Footer

**User Story:** As a visitor, I want to find company contact information and site links in the footer, so that I can get in touch or navigate to other pages.

#### Acceptance Criteria

1. THE Footer SHALL display the company address: "37 Ngõ 599 Phạm Văn Đồng, TDP Hoàng 15, Phường Nghĩa Đô, Hà Nội".
2. THE Footer SHALL display navigation links consistent with the Navbar.
3. THE Footer SHALL display the TechShield copyright notice with the current year.
4. WHEN the locale changes, THE Footer SHALL update all translatable text (navigation labels, section headings) to match the selected locale while keeping the physical address unchanged.

---

### Requirement 10: Hiệu suất và chất lượng kỹ thuật

**User Story:** As a developer, I want the website to meet performance and code quality standards, so that it is maintainable and provides a good user experience.

#### Acceptance Criteria

1. THE Website SHALL achieve a Lighthouse Performance score of ≥ 80 on desktop.
2. THE Website SHALL use Next.js Image component for all images to enable automatic optimization.
3. THE Website SHALL use Tailwind CSS utility classes as the primary styling mechanism, with no inline styles except for dynamic values.
4. THE i18n system SHALL be implemented using `next-intl` or `next-i18next` so that locale files are the single source of truth for all translatable strings.
5. IF a required image asset is missing, THEN THE Renderer SHALL display a placeholder with appropriate alt text rather than a broken image.
6. THE Website SHALL pass Next.js build (`next build`) without errors or type errors when TypeScript is used.
