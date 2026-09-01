import { Author, Category, Tag, Post, Series, MediaItem } from './types';

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'auth-khophi',
    name: 'Khophi',
    handle: 'khophi_the_blogger',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    bio: 'Accra-based Tech Journalist, Software Architect, and Digital Storyteller. Chronicling the African tech boom, Afrobeats culture, and Ghana’s evolving socio-economic landscape.',
    role: 'Founder & Lead Editor',
    location: 'Accra, Ghana 🇬🇭',
    twitter: 'https://twitter.com/khophi_blogger',
    github: 'https://github.com/khophi',
    website: 'https://khophitheblogger.com',
    whatsapp: 'https://wa.me/233240000000',
  },
  {
    id: 'auth-kwame',
    name: 'Kwame Mensah',
    handle: 'kwamemensah',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Fintech Analyst & Mobile Money researcher across West Africa.',
    role: 'Contributing Editor (Fintech & Economics)',
    location: 'Kumasi / Accra, Ghana',
    twitter: 'https://twitter.com/kwame_fintech',
  },
  {
    id: 'auth-ama',
    name: 'Ama Serwaa',
    handle: 'amaserwaa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    bio: 'Culture critic, Afrobeats podcast host, and lifestyle chronicler.',
    role: 'Culture & Entertainment Lead',
    location: 'Accra, Ghana',
    twitter: 'https://twitter.com/ama_culture',
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-tech',
    name: 'Tech & Startups',
    slug: 'tech-startups',
    description: 'Silicon Accra, Mobile Money innovations, AI infrastructure, and West African developer ecosystems.',
    color: '#2563eb',
    postCount: 14,
  },
  {
    id: 'cat-business',
    name: 'Business & Economy',
    slug: 'business-economy',
    description: 'AfCFTA trade dynamics, Ghana Cedi exchange movements, SME entrepreneurship, and agritech.',
    color: '#059669',
    postCount: 9,
  },
  {
    id: 'cat-entertainment',
    name: 'Entertainment & Culture',
    slug: 'entertainment-culture',
    description: 'Afrobeats global dominance, Chale Wote street art festival, Ghanaian cinema, and creative arts.',
    color: '#d97706',
    postCount: 12,
  },
  {
    id: 'cat-politics',
    name: 'Politics & Governance',
    slug: 'politics-governance',
    description: 'Parliamentary bills, civic tech transparency, election analytics, and public policy.',
    color: '#7c3aed',
    postCount: 7,
  },
  {
    id: 'cat-sports',
    name: 'Sports & Football',
    slug: 'sports-football',
    description: 'Ghana Black Stars, Premier League coverage, local academy scouting, and African football tactics.',
    color: '#dc2626',
    postCount: 8,
  },
  {
    id: 'cat-lifestyle',
    name: 'Lifestyle & Living',
    slug: 'lifestyle-living',
    description: 'Accra city guides, dining, tech nomad living in Ghana, and heritage travel destinations.',
    color: '#db2777',
    postCount: 6,
  },
];

export const MOCK_SERIES: Series[] = [
  {
    id: 'series-silicon-accra',
    slug: 'silicon-accra-2026',
    title: 'Silicon Accra: The 2026 Tech Frontier',
    description: 'An in-depth 4-part investigation into venture funding, developer hubs in Osu and East Legon, and satellite internet deployment.',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    postCount: 4,
  },
  {
    id: 'series-momo-revolution',
    slug: 'momo-and-fintech-playbook',
    title: 'The Mobile Money & Cashless Playbook',
    description: 'How interoperability, QR merchant payments, and cross-border remittances are rewriting West African commerce.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    postCount: 3,
  },
  {
    id: 'series-black-stars',
    slug: 'black-stars-tactical-playbook',
    title: 'Black Stars: Tactical Blueprint & AFCON Road',
    description: 'Data analytics, player progression metrics, and coaching breakdown for Ghana’s national football squad.',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    postCount: 3,
  },
];

