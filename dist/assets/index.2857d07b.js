var E=Object.defineProperty,v=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var f=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,y=Object.prototype.propertyIsEnumerable;var h=(t,e,s)=>e in t?E(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,x=(t,e)=>{for(var s in e||(e={}))P.call(e,s)&&h(t,s,e[s]);if(f)for(var s of f(e))y.call(e,s)&&h(t,s,e[s]);return t},j=(t,e)=>v(t,D(e));import{a as N,u as R,r as u,ai as q,ae as g,d as b,j as n,B as M,aG as w,bJ as B,M as U}from"./vendor.e85ad009.js";/* empty css              */import k from"./schema.f41f52fb.js";import{s as G}from"./shopStore.8bc023d8.js";import{a as J}from"./index.4f7e72ca.js";import{F as O}from"./index.c88cadd8.js";import{S as T}from"./index.a0d553e1.js";import"./index.e23946f0.js";/* empty css               */import"./dict.65fc3607.js";/* empty css              *//* empty css              */import"./index.bcff1c87.js";import"./entrepot.0410365f.js";import"./index.f140870a.js";import"./style.200a6193.js";/* empty css               */import"./index.f26d9882.js";const z=20*1e3,L=N.create({baseURL:"http://81.71.146.181:3001/shopee",timeout:z}),F={update(t){return L.post("/shipment/update",t)},getProcess(t){return L.post("/shipment/process",t)}},ce=t=>{const{userInfo:e}=R(o=>o),s=u.exports.useRef(),[a,c]=u.exports.useState(),[i,A]=u.exports.useState([]),[d]=q.useForm(),{run:I,loading:S}=g(async()=>{const o=await d.validate();return J(()=>F.update(j(x({},o),{userLoginAccount:e.userLoginAccount,shopId:a==null?void 0:a.id}))).then(()=>{c(null)})},{manual:!0}),{data:m,run:C}=g(()=>{if(!!((i==null?void 0:i.map(r=>r.id))||[]).length)return F.getProcess({userLoginAccount:e.userLoginAccount,shopIds:i.map(r=>r.id)}).then(r=>r.data.data)},{manual:!0});return u.exports.useEffect(()=>{const o=setInterval(()=>{C()},1e3);return()=>{clearInterval(o)}},[]),b("div",{className:"p-4 bg-white",children:[n(T,{ref:s,getListRequest:G.getList,onDataChange:o=>{A(o.list)},formItemConfigList:[...k,{schema:{label:"\u64CD\u4F5C",field:"actions"},render(o,r){var l;const p=Number(((l=m==null?void 0:m[r.id])==null?void 0:l.replace("%",""))||0);return b("div",{className:"flex flex-col gap-2 items-center",children:[n(M,{type:"text",className:"-ml-4",icon:n(w,{}),onClick:()=>{c(r)},children:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570"}),p?n(B,{percent:p}):null]})}}],name:"\u5E97\u94FA\u6388\u6743"}),n(U,{title:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570",unmountOnExit:!0,visible:!!a,onCancel:()=>{c(null)},confirmLoading:S,onConfirm:()=>{I()},children:n(O,{form:d,formItemConfigList:[{schema:{span:24,label:"\u51FA\u8D27\u5929\u6570",field:"day",required:!0},control:"number"}]})})]})};export{ce as default};
