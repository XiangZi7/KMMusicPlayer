var De=Object.defineProperty,Be=Object.defineProperties;var Ue=Object.getOwnPropertyDescriptors;var _e=Object.getOwnPropertySymbols;var He=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable;var he=(t,o,n)=>o in t?De(t,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[o]=n,B=(t,o)=>{for(var n in o||(o={}))He.call(o,n)&&he(t,n,o[n]);if(_e)for(var n of _e(o))qe.call(o,n)&&he(t,n,o[n]);return t},ne=(t,o)=>Be(t,Ue(o));var C=(t,o,n)=>new Promise((a,s)=>{var i=_=>{try{P(n.next(_))}catch(h){s(h)}},d=_=>{try{P(n.throw(_))}catch(h){s(h)}},P=_=>_.done?a(_.value):Promise.resolve(_.value).then(i,d);P((n=n.apply(t,o)).next())});import{x as j,C as Oe,Z as le,a7 as ce,e as $e,o as y,c as k,a as e,u as r,L as ge,ak as je,a9 as Ke,z as S,M as Ne,U as c,S as p,a6 as b,W as L,ap as xe,aq as Le,h as ke,ab as be,R as K,P as O,a8 as ie,O as Me,f as Fe,n as ae,X as Qe,Q as Ge,Y as We,as as Ze,T as Xe,at as Ye}from"./@vue-b6763d16.js";import{E as V,a as Je,b as e3,c as t3,d as s3,e as o3,f as n3,g as a3,h as i3,i as r3,j as l3,k as c3,l as d3,m as u3}from"./element-plus-aaf5bffe.js";import{d as Pe,c as m3}from"./pinia-358b124a.js";import{i as p3}from"./pinia-plugin-persist-4bd0ee57.js";import{a as _3}from"./axios-e76ab20a.js";import{u as de,c as h3,a as g3}from"./vue-router-6e50d621.js";import"./@element-plus-3d5ed1a4.js";import"./@vueuse-ae6f4f55.js";import"./lodash-es-9cc69f4e.js";import"./@ctrl-86a38320.js";import"./@popperjs-7c8154ca.js";import"./escape-html-19374969.js";import"./dayjs-39b5b250.js";import"./normalize-wheel-es-ed76fb12.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&a(d)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const re="#409EFF",ue=Pe({id:"GlobalState",state:()=>({userInfo:{id:1,username:"yxcr",avatar:"https://img2.baidu.com/it/u=2979343759,1090469389&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"},isLogin:!1,qrKey:"",themeConfig:{primary:re,isDark:!1},anthologyObj:{}}),getters:{doubleCount(t){return t.count*2}},actions:{change(){this.count+=2,this.msg="哈哈哈"},setThemeConfig(t){this.themeConfig=t},setAnthologyObj(t){this.anthologyObj=t}},persist:{enabled:!0,strategies:[{paths:["themeConfig"],storage:localStorage}]}}),ze=m3();ze.use(p3);function Ce(t){let o="";if(!/^\#?[0-9A-Fa-f]{6}$/.test(t))return V.warning("输入错误的hex");t=t.replace("#",""),o=t.match(/../g);for(let a=0;a<3;a++)o[a]=parseInt(o[a],16);return o}function Ee(t,o,n){let a=/^\d{1,3}$/;if(!a.test(t)||!a.test(o)||!a.test(n))return V.warning("输入错误的rgb颜色值");let s=[t.toString(16),o.toString(16),n.toString(16)];for(let i=0;i<3;i++)s[i].length==1&&(s[i]=`0${s[i]}`);return`#${s.join("")}`}function v3(t,o){if(!/^\#?[0-9A-Fa-f]{6}$/.test(t))return V.warning("输入错误的hex颜色值");let a=Ce(t);for(let s=0;s<3;s++)a[s]=Math.floor(a[s]*(1-o));return Ee(a[0],a[1],a[2])}function f3(t,o){if(!/^\#?[0-9A-Fa-f]{6}$/.test(t))return V.warning("输入错误的hex颜色值");let a=Ce(t);for(let s=0;s<3;s++)a[s]=Math.floor((255-a[s])*o+a[s]);return Ee(a[0],a[1],a[2])}const y3=()=>{const t=ue(),o=j(()=>t.themeConfig),n=()=>{const s=document.documentElement;o.value.isDark?s.setAttribute("class","dark"):s.setAttribute("class","")},a=s=>{s||(s=re,V({type:"success",message:`主题颜色已重置为 ${re}`})),t.setThemeConfig(ne(B({},o.value),{primary:s})),document.documentElement.style.setProperty("--el-color-primary-dark-2",`${v3(o.value.primary,.1)}`),document.documentElement.style.setProperty("--el-color-primary",o.value.primary);for(let i=1;i<=9;i++)document.documentElement.style.setProperty(`--el-color-primary-light-${i}`,`${f3(o.value.primary,i/10)}`)};return Oe(()=>{n(),a(o.value.primary)}),{switchDark:n,changePrimary:a}},m=_3.create({baseURL:"https://www.xiangzi77.tk/",changeOrigin:!0,withCredentials:!0});m.interceptors.request.use(t=>(t.method=="post"?t.data=ne(B({},t.data),{timestamp:Date.parse(new Date)/1e3}):t.method=="get"&&(t.params=B({timestamp:Date.parse(new Date)/1e3},t.params)),t),t=>(console.log(t),Promise.reject(t)));m.interceptors.response.use(t=>t,function(t){return Promise.reject(t)});const Os=t=>m.get(`cloudsearch?keywords=${t.keywords}&limit=${t.limit}&offset=${t.offset}&type=${t.type}`),js=t=>m.get(`song/url/v1?id=${t.id}&level=exhigh`),Ks=t=>m.get(`mv/url?id=${t.id}`),Ns=t=>m.get(`top/playlist?limit=${t.limit}&offset=${t.offset}`),Fs=t=>m.get(`/comment/mv?id=${t.id}&limit=${t.limit}&offset=${t.offset}`),Qs=()=>m.get("/personalized/newsong"),Gs=()=>m.get("/mv/first"),Ws=t=>m.get(`/mv/detail?mvid=${t}`),Zs=t=>m.get(`/dj/hot?limit=${t.limit}&offset=${t.offset}`),Xs=t=>m.get(`/playlist/detail?id=${t}`),Ys=t=>m.get(`/comment/playlist?id=${t.id}&limit=${t.limit}&offset=${t.offset}`),w3=()=>m.get("/logout"),ve=()=>m.post("login/status"),$3=t=>m.post(`/user/playlist?uid=${t}`),Js=()=>m.get("recommend/songs"),fe=()=>m.post("/login/qr/key"),ye=t=>m.post("/login/qr/create",t),x3=t=>m.post("/login/qr/check",t),L3=t=>m.get(`/lyric?id=${t}`),k3=t=>m.get("/comment/music",{params:t}),eo=t=>m.post("/video/search",t),to=t=>m.post("/video/chapter",t);const Ie=(t,o)=>{const n=t.__vccOpts||t;for(const[a,s]of o)n[a]=s;return n},T=t=>(xe("data-v-86d679f6"),t=t(),Le(),t),b3={class:"header"},M3=T(()=>e("div",{class:"menu-circle"},null,-1)),P3={class:"header-menu"},z3=T(()=>e("svg",{t:"1648618382129",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2830",width:"32",height:"32"},[e("path",{d:"M576 672c-6.4 0-19.2 0-25.6-6.4l-128-128c-12.8-12.8-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0s12.8 32 0 44.8L492.8 512l102.4 102.4c12.8 12.8 12.8 32 0 44.8C595.2 672 582.4 672 576 672z","p-id":"2831",fill:"#525B72"})],-1)),C3=[z3],E3={class:"search-bar"},I3=["onKeyup"],S3=T(()=>e("div",{class:"about"},[e("a",{href:"https://github.com/XiangZi7/KM-Music-Player/",target:"_blank"},"github"),e("a",{href:"https://github.com/XiangZi7/",target:"_blank"},"about")],-1)),V3={key:0,class:"header-profile"},A3={class:"card"},T3={class:"tools"},R3={class:"circle"},D3=T(()=>e("div",{class:"circle"},[e("span",{class:"yellow box"})],-1)),B3=T(()=>e("div",{class:"circle"},[e("span",{class:"green box"})],-1)),U3={class:"card__content"},H3={class:"demo-login"},q3=["src"],O3={class:"demo-login"},j3={class:"input-text"},K3={key:1,class:"header-profile"},N3=["src"],F3={class:"username"},Q3=T(()=>e("div",{class:"notification"},[e("span",{class:"notification-number"},"3"),e("svg",{t:"1648737299278",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"8950",width:"25",height:"25"},[e("path",{d:"M192.032 631.402667V404.725333C192.032 228.330667 335.285333 85.333333 512 85.333333s319.968 142.997333 319.968 319.392v226.677334l60.608 121.013333c10.645333 21.237333-4.832 46.218667-28.618667 46.218667H160.042667c-23.786667 0-39.253333-24.981333-28.618667-46.218667l60.608-121.013333z m620.16 103.36l-40.842667-81.536a31.893333 31.893333 0 0 1-3.381333-14.282667V404.725333c0-141.12-114.602667-255.509333-255.968-255.509333S256.032 263.605333 256.032 404.725333V638.933333c0 4.96-1.162667 9.845333-3.381333 14.293334l-40.842667 81.525333h600.384z m-443.306667 152.32a31.893333 31.893333 0 0 1-4.149333-44.981334 32.032 32.032 0 0 1 45.056-4.138666A159.36 159.36 0 0 0 512 874.773333a159.36 159.36 0 0 0 102.186667-36.8 32.032 32.032 0 0 1 45.056 4.138667 31.893333 31.893333 0 0 1-4.16 44.981333A223.402667 223.402667 0 0 1 512 938.666667c-52.981333 0-103.2-18.453333-143.114667-51.594667z","p-id":"8951",fill:"#525B72"})])],-1)),G3={__name:"headerBar",setup(t){const o=ue(),n=de(),a=le({list:[],kw:"",dialogVisible:!1,loginForm:{},loginPopup:!1,activeName:"first",qrimg:"",phone:""}),{list:s,kw:i,phone:d,dialogVisible:P,loginForm:_,loginPopup:h,activeName:w,qrimg:$}=ce(a),U=j(()=>o.isLogin),F=()=>{n.push({path:"/search",query:{keyWorks:i.value}})};$e(()=>C(this,null,function*(){ve().then(u=>{!u.data.data.account||u.data.data.account.status==-10?(V.success({message:"登录会解锁更多功能哦~",type:"success"}),o.isLogin=!1):(o.isLogin=!0,o.userInfo=u.data.data.profile)})}));const Q=()=>C(this,null,function*(){if(a.loginPopup=!0,!o.qrKey){const v=yield fe();o.qrKey=v.data.data.unikey}const u=yield ye({key:o.qrKey,qrimg:!0});a.qrimg=u.data.data.qrimg}),G=()=>C(this,null,function*(){yield w3(),o.qrKey="",o.userInfo="",o.isLogin=!1}),R=()=>C(this,null,function*(){const{data:u}=yield x3({key:o.qrKey});if(u.code==800){const v=yield fe();o.qrKey=v.data.data.unikey;const E=yield ye({key:o.qrKey,qrimg:!0});a.qrimg=E.data.data.qrimg}else u.code==803&&(ve().then(v=>{v.data.data.account.status==-10?o.isLogin=!1:(o.isLogin=!0,o.userInfo=v.data.data.profile)}),a.loginPopup=!1)}),W=u=>{console.log(u)},Z=()=>{};return(u,v)=>{const E=Je,D=e3,X=t3,Y=s3,H=o3,A=n3,J=a3;return y(),k("div",b3,[M3,e("div",P3,[e("a",{class:"menu-link is-active",href:"javascript:;",onClick:v[0]||(v[0]=z=>r(n).back())},C3)]),e("div",E3,[ge(e("input",{type:"text",placeholder:"Search",onKeyup:Ke(F,["enter"]),"onUpdate:modelValue":v[1]||(v[1]=z=>S(i)?i.value=z:null)},null,40,I3),[[je,r(i)]])]),S3,r(U)?(y(),k("div",K3,[c(J,null,{dropdown:p(()=>[c(A,null,{default:p(()=>[c(H,{onClick:G},{default:p(()=>[b("注销")]),_:1})]),_:1})]),default:p(()=>[e("img",{class:"profile-img",src:r(o).userInfo.avatarUrl,alt:""},null,8,N3)]),_:1}),e("div",F3,L(r(o).userInfo.nickname),1),Q3])):(y(),k("div",V3,[e("div",{class:"username"},[e("a",{href:"javascript:;",onClick:Q},"登录")]),ge(e("div",A3,[e("div",T3,[e("div",R3,[e("span",{onClick:v[2]||(v[2]=z=>h.value=!1),class:"red box"})]),D3,B3]),e("div",U3,[c(Y,{modelValue:r(w),"onUpdate:modelValue":v[4]||(v[4]=z=>S(w)?w.value=z:null),class:"login-tabs",onTabClick:W},{default:p(()=>[c(D,{label:"二维码登录",name:"first"},{default:p(()=>[e("div",H3,[e("img",{src:r($),alt:""},null,8,q3)]),e("div",null,[c(E,{onClick:R,type:"primary",style:{width:"100%","margin-top":"20px"},round:""},{default:p(()=>[b("验证")]),_:1})])]),_:1}),c(D,{label:"Cookie登录",name:"second"},{default:p(()=>[e("div",O3,[c(X,{type:"textarea",style:{width:"300px"},modelValue:r(d),"onUpdate:modelValue":v[3]||(v[3]=z=>S(d)?d.value=z:null),class:"demo-text",placeholder:"请输入Cookie"},null,8,["modelValue"]),e("div",j3,[c(E,{onClick:Z,type:"primary",style:{width:"100%","margin-top":"20px"},round:""},{default:p(()=>[b(" 确定")]),_:1})])])]),_:1})]),_:1},8,["modelValue"])])],512),[[Ne,r(h)]])]))])}}},W3=Ie(G3,[["__scopeId","data-v-86d679f6"]]),Z3=""+new URL("../png/logo2-7a418e02.png",import.meta.url).href,X3={class:"side-wrapper"},Y3=e("div",{class:"side-title flex",style:{"justify-content":"center"}},[e("img",{src:Z3,alt:"",style:{width:"150px"}})],-1),J3={class:"side-menu"},et=e("svg",{viewBox:"0 0 512 512"},[e("g",{xmlns:"http://www.w3.org/2000/svg",fill:"currentColor"},[e("path",{d:"M0 0h128v128H0zm0 0M192 0h128v128H192zm0 0M384 0h128v128H384zm0 0M0 192h128v128H0zm0 0","data-original":"#bfc9d1"})]),e("path",{xmlns:"http://www.w3.org/2000/svg",d:"M192 192h128v128H192zm0 0",fill:"currentColor","data-original":"#82b1ff"}),e("path",{xmlns:"http://www.w3.org/2000/svg",d:"M384 192h128v128H384zm0 0M0 384h128v128H0zm0 0M192 384h128v128H192zm0 0M384 384h128v128H384zm0 0",fill:"currentColor","data-original":"#bfc9d1"})],-1),tt={class:"side-wrapper"},st=e("div",{class:"side-title"},"发现",-1),ot={class:"side-menu"},nt=e("svg",{t:"1648737091540",class:"icon",viewBox:"0 0 1048 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"8016",width:"16",height:"16"},[e("path",{d:"M897.382953 128.420008h151.612645v40.976391h-151.612645zM0 128.420008h495.814326v40.976391H0zM770.356142 390.668908h278.639456v40.97639h-278.639456zM0 390.668908h495.814326v40.97639H0zM733.477391 636.527251h315.518207v40.97639h-315.518207zM0 636.527251h131.12445v40.97639H0z",fill:"#525B72","p-id":"8017"}),e("path",{d:"M440.598639 786.234494m-192.691476 0a192.691477 192.691477 0 1 0 385.382953 0 192.691477 192.691477 0 1 0-385.382953 0Z",fill:"#525B72","p-id":"8018"}),e("path",{d:"M440.598639 999.414166c-117.548972 0-213.179672-95.634798-213.179671-213.179672s95.6307-213.175574 213.179671-213.175574c117.548972 0 213.179672 95.6307 213.179672 213.175574S558.147611 999.414166 440.598639 999.414166z m0-385.382954c-94.95459 0-172.203281 77.252789-172.203281 172.199184 0 94.95459 77.248691 172.203281 172.203281 172.203281 94.950492 0 172.203281-77.252789 172.203282-172.203281 0-94.946395-77.252789-172.199184-172.203282-172.199184z",fill:"#525B72","p-id":"8019"}),e("path",{d:"M633.290116 786.234494V196.481793L792.893157 36.878752v217.994397l-159.603041 159.603041",fill:"#525B72","p-id":"8020"}),e("path",{d:"M653.778311 786.234494h-40.97639V196.481793c0-5.433469 2.155358-10.645666 6.003041-14.489252l159.603041-159.603041A20.488195 20.488195 0 0 1 813.381353 36.878752v217.994397a20.475902 20.475902 0 0 1-6.003042 14.489252l-153.6 153.604098v363.267995z m0-581.266491v160.045586l118.626651-118.62665V86.341353l-118.626651 118.62665z",fill:"#525B72","p-id":"8021"}),e("path",{d:"M431.866571 661.154062c75.929252 0 137.705258 54.265034 137.705258 120.974597S507.795822 903.119648 431.866571 903.119648s-137.705258-54.273229-137.705258-120.982793 61.776006-120.982793 137.705258-120.982793z m-199.169844 120.982793c0 100.605234 89.34902 182.447379 199.169844 182.447379S631.036415 882.742089 631.036415 782.136855c0-100.601136-89.34902-182.439184-199.169844-182.439184s-199.169844 81.838047-199.169844 182.439184z",fill:"#525B72",opacity:".1","p-id":"8022"}),e("path",{d:"M618.804962 349.995742L779.534854 189.269948l28.970308 28.970308-160.725794 160.729892z",fill:"#525B72",opacity:".15","p-id":"8023"}),e("path",{d:"M397.77559 758.955416a32.777015 42.0008 76.768 1 0-15.004963-63.81365 32.777015 42.0008 76.768 1 0 15.004963 63.81365Z",fill:"#525B72",opacity:".53","p-id":"8024"})],-1),at=e("svg",{viewBox:"0 0 58 58",fill:"currentColor"},[e("path",{d:"M57 6H1a1 1 0 00-1 1v44a1 1 0 001 1h56a1 1 0 001-1V7a1 1 0 00-1-1zM10 50H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2v-9h8v9zm0-11H2V8h8v9zm26.537 12.844l-11 7a1.007 1.007 0 01-1.018.033A1.001 1.001 0 0124 36V22a1.001 1.001 0 011.538-.844l11 7a1.003 1.003 0 01-.001 1.688zM56 50h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8v-9h8v9zm0-11h-8V8h8v9z"})],-1),it=e("svg",{t:"1648736357046",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2542",width:"16",height:"16"},[e("path",{d:"M836.778667 273.749333H271.530667l96.085333-96.085333c13.312-13.312 13.312-34.986667 0-48.298667s-34.986667-13.312-48.298667 0l-166.229333 166.058667c-0.512 0.512-0.853333 1.194667-1.365333 1.706667a102.570667 102.570667 0 0 0-37.376 79.018666v419.84c0 56.490667 45.909333 102.4 102.4 102.4h619.690666c56.490667 0 102.4-45.909333 102.4-102.4v-419.84c0.341333-56.490667-45.568-102.4-102.058666-102.4z m34.133333 522.24c0 18.773333-15.36 34.133333-34.133333 34.133334H217.088c-18.773333 0-34.133333-15.36-34.133333-34.133334v-419.84c0-18.773333 15.36-34.133333 34.133333-34.133333h619.690667c18.773333 0 34.133333 15.36 34.133333 34.133333v419.84z","p-id":"2543",fill:"#525B72"}),e("path",{d:"M383.317333 438.954667c-76.458667 0-138.581333 62.122667-138.581333 138.581333 0 76.458667 62.122667 138.581333 138.581333 138.581333 76.288 0 138.581333-62.122667 138.581334-138.581333-0.170667-76.458667-62.293333-138.581333-138.581334-138.581333z m0 208.725333c-38.741333 0-70.314667-31.573333-70.314666-70.314667s31.573333-70.314667 70.314666-70.314666 70.314667 31.573333 70.314667 70.314666-31.573333 70.314667-70.314667 70.314667zM757.930667 477.866667h-136.533334c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533334a34.133333 34.133333 0 1 0 0-68.266666zM757.930667 619.52h-136.533334c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h136.533334a34.133333 34.133333 0 1 0 0-68.266667z","p-id":"2544",fill:"#525B72"})],-1),rt=e("span",{class:"notification-number updates"},"3",-1),lt=e("svg",{t:"1648736548811",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4365",width:"20",height:"20"},[e("path",{d:"M964.608 234.496c-46.08-52.565333-104.789333-93.696-169.642667-118.784a34.030933 34.030933 0 0 0-46.421333 31.744v420.352a178.005333 178.005333 0 0 0-110.933333-38.741333c-98.816 0-179.2 80.384-179.2 179.2S538.794667 887.466667 637.610667 887.466667s179.2-80.384 179.2-179.2c0-1.877333-0.170667-3.754667-0.341334-5.632 0-1.024 0.341333-1.877333 0.341334-2.901334V201.216c36.181333 20.309333 69.12 46.933333 96.597333 78.165333 12.458667 14.165333 34.133333 15.530667 48.128 3.072 14.165333-12.288 15.530667-33.792 3.072-47.957333zM637.610667 819.2c-61.098667 0-110.933333-49.834667-110.933334-110.933333s49.834667-110.933333 110.933334-110.933334 110.933333 49.834667 110.933333 110.933334-49.834667 110.933333-110.933333 110.933333zM185.344 307.2h392.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133334h-392.533333a34.133333 34.133333 0 1 0 0 68.266667zM424.277333 460.8h-238.933333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133334h238.933333c18.773333 0 34.133333-15.36 34.133334-34.133334s-15.36-34.133333-34.133334-34.133333zM321.877333 682.666667h-136.533333c-18.773333 0-34.133333 15.36-34.133333 34.133333s15.36 34.133333 34.133333 34.133333h136.533333c18.773333 0 34.133333-15.36 34.133334-34.133333s-15.36-34.133333-34.133334-34.133333z","p-id":"4366",fill:"#525B72"})],-1),ct=e("svg",{t:"1686815711340",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"3536",width:"28",height:"28"},[e("path",{d:"M844.832 885.344c-30.485333-20.714667-77.781333-18.965333-144.053333 9.386667A425.024 425.024 0 0 1 512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667a425.013333 425.013333 0 0 1-44.405334 189.717333 32 32 0 0 1-57.301333-28.490666A361.013333 361.013333 0 0 0 874.666667 512c0-200.298667-162.368-362.666667-362.666667-362.666667S149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667c56.704 0 111.488-13.013333 161.12-37.653334l1.6-0.746666c84.746667-36.437333 154.176-39.125333 206.08-3.861334a32 32 0 1 1-35.968 52.938667zM512 416a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m160 160a64 64 0 1 1 0-128 64 64 0 0 1 0 128zM512 736a64 64 0 1 1 0-128 64 64 0 0 1 0 128zM352 576a64 64 0 1 1 0-128 64 64 0 0 1 0 128z",fill:"#000000","p-id":"3537"})],-1),dt=e("svg",{t:"1686815748873",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4565",width:"28",height:"28"},[e("path",{d:"M704 128a32 32 0 0 1 0 64h-21.333333v160.789333a10.666667 10.666667 0 0 0 1.088 4.693334l180.874666 369.6c28.48 58.218667 4.384 128.490667-53.813333 156.970666A117.333333 117.333333 0 0 1 759.242667 896H264.746667c-64.8 0-117.333333-52.533333-117.333334-117.333333a117.333333 117.333333 0 0 1 11.946667-51.573334l180.874667-369.621333a10.666667 10.666667 0 0 0 1.088-4.693333V192h-21.333334a32 32 0 0 1-31.946666-30.122667L288 160a32 32 0 0 1 32-32z m51.968 522.666667H268.010667l-51.157334 104.554666A53.333333 53.333333 0 0 0 264.757333 832H759.253333a53.333333 53.333333 0 0 0 47.893334-76.778667L755.978667 650.666667zM618.666667 192H405.333333v160.789333a74.666667 74.666667 0 0 1-7.594666 32.821334L299.328 586.666667h425.322667l-98.389334-201.066667A74.666667 74.666667 0 0 1 618.666667 352.8V192z",fill:"#000000","p-id":"4566"})],-1),ut={class:"side-wrapper"},mt=e("div",{class:"side-title"},"美化",-1),pt={class:"side-menu"},_t=e("svg",{viewBox:"0 0 512 512",fill:"currentColor"},[e("path",{d:"M499.377 46.402c-8.014-8.006-18.662-12.485-29.985-12.613a41.13 41.13 0 00-.496-.003c-11.142 0-21.698 4.229-29.771 11.945L198.872 275.458c25.716 6.555 47.683 23.057 62.044 47.196a113.544 113.544 0 0110.453 23.179L500.06 106.661C507.759 98.604 512 88.031 512 76.89c0-11.507-4.478-22.33-12.623-30.488zM176.588 302.344a86.035 86.035 0 00-3.626-.076c-20.273 0-40.381 7.05-56.784 18.851-19.772 14.225-27.656 34.656-42.174 53.27C55.8 397.728 27.795 409.14 0 416.923c16.187 42.781 76.32 60.297 115.752 61.24 1.416.034 2.839.051 4.273.051 44.646 0 97.233-16.594 118.755-60.522 23.628-48.224-5.496-112.975-62.192-115.348z"})],-1),ht={key:0,class:"side-wrapper"},gt=e("div",{class:"side-title"},"收藏",-1),vt={class:"side-menu"},ft=["onClick"],yt=["src"],wt={class:"side-menu-title"},$t={style:{"font-size":"8px"}},xt={__name:"MenuBar",setup(t){const o=ue(),n=de(),a=le({list:[]}),{list:s}=ce(a);ke(()=>o.userInfo.userId,()=>C(this,null,function*(){o.userInfo.userId&&$3(o.userInfo.userId).then(({data:d})=>{a.list=d.playlist})}),{immediate:!0});const i=d=>{n.push({path:"/playList",query:{id:d}})};return(d,P)=>{const _=be("router-link"),h=i3;return y(),K(h,{class:"left-side"},{default:p(()=>[e("div",X3,[Y3,e("div",J3,[c(_,{to:"/"},{default:p(()=>[et,b(" 首页 ")]),_:1})])]),e("div",tt,[st,e("div",ot,[c(_,{to:"/musiclibrary"},{default:p(()=>[nt,b(" 乐库 ")]),_:1}),c(_,{to:"/mv"},{default:p(()=>[at,b(" 视频 ")]),_:1}),c(_,{to:"/radio"},{default:p(()=>[it,b(" 电台 "),rt]),_:1}),c(_,{to:"/songList"},{default:p(()=>[lt,b(" 歌单 ")]),_:1}),c(_,{to:"/animation"},{default:p(()=>[ct,b(" 动漫 ")]),_:1}),c(_,{to:"/testPlayer"},{default:p(()=>[dt,b(" 测试 ")]),_:1})])]),e("div",ut,[mt,e("div",pt,[c(_,{to:"/theme"},{default:p(()=>[_t,b(" 主题 ")]),_:1})])]),r(s).length?(y(),k("div",ht,[gt,e("div",vt,[(y(!0),k(O,null,ie(r(s),(w,$)=>(y(),k("a",{href:"javascript:;",style:{padding:"5px 10px 5px 10px"},onClick:U=>i(w.id),key:$},[e("img",{src:w.coverImgUrl+"?param=28y28",alt:"",class:"side-menu-cover"},null,8,yt),e("div",wt,[e("span",null,L(w.name),1),e("span",$t,"共"+L(w.trackCount)+"首",1)])],8,ft))),128))])])):Me("",!0)]),_:1})}}},Lt=""+new URL("../svg/上一首-9500a10d.svg",import.meta.url).href,kt=""+new URL("../svg/下一首-4ecd874e.svg",import.meta.url).href,bt=""+new URL("../svg/声音-04619f19.svg",import.meta.url).href,Mt=""+new URL("../svg/列表-8863e00a.svg",import.meta.url).href,Pt=""+new URL("../png/vinyl-61de2589.png",import.meta.url).href;const zt=""+new URL("../svg/播放-8ef958fe.svg",import.meta.url).href,Ct=""+new URL("../svg/暂停-82df03f8.svg",import.meta.url).href,Et=""+new URL("../svg/sequence-33ffbeed.svg",import.meta.url).href,It=""+new URL("../svg/cycle-2d287b66.svg",import.meta.url).href,St=""+new URL("../svg/random-bdd1c63a.svg",import.meta.url).href,Vt=Pe({id:"musicStore",state:()=>({count:0,songs:[{id:"27591651",title:"Intro AE 86",singer:"陈光荣",album:"頭文字[イニシャル]D THE MOVIE SOUND TUNE",cover:"http://p4.music.126.net/9KeyafHLjadqSQTRS_tN5Q==/5741649720318487.jpg",src:"http://music.163.com/song/media/outer/url?id=27591651.mp3",time:149e3,mv:"",Lyric:""},{id:"409872504",title:"Ninelie",singer:"Aimer",album:"ninelie EP",cover:"http://p3.music.126.net/g7aakYG_Wfmrn1_IDfVUXA==/109951165050166241.jpg",src:"http://music.163.com/song/media/outer/url?id=409872504.mp3",time:260675,mv:"",Lyric:""}],currentIndex:0}),actions:{inc(){this.count++},updateSongs(t){this.songs[this.currentIndex]=Object.assign(this.songs[this.currentIndex],B({},t))}},persist:{enabled:!0,strategies:[{paths:["songs"],storage:localStorage}]}});const N=t=>(xe("data-v-8c3b6df6"),t=t(),Le(),t),At=["src"],Tt={class:"playerbox"},Rt={class:"m-tandc"},Dt=["src"],Bt={class:"titleandsinger"},Ut={href:"javascript:;"},Ht={href:"javascript:;",style:{"font-size":"13px"}},qt={class:"btns"},Ot={class:"aplayer"},jt={class:"m-btns"},Kt=["src"],Nt=N(()=>e("img",{src:Lt,alt:"",class:"Musicice"},null,-1)),Ft=[Nt],Qt=["src"],Gt=N(()=>e("img",{src:kt,alt:"",class:"Musicice"},null,-1)),Wt=[Gt],Zt={class:"slider-demo-block rightvoice"},Xt=N(()=>e("a",{href:"javascript:;"},[e("img",{src:bt,alt:"",width:"20"})],-1)),Yt={class:"notification-number"},Jt=N(()=>e("img",{src:Mt,alt:"",class:"Musicice"},null,-1)),es={class:"m-slider"},ts={class:"prismColor"},ss={class:"slider-demo-block"},os={class:"prismColor",style:{"margin-left":"18px"}},ns={class:"showMusicBox"},as={style:{"margin-right":"150px"}},is={style:{position:"relative"}},rs={class:"lyrics-container"},ls={class:"comments"},cs={class:"content-section",style:{"margin-top":"0"}},ds={class:"apps-card"},us={class:"app-card__subtext"},ms={key:0,class:"app-card__footer"},ps={class:"pagination"},_s={__name:"Player",setup(t){const o=de(),n=Vt(),a=Fe(),s=le({list:[],volumes:70,playing:!1,currentIndex:0,mode:0,progress:0,duration:0,currentTime:0,playerMode:[{model:"顺序播放",icon:Et},{model:"单曲循环",icon:It},{model:"随机播放",icon:St}],isPlayerModel:[{model:"播放",icon:zt},{model:"暂停",icon:Ct}],currenPlayerState:"",drawer:!1,animationPlayState:"paused",parsedLyrics:[],currentLine:-1,commentsList:[],currentCommentsPage:1,CommentsTotal:0,loading:!0}),{list:i,volumes:d,currentTime:P,duration:_,progress:h,currenPlayerState:w,drawer:$,animationPlayState:U,parsedLyrics:F,currentLine:Q,commentsList:G,currentCommentsPage:R,CommentsTotal:W,loading:Z}=ce(s),u=j(()=>n.songs[n.currentIndex]),v=j(()=>s.playerMode[s.mode]);$e(()=>{D(),a.value.src=u.value.src,s.currenPlayerState=s.isPlayerModel[0].icon,ee(),s.parsedLyrics=pe(u.value.Lyric)}),ke(()=>n.currentIndex,()=>{E(),ee()});const E=()=>C(this,null,function*(){u.value.Lyric||L3(u.value.id).then(g=>{let l="";try{l=g.data.lrc.lyric}catch(M){l="",console.error(M)}n.updateSongs({Lyric:l})}),s.parsedLyrics=pe(u.value.Lyric),s.animationPlayState="running",s.playing=!0,s.currenPlayerState=s.isPlayerModel[1].icon,ae(()=>{a.value.play()})}),D=()=>{s.animationPlayState="paused",s.playing=!1,s.currenPlayerState=s.isPlayerModel[0].icon,ae(()=>{a.value.pause()})},X=()=>{s.playing?D():E()},Y=()=>{n.currentIndex===0?n.currentIndex=n.songs.length-1:n.currentIndex--,A()},H=()=>{n.currentIndex===n.songs.length-1?n.currentIndex=0:n.currentIndex++,A()},A=()=>{ae(()=>{a.value.src=u.value.src,a.value.play(),s.playing=!0,s.currenPlayerState=s.isPlayerModel[1].icon})},J=()=>{switch(s.mode){case 0:H();break;case 1:A();break;case 2:const g=Math.floor(Math.random()*n.songs.length);n.currentIndex=g,A();break}},z=()=>C(this,null,function*(){if(s.currentTime=Math.floor(a.value.currentTime),s.progress=s.currentTime/s.duration*100,!s.parsedLyrics)return;for(let l=0;l<s.parsedLyrics.length;l++)if(l===s.parsedLyrics.length-1||s.currentTime<s.parsedLyrics[l+1].time){s.currentLine=l;break}const g=document.querySelector(".lyrics-container li.active");if(g){const l=document.querySelector(".lyrics-container ul");l.scrollTop=g.offsetTop-l.clientHeight/2+g.clientHeight}}),Se=()=>{s.duration=Math.floor(a.value.duration)},Ve=()=>{s.mode===2?s.mode=0:s.mode++,V.success({message:s.playerMode[s.mode].model,type:"success"})},me=g=>{const l=Math.floor(g/60),M=g%60;return`${l}:${M.toString().padStart(2,"0")}`},Ae=g=>{let l=s.progress*s.duration/100;isNaN(l)||(a.value.currentTime=l)},Te=g=>{a.value.volume=g/100},pe=g=>g?g.split(`
`).map(M=>{const I=M.match(/^\[(\d{2}):(\d{2}\.\d{2,3})\](.*)/);if(I){const te=parseInt(I[1]),se=parseFloat(I[2]),oe=I[3].trim();return{time:te*60+se,text:oe}}else return null}).filter(M=>M!==null):void 0,Re=()=>{ee()},ee=()=>{s.loading=!0,s.commentsList=[],k3({id:u.value.id,offset:(s.currentCommentsPage-1)*20,limit:20}).then(g=>{s.commentsList=g.data,s.CommentsTotal=g.data.total,s.loading=!1})};return(g,l)=>{const M=r3,I=l3,te=c3,se=d3,oe=u3;return y(),k(O,null,[e("audio",{ref_key:"audio",ref:a,src:r(u).src,onTimeupdate:z,onDurationchange:Se,onEnded:J},null,40,At),e("div",Tt,[e("div",Rt,[e("img",{src:r(u).cover+"?param=91y90",alt:"",onClick:l[0]||(l[0]=f=>$.value=!r($))},null,8,Dt),e("div",Bt,[e("a",Ut,L(r(u).title),1),e("a",Ht,L(r(u).singer),1)])]),e("div",qt,[e("div",Ot,[e("div",jt,[e("a",{href:"javascript:;",onClick:Ve},[e("img",{src:r(v).icon,alt:"",class:"Musicice"},null,8,Kt)]),e("a",{href:"javascript:;",onClick:Y},Ft),e("a",{href:"javascript:;",onClick:X},[e("img",{src:r(w),alt:""},null,8,Qt)]),e("a",{href:"javascript:;",onClick:H},Wt)]),e("div",Zt,[Xt,c(M,{modelValue:r(d),"onUpdate:modelValue":l[1]||(l[1]=f=>S(d)?d.value=f:null),onChange:Te,style:{width:"70px"},"show-tooltip":!0},null,8,["modelValue"]),e("a",{href:"javascript:;",onClick:l[2]||(l[2]=f=>r(o).push({path:"/currentPlaylist"}))},[e("span",Yt,L(r(n).songs.length),1),Jt])])]),e("div",es,[e("span",ts,L(me(r(P))),1),e("div",ss,[c(M,{modelValue:r(h),"onUpdate:modelValue":l[3]||(l[3]=f=>S(h)?h.value=f:null),"show-tooltip":!1,onChange:Ae,style:{width:"400px"}},null,8,["modelValue"])]),e("span",os,L(me(r(_))),1)])]),c(oe,{title:"",modal:!1,modelValue:r($),"onUpdate:modelValue":l[5]||(l[5]=f=>S($)?$.value=f:null),direction:"ttb","destroy-on-close":"",size:"89.5%"},{default:p(()=>[e("div",null,[e("div",ns,[e("div",as,[e("div",is,[e("img",{class:"vinyl rotate",style:Qe({animationPlayState:r(U)}),src:Pt,alt:""},null,4),c(I,{class:"elImg",src:r(u).cover+"?param=350y350"},null,8,["src"])])]),e("div",rs,[e("ul",null,[(y(!0),k(O,null,ie(r(F),(f,q)=>(y(),k("li",{key:q,class:Ge({active:r(Q)===q})},L(f.text),3))),128))])])]),e("div",ls,[e("div",cs,[e("div",ds,[c(te,{rows:5,animated:"",loading:r(Z)},{default:p(()=>[(y(!0),k(O,null,ie(r(G).comments,(f,q)=>(y(),k("div",{class:"app-card usercom",key:q},[e("span",null,[c(I,{class:"useravatar",src:f.user.avatarUrl+"?param=32y32",alt:""},null,8,["src"]),b(" "+L(f.user.nickname),1)]),e("div",us,L(f.content),1),f.ipLocation.location?(y(),k("div",ms,[e("span",null,"IP:"+L(f.ipLocation.location),1),e("span",null,L(f.timeStr),1)])):Me("",!0)]))),128))]),_:1},8,["loading"])])])])]),e("div",ps,[c(se,{onCurrentChange:Re,currentPage:r(R),"onUpdate:currentPage":l[4]||(l[4]=f=>S(R)?R.value=f:null),"page-size":30,layout:"prev, pager, next, jumper",total:r(W)},null,8,["currentPage","total"])])]),_:1},8,["modelValue"])])],64)}}},hs=Ie(_s,[["__scopeId","data-v-8c3b6df6"]]),gs={class:"app"},vs={class:"wrapper"},fs={class:"main-container"},ys={class:"content-wrapper"},ws=e("div",{class:"overlay-app"},null,-1),$s={__name:"default",setup(t){return(o,n)=>{const a=be("router-view");return y(),k("div",gs,[c(W3),e("div",vs,[c(xt),e("div",fs,[e("div",ys,[c(a,null,{default:p(({Component:s})=>[c(We,{name:"el-fade-in-linear"},{default:p(()=>[(y(),K(Ze,null,[(y(),K(Xe(s)))],1024))]),_:2},1024)]),_:1})]),c(hs)])]),ws])}}},xs={__name:"App",setup(t){return y3(),(o,n)=>(y(),K($s))}},Ls="modulepreload",ks=function(t,o){return new URL(t,o).href},we={},x=function(o,n,a){if(!n||n.length===0)return o();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=ks(i,a),i in we)return;we[i]=!0;const d=i.endsWith(".css"),P=d?'[rel="stylesheet"]':"";if(!!a)for(let w=s.length-1;w>=0;w--){const $=s[w];if($.href===i&&(!d||$.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${P}`))return;const h=document.createElement("link");if(h.rel=d?"stylesheet":Ls,d||(h.as="script",h.crossOrigin=""),h.href=i,document.head.appendChild(h),d)return new Promise((w,$)=>{h.addEventListener("load",w),h.addEventListener("error",()=>$(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>o())},bs=[{path:"/",component:()=>x(()=>import("./index-ecce07fd.js"),["./index-ecce07fd.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./musicTable-806e2cba.js","./formatTime-3cb25965.js","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/musiclibrary",component:()=>x(()=>import("./index-488d4ab3.js"),["./index-488d4ab3.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./musicTable-806e2cba.js","./formatTime-3cb25965.js","./vue-router-6e50d621.js","./index-c694e0cf.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js","./index-79f0e796.js","../css/index-e6ebd8c5.css"],import.meta.url),meta:{keepAlive:!0}},{path:"/mv",component:()=>x(()=>import("./index-c694e0cf.js"),["./index-c694e0cf.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/mv/:id",name:"mv",component:()=>x(()=>import("./_id_-b1d46d4c.js"),["./_id_-b1d46d4c.js","./vue-router-6e50d621.js","./@vue-b6763d16.js","./element-plus-aaf5bffe.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url)},{path:"/radio",component:()=>x(()=>import("./index-8cc1e3a7.js"),["./index-8cc1e3a7.js","./vue-router-6e50d621.js","./@vue-b6763d16.js","./element-plus-aaf5bffe.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/songList",component:()=>x(()=>import("./index-79f0e796.js"),["./index-79f0e796.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/testPlayer",component:()=>x(()=>import("./index-8a732dc0.js"),["./index-8a732dc0.js","./@vue-b6763d16.js","./element-plus-aaf5bffe.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js","./vue-router-6e50d621.js","../css/index-707c4271.css"],import.meta.url)},{path:"/theme",component:()=>x(()=>import("./index-1d93ff9a.js"),["./index-1d93ff9a.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./axios-e76ab20a.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./vue-router-6e50d621.js","../css/index-385640bd.css"],import.meta.url),meta:{keepAlive:!0}},{path:"/search",component:()=>x(()=>import("./index-e1673069.js"),["./index-e1673069.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./musicTable-806e2cba.js","./formatTime-3cb25965.js","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/playList",component:()=>x(()=>import("./index-019c8601.js"),["./index-019c8601.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./musicTable-806e2cba.js","./formatTime-3cb25965.js","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/currentPlaylist",component:()=>x(()=>import("./index-47d94963.js"),["./index-47d94963.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./formatTime-3cb25965.js","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js"],import.meta.url),meta:{keepAlive:!0}},{path:"/animation",component:()=>x(()=>import("./index-ec4222ba.js"),["./index-ec4222ba.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js","../css/index-87bb87ef.css"],import.meta.url),meta:{keepAlive:!0}},{path:"/animation/:id",name:"animation",component:()=>x(()=>import("./_id_-8c9c2171.js"),["./_id_-8c9c2171.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js","../css/_id_-fde6963d.css"],import.meta.url)},{path:"/animation/player/:id",name:"playerAnimation",component:()=>x(()=>import("./player-f46aab5a.js"),["./player-f46aab5a.js","./element-plus-aaf5bffe.js","./@vue-b6763d16.js","./@element-plus-3d5ed1a4.js","./@vueuse-ae6f4f55.js","./lodash-es-9cc69f4e.js","./@ctrl-86a38320.js","./@popperjs-7c8154ca.js","./escape-html-19374969.js","./dayjs-39b5b250.js","./normalize-wheel-es-ed76fb12.js","../css/element-plus-c3c43290.css","./vue3-video-play-41f26068.js","../css/vue3-video-play-038d1592.css","./vue-router-6e50d621.js","./pinia-358b124a.js","./pinia-plugin-persist-4bd0ee57.js","./axios-e76ab20a.js","../css/player-99b026fd.css"],import.meta.url)}],Ms=h3({history:g3(),routes:bs});Ye(xs).use(ze).use(Ms).mount("#app");export{re as D,ue as G,Ie as _,Gs as a,Ws as b,Fs as c,Os as d,Vt as e,Ys as f,Zs as g,js as h,to as i,Ks as m,Qs as n,Xs as p,Js as r,Ns as s,y3 as u,eo as v};
