var o=Object.defineProperty;var a=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var n=(e,r,s)=>r in e?o(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))m.call(r,s)&&n(e,s,r[s]);if(a)for(var s of a(r))d.call(r,s)&&n(e,s,r[s]);return e};import{j as t,s as u,l as c}from"./vendor.ad15203e.js";import{checkIsProblem as l}from"./index.629dd822.js";import{s as p}from"./entrepot.01346301.js";import{S as f}from"./index.c4ccf43e.js";import{T as j}from"./index.fb62b474.js";import{f as b,t as x}from"./index.6a8b0597.js";/* empty css               *//* empty css               */import"./index.3f252752.js";/* empty css               */import"./index.10a8fb09.js";import"./index.a71cd845.js";import"./statusTag.766c2cba.js";import"./index.bd56f4ba.js";/* empty css              *//* empty css              *//* empty css              */import"./index.b1191912.js";import"./style.200a6193.js";import"./index.83e7bd00.js";var H=()=>t("div",{className:"p-4 bg-white",children:t(f,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(j,{value:e})}},{schema:{label:"\u4ED3\u4F4D",field:"freightSpace"},render(e){return e||"-"}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(u,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return b(e)}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},c.exports.omit(e,"createTime")),x(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.scanHistory})});export{H as default};
