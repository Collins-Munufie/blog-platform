import { Author, Category, Tag, Post, Series, MediaItem } from './types';

export interface FieldNote {
  id: string;
  date: string;
  location: string;
  content: string;
  tag: string;
}

export const MOCK_FIELD_NOTES: FieldNote[] = [
  {
    id: 'fn-1',
    date: '3 hours ago',
    location: 'Fiapre, Sunyani',
    content: '☕ Spent the morning testing Starlink Mini speeds through heavy rain in Sunyani. Solid 145 Mbps down. Game changer for remote engineering teams in Ghana.',
    tag: 'Tech',
  },
  {
    id: 'fn-2',
    date: 'Yesterday',
    location: 'Sunyani Central Market',
    content: 'Talked to 6 merchants in Sunyani today about why they keep physical cash as a backup to MoMo QR payments. Writing up the field report for Thursday’s essay.',
    tag: 'Field Notes',
  },
  {
    id: 'fn-3',
    date: 'Aug 29',
    location: 'Studio, Sunyani',
    content: '🎧 Recording episode 14 of the podcast with Kwame on cross-border AfCFTA trade. Dropping this Friday!',
    tag: 'Podcast',
  },
];

export const MOCK_NOW = {
  currentProject: 'Building a low-latency GhIPSS payment gateway & writing weekly essays on African tech.',
  reading: '“The Prosperity Paradox” by Clayton Christensen & Efosa Ojomo',
  listening: 'Black Sherif, Gyakie, and Highlife classics on vinyl',
  location: 'Sunyani, Ghana 🇬🇭 (Sunny 29°C)',
};

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'auth-khophi',
    name: 'Khophi',
    handle: 'khophi_the_blogger',
    avatar: '/khophi_profile.jpg',
    bio: 'Hey! I’m Khophi. I write essays on building software, mobile money infrastructure, Afrobeats culture, and daily life in Sunyani, Ghana.',
    role: 'Engineer, Writer & Creator',
    location: 'Sunyani, Ghana 🇬🇭',
    twitter: 'https://x.com/cmunufie17588?s=11',
    github: 'https://github.com/khophi',
    website: 'https://khophitheblogger.com',
    whatsapp: 'https://wa.me/233559689849',
  },
  {
    id: 'auth-kwame',
    name: 'Kwame Mensah',
    handle: 'kwamemensah',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    bio: 'Fintech researcher and close friend. Investigating mobile money interoperability across West Africa.',
    role: 'Contributing Writer (Fintech)',
    location: 'Accra, Ghana',
    twitter: 'https://twitter.com/kwame_fintech',
  },
  {
    id: 'auth-ama',
    name: 'Ama Serwaa',
    handle: 'amaserwaa',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    bio: 'Accra culture critic, podcast host, and music enthusiast.',
    role: 'Contributing Writer (Culture)',
    location: 'Accra, Ghana',
    twitter: 'https://twitter.com/ama_culture',
  }
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-tech',
    name: 'Tech & Engineering',
    slug: 'tech-startups',
    description: 'Real notes on building software, mobile money APIs, Starlink in Ghana, and developer tooling in Accra.',
    color: '#2563eb',
    postCount: 14,
  },
  {
    id: 'cat-business',
    name: 'Money & Startups',
    slug: 'business-economy',
    description: 'Unfiltered takes on fintech interoperability, the Ghana Cedi, AfCFTA trade, and bootstrapping businesses.',
    color: '#059669',
    postCount: 9,
  },
  {
    id: 'cat-entertainment',
    name: 'Music & Culture',
    slug: 'entertainment-culture',
    description: 'Afrobeats economics, home studio culture in Tema, Chale Wote street art, and Accra night life.',
    color: '#d97706',
    postCount: 12,
  },
  {
    id: 'cat-sports',
    name: 'Football & Sports',
    slug: 'sports-football',
    description: 'Black Stars tactical analysis, scouting Ghanaian talents in Europe, and the local football scene.',
    color: '#dc2626',
    postCount: 8,
  },
  {
    id: 'cat-lifestyle',
    name: 'Life in Accra',
    slug: 'lifestyle-living',
    description: 'Coffee spots, solar battery setups, apartment hunting in Osu, and personal essays from Ghana.',
    color: '#db2777',
    postCount: 6,
  },
  {
    id: 'cat-politics',
    name: 'Public Policy',
    slug: 'politics-governance',
    description: 'Civic tech transparency, digital ID policies, and parliamentary legislation.',
    color: '#7c3aed',
    postCount: 7,
  },
];

