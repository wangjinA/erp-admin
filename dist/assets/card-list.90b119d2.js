var D=Object.defineProperty,T=Object.defineProperties;var N=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var x=(s,t,a)=>t in s?D(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a,o=(s,t)=>{for(var a in t||(t={}))k.call(t,a)&&x(s,a,t[a]);if(y)for(var a of y(t))w.call(t,a)&&x(s,a,t[a]);return s},c=(s,t)=>T(s,N(t));import{r as m,j as e,aM as L,d as l,az as S,bC as I,aU as F,c as R,bD as A,bE as G,z,a as E,i as M}from"./vendor.a400a50c.js";/* empty css               *//* empty css              *//* empty css                */import{C as _,L as P,T as g,I as $}from"./index.4757f893.js";import{u as q}from"./index.468900fe.js";import{l as B}from"./index.c06aabcb.js";import{I as U}from"./index.26596c6b.js";const H="_card_19h7s_1",J="_statistic_19h7s_1",K="_title_19h7s_4",O="_diff_19h7s_16",Q="_tooltip_19h7s_24";var n={card:H,statistic:J,title:K,diff:O,"diff-increment":"_diff-increment_19h7s_21",tooltip:Q};const{Row:V,Col:W}=L,{Title:X,Text:Y}=M,v={pure:!0,autoFit:!0,height:80,padding:[0,10,0,10]};function C(s){const{items:t}=s;return e("div",{className:n.tooltip,children:t.map((a,r)=>e("div",{children:e(Y,{bold:!0,children:Number(a.data.y).toLocaleString()})},r))})}function Z(s){const{chartData:t}=s;return l(_,c(o({data:t},v),{children:[e(P,{position:"x*y",shape:["name",["smooth","dash"]],color:["name",["#165DFF","rgba(106,161,255,0.3)"]]}),e(g,{shared:!1,showCrosshairs:!0,children:(a,r)=>e(C,{items:r})})]}))}function tt(s){const{chartData:t}=s;return l(_,c(o({data:t},v),{children:[e($,{position:"x*y",color:["x",a=>Number(a)%2==0?"#86DF6C":"#468DFF"]}),e(g,{shared:!1,children:(a,r)=>e(C,{items:r})}),e(U,{type:"active-region"})]}))}function et(s){const{chartType:t,title:a,count:r,increment:d,diff:h,chartData:p,loading:i}=s;return l(S,{className:n.card,children:[e("div",{className:n.statistic,children:e(I,{title:e(X,{heading:6,className:n.title,children:a}),loading:i,value:r,extra:e("div",{className:n["compare-yesterday"],children:i?e(F,{text:{rows:1},style:{width:"100px"},animation:!0}):l("span",{className:R(n.diff,{[n["diff-increment"]]:d}),children:[h,d?e(A,{}):e(G,{})]})}),groupSeparator:!0})}),e("div",{className:n.chart,children:l(z,{style:{width:"100%"},loading:i,children:[t==="interval"&&e(tt,{chartData:p}),t==="line"&&e(Z,{chartData:p})]})})]})}const b=[{key:"userRetentionTrend",type:"line"},{key:"userRetention",type:"interval"},{key:"contentConsumptionTrend",type:"line"},{key:"contentConsumption",type:"interval"}];function pt(){const s=q(B),[t,a]=m.exports.useState(!1),[r,d]=m.exports.useState(b.map(i=>c(o({},i),{chartType:i.type}))),h=async()=>{const i=b.map(async f=>{const{data:j}=await E.get(`/api/multi-dimension/card?type=${f.type}`).catch(()=>({data:{}}));return c(o({},j),{key:f.key,chartType:f.type})});a(!0);const u=await Promise.all(i).finally(()=>a(!1));d(u)};m.exports.useEffect(()=>{h()},[]);const p=m.exports.useMemo(()=>r.map(i=>c(o({},i),{title:s[`multiDAnalysis.cardList.${i.key}`]})),[s,r]);return e(V,{gutter:16,children:p.map((i,u)=>e(W,{span:6,children:e(et,c(o({},i),{loading:t}))},u))})}export{pt as default};
