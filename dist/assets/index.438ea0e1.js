var f=Object.defineProperty,h=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var n=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,F=Object.prototype.propertyIsEnumerable;var d=(s,e,a)=>e in s?f(s,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):s[e]=a,u=(s,e)=>{for(var a in e||(e={}))x.call(e,a)&&d(s,a,e[a]);if(n)for(var a of n(e))F.call(e,a)&&d(s,a,e[a]);return s},o=(s,e)=>h(s,j(e));import{r as b,R as g,ae as E,j as t,l as S,n as B,d as T,F as y,B as c,H as C,N as D,bl as R}from"./vendor.446b4cc8.js";import{e as m,T as k}from"./index.c15c1435.js";import{P}from"./index.516cfbdb.js";import{S as v}from"./index.03a94523.js";import{a as w}from"./index.5824fece.js";import{E as N}from"./index.4d6f2199.js";import{a as A}from"./index.8ed2fd35.js";import{D as I}from"./common.db1320e6.js";import{s as q,a as L}from"./index.27d6feff.js";/* empty css              */import"./order.b78c7a83.js";import"./express.df07d4e7.js";import"./index.0c4b5e83.js";import"./index.aa03eae7.js";import"./entrepot.af389fbe.js";import"./index.85a6a963.js";import"./schema.1126e28f.js";/* empty css               */import"./dict.bc79c0fb.js";import"./index.2eaa7610.js";import"./shopStore.93bc3ad9.js";import"./date.d339ad7b.js";/* empty css               *//* empty css              *//* empty css              */import"./style.200a6193.js";var me=()=>{const[s,e]=b.exports.useState(),a=g.useRef(),{run:l,loading:p}=E(async r=>{await q({content:"\u786E\u5B9A\u53D6\u6D88\u9000\u4EF6\uFF1F",okButtonProps:{status:"warning"}}),e(r),await L(()=>m.cancelReturn(r.id),"\u53D6\u6D88\u9000\u4EF6"),a.current.refreshSearchTable()},{manual:!0});return t("div",{className:"p-4 bg-white",children:t(v,{ref:a,name:"\u5305\u88F9\u8BA4\u9886",getListRequest:m.getReturnList,requestQueryTransform:r=>o(u({},S.exports.omit(r,"applyTime")),{applyStartTime:r.applyTime[0],applyEndTime:r.applyTime[1]}),formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u4ED3\u5E93",span:24},control:t(N,{}),isSearch:!0,render(r){return t(A,{value:String(r)})}},o(u({},I),{isSearch:!0}),{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNo"},isSearch:!0},{schema:{label:"\u7533\u8BF7\u4FE1\u606F",field:"recipients"}},{schema:{label:"\u6536\u4EF6\u4EBA\u4FE1\u606F",field:"recipients"}},{schema:{label:"\u5907\u6CE8",field:"storeRemark"}},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyTime"},control:"datePickerRange",isSearch:!0},{schema:{label:"\u72B6\u6001",field:"returnStatus"},render(r){return t(B,{color:k[Number(r)],children:t(w,{dictCode:"tracking_status",value:r})})}},{schema:{field:"actions"},render(r,i){return i.returnStatus!=="1"?T(y,{children:[t(c,{type:"text",icon:t(C,{}),status:"warning",loading:i.id===(s==null?void 0:s.id)&&p,onClick:()=>{l(i)},children:"\u53D6\u6D88\u9000\u4EF6"}),t(P,{title:"\u786E\u8BA4\u5904\u7406\u5B8C\u6210\uFF1F",buttonProps:{},onOk:()=>{D.warning("\u5F00\u53D1\u4E2D")},children:t(c,{type:"text",icon:t(R,{}),status:"success",children:"\u5904\u7406\u5B8C\u6210"})})]}):null}}]})})};export{me as default};