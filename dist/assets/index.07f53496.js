var n=Object.defineProperty;var a=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var o=(e,r,s)=>r in e?n(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))m.call(r,s)&&o(e,s,r[s]);if(a)for(var s of a(r))d.call(r,s)&&o(e,s,r[s]);return e};import{j as t,v as c,l as u}from"./vendor.7897a533.js";import{checkIsProblem as l}from"./index.daf724d0.js";import{s as p}from"./entrepot.369b13c8.js";import{S as j}from"./index.cb66718c.js";import{T as f}from"./index.8f388ae4.js";import{f as x,t as b}from"./index.627cc3c6.js";/* empty css               *//* empty css               */import"./index.41deab7e.js";import"./index.5c74a6e5.js";import"./index.80f47301.js";import"./index.ed792330.js";import"./statusTag.766c2cba.js";import"./index.0400ad0b.js";/* empty css              *//* empty css              *//* empty css              */import"./index.70508b9f.js";import"./style.200a6193.js";import"./index.15739c72.js";var O=()=>t("div",{className:"p-4 bg-white",children:t(j,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(f,{value:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return x(e)}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(c,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},u.exports.omit(e,"createTime")),b(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.getRecord})});export{O as default};
