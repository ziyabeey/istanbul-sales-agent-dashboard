export interface SolutionPartner {
  id: string;
  name: string;
  logo: string;
  url: string;
  category: string;
  badge?: string;
}

export const SOLUTION_PARTNERS: SolutionPartner[] = [
  {
    id:       'google-cloud',
    name:     'Google Cloud',
    logo:     '/partners/google-cloud.svg',
    url:      'https://cloud.google.com',
    category: 'infrastructure',
    badge:    'Startup Partner',  // Google for Startups
  },
  {
    id:       'anthropic',
    name:     'Anthropic',
    logo:     '/partners/anthropic.svg',
    url:      'https://anthropic.com',
    category: 'ai',
    badge:    'Startup Program',
  },
  {
    id:       'cloudflare',
    name:     'Cloudflare',
    logo:     '/partners/cloudflare.svg',
    url:      'https://cloudflare.com',
    category: 'infrastructure',
    badge:    'Workers Partner',
  },
  {
    id:       'netgsm',
    name:     'NetGSM',
    logo:     '/partners/netgsm.svg',
    url:      'https://www.netgsm.com.tr',
    category: 'communication',
    badge:    'Resmi Entegrasyon',
  },
  {
    id:       'twilio',
    name:     'Twilio',
    logo:     '/partners/twilio.svg',
    url:      'https://twilio.com',
    category: 'communication',
    badge:    'WhatsApp Business',
  },
  {
    id:       'iyzico',
    name:     'İyzico',
    logo:     '/partners/iyzico.svg',
    url:      'https://iyzico.com',
    category: 'payment',
    badge:    'Ödeme Altyapısı',
  },
  {
    id:       'firebase',
    name:     'Firebase',
    logo:     '/partners/firebase.svg',
    url:      'https://firebase.google.com',
    category: 'infrastructure',
  },
  {
    id:       'vapi',
    name:     'Vapi.ai',
    logo:     '/partners/vapi.svg',
    url:      'https://vapi.ai',
    category: 'ai',
    badge:    'Sesli Asistan',
  },
];
