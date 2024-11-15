import{e,f as a,h as t,g as l,d as s,R as r,_ as n,b as o,F as i,k as u,l as c,w as m,i as d,m as p,H as g,a as f,t as v,S as h,c as x,T as y}from"./index-BPE2Xi_C.js";import{_ as b}from"./index-BUQcXFFE.js";const V={viewBox:"0 0 14 14",width:"1.2em",height:"1.2em"};const k={name:"streamline-music-folder-song",render:function(l,s){return e(),a("svg",V,s[0]||(s[0]=[t("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round"},[t("path",{d:"M4.645 11a.88.88 0 1 0 0-1.759a.88.88 0 0 0 0 1.76Zm3.957-1.099a.88.88 0 1 0 0-1.76a.88.88 0 0 0 0 1.76"}),t("path",{d:"M5.525 10.12V6.339l3.957-.932v3.616"}),t("path",{d:"M.5 12.25V1.75a1 1 0 0 1 1-1h3.69a1 1 0 0 1 1 .76l.31 1.24h6a1 1 0 0 1 1 1v8.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1"})],-1)]))}},_={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};const M={name:"iconamoon-music-artist",render:function(l,s){return e(),a("svg",_,s[0]||(s[0]=[t("g",{fill:"none",stroke:"currentColor","stroke-width":"2"},[t("circle",{cx:"12",cy:"7",r:"3"}),t("circle",{cx:"18",cy:"18",r:"2","stroke-linecap":"round","stroke-linejoin":"round"}),t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12.341 20H6a2 2 0 0 1-2-2a4 4 0 0 1 4-4h5.528M20 18v-7l2 2"})],-1)]))}},w={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};const D={name:"akar-icons-music-album",render:function(t,s){return e(),a("svg",w,s[0]||(s[0]=[l('<g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M9 16.5V8.78a1 1 0 0 1 .757-.97l6-1.5A1 1 0 0 1 17 7.28V15"></path><path d="m9 11l8-2"></path><circle cx="7.5" cy="16.5" r="1.5"></circle><circle cx="15.5" cy="15.5" r="1.5"></circle></g>',1)]))}},S={viewBox:"0 0 24 24",width:"1.2em",height:"1.2em"};const z={name:"iconamoon-music-album-light",render:function(l,s){return e(),a("svg",S,s[0]||(s[0]=[t("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"1.5"},[t("circle",{cx:"12",cy:"12",r:"2"}),t("circle",{cx:"18",cy:"9",r:"2"}),t("path",{d:"M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2"})],-1)]))}},P={class:"flex-1 p-4 md:p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"},C={class:"p-2"},j={class:"font-medium text-sm line-clamp-1"},A={class:"flex items-center gap-2 text-sm text-muted-foreground"},U={class:"line-clamp-1 text-xs"};const K=n(s({__name:"MV",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();let t=r(e,"modelValue");const l={get modelValue(){return t},set modelValue(e){t=e}};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),[["render",function(l,s,r,n,g,f){const v=o("el-image"),h=o("router-link");return e(),a("section",P,[(e(!0),a(i,null,u(n.modelValue,(a=>(e(),c(h,{to:`/video?id=${a.id}`,class:"group relative overflow-hidden",key:a.id},{default:m((()=>[d(v,{src:a.cover+"?param=320y200",lazy:"",class:"transition-opacity rounded-lg"},null,8,["src"]),t("div",C,[t("h3",j,p(a.name),1),t("div",A,[t("span",U,p(a.artists.map((e=>e.name)).join(" / ")),1)])])])),_:2},1032,["to"])))),128))])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/views/search/components/MV.vue"]]),N={class:"flex-1 p-4 md:p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"},L={class:"p-2"},O={class:"font-medium text-sm line-clamp-1"},q={class:"flex items-center gap-2 text-sm text-muted-foreground"},B={class:"line-clamp-1 text-xs"};const H=n(s({__name:"SongList",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();let t=r(e,"modelValue");const l={get modelValue(){return t},set modelValue(e){t=e}};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),[["render",function(l,s,r,n,g,f){const v=o("el-image"),h=o("router-link");return e(),a("section",N,[(e(!0),a(i,null,u(n.modelValue,(a=>(e(),c(h,{class:"group relative overflow-hidden",key:a.id,to:`/playlist?id=${a.id}`},{default:m((()=>[d(v,{src:a.coverImgUrl+"?param=200y200",lazy:"",class:"transition-opacity rounded-lg"},null,8,["src"]),t("div",L,[t("h3",O,p(a.name),1),t("div",q,[t("span",B,p(a.creator.nickname),1)])])])),_:2},1032,["to"])))),128))])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/views/search/components/SongList.vue"]]),T={class:"flex-1 p-4 md:p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"},$={class:"p-2"},F={class:"font-medium text-sm line-clamp-1"},I={class:"flex items-center gap-2 text-sm text-muted-foreground"},R={class:"line-clamp-1 text-xs"};const Z=n(s({__name:"Album",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();let t=r(e,"modelValue");const l={get modelValue(){return t},set modelValue(e){t=e}};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),[["render",function(l,s,r,n,c,m){const g=o("el-image");return e(),a("section",T,[(e(!0),a(i,null,u(n.modelValue,(l=>(e(),a("div",{class:"group relative overflow-hidden",key:l.id},[d(g,{src:l.picUrl+"?param=260y260",lazy:"",class:"transition-opacity rounded-lg"},null,8,["src"]),t("div",$,[t("h3",F,p(l.name),1),t("div",I,[t("span",R,p(l.artists.map((e=>e.name)).join(" / ")),1)])])])))),128))])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/views/search/components/Album.vue"]]),E={class:"flex-1 p-4 md:p-6 grid gap-4 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]"},G={class:"p-2"},J={class:"font-medium text-sm line-clamp-1 text-center"};const Q=n(s({__name:"Artists",props:{modelValue:{type:Array},modelModifiers:{}},emits:["update:modelValue"],setup(e,{expose:a}){a();let t=r(e,"modelValue");const l={get modelValue(){return t},set modelValue(e){t=e}};return Object.defineProperty(l,"__isScriptSetup",{enumerable:!1,value:!0}),l}}),[["render",function(l,s,r,n,c,m){const g=o("el-image");return e(),a("section",E,[(e(!0),a(i,null,u(n.modelValue,(l=>(e(),a("div",{class:"group relative overflow-hidden",key:l.id},[d(g,{src:l.picUrl+"?param=260y260",lazy:"",class:"transition-opacity rounded-full"},null,8,["src"]),t("div",G,[t("h3",J,p(l.name),1)])])))),128))])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/views/search/components/Artists.vue"]]),W={class:"container h-full py-4 gap-2 w-full box-border flex flex-1 flex-col overflow-x-hidden"},X={class:"flex flex-col h-full px-4 gap-8 md:gap-12 lg:gap-16 overflow-x-hidden"},Y={class:"flex gap-1 items-center"},ee={class:"flex gap-1 items-center"},ae={class:"flex gap-1 items-center"},te={class:"flex gap-1 items-center"},le={class:"flex gap-1 items-center"};const se=n(s({__name:"index",setup(e,{expose:a}){a();const t=g(),l=f({activeName:"1",tableData:{},albumData:{albums:[]},singerData:{artists:[]},songData:{playlists:[]},mvData:{mvs:[]},currentPage:1,pageSize:30,size:"small",total:0}),{tableData:s,activeName:r,mvData:n,songData:o,singerData:i,albumData:u,currentPage:c,pageSize:m,size:d,total:p}=v(l),y=async(e,a,t,s=20)=>{const{result:r}=await x({kw:e,type:a,limit:s,offset:t});switch(l.activeName){case"1":l.tableData=l.tableData=r,l.total=r.songCount;break;case"10":l.albumData=l.albumData=r,l.total=r.albumCount;break;case"100":l.singerData=l.singerData=r,l.total=r.artistCount;break;case"1000":l.songData=l.songData=r,l.total=r.playlistCount;break;case"1004":l.mvData=l.mvData=r,l.total=r.mvCount}l.tableData=r};h((()=>t.query.kw),(e=>{"string"==typeof e&&y(e)}),{immediate:!0});const b={route:t,state:l,tableData:s,activeName:r,mvData:n,songData:o,singerData:i,albumData:u,currentPage:c,pageSize:m,size:d,total:p,performSearch:y,handleClick:({props:e})=>{l.currentPage=1,y(t.query.kw,e.name)},handleSizeChange:e=>{y(t.query.kw,l.activeName,l.currentPage,e)},handleCurrentChange:e=>{y(t.query.kw,l.activeName,e,l.pageSize)},MV:K,SongList:H,Album:Z,Artists:Q};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}}),[["render",function(l,s,r,n,i,u){const c=z,p=b,g=o("el-tab-pane"),f=D,v=M,h=k,x=y,V=o("el-tabs"),_=o("el-pagination");return e(),a("div",W,[t("div",X,[d(V,{modelValue:n.activeName,"onUpdate:modelValue":s[5]||(s[5]=e=>n.activeName=e),class:"demo-tabs",onTabClick:n.handleClick},{default:m((()=>[d(g,{name:"1"},{label:m((()=>[t("div",Y,[d(c),s[8]||(s[8]=t("span",null,"Songs",-1))])])),default:m((()=>[d(p,{modelValue:n.tableData.songs,"onUpdate:modelValue":s[0]||(s[0]=e=>n.tableData.songs=e)},null,8,["modelValue"])])),_:1}),d(g,{name:"10"},{label:m((()=>[t("div",ee,[d(f),s[9]||(s[9]=t("span",null,"Album",-1))])])),default:m((()=>[d(n.Album,{modelValue:n.albumData.albums,"onUpdate:modelValue":s[1]||(s[1]=e=>n.albumData.albums=e)},null,8,["modelValue"])])),_:1}),d(g,{name:"100"},{label:m((()=>[t("div",ae,[d(v),s[10]||(s[10]=t("span",null,"Artists",-1))])])),default:m((()=>[d(n.Artists,{modelValue:n.singerData.artists,"onUpdate:modelValue":s[2]||(s[2]=e=>n.singerData.artists=e)},null,8,["modelValue"])])),_:1}),d(g,{name:"1000"},{label:m((()=>[t("div",te,[d(h),s[11]||(s[11]=t("span",null,"SongList",-1))])])),default:m((()=>[d(n.SongList,{modelValue:n.songData.playlists,"onUpdate:modelValue":s[3]||(s[3]=e=>n.songData.playlists=e)},null,8,["modelValue"])])),_:1}),d(g,{name:"1004"},{label:m((()=>[t("div",le,[d(x),s[12]||(s[12]=t("span",null,"MV",-1))])])),default:m((()=>[d(n.MV,{modelValue:n.mvData.mvs,"onUpdate:modelValue":s[4]||(s[4]=e=>n.mvData.mvs=e)},null,8,["modelValue"])])),_:1})])),_:1},8,["modelValue"])]),d(_,{class:"flex items-center justify-center","current-page":n.currentPage,"onUpdate:currentPage":s[6]||(s[6]=e=>n.currentPage=e),"page-size":n.pageSize,"onUpdate:pageSize":s[7]||(s[7]=e=>n.pageSize=e),"page-sizes":[10,20,30,40],size:n.size,layout:"total, sizes, prev, pager, next, jumper",total:n.total,onSizeChange:n.handleSizeChange,onCurrentChange:n.handleCurrentChange},null,8,["current-page","page-size","size","total"])])}],["__file","/home/runner/work/KMMusicPlayer/KMMusicPlayer/src/views/search/index.vue"]]);export{se as default};