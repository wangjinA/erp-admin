var n=Object.defineProperty;var a=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var o=(e,r,s)=>r in e?n(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))m.call(r,s)&&o(e,s,r[s]);if(a)for(var s of a(r))d.call(r,s)&&o(e,s,r[s]);return e};import{j as t,s as c,l as u}from"./vendor.446b4cc8.js";import{checkIsProblem as f}from"./index.dec7c552.js";import{s as l}from"./entrepot.af389fbe.js";import{S as p}from"./index.03a94523.js";import{T as j}from"./index.aa03eae7.js";import{f as x,t as b}from"./index.27d6feff.js";/* empty css               *//* empty css               */import"./index.1bcfec9f.js";/* empty css               */import"./index.8ed2fd35.js";import"./index.0c4b5e83.js";import"./statusTag.766c2cba.js";import"./index.4d6f2199.js";/* empty css              *//* empty css              *//* empty css              */import"./index.85a6a963.js";import"./style.200a6193.js";import"./index.516cfbdb.js";var O=()=>t("div",{className:"p-4 bg-white",children:t(p,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(j,{value:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return x(e)}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(c,{status:f(e)?"error":"success",text:e})}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},u.exports.omit(e,"createTime")),b(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:l.getRecord})});export{O as default};
