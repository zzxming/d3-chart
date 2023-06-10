import{r as sn,t as cn}from"./dice-70a649c2.js";import{w as fn,c as S}from"./path-53f90ab3.js";function Rn(){var u=1,y=1,p=0,v=!1;function o(s){var r=s.height+1;return s.x0=s.y0=p,s.x1=u,s.y1=y/r,s.eachBefore(A(y,r)),v&&s.eachBefore(sn),s}function A(s,r){return function(f){f.children&&cn(f,f.x0,s*(f.depth+1)/r,f.x1,s*(f.depth+2)/r);var t=f.x0,n=f.y0,g=f.x1-p,i=f.y1-p;g<t&&(t=g=(t+g)/2),i<n&&(n=i=(n+i)/2),f.x0=t,f.y0=n,f.x1=g,f.y1=i}}return o.round=function(s){return arguments.length?(v=!!s,o):v},o.size=function(s){return arguments.length?(u=+s[0],y=+s[1],o):[u,y]},o.padding=function(s){return arguments.length?(p=+s,o):p},o}const tn=Math.abs,h=Math.atan2,F=Math.cos,ln=Math.max,en=Math.min,I=Math.sin,J=Math.sqrt,d=1e-12,K=Math.PI,Y=K/2,on=2*K;function gn(u){return u>1?0:u<-1?K:Math.acos(u)}function an(u){return u>=1?Y:u<=-1?-Y:Math.asin(u)}function yn(u){return u.innerRadius}function hn(u){return u.outerRadius}function pn(u){return u.startAngle}function mn(u){return u.endAngle}function xn(u){return u&&u.padAngle}function dn(u,y,p,v,o,A,s,r){var f=p-u,t=v-y,n=s-o,g=r-A,i=g*f-n*t;if(!(i*i<d))return i=(n*(y-A)-g*(u-o))/i,[u+i*f,y+i*t]}function X(u,y,p,v,o,A,s){var r=u-p,f=y-v,t=(s?A:-A)/J(r*r+f*f),n=t*f,g=-t*r,i=u+n,c=y+g,m=p+n,x=v+g,j=(i+m)/2,l=(c+x)/2,M=m-i,R=x-c,w=M*M+R*R,q=o-A,B=i*x-m*c,z=(R<0?-1:1)*J(ln(0,q*q*w-B*B)),E=(B*R-M*z)/w,O=(-B*M-R*z)/w,D=(B*R+M*z)/w,T=(-B*M+R*z)/w,P=E-j,e=O-l,a=D-j,C=T-l;return P*P+e*e>a*a+C*C&&(E=D,O=T),{cx:E,cy:O,x01:-n,y01:-g,x11:E*(o/q-1),y11:O*(o/q-1)}}function Mn(){var u=yn,y=hn,p=S(0),v=null,o=pn,A=mn,s=xn,r=null,f=fn(t);function t(){var n,g,i=+u.apply(this,arguments),c=+y.apply(this,arguments),m=o.apply(this,arguments)-Y,x=A.apply(this,arguments)-Y,j=tn(x-m),l=x>m;if(r||(r=n=f()),c<i&&(g=c,c=i,i=g),!(c>d))r.moveTo(0,0);else if(j>on-d)r.moveTo(c*F(m),c*I(m)),r.arc(0,0,c,m,x,!l),i>d&&(r.moveTo(i*F(x),i*I(x)),r.arc(0,0,i,x,m,l));else{var M=m,R=x,w=m,q=x,B=j,z=j,E=s.apply(this,arguments)/2,O=E>d&&(v?+v.apply(this,arguments):J(i*i+c*c)),D=en(tn(c-i)/2,+p.apply(this,arguments)),T=D,P=D,e,a;if(O>d){var C=an(O/i*I(E)),L=an(O/c*I(E));(B-=C*2)>d?(C*=l?1:-1,w+=C,q-=C):(B=0,w=q=(m+x)/2),(z-=L*2)>d?(L*=l?1:-1,M+=L,R-=L):(z=0,M=R=(m+x)/2)}var G=c*F(M),H=c*I(M),Q=i*F(q),U=i*I(q);if(D>d){var V=c*F(R),W=c*I(R),Z=i*F(w),$=i*I(w),N;if(j<K)if(N=dn(G,H,Z,$,V,W,Q,U)){var b=G-N[0],k=H-N[1],_=V-N[0],nn=W-N[1],rn=1/I(gn((b*_+k*nn)/(J(b*b+k*k)*J(_*_+nn*nn)))/2),un=J(N[0]*N[0]+N[1]*N[1]);T=en(D,(i-un)/(rn-1)),P=en(D,(c-un)/(rn+1))}else T=P=0}z>d?P>d?(e=X(Z,$,G,H,c,P,l),a=X(V,W,Q,U,c,P,l),r.moveTo(e.cx+e.x01,e.cy+e.y01),P<D?r.arc(e.cx,e.cy,P,h(e.y01,e.x01),h(a.y01,a.x01),!l):(r.arc(e.cx,e.cy,P,h(e.y01,e.x01),h(e.y11,e.x11),!l),r.arc(0,0,c,h(e.cy+e.y11,e.cx+e.x11),h(a.cy+a.y11,a.cx+a.x11),!l),r.arc(a.cx,a.cy,P,h(a.y11,a.x11),h(a.y01,a.x01),!l))):(r.moveTo(G,H),r.arc(0,0,c,M,R,!l)):r.moveTo(G,H),!(i>d)||!(B>d)?r.lineTo(Q,U):T>d?(e=X(Q,U,V,W,i,-T,l),a=X(G,H,Z,$,i,-T,l),r.lineTo(e.cx+e.x01,e.cy+e.y01),T<D?r.arc(e.cx,e.cy,T,h(e.y01,e.x01),h(a.y01,a.x01),!l):(r.arc(e.cx,e.cy,T,h(e.y01,e.x01),h(e.y11,e.x11),!l),r.arc(0,0,i,h(e.cy+e.y11,e.cx+e.x11),h(a.cy+a.y11,a.cx+a.x11),l),r.arc(a.cx,a.cy,T,h(a.y11,a.x11),h(a.y01,a.x01),!l))):r.arc(0,0,i,q,w,l)}if(r.closePath(),n)return r=null,n+""||null}return t.centroid=function(){var n=(+u.apply(this,arguments)+ +y.apply(this,arguments))/2,g=(+o.apply(this,arguments)+ +A.apply(this,arguments))/2-K/2;return[F(g)*n,I(g)*n]},t.innerRadius=function(n){return arguments.length?(u=typeof n=="function"?n:S(+n),t):u},t.outerRadius=function(n){return arguments.length?(y=typeof n=="function"?n:S(+n),t):y},t.cornerRadius=function(n){return arguments.length?(p=typeof n=="function"?n:S(+n),t):p},t.padRadius=function(n){return arguments.length?(v=n==null?null:typeof n=="function"?n:S(+n),t):v},t.startAngle=function(n){return arguments.length?(o=typeof n=="function"?n:S(+n),t):o},t.endAngle=function(n){return arguments.length?(A=typeof n=="function"?n:S(+n),t):A},t.padAngle=function(n){return arguments.length?(s=typeof n=="function"?n:S(+n),t):s},t.context=function(n){return arguments.length?(r=n??null,t):r},t}export{Mn as d,Rn as p};