export const MOCK_SERIES: Series[] = [
  {
    id: 'series-silicon-accra',
    slug: 'silicon-accra-2026',
    title: 'Silicon Accra: Field Notes & Essays',
    description: 'An honest look at building software from Ghana: internet reliability, hiring engineering talent, and funding realities.',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    postCount: 4,
  },
  {
    id: 'series-momo-revolution',
    slug: 'momo-and-fintech-playbook',
    title: 'The Mobile Money Playbook',
    description: 'How GhIPSS interoperability and QR merchant codes are changing everyday trade in Ghanaian markets.',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    postCount: 3,
  },
  {
    id: 'series-black-stars',
    slug: 'black-stars-tactical-playbook',
    title: 'Black Stars: A Fan & Data Breakdown',
    description: 'Tactical analysis, transition metrics, and scouting reports for Ghana’s national team.',
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
  { id: 'tag-8', name: 'Remote Work', slug: 'remote-work', postCount: 5 },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'why-i-build-software-from-accra-in-2026',
    title: 'Why I left big tech to build software from an apartment in Osu, Accra',
    excerpt: 'Three years ago, I packed my bags and moved back to Accra. Between solar inverters, fiber broadband, and local startup energy, here is what building from Ghana really looks like.',
    content: `
# Why I left big tech to build software from an apartment in Osu

Three years ago, I packed my bags, left my remote role with a European fintech, and decided to build full-time from an apartment in Osu, Accra.

People often ask me: *"Isn't it harder to build software in Ghana? What about electricity? What about internet?"*

The short answer is yes, there are quirks. But the long answer is that Accra in 2026 has become one of the most energizing, creative, and rewarding places to write code and launch products.

---

## 1. The Real Infrastructure Setup

Let’s be honest about the logistics. To run a high-output engineering routine here, you need two things:

1. **A reliable 5kWh Lithium Solar Backup**: Power flickers occasionally, but with an automated solar inverter, my monitors and Mac don't even blink.
2. **Dual WAN (Fiber + Starlink Mini)**: Fiber handles 90% of our daily builds, with satellite broadband kicking in as an instant zero-downtime failover.

\`\`\`typescript
interface WorkspaceConfig {
  location: 'Osu, Accra 🇬🇭';
  powerSource: 'Solar + Grid Hybrid (5kWh)';
  primaryInternet: 'Fiber 200Mbps';
  backupInternet: 'Starlink Mini';
  coffeeConsumption: '2 cups daily from Labone';
}
\`\`\`

---

## 2. Solving Problems That Actually Matter

When you walk through Makola Market or Oxford Street in Osu, every merchant is using **Mobile Money (MoMo)**. You aren't building theoretical software; you are building tools for merchants who need instant settlement to buy fresh fabric or pay their suppliers across the border in Lomé or Abidjan.

The feedback loops are instant. You write an API endpoint on Tuesday morning, and by Thursday afternoon, you can watch a vendor at a roadside stand accept a payment using your QR flow.

---

## 3. The Creative Energy

There is something contagious about the rhythm of Accra. After a long sprint of coding, you step out to an Afrobeats listening session in Cantonments or grab grilled tilapia with friends by Labadi Beach. It keeps you grounded and deeply inspired.

If you are thinking about spending a season building from Ghana, do it. The water is warm, the coffee is great, and the builders here are crafting the future of African commerce.

— **Khophi**
    `,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[0],
    tags: [MOCK_TAGS[0], MOCK_TAGS[3], MOCK_TAGS[7]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    series: {
      id: 'series-silicon-accra',
      title: 'Silicon Accra: Field Notes & Essays',
      order: 1,
    },
    publishedAt: '2026-08-31T08:00:00Z',
    readingTimeMinutes: 5,
    views: 21450,
    likes: 1240,
    reactions: { love: 720, fire: 830, clap: 510, insightful: 380 },
    bookmarksCount: 420,
    featured: true,
    seo: {
      metaTitle: 'Why I build software from Accra in 2026 | khophi_the_blogger',
      metaDescription: 'An honest, first-person essay on solar setups, dual internet, and the thrill of building startups from Osu, Accra.',
    },
  },
  {
    id: 'post-2',
    slug: 'makola-market-momo-field-report',
    title: 'How Makola Market traders actually use Mobile Money: An on-the-ground report',
    excerpt: 'I spent two days interviewing cloth, spice, and hardware vendors in downtown Accra. Here is how Ghana’s informal economy uses QR codes, USSD, and cash reserves.',
    content: `
# Inside Makola Market: What Tech Founders Get Wrong About African Payments

Last week, my notebook in hand, I spent 48 hours talking to 14 different traders in Makola Market.

While venture capital pitch decks talk about *"cashless digital transformation"*, the reality on the ground is far more nuanced, pragmatic, and ingenious.

## 1. The Three-Second Settlement Rule

If a customer's MoMo payment doesn't trigger an instant SMS confirmation within 3 seconds, the line backs up. Merchants in Makola have developed their own rapid verification workflows:
- Checking the last 4 digits of the GhIPSS transaction ID.
- Keeping dual phone SIMs (MTN + Telecel) to avoid network congestion during peak midday trading hours.

## 2. Why Cash Isn't Going Away (And Why That's Okay)

Traders don't hate digital money; they hate unexpected liquidity lockups. When bank settlement windows are delayed on Friday afternoons, cash remains the ultimate hedge to pay porters and offload deliveries.

Building for Africa means respecting these practical realities rather than pretending cash will disappear overnight.
    `,
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[1],
    tags: [MOCK_TAGS[0], MOCK_TAGS[1]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    series: {
      id: 'series-momo-revolution',
      title: 'The Mobile Money Playbook',
      order: 1,
    },
    publishedAt: '2026-08-28T10:30:00Z',
    readingTimeMinutes: 6,
    views: 16800,
    likes: 890,
    reactions: { love: 590, fire: 620, clap: 410, insightful: 290 },
    bookmarksCount: 280,
    featured: true,
  },
  {
    id: 'post-3',
    slug: 'ghana-afrobeats-home-studio-revolution-tema',
    title: 'Home studios in Tema: How young Ghanaian producers are shaping global sound',
    excerpt: 'From humble bedroom setups with acoustic foam and FL Studio to Billboard charting records — a conversation with Tema’s next generation of beatmakers.',
    content: `
# The Sound of Tema: Bedroom Studios & Global Hits

Walk down Community 4 or Community 7 in Tema on a Saturday evening, and the basslines vibrating through concrete walls will tell you everything you need to know about the future of African music.

We sat down with three producers under 24 who have produced tracks streaming across London, Lagos, and New York — all produced on modest laptops in their family homes.
    `,
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[2],
    tags: [MOCK_TAGS[2]],
    author: MOCK_AUTHORS[2],
    status: 'published',
    language: 'en',
    publishedAt: '2026-08-24T14:00:00Z',
    readingTimeMinutes: 5,
    views: 14200,
    likes: 780,
    reactions: { love: 540, fire: 670, clap: 350, insightful: 120 },
    bookmarksCount: 210,
    featured: true,
  },
  {
    id: 'post-4',
    slug: 'black-stars-midfield-tactical-breakdown',
    title: 'The Black Stars midfield dilemma: Why raw stats don’t tell the whole story',
    excerpt: 'An honest tactical essay on transition velocity, ball retention under pressure, and what Ghana’s national team needs to do before the next AFCON qualifiers.',
    content: `
# An Honest Look at the Black Stars Midfield

As Ghanaian football fans, we celebrate flair. But in modern continental football, control of the second ball and defensive transition velocity are what win tournaments.

In this piece, I look at our pass completion maps from the last 4 international friendlies and explain why a double-pivot system is our best tactical path forward.
    `,
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[3],
    tags: [MOCK_TAGS[4]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    series: {
      id: 'series-black-stars',
      title: 'Black Stars: A Fan & Data Breakdown',
      order: 1,
    },
    publishedAt: '2026-08-20T11:00:00Z',
    readingTimeMinutes: 6,
    views: 10400,
    likes: 620,
    reactions: { love: 380, fire: 490, clap: 310, insightful: 190 },
    bookmarksCount: 160,
  },
  {
    id: 'post-5',
    slug: 'best-coffee-and-coworking-in-accra',
    title: 'Where I write: My top 5 quiet cafes and coworking spots in Accra',
    excerpt: 'Looking for great espresso, solid Wi-Fi, and a quiet table to write or code? Here is my personal guide to working from Cantonments, Labone, and Airport City.',
    content: `
# A Writer's Guide to Accra's Best Coffee & Quiet Corners

Finding a cafe where the music isn't blaring and the power outlets actually work is an art form in Accra. Here are my 5 favorite spots where I do most of my thinking and writing.
    `,
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=80',
    category: MOCK_CATEGORIES[4],
    tags: [MOCK_TAGS[7], MOCK_TAGS[3]],
    author: MOCK_AUTHORS[0],
    status: 'published',
    language: 'en',
    publishedAt: '2026-08-16T09:00:00Z',
    readingTimeMinutes: 4,
    views: 9100,
    likes: 510,
    reactions: { love: 420, fire: 310, clap: 240, insightful: 130 },
    bookmarksCount: 310,
  }
];

export const MOCK_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-1',
    name: 'osu-tech-workspace.jpg',
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    size: '1.4 MB',
    dimensions: '1920x1080',
    category: 'Accra City',
    uploadedAt: '2026-08-30',
  },
  {
    id: 'media-2',
    name: 'afrobeats-listening-party.jpg',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&auto=format&fit=crop&q=80',
    size: '2.1 MB',
    dimensions: '2048x1365',
    category: 'Culture',
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
  {
    id: 'media-4',
    name: 'makola-market-trader.jpg',
    url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    size: '1.2 MB',
    dimensions: '1800x1200',
    category: 'Fintech',
    uploadedAt: '2026-08-20',
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
    content: 'Man, this resonates so much. I moved from Berlin back to East Legon last November. The solar inverter + fiber combo was the best $2k I ever spent. Keep writing these real essays, Khophi!',
    createdAt: '2026-08-31T09:30:00Z',
    likes: 34,
    replies: [
      {
        id: 'comm-1-reply-1',
        postId: 'post-1',
        author: {
          name: 'Khophi',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          handle: 'khophi_the_blogger',
        },
        content: 'Appreciate it Kofi! Let’s grab coffee at Bean There next week when you’re in Osu.',
        createdAt: '2026-08-31T10:00:00Z',
        likes: 22,
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
    content: 'Shared this to our Accra Developers WhatsApp community. The point about Makola merchant feedback loops is 100% spot on.',
    createdAt: '2026-08-31T11:15:00Z',
    likes: 19,
  }
];
