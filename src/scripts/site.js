const en = document.documentElement.lang === 'en';
document.documentElement.classList.add('js');
const $ = s => document.querySelector(s);
const dialog = $('#searchDialog'), input = $('#searchInput'), results = $('#searchResults');
let records = null, loading = null;
function message(text) { const p = document.createElement('p'); p.className='search-empty';p.textContent=text;results.replaceChildren(p); }
function search() {
 if(!records)return;
 const query=input.value.trim().toLocaleLowerCase();
 const matches=records.filter(p=>p.lang===(en?'en':'zh')&&`${p.title} ${p.description} ${p.category}`.toLocaleLowerCase().includes(query));
 results.replaceChildren();
 if(!matches.length){message(en?`No notes found for “${input.value}”. Try “AI” or “data”.`:`没有找到“${input.value}”。试试「AI」或「数据」。`);return;}
 for(const p of matches.slice(0,query?50:6)){
  const a=document.createElement('a');a.href=p.url;a.className='search-result';const category=document.createElement('span');category.textContent=p.category;a.append(category,document.createTextNode(p.title));results.append(a);
 }
}
async function openSearch() {
 if(!dialog.open)dialog.showModal();input.value='';input.focus();
 if(records){search();return;}
 message(en?'Loading notes…':'正在读取笔记…');
 try{
  loading ||= fetch('/search-index.json').then(r=>{if(!r.ok)throw new Error('Search index unavailable');return r.json();});
  records=await loading;search();
 }catch{loading=null;message(en?'Could not load search. Close and reopen to try again, or browse the notes.':'搜索暂时没能加载，关闭后重试，或从文章列表浏览。');}
}
document.querySelectorAll('.search-trigger').forEach(b=>b.addEventListener('click',openSearch));
$('.close-search')?.addEventListener('click',()=>dialog.close());
input?.addEventListener('input',search);
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.addEventListener('keydown',e=>{if((e.key==='/'||((e.ctrlKey||e.metaKey)&&e.key==='k'))&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)&&!document.activeElement.isContentEditable){e.preventDefault();openSearch();}});
const motion=$('.motion-toggle');
motion?.addEventListener('click',()=>{const paused=document.body.classList.toggle('motion-paused');motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?motion.dataset.resume:motion.dataset.pause);document.dispatchEvent(new CustomEvent('grape-motion',{detail:{paused}}));});
for(const archive of document.querySelectorAll('[data-archive]')){
 const rows=[...archive.querySelectorAll('.article-row')],links=[...archive.querySelectorAll('[data-category]')];
 const more=archive.querySelector('.load-more'),empty=archive.querySelector('.archive-empty');
 const step=Number(archive.dataset.limit);let count=step,category='all';
 function render(){
  let total=0;for(const row of rows){const matches=category==='all'||row.dataset.postCategory===category;row.hidden=!matches||++total>count;}
  archive.querySelector('.archive-total').textContent=`${total} ${archive.dataset.countLabel}`;more.hidden=total<=count;empty.hidden=total>0;
 }
 links.forEach(link=>link.addEventListener('click',e=>{if(e.button!==0||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();category=link.dataset.category;count=step;links.forEach(a=>{a.classList.toggle('active',a===link);if(a===link)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});render();}));
 more.addEventListener('click',()=>{count+=step;render();});render();
}
document.querySelectorAll('.prose table').forEach(table=>{const wrap=document.createElement('div');wrap.className='table-wrap';table.replaceWith(wrap);wrap.append(table);});
const progress=$('.reading-progress');
if(progress){const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=max>0?`${Math.min(100,scrollY/max*100)}%`:'0';};addEventListener('scroll',update,{passive:true});update();}
const tocLinks=[...document.querySelectorAll('.article-toc a')];
if(tocLinks.length){const byId=new Map(tocLinks.map(a=>[decodeURIComponent(a.hash.slice(1)),a]));const observer=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){tocLinks.forEach(a=>a.classList.remove('on'));byId.get(e.target.id)?.classList.add('on');}},{rootMargin:'-10% 0px -75% 0px'});for(const id of byId.keys()){const el=document.getElementById(id);if(el)observer.observe(el);}}
