import{a as d}from"./ordinal-cb3c4180.js";function c(n){return n}function k(n,...t){return g(n,c,c,t)}function m(n,t,...u){return g(n,c,t,u)}function g(n,t,u,i){return function a(f,s){if(s>=i.length)return u(f);const r=new d,l=i[s++];let y=-1;for(const o of f){const e=l(o,++y,f),p=r.get(e);p?p.push(o):r.set(e,[o])}for(const[o,e]of r)r.set(o,a(e,s));return t(r)}(n,0)}export{k as g,m as r};