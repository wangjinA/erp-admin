import{r as o,s as E,a7 as p,a2 as c,j as l,a as e,af as s,bg as C,B}from"./index.70dbfa87.js";import{A}from"./index.eaceb272.js";import{S as d,e as i,T as h}from"./index.e8394b68.js";import{E as f}from"./index.069ead7c.js";import{D}from"./common.8f085eab.js";import{I as g}from"./index.0aecdbbf.js";import"./index.f17798d6.js";import"./index.799a4304.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.503ba2ce.js";import"./index.1719ed03.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./entrepot.ab30483f.js";import"./index.dfe0a253.js";import"./schema.06835865.js";var V=()=>{const[r,F]=o.exports.useState(),t=o.exports.useRef(),{run:m,loading:n}=E(async u=>{await p({content:"\u786E\u5B9A\u8BA4\u9886\uFF1F",okButtonProps:{status:"warning"}}),F(u),await c(()=>i.claimHandle(s.exports.pick(u,["sendWarehouse","trackingNo"])),"\u8BA4\u9886"),t.current.refreshSearchTable()},{manual:!0});return l("div",{className:"p-4 bg-white",children:[e(A,{style:{marginBottom:20},type:"info",content:["1. \u5305\u88F9\u8BA4\u9886\uFF1A\u5BC4\u8FC7\u6765\u4ED3\u5E93\u7684\u5305\u88F9\u9762\u5355\u4E0A\u6CA1\u6709\u5199\u7528\u6237\u7F16\u7801\uFF0C\u4ED3\u5E93\u65E0\u6CD5\u8BC6\u522B\u662F\u8C01\u7684\u5305\u88F9\uFF0C\u79F0\u4E4B\u4E3A\u201C\u65E0\u4E3B\u4EF6\u201D","2. \u4ED3\u5E93\u4F1A\u5C06\u201C\u65E0\u4E3B\u4EF6\u201D\u8FDB\u884C\u516C\u793A\uFF0C\u60A8\u53EF\u4EE5\u901A\u8FC7\u8F93\u5165\u5B8C\u6574\u7684\u5FEB\u9012\u5355\u53F7\u6821\u9A8C\uFF0C\u6821\u9A8C\u6B63\u786E\u540E\u5219\u53EF\u4EE5\u70B9\u51FB\u8BA4\u9886","3. \u8BA4\u9886\u5B8C\u6210\u540E\uFF0C\u5305\u88F9\u4F1A\u5728\u95EE\u9898\u5305\u88F9\u5217\u8868\u91CC\uFF0C\u8BF7\u53CA\u65F6\u5F55\u5355\u5904\u7406","4. \u65E0\u4E3B\u4EF6\u4ED3\u5E93\u4F1A\u8FDB\u884C\u516C\u793A 15\u5929\uFF0C15\u5929\u540E\u65E0\u4EBA\u8BA4\u9886\uFF0C\u4ED3\u5E93\u5373\u505A\u9500\u6BC1\u5904\u7406\uFF0C\u4E0D\u4E88\u4EFB\u4F55\u67E5\u627E\u6216\u7406\u8D54"].map(u=>e("div",{children:u},u))}),e(d,{ref:t,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:i.getClaimList,requestQueryTransform:u=>({...s.exports.omit(u,["shelfTime"]),...C(u.shelfTime,"shelfStartTime","shelfEndTime")}),formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,render(u){return e(f,{value:u})}},{...D,isSearch:!0},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0,render(u){return e(h,{value:u})}},{schema:{label:"\u7B7E\u6536\u65F6\u95F4",field:"shelfTime"},control:"datePickerRange",isSearch:!0},{schema:{field:"actions"},render(u,a){return e(B,{icon:e(g,{}),type:"text",loading:a.id===(r==null?void 0:r.id)&&n,onClick:async()=>{m(a)},children:"\u8BA4\u9886"})}}]})]})};export{V as default};
