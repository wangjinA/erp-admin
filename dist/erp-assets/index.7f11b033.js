var n=Object.defineProperty,m=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var l=(r,e,s)=>e in r?n(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s,i=(r,e)=>{for(var s in e||(e={}))f.call(e,s)&&l(r,s,e[s]);if(o)for(var s of o(e))h.call(e,s)&&l(r,s,e[s]);return r},c=(r,e)=>m(r,p(e));import{b as a,X as b,G as x,c as j,r as g,R as C,ag as R,l as S,S as w}from"./vendor.bb408984.js";import{c as F,s as v,g as u}from"./index.2043ebfc.js";import{e as D,S as N,R as T}from"./index.055835f8.js";import"./index.9d4791ac.js";/* empty css               */import"./index.aedfa0dd.js";import"./entrepot.7377f9af.js";import"./shopStore.cb49cab0.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.5a88c625.js";/* empty css               */import"./index.68a41d33.js";import"./index.1ac1b297.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";function y(r){return a(b,c(i({error:a("div",{className:"text-white text-lg h-full flex items-center justify-center",children:a(x,{})})},r),{className:j("size-9 bg-emerald-400 rounded-full flex items-center justify-center",r.className)}))}var Z=()=>{const[r,e]=g.exports.useState(),s=C.useRef();return R(async t=>{await F({content:"\u786E\u5B9A\u53D6\u6D88\uFF1F",okButtonProps:{status:"warning"}}),e(t),await v(()=>D.cancelReject(t.id)),s.current.refreshSearchTable()},{manual:!0}),a("div",{className:"p-4 bg-white",children:a(N,{ref:s,name:"\u7528\u6237\u7BA1\u7406",getListRequest:u.list,createRequest:u.create,removeRequest:u.remove,updateRequest:u.update,requestQueryTransform:t=>i({},S.exports.omit(t,["applyTime","rejectionTime"])),formItemConfigList:[{schema:{label:"\u5E8F\u53F7",field:"index"},render(t,B,d){return d+1}},{schema:{label:"\u7528\u6237\u5934\u50CF",field:"headImg"},render(t){return a(y,{src:t})},control:"upload",controlProps:{limit:1},isCreate:!0},{schema:{label:"\u59D3\u540D",field:"userName"},isCreate:!0,isSearch:!0},{schema:{label:"\u89D2\u8272",field:"roleName"}},{schema:{label:"\u767B\u5F55\u8D26\u53F7",field:"userLoginAccount"},isCreate:!0,isSearch:!0},{schema:{label:"\u5BC6\u7801",field:"userPassword"},isCreate:!0,hideTable:!0,controlProps:{type:"password"}},{schema:{label:"\u7528\u6237\u7EC4",field:"roleIdList"},isCreate:!0,control:"role",controlProps:{mode:"multiple"},render(t){return a(T,{value:t})}},{schema:{label:"\u7535\u8BDD",field:"telephone"},isCreate:!0,isSearch:!0},{schema:{label:"\u72B6\u6001",field:"userStatus"},render(t){return a(w,{checked:!t,checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528"})}}]})})};export{Z as default};
