var p=Object.defineProperty,u=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var m=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable;var o=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,r=(e,t)=>{for(var i in t||(t={}))x.call(t,i)&&o(e,i,t[i]);if(m)for(var i of m(t))l.call(t,i)&&o(e,i,t[i]);return e},n=(e,t)=>u(e,j(t));import{r as f,d as b,j as d,m as g}from"./vendor.ad15203e.js";import{S as c}from"./index.651bda70.js";import{a as s,d as a}from"./dict.db1cf209.js";import{dictFormItemConfigList as C,dictChildFormItemConfigList as h}from"./schema.d459976c.js";/* empty css               *//* empty css               */import"./index.3c345a9e.js";import"./index.32f67d73.js";/* empty css              *//* empty css              */import"./index.c86d986a.js";import"./entrepot.07ce41c4.js";/* empty css              */import"./index.b1191912.js";import"./style.200a6193.js";import"./index.502761cb.js";import"./index.5a17db59.js";import"./statusTag.766c2cba.js";var z=()=>{const[e,t]=f.exports.useState();return b("div",{className:"p-4 bg-white",children:[d(c,{name:"\u5B57\u5178",formItemConfigList:C,createRequest:s.create,getListRequest:s.getList,removeRequest:s.remove,updateRequest:s.update,onView:t}),d(g,{width:"80%",visible:!!e,title:e==null?void 0:e.dictName,onCancel:()=>t(null),unmountOnExit:!0,children:d(c,{className:"p-4 bg-white",name:e==null?void 0:e.dictName,initialValues:{dictCode:e==null?void 0:e.dictCode},isSearchParams:!1,formItemConfigList:h,createRequest:i=>a.create(n(r({},i),{dictCode:e==null?void 0:e.dictCode})),getListRequest:a.getList,removeRequest:a.remove,updateRequest:a.update,onView:t})})]})};export{z as default};
