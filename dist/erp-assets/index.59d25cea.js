import{r as p,R as E,s as c,a7 as D,a2 as B,j as C,a as e,af as d,d as A,B as f,bO as h}from"./index.70dbfa87.js";import{A as g}from"./index.eaceb272.js";import{S,e as F,f as b,n as y}from"./index.e8394b68.js";import{a as R}from"./index.f17798d6.js";import{E as T}from"./index.069ead7c.js";import{D as x}from"./common.8f085eab.js";import"./index.799a4304.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.503ba2ce.js";import"./index.1719ed03.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./entrepot.ab30483f.js";import"./index.dfe0a253.js";import"./schema.06835865.js";var $=()=>{const[r,o]=p.exports.useState(),[n,a]=E.useState(!1),s=E.useRef(),{run:l,loading:m}=c(async u=>{await D({content:"\u786E\u5B9A\u53D6\u6D88\u9000\u4EF6\uFF1F",okButtonProps:{status:"warning"}}),o(u),await B(()=>F.cancelReturn(u.id),"\u53D6\u6D88\u9000\u4EF6"),s.current.refreshSearchTable()},{manual:!0});return C("div",{className:"p-4 bg-white",children:[e(g,{style:{marginBottom:20},type:"info",content:["1. \u9000\u4EF6\u7BA1\u7406\uFF1A\u5C06\u60A8\u5DF2\u7ECF\u5728\u4ED3\u5E93\u4E0D\u9700\u8981\u53D1\u8D27\u6216\u8005\u5DF2\u7ECF\u5B8C\u6210\u53D1\u8D27\u591A\u51FA\u6765\u7684\u5546\u54C1\u9000\u56DE\u5230\u60A8\u6307\u5B9A\u7684\u9000\u4EF6\u5730\u5740","2. \u65E0\u8BBA\u662F\u4E0A\u95E8\u53D6\u4EF6\u8FD8\u662F\u4ED3\u5E93\u5FEB\u9012\u5BC4\u56DE\uFF0C\u4ED3\u5E93\u7EDF\u4E00\u6536\u53D6\u6BCF\u4E2A\u9000\u4EF6\u5305\u88F91\u5143/\u5355\u7684\u9000\u4EF6\u670D\u52A1\u8D39\u3002\u9000\u4EF6\u5B8C\u6210\u4E4B\u540E\u4ED3\u5E93\u5C06\u4F1A\u628A\u5BC4\u56DE\u7684\u5FEB\u9012\u5355\u53F7\u586B\u5165\uFF0C\u60A8\u53EF\u901A\u8FC7\u6B64\u5904\u81EA\u884C\u67E5\u770B\u9000\u4EF6\u5355\u53F7","3. \u64CD\u4F5C\u6D41\u7A0B\uFF1A\u65B0\u589E-->\u9009\u62E9\u9000\u4EF6\u4ED3\u5E93-->\u4F9D\u6B21\u586B\u5165\u9700\u8981\u9000\u4EF6\u7684\u4FE1\u606F-->\u786E\u5B9A\u3002 \u6CE8\uFF1A\u4E0A\u95E8\u53D6\u4EF6\u52A1\u5FC5\u5728\u5907\u6CE8\u4E0A\u586B\u5199\u53D6\u4EF6\u7801 \uFF0C\u5426\u5219\u5C06\u9000\u4EF6\u5931\u8D25","4. \u65E0\u4E3B\u4EF6\u4ED3\u5E93\u4F1A\u8FDB\u884C\u516C\u793A 15\u5929\uFF0C15\u5929\u540E\u65E0\u4EBA\u8BA4\u9886\uFF0C\u4ED3\u5E93\u5373\u505A\u9500\u6BC1\u5904\u7406\uFF0C\u4E0D\u4E88\u4EFB\u4F55\u67E5\u627E\u6216\u7406\u8D54"].map(u=>e("div",{children:u},u))}),e(S,{ref:s,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:F.getReturnList,createHandle:()=>{a(!0)},requestQueryTransform:u=>{var t,i;return{...d.exports.omit(u,"applyTime"),applyStartTime:(t=u.applyTime)==null?void 0:t[0],applyEndTime:(i=u.applyTime)==null?void 0:i[1]}},formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,render(u){return e(T,{value:String(u)})}},{...x,isSearch:!0},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0},{schema:{label:"\u6536\u4EF6\u4EBA\u4FE1\u606F",field:"recipients"}},{schema:{label:"\u5907\u6CE8",field:"storeRemark"}},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyTime"},control:"datePickerRange",isSearch:!0},{schema:{label:"\u72B6\u6001",field:"returnStatus"},render(u){return e(A,{color:b[Number(u)],children:e(R,{dictCode:"tracking_status",value:u})})}},{schema:{field:"actions"},render(u,t){return t.returnStatus!=="1"?e(f,{type:"text",icon:e(h,{}),status:"warning",loading:t.id===(r==null?void 0:r.id)&&m,onClick:async()=>{l(t)},children:"\u53D6\u6D88\u9000\u4EF6"}):null}}]}),e(y,{visible:n,setVisible:a})]})};export{$ as default};
