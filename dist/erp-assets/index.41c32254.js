var j=Object.defineProperty,f=Object.defineProperties;var h=Object.getOwnPropertyDescriptors;var n=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var u=(t,e,a)=>e in t?j(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,s=(t,e)=>{for(var a in e||(e={}))b.call(e,a)&&u(t,a,e[a]);if(n)for(var a of n(e))x.call(e,a)&&u(t,a,e[a]);return t},c=(t,e)=>f(t,h(e));import{r as T,R as g,ag as S,b as i,l as F,n as y,B as R}from"./vendor.bb408984.js";import{d,S as C,T as D,f as E}from"./index.a2321643.js";import{a as v}from"./index.8ed87727.js";import{E as B}from"./index.3f4a725e.js";import{D as k}from"./common.58f44a01.js";import{c as N,s as P,e as m}from"./index.a0706607.js";/* empty css               */import"./shopStore.8547e832.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.8260270d.js";/* empty css               */import"./index.68a41d33.js";import"./index.624f2718.js";/* empty css              */import"./style.4b618b1b.js";import"./entrepot.7a63f9f2.js";/* empty css               */import"./schema.06835865.js";var ee=()=>{const[t,e]=T.exports.useState(),a=g.useRef(),{run:l,loading:p}=S(async r=>{await N({content:"\u786E\u5B9A\u53D6\u6D88\uFF1F",okButtonProps:{status:"warning"}}),e(r),await P(()=>d.cancelReject(r.id)),a.current.refreshSearchTable()},{manual:!0});return i("div",{className:"p-4 bg-white",children:i(C,{ref:a,name:"\u5305\u88F9\u62D2\u6536",getListRequest:d.getRejectList,requestQueryTransform:r=>s(s(s({},F.exports.omit(r,["applyTime","rejectionTime"])),m(r.applyTime,"applyStartTime","applyEndTime")),m(r.rejectionTime,"rejectionStartTime","rejectionEndTime")),formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,isCreate:!0,render(r){return i(B,{value:r})}},c(s({},k),{isSearch:!0}),{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0,isCreate:!0,render(r){return i(D,{value:r})}},{schema:{label:"\u72B6\u6001",field:"rejectionStatus"},render(r){return i(y,{color:E[Number(r)],children:i(v,{value:r,dictCode:"rejection_status"})})}},{schema:{label:"\u62D2\u6536\u65F6\u95F4",field:"rejectionTime"},control:"datePickerRange",isSearch:!0},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyTime"},control:"datePickerRange",isSearch:!0},{schema:{field:"actions"},render(r,o){return o.rejectionStatus!=="1"?i(R,{type:"text",loading:o.id===(t==null?void 0:t.id)&&p,onClick:async()=>{l(o)},children:"\u53D6\u6D88\u62D2\u6536"}):"-"}}]})})};export{ee as default};
