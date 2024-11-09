import{e,f as a,h as l,d as t,R as s,M as r,u as o,U as n,V as i,W as c,_ as d,b as u,i as m,w as p,m as f,F as y,k as x,l as h,z as w,j as b,X as k,T as v}from"./index-Bdf-Hds2.js";const _={viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"};const M={name:"carbon-cloud-download",render:function(t,s){return e(),a("svg",_,s[0]||(s[0]=[l("path",{fill:"currentColor",d:"M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22"},null,-1),l("path",{fill:"currentColor",d:"M17 26.17V14h-2v12.17l-2.59-2.58L11 25l5 5l5-5l-1.41-1.41z"},null,-1)]))}},g={class:"h-full w-full box-border flex flex-1 flex-col overflow-x-hidden overflow-auto"},C={class:"flex items-center gap-1"},L={class:"min-w-10 h-10"},T=["onClick","title"],A={class:"line-clamp-1"},P={key:0},S=["title"],V={class:"flex items-center"};const j=d(t({__name:"index",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();const l=s(e,"modelValue"),t=r(),d=o(),{playSong:u}=n("MusicPlayer"),m={tableData:l,AudioStore:t,router:d,playSong:u,playMusic:async e=>{const a=t.trackList.findIndex((a=>a.id===e.id));if(-1===a)try{const{data:a}=await i(e.id),l={id:e.id,title:e.name,singer:e.ar.map((e=>e.name)).join(" / "),album:e.al.name,cover:e.al.picUrl,time:e.dt,source:a[0].url,mv:e.mv};t.addTrackAndPlay(l),u(l)}catch(l){}else{const e=t.trackList[a];t.addTrackAndPlay(e),u(e)}},downLoadMusic:e=>{},formatMillisecondsToTimes:e=>c(e)};return Object.defineProperty(m,"__isScriptSetup",{enumerable:!1,value:!0}),m}}),[["render",function(t,s,r,o,n,i){const c=u("el-image"),d=u("el-table-column"),_=u("router-link"),j=k,z=u("el-button"),D=v,H=M,U=u("el-table");return e(),a("div",g,[m(U,{data:o.tableData,style:{width:"100%","--el-table-border":"none","--el-table-border-color":"none"},onRowDblclick:o.playMusic,class:"!text-xs !flex-1"},{default:p((()=>[m(d,{prop:"name",label:"歌名"},{default:p((({row:e})=>[l("div",C,[l("div",L,[m(c,{class:"w-full h-full rounded-lg",lazy:"",src:e.al.picUrl+"?param=90y90",alt:e.al.name},null,8,["src","alt"])]),l("span",{class:"line-clamp-1 cursor-pointer",onClick:a=>o.router.push(`/search?kw=${e.name}`),title:e.name},f(e.name),9,T)])])),_:1}),m(d,{label:"歌手"},{default:p((({row:t})=>[l("div",A,[t.ar&&t.ar.length?(e(!0),a(y,{key:0},x(t.ar,((l,s)=>(e(),h(_,{key:l.id,class:"cursor-pointer",to:`/search?kw=${l.name}`},{default:p((()=>[w(f(l.name)+" ",1),s<t.ar.length-1?(e(),a("span",P," \\ ")):b("",!0)])),_:2},1032,["to"])))),128)):b("",!0)])])),_:1}),m(d,{prop:"al.name",label:"专辑"},{default:p((({row:e})=>[l("span",{class:"line-clamp-1",title:e.al.name},f(e.al.name),9,S)])),_:1}),m(d,{label:"时间"},{default:p((({row:e})=>[l("span",null,f(o.formatMillisecondsToTimes(e.dt)),1)])),_:1}),m(d,{label:"",width:"180"},{default:p((({row:a})=>[l("div",V,[m(z,{type:"primary",text:"",circle:"",onClick:e=>o.playMusic(a)},{default:p((()=>[m(j,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"]),a.mv&&0!==a.mv?(e(),h(z,{key:0,type:"primary",text:"",circle:"",onClick:e=>o.router.push(`/video?id=${a.mv}`)},{default:p((()=>[m(D,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"])):b("",!0),m(z,{type:"primary",text:"",circle:"",onClick:e=>o.downLoadMusic(a)},{default:p((()=>[m(H,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/components/MusicList/index.vue"]]);export{j as _};
