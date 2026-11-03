const fs=require('fs');
const ga="<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-HK2EVP4CWF\"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-HK2EVP4CWF');</script>";
for(const file of ['generate-pages.cjs','generate-all-pages.cjs']){
 let s=fs.readFileSync(file,'utf8');
 if(s.includes('G-HK2EVP4CWF')) continue;
 if(file==='generate-pages.cjs'){
  s=s.replace("const esc=s=>s.replace",`const ga=${JSON.stringify(ga)};const esc=s=>s.replace`);
  s=s.replace('<script type="application/ld+json">${JSON.stringify(json)}</script>','<script type="application/ld+json">${JSON.stringify(json)}</script>${ga}');
 } else {
  s=s.replace("const fs=require('fs'),path=require('path');",`const fs=require('fs'),path=require('path');const ga=${JSON.stringify(ga)};`);
  s=s.replace('<link rel="stylesheet" href="../styles.css">','<link rel="stylesheet" href="../styles.css">${ga}');
 }
 fs.writeFileSync(file,s);
}
console.log('generator templates updated');