export const MOCK_TAGS: Tag[] = [
  { id: 'tag-1', name: 'Fintech', slug: 'fintech', postCount: 10 },
  { id: 'tag-2', name: 'Mobile Money', slug: 'mobile-money', postCount: 8 },
  { id: 'tag-3', name: 'Afrobeats', slug: 'afrobeats', postCount: 6 },
  { id: 'tag-4', name: 'Accra Startups', slug: 'accra-startups', postCount: 7 },
  { id: 'tag-5', name: 'Black Stars', slug: 'black-stars', postCount: 5 },
  { id: 'tag-6', name: 'Ghana Cedi', slug: 'ghana-cedi', postCount: 4 },
  { id: 'tag-7', name: 'Next.js & Web', slug: 'nextjs-web', postCount: 9 },
  { id: 'tag-8', name: 'Civic Tech', slug: 'civic-tech', postCount: 3 },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'accra-tech-hub-fintech-boom-2026',
    title: 'The Silicon Accra Boom: How Ghana Is Building West Africa’s Most Resilient Fintech Corridor',
    excerpt: 'From instant QR merchant settlements to cross-border remittances under AfCFTA, Accra’s tech ecosystem has matured into a global powerhouse.',
    content: `
# The Silicon Accra Boom: West Africa's Fintech Frontier

Accra is undergoing an unprecedented digital renaissance. Walk through Airport City, Osu, or East Legon, and you will encounter a thriving ecosystem of engineers, product founders, and venture builders rewriting the financial architecture of West Africa.

## 1. The Mobile Money Interoperability Advantage

Ghana's landmark **Mobile Money Interoperability (MMI)** system laid the bedrock for what is now the most frictionless peer-to-peer and merchant settlement network on the continent. In 2025 alone, transaction volumes surpassed 2.1 trillion GHS.

\`\`\`typescript
interface MomoTransaction {
  network: 'MTN_MOMO' | 'TELECEL_CASH' | 'AT_MONEY';
  amountGhs: number;
  recipientPhone: string;
  instantSettlement: boolean;
}

export async function processGhanaianMomo(tx: MomoTransaction) {
  // Direct integration with Ghana Interbank Payment and Settlement Systems (GhIPSS)
  return await ghipssGateway.dispatch({
    ...tx,
    timestamp: new Date().toISOString(),
    currency: 'GHS',
  });
}
\`\`\`

## 2. Cross-Border Trade & AfCFTA Integration

With the **AfCFTA Secretariat headquartered in Accra**, local startups are piloting instant currency conversion rails that allow a trader in Makola Market to invoice a partner in Nairobi or Abidjan in seconds, bypassing expensive multi-hop correspondent banks.

> [!NOTE]
> *“The goal is not just digital payments, but sovereign financial autonomy across African trade corridors.”* — Khophi

## 3. What Lies Ahead

With high-speed fiber deployments, localized AI developer bootcamps, and supportive regulatory sandboxes from the Bank of Ghana, Accra is no longer just participating in tech — it is setting the tempo.
    `,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1], MOCK_TAGS[3]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    series: {
      id: 'series-silicon-accra',
      title: 'Silicon Accra: The 2026 Tech Frontier',
      order: 1,
    },
    publishedAt: '2026-08-30T10:00:00Z',
    readingTimeMinutes: 6,
    views: 18450,
    likes: 842,
    reactions: { love: 520, fire: 630, clap: 410, insightful: 280 },
    bookmarksCount: 310,
    featured: true,
    seo: {
      metaTitle: 'The Silicon Accra Boom: Ghana Fintech 2026 | khophi_the_blogger',
      metaDescription: 'How Accra is building West Africa’s most resilient fintech corridor with mobile money interoperability and AfCFTA integration.',
    },
  },
  {
    id: 'post-2',
    slug: 'ghana-afrobeats-global-dominance-and-creative-economy',
    title: 'From Highlife Roots to Global Streaming: The Economics of Modern Ghanaian Music & Festivals',
    excerpt: 'How AfroFuture, Detty December, and independent streaming catalogs are transforming Ghana into the global capital of African creative arts.',
    content: `
# The Creative Economy of Modern Ghana

Every December, the world converges on Accra. What began as homecoming celebrations has evolved into a multi-million dollar creative economy bridging traditional Highlife rhythms with modern Afrobeats, Amapiano, and Drill.

## Cultural Infrastructure & Global Tourism

From AfroFuture to the Chale Wote Street Art Festival in Jamestown, Ghana's creative sector contributes significantly to hospitality, airline traffic, and local artisan entrepreneurship.

* **Decentralized Distribution**: Independent Ghanaian musicians now reach global listeners on Spotify and Apple Music directly from home studios in Tema and Kumasi.
* **Live Music Tourism**: December in Ghana injects over $300M into the national economy.
    `,
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[2],
    tags: [MOCK_TAGS[2]],
    author: MOCK_AUTHORS[2],
    status: 'published',
    language: 'en',
    publishedAt: '2026-08-28T14:30:00Z',
    readingTimeMinutes: 5,
    views: 12200,
    likes: 670,
    reactions: { love: 490, fire: 510, clap: 320, insightful: 110 },
    bookmarksCount: 185,
    featured: true,
  },
  {
    id: 'post-3',
    slug: 'black-stars-tactical-blueprint-afcon-2027',
    title: 'Black Stars Tactical Overhaul: High-Pressing Analytics and Young Talents in Europe',
    excerpt: 'A data-driven breakdown of Ghana’s national football squad: transition speeds, midfield ball retention, and the scouting revolution.',
    content: `
# Rebuilding the Black Stars with Data Analytics

Ghanaian football has always possessed raw flair and technical brilliance. In this tactical deep dive, we examine how the technical directorate is integrating data tracking and tactical pressing to prepare for the upcoming continental championship.

## Key Tactical Metrics
1. **Transition Velocity**: Moving the ball from defensive third to final third in under 8 seconds.
2. **Defensive Compactness**: Pressing as a unified block rather than individual isolation.
    `,
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[4],
    tags: [MOCK_TAGS[4]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    series: {
      id: 'series-black-stars',
      title: 'Black Stars: Tactical Blueprint & AFCON Road',
      order: 1,
    },
    publishedAt: '2026-08-25T09:15:00Z',
    readingTimeMinutes: 7,
    views: 9800,
    likes: 540,
    reactions: { love: 310, fire: 420, clap: 290, insightful: 180 },
    bookmarksCount: 140,
    featured: true,
  },
  {
    id: 'post-4',
    slug: 'ghana-cedi-economic-outlook-afcfta-trade',
    title: 'Navigating the Ghana Cedi: Inflation Dynamics, Gold-for-Oil Policy, and SME Resilience',
    excerpt: 'An objective analysis of macroeconomic fiscal policy, gold reserves, and how small businesses in Kumasi and Accra are hedging currency swings.',
    content: `
# Ghana's Macroeconomic Realities & SME Playbooks

Managing currency volatility has pushed Ghanaian entrepreneurs to become some of the sharpest financial operators in Africa. We explore currency stabilization policies, export incentives, and digital hedging tools.
    `,
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[1],
    tags: [MOCK_TAGS[5], MOCK_TAGS[0]],
    author: MOCK_AUTHORS[1],
    status: 'published',
    language: 'en',
    publishedAt: '2026-08-20T11:00:00Z',
    readingTimeMinutes: 6,
    views: 8400,
    likes: 390,
    reactions: { love: 180, fire: 210, clap: 350, insightful: 290 },
    bookmarksCount: 98,
  },
  {
    id: 'post-5',
    slug: 'living-in-accra-tech-nomad-guide',
    title: 'The Tech Nomad’s Guide to Living in Accra: Coworking Hubs, High-Speed Fiber & Hidden Cafes',
    excerpt: 'Everything you need to know about setting up a remote workstation in Cantonments, Labone, and Osu, including internet providers and food spots.',
    content: `
# The Digital Nomad Experience in Accra

Why global engineers and African diaspora professionals are choosing Accra as their remote work home base. Top coworking spaces, fiber connections, and community meetups.
    `,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[5],
    tags: [MOCK_TAGS[3]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    publishedAt: '2026-08-15T08:30:00Z',
    readingTimeMinutes: 5,
    views: 7600,
    likes: 410,
    reactions: { love: 350, fire: 280, clap: 210, insightful: 95 },
    bookmarksCount: 220,
  }
];

export const MOCK_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    name: 'accra-skyline-evening.jpg',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    size: '1.4 MB',
    dimensions: '1920x1080',
    category: 'Architecture & City',
    uploadedAt: '2026-08-30',
  },
  {
    id: 'media-2',
    name: 'afrobeats-festival-lights.jpg',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    size: '2.1 MB',
    dimensions: '2048x1365',
    category: 'Culture & Events',
    uploadedAt: '2026-08-28',
  },
  {
    id: 'media-3',
    name: 'ghana-football-match.jpg',
    url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    size: '980 KB',
    dimensions: '1600x1066',
    category: 'Sports',
    uploadedAt: '2026-08-25',
  },
];

export const MOCK_COMMENTS = [
  {
    id: 'comm-1',
    postId: 'post-1',
    author: {
      name: 'Kofi Mensah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      handle: 'kofimensah',
    },
    content: 'Brilliant breakdown of the GhIPSS settlement mechanics, Khophi! The interoperability between mobile money wallets and commercial bank accounts has completely transformed merchant payments in Accra.',
    createdAt: '2026-08-30T12:30:00Z',
    likes: 24,
    replies: [
      {
        id: 'comm-1-reply-1',
        postId: 'post-1',
        author: {
          name: 'Khophi',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          handle: 'khophi_the_blogger',
        },
        content: 'Thanks Kofi! Next week we are releasing Part 2 analyzing cross-border settlements with Abidjan under AfCFTA.',
        createdAt: '2026-08-30T13:00:00Z',
        likes: 18,
      }
    ],
  },
  {
    id: 'comm-2',
    postId: 'post-1',
    author: {
      name: 'Esi Nyarko',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      handle: 'esinyarko',
    },
    content: 'Shared this to our developer WhatsApp group in East Legon. Spot on analysis.',
    createdAt: '2026-08-30T14:15:00Z',
    likes: 15,
  }
];

