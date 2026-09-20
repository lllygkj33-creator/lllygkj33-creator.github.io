// 首页 Motion Landing 的全部内容数据：字幕文案 + 目录卡片
// 目录卡片以后替换媒体时，只改这里的 media / poster（或加 video），不用动组件。

/** 第一段字幕：静态整句与逐词组补全两种形态混排 */
export const INTRO_CAPTIONS = {
  // 逐词组补全：每一步只让"新增的那一段"进入，旧文字保持原位
  progressive: [
    { phrases: ['SEO.', 'SEO. GEO.', 'SEO. GEO. XEO.', 'SEO. GEO. XEO. In Google.'], step: 400, hold: 320 },
    { phrases: ['All Things.', 'All Things You Wanna.', 'All Things You Wanna Know.'], step: 450, hold: 340 },
  ],
  // 整句弹入：可以插在两段 progressive 之间制造节奏
  plain: [
    { text: 'Google Algorithms.', enter: 300, hold: 420, exit: 200 },
    { text: 'Real Cases.', enter: 280, hold: 380, exit: 200 },
  ],
  last: 'At Karina Studio.',
  cta: 'GO Document Now →',
};

/** 目标锚点：GO 只做平滑滚动，不改 URL */
export const HERO_ANCHOR = 'karina-studio';

export const HOME_CARDS = [
  {
    id: 'seo',
    index: '01',
    title: 'SEO',
    description: 'Search systems, content, technical foundations.',
    href: '/seo/',
    mediaType: 'image',            // image | video | fallback
    media: '/media/home/seo.svg',
    poster: '/media/home/seo.svg',
    video: '',                     // 以后填 /media/home/seo.mp4 并把 mediaType 改成 video
    size: 'sm',
    offset: 'down',
  },
  {
    id: 'geo',
    index: '02',
    title: 'GEO',
    description: 'Answers, entities, machines, visibility.',
    href: '/geo/',
    mediaType: 'image',
    media: '/media/home/geo.svg',
    poster: '/media/home/geo.svg',
    video: '',
    size: 'md',
    offset: 'mid',
  },
  {
    id: 'social',
    index: '03',
    title: '社媒联动',
    description: 'Community, content, discovery, demand.',
    href: '/social/',
    mediaType: 'image',
    media: '/media/home/social.svg',
    poster: '/media/home/social.svg',
    video: '',
    size: 'md',
    offset: 'up',
  },
  {
    id: 'google-algorithm',
    index: '04',
    title: 'Google Algorithms',
    description: 'Quality, semantics, links and signals.',
    href: '/google-algorithm/',
    mediaType: 'image',
    media: '/media/home/google-algorithm.svg',
    poster: '/media/home/google-algorithm.svg',
    video: '',
    size: 'lg',
    offset: 'top',
  },
  {
    id: 'skyscraper',
    index: '05',
    title: '摩天大楼优化',
    description: 'Gap analysis, evidence and content upgrades.',
    href: '/skyscraper/',
    mediaType: 'image',
    media: '/media/home/skyscraper.svg',
    poster: '/media/home/skyscraper.svg',
    video: '',
    size: 'md',
    offset: 'mid',
  },
];
