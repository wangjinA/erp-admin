var o=Object.defineProperty;var i=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var n=(e,r,s)=>r in e?o(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,t=(e,r)=>{for(var s in r||(r={}))m.call(r,s)&&n(e,s,r[s]);if(i)for(var s of i(r))d.call(r,s)&&n(e,s,r[s]);return e};import{j as a,s as u,l as c}from"./vendor.446b4cc8.js";import{checkIsProblem as l}from"./index.3a1b4c05.js";import{s as p}from"./entrepot.575c0010.js";import{S as f}from"./index.af240a5a.js";import{T as j}from"./index.aa03eae7.js";import{f as x,t as h}from"./index.284063d0.js";/* empty css               *//* empty css               */import"./index.d6ef22eb.js";/* empty css               */import"./index.05923c0e.js";import"./index.0c4b5e83.js";import"./statusTag.766c2cba.js";import"./index.5449918f.js";/* empty css              *//* empty css              *//* empty css              */import"./index.85a6a963.js";import"./style.200a6193.js";import"./index.a09911d2.js";var H=()=>a("div",{className:"p-4 bg-white",children:a(f,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return a(j,{value:e})}},{schema:{label:"\u4ED3\u4F4D",field:"freightSpace"},render(e){return e||"-"}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return a(u,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return x(e)}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>t(t({},c.exports.omit(e,"createTime")),h(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.scanHistory})});export{H as default};
