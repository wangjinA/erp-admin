import{j as a,z as h,d as l,r as n,aF as f,bI as w,bJ as x,G as y,aU as p,aB as k,b0 as D,bF as C,i as j,a as _}from"./vendor.61d82d8d.js";/* empty css               *//* empty css                *//* empty css              */import{u as A}from"./index.cd67ad60.js";import{l as L}from"./index.8fa458a0.js";import{C as S,L as N,a as F,T as O,A as T,b as I}from"./index.ae9e4834.js";import{C as M}from"./customer-tooltip.ba6d4a44.js";const E="_card_p6fw4_1",G="_content_p6fw4_11",U="_skeleton_p6fw4_27";var c={card:E,content:G,"content-icon":"_content-icon_p6fw4_15",skeleton:U};const $=["l (90) 0:rgba(131, 100, 255, 0.5) 1:rgba(80, 52, 255, 0.001)","l (90) 0:rgba(100, 255, 236, 0.5) 1:rgba(52, 255, 243, 0.001)","l (90) 0:rgba(255, 211, 100, 0.5) 1:rgba(255, 235, 52, 0.001)","l (90) 0:rgba(100, 162, 255, 0.5) 1:rgba(52, 105, 255, 0.001)"],z=["#722ED1","#33D1C9","#F77234","#165DFF"];function B({data:e,loading:t}){return a(h,{loading:t,style:{width:"100%"},children:l(S,{height:352,data:e,padding:[10,0,30,30],autoFit:!0,scale:{time:"time"},className:"chart-wrapper",children:[a(N,{shape:"smooth",position:"time*count",color:["name",z]}),a(F,{position:"time*count",shape:"smooth",color:["name",$],tooltip:!1}),a(O,{crosshairs:{type:"x"},showCrosshairs:!0,shared:!0,showMarkers:!0,children:(r,d)=>a(M,{title:r,data:d.sort((s,i)=>i.value-s.value),formatter:s=>Number(s).toLocaleString()})}),a(T,{name:"count",label:{formatter:r=>`${Number(r)/100} k`}}),a(I,{visible:!1})]})})}const{Title:H}=j;var X=()=>{const e=A(L),[t,r]=n.exports.useState([]),[d,s]=n.exports.useState([]),[i,m]=n.exports.useState(!1),b=async()=>{m(!0);const{data:o}=await _.get("/api/multi-dimension/overview").finally(()=>m(!1)),{overviewData:u,chartData:g}=o;s(g),r(u)};n.exports.useEffect(()=>{b()},[]);const v=n.exports.useMemo(()=>[{title:e["multiDAnalysis.dataOverview.contentProduction"],icon:a(f,{}),value:t[0],background:"rgb(var(--orange-2))",color:"rgb(var(--orange-6))"},{title:e["multiDAnalysis.dataOverview.contentClicks"],icon:a(w,{}),value:t[1],background:"rgb(var(--cyan-2))",color:"rgb(var(--cyan-6))"},{title:e["multiDAnalysis.dataOverview.contextExposure"],value:t[2],icon:a(x,{}),background:"rgb(var(--arcoblue-1))",color:"rgb(var(--arcoblue-6))"},{title:e["multiDAnalysis.dataOverview.activeUsers"],value:t[3],icon:a(y,{}),background:"rgb(var(--purple-1))",color:"rgb(var(--purple-6))"}],[e,t]);return l(p.Row,{justify:"space-between",children:[v.map((o,u)=>a(p.Col,{span:24/v.length,children:l(k,{className:c.card,title:null,children:[a(H,{heading:6,children:o.title}),l("div",{className:c.content,children:[a("div",{style:{backgroundColor:o.background,color:o.color},className:c["content-icon"],children:o.icon}),i?a(D,{animation:!0,text:{rows:1,className:c.skeleton},style:{width:"120px"}}):a(C,{value:o.value,groupSeparator:!0})]})]})},`${u}`)),a(p.Col,{span:24,children:a(B,{data:d,loading:i})})]})};export{X as default};
