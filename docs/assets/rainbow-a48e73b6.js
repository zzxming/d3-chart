import{R as N,c as d,e as A,f as I,C as P,g as w,h as m,n as p,j}from"./LoadingTip.vue_vue_type_script_setup_true_lang-9b00ff77.js";const q=Math.PI/180,G=180/Math.PI;var B=-.14861,M=1.78277,v=-.29227,g=-.90649,u=1.97294,x=u*g,y=u*M,C=M*v-g*B;function L(i){if(i instanceof r)return new r(i.h,i.s,i.l,i.opacity);i instanceof N||(i=d(i));var n=i.r/255,a=i.g/255,e=i.b/255,h=(C*e+x*n-y*a)/(C+x-y),t=e-h,c=(u*(a-h)-v*t)/g,o=Math.sqrt(c*c+t*t)/(u*h*(1-h)),l=o?Math.atan2(c,t)*G-120:NaN;return new r(l<0?l+360:l,o,h,i.opacity)}function s(i,n,a,e){return arguments.length===1?L(i):new r(i,n,a,e??1)}function r(i,n,a,e){this.h=+i,this.s=+n,this.l=+a,this.opacity=+e}A(r,s,I(P,{brighter(i){return i=i==null?w:Math.pow(w,i),new r(this.h,this.s,this.l*i,this.opacity)},darker(i){return i=i==null?m:Math.pow(m,i),new r(this.h,this.s,this.l*i,this.opacity)},rgb(){var i=isNaN(this.h)?0:(this.h+120)*q,n=+this.l,a=isNaN(this.s)?0:this.s*n*(1-n),e=Math.cos(i),h=Math.sin(i);return new N(255*(n+a*(B*e+M*h)),255*(n+a*(v*e+g*h)),255*(n+a*(u*e)),this.opacity)}}));function D(i){return function n(a){a=+a;function e(h,t){var c=i((h=s(h)).h,(t=s(t)).h),o=p(h.s,t.s),l=p(h.l,t.l),R=p(h.opacity,t.opacity);return function(b){return h.h=c(b),h.s=o(b),h.l=l(Math.pow(b,a)),h.opacity=R(b),h+""}}return e.gamma=n,e}(1)}D(j);var E=D(p);E(s(-100,.75,.35),s(80,1.5,.8));var $=E(s(260,.75,.35),s(80,1.5,.8)),f=s();function z(i){(i<0||i>1)&&(i-=Math.floor(i));var n=Math.abs(i-.5);return f.h=360*i-100,f.s=1.5-1.5*n,f.l=.8-.9*n,f+""}export{$ as c,z as i};
