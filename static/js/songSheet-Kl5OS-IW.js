import"./vue-BZWOMMSN.js";import{o as i,c as l,a as s,r as M,w as k,d as x,at as V,ap as T,F as w,U as Z,a6 as $,Y as m,e as q,T as C}from"./@vue-F4a5j40Z.js";import{b as P,f as H,d as L,_ as S}from"./index-zuhjlZEC.js";const B={viewBox:"0 0 256 256",width:"1.2em",height:"1.2em"},D=s("path",{fill:"currentColor",d:"M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16M40 88h80v80H40Zm96-16V56h32v16Zm-16 0H88V56h32Zm0 112v16H88v-16Zm16 0h32v16h-32Zm0-16V88h80v80Zm80-96h-32V56h32ZM72 56v16H40V56ZM40 184h32v16H40Zm176 16h-32v-16h32z"},null,-1),E=[D];function j(o,d){return i(),l("svg",B,[...E])}const A={name:"ph-film-strip",render:j},F={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"},I=s("path",{fill:"currentColor",d:"m10.65 15.75l4.875-3.125q.35-.225.35-.625t-.35-.625L10.65 8.25q-.375-.25-.763-.038t-.387.663v6.25q0 .45.388.663t.762-.038M12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"},null,-1),N=[I];function U(o,d){return i(),l("svg",F,[...N])}const K={name:"material-symbols-play-circle-outline-rounded",render:U},O=(o,d)=>{const h=(r,_)=>{r.forEach(n=>{if(n.isIntersecting){const c=n.target;p(c),c.classList.remove("opaque"),c.classList.add("come-in"),_.unobserve(c)}})},v=new IntersectionObserver(h),a=M(1);function p(r){r===o.value[o.value.length-1]&&(a.value++,d(a.value))}const u=k(()=>o.value.length,(r,_)=>{o.value.slice(_).forEach(n=>{n.classList.add("opaque"),v.observe(n)})});return{currentPage:a,stopWatch:u}},z={class:"music-list"},Q=["onDblclick"],W={class:"item-section cover-container yx-col-6"},Y=["src","alt"],G={class:"ml-2"},J={class:"item-section artist-container yx-col-6"},R={class:"tx-ellipsis"},X={class:"item-section time-container yx-col-4"},ee={class:"item-section time-container yx-col-4 text-center"},se={class:"item-section controls-container yx-col-4"},te={class:"button"},oe={key:0,class:"button"},ne=x({__name:"songSheet",props:{modelValue:{type:Array},modelModifiers:{}},emits:V(["query"],["update:modelValue"]),setup(o,{emit:d}){const h=T(o,"modelValue"),v=P(),a=w("musicPlayer");if(!a)throw new Error("musicPlayer is not provided.");const{addTrackAndPlay:p}=a,u=M([]),r=d;O(u,_);function _(e){r("query",e)}function n(e){return H(e)}function c(e){L(e.id).then(({data:b})=>{let f={id:e.id,title:e.name,singer:e.ar.map(y=>y.name).join(" / "),album:e.al.name,cover:e.al.picUrl,source:b[0].url,time:e.dt,mv:e.mv};v.addTrackAndPlay(f),p()})}return(e,b)=>{const f=K,y=A;return i(),l("div",z,[(i(!0),l(Z,null,$(h.value,t=>(i(),l("div",{key:t.id,ref_for:!0,ref_key:"observer_item",ref:u,class:"list-item",onDblclick:g=>c(t)},[s("div",W,[s("img",{class:"cover",src:t.al.picUrl,alt:t.name},null,8,Y),s("span",G,m(t.name),1)]),s("div",J,[s("span",R,m(t.ar.map(g=>g.name).join(" / ")),1)]),s("div",X,m(t.al.name),1),s("div",ee,m(n(t.dt)),1),s("div",se,[s("div",te,[q(f,{class:"icon",onClick:g=>c(t)},null,8,["onClick"])]),t.mv!=0?(i(),l("div",oe,[q(y,{class:"icon"})])):C("",!0)])],40,Q))),128))])}}}),ie=S(ne,[["__scopeId","data-v-c7ebbab8"],["__file","/home/runner/work/KM-Music-Player/KM-Music-Player/src/components/songSheet.vue"]]);export{ie as _};
