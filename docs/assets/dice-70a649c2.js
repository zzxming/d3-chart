function f(e){var n=0,t=e.children,r=t&&t.length;if(!r)n=1;else for(;--r>=0;)n+=t[r].value;e.value=n}function d(){return this.eachAfter(f)}function p(e,n){let t=-1;for(const r of this)e.call(n,r,++t,this);return this}function v(e,n){for(var t=this,r=[t],i,h,o=-1;t=r.pop();)if(e.call(n,t,++o,this),i=t.children)for(h=i.length-1;h>=0;--h)r.push(i[h]);return this}function y(e,n){for(var t=this,r=[t],i=[],h,o,a,u=-1;t=r.pop();)if(i.push(t),h=t.children)for(o=0,a=h.length;o<a;++o)r.push(h[o]);for(;t=i.pop();)e.call(n,t,++u,this);return this}function w(e,n){let t=-1;for(const r of this)if(e.call(n,r,++t,this))return r}function g(e){return this.eachAfter(function(n){for(var t=+e(n.data)||0,r=n.children,i=r&&r.length;--i>=0;)t+=r[i].value;n.value=t})}function _(e){return this.eachBefore(function(n){n.children&&n.children.sort(e)})}function m(e){for(var n=this,t=x(n,e),r=[n];n!==t;)n=n.parent,r.push(n);for(var i=r.length;e!==t;)r.splice(i,0,e),e=e.parent;return r}function x(e,n){if(e===n)return e;var t=e.ancestors(),r=n.ancestors(),i=null;for(e=t.pop(),n=r.pop();e===n;)i=e,e=t.pop(),n=r.pop();return i}function A(){for(var e=this,n=[e];e=e.parent;)n.push(e);return n}function B(){return Array.from(this)}function k(){var e=[];return this.eachBefore(function(n){n.children||e.push(n)}),e}function M(){var e=this,n=[];return e.each(function(t){t!==e&&n.push({source:t.parent,target:t})}),n}function*N(){var e=this,n,t=[e],r,i,h;do for(n=t.reverse(),t=[];e=n.pop();)if(yield e,r=e.children)for(i=0,h=r.length;i<h;++i)t.push(r[i]);while(t.length)}function s(e,n){e instanceof Map?(e=[void 0,e],n===void 0&&(n=j)):n===void 0&&(n=D);for(var t=new c(e),r,i=[t],h,o,a,u;r=i.pop();)if((o=n(r.data))&&(u=(o=Array.from(o)).length))for(r.children=o,a=u-1;a>=0;--a)i.push(h=o[a]=new c(o[a])),h.parent=r,h.depth=r.depth+1;return t.eachBefore(S)}function C(){return s(this).eachBefore(H)}function D(e){return e.children}function j(e){return Array.isArray(e)?e[1]:null}function H(e){e.data.value!==void 0&&(e.value=e.data.value),e.data=e.data.data}function S(e){var n=0;do e.height=n;while((e=e.parent)&&e.height<++n)}function c(e){this.data=e,this.depth=this.height=0,this.parent=null}c.prototype=s.prototype={constructor:c,count:d,each:p,eachAfter:y,eachBefore:v,find:w,sum:g,sort:_,path:m,ancestors:A,descendants:B,leaves:k,links:M,copy:C,[Symbol.iterator]:N};function q(e){e.x0=Math.round(e.x0),e.y0=Math.round(e.y0),e.x1=Math.round(e.x1),e.y1=Math.round(e.y1)}function z(e,n,t,r,i){for(var h=e.children,o,a=-1,u=h.length,l=e.value&&(r-n)/e.value;++a<u;)o=h[a],o.y0=t,o.y1=i,o.x0=n,o.x1=n+=o.value*l}export{c as N,S as c,s as h,q as r,z as t};