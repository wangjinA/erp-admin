var p=Object.defineProperty,u=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var o=(e,t,i)=>t in e?p(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,r=(e,t)=>{for(var i in t||(t={}))f.call(t,i)&&o(e,i,t[i]);if(d)for(var i of d(t))x.call(t,i)&&o(e,i,t[i]);return e},n=(e,t)=>u(e,j(t));import{r as l,d as g,j as m,m as C}from"./vendor.e85ad009.js";import{S as c}from"./index.a0d553e1.js";import{a as s,d as a}from"./dict.65fc3607.js";import{dictFormItemConfigList as h,dictChildFormItemConfigList as R}from"./schema.d420c5a6.js";/* empty css               *//* empty css               */import"./index.4f7e72ca.js";import"./index.c88cadd8.js";/* empty css              *//* empty css              */import"./index.bcff1c87.js";import"./entrepot.0410365f.js";/* empty css              */import"./index.f140870a.js";import"./style.200a6193.js";import"./index.f26d9882.js";import"./index.e84b879c.js";import"./statusTag.766c2cba.js";var z=()=>{const[e,t]=l.exports.useState();return g("div",{className:"p-4 bg-white",children:[m(c,{name:"\u5B57\u5178",formItemConfigList:h,createRequest:s.create,getListRequest:s.getList,removeRequest:s.remove,updateRequest:s.update,onView:t}),m(C,{width:"80%",visible:!!e,title:e==null?void 0:e.dictName,onCancel:()=>t(null),unmountOnExit:!0,children:m(c,{className:"p-4 bg-white",name:e==null?void 0:e.dictName,initialValues:{dictCode:e==null?void 0:e.dictCode},isSearchParams:!1,formItemConfigList:R,createRequest:i=>a.create(n(r({},i),{dictCode:e==null?void 0:e.dictCode})),getListRequest:a.getList,removeRequest:a.remove,updateRequest:a.update,onView:t})})]})};export{z as default};
