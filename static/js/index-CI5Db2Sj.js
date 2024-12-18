import{j as e,e as a,g as l,d as t,X as r,S as o,u as n,$ as s,a0 as i,a1 as c,_ as d,b as u,h as m,w as p,m as f,F as y,k as h,l as b,A as x,i as k,a2 as w,Z as v}from"./index-BYbt6oCx.js";const _={viewBox:"0 0 32 32",width:"1.2em",height:"1.2em"};const g={name:"carbon-cloud-download",render:function(t,r){return e(),a("svg",_,r[0]||(r[0]=[l("path",{fill:"currentColor",d:"M23.5 22H23v-2h.5a4.5 4.5 0 0 0 .36-9H23l-.1-.82a7 7 0 0 0-13.88 0L9 11h-.86a4.5 4.5 0 0 0 .36 9H9v2h-.5A6.5 6.5 0 0 1 7.2 9.14a9 9 0 0 1 17.6 0A6.5 6.5 0 0 1 23.5 22"},null,-1),l("path",{fill:"currentColor",d:"M17 26.17V14h-2v12.17l-2.59-2.58L11 25l5 5l5-5l-1.41-1.41z"},null,-1)]))}},M={class:"h-full w-full box-border flex flex-1 flex-col overflow-x-hidden overflow-auto"},C={class:"flex items-center gap-1"},L={class:"min-w-10 h-10"},A=["onClick","title"],j={class:"line-clamp-1"},P={key:0},S=["title"],T={class:"flex items-center"};const U=d(t({__name:"index",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();const l=r(e,"modelValue"),t=o(),d=n(),{playSong:u}=s("MusicPlayer"),m={tableData:l,AudioStore:t,router:d,playSong:u,playMusic:async e=>{const a=t.trackList.findIndex((a=>a.id===e.id));if(-1===a)try{const{data:a}=await i(e.id),l={id:e.id,title:e.name,singer:e.ar.map((e=>e.name)).join(" / "),album:e.al.name,cover:e.al.picUrl,time:e.dt,source:a[0].url,mv:e.mv};t.addTrackAndPlay(l),u(l)}catch(l){}else{const e=t.trackList[a];t.addTrackAndPlay(e),u(e)}},downLoadMusic:e=>{i(e.id).then((({data:a})=>{const l=a[0].url;fetch(l).then((e=>e.blob())).then((a=>{const l=document.createElement("a"),t=URL.createObjectURL(a);l.href=t,l.setAttribute("download",`${e.name} - ${e.ar.map((e=>e.name)).join(" ")}`),document.body.appendChild(l),l.click(),URL.revokeObjectURL(t),document.body.removeChild(l)})).catch((e=>{}))}))},formatMillisecondsToTimes:e=>c(e)};return Object.defineProperty(m,"__isScriptSetup",{enumerable:!1,value:!0}),m}}),[["render",function(t,r,o,n,s,i){const c=u("el-image"),d=u("el-table-column"),_=u("router-link"),U=w,$=u("el-button"),R=v,V=g,D=u("el-table");return e(),a("div",M,[m(D,{data:n.tableData,style:{width:"100%","--el-table-border":"none","--el-table-border-color":"none"},onRowDblclick:n.playMusic,class:"!text-xs !flex-1"},{default:p((()=>[m(d,{prop:"name",label:"歌名"},{default:p((({row:e})=>[l("div",C,[l("div",L,[m(c,{class:"w-full h-full rounded-lg",lazy:"",src:e.al.picUrl+"?param=90y90",alt:e.al.name},null,8,["src","alt"])]),l("span",{class:"line-clamp-1 cursor-pointer",onClick:a=>n.router.push(`/search?kw=${e.name}`),title:e.name},f(e.name),9,A)])])),_:1}),m(d,{label:"歌手"},{default:p((({row:t})=>[l("div",j,[t.ar&&t.ar.length?(e(!0),a(y,{key:0},h(t.ar,((l,r)=>(e(),b(_,{key:l.id,class:"cursor-pointer",to:`/search?kw=${l.name}`},{default:p((()=>[x(f(l.name)+" ",1),r<t.ar.length-1?(e(),a("span",P," \\ ")):k("",!0)])),_:2},1032,["to"])))),128)):k("",!0)])])),_:1}),m(d,{prop:"al.name",label:"专辑"},{default:p((({row:e})=>[l("span",{class:"line-clamp-1",title:e.al.name},f(e.al.name),9,S)])),_:1}),m(d,{label:"时间"},{default:p((({row:e})=>[l("span",null,f(n.formatMillisecondsToTimes(e.dt)),1)])),_:1}),m(d,{label:"",width:"180"},{default:p((({row:a})=>[l("div",T,[m($,{type:"primary",text:"",circle:"",onClick:e=>n.playMusic(a)},{default:p((()=>[m(U,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"]),a.mv&&0!==a.mv?(e(),b($,{key:0,type:"primary",text:"",circle:"",onClick:e=>n.router.push(`/video?id=${a.mv}`)},{default:p((()=>[m(R,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"])):k("",!0),m($,{type:"primary",text:"",circle:"",onClick:e=>n.downLoadMusic(a)},{default:p((()=>[m(V,{class:"text-lg text-gray-500"})])),_:2},1032,["onClick"])])])),_:1})])),_:1},8,["data"])])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/components/MusicList/index.vue"]]);export{U as _};