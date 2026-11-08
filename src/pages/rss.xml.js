import {getCollection} from 'astro:content';
import rss from '@astrojs/rss';
import {postUrl} from '../lib/posts';
import {ui} from '../i18n/ui';
export async function GET(context){const posts=await getCollection('blog',({data})=>data.lang==='zh');return rss({title:ui.zh['site.title'],description:ui.zh['site.description'],site:context.site,items:posts.map(p=>({...p.data,link:postUrl(p)})),customData:'<language>zh-CN</language>'});}
