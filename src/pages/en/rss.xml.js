import {getCollection} from 'astro:content';
import rss from '@astrojs/rss';
import {postUrl} from '../../lib/posts';
import {ui} from '../../i18n/ui';
export async function GET(context){const posts=await getCollection('blog',({data})=>data.lang==='en');return rss({title:ui.en['site.title'],description:ui.en['site.description'],site:context.site,items:posts.map(p=>({...p.data,link:postUrl(p)})),customData:'<language>en</language>'});}
