var R=Object.defineProperty,q=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var P=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var T=(n,a,t)=>a in n?R(n,a,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[a]=t,b=(n,a)=>{for(var t in a||(a={}))S.call(a,t)&&T(n,t,a[t]);if(P)for(var t of P(a))B.call(a,t)&&T(n,t,a[t]);return n},C=(n,a)=>q(n,I(a));import{r as c,aO as K,ae as N,j as r,d as o,aL as y,i as f,B as k,aB as w,aP as z,M as H}from"./vendor.446b4cc8.js";/* empty css               */import{MenuTypeTag as O}from"./index.e026c2ea.js";import{d as G,a as U}from"./index.87f2eed4.js";import{r as m,F as V}from"./index.d0069e83.js";import{C as W,A as $}from"./index.aa842f7e.js";import{L as J}from"./index.0f397cc2.js";import{P as Q}from"./index.f1cbc566.js";import{S as F,F as X,a as Y}from"./index.85a6a963.js";import"./express.377fb96b.js";import"./statusTag.766c2cba.js";/* empty css               *//* empty css               *//* empty css              *//* empty css              */import"./index.58ce673d.js";import"./entrepot.1917f452.js";/* empty css              */import"./style.200a6193.js";/* empty css               */function be(){const n=["0-0","0-1","0-0-2"],[a,t]=c.exports.useState([]);c.exports.useState(n);const[e,h]=c.exports.useState(null),[u]=K(),E=G(),[L,x]=c.exports.useState(null),{data:p,loading:v,run:g}=N(()=>m.get({pageNum:1,pageSize:30}).then(i=>(e||h(i.data.data.list[0]),i.data.data.list))),D=N(()=>(e==null?void 0:e.id)?m.info(e.id).then(i=>{var d,l;t(((l=(d=i.data)==null?void 0:d.data)==null?void 0:l.menuIds)||[])}):null,{refreshDeps:[e==null?void 0:e.id]}),M=N(i=>U(()=>m.remove(i),"\u5220\u9664").then(()=>{(e==null?void 0:e.id)===i&&h(p==null?void 0:p[0]),g()}),{manual:!0});return r(W,{formRef:u,createRequest:m.create,updateRequest:m.update,refreshRequest:g,children:r($.Consumer,{children:({showType:i,setShowType:d,createAction:l,updateAction:j})=>o("div",{className:"bg-white p-4 pb-6",children:[o(y.Row,{gutter:[20,0],children:[o(y.Col,{span:6,className:"border-r border-neutral-3 pr-4",children:[o(f.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:[r(f.Title,{heading:6,className:"mb-0",children:"\u7528\u6237\u7EC4"}),r(k,{icon:r(w,{}),type:"primary",size:"small",className:"ml-auto",loading:v||D.loading,onClick:()=>{d(F.create)},children:"\u6DFB\u52A0"})]}),r(J,{loading:v||D.loading,data:p,titleKey:"roleName",active:e==null?void 0:e.id,onUpdate:s=>{x(s),d(F.edit)},onActive:s=>{h(s)},onDelete:s=>M.run(s.id)})]}),o(y.Col,{span:9,className:"border-neutral-3 pr-4",children:[r(f.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:r(f.Title,{heading:6,className:"mb-0",children:"\u529F\u80FD\u6743\u9650"})}),r(z,{checkable:!0,autoExpandParent:!1,checkedKeys:a,onCheck:(s,Z)=>{t(s)},fieldNames:{title:"menuName",key:"menuId"},renderTitle:s=>o("div",{children:[r("span",{className:"mr-2",children:s.menuName}),r(O,{size:"small",menuType:s.menuType})]}),treeData:E.data||[]}),o("div",{className:"mt-10 flex justify-center gap-4",children:[r(Q,{deleteRequest:()=>m.remove(e==null?void 0:e.id).then(s=>(g(),s))}),r(k,{type:"primary",loading:j.loading,onClick:()=>{j.run(C(b({},e),{menuIds:a}))},children:"\u4FDD\u5B58"})]})]})]}),r(H,C(b({unmountOnExit:!0},X),{confirmLoading:l==null?void 0:l.loading,onCancel:()=>{x(null),d(null),u.resetFields()},onOk:async()=>{const s=await u.validate();i===F.create?l.run(s):(await j.run(s),x(null))},visible:!!i,title:`${Y[i]}\u7528\u6237\u7EC4`,children:r(V,{initialValues:L,form:u,labelLength:8,span:24,formItemConfigList:[{schema:{label:"\u7528\u6237\u7EC4\u540D\u79F0",span:12,field:"roleName",required:!0},control:"input"}]})}))]})})})}export{be as default};
