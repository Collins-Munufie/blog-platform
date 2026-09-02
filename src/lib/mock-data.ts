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

export const MOCK_POSTS: Post[] = [];

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
