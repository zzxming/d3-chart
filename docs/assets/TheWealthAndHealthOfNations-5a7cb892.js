import{r as Q,s as X,_ as Z}from"./LoadingTip.vue_vue_type_script_setup_true_lang-748e4402.js";import{d as tt}from"./index-677af89f.js";import{S as et}from"./Scrubber-97b7b1e0.js";import{a as at}from"./axios-4a70c6fc.js";import{t as nt,c as ot,i as y,l as rt,b as N,e as lt,d as j}from"./linear-95918312.js";import{b as it}from"./init-880e203b.js";import{u as st}from"./month-d9a0f40c.js";import{m as A}from"./min-7292b72b.js";import{m as ct}from"./max-adfc8a60.js";import{a as pt,b as ut}from"./axis-a25b44c4.js";import{d as mt,r as f,o as ft,n as dt,a as ht,c as gt,b as _t,u as D,e as xt,p as yt,g as vt,f as bt,_ as wt}from"./index-194efed9.js";function H(a){return function(r){return r<0?-Math.pow(-r,a):Math.pow(r,a)}}function Et(a){return a<0?-Math.sqrt(-a):Math.sqrt(a)}function Mt(a){return a<0?-a*a:a*a}function At(a){var r=a(y,y),s=1;function d(){return s===1?a(y,y):s===.5?a(Et,Mt):a(H(s),H(1/s))}return r.exponent=function(p){return arguments.length?(s=+p,d()):s},rt(r)}function P(){var a=At(nt());return a.copy=function(){return ot(a,P()).exponent(a.exponent())},it.apply(a,arguments),a}function Tt(){return P.apply(null,arguments).exponent(.5)}var v=Q(),kt=Math.PI/3,Ct=Math.PI*2/3;function St(a){var r;return a=(.5-a)*Math.PI,v.r=255*(r=Math.sin(a))*r,v.g=255*(r=Math.sin(a+kt))*r,v.b=255*(r=Math.sin(a+Ct))*r,v+""}const Bt=a=>(yt("data-v-6fced640"),a=a(),vt(),a),qt=Bt(()=>bt("div",{class:"chart_box"},null,-1)),It=mt({__name:"TheWealthAndHealthOfNations",setup(a){let r=f(4),s=f(!1),d=f(!0),p=f(tt().attr("class","d3_tip").offset([-10,0]).html((l,i)=>`<span class="d3_tip-name">${i.name??"没有名字"}</span>`)),c=f(),b=f(),W=async()=>{s.value=!1,d.value=!0;let l=await new Promise(async(i,n)=>{i((await at.get("/d3json/TheWealthAndHealthOfNations.json")).data)}).catch(i=>{console.log(i),s.value=!0});d.value=!1,l&&(c.value=l.range,b.value=l.data)};return ft(async()=>{var S,B;if(await W(),!c.value||!b.value)return;await dt();const{innerWidth:l,innerHeight:i}=window,n={top:40,right:20,bottom:40,left:40},h=X(".chart_box").append("svg").attr("viewBox",[0,0,l,i]).attr("width",l-n.left-n.right).attr("color","#fff");let u=N([c.value.min_money,c.value.max_money],[n.left,l-n.right]),m=N([c.value.min_paper_amount,c.value.max_paper_amount],[i-n.bottom,n.top]),$=h.append("g"),L=t=>t.attr("transform",`translate(0,${i-n.bottom})`).call(pt(u).ticks(l/80)).call(e=>e.select(".domain").remove()).call(e=>e.append("text").attr("x",l-n.right-10).attr("y",n.bottom-5).attr("fill","currentColor").attr("text-anchor","end").attr("font-size","12px").text("经费投入 (万元) →"));$.call(L);let O=h.append("g"),R=t=>t.attr("transform",`translate(${n.left}, 0)`).call(ut(m)).call(e=>e.select(".domain").remove()).call(e=>e.append("text").attr("x",-n.left).attr("y",20).attr("fill","currentColor").attr("text-anchor","start").attr("font-size","12px").text("↑ 文章产出量（篇）"));O.call(R);let z=h.append("g"),U=t=>t.attr("stroke","currentColor").attr("stroke-opacity",.1).call(e=>e.append("g").selectAll("line").data(u.ticks()).join("line").attr("x1",o=>.5+u(o)).attr("x2",o=>.5+u(o)).attr("y1",n.top).attr("y2",i-n.bottom)).call(e=>e.append("g").selectAll("line").data(m.ticks()).join("line").attr("y1",o=>.5+m(o)).attr("y2",o=>.5+m(o)).attr("x1",n.left).attr("x2",l-n.right));z.call(U);let T=Tt([c.value.min_fund_amount,c.value.max_fund_amount],[r.value,l/24]),w=t=>t.map(([e,o])=>[new Date(Date.UTC(e,0,1)),o]),g=b.value.map(t=>({name:t.name,region:t.region,income:w(t.income),population:w(t.population),lifeExpectancy:w(t.lifeExpectancy)})),k=t=>g.map(e=>({name:e.name,region:e.region,income:E(e.income,t),population:E(e.population,t),lifeExpectancy:E(e.lifeExpectancy,t)})),F=lt(t=>t[0]).left,E=(t,e)=>{const o=F(t,e,0,t.length-1),x=t[o];if(o>0){const q=t[o-1],I=(e.getTime()-x[0].getTime())/(q[0].getTime()-x[0].getTime());return x[1]*(1-I)+q[1]*I}return x[1]};h.call(p.value);let V=new Array(g.length).fill(0).map((t,e)=>St(Math.random()));const Y=h.append("g").attr("stroke","black").selectAll("circle").data(k(new Date(c.value.min_year,0,1)),t=>t.name).join("circle").sort((t,e)=>j(t.population,e.population)).attr("cx",t=>u(t.income)).attr("cy",t=>m(t.lifeExpectancy)).attr("r",t=>{let e=T(t.population);return e<0?0:e}).on("mouseover",p.value.show).on("mouseout",p.value.hide).attr("fill",(t,e)=>V[e]);let G=st.range(A(g,t=>A([t.income[0],t.population[0],t.lifeExpectancy[0]],([e])=>e)),A(g,t=>ct([t.income[t.income.length-1],t.population[t.population.length-1],t.lifeExpectancy[t.lifeExpectancy.length-1]],([e])=>e))),J=t=>{Y.data(t,e=>e.name).sort((e,o)=>j(e.population,o.population)).attr("cx",e=>u(e.income)).attr("cy",e=>m(e.lifeExpectancy)).attr("r",e=>{let o=T(e.population);return o<0?0:o})};const C=document.getElementsByClassName("chart_box")[0];let _=document.getElementsByClassName("observablehq")[0];(S=_==null?void 0:_.parentElement)==null||S.removeChild(_);let M=document.createElement("div");M.classList.add("observablehq");let K=et(G,{autoplay:!0,format:t=>t.getFullYear(),loop:!1,update:t=>J(k(t))});M.appendChild(K),(B=C.parentElement)==null||B.insertBefore(M,C)}),ht(()=>{p.value.destroy()}),(l,i)=>{const n=Z;return xt(),gt(n,{loading:D(d),loadError:D(s)},{default:_t(()=>[qt]),_:1},8,["loading","loadError"])}}});const Ut=wt(It,[["__scopeId","data-v-6fced640"]]);export{Ut as default};
