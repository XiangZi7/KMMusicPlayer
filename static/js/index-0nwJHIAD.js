import"./vue-BZWOMMSN.js";import{v as d,_ as h}from"./index-zuhjlZEC.js";import{u as f}from"./vue-router-IRVoSInp.js";import{d as v,$ as g,af as y,g as k,c as a,a as i,R as x,aq as M,u as n,G as w,a7 as C,U as D,a6 as K,T as R,o,Y as B}from"./@vue-F4a5j40Z.js";import"./pinia-3ZJqzBWs.js";import"./element-plus-xJXzS9R-.js";import"./@element-plus-1E4uKyJ7.js";import"./@vueuse-C0SftM8Q.js";import"./lodash-es-S-9mw2Ow.js";import"./@ctrl--dareiTT.js";import"./@popperjs-NiN61gaS.js";import"./axios-52F-EHG1.js";import"./nprogress-8aEWLQce.js";import"./@babel-3yCADe9Y.js";import"./pinia-plugin-persistedstate-XbYvz584.js";const I={class:"search-container"},P={key:0},Q={key:0,class:"anime-list"},S=["onClick"],T=["src","alt"],V={class:"anime-title"},$={key:1,class:"no-content"},N=v({__name:"index",setup(U){const m=f(),e=g({animes:[],searchQuery:"",currentPage:1,loading:!1}),{animes:l,searchQuery:r,loading:u}=y(e);k(()=>{e.loading=!0,d({name:"刀剑神域"}).then(({data:t})=>{e.animes=t,e.loading=!1})});function p(){e.animes=[],e.loading=!0,d({name:e.searchQuery}).then(({data:t})=>{e.animes=t,e.loading=!1}).catch(t=>{console.error("Search error:",t)}).finally(()=>{e.loading=!1})}function _(t){m.push(`/anim/animeDetails?id=${t}`)}return(t,c)=>(o(),a("div",null,[i("div",I,[x(i("input",{"onUpdate:modelValue":c[0]||(c[0]=s=>w(r)?r.value=s:null),type:"text",class:"search-input",placeholder:"搜索动漫...",onKeydown:C(p,["enter"])},null,544),[[M,n(r)]])]),n(u)?R("",!0):(o(),a("div",P,[n(l).length>0?(o(),a("div",Q,[(o(!0),a(D,null,K(n(l),s=>(o(),a("div",{key:s.videoId,class:"anime-card",onClick:q=>_(s.videoId)},[i("img",{src:s.cover,alt:s.title,class:"anime-cover"},null,8,T),i("h3",V,B(s.title),1)],8,S))),128))])):(o(),a("div",$,"无内容"))]))]))}}),ee=h(N,[["__scopeId","data-v-c82407a0"],["__file","/home/runner/work/KM-Music-Player/KM-Music-Player/src/pages/anim/index.vue"]]);export{ee as default};
