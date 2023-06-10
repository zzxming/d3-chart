const A=y(function(t){let m=document.createElement("template");return m.innerHTML=t.trim(),document.importNode(m.content,!0)},function(){return document.createElement("span")});function y(t,m){return function(d,...c){let a,r,p,b,u,e,i,f,l=d[0],s=[],n=null,o=-1;for(u=1,e=arguments.length;u<e;++u){if((a=arguments[u])instanceof Node)s[++o]=a,l+="<!--o:"+o+"-->";else if(Array.isArray(a)){for(i=0,f=a.length;i<f;++i)(r=a[i])instanceof Node?(n===null&&(s[++o]=n=document.createDocumentFragment(),l+="<!--o:"+o+"-->"),n.appendChild(r)):(n=null,l+=r);n=null}else l+=a;l+=d[u]}if(n=t(l),++o>0){for(p=new Array(o),b=document.createTreeWalker(n,NodeFilter.SHOW_COMMENT,null);b.nextNode();)r=b.currentNode,/^o:/.test(r.nodeValue)&&(p[+r.nodeValue.slice(2)]=r);for(u=0;u<o;++u)(r=p[u])&&r.parentNode.replaceChild(s[u],r)}return n.childNodes.length===1?n.removeChild(n.firstChild):n.nodeType===11?((r=m()).appendChild(n),r):n}}let x={disposal:function(m){return new Promise(d=>{requestAnimationFrame(()=>{const c=m.closest(".observablehq");if(!c)return d();const a=new MutationObserver(()=>{c.contains(m)||(a.disconnect(),d())});a.observe(c,{childList:!0})})})}};function C(t,{format:m=e=>Object.prototype.toString.call(e),initial:d=0,delay:c=null,autoplay:a=!0,loop:r=!0,loopDelay:p=null,alternate:b=!1,update:u=()=>{}}={}){t=Array.from(t);const e=A`<form
		style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 34px; align-items: center;"
	>
		<button
			name="b"
			type="button"
			style="margin-right: 0.4em; width: 5em;"
		></button>
		<label style="display: flex; align-items: center;">
			<input
				name="i"
				type="range"
				min="0"
				max=${t.length-1}
				value=${d}
				step="1"
				style="width: 180px;"
			/>
			<output
				name="o"
				style="margin-left: 0.4em;"
			></output>
		</label>
	</form>`;let i=null,f=null,l=null,s=1;function n(){e.b.textContent="Pause",c===null?i=requestAnimationFrame(h):l=setInterval(h,c)}function o(){e.b.textContent="Play",i!==null&&(cancelAnimationFrame(i),i=null),f!==null&&(clearTimeout(f),f=null),l!==null&&(clearInterval(l),l=null)}function g(){return i!==null||f!==null||l!==null}function h(){if(e.i.valueAsNumber===(s>0?t.length-1:s<0?0:NaN)){if(!r)return o();if(b&&(s=-s),p!==null){i!==null&&(cancelAnimationFrame(i),i=null),l!==null&&(clearInterval(l),l=null),f=setTimeout(()=>(v(),n()),p);return}}c===null&&(i=requestAnimationFrame(h)),v()}function v(){e.i.valueAsNumber=(e.i.valueAsNumber+s+t.length)%t.length,e.i.dispatchEvent(new CustomEvent("input",{bubbles:!0}))}return e.i.oninput=N=>{N&&N.isTrusted&&g()&&o(),e.value=t[e.i.valueAsNumber],e.o.value=m(e.value,e.i.valueAsNumber,t),u&&u(e.value)},e.b.onclick=()=>{if(g())return o();s=b&&e.i.valueAsNumber===t.length-1?-1:1,e.i.valueAsNumber=(e.i.valueAsNumber+s)%t.length,e.i.dispatchEvent(new CustomEvent("input",{bubbles:!0})),n()},e.i.oninput(),a?n():o(),x.disposal(e).then(o),e}export{C as S};
