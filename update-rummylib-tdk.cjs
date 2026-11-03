const fs=require('fs'), path=require('path');
const root=process.cwd();
const files=['index.html','privacy.html',...fs.readdirSync(path.join(root,'games')).filter(f=>f.endsWith('.html')).map(f=>'games/'+f)];
function esc(s){return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;')}
for(const rel of files){
 const file=path.join(root,rel); let s=fs.readFileSync(file,'utf8');
 const m=s.match(/<title>([\s\S]*?)<\/title>/i); if(!m) continue;
 const oldTitle=m[1].replace(/&amp;/g,'&');
 const isHome=rel==='index.html';
 let title, desc;
 if(isHome){
  title='Rummylib Rummy Directory | Rummy Games & Guides';
  desc='Rummylib is a curated rummy directory for comparing Indian rummy games, app guides, features and platform details before you play.';
 } else if(rel==='privacy.html'){
  title='Privacy Policy | Rummylib Rummy Directory';
  desc='Read the privacy policy for Rummylib, an independent rummy game directory and guide website.';
 } else {
  const app=oldTitle.split(/\s+(?:App Guide|Download Guide)/i)[0].replace(/\s*\|.*$/,'').trim();
  title=`${app} Rummy Guide & App Details | Rummylib`;
  desc=`Explore the ${app} rummy app guide on Rummylib, including features, platform details and identity checks for players comparing rummy games.`;
 }
 s=s.replace(/<title>[\s\S]*?<\/title>/i,`<title>${esc(title)}</title>`);
 s=s.replace(/<meta name="description" content="[^"]*"\s*\/?>/i,`<meta name="description" content="${esc(desc)}">`);
 s=s.replace(/<meta property="og:title" content="[^"]*"\s*\/?>/i,`<meta property="og:title" content="${esc(title)}">`);
 s=s.replace(/<meta property="og:description" content="[^"]*"\s*\/?>/i,`<meta property="og:description" content="${esc(desc)}">`);
 s=s.replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/i,`<meta name="twitter:title" content="${esc(title)}">`);
 s=s.replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/i,`<meta name="twitter:description" content="${esc(desc)}">`);
 s=s.replace(/Rummy Appendix/g,'Rummylib').replace(/rummy appendix/gi,'Rummylib rummy directory');
 fs.writeFileSync(file,s);
}
fs.copyFileSync(path.join(root,'index.html'),path.join(root,'rummylib-com.html'));
console.log(`Updated ${files.length} pages and created rummylib-com.html`);
