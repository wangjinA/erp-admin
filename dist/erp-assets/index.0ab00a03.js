var n=Object.defineProperty;var a=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable;var o=(e,r,s)=>r in e?n(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))d.call(r,s)&&o(e,s,r[s]);if(a)for(var s of a(r))m.call(r,s)&&o(e,s,r[s]);return e};import{j as t,s as c,l as u}from"./vendor.a27d1a64.js";import{checkIsProblem as l}from"./index.0520d2f2.js";import{s as p}from"./entrepot.b1e1023d.js";import{S as b,T as j}from"./index.813cbbc4.js";import{f,t as h}from"./index.f0a84ea1.js";/* empty css               *//* empty css               */import"./index.a4d4505a.js";/* empty css               */import"./index.a9b92500.js";import"./index.6eebe71c.js";import"./statusTag.1d433c1a.js";import"./index.24995e3b.js";/* empty css              */import"./index.85e4c987.js";import"./index.de8b1cf5.js";import"./shopStore.5bccbd9a.js";/* empty css               */import"./schema.06835865.js";import"./index.c4d9ea3b.js";/* empty css              */import"./style.4b618b1b.js";var Q=()=>t("div",{className:"p-4 bg-white",children:t(b,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(j,{value:e})}},{schema:{label:"\u4ED3\u4F4D",field:"freightSpace"},render(e){return e||"-"}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(c,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return f(e)}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},u.exports.omit(e,"createTime")),h(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.scanHistory})});export{Q as default};
