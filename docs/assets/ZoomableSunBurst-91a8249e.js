import{d as C,r as d,o as D,n as L,c as Z,w as H,u as T,_ as W,b as q,e as F,f as G}from"./index-3f269392.js";import{_ as J}from"./LoadingTip.vue_vue_type_script_setup_true_lang-9b00ff77.js";import{d as K}from"./index-677af89f.js";import{f as Q,i as U}from"./init-659811a9.js";import{o as X}from"./ordinal-0e6f3144.js";import{i as Y}from"./rainbow-a48e73b6.js";import{d as tt,p as et}from"./arc-99452674.js";import{c as at}from"./create-7936bf63.js";import{h as rt}from"./dice-70a649c2.js";import"./path-53f90ab3.js";function nt($,u){for(var h=new Array(u),c=0;c<u;++c)h[c]=$(c/(u-1));return h}const it=C({__name:"ZoomableSunBurst",setup($){function u(i){return"children"in i}let h=d(),c=d(!0),B=d(!1),g=d(),_=d(!0),I=Q(",d"),b=d(K().attr("class","d3_tip").html((i,l)=>`
			            <strong>${l.data.name}<strong>
			            <span>${I(l.value||0)}</span>
			        `)),j=async()=>{let i=await new Promise(async(l,n)=>{l((await W(()=>import("./ZoomableSunburst-9b542d7b.js"),[])).default)}).catch(l=>{console.log(l),B.value=!0});c.value=!1,i&&(g.value=i)};return D(async()=>{if(await L(),await j(),!g.value)return;const{innerWidth:i,innerHeight:l}=window;let n=i/10,E=X(nt(Y,g.value.children.length+1)),A=tt().startAngle(a=>a.x0).endAngle(a=>a.x1).padAngle(a=>Math.min((a.x1-a.x0)/2,.005)).padRadius(n*1.5).innerRadius(a=>a.y0*n).outerRadius(a=>Math.max(a.y0*n,a.y1*n-1));const p=(a=>{let m=0;const s=rt(a).sum(o=>(u(o)||(m+=1),u(o)?0:o.value)).sort((o,f)=>(f.value??0)-(o.value??0));return m!==1&&(_.value=!1),et().size([2*Math.PI,s.height+1])(s)})(g.value);p.each(a=>a.current=a);const k=at("svg").attr("viewBox",[0,0,i,l]),y=k.append("g").attr("transform",`translate(${i/2},${l/2})`);y.call(b.value);{let a=function(t){return t.y1<=3&&t.y0>=1&&t.x1>t.x0},m=function(t,r){x.datum(r||p),x.select("foreignObject").text(e=>e.data.name),p.each(e=>e.target={x0:Math.max(0,Math.min(1,(e.x0-r.x0)/(r.x1-r.x0)))*2*Math.PI,x1:Math.max(0,Math.min(1,(e.x1-r.x0)/(r.x1-r.x0)))*2*Math.PI,y0:Math.max(0,e.y0-r.depth),y1:Math.max(0,e.y1-r.depth)});const v=y.transition().duration(750);s.attr("visibility",e=>a(e.target)?"visible":"hidden"),O.transition(v).tween("data",e=>{const M=U(e.current,e.target);return z=>e.current=M(z)}).filter(function(e){return!!(Number(this.getAttribute("fill-opacity"))||a(e.target))}).attr("fill-opacity",e=>a(e.target)?e.children?.6:.4:0).attr("pointer-events",e=>a(e.target)?"auto":"none").attrTween("d",e=>()=>A(e.current)),V.filter(function(e){return!!(Number(this.getAttribute("opacity"))||w(e.target))}).transition(v).attr("opacity",e=>w(e.target)).attrTween("transform",e=>()=>R(e.current))},s=y.selectAll("g").data(p.descendants().slice(1)).join("g"),o=20,f=8,P=(Number(_.value)+1)*n,N=()=>P-f*2,w=t=>+(t.y1<=3&&t.y0>=1&&(t.y1-t.y0)*(t.x1-t.x0)>.08),S=t=>`
					font-size: ${.5**t.depth*8+10}px;
					text-overflow: ellipsis;
					white-space: nowrap;
					user-select: none;
					text-align: center;
				`,R=t=>{const r=(t.x0+t.x1)/2*180/Math.PI,v=(t.y0+t.y1+Number(_.value))/2*n;let e=r<180?-1:1;return`rotate(${r-90}) translate(${v+e*P/2+-e*f}, 0) rotate(${r<180?0:180})`};s.on("mouseover",b.value.show).on("mouseout",b.value.hide).attr("visibility",t=>a(t)?"visible":"hidden");let O=s.append("path").attr("fill",t=>{let r=t;for(;r.depth>1;)r=r.parent;return E(r.data.name)}).attr("fill-opacity",t=>a(t)?t.children?.6:.4:0).attr("pointer-events",t=>a(t)?"auto":"none").attr("d",t=>A(t)),V=s.append("foreignObject").attr("width",N).attr("height",o).attr("y",-o/2).attr("opacity",w).attr("style",S).attr("transform",R).text(t=>t.data.name),x=y.append("g").datum(p).attr("style","cursor: pointer;");x.append("circle").attr("r",n).attr("fill","none").attr("pointer-events","all"),x.append("foreignObject").attr("width",n*2-f*2).attr("height",o).attr("x",-n+f).attr("y",-o/2).attr("style",t=>"text-align: center; text-overflow: ellipsis; white-space: nowrap;").text(t=>t.data.name),s.filter(t=>!!t.children).style("cursor","pointer").on("click",(t,r)=>{m(t,r)}),x.on("click",(t,r)=>{m(t,r.parent||p)})}h.value.appendChild(k.node())}),(i,l)=>{const n=J;return q(),Z(n,{loading:T(c),loadError:T(B)},{default:H(()=>[F("div",{ref_key:"chart",ref:h,class:"chart_box"},null,512)]),_:1},8,["loading","loadError"])}}});const gt=G(it,[["__scopeId","data-v-fbf30f7d"]]);export{gt as default};
