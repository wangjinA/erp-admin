var B=Object.defineProperty,C=Object.defineProperties;var A=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var l=(t,e,s)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,i=(t,e)=>{for(var s in e||(e={}))f.call(e,s)&&l(t,s,e[s]);if(d)for(var s of d(e))h.call(e,s)&&l(t,s,e[s]);return t},n=(t,e)=>C(t,A(e));import{r as b,R as c,af as j,d as x,j as a,aA as g,l as S,n as y,B as R,H as T}from"./vendor.61d82d8d.js";/* empty css               */import{e as m,S as v,d as k,n as w}from"./index.383786f4.js";import{D as N}from"./index.df4a9039.js";import{E as P}from"./index.4e6cebd7.js";import{D as q}from"./common.d56ba19c.js";import{s as I,a as L}from"./index.cd67ad60.js";/* empty css               *//* empty css               *//* empty css              */import"./index.14ac94c5.js";import"./shopStore.0904b094.js";import"./index.e047ac3d.js";import"./entrepot.883334f2.js";/* empty css               */import"./schema.06835865.js";/* empty css              */import"./style.4b618b1b.js";var su=()=>{const[t,e]=b.exports.useState(),[s,E]=c.useState(!1),F=c.useRef(),{run:p,loading:D}=j(async u=>{await I({content:"\u786E\u5B9A\u53D6\u6D88\u9000\u4EF6\uFF1F",okButtonProps:{status:"warning"}}),e(u),await L(()=>m.cancelReturn(u.id),"\u53D6\u6D88\u9000\u4EF6"),F.current.refreshSearchTable()},{manual:!0});return x("div",{className:"p-4 bg-white",children:[a(g,{style:{marginBottom:20},type:"info",content:["1. \u9000\u4EF6\u7BA1\u7406\uFF1A\u5C06\u60A8\u5DF2\u7ECF\u5728\u4ED3\u5E93\u4E0D\u9700\u8981\u53D1\u8D27\u6216\u8005\u5DF2\u7ECF\u5B8C\u6210\u53D1\u8D27\u591A\u51FA\u6765\u7684\u5546\u54C1\u9000\u56DE\u5230\u60A8\u6307\u5B9A\u7684\u9000\u4EF6\u5730\u5740","2. \u65E0\u8BBA\u662F\u4E0A\u95E8\u53D6\u4EF6\u8FD8\u662F\u4ED3\u5E93\u5FEB\u9012\u5BC4\u56DE\uFF0C\u4ED3\u5E93\u7EDF\u4E00\u6536\u53D6\u6BCF\u4E2A\u9000\u4EF6\u5305\u88F91\u5143/\u5355\u7684\u9000\u4EF6\u670D\u52A1\u8D39\u3002\u9000\u4EF6\u5B8C\u6210\u4E4B\u540E\u4ED3\u5E93\u5C06\u4F1A\u628A\u5BC4\u56DE\u7684\u5FEB\u9012\u5355\u53F7\u586B\u5165\uFF0C\u60A8\u53EF\u901A\u8FC7\u6B64\u5904\u81EA\u884C\u67E5\u770B\u9000\u4EF6\u5355\u53F7","3. \u64CD\u4F5C\u6D41\u7A0B\uFF1A\u65B0\u589E-->\u9009\u62E9\u9000\u4EF6\u4ED3\u5E93-->\u4F9D\u6B21\u586B\u5165\u9700\u8981\u9000\u4EF6\u7684\u4FE1\u606F-->\u786E\u5B9A\u3002 \u6CE8\uFF1A\u4E0A\u95E8\u53D6\u4EF6\u52A1\u5FC5\u5728\u5907\u6CE8\u4E0A\u586B\u5199\u53D6\u4EF6\u7801 \uFF0C\u5426\u5219\u5C06\u9000\u4EF6\u5931\u8D25","4. \u65E0\u4E3B\u4EF6\u4ED3\u5E93\u4F1A\u8FDB\u884C\u516C\u793A 15\u5929\uFF0C15\u5929\u540E\u65E0\u4EBA\u8BA4\u9886\uFF0C\u4ED3\u5E93\u5373\u505A\u9500\u6BC1\u5904\u7406\uFF0C\u4E0D\u4E88\u4EFB\u4F55\u67E5\u627E\u6216\u7406\u8D54"].map(u=>a("div",{children:u},u))}),a(v,{ref:F,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:m.getReturnList,createHandle:()=>{E(!0)},requestQueryTransform:u=>{var r,o;return n(i({},S.exports.omit(u,"applyTime")),{applyStartTime:(r=u.applyTime)==null?void 0:r[0],applyEndTime:(o=u.applyTime)==null?void 0:o[1]})},formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,render(u){return a(P,{value:String(u)})}},n(i({},q),{isSearch:!0}),{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0},{schema:{label:"\u6536\u4EF6\u4EBA\u4FE1\u606F",field:"recipients"}},{schema:{label:"\u5907\u6CE8",field:"storeRemark"}},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyTime"},control:"datePickerRange",isSearch:!0},{schema:{label:"\u72B6\u6001",field:"returnStatus"},render(u){return a(y,{color:k[Number(u)],children:a(N,{dictCode:"tracking_status",value:u})})}},{schema:{field:"actions"},render(u,r){return r.returnStatus!=="1"?a(R,{type:"text",icon:a(T,{}),status:"warning",loading:r.id===(t==null?void 0:t.id)&&D,onClick:async()=>{p(r)},children:"\u53D6\u6D88\u9000\u4EF6"}):null}}]}),a(w,{visible:s,setVisible:E})]})};export{su as default};
