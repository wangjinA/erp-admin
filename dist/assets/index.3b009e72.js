var o=Object.defineProperty;var a=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var n=(e,r,s)=>r in e?o(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))d.call(r,s)&&n(e,s,r[s]);if(a)for(var s of a(r))m.call(r,s)&&n(e,s,r[s]);return e};import{j as t,v as u,l as c}from"./vendor.019c2987.js";import{checkIsProblem as l}from"./index.a5e4dae4.js";import{s as p}from"./entrepot.e592173e.js";import{S as f}from"./index.f880861f.js";import{T as j}from"./index.32aeda99.js";import{f as x,t as h}from"./index.923f5d6c.js";/* empty css               *//* empty css               */import"./index.b1dd8906.js";import"./index.c844fdd9.js";import"./index.07d39300.js";import"./statusTag.766c2cba.js";import"./index.6d111a23.js";/* empty css              *//* empty css              *//* empty css              */import"./index.335c814c.js";import"./style.200a6193.js";import"./index.2695b224.js";var W=()=>t("div",{className:"p-4 bg-white",children:t(f,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(j,{value:e})}},{schema:{label:"\u4ED3\u4F4D",field:"freightSpace"},render(e){return e||"-"}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(u,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return x(e)}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},c.exports.omit(e,"createTime")),h(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.scanHistory})});export{W as default};