var p=Object.defineProperty,C=Object.defineProperties;var B=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var n=(e,u,s)=>u in e?p(e,u,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[u]=s,a=(e,u)=>{for(var s in u||(u={}))A.call(u,s)&&n(e,s,u[s]);if(o)for(var s of o(u))h.call(u,s)&&n(e,s,u[s]);return e},F=(e,u)=>C(e,B(u));import{r as E,af as f,l as d,d as j,j as t,aA as x,B as b,br as D}from"./vendor.073dee25.js";/* empty css               */import{e as m,S as g,T as S}from"./index.e6e94b01.js";import{E as T}from"./index.24e6eb00.js";import{D as k}from"./common.0ada7281.js";import{s as v,a as y,t as N}from"./index.76707136.js";/* empty css               *//* empty css               *//* empty css              */import"./index.f22ec051.js";import"./index.8b6e6287.js";import"./shopStore.a8aed8ee.js";import"./index.53e48eee.js";import"./entrepot.36e7e5c0.js";/* empty css               */import"./schema.06835865.js";import"./index.28acd1e6.js";/* empty css              */import"./style.4b618b1b.js";var _=()=>{const[e,u]=E.exports.useState(),s=E.exports.useRef(),{run:c,loading:l}=f(async r=>{await v({content:"\u786E\u5B9A\u8BA4\u9886\uFF1F",okButtonProps:{status:"warning"}}),u(r),await y(()=>m.claimHandle(d.exports.pick(r,["sendWarehouse","trackingNo"])),"\u8BA4\u9886"),s.current.refreshSearchTable()},{manual:!0});return j("div",{className:"p-4 bg-white",children:[t(x,{style:{marginBottom:20},type:"info",content:["1. \u5305\u88F9\u8BA4\u9886\uFF1A\u5BC4\u8FC7\u6765\u4ED3\u5E93\u7684\u5305\u88F9\u9762\u5355\u4E0A\u6CA1\u6709\u5199\u7528\u6237\u7F16\u7801\uFF0C\u4ED3\u5E93\u65E0\u6CD5\u8BC6\u522B\u662F\u8C01\u7684\u5305\u88F9\uFF0C\u79F0\u4E4B\u4E3A\u201C\u65E0\u4E3B\u4EF6\u201D","2. \u4ED3\u5E93\u4F1A\u5C06\u201C\u65E0\u4E3B\u4EF6\u201D\u8FDB\u884C\u516C\u793A\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7\u8F93\u5165\u5B8C\u6574\u7684\u5FEB\u9012\u5355\u53F7\u6821\u9A8C\uFF0C\u6821\u9A8C\u6B63\u786E\u540E\u5219\u53EF\u4EE5\u70B9\u51FB\u8BA4\u9886","3. \u8BA4\u9886\u5B8C\u6210\u540E\uFF0C\u5305\u88F9\u4F1A\u5728\u95EE\u9898\u5305\u88F9\u5217\u8868\u91CC\uFF0C\u8BF7\u53CA\u65F6\u5F55\u5355\u5904\u7406","4. \u65E0\u4E3B\u4EF6\u4ED3\u5E93\u4F1A\u8FDB\u884C\u516C\u793A 15\u5929\uFF0C15\u5929\u540E\u65E0\u4EBA\u8BA4\u9886\uFF0C\u4ED3\u5E93\u5373\u505A\u9500\u6BC1\u5904\u7406\uFF0C\u4E0D\u4E88\u4EFB\u4F55\u67E5\u627E\u6216\u7406\u8D54"].map(r=>t("div",{children:r},r))}),t(g,{ref:s,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:m.getClaimList,requestQueryTransform:r=>a(a({},d.exports.omit(r,["shelfTime"])),N(r.shelfTime,"shelfStartTime","shelfEndTime")),formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,render(r){return t(T,{value:r})}},F(a({},k),{isSearch:!0}),{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0,render(r){return t(S,{value:r})}},{schema:{label:"\u7B7E\u6536\u65F6\u95F4",field:"shelfTime"},control:"datePickerRange",isSearch:!0},{schema:{field:"actions"},render(r,i){return t(b,{icon:t(D,{}),type:"text",loading:i.id===(e==null?void 0:e.id)&&l,onClick:async()=>{c(i)},children:"\u8BA4\u9886"})}}]})]})};export{_ as default};
