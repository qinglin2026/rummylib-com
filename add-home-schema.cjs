const fs = require('fs');
const {site, apps} = require('./seo-data.cjs');
const homepage = {'@context':'https://schema.org','@graph':[
 {'@type':'Organization','@id':`${site.url}/#organization`,name:site.name,url:site.url,logo:site.logo},
 {'@type':'WebSite','@id':`${site.url}/#website`,name:site.name,url:site.url,publisher:{'@id':`${site.url}/#organization`},potentialAction:{'@type':'SearchAction',target:`${site.url}/?q={search_term_string}`,'query-input':'required name=search_term_string'}},
 {'@type':'WebPage','@id':`${site.url}/#webpage`,url:`${site.url}/`,name:'Rummy Appendix Android Game Directory',isPartOf:{'@id':`${site.url}/#website`}},
 {'@type':'ItemList','@id':`${site.url}/#directory`,name:'Rummy Appendix game directory',itemListElement:apps.map((a,i)=>({'@type':'ListItem',position:i+1,name:a.name,url:`${site.url}/games/${a.slug}.html`}))},
 {'@type':'FAQPage',mainEntity:[
  {'@type':'Question',name:'What is Rummy Appendix?',acceptedAnswer:{'@type':'Answer',text:'Rummy Appendix is an independent game directory that helps Android players compare rummy, card and casual apps by identity, platform and features.'}},
  {'@type':'Question',name:'How do I choose an Android rummy app?',acceptedAnswer:{'@type':'Answer',text:'Start with the publisher, package name, platform support and the features that match your preferred play style. Each guide links back to the directory.'}},
  {'@type':'Question',name:'Is Rummy Appendix the developer of these apps?',acceptedAnswer:{'@type':'Answer',text:'No. Rummy Appendix is an independent information site. The publisher and package name shown on each guide identify the app owner supplied for that listing.'}}
 ]}
]};
let html=fs.readFileSync('index.html','utf8');
html=html.replace(/<script type="application\/ld\+json">.*?<\/script>/,`<script type="application/ld+json">${JSON.stringify(homepage)}</script>`);
fs.writeFileSync('index.html',html);

