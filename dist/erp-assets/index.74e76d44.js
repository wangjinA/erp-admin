var j=Object.defineProperty,b=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var n=(a,e,t)=>e in a?j(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,i=(a,e)=>{for(var t in e||(e={}))f.call(e,t)&&n(a,t,e[t]);if(d)for(var t of d(e))h.call(e,t)&&n(a,t,e[t]);return a},r=(a,e)=>b(a,x(e));import{S as g}from"./index.813cbbc4.js";import{af as w,j as m}from"./vendor.a27d1a64.js";import{BusinessmapSchema as v}from"./shcema.e4339c8e.js";import{m as R}from"./main.461ee3fd.js";/* empty css               *//* empty css               */import"./index.24995e3b.js";import"./index.f0a84ea1.js";/* empty css              */import"./index.85e4c987.js";import"./index.a9b92500.js";import"./entrepot.b1e1023d.js";import"./index.de8b1cf5.js";import"./shopStore.5bccbd9a.js";import"./index.6eebe71c.js";/* empty css               */import"./schema.06835865.js";import"./index.c4d9ea3b.js";/* empty css              */import"./style.4b618b1b.js";const Q=a=>{const{getAll:e,add:t,deleteRecord:c,update:p}=R.exports.useIndexedDB("businessMap"),{data:l,loading:q}=w(()=>e());return console.log(l),m("div",{className:"p-4 bg-white",children:m(g,{tableProps:{scroll:{x:!0}},formItemConfigList:v,getListRequest:async s=>{let o=await e();return s.name&&(o=o.filter(u=>u.name.includes(s.name))),{data:{data:{list:o,total:o.length}}}},removeRequest:async s=>(console.log(s),await c(s),Promise.resolve({data:{code:200}})),createRequest:async s=>{const o=r(i({},s),{id:Date.now()});return await t(o),Promise.resolve({data:{code:200}})},updateRequest:async s=>{const o=r(i({},s),{updateTime:Date.now()});return await p(o),Promise.resolve({data:{code:200}})},name:"\u4E1A\u52A1\u6620\u5C04",showCreate:!1})})};export{Q as default};
