import{l as nt,_ as rt}from"./LoadingTip.vue_vue_type_script_setup_true_lang-23d256bf.js";import{S as at}from"./Scrubber-97b7b1e0.js";import{t as Q,r as it,h as O}from"./dice-70a649c2.js";import{r as ot}from"./accessors-409bcfe1.js";import{c as ut}from"./colors-98f238a0.js";import{g as st}from"./group-65d164b1.js";import{d as lt,r as I,o as ct,n as ft,c as dt,w as pt,u as P,b as mt,p as ht,g as gt,e as vt,f as yt}from"./index-96404b4d.js";import{r as Z}from"./range-6bc2a9a0.js";import{m as bt}from"./max-adfc8a60.js";import{c as _t}from"./create-b643939c.js";import{f as Ct,i as At}from"./init-2b8ef245.js";import{o as Tt}from"./ordinal-4d4fff60.js";function wt(n,l){let i=0;if(l===void 0)for(let a of n)(a=+a)&&(i+=a);else{let a=-1;for(let f of n)(f=+l(f,++a,n))&&(i+=f)}return i}const Et=n=>+n;var z={},M={},x=34,$=10,V=13;function W(n){return new Function("d","return {"+n.map(function(l,i){return JSON.stringify(l)+": d["+i+'] || ""'}).join(",")+"}")}function Rt(n,l){var i=W(n);return function(a,f){return l(i(a),f,n)}}function H(n){var l=Object.create(null),i=[];return n.forEach(function(a){for(var f in a)f in l||i.push(l[f]=f)}),i}function A(n,l){var i=n+"",a=i.length;return a<l?new Array(l-a+1).join(0)+i:i}function jt(n){return n<0?"-"+A(-n,6):n>9999?"+"+A(n,6):A(n,4)}function kt(n){var l=n.getUTCHours(),i=n.getUTCMinutes(),a=n.getUTCSeconds(),f=n.getUTCMilliseconds();return isNaN(n)?"Invalid Date":jt(n.getUTCFullYear())+"-"+A(n.getUTCMonth()+1,2)+"-"+A(n.getUTCDate(),2)+(f?"T"+A(l,2)+":"+A(i,2)+":"+A(a,2)+"."+A(f,3)+"Z":a?"T"+A(l,2)+":"+A(i,2)+":"+A(a,2)+"Z":i||l?"T"+A(l,2)+":"+A(i,2)+"Z":"")}function Y(n){var l=new RegExp('["'+n+`
\r]`),i=n.charCodeAt(0);function a(e,t){var m,p,s=f(e,function(c,h){if(m)return m(c,h-1);p=c,m=t?Rt(c,t):W(c)});return s.columns=p||[],s}function f(e,t){var m=[],p=e.length,s=0,c=0,h,w=p<=0,C=!1;e.charCodeAt(p-1)===$&&--p,e.charCodeAt(p-1)===V&&--p;function j(){if(w)return M;if(C)return C=!1,z;var T,B=s,N;if(e.charCodeAt(B)===x){for(;s++<p&&e.charCodeAt(s)!==x||e.charCodeAt(++s)===x;);return(T=s)>=p?w=!0:(N=e.charCodeAt(s++))===$?C=!0:N===V&&(C=!0,e.charCodeAt(s)===$&&++s),e.slice(B+1,T-1).replace(/""/g,'"')}for(;s<p;){if((N=e.charCodeAt(T=s++))===$)C=!0;else if(N===V)C=!0,e.charCodeAt(s)===$&&++s;else if(N!==i)continue;return e.slice(B,T)}return w=!0,e.slice(B,p)}for(;(h=j())!==M;){for(var E=[];h!==z&&h!==M;)E.push(h),h=j();t&&(E=t(E,c++))==null||m.push(E)}return m}function v(e,t){return e.map(function(m){return t.map(function(p){return u(m[p])}).join(n)})}function g(e,t){return t==null&&(t=H(e)),[t.map(u).join(n)].concat(v(e,t)).join(`
`)}function y(e,t){return t==null&&(t=H(e)),v(e,t).join(`
`)}function b(e){return e.map(d).join(`
`)}function d(e){return e.map(u).join(n)}function u(e){return e==null?"":e instanceof Date?kt(e):l.test(e+="")?'"'+e.replace(/"/g,'""')+'"':e}return{parse:a,parseRows:f,format:g,formatBody:y,formatRows:b,formatRow:d,formatValue:u}}var Bt=Y(","),Nt=Bt.parse,$t=Y("	"),St=$t.parse;function Ut(n){if(!n.ok)throw new Error(n.status+" "+n.statusText);return n.text()}function qt(n,l){return fetch(n,l).then(Ut)}function J(n){return function(l,i,a){return arguments.length===2&&typeof i=="function"&&(a=i,i=void 0),qt(l,i).then(function(f){return n(f,a)})}}var It=J(Nt),Mt=J(St);function S(){return 0}function U(n){return function(){return n}}function X(n,l,i,a,f){for(var v=n.children,g,y=-1,b=v.length,d=n.value&&(f-i)/n.value;++y<b;)g=v[y],g.x0=l,g.x1=a,g.y0=i,g.y1=i+=g.value*d}var G=(1+Math.sqrt(5))/2;function K(n,l,i,a,f,v){for(var g=[],y=l.children,b,d,u=0,e=0,t=y.length,m,p,s=l.value,c,h,w,C,j,E,T;u<t;){m=f-i,p=v-a;do c=y[e++].value;while(!c&&e<t);for(h=w=c,E=Math.max(p/m,m/p)/(s*n),T=c*c*E,j=Math.max(w/T,T/h);e<t;++e){if(c+=d=y[e].value,d<h&&(h=d),d>w&&(w=d),T=c*c*E,C=Math.max(w/T,T/h),C>j){c-=d;break}j=C}g.push(b={value:c,dice:m<p,children:y.slice(u,e)}),b.dice?Q(b,i,a,f,s?a+=p*c/s:v):X(b,i,a,s?i+=m*c/s:f,v),s-=c,u=e}return g}const xt=function n(l){function i(a,f,v,g,y){K(l,a,f,v,g,y)}return i.ratio=function(a){return n((a=+a)>1?a:1)},i}(G);function Vt(){var n=xt,l=!1,i=1,a=1,f=[0],v=S,g=S,y=S,b=S,d=S;function u(t){return t.x0=t.y0=0,t.x1=i,t.y1=a,t.eachBefore(e),f=[0],l&&t.eachBefore(it),t}function e(t){var m=f[t.depth],p=t.x0+m,s=t.y0+m,c=t.x1-m,h=t.y1-m;c<p&&(p=c=(p+c)/2),h<s&&(s=h=(s+h)/2),t.x0=p,t.y0=s,t.x1=c,t.y1=h,t.children&&(m=f[t.depth+1]=v(t)/2,p+=d(t)-m,s+=g(t)-m,c-=y(t)-m,h-=b(t)-m,c<p&&(p=c=(p+c)/2),h<s&&(s=h=(s+h)/2),n(t,p,s,c,h))}return u.round=function(t){return arguments.length?(l=!!t,u):l},u.size=function(t){return arguments.length?(i=+t[0],a=+t[1],u):[i,a]},u.tile=function(t){return arguments.length?(n=ot(t),u):n},u.padding=function(t){return arguments.length?u.paddingInner(t).paddingOuter(t):u.paddingInner()},u.paddingInner=function(t){return arguments.length?(v=typeof t=="function"?t:U(+t),u):v},u.paddingOuter=function(t){return arguments.length?u.paddingTop(t).paddingRight(t).paddingBottom(t).paddingLeft(t):u.paddingTop()},u.paddingTop=function(t){return arguments.length?(g=typeof t=="function"?t:U(+t),u):g},u.paddingRight=function(t){return arguments.length?(y=typeof t=="function"?t:U(+t),u):y},u.paddingBottom=function(t){return arguments.length?(b=typeof t=="function"?t:U(+t),u):b},u.paddingLeft=function(t){return arguments.length?(d=typeof t=="function"?t:U(+t),u):d},u}const Lt=function n(l){function i(a,f,v,g,y){if((b=a._squarify)&&b.ratio===l)for(var b,d,u,e,t=-1,m,p=b.length,s=a.value;++t<p;){for(d=b[t],u=d.children,e=d.value=0,m=u.length;e<m;++e)d.value+=u[e].value;d.dice?Q(d,f,v,g,s?v+=(y-v)*d.value/s:y):X(d,f,v,s?f+=(g-f)*d.value/s:g,y),s-=d.value}else a._squarify=b=K(l,a,f,v,g,y),b.ratio=l}return i.ratio=function(a){return n((a=+a)>1?a:1)},i}(G),Dt=ut("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"),Ft=n=>(ht("data-v-2b45b6b1"),n=n(),gt(),n),Ot=Ft(()=>vt("div",{class:"chart_box"},null,-1)),Pt=lt({__name:"AnimatedTreemap",setup(n){let l=I(!0),i=I(!1),a=I(),f=async()=>{const v=Z(1790,2e3,10);let g=await Promise.all([It("/src/assets/d3json/animatedTreemap/census-regions.csv"),Mt("/src/assets/d3json/animatedTreemap/population.tsv")]).then(([e,t])=>{let m=t.slice(1).map(s=>({name:s[""],values:v.map(c=>Number((s[c]??"").replace(/,/g,"")))}));return[[...e],m]}).catch(e=>{console.log(e),i.value=!0});if(l.value=!1,!g)return;let[y,b]=g;const d=new Map(y.map(e=>[e.State,e.Region])),u=new Map(y.map(e=>[e.State,e.Division]));a.value={keys:v,group:st(b,e=>d.get(e.name),e=>u.get(e.name))}};return ct(async()=>{var D,F;if(await f(),!a.value)return;await ft();let v=0;function g(r){return y("O-"+(r==null?"":r+"-")+ ++v)}function y(r){return{id:r,href:new URL(`#${r}`,location.href).href+""}}let b=2500,d=a.value,u=at(Z(d.keys.length),{autoplay:!1,delay:b,loop:!1,format:r=>d.keys[r]});const e=document.getElementsByClassName("chart_box")[0];let t=document.getElementsByClassName("observablehq")[0];(D=t==null?void 0:t.parentElement)==null||D.removeChild(t);let m=document.createElement("div");m.classList.add("observablehq"),m.appendChild(u),(F=e.parentElement)==null||F.insertBefore(m,e);let p=d.keys.map((r,o)=>O(d.group).sum(_=>{let k=_.values;return Array.isArray(k)?k[o]:0}).value??0),s=bt(p)??1;const{innerWidth:c,innerHeight:h}=window,w=Vt().tile(Lt).size([c,h]).padding(r=>r.height===1?1:0).round(!0),C=w(O(d.group).sum(r=>{let o=r.values;return Array.isArray(o)?wt(o):0}).sort((r,o)=>(o.value??0)-(r.value??0))),j=_t("svg").attr("viewBox",`0 -20 ${c} ${h+20}`).attr("font-family","sans-serif").attr("font-size",10).style("overflow","visible");let E=Ct(",d");const T=j.append("g").selectAll("g").data(d.keys.map((r,o)=>{const _=C.sum(k=>{let R=k.values;return Array.isArray(R)?R[o]:0}).value??0;return{key:r,value:_,i:o,k:Math.sqrt(_/s)}}).reverse()).join("g").attr("transform",({k:r})=>`translate(${(1-r)/2*c},${(1-r)/2*h})`).attr("opacity",({i:r})=>r>=u.value?1:0).call(r=>r.append("text").attr("y",-6).attr("fill","#777").selectAll("tspan").data(({key:o,value:_})=>[o,` ${E(_)}`]).join("tspan").attr("font-weight",(o,_)=>_===0?"bold":null).text(o=>o)).call(r=>r.append("rect").attr("fill","none").attr("stroke","#ccc").attr("width",({k:o})=>o*c).attr("height",({k:o})=>o*h)),B=j.append("g").selectAll("g").data(L(u.value)).join("g").attr("transform",r=>`translate(${r.x0},${r.y0})`);let N=Tt(d.group.keys(),Dt.map(r=>nt(r,"white")(.5)));B.append("rect").attr("id",r=>(r.leafUid=g("leaf")).id).attr("fill",r=>{for(;r.depth>1;)r=r.parent;let o=r.data;return Array.isArray(o)?N(o[0]):N("")}).attr("width",r=>r.x1-r.x0).attr("height",r=>r.y1-r.y0),B.append("clipPath").attr("id",r=>(r.clipUid=g("clip")).id).append("use").attr("xlink:href",r=>{var o;return((o=r.leafUid)==null?void 0:o.href)??""}),B.append("text").attr("clip-path",r=>{var o;return`url(${((o=r.clipUid)==null?void 0:o.href)??""})`}).selectAll("tspan").data(r=>[r.data.name,E(r.value??0)]).join("tspan").attr("x",3).attr("y",(r,o,_)=>`${+(o===_.length-1)*.3+1.1+o*.9}em`).attr("fill-opacity",(r,o,_)=>o===_.length-1?.7:null).text(r=>r);function L(r){const o=Math.sqrt((C.sum(R=>{let q=R.values;return Array.isArray(q)?q[r]:0}).value??0)/s),_=(1-o)/2*c,k=(1-o)/2*h;return w.size([c*o,h*o])(C).each(R=>(R.x0+=_,R.x1+=_,R.y0+=k,R.y1+=k)).leaves()}let tt=r=>+r.replace(/,/g,""),et=()=>{let r=u.i.value;T.transition().duration(b).attr("opacity",({i:o})=>o>=r?1:0),B.data(L(r)).transition().duration(b).ease(Et).attr("transform",o=>`translate(${o.x0},${o.y0})`).call(o=>o.select("rect").attr("width",_=>_.x1-_.x0).attr("height",_=>_.y1-_.y0)).call(o=>o.select("text tspan:last-child").tween("text",function(_){let k=this;const R=At(tt(k.textContent??""),_.value??0);return function(q){k.textContent=E(R(q))}}))};u.addEventListener("input",et),e.appendChild(j.node())}),(v,g)=>{const y=rt;return mt(),dt(y,{loading:P(l),loadError:P(i)},{default:pt(()=>[Ot]),_:1},8,["loading","loadError"])}}});const ne=yt(Pt,[["__scopeId","data-v-2b45b6b1"]]);export{ne as default};