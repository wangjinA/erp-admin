var n=Object.defineProperty;var a=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var o=(e,r,s)=>r in e?n(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,i=(e,r)=>{for(var s in r||(r={}))m.call(r,s)&&o(e,s,r[s]);if(a)for(var s of a(r))d.call(r,s)&&o(e,s,r[s]);return e};import{j as t,s as u,l as c}from"./vendor.073dee25.js";import{checkIsProblem as l}from"./index.e76ab068.js";import{s as p}from"./entrepot.36e7e5c0.js";import{S as j,T as b}from"./index.e6e94b01.js";import{f,t as h}from"./index.76707136.js";/* empty css               *//* empty css               */import"./index.cb8a302e.js";/* empty css               */import"./index.24e6eb00.js";import"./index.53e48eee.js";import"./statusTag.1d433c1a.js";/* empty css              */import"./index.f22ec051.js";import"./index.8b6e6287.js";import"./shopStore.a8aed8ee.js";/* empty css               */import"./schema.06835865.js";import"./index.28acd1e6.js";/* empty css              */import"./style.4b618b1b.js";var O=()=>t("div",{className:"p-4 bg-white",children:t(j,{showActions:!1,name:"\u626B\u7801\u8BB0\u5F55",formItemConfigList:[{schema:{label:"\u4ED3\u5E93",field:"sendWarehouse",span:24},control:"entrepotRadio",isSearch:!0,render(e,r){return r.sendWarehouseName}},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"trackingNumber"},isSearch:!0,render(e){return t(b,{value:e})}},{schema:{label:"\u4ED3\u4F4D",field:"freightSpace"},render(e){return e||"-"}},{schema:{label:"\u8BF4\u660E",field:"instructions"},render(e){return t(u,{status:l(e)?"error":"success",text:e})}},{schema:{label:"\u626B\u7801\u65F6\u95F4",field:"createTime"},control:"datePickerRange",isSearch:!0,render(e){return f(e)}},{schema:{label:"\u64CD\u4F5C\u4EBA",field:"operator"},isSearch:!0}],requestQueryTransform:e=>i(i({},c.exports.omit(e,"createTime")),h(e.createTime,"scanningStartTime","scanningEndTime")),getListRequest:p.scanHistory})});export{O as default};
