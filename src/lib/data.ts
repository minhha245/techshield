export interface ServiceItem {
  id: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

export interface PartnerItem {
  id: string;
  name: string;
  logo: string;
  altKey: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  titleKey: string;
  excerptKey: string;
  date: string;
  thumbnail: string;
}

export interface HighlightCard {
  id: string;
  icon: string;
  labelKey: string;
}

export const SERVICES: ServiceItem[] = [
  { id: 'consulting',        icon: 'Shield',       titleKey: 'services.items.consulting.title',        descriptionKey: 'services.items.consulting.description' },
  { id: 'infrastructure',    icon: 'Server',       titleKey: 'services.items.infrastructure.title',    descriptionKey: 'services.items.infrastructure.description' },
  { id: 'equipment',         icon: 'ShoppingCart', titleKey: 'services.items.equipment.title',         descriptionKey: 'services.items.equipment.description' },
  { id: 'hardware_software', icon: 'Cpu',          titleKey: 'services.items.hardware_software.title', descriptionKey: 'services.items.hardware_software.description' },
];

export const PARTNERS: PartnerItem[] = [
  { id: 'microsoft', name: 'Microsoft',     logo: '/images/partners/microsoft.svg', altKey: 'partners.alt.microsoft' },
  { id: 'cisco',     name: 'Cisco',         logo: '/images/partners/cisco.svg',     altKey: 'partners.alt.cisco' },
  { id: 'vmware',    name: 'VMware',        logo: '/images/partners/vmware.svg',    altKey: 'partners.alt.vmware' },
  { id: 'dell',      name: 'Dell',          logo: '/images/partners/dell.svg',      altKey: 'partners.alt.dell' },
  { id: 'hpe',       name: 'HP Enterprise', logo: '/images/partners/hpe.svg',       altKey: 'partners.alt.hpe' },
  { id: 'fortinet',  name: 'Fortinet',      logo: '/images/partners/fortinet.svg',  altKey: 'partners.alt.fortinet' },
];

export const NEWS_ITEMS: NewsItem[] = [
  { id: 'news1', slug: 'iso-27001-2022',  titleKey: 'news.items.news1.title', excerptKey: 'news.items.news1.excerpt', date: '2024-12-15', thumbnail: '/images/news/iso-cert.svg' },
  { id: 'news2', slug: 'conference-2024', titleKey: 'news.items.news2.title', excerptKey: 'news.items.news2.excerpt', date: '2024-12-10', thumbnail: '/images/news/conference.svg' },
  { id: 'news3', slug: 'cloud-security',  titleKey: 'news.items.news3.title', excerptKey: 'news.items.news3.excerpt', date: '2024-12-05', thumbnail: '/images/news/cloud.svg' },
];

export const HIGHLIGHTS: HighlightCard[] = [
  { id: 'experience',     icon: 'Clock',      labelKey: 'about.highlights.experience' },
  { id: 'solutions',      icon: 'Layers',     labelKey: 'about.highlights.solutions' },
  { id: 'support',        icon: 'Headphones', labelKey: 'about.highlights.support' },
  { id: 'certifications', icon: 'Award',      labelKey: 'about.highlights.certifications' },
];
