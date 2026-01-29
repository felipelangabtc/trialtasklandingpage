export interface PodcastEpisode {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  youtubeId: string | null;
  externalUrl: string | null;
  guest?: string;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 'how-ai-is-revolutionising-australian-property',
    title: 'How AI Is Revolutionising Australian Property',
    description:
      "Conversation with Hunterwood's John Manciameli about how artificial intelligence is transforming the Australian property market.",
    date: '2025-06-02',
    category: 'Conversation',
    youtubeId: 'LSGz0oBiJ8Q',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'agent-incentives-how-experienced-investors-save',
    title: 'Agent Incentives: How Experienced Investors Save Tens of Thousands',
    description:
      "Conversation with Hunterwood's John Manciameli on understanding agent incentives and how experienced investors use this knowledge to save money.",
    date: '2025-05-28',
    category: 'Conversation',
    youtubeId: 'TvRd4sy-ALM',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'deep-dive-land-supply-price-growth',
    title:
      'A Deep-Dive into Land Supply and Australian Real Estate Price Growth',
    description:
      "Conversation with Hunterwood's John Manciameli exploring how land supply dynamics drive property price growth across Australia.",
    date: '2025-01-20',
    category: 'Conversation',
    youtubeId: 'tZEW2Uha1IM',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'public-housing-property-value-study',
    title: 'Public Housing & Property Value: Insights from a 57,000 Home Study',
    description:
      'Market analysis discussing the impact of public housing on property values, backed by data from a study of 57,000 homes.',
    date: '2024-12-04',
    category: 'Market Analysis',
    youtubeId: 'ZZupNg-CqS8',
    externalUrl: null,
  },
  {
    id: 'uncover-secrets-rising-property-prices',
    title: 'Uncover the Secrets Behind Rising Property Prices through Data',
    description:
      'Guest feature on the Helpmebuy Property Podcast discussing how data reveals the real drivers behind property price movements.',
    date: '2024-12-04',
    category: 'Guest Feature',
    youtubeId: 'Z-lfmcRIZ24',
    externalUrl: null,
  },
  {
    id: 'rate-cuts-property-boom',
    title:
      'Looming Rate Cuts to Ignite Australian Property Boom! How Can You Take Advantage?',
    description:
      'Market update discussing potential rate cuts and how property investors can position themselves to benefit.',
    date: '2024-10-25',
    category: 'Market Update',
    youtubeId: 'nzBmXVh3zu8',
    externalUrl: null,
  },
  {
    id: '5-hidden-biases-real-estate',
    title: '5 Hidden Biases Sabotaging Your Real Estate Success',
    description:
      'Expert talk with John Manciameli about the psychological biases that hold property investors back and how to overcome them.',
    date: '2024-10-18',
    category: 'Conversation',
    youtubeId: 'hqBK8mx4kB8',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'why-trust-microburbs-data',
    title: 'Why Trust Microburbs Data? Revolutionizing Real Estate',
    description:
      'Conversation with John Manciameli about what makes Microburbs data trustworthy and how it is revolutionizing real estate decision-making.',
    date: '2024-10-08',
    category: 'Conversation',
    youtubeId: 'qB4HeoxckAs',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: '5-key-traits-high-quality-data',
    title: 'Unlocking Property Success: 5 Key Traits of High-Quality Data',
    description:
      'Conversation with John Manciameli about identifying high-quality property data and the five traits that separate useful data from noise.',
    date: '2024-09-27',
    category: 'Conversation',
    youtubeId: '2cSXo0uub0A',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'profit-from-data-not-looking-at',
    title: "How To Profit From The Data You're Not Looking At",
    description:
      'Guest feature on Aus Property Investors discussing overlooked data sources that can give investors an edge.',
    date: '2024-08-07',
    category: 'Guest Feature',
    youtubeId: 'M4yvEl30I0I',
    externalUrl: null,
  },
  {
    id: 'power-of-microburbs-mum-dad-investors',
    title:
      'The Power of Microburbs: Unlocking Real Estate Insights for Mum and Dad Investors',
    description:
      'Guest feature on John Manciameli Podcast about how everyday investors can use Microburbs to make smarter property decisions.',
    date: '2024-07-05',
    category: 'Guest Feature',
    youtubeId: 'zSKClocov3U',
    externalUrl: null,
    guest: 'John Manciameli',
  },
  {
    id: 'biggest-mistake-aussie-property-investors',
    title:
      'The Biggest Mistake Aussie Property Investors Make: Microburbs Suburb Data',
    description:
      "Conversation with DSR Data's Jeremy Sheppard about the most common mistake Australian property investors make and how suburb-level data can mislead.",
    date: '2024-01-30',
    category: 'Conversation',
    youtubeId: 'b3AJ2Ooa3sg',
    externalUrl: null,
    guest: 'Jeremy Sheppard',
  },
  {
    id: 'using-data-ai-better-property-decisions',
    title: 'Using Data & AI for Better Property Decisions',
    description:
      'Guest feature on the Property Buyer Podcast about leveraging data science and AI for smarter property analysis.',
    date: '2023-11-22',
    category: 'Guest Feature',
    youtubeId: null,
    externalUrl: 'https://www.podbean.com/ew/pb-d8vaj-1505ed7',
  },
  {
    id: 'does-ai-hold-key-accurate-property-analysis',
    title: 'Does AI Hold the Key to Accurate Property Analysis?',
    description:
      'Guest feature on the Elephant in the Room Podcast exploring whether AI can deliver more accurate property analysis than traditional methods.',
    date: '2023-08-14',
    category: 'Guest Feature',
    youtubeId: 'dRmVsDH6uKE',
    externalUrl: null,
  },
  {
    id: 'newcastle-nsw-best-bits-kent-lardner',
    title:
      'Newcastle (NSW): The Best Bits from Local Real Estate Guru, Kent Lardner',
    description:
      'Microburbs Podcast Episode 3 — Local insights into the Newcastle property market with real estate expert Kent Lardner.',
    date: '2023-05-08',
    category: 'Microburbs Podcast',
    youtubeId: 'euKl0tduy98',
    externalUrl: null,
    guest: 'Kent Lardner',
  },
  {
    id: 'mornington-peninsula-insiders-guide-michael-sier',
    title:
      "Mornington Peninsula: An Insider's Guide from Local Expert, Michael Sier",
    description:
      'Microburbs Podcast Episode 2 — Local insights into the Mornington Peninsula property market with expert Michael Sier.',
    date: '2023-04-20',
    category: 'Microburbs Podcast',
    youtubeId: 'peYv1DdtdNQ',
    externalUrl: null,
    guest: 'Michael Sier',
  },
  {
    id: 'what-migrants-succeed-australia-robyn-vogels',
    title:
      'What Migrants Succeed in Australia? Robyn Vogels, Migration Agent, Interview',
    description:
      'Microburbs Podcast Episode 1 — Discussion about migration patterns in Australia and how they impact property markets.',
    date: '2023-04-10',
    category: 'Microburbs Podcast',
    youtubeId: 'A0SZloJSsa8',
    externalUrl: null,
    guest: 'Robyn Vogels',
  },
  {
    id: 'truth-about-property-prices-up-down',
    title: 'The truth about what really makes property prices go up or down',
    description:
      'Guest feature on the Elephant in the Room Podcast — a deep analysis of the real factors that drive property prices in Australia.',
    date: '2018-07-20',
    category: 'Guest Feature',
    youtubeId: null,
    externalUrl: 'https://www.theelephantintheroom.com.au/podcasts/016',
  },
];

export function getEpisodeById(id: string): PodcastEpisode | undefined {
  return PODCAST_EPISODES.find((ep) => ep.id === id);
}

export function getAllEpisodeIds(): string[] {
  return PODCAST_EPISODES.map((ep) => ep.id);
}
