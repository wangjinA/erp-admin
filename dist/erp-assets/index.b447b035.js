var S=Object.defineProperty,q=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var L=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var P=(i,a,r)=>a in i?S(i,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[a]=r,j=(i,a)=>{for(var r in a||(a={}))L.call(a,r)&&P(i,r,a[r]);if(T)for(var r of T(a))B.call(a,r)&&P(i,r,a[r]);return i},C=(i,a)=>q(i,I(a));import{r as c,aY as K,ag as N,b as t,j as d,aF as y,i as f,B as k,aO as w,b0 as z,M as H}from"./vendor.bb408984.js";/* empty css               */import{MenuTypeTag as O}from"./index.a05641c6.js";import{g as G,s as U}from"./index.a0706607.js";import{r as m,a as V,A as W,P as Y,F as $}from"./index.a2321643.js";import{L as J}from"./index.458ef172.js";import{S as F,F as Q,a as X}from"./index.68a41d33.js";import"./statusTag.1d433c1a.js";import"./index.8ed87727.js";/* empty css               */import"./index.3f4a725e.js";import"./entrepot.7a63f9f2.js";import"./shopStore.8547e832.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.8260270d.js";/* empty css               */import"./index.624f2718.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";/* empty css              */function Fe(){const i=["0-0","0-1","0-0-2"],[a,r]=c.exports.useState([]);c.exports.useState(i);const[e,h]=c.exports.useState(null),[u]=K(),E=G(),[M,x]=c.exports.useState(null),{data:p,loading:v,run:b}=N(()=>m.get({pageNum:1,pageSize:30}).then(n=>(e||h(n.data.data.list[0]),n.data.data.list))),D=N(()=>(e==null?void 0:e.id)?m.info(e.id).then(n=>{var l,o;r(((o=(l=n.data)==null?void 0:l.data)==null?void 0:o.menuIds)||[])}):null,{refreshDeps:[e==null?void 0:e.id]}),R=N(n=>U(()=>m.remove(n),"\u5220\u9664").then(()=>{(e==null?void 0:e.id)===n&&h(p==null?void 0:p[0]),b()}),{manual:!0});return t(V,{formRef:u,createRequest:m.create,updateRequest:m.update,refreshRequest:b,children:t(W.Consumer,{children:({showType:n,setShowType:l,createAction:o,updateAction:g})=>d("div",{className:"bg-white p-4 pb-6",children:[d(y.Row,{gutter:[20,0],children:[d(y.Col,{span:6,className:"border-r border-neutral-3 pr-4",children:[d(f.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:[t(f.Title,{heading:6,className:"mb-0",children:"\u7528\u6237\u7EC4"}),t(k,{icon:t(w,{}),type:"primary",size:"small",className:"ml-auto",loading:v||D.loading,onClick:()=>{l(F.create)},children:"\u6DFB\u52A0"})]}),t(J,{loading:v||D.loading,data:p,titleKey:"roleName",active:e==null?void 0:e.id,onUpdate:s=>{x(s),l(F.edit)},onActive:s=>{h(s)},onDelete:s=>R.run(s.id)})]}),d(y.Col,{span:9,className:"border-neutral-3 pr-4",children:[t(f.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:t(f.Title,{heading:6,className:"mb-0",children:"\u529F\u80FD\u6743\u9650"})}),t(z,{checkable:!0,autoExpandParent:!1,checkedKeys:a,onCheck:(s,Z)=>{r(s)},fieldNames:{title:"menuName",key:"menuId"},renderTitle:s=>d("div",{children:[t("span",{className:"mr-2",children:s.menuName}),t(O,{size:"small",menuType:s.menuType})]}),treeData:E.data||[]}),d("div",{className:"mt-10 flex justify-center gap-4",children:[t(Y,{deleteRequest:()=>m.remove(e==null?void 0:e.id).then(s=>(b(),s))}),t(k,{type:"primary",loading:g.loading,onClick:()=>{g.run(C(j({},e),{menuIds:a}))},children:"\u4FDD\u5B58"})]})]})]}),t(H,C(j({unmountOnExit:!0},Q),{confirmLoading:o==null?void 0:o.loading,onCancel:()=>{x(null),l(null),u.resetFields()},onOk:async()=>{const s=await u.validate();n===F.create?o.run(s):(await g.run(s),x(null))},visible:!!n,title:`${X[n]}\u7528\u6237\u7EC4`,children:t($,{initialValues:M,form:u,labelLength:8,span:24,formItemConfigList:[{schema:{label:"\u7528\u6237\u7EC4\u540D\u79F0",span:12,field:"roleName",required:!0},control:"input"}]})}))]})})})}export{Fe as default};
