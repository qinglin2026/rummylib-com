const fs=require('fs'),path=require('path');
const root=__dirname;
const files=[];
function walk(dir){for(const name of fs.readdirSync(dir)){const p=path.join(dir,name);const st=fs.statSync(p);if(st.isDirectory())walk(p);else if(name.endsWith('.html'))files.push(p)}}
walk(root);
const tag=`<script async src="https://www.googletagmanager.com/gtag/js?id=G-HK2EVP4CWF"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-HK2EVP4CWF');</script>`;
let changed=0;
for(const file of files){let s=fs.readFileSync(file,'utf8');if(s.includes('G-HK2EVP4CWF'))continue;s=s.replace('</head>',tag+'</head>');fs.writeFileSync(file,s);changed++}
console.log(`GA added to ${changed}/${files.length} HTML pages`);
