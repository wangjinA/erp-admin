var B=Object.defineProperty,C=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var c=(s,e,t)=>e in s?B(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,i=(s,e)=>{for(var t in e||(e={}))f.call(e,t)&&c(s,t,e[t]);if(d)for(var t of d(e))j.call(e,t)&&c(s,t,e[t]);return s},o=(s,e)=>C(s,A(e));import{r as h,R as m,aj as x,d as b,j as r,A as g,l as S,t as y,B as T,K as R}from"./vendor.019c2987.js";import{e as l}from"./express.930f4cc0.js";import{T as v,a as k}from"./index.ddcc4689.js";import{S as w}from"./index.f880861f.js";import{a as N}from"./index.9bc4fa98.js";import{E as P}from"./index.6d111a23.js";import{a as q}from"./index.c844fdd9.js";import{D as I}from"./common.03d76d2d.js";import{s as L,a as M}from"./index.923f5d6c.js";/* empty css              */import"./order.8e329700.js";import"./index.07d39300.js";import"./index.2695b224.js";import"./index.32aeda99.js";import"./entrepot.e592173e.js";import"./index.335c814c.js";import"./schema.55c1bd12.js";/* empty css               */import"./dict.ce8c76f4.js";import"./index.138d4aaa.js";import"./shopStore.ee2394ef.js";/* empty css               *//* empty css              *//* empty css              */import"./style.200a6193.js";var du=()=>{const[s,e]=h.exports.useState(),[t,n]=m.useState(!1),E=m.useRef(),{run:p,loading:D}=x(async u=>{await L({content:"\u786E\u5B9A\u53D6\u6D88\u9000\u4EF6\uFF1F",okButtonProps:{status:"warning"}}),e(u),await M(()=>l.cancelReturn(u.id),"\u53D6\u6D88\u9000\u4EF6"),E.current.refreshSearchTable()},{manual:!0});return b("div",{className:"p-4 bg-white",children:[r(g,{style:{marginBottom:20},type:"info",content:["1. \u9000\u4EF6\u7BA1\u7406\uFF1A\u5C06\u60A8\u5DF2\u7ECF\u5728\u4ED3\u5E93\u4E0D\u9700\u8981\u53D1\u8D27\u6216\u8005\u5DF2\u7ECF\u5B8C\u6210\u53D1\u8D27\u591A\u51FA\u6765\u7684\u5546\u54C1\u9000\u56DE\u5230\u60A8\u6307\u5B9A\u7684\u9000\u4EF6\u5730\u5740","2. \u65E0\u8BBA\u662F\u4E0A\u95E8\u53D6\u4EF6\u8FD8\u662F\u4ED3\u5E93\u5FEB\u9012\u5BC4\u56DE\uFF0C\u4ED3\u5E93\u7EDF\u4E00\u6536\u53D6\u6BCF\u4E2A\u9000\u4EF6\u5305\u88F91\u5143/\u5355\u7684\u9000\u4EF6\u670D\u52A1\u8D39\u3002\u9000\u4EF6\u5B8C\u6210\u4E4B\u540E\u4ED3\u5E93\u5C06\u4F1A\u628A\u5BC4\u56DE\u7684\u5FEB\u9012\u5355\u53F7\u586B\u5165\uFF0C\u60A8\u53EF\u901A\u8FC7\u6B64\u5904\u81EA\u884C\u67E5\u770B\u9000\u4EF6\u5355\u53F7","3. \u64CD\u4F5C\u6D41\u7A0B\uFF1A\u65B0\u589E-->\u9009\u62E9\u9000\u4EF6\u4ED3\u5E93-->\u4F9D\u6B21\u586B\u5165\u9700\u8981\u9000\u4EF6\u7684\u4FE1\u606F-->\u786E\u5B9A\u3002 \u6CE8\uFF1A\u4E0A\u95E8\u53D6\u4EF6\u52A1\u5FC5\u5728\u5907\u6CE8\u4E0A\u586B\u5199\u53D6\u4EF6\u7801 \uFF0C\u5426\u5219\u5C06\u9000\u4EF6\u5931\u8D25","4. \u65E0\u4E3B\u4EF6\u4ED3\u5E93\u4F1A\u8FDB\u884C\u516C\u793A 15\u5929\uFF0C15\u5929\u540E\u65E0\u4EBA\u8BA4\u9886\uFF0C\u4ED3\u5E93\u5373\u505A\u9500\u6BC1\u5904\u7406\uFF0C\u4E0D\u4E88\u4EFB\u4F55\u67E5\u627E\u6216\u7406\u8D54"].map(u=>r("div",{children:u},u))}),r(w,{ref:E,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:l.getReturnList,createHandle:()=>{n(!0)},requestQueryTransform:u=>{var a,F;return o(i({},S.exports.omit(u,"applyTime")),{applyStartTime:(a=u.applyTime)==null?void 0:a[0],applyEndTime:(F=u.applyTime)==null?void 0:F[1]})},formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:r(P,{}),isSearch:!0,render(u){return r(q,{value:String(u)})}},o(i({},I),{isSearch:!0}),{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0},{schema:{label:"\u6536\u4EF6\u4EBA\u4FE1\u606F",field:"recipients"}},{schema:{label:"\u5907\u6CE8",field:"storeRemark"}},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyTime"},control:"datePickerRange",isSearch:!0},{schema:{label:"\u72B6\u6001",field:"returnStatus"},render(u){return r(y,{color:v[Number(u)],children:r(N,{dictCode:"tracking_status",value:u})})}},{schema:{field:"actions"},render(u,a){return a.returnStatus!=="1"?r(T,{type:"text",icon:r(R,{}),status:"warning",loading:a.id===(s==null?void 0:s.id)&&D,onClick:async()=>{p(a)},children:"\u53D6\u6D88\u9000\u4EF6"}):null}}]}),r(k,{visible:t,setVisible:n})]})};export{du as default};