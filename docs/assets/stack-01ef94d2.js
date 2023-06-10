import{w as N,c as a}from"./path-53f90ab3.js";function S(n){return typeof n=="object"&&"length"in n?n:Array.from(n)}function z(n){this._context=n}z.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(n,e){switch(n=+n,e=+e,this._point){case 0:this._point=1,this._line?this._context.lineTo(n,e):this._context.moveTo(n,e);break;case 1:this._point=2;default:this._context.lineTo(n,e);break}}};function T(n){return new z(n)}function L(n){return n[0]}function P(n){return n[1]}function X(n,e){var f=a(!0),l=null,c=T,u=null,h=N(r);n=typeof n=="function"?n:n===void 0?L:a(n),e=typeof e=="function"?e:e===void 0?P:a(e);function r(o){var i,g=(o=S(o)).length,t,s=!1,p;for(l==null&&(u=c(p=h())),i=0;i<=g;++i)!(i<g&&f(t=o[i],i,o))===s&&((s=!s)?u.lineStart():u.lineEnd()),s&&u.point(+n(t,i,o),+e(t,i,o));if(p)return u=null,p+""||null}return r.x=function(o){return arguments.length?(n=typeof o=="function"?o:a(+o),r):n},r.y=function(o){return arguments.length?(e=typeof o=="function"?o:a(+o),r):e},r.defined=function(o){return arguments.length?(f=typeof o=="function"?o:a(!!o),r):f},r.curve=function(o){return arguments.length?(c=o,l!=null&&(u=c(l)),r):c},r.context=function(o){return arguments.length?(o==null?l=u=null:u=c(l=o),r):l},r}function q(n,e,f){var l=null,c=a(!0),u=null,h=T,r=null,o=N(i);n=typeof n=="function"?n:n===void 0?L:a(+n),e=typeof e=="function"?e:e===void 0?a(0):a(+e),f=typeof f=="function"?f:f===void 0?P:a(+f);function i(t){var s,p,d,v=(t=S(t)).length,m,k=!1,y,w=new Array(v),A=new Array(v);for(u==null&&(r=h(y=o())),s=0;s<=v;++s){if(!(s<v&&c(m=t[s],s,t))===k)if(k=!k)p=s,r.areaStart(),r.lineStart();else{for(r.lineEnd(),r.lineStart(),d=s-1;d>=p;--d)r.point(w[d],A[d]);r.lineEnd(),r.areaEnd()}k&&(w[s]=+n(m,s,t),A[s]=+e(m,s,t),r.point(l?+l(m,s,t):w[s],f?+f(m,s,t):A[s]))}if(y)return r=null,y+""||null}function g(){return X().defined(c).curve(h).context(u)}return i.x=function(t){return arguments.length?(n=typeof t=="function"?t:a(+t),l=null,i):n},i.x0=function(t){return arguments.length?(n=typeof t=="function"?t:a(+t),i):n},i.x1=function(t){return arguments.length?(l=t==null?null:typeof t=="function"?t:a(+t),i):l},i.y=function(t){return arguments.length?(e=typeof t=="function"?t:a(+t),f=null,i):e},i.y0=function(t){return arguments.length?(e=typeof t=="function"?t:a(+t),i):e},i.y1=function(t){return arguments.length?(f=t==null?null:typeof t=="function"?t:a(+t),i):f},i.lineX0=i.lineY0=function(){return g().x(n).y(e)},i.lineY1=function(){return g().x(n).y(f)},i.lineX1=function(){return g().x(l).y(e)},i.defined=function(t){return arguments.length?(c=typeof t=="function"?t:a(!!t),i):c},i.curve=function(t){return arguments.length?(h=t,u!=null&&(r=h(u)),i):h},i.context=function(t){return arguments.length?(t==null?u=r=null:r=h(u=t),i):u},i}function E(n,e){if((h=n.length)>1)for(var f=1,l,c,u=n[e[0]],h,r=u.length;f<h;++f)for(c=u,u=n[e[f]],l=0;l<r;++l)u[l][1]+=u[l][0]=isNaN(c[l][1])?c[l][0]:c[l][1]}function b(n){for(var e=n.length,f=new Array(e);--e>=0;)f[e]=e;return f}function Y(n,e){return n[e]}function O(n){const e=[];return e.key=n,e}function B(){var n=a([]),e=b,f=E,l=Y;function c(u){var h=Array.from(n.apply(this,arguments),O),r,o=h.length,i=-1,g;for(const t of u)for(r=0,++i;r<o;++r)(h[r][i]=[0,+l(t,h[r].key,i,u)]).data=t;for(r=0,g=S(e(h));r<o;++r)h[g[r]].index=r;return f(h,g),h}return c.keys=function(u){return arguments.length?(n=typeof u=="function"?u:a(Array.from(u)),c):n},c.value=function(u){return arguments.length?(l=typeof u=="function"?u:a(+u),c):l},c.order=function(u){return arguments.length?(e=u==null?b:typeof u=="function"?u:a(Array.from(u)),c):e},c.offset=function(u){return arguments.length?(f=u??E,c):f},c}export{b as a,q as d,E as n,B as s};
