var D=Object.defineProperty,N=Object.defineProperties;var T=Object.getOwnPropertyDescriptors;var j=Object.getOwnPropertySymbols;var M=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var b=(t,e,o)=>e in t?D(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o,S=(t,e)=>{for(var o in e||(e={}))M.call(e,o)&&b(t,o,e[o]);if(j)for(var o of j(e))R.call(e,o)&&b(t,o,e[o]);return t},A=(t,e)=>N(t,T(e));import{a as $,u as q,r as c,ai as U,ae as w,d as f,j as n,B,aG as I,bJ as J,M as O}from"./vendor.446b4cc8.js";/* empty css              */import k from"./schema.7d313f99.js";import{s as G}from"./shopStore.d0b4fab6.js";import{a as z,S as H}from"./index.e7177281.js";import{F as K}from"./index.24c4ed55.js";import{S as P}from"./index.1300b7c0.js";import{s as Q}from"./date.d339ad7b.js";import"./index.7eeabb24.js";/* empty css               */import"./dict.52c9f7e0.js";/* empty css              *//* empty css              */import"./index.1f176540.js";import"./entrepot.f18bef76.js";import"./index.85a6a963.js";import"./style.200a6193.js";/* empty css               */import"./index.c28a8d87.js";const V=20*1e3,g=$.create({baseURL:"https://logistics.suyunbaoo.com/shopeeUtils",timeout:V}),L={update(t){return g.post("/shipment/update",t)},getProcess(t){return g.post("/shipment/process",t)}},xe=t=>{const{userInfo:e}=q(i=>i),o=c.exports.useRef(),[m,d]=c.exports.useState(),[p,C]=c.exports.useState(null),[a,E]=c.exports.useState([]),[x]=U.useForm(),{run:v,loading:y}=w(async()=>{const i=await x.validate();return z(()=>L.update(A(S({},i),{userLoginAccount:e.userLoginAccount,shopId:m==null?void 0:m.id}))).then(()=>{d(null)})},{manual:!0});return c.exports.useEffect(()=>{let i;function u(){if(!!((a==null?void 0:a.map(r=>r.id))||[]).length)return L.getProcess({userLoginAccount:e.userLoginAccount,shopIds:a.map(r=>r.id)}).then(r=>{C(r.data.data)}).finally(()=>{i=setTimeout(u,1500)})}return u(),()=>{clearTimeout(i)}},[JSON.stringify(a)]),f("div",{className:"p-4 bg-white",children:[n(P,{ref:o,getListRequest:G.getList,onDataChange:i=>{E(i.list)},formItemConfigList:[...k.filter(i=>!["region","storeType"].includes(i.schema.field)),{schema:{label:"\u64CD\u4F5C",field:"actions"},render(i,u){var h,F;const s=(h=p==null?void 0:p.progress)==null?void 0:h[u.id],r=Number(((F=s==null?void 0:s.value)==null?void 0:F.replace("%",""))||0),l=(s==null?void 0:s.error)?`,\u4FEE\u6539\u51FA\u9519:${s==null?void 0:s.error}`:"";return f("div",{className:"flex flex-col items-center",children:[n(B,{type:"text",className:"-ml-4",icon:n(I,{}),onClick:()=>{d(u)},children:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570"}),r||l?f("div",{className:"pl-4",children:[n(J,{className:"mb-1",percent:r}),(s==null?void 0:s.duration)||l?n(H,{tagInfos:[{text:`\u5546\u54C1\u6570\u91CF\uFF1A${s.goodsTotal}\uFF0C\u65F6\u957F\uFF1A${Q(s.duration)}${l}`,value:0,color:l?"red":"green"}],value:0}):null]}):null]})}}],name:"\u5E97\u94FA\u6388\u6743"}),n(O,{title:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570",unmountOnExit:!0,visible:!!m,onCancel:()=>{d(null)},confirmLoading:y,onConfirm:()=>{v()},children:n(K,{form:x,formItemConfigList:[{schema:{span:24,label:"\u51FA\u8D27\u5929\u6570",field:"day",required:!0},control:"number",controlProps:{max:30,min:2}}]})})]})};export{xe as default};
