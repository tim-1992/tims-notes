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

// 三层结构：分类(category) → 大模块(module) → 子模块(submodule) → 文章。
// 每个分类是有序的大模块列表；每个大模块带一句话描述，其下是有序的子模块列表。
// 子模块是「桶」，可容纳多篇文章；文章用 frontmatter 的 module + submodule 归位。
// subs 为空的大模块，文章直接挂在大模块下，不再分三级。
export const modules = {
	ai: [
		{
			key: 'recognize',
			label: { zh: '认识 AI', en: 'Meet AI' },
			desc: { zh: '为什么学、是什么、有哪些类型', en: 'Why learn it, what it is, what kinds exist' },
			subs: [
				{ key: 'types', label: { zh: '类型与全景', en: 'Types & Landscape' } },
				{ key: 'vendors', label: { zh: '厂商与模型', en: 'Vendors & Models' } },
				{ key: 'why', label: { zh: '为什么学 AI', en: 'Why Learn AI' } },
				{ key: 'history', label: { zh: '发展简史', en: 'A Brief History' } },
			],
		},
		{
			key: 'concepts',
			label: { zh: '概念与原理', en: 'Concepts & Principles' },
			desc: { zh: '名词、核心概念、大模型怎么工作', en: 'Terms, core concepts, how models work' },
			subs: [
				{ key: 'glossary', label: { zh: '名词速查', en: 'Glossary' } },
				{ key: 'core', label: { zh: '核心概念', en: 'Core Concepts' } },
				{ key: 'how', label: { zh: '大模型怎么工作', en: 'How LLMs Work' } },
			],
		},
		{
			key: 'usage',
			label: { zh: '上手与应用', en: 'Getting Hands-On' },
			desc: { zh: '学习路径、提示词、工具实操', en: 'Learning path, prompting, using the tools' },
			subs: [
				{ key: 'path', label: { zh: '学习路径', en: 'Learning Path' } },
				{ key: 'prompt', label: { zh: '提示词', en: 'Prompting' } },
				{ key: 'tools', label: { zh: '工具实操', en: 'Tools in Practice' } },
			],
		},
		{
			key: 'engineering',
			label: { zh: '工程与落地', en: 'Engineering & Delivery' },
			desc: { zh: 'RAG、编排、部署、框架生态', en: 'RAG, orchestration, deployment, frameworks' },
			subs: [
				{ key: 'rag', label: { zh: 'RAG / 知识库', en: 'RAG / Knowledge Base' } },
				{ key: 'deploy', label: { zh: '编排与部署', en: 'Orchestration & Deployment' } },
				{ key: 'framework', label: { zh: '框架与生态', en: 'Frameworks & Ecosystem' } },
			],
		},
		{
			key: 'frontier',
			label: { zh: '边界与前沿', en: 'Limits & Frontier' },
			desc: { zh: '局限、安全、评测、趋势', en: 'Limits, safety, benchmarks, trends' },
			subs: [
				{ key: 'limits', label: { zh: '局限与坑', en: 'Limits & Pitfalls' } },
				{ key: 'safety', label: { zh: '安全与合规', en: 'Safety & Compliance' } },
				{ key: 'trend', label: { zh: '评测与趋势', en: 'Benchmarks & Trends' } },
			],
		},
	],
	warehouse: [
		{ key: 'collect', label: { zh: '数据采集', en: 'Data Collection' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'process', label: { zh: '数据处理', en: 'Data Processing' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'model', label: { zh: '数据建模', en: 'Data Modeling' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'patterns', label: { zh: '业务常见模式', en: 'Common Business Patterns' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'monitor', label: { zh: '数据监控', en: 'Data Monitoring' }, desc: { zh: '', en: '' }, subs: [] },
	],
	analysis: [
		{ key: 'tools', label: { zh: '分析工具', en: 'Analysis Tools' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'methods', label: { zh: '分析方式', en: 'Analysis Methods' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'metrics', label: { zh: '指标体系建设', en: 'Metrics System' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'refs', label: { zh: '其他分析参考', en: 'Other References' }, desc: { zh: '', en: '' }, subs: [] },
	],
	misc: [
		{ key: 'sites', label: { zh: '常见学习网站', en: 'Learning Sites' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'skillup', label: { zh: '技能更新', en: 'Skill Updates' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'video', label: { zh: 'AI 视频创作', en: 'AI Video Creation' }, desc: { zh: '', en: '' }, subs: [] },
		{ key: 'fiction', label: { zh: 'AI 小说创作', en: 'AI Fiction Writing' }, desc: { zh: '', en: '' }, subs: [] },
	],
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
