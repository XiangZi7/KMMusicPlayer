import{a as L}from"./dayjs-3c9a3002.js";const C=2147483647,l=36,m=1,w=26,q=38,N=700,k=72,j=128,B="-",V=/^xn--/,U=/[^\0-\x7F]/,$=/[\x2E\u3002\uFF0E\uFF61]/g,z={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},v=l-m,f=Math.floor,F=String.fromCharCode;function p(t){throw new RangeError(z[t])}function R(t,e){const o=[];let n=t.length;for(;n--;)o[n]=e(t[n]);return o}function D(t,e){const o=t.split("@");let n="";o.length>1&&(n=o[0]+"@",t=o[1]),t=t.replace($,".");const s=t.split("."),r=R(s,e).join(".");return n+r}function A(t){const e=[];let o=0;const n=t.length;for(;o<n;){const s=t.charCodeAt(o++);if(s>=55296&&s<=56319&&o<n){const r=t.charCodeAt(o++);(r&64512)==56320?e.push(((s&1023)<<10)+(r&1023)+65536):(e.push(s),o--)}else e.push(s)}return e}const O=t=>String.fromCodePoint(...t),G=function(t){return t>=48&&t<58?26+(t-48):t>=65&&t<91?t-65:t>=97&&t<123?t-97:l},T=function(t,e){return t+22+75*(t<26)-((e!=0)<<5)},_=function(t,e,o){let n=0;for(t=o?f(t/N):t>>1,t+=f(t/e);t>v*w>>1;n+=l)t=f(t/v);return f(n+(v+1)*t/(t+q))},I=function(t){const e=[],o=t.length;let n=0,s=j,r=k,a=t.lastIndexOf(B);a<0&&(a=0);for(let c=0;c<a;++c)t.charCodeAt(c)>=128&&p("not-basic"),e.push(t.charCodeAt(c));for(let c=a>0?a+1:0;c<o;){const i=n;for(let u=1,h=l;;h+=l){c>=o&&p("invalid-input");const x=G(t.charCodeAt(c++));x>=l&&p("invalid-input"),x>f((C-n)/u)&&p("overflow"),n+=x*u;const g=h<=r?m:h>=r+w?w:h-r;if(x<g)break;const b=l-g;u>f(C/b)&&p("overflow"),u*=b}const d=e.length+1;r=_(n-i,d,i==0),f(n/d)>C-s&&p("overflow"),s+=f(n/d),n%=d,e.splice(n++,0,s)}return String.fromCodePoint(...e)},M=function(t){const e=[];t=A(t);const o=t.length;let n=j,s=0,r=k;for(const i of t)i<128&&e.push(F(i));const a=e.length;let c=a;for(a&&e.push(B);c<o;){let i=C;for(const u of t)u>=n&&u<i&&(i=u);const d=c+1;i-n>f((C-s)/d)&&p("overflow"),s+=(i-n)*d,n=i;for(const u of t)if(u<n&&++s>C&&p("overflow"),u===n){let h=s;for(let x=l;;x+=l){const g=x<=r?m:x>=r+w?w:x-r;if(h<g)break;const b=h-g,S=l-g;e.push(F(T(g+b%S,0))),h=f(b/S)}e.push(F(T(h,0))),r=_(s,d,c===a),s=0,++c}++s,++n}return e.join("")},y=function(t){return D(t,function(e){return V.test(e)?I(e.slice(4).toLowerCase()):e})},E=function(t){return D(t,function(e){return U.test(e)?"xn--"+M(e):e})},H={version:"2.1.0",ucs2:{decode:A,encode:O},decode:I,encode:M,toASCII:E,toUnicode:y},J=Object.freeze(Object.defineProperty({__proto__:null,decode:I,default:H,encode:M,toASCII:E,toUnicode:y,ucs2decode:A,ucs2encode:O},Symbol.toStringTag,{value:"Module"})),Q=L(J);export{Q as r};
