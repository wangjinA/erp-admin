var j=Object.defineProperty,D=Object.defineProperties;var L=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var x=(s,t,a)=>t in s?j(s,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[t]=a,o=(s,t)=>{for(var a in t||(t={}))N.call(t,a)&&x(s,a,t[a]);if(y)for(var a of y(t))k.call(t,a)&&x(s,a,t[a]);return s},c=(s,t)=>D(s,L(t));import{r as m,j as e,aL as w,d as l,ax as S,bC as I,aT as F,c as R,bD as A,bE as G,z as E,a as P,i as $}from"./vendor.446b4cc8.js";/* empty css               *//* empty css               *//* empty css                */import{C as _,L as q,T as g,I as z}from"./index.1d022c2a.js";import{u as B}from"./index.27d6feff.js";import{l as M}from"./index.c06aabcb.js";import{I as H}from"./index.a29fdbe0.js";const J="_card_19h7s_1",K="_statistic_19h7s_1",O="_title_19h7s_4",Q="_diff_19h7s_16",U="_tooltip_19h7s_24";var n={card:J,statistic:K,title:O,diff:Q,"diff-increment":"_diff-increment_19h7s_21",tooltip:U};const{Row:V,Col:W}=w,{Title:X,Text:Y}=$,v={pure:!0,autoFit:!0,height:80,padding:[0,10,0,10]};function C(s){const{items:t}=s;return e("div",{className:n.tooltip,children:t.map((a,r)=>e("div",{children:e(Y,{bold:!0,children:Number(a.data.y).toLocaleString()})},r))})}function Z(s){const{chartData:t}=s;return l(_,c(o({data:t},v),{children:[e(q,{position:"x*y",shape:["name",["smooth","dash"]],color:["name",["#165DFF","rgba(106,161,255,0.3)"]]}),e(g,{shared:!1,showCrosshairs:!0,children:(a,r)=>e(C,{items:r})})]}))}function tt(s){const{chartData:t}=s;return l(_,c(o({data:t},v),{children:[e(z,{position:"x*y",color:["x",a=>Number(a)%2==0?"#86DF6C":"#468DFF"]}),e(g,{shared:!1,children:(a,r)=>e(C,{items:r})}),e(H,{type:"active-region"})]}))}function et(s){const{chartType:t,title:a,count:r,increment:d,diff:h,chartData:p,loading:i}=s;return l(S,{className:n.card,children:[e("div",{className:n.statistic,children:e(I,{title:e(X,{heading:6,className:n.title,children:a}),loading:i,value:r,extra:e("div",{className:n["compare-yesterday"],children:i?e(F,{text:{rows:1},style:{width:"100px"},animation:!0}):l("span",{className:R(n.diff,{[n["diff-increment"]]:d}),children:[h,d?e(A,{}):e(G,{})]})}),groupSeparator:!0})}),e("div",{className:n.chart,children:l(E,{style:{width:"100%"},loading:i,children:[t==="interval"&&e(tt,{chartData:p}),t==="line"&&e(Z,{chartData:p})]})})]})}const b=[{key:"userRetentionTrend",type:"line"},{key:"userRetention",type:"interval"},{key:"contentConsumptionTrend",type:"line"},{key:"contentConsumption",type:"interval"}];function pt(){const s=B(M),[t,a]=m.exports.useState(!1),[r,d]=m.exports.useState(b.map(i=>c(o({},i),{chartType:i.type}))),h=async()=>{const i=b.map(async f=>{const{data:T}=await P.get(`/api/multi-dimension/card?type=${f.type}`).catch(()=>({data:{}}));return c(o({},T),{key:f.key,chartType:f.type})});a(!0);const u=await Promise.all(i).finally(()=>a(!1));d(u)};m.exports.useEffect(()=>{h()},[]);const p=m.exports.useMemo(()=>r.map(i=>c(o({},i),{title:s[`multiDAnalysis.cardList.${i.key}`]})),[s,r]);return e(V,{gutter:16,children:p.map((i,u)=>e(W,{span:6,children:e(et,c(o({},i),{loading:t}))},u))})}export{pt as default};