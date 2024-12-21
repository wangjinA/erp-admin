var M=Object.defineProperty,N=Object.defineProperties;var $=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var _=Object.prototype.hasOwnProperty,z=Object.prototype.propertyIsEnumerable;var g=(a,e,t)=>e in a?M(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,C=(a,e)=>{for(var t in e||(e={}))_.call(e,t)&&g(a,t,e[t]);if(y)for(var t of y(e))z.call(e,t)&&g(a,t,e[t]);return a},b=(a,e)=>N(a,$(e));import{j as r,z as x,d as o,Y as P,r as d,q,ax as c,i as m,aE as G,aL as O,a as k}from"./vendor.446b4cc8.js";/* empty css               *//* empty css               *//* empty css               */import{u as U}from"./index.27d6feff.js";import{i as K,P as W}from"./index.bc5eaab4.js";import{C as A,I as Y,T as w,A as T,b as F,L as H,S as J}from"./index.1d022c2a.js";import{C as E}from"./customer-tooltip.11d05b49.js";import{u as Q}from"./useChartTheme.e7501924.js";import{s as V,M as i}from"./setupMock.35db4aa7.js";import"./card.f6f048d3.js";/* empty css               *//* empty css                */import"./index.a29fdbe0.js";function X({data:a,loading:e}){return r(x,{loading:e,style:{width:"100%"},children:o(A,{height:370,padding:"auto",data:a,autoFit:!0,className:"chart-wrapper",children:[r(Y,{adjust:"stack",color:["name",["#81E2FF","#00B2FF","#246EFF"]],position:"time*count",size:16,style:{radius:[2,2,0,0]}}),r(w,{crosshairs:{type:"x"},showCrosshairs:!0,shared:!0,children:(t,n)=>r(E,{title:t,data:n})}),r(T,{name:"count",label:{formatter(t){return`${Number(t)/1e3}k`}}}),r(F,{name:"name",marker:{symbol:"circle"}})]})})}const j=["#21CCFF","#313CA9","#249EFF"];function Z({data:a,loading:e}){return r(x,{loading:e,style:{width:"100%"},children:o(A,{theme:Q(),forceUpdate:!0,height:370,padding:[10,20,120,60],data:a,autoFit:!0,scale:{time:"time"},className:"chart-wrapper",children:[r(H,{shape:"smooth",position:"time*rate",color:["name",j]}),r(w,{crosshairs:{type:"x"},showCrosshairs:!0,shared:!0,children:(t,n)=>r(E,{title:t,data:n})}),r(T,{name:"rate",label:{formatter(t){return`${Number(t)} %`}}}),r(F,{name:"name",marker:(t,n)=>({symbol:"circle",style:{fill:j[n],r:4}})}),r(J,{foregroundStyle:{borderRadius:" 4px",fill:"l (180) 0:rgba(206, 224, 255, 0.9) 1:rgba(146, 186, 255, 0.8)",opacity:.3},trendCfg:{data:a.map(t=>t.rate),isArea:!0,areaStyle:{fill:"rgba(4, 135, 255, 0.15)",opacity:1},backgroundStyle:{fill:"#F2F3F5"},lineStyle:{stroke:"rgba(36, 158, 255, 0.3)",lineWidth:2}},handlerStyle:{fill:"#ffffff",opacity:1,width:22,height:22,stroke:"#165DFF"}})]})})}const h=a=>new Array(12).fill(0).map(()=>({y:i.Random.natural(20,100)})).map((t,n)=>b(C({},t),{x:n,name:a})),tt=()=>new Array(3).fill(0).map((a,e)=>({name:["\u5206\u7C7B1","\u5206\u7C7B2","\u5206\u7C7B3"][e],count:i.Random.natural(20,100)}));V({setup:()=>{i.mock(new RegExp("/api/data-analysis/overview"),e=>{const{type:t}=P.parseUrl(e.url).query;return i.mock({count:()=>i.Random.natural(1e3,1e4),increment:()=>i.Random.boolean(),diff:()=>i.Random.natural(100,1e3),chartType:t,chartData:()=>t==="pie"?tt():t==="line"?[...h("\u7C7B\u76EE1"),...h("\u7C7B\u76EE2")]:h("\u7C7B\u76EE1")})});const a=e=>{const t=new Array(12).fill(0).map((n,l)=>{const u=l*2;return u<9?`0${u}:00`:`${u}:00`});return new Array(12).fill(0).map((n,l)=>({name:e,time:t[l],count:i.Random.natural(1e3,5e3),rate:i.Random.natural(0,100)}))};i.mock(new RegExp("/api/data-analysis/content-publishing"),()=>[...a("\u5206\u7C7B1"),...a("\u5206\u7C7B2"),...a("\u5206\u7C7B3")]),i.mock(new RegExp("/api/data-analysis/author-list"),()=>i.mock({"list|8":[{"id|+1":1,author:()=>i.Random.pick(["\u7528\u9B54\u6CD5\u6253\u8D25\u9B54\u6CD5","\u738B\u591A\u9C7C","Christopher","\u53EB\u6211\u5C0F\u674E\u597D\u4E86","\u9648\u76AE\u8BDD\u6885\u7CD6","\u78B3\u70E4\u5C0F\u80A5\u7F8A"]),time:function(){return new Array(12).fill(0).map((e,t)=>{const n=t*2;return n<9?`0${n}:00`:`${n}:00`})[this.id%12]},contentCount:()=>i.Random.natural(1e3,5e3),clickCount:()=>i.Random.natural(5e3,3e4)}]}))}});const{Row:B,Col:f}=O;function yt(){const a=U(K),[e,t]=d.exports.useState(!1),[n,l]=d.exports.useState(!1),[u,D]=d.exports.useState([]),[R,S]=d.exports.useState([]),L=async()=>{t(!0);const{data:s}=await k.get("/api/data-analysis/content-publishing").finally(()=>t(!1));D(s)},v=async()=>{l(!0);const{data:s}=await k.get("/api/data-analysis/author-list").finally(()=>l(!1));S(s.list)};d.exports.useEffect(()=>{L(),v()},[]);const I=d.exports.useMemo(()=>[{title:a["dataAnalysis.authorTable.rank"],dataIndex:"id"},{title:a["dataAnalysis.authorTable.author"],dataIndex:"author"},{title:a["dataAnalysis.authorTable.content"],dataIndex:"contentCount",sorter:(s,p)=>s.contentCount-p.contentCount,render(s){return Number(s).toLocaleString()}},{title:a["dataAnalysis.authorTable.click"],dataIndex:"clickCount",sorter:(s,p)=>s.clickCount-p.clickCount,render(s){return Number(s).toLocaleString()}}],[a]);return o(q,{size:16,direction:"vertical",style:{width:"100%"},children:[o(c,{children:[r(m.Title,{heading:6,children:a["dataAnalysis.title.publicOpinion"]}),r(W,{})]}),o(B,{gutter:16,children:[r(f,{span:14,children:o(c,{children:[r(m.Title,{heading:6,children:a["dataAnalysis.title.publishingRate"]}),r(X,{data:u,loading:e})]})}),r(f,{span:10,children:o(c,{children:[r(m.Title,{heading:6,children:a["dataAnalysis.title.authorsList"]}),r("div",{style:{height:"370px"},children:r(G,{rowKey:"id",loading:n,pagination:!1,data:R,columns:I})})]})})]}),r(B,{children:r(f,{span:24,children:o(c,{children:[r(m.Title,{heading:6,children:a["dataAnalysis.title.publishingTiming"]}),r(Z,{data:u,loading:e})]})})})]})}export{yt as default};
