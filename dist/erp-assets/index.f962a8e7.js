var d=Object.defineProperty,m=Object.defineProperties;var p=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var l=(r,e,s)=>e in r?d(r,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):r[e]=s,i=(r,e)=>{for(var s in e||(e={}))h.call(e,s)&&l(r,s,e[s]);if(o)for(var s of o(e))f.call(e,s)&&l(r,s,e[s]);return r},c=(r,e)=>m(r,p(e));import{j as a,X as x,G as b,c as j,r as g,R as C,af as S,l as w,S as F}from"./vendor.073dee25.js";import{s as R,a as D,g as u}from"./index.76707136.js";import{e as T,S as v}from"./index.e6e94b01.js";/* empty css               *//* empty css               *//* empty css              */import"./index.f22ec051.js";import"./index.24e6eb00.js";import"./entrepot.36e7e5c0.js";import"./index.8b6e6287.js";import"./shopStore.a8aed8ee.js";import"./index.53e48eee.js";/* empty css               */import"./schema.06835865.js";import"./index.28acd1e6.js";/* empty css              */import"./style.4b618b1b.js";function y(r){return a(x,c(i({error:a("div",{className:"text-white text-lg h-full flex items-center justify-center",children:a(b,{})})},r),{className:j("size-9 bg-emerald-400 rounded-full flex items-center justify-center",r.className)}))}var V=()=>{const[r,e]=g.exports.useState(),s=C.useRef();return S(async t=>{await R({content:"\u786E\u5B9A\u53D6\u6D88\uFF1F",okButtonProps:{status:"warning"}}),e(t),await D(()=>T.cancelReject(t.id)),s.current.refreshSearchTable()},{manual:!0}),a("div",{className:"p-4 bg-white",children:a(v,{ref:s,name:"\u7528\u6237\u7BA1\u7406",getListRequest:u.list,createRequest:u.create,removeRequest:u.remove,updateRequest:u.update,requestQueryTransform:t=>i({},w.exports.omit(t,["applyTime","rejectionTime"])),formItemConfigList:[{schema:{label:"\u5E8F\u53F7",field:"index"},render(t,B,n){return n+1}},{schema:{label:"\u7528\u6237\u5934\u50CF",field:"headImg"},render(t){return a(y,{src:t})},control:"upload",controlProps:{limit:1},isCreate:!0},{schema:{label:"\u59D3\u540D",field:"userName"},isCreate:!0,isSearch:!0},{schema:{label:"\u89D2\u8272",field:"roleName"}},{schema:{label:"\u767B\u5F55\u8D26\u53F7",field:"userLoginAccount"},isCreate:!0,isSearch:!0},{schema:{label:"\u5BC6\u7801",field:"userPassword"},isCreate:!0,hideTable:!0,controlProps:{type:"password"}},{schema:{label:"\u7528\u6237\u7EC4",field:"roleIdList"},isCreate:!0,control:"role",controlProps:{mode:"multiple"}},{schema:{label:"\u7535\u8BDD",field:"telephone"},isCreate:!0,isSearch:!0},{schema:{label:"\u72B6\u6001",field:"userStatus"},render(t){return a(F,{checked:!t,checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528"})}}]})})};export{V as default};
