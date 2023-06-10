import{s as Yt,_ as Gt}from"./LoadingTip.vue_vue_type_script_setup_true_lang-1ea9d305.js";import{z as Ut}from"./zoom-de681b7a.js";import{d as Vt}from"./index-677af89f.js";import{a as Ln}from"./index-c73def89.js";import{d as kt,w as xt,r as En,s as Jt,o as Kt,u as Tn,n as Qt,a as jt,c as bt,b as ni,e as ti,f as ii}from"./index-d0139ac4.js";class b{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const e=this._partials;let i=0;for(let r=0;r<this._n&&r<32;r++){const c=e[r],f=t+c,l=Math.abs(t)<Math.abs(c)?t-(f-c):c-(f-t);l&&(e[i++]=l),t=f}return e[i]=t,this._n=i+1,this}valueOf(){const t=this._partials;let e=this._n,i,r,c,f=0;if(e>0){for(f=t[--e];e>0&&(i=f,r=t[--e],f=i+r,c=r-(f-i),!c););e>0&&(c<0&&t[e-1]<0||c>0&&t[e-1]>0)&&(r=c*2,i=f+r,r==i-f&&(f=i))}return f}}function*ei(n){for(const t of n)yield*t}function Rt(n){return Array.from(ei(n))}var L=1e-6,ri=1e-12,z=Math.PI,W=z/2,et=z/4,Y=z*2,X=180/z,O=z/180,T=Math.abs,$t=Math.atan,gn=Math.atan2,Z=Math.cos,oi=Math.exp,ui=Math.log,H=Math.sin,li=Math.sign||function(n){return n>0?1:n<0?-1:0},tn=Math.sqrt,ai=Math.tan;function fi(n){return n>1?0:n<-1?z:Math.acos(n)}function vn(n){return n>1?W:n<-1?-W:Math.asin(n)}function U(){}function Pn(n,t){n&&ot.hasOwnProperty(n.type)&&ot[n.type](n,t)}var rt={Feature:function(n,t){Pn(n.geometry,t)},FeatureCollection:function(n,t){for(var e=n.features,i=-1,r=e.length;++i<r;)Pn(e[i].geometry,t)}},ot={Sphere:function(n,t){t.sphere()},Point:function(n,t){n=n.coordinates,t.point(n[0],n[1],n[2])},MultiPoint:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)n=e[i],t.point(n[0],n[1],n[2])},LineString:function(n,t){On(n.coordinates,t,0)},MultiLineString:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)On(e[i],t,0)},Polygon:function(n,t){ut(n.coordinates,t)},MultiPolygon:function(n,t){for(var e=n.coordinates,i=-1,r=e.length;++i<r;)ut(e[i],t)},GeometryCollection:function(n,t){for(var e=n.geometries,i=-1,r=e.length;++i<r;)Pn(e[i],t)}};function On(n,t,e){var i=-1,r=n.length-e,c;for(t.lineStart();++i<r;)c=n[i],t.point(c[0],c[1],c[2]);t.lineEnd()}function ut(n,t){var e=-1,i=n.length;for(t.polygonStart();++e<i;)On(n[e],t,1);t.polygonEnd()}function rn(n,t){n&&rt.hasOwnProperty(n.type)?rt[n.type](n,t):Pn(n,t)}function qn(n){return[gn(n[1],n[0]),vn(n[2])]}function un(n){var t=n[0],e=n[1],i=Z(e);return[i*Z(t),i*H(t),H(e)]}function _n(n,t){return n[0]*t[0]+n[1]*t[1]+n[2]*t[2]}function Rn(n,t){return[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]]}function Fn(n,t){n[0]+=t[0],n[1]+=t[1],n[2]+=t[2]}function wn(n,t){return[n[0]*t,n[1]*t,n[2]*t]}function Wn(n){var t=tn(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);n[0]/=t,n[1]/=t,n[2]/=t}function Xn(n,t){function e(i,r){return i=n(i,r),t(i[0],i[1])}return n.invert&&t.invert&&(e.invert=function(i,r){return i=t.invert(i,r),i&&n.invert(i[0],i[1])}),e}function Yn(n,t){return T(n)>z&&(n-=Math.round(n/Y)*Y),[n,t]}Yn.invert=Yn;function Nt(n,t,e){return(n%=Y)?t||e?Xn(at(n),ft(t,e)):at(n):t||e?ft(t,e):Yn}function lt(n){return function(t,e){return t+=n,T(t)>z&&(t-=Math.round(t/Y)*Y),[t,e]}}function at(n){var t=lt(n);return t.invert=lt(-n),t}function ft(n,t){var e=Z(n),i=H(n),r=Z(t),c=H(t);function f(l,v){var g=Z(v),o=Z(l)*g,u=H(l)*g,a=H(v),s=a*e+o*i;return[gn(u*r-s*c,o*e-a*i),vn(s*r+u*c)]}return f.invert=function(l,v){var g=Z(v),o=Z(l)*g,u=H(l)*g,a=H(v),s=a*r-u*c;return[gn(u*r+a*c,o*e+s*i),vn(s*e-o*i)]},f}function ci(n){n=Nt(n[0]*O,n[1]*O,n.length>2?n[2]*O:0);function t(e){return e=n(e[0]*O,e[1]*O),e[0]*=X,e[1]*=X,e}return t.invert=function(e){return e=n.invert(e[0]*O,e[1]*O),e[0]*=X,e[1]*=X,e},t}function si(n,t,e,i,r,c){if(e){var f=Z(t),l=H(t),v=i*e;r==null?(r=t+i*Y,c=t-v/2):(r=ct(f,r),c=ct(f,c),(i>0?r<c:r>c)&&(r+=i*Y));for(var g,o=r;i>0?o>c:o<c;o-=v)g=qn([f,-l*Z(o),-l*H(o)]),n.point(g[0],g[1])}}function ct(n,t){t=un(t),t[0]-=n,Wn(t);var e=fi(-t[1]);return((-t[2]<0?-e:e)+Y-L)%Y}function zt(){var n=[],t;return{point:function(e,i,r){t.push([e,i,r])},lineStart:function(){n.push(t=[])},lineEnd:U,rejoin:function(){n.length>1&&n.push(n.pop().concat(n.shift()))},result:function(){var e=n;return n=[],t=null,e}}}function yn(n,t){return T(n[0]-t[0])<L&&T(n[1]-t[1])<L}function mn(n,t,e,i){this.x=n,this.z=t,this.o=e,this.e=i,this.v=!1,this.n=this.p=null}function At(n,t,e,i,r){var c=[],f=[],l,v;if(n.forEach(function(h){if(!((_=h.length-1)<=0)){var _,d=h[0],R=h[_],E;if(yn(d,R)){if(!d[2]&&!R[2]){for(r.lineStart(),l=0;l<_;++l)r.point((d=h[l])[0],d[1]);r.lineEnd();return}R[0]+=2*L}c.push(E=new mn(d,h,null,!0)),f.push(E.o=new mn(d,null,E,!1)),c.push(E=new mn(R,h,null,!1)),f.push(E.o=new mn(R,null,E,!0))}}),!!c.length){for(f.sort(t),st(c),st(f),l=0,v=f.length;l<v;++l)f[l].e=e=!e;for(var g=c[0],o,u;;){for(var a=g,s=!0;a.v;)if((a=a.n)===g)return;o=a.z,r.lineStart();do{if(a.v=a.o.v=!0,a.e){if(s)for(l=0,v=o.length;l<v;++l)r.point((u=o[l])[0],u[1]);else i(a.x,a.n.x,1,r);a=a.n}else{if(s)for(o=a.p.z,l=o.length-1;l>=0;--l)r.point((u=o[l])[0],u[1]);else i(a.x,a.p.x,-1,r);a=a.p}a=a.o,o=a.z,s=!s}while(!a.v);r.lineEnd()}}}function st(n){if(t=n.length){for(var t,e=0,i=n[0],r;++e<t;)i.n=r=n[e],r.p=i,i=r;i.n=r=n[0],r.p=i}}function Bn(n){return T(n[0])<=z?n[0]:li(n[0])*((T(n[0])+z)%Y-z)}function pi(n,t){var e=Bn(t),i=t[1],r=H(i),c=[H(e),-Z(e),0],f=0,l=0,v=new b;r===1?i=W+L:r===-1&&(i=-W-L);for(var g=0,o=n.length;g<o;++g)if(a=(u=n[g]).length)for(var u,a,s=u[a-1],h=Bn(s),_=s[1]/2+et,d=H(_),R=Z(_),E=0;E<a;++E,h=S,d=y,R=I,s=M){var M=u[E],S=Bn(M),m=M[1]/2+et,y=H(m),I=Z(m),A=S-h,N=A>=0?1:-1,D=N*A,w=D>z,F=d*y;if(v.add(gn(F*N*H(D),R*I+F*Z(D))),f+=w?A+N*Y:A,w^h>=e^S>=e){var $=Rn(un(s),un(M));Wn($);var C=Rn(c,$);Wn(C);var p=(w^A>=0?-1:1)*vn(C[2]);(i>p||i===p&&($[0]||$[1]))&&(l+=w^A>=0?1:-1)}}return(f<-L||f<L&&v<-ri)^l&1}function It(n,t,e,i){return function(r){var c=t(r),f=zt(),l=t(f),v=!1,g,o,u,a={point:s,lineStart:_,lineEnd:d,polygonStart:function(){a.point=R,a.lineStart=E,a.lineEnd=M,o=[],g=[]},polygonEnd:function(){a.point=s,a.lineStart=_,a.lineEnd=d,o=Rt(o);var S=pi(g,i);o.length?(v||(r.polygonStart(),v=!0),At(o,gi,S,e,r)):S&&(v||(r.polygonStart(),v=!0),r.lineStart(),e(null,null,1,r),r.lineEnd()),v&&(r.polygonEnd(),v=!1),o=g=null},sphere:function(){r.polygonStart(),r.lineStart(),e(null,null,1,r),r.lineEnd(),r.polygonEnd()}};function s(S,m){n(S,m)&&r.point(S,m)}function h(S,m){c.point(S,m)}function _(){a.point=h,c.lineStart()}function d(){a.point=s,c.lineEnd()}function R(S,m){u.push([S,m]),l.point(S,m)}function E(){l.lineStart(),u=[]}function M(){R(u[0][0],u[0][1]),l.lineEnd();var S=l.clean(),m=f.result(),y,I=m.length,A,N,D;if(u.pop(),g.push(u),u=null,!!I){if(S&1){if(N=m[0],(A=N.length-1)>0){for(v||(r.polygonStart(),v=!0),r.lineStart(),y=0;y<A;++y)r.point((D=N[y])[0],D[1]);r.lineEnd()}return}I>1&&S&2&&m.push(m.pop().concat(m.shift())),o.push(m.filter(hi))}}return a}}function hi(n){return n.length>1}function gi(n,t){return((n=n.x)[0]<0?n[1]-W-L:W-n[1])-((t=t.x)[0]<0?t[1]-W-L:W-t[1])}const pt=It(function(){return!0},vi,Si,[-z,-W]);function vi(n){var t=NaN,e=NaN,i=NaN,r;return{lineStart:function(){n.lineStart(),r=1},point:function(c,f){var l=c>0?z:-z,v=T(c-t);T(v-z)<L?(n.point(t,e=(e+f)/2>0?W:-W),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(l,e),n.point(c,e),r=0):i!==l&&v>=z&&(T(t-i)<L&&(t-=i*L),T(c-l)<L&&(c-=l*L),e=di(t,e,c,f),n.point(i,e),n.lineEnd(),n.lineStart(),n.point(l,e),r=0),n.point(t=c,e=f),i=l},lineEnd:function(){n.lineEnd(),t=e=NaN},clean:function(){return 2-r}}}function di(n,t,e,i){var r,c,f=H(n-e);return T(f)>L?$t((H(t)*(c=Z(i))*H(e)-H(i)*(r=Z(t))*H(n))/(r*c*f)):(t+i)/2}function Si(n,t,e,i){var r;if(n==null)r=e*W,i.point(-z,r),i.point(0,r),i.point(z,r),i.point(z,0),i.point(z,-r),i.point(0,-r),i.point(-z,-r),i.point(-z,0),i.point(-z,r);else if(T(n[0]-t[0])>L){var c=n[0]<t[0]?z:-z;r=e*c/2,i.point(-c,r),i.point(0,r),i.point(c,r)}else i.point(t[0],t[1])}function Ei(n){var t=Z(n),e=6*O,i=t>0,r=T(t)>L;function c(o,u,a,s){si(s,n,e,a,o,u)}function f(o,u){return Z(o)*Z(u)>t}function l(o){var u,a,s,h,_;return{lineStart:function(){h=s=!1,_=1},point:function(d,R){var E=[d,R],M,S=f(d,R),m=i?S?0:g(d,R):S?g(d+(d<0?z:-z),R):0;if(!u&&(h=s=S)&&o.lineStart(),S!==s&&(M=v(u,E),(!M||yn(u,M)||yn(E,M))&&(E[2]=1)),S!==s)_=0,S?(o.lineStart(),M=v(E,u),o.point(M[0],M[1])):(M=v(u,E),o.point(M[0],M[1],2),o.lineEnd()),u=M;else if(r&&u&&i^S){var y;!(m&a)&&(y=v(E,u,!0))&&(_=0,i?(o.lineStart(),o.point(y[0][0],y[0][1]),o.point(y[1][0],y[1][1]),o.lineEnd()):(o.point(y[1][0],y[1][1]),o.lineEnd(),o.lineStart(),o.point(y[0][0],y[0][1],3)))}S&&(!u||!yn(u,E))&&o.point(E[0],E[1]),u=E,s=S,a=m},lineEnd:function(){s&&o.lineEnd(),u=null},clean:function(){return _|(h&&s)<<1}}}function v(o,u,a){var s=un(o),h=un(u),_=[1,0,0],d=Rn(s,h),R=_n(d,d),E=d[0],M=R-E*E;if(!M)return!a&&o;var S=t*R/M,m=-t*E/M,y=Rn(_,d),I=wn(_,S),A=wn(d,m);Fn(I,A);var N=y,D=_n(I,N),w=_n(N,N),F=D*D-w*(_n(I,I)-1);if(!(F<0)){var $=tn(F),C=wn(N,(-D-$)/w);if(Fn(C,I),C=qn(C),!a)return C;var p=o[0],P=u[0],B=o[1],q=u[1],G;P<p&&(G=p,p=P,P=G);var an=P-p,J=T(an-z)<L,j=J||an<L;if(!J&&q<B&&(G=B,B=q,q=G),j?J?B+q>0^C[1]<(T(C[0]-p)<L?B:q):B<=C[1]&&C[1]<=q:an>z^(p<=C[0]&&C[0]<=P)){var K=wn(N,(-D+$)/w);return Fn(K,I),[C,qn(K)]}}}function g(o,u){var a=i?n:z-n,s=0;return o<-a?s|=1:o>a&&(s|=2),u<-a?s|=4:u>a&&(s|=8),s}return It(f,l,c,i?[0,-n]:[-z,n-z])}function _i(n,t,e,i,r,c){var f=n[0],l=n[1],v=t[0],g=t[1],o=0,u=1,a=v-f,s=g-l,h;if(h=e-f,!(!a&&h>0)){if(h/=a,a<0){if(h<o)return;h<u&&(u=h)}else if(a>0){if(h>u)return;h>o&&(o=h)}if(h=r-f,!(!a&&h<0)){if(h/=a,a<0){if(h>u)return;h>o&&(o=h)}else if(a>0){if(h<o)return;h<u&&(u=h)}if(h=i-l,!(!s&&h>0)){if(h/=s,s<0){if(h<o)return;h<u&&(u=h)}else if(s>0){if(h>u)return;h>o&&(o=h)}if(h=c-l,!(!s&&h<0)){if(h/=s,s<0){if(h>u)return;h>o&&(o=h)}else if(s>0){if(h<o)return;h<u&&(u=h)}return o>0&&(n[0]=f+o*a,n[1]=l+o*s),u<1&&(t[0]=f+u*a,t[1]=l+u*s),!0}}}}}var fn=1e9,Mn=-fn;function wi(n,t,e,i){function r(g,o){return n<=g&&g<=e&&t<=o&&o<=i}function c(g,o,u,a){var s=0,h=0;if(g==null||(s=f(g,u))!==(h=f(o,u))||v(g,o)<0^u>0)do a.point(s===0||s===3?n:e,s>1?i:t);while((s=(s+u+4)%4)!==h);else a.point(o[0],o[1])}function f(g,o){return T(g[0]-n)<L?o>0?0:3:T(g[0]-e)<L?o>0?2:1:T(g[1]-t)<L?o>0?1:0:o>0?3:2}function l(g,o){return v(g.x,o.x)}function v(g,o){var u=f(g,1),a=f(o,1);return u!==a?u-a:u===0?o[1]-g[1]:u===1?g[0]-o[0]:u===2?g[1]-o[1]:o[0]-g[0]}return function(g){var o=g,u=zt(),a,s,h,_,d,R,E,M,S,m,y,I={point:A,lineStart:F,lineEnd:$,polygonStart:D,polygonEnd:w};function A(p,P){r(p,P)&&o.point(p,P)}function N(){for(var p=0,P=0,B=s.length;P<B;++P)for(var q=s[P],G=1,an=q.length,J=q[0],j,K,Sn=J[0],en=J[1];G<an;++G)j=Sn,K=en,J=q[G],Sn=J[0],en=J[1],K<=i?en>i&&(Sn-j)*(i-K)>(en-K)*(n-j)&&++p:en<=i&&(Sn-j)*(i-K)<(en-K)*(n-j)&&--p;return p}function D(){o=u,a=[],s=[],y=!0}function w(){var p=N(),P=y&&p,B=(a=Rt(a)).length;(P||B)&&(g.polygonStart(),P&&(g.lineStart(),c(null,null,1,g),g.lineEnd()),B&&At(a,l,p,c,g),g.polygonEnd()),o=g,a=s=h=null}function F(){I.point=C,s&&s.push(h=[]),m=!0,S=!1,E=M=NaN}function $(){a&&(C(_,d),R&&S&&u.rejoin(),a.push(u.result())),I.point=A,S&&o.lineEnd()}function C(p,P){var B=r(p,P);if(s&&h.push([p,P]),m)_=p,d=P,R=B,m=!1,B&&(o.lineStart(),o.point(p,P));else if(B&&S)o.point(p,P);else{var q=[E=Math.max(Mn,Math.min(fn,E)),M=Math.max(Mn,Math.min(fn,M))],G=[p=Math.max(Mn,Math.min(fn,p)),P=Math.max(Mn,Math.min(fn,P))];_i(q,G,n,t,e,i)?(S||(o.lineStart(),o.point(q[0],q[1])),o.point(G[0],G[1]),B||o.lineEnd(),y=!1):B&&(o.lineStart(),o.point(p,P),y=!1)}E=p,M=P,S=B}return I}}const Gn=n=>n;var Zn=new b,Un=new b,Ct,Dt,Vn,kn,Q={point:U,lineStart:U,lineEnd:U,polygonStart:function(){Q.lineStart=mi,Q.lineEnd=yi},polygonEnd:function(){Q.lineStart=Q.lineEnd=Q.point=U,Zn.add(T(Un)),Un=new b},result:function(){var n=Zn/2;return Zn=new b,n}};function mi(){Q.point=Mi}function Mi(n,t){Q.point=Lt,Ct=Vn=n,Dt=kn=t}function Lt(n,t){Un.add(kn*n-Vn*t),Vn=n,kn=t}function yi(){Lt(Ct,Dt)}const ht=Q;var ln=1/0,$n=ln,dn=-ln,Nn=dn,Pi={point:Ri,lineStart:U,lineEnd:U,polygonStart:U,polygonEnd:U,result:function(){var n=[[ln,$n],[dn,Nn]];return dn=Nn=-($n=ln=1/0),n}};function Ri(n,t){n<ln&&(ln=n),n>dn&&(dn=n),t<$n&&($n=t),t>Nn&&(Nn=t)}const zn=Pi;var xn=0,Jn=0,cn=0,An=0,In=0,on=0,Kn=0,Qn=0,sn=0,Tt,Ft,k,x,V={point:nn,lineStart:gt,lineEnd:vt,polygonStart:function(){V.lineStart=zi,V.lineEnd=Ai},polygonEnd:function(){V.point=nn,V.lineStart=gt,V.lineEnd=vt},result:function(){var n=sn?[Kn/sn,Qn/sn]:on?[An/on,In/on]:cn?[xn/cn,Jn/cn]:[NaN,NaN];return xn=Jn=cn=An=In=on=Kn=Qn=sn=0,n}};function nn(n,t){xn+=n,Jn+=t,++cn}function gt(){V.point=$i}function $i(n,t){V.point=Ni,nn(k=n,x=t)}function Ni(n,t){var e=n-k,i=t-x,r=tn(e*e+i*i);An+=r*(k+n)/2,In+=r*(x+t)/2,on+=r,nn(k=n,x=t)}function vt(){V.point=nn}function zi(){V.point=Ii}function Ai(){Bt(Tt,Ft)}function Ii(n,t){V.point=Bt,nn(Tt=k=n,Ft=x=t)}function Bt(n,t){var e=n-k,i=t-x,r=tn(e*e+i*i);An+=r*(k+n)/2,In+=r*(x+t)/2,on+=r,r=x*n-k*t,Kn+=r*(k+n),Qn+=r*(x+t),sn+=r*3,nn(k=n,x=t)}const dt=V;function Zt(n){this._context=n}Zt.prototype={_radius:4.5,pointRadius:function(n){return this._radius=n,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(n,t){switch(this._point){case 0:{this._context.moveTo(n,t),this._point=1;break}case 1:{this._context.lineTo(n,t);break}default:{this._context.moveTo(n+this._radius,t),this._context.arc(n,t,this._radius,0,Y);break}}},result:U};var jn=new b,Hn,Ht,Ot,pn,hn,Cn={point:U,lineStart:function(){Cn.point=Ci},lineEnd:function(){Hn&&qt(Ht,Ot),Cn.point=U},polygonStart:function(){Hn=!0},polygonEnd:function(){Hn=null},result:function(){var n=+jn;return jn=new b,n}};function Ci(n,t){Cn.point=qt,Ht=pn=n,Ot=hn=t}function qt(n,t){pn-=n,hn-=t,jn.add(tn(pn*pn+hn*hn)),pn=n,hn=t}const St=Cn;let Et,Dn,_t,wt;class mt{constructor(t){this._append=t==null?Wt:Di(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,e){switch(this._point){case 0:{this._append`M${t},${e}`,this._point=1;break}case 1:{this._append`L${t},${e}`;break}default:{if(this._append`M${t},${e}`,this._radius!==_t||this._append!==Dn){const i=this._radius,r=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,_t=i,Dn=this._append,wt=this._,this._=r}this._+=wt;break}}}result(){const t=this._;return this._="",t.length?t:null}}function Wt(n){let t=1;this._+=n[0];for(const e=n.length;t<e;++t)this._+=arguments[t]+n[t]}function Di(n){const t=Math.floor(n);if(!(t>=0))throw new RangeError(`invalid digits: ${n}`);if(t>15)return Wt;if(t!==Et){const e=10**t;Et=t,Dn=function(r){let c=1;this._+=r[0];for(const f=r.length;c<f;++c)this._+=Math.round(arguments[c]*e)/e+r[c]}}return Dn}function Li(n,t){let e=3,i=4.5,r,c;function f(l){return l&&(typeof i=="function"&&c.pointRadius(+i.apply(this,arguments)),rn(l,r(c))),c.result()}return f.area=function(l){return rn(l,r(ht)),ht.result()},f.measure=function(l){return rn(l,r(St)),St.result()},f.bounds=function(l){return rn(l,r(zn)),zn.result()},f.centroid=function(l){return rn(l,r(dt)),dt.result()},f.projection=function(l){return arguments.length?(r=l==null?(n=null,Gn):(n=l).stream,f):n},f.context=function(l){return arguments.length?(c=l==null?(t=null,new mt(e)):new Zt(t=l),typeof i!="function"&&c.pointRadius(i),f):t},f.pointRadius=function(l){return arguments.length?(i=typeof l=="function"?l:(c.pointRadius(+l),+l),f):i},f.digits=function(l){if(!arguments.length)return e;if(l==null)e=null;else{const v=Math.floor(l);if(!(v>=0))throw new RangeError(`invalid digits: ${l}`);e=v}return t===null&&(c=new mt(e)),f},f.projection(n).digits(e).context(t)}function nt(n){return function(t){var e=new bn;for(var i in n)e[i]=n[i];return e.stream=t,e}}function bn(){}bn.prototype={constructor:bn,point:function(n,t){this.stream.point(n,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function tt(n,t,e){var i=n.clipExtent&&n.clipExtent();return n.scale(150).translate([0,0]),i!=null&&n.clipExtent(null),rn(e,n.stream(zn)),t(zn.result()),i!=null&&n.clipExtent(i),n}function Xt(n,t,e){return tt(n,function(i){var r=t[1][0]-t[0][0],c=t[1][1]-t[0][1],f=Math.min(r/(i[1][0]-i[0][0]),c/(i[1][1]-i[0][1])),l=+t[0][0]+(r-f*(i[1][0]+i[0][0]))/2,v=+t[0][1]+(c-f*(i[1][1]+i[0][1]))/2;n.scale(150*f).translate([l,v])},e)}function Ti(n,t,e){return Xt(n,[[0,0],t],e)}function Fi(n,t,e){return tt(n,function(i){var r=+t,c=r/(i[1][0]-i[0][0]),f=(r-c*(i[1][0]+i[0][0]))/2,l=-c*i[0][1];n.scale(150*c).translate([f,l])},e)}function Bi(n,t,e){return tt(n,function(i){var r=+t,c=r/(i[1][1]-i[0][1]),f=-c*i[0][0],l=(r-c*(i[1][1]+i[0][1]))/2;n.scale(150*c).translate([f,l])},e)}var Mt=16,Zi=Z(30*O);function yt(n,t){return+t?Oi(n,t):Hi(n)}function Hi(n){return nt({point:function(t,e){t=n(t,e),this.stream.point(t[0],t[1])}})}function Oi(n,t){function e(i,r,c,f,l,v,g,o,u,a,s,h,_,d){var R=g-i,E=o-r,M=R*R+E*E;if(M>4*t&&_--){var S=f+a,m=l+s,y=v+h,I=tn(S*S+m*m+y*y),A=vn(y/=I),N=T(T(y)-1)<L||T(c-u)<L?(c+u)/2:gn(m,S),D=n(N,A),w=D[0],F=D[1],$=w-i,C=F-r,p=E*$-R*C;(p*p/M>t||T((R*$+E*C)/M-.5)>.3||f*a+l*s+v*h<Zi)&&(e(i,r,c,f,l,v,w,F,N,S/=I,m/=I,y,_,d),d.point(w,F),e(w,F,N,S,m,y,g,o,u,a,s,h,_,d))}}return function(i){var r,c,f,l,v,g,o,u,a,s,h,_,d={point:R,lineStart:E,lineEnd:S,polygonStart:function(){i.polygonStart(),d.lineStart=m},polygonEnd:function(){i.polygonEnd(),d.lineStart=E}};function R(A,N){A=n(A,N),i.point(A[0],A[1])}function E(){u=NaN,d.point=M,i.lineStart()}function M(A,N){var D=un([A,N]),w=n(A,N);e(u,a,o,s,h,_,u=w[0],a=w[1],o=A,s=D[0],h=D[1],_=D[2],Mt,i),i.point(u,a)}function S(){d.point=R,i.lineEnd()}function m(){E(),d.point=y,d.lineEnd=I}function y(A,N){M(r=A,N),c=u,f=a,l=s,v=h,g=_,d.point=M}function I(){e(u,a,o,s,h,_,c,f,r,l,v,g,Mt,i),d.lineEnd=S,S()}return d}}var qi=nt({point:function(n,t){this.stream.point(n*O,t*O)}});function Wi(n){return nt({point:function(t,e){var i=n(t,e);return this.stream.point(i[0],i[1])}})}function Xi(n,t,e,i,r){function c(f,l){return f*=i,l*=r,[t+n*f,e-n*l]}return c.invert=function(f,l){return[(f-t)/n*i,(e-l)/n*r]},c}function Pt(n,t,e,i,r,c){if(!c)return Xi(n,t,e,i,r);var f=Z(c),l=H(c),v=f*n,g=l*n,o=f/n,u=l/n,a=(l*e-f*t)/n,s=(l*t+f*e)/n;function h(_,d){return _*=i,d*=r,[v*_-g*d+t,e-g*_-v*d]}return h.invert=function(_,d){return[i*(o*_-u*d+a),r*(s-u*_-o*d)]},h}function Yi(n){return Gi(function(){return n})()}function Gi(n){var t,e=150,i=480,r=250,c=0,f=0,l=0,v=0,g=0,o,u=0,a=1,s=1,h=null,_=pt,d=null,R,E,M,S=Gn,m=.5,y,I,A,N,D;function w(p){return A(p[0]*O,p[1]*O)}function F(p){return p=A.invert(p[0],p[1]),p&&[p[0]*X,p[1]*X]}w.stream=function(p){return N&&D===p?N:N=qi(Wi(o)(_(y(S(D=p)))))},w.preclip=function(p){return arguments.length?(_=p,h=void 0,C()):_},w.postclip=function(p){return arguments.length?(S=p,d=R=E=M=null,C()):S},w.clipAngle=function(p){return arguments.length?(_=+p?Ei(h=p*O):(h=null,pt),C()):h*X},w.clipExtent=function(p){return arguments.length?(S=p==null?(d=R=E=M=null,Gn):wi(d=+p[0][0],R=+p[0][1],E=+p[1][0],M=+p[1][1]),C()):d==null?null:[[d,R],[E,M]]},w.scale=function(p){return arguments.length?(e=+p,$()):e},w.translate=function(p){return arguments.length?(i=+p[0],r=+p[1],$()):[i,r]},w.center=function(p){return arguments.length?(c=p[0]%360*O,f=p[1]%360*O,$()):[c*X,f*X]},w.rotate=function(p){return arguments.length?(l=p[0]%360*O,v=p[1]%360*O,g=p.length>2?p[2]%360*O:0,$()):[l*X,v*X,g*X]},w.angle=function(p){return arguments.length?(u=p%360*O,$()):u*X},w.reflectX=function(p){return arguments.length?(a=p?-1:1,$()):a<0},w.reflectY=function(p){return arguments.length?(s=p?-1:1,$()):s<0},w.precision=function(p){return arguments.length?(y=yt(I,m=p*p),C()):tn(m)},w.fitExtent=function(p,P){return Xt(w,p,P)},w.fitSize=function(p,P){return Ti(w,p,P)},w.fitWidth=function(p,P){return Fi(w,p,P)},w.fitHeight=function(p,P){return Bi(w,p,P)};function $(){var p=Pt(e,0,0,a,s,u).apply(null,t(c,f)),P=Pt(e,i-p[0],r-p[1],a,s,u);return o=Nt(l,v,g),I=Xn(t,P),A=Xn(o,I),y=yt(I,m),C()}function C(){return N=D=null,w}return function(){return t=n.apply(this,arguments),w.invert=t.invert&&F,$()}}function it(n,t){return[n,ui(ai((W+t)/2))]}it.invert=function(n,t){return[n,2*$t(oi(t))-W]};function Ui(){return Vi(it).scale(961/Y)}function Vi(n){var t=Yi(n),e=t.center,i=t.scale,r=t.translate,c=t.clipExtent,f=null,l,v,g;t.scale=function(u){return arguments.length?(i(u),o()):i()},t.translate=function(u){return arguments.length?(r(u),o()):r()},t.center=function(u){return arguments.length?(e(u),o()):e()},t.clipExtent=function(u){return arguments.length?(u==null?f=l=v=g=null:(f=+u[0][0],l=+u[0][1],v=+u[1][0],g=+u[1][1]),o()):f==null?null:[[f,l],[v,g]]};function o(){var u=z*i(),a=t(ci(t.rotate()).invert([0,0]));return c(f==null?[[a[0]-u,a[1]-u],[a[0]+u,a[1]+u]]:n===it?[[Math.max(a[0]-u,f),l],[Math.min(a[0]+u,v),g]]:[[f,Math.max(a[1]-u,l)],[v,Math.min(a[1]+u,g)]])}return o()}const ji=kt({__name:"ChinaMap",async setup(n){let t,e,{data:i}=([t,e]=xt(()=>Ln.get("/d3json/chinaMap/chinaMapProvinceNameData.json")),t=await t,e(),t);const r=En();let c=En(!1),f=En(!0),l=Jt([]),v=En(Vt().attr("class","d3_tip").offset([0,10]).html(u=>{var a;return`<span class="d3_tip-name">${((a=u.properties)==null?void 0:a.name)??"没有名字"}</span>`})),g=async()=>{c.value=!1,f.value=!0;let u=[];for(let s=0;s<i.length;s++){let h=Ln.get(`/d3json/chinaMap/wrap/${i[s]}.json`);u.push(h)}let a=await Promise.all(u).then(s=>s.map(h=>h.data)).catch(s=>{console.log(s),c.value=!0});f.value=!1,a&&(l.value=a.map(s=>s.features[0]))},o=(u,a)=>{if(l.value.length<1)return console.log("原始数据依赖不存在, 无法获取新数据"),[];let s=[...l.value],h=s.findIndex(_=>{var d;return((d=_.properties)==null?void 0:d.adcode)===u});return s.splice(h,1,...a.features),s};return Kt(async()=>{if(await g(),!l.value)return;let u={type:"FeatureCollection",features:Tn(l.value)};await Qt();const{innerWidth:a,innerHeight:s}=window,h={top:40,right:20,bottom:40,left:40};let _=.6,d=1,R=20,E=Yt(r.value).append("svg").attr("viewBox",[0,0,a-h.left-h.right,s-h.top-h.bottom]).attr("stroke","#c86a7a").attr("stroke-width",_),M=Ui().center([105,38]).scale(Math.min(a,s)).translate([a/2,s/2]),S=Li().projection(M),m=E.append("g");m.selectAll("path").data(u.features).enter().append("path").attr("fill","#fcf9f2").attr("d",S).on("mouseenter",N).on("mouseleave",D).on("click",w);let y=F=>{const $=F.transform;m.attr("transform",`translate(${$.x}, ${$.y}) scale(${$.k})`),m.selectAll("circle").attr("r",2/$.k),E.attr("stroke-width",_/$.k)},I=Ut().scaleExtent([d,R]).on("zoom",y);E.call(I),E.call(v.value);let A=F=>{m.selectAll("path").data(F).join("path").attr("fill","#fcf9f2").attr("d",S).on("mouseenter",N).on("mouseleave",D).on("click",w)};function N(F,$){v.value.show.call(this,$)}function D(F,$){v.value.hide.call(this,$)}async function w(F,$){var P,B,q;if(((P=$.properties)==null?void 0:P.level)!=="province")return;if(!((B=$.properties)!=null&&B.name)){console.log("没有此地图数据");return}let C=await Ln.get(`/d3json/chinaMap/inside/${(q=$.properties)==null?void 0:q.name}.json`),p=o($.properties.adcode,C.data);p.length<1||A(p)}}),jt(()=>{v.value.destroy()}),(u,a)=>(ti(),bt(Gt,{loading:Tn(f),loadError:Tn(c)},{default:ni(()=>[ii("div",{ref_key:"chart",ref:r,class:"chart_box"},null,512)]),_:1},8,["loading","loadError"]))}});export{ji as default};