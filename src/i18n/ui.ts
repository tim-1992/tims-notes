export const languages = {
	zh: '中文',
	en: 'English',
} as const;

export const defaultLang = 'zh';

export const ui = {
	zh: {
		'site.title': 'Tim 的碎碎念',
		'site.description': '数据、代码，和一些想法 —— 记点自己在学的东西',
		'nav.home': '首页',
		'nav.blog': '博客',
		'nav.about': '关于',
		'home.heading': '嗨，这里是我的碎碎念',
		'home.intro':
			'随手记点自己在学、在折腾的东西：数据、代码，还有一些零碎的想法。不一定很专业，就当学习笔记，顺便分享出来。',
		'home.cta': '随便看看 →',
		'home.about_cta': '关于我',
		'home.browse': '按模块逛',
		'home.recent': '最近在写',
		'blog.title': '博客',
		'blog.empty': '暂无文章',
		'about.title': '关于我',
	},
	en: {
		'site.title': "Tim's Notes",
		'site.description': "Data, code, and a few thoughts — notes on what I'm learning",
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.about': 'About',
		'home.heading': 'Hey, these are my notes',
		'home.intro':
			"A running log of things I'm learning and tinkering with — data, code, and a few scattered thoughts. Not necessarily expert-level; just my study notes, shared in case they help.",
		'home.cta': 'Have a look →',
		'home.about_cta': 'About me',
		'home.browse': 'Browse by topic',
		'home.recent': 'Recently',
		'blog.title': 'Blog',
		'blog.empty': 'No posts yet',
		'about.title': 'About Me',
	},
} as const;

export const categories = {
	ai: { zh: 'AI 学习', en: 'Learning AI' },
	warehouse: { zh: '数据仓库', en: 'Data Warehouse' },
	analysis: { zh: '数据分析', en: 'Data Analysis' },
	misc: { zh: '杂七杂八', en: 'Misc' },
} as const;

export const categoryOrder = ['ai', 'warehouse', 'analysis', 'misc'] as const;

// 二级子模块：key 为顶层模块，值为该模块下的子模块（按顺序展示）。
// 没在这里定义子模块的顶层模块，文章直接平铺，不再分二级。
export const subcategories = {
	ai: {
		intro: { zh: 'AI 入门', en: 'Getting Started' },
		faq: { zh: 'AI 常见问题', en: 'Common Questions' },
		skills: { zh: 'AI 的 Skills', en: 'AI Skills' },
		apps: { zh: 'AI 的应用', en: 'Applications' },
		other: { zh: 'AI 其他', en: 'Other' },
	},
	warehouse: {
		collect: { zh: '数据采集', en: 'Data Collection' },
		process: { zh: '数据处理', en: 'Data Processing' },
		model: { zh: '数据建模', en: 'Data Modeling' },
		patterns: { zh: '业务常见模式', en: 'Common Business Patterns' },
		monitor: { zh: '数据监控', en: 'Data Monitoring' },
	},
	analysis: {
		tools: { zh: '分析工具', en: 'Analysis Tools' },
		methods: { zh: '分析方式', en: 'Analysis Methods' },
		metrics: { zh: '指标体系建设', en: 'Metrics System' },
		refs: { zh: '其他分析参考', en: 'Other References' },
	},
	misc: {
		sites: { zh: '常见学习网站', en: 'Learning Sites' },
		skillup: { zh: '技能更新', en: 'Skill Updates' },
		video: { zh: 'AI 视频创作', en: 'AI Video Creation' },
		fiction: { zh: 'AI 小说创作', en: 'AI Fiction Writing' },
	},
} as const;

export type Category = keyof typeof categories;

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
	const [, seg] = url.pathname.split('/');
	if (seg in ui) return seg as Lang;
	return defaultLang;
}

export function useTranslations(lang: Lang) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
		return ui[lang][key] ?? ui[defaultLang][key];
	};
}
