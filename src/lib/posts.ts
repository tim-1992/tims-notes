import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, getLangFromUrl, type Lang } from '../i18n/ui';
export const prefix = (lang: Lang) => lang === 'en' ? '/en' : '';
export const postUrl = (p: CollectionEntry<'blog'>) => `${prefix(p.data.lang)}/blog/${p.id}/`;
export async function postsFor(lang: Lang) {
 return (await getCollection('blog', ({data}) => data.lang === lang)).sort((a,b) => b.data.pubDate.valueOf()-a.data.pubDate.valueOf() || a.id.localeCompare(b.id));
}
export function minutes(body = '') {
 const cjk=(body.match(/[一-鿿]/g)||[]).length;
 const words=(body.replace(/[一-鿿]/g,' ').match(/[A-Za-z0-9]+/g)||[]).length;
 return Math.max(1,Math.round((cjk+words*1.5)/400));
}
const pairs = [
 ['zh-abtest','en-abtest'], ['zh-ai-mingci','en-ai-glossary'], ['zh-ai-rumen','en-ai-intro'],
 ['zh-analysis-roi-roas-ltv','en-analysis-roi-roas-ltv'], ['zh-shuju-qingxi','en-data-cleaning'],
 ['zh-xuexi-wangzhan','en-learning-sites'], ['zh-tishici','en-prompting'], ['zh-shucang-fenceng','en-warehouse-layers'],
];
export async function languageLink(url: URL) {
 const lang=getLangFromUrl(url), other:Lang=lang==='zh'?'en':'zh';
 const base=url.pathname.replace(/^\/en(?=\/|$)/,'').replace(/\/$/,'')||'/';
 const posts=await getCollection('blog');
 const current=posts.find(p=>postUrl(p).replace(/\/$/,'')===url.pathname.replace(/\/$/,''));
 if(current){
  const id=pairs.find(pair=>pair.includes(current.id))?.find(id=>id!==current.id);
  const translated=posts.find(p=>p.id===id&&p.data.lang===other);
  return {lang:other,href:translated?postUrl(translated):`${prefix(other)}/blog/${current.data.category}/`,exact:!!translated};
 }
 return {lang:other,href:base==='/'?`${prefix(other)}/`:`${prefix(other)}${base}/`,exact:true};
}
export async function searchRecords() {
 return (await getCollection('blog')).map(p=>({title:p.data.title,description:p.data.description,category:categories[p.data.category][p.data.lang],lang:p.data.lang,url:postUrl(p)}));
}

export const calendarDate=(date:Date) => new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(date);
