var E=Object.defineProperty,V=Object.defineProperties;var K=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var w=(d,i,r)=>i in d?E(d,i,{enumerable:!0,configurable:!0,writable:!0,value:r}):d[i]=r,R=(d,i)=>{for(var r in i||(i={}))P.call(i,r)&&w(d,r,i[r]);if(T)for(var r of T(i))H.call(i,r)&&w(d,r,i[r]);return d},U=(d,i)=>V(d,K(i));import{r as g,aY as $,u as G,ag as v,b as s,j as u,aF as j,B as I,aO as M,b0 as W,q as Y,n as J,M as O,z as Q,bE as X}from"./vendor.bb408984.js";/* empty css               *//* empty css               */import{MenuTypeTag as Z}from"./index.8b18912a.js";import{k as m,a as _,A,F as ee}from"./index.055835f8.js";import{L as ae}from"./index.458ef172.js";import{T as L}from"./index.8e1bd334.js";import{S as q,F as se,a as ie}from"./index.68a41d33.js";import{s as z}from"./index.2043ebfc.js";import"./statusTag.1d433c1a.js";import"./index.9d4791ac.js";/* empty css               */import"./index.aedfa0dd.js";import"./entrepot.7377f9af.js";import"./shopStore.cb49cab0.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.5a88c625.js";/* empty css               */import"./index.1ac1b297.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";/* empty css              */function we(){const[d,i]=g.exports.useState([]),[r,h]=g.exports.useState([]),[a,y]=g.exports.useState(null),[N,S]=g.exports.useState(!1),[b]=$(),{clientMenuList:B}=G(o=>o),x=v(o=>{if(!!o)return m.info(o).then(t=>{var l,n,c,f;i(((n=(l=t.data)==null?void 0:l.data)==null?void 0:n.menuIds)||[]),y(t.data.data),h(((f=(c=t.data.data)==null?void 0:c.roleUserInfoVOList)==null?void 0:f.map(e=>e.userId))||[])})},{manual:!0}),C=v(()=>{if(!(!(a==null?void 0:a.id)||!N))return m.getRoleUsers(a.id).then(o=>o.data.data)},{refreshDeps:[a==null?void 0:a.id,N]}),{data:p,loading:k,run:D}=v(()=>m.get({pageNum:1,pageSize:30}).then(o=>{var l;const t=o.data.data.list[0];return a||(y(t),x.run(t==null?void 0:t.id),h((l=t==null?void 0:t.roleUserInfoVOList)==null?void 0:l.map(n=>n.userId))),o.data.data.list}));return s(_,{formRef:b,createRequest:m.create,updateRequest:m.saveRoleMenu,refreshRequest:D,children:s(A.Consumer,{children:({showType:o,setShowType:t,createAction:l,updateAction:n})=>{var c,f;return u("div",{className:"bg-white p-4 h-[var(--syb-content-height)] test-1",children:[u(j.Row,{gutter:[20,0],className:"h-full",children:[u(j.Col,{span:6,className:"overflow-y-auto h-full border-r border-neutral-3 pr-4",children:[s(L,{title:"\u7528\u6237\u7EC4",children:s(I,{icon:s(M,{}),type:"primary",size:"small",className:"ml-auto",loading:k||x.loading,onClick:()=>{t(q.create)},children:"\u6DFB\u52A0"})}),s(ae,{loading:k||x.loading,data:p==null?void 0:p.map(e=>({name:e.roleName,id:e.id})),active:a==null?void 0:a.id,onActive:e=>{x.run(e.id)},onDelete:e=>z(()=>m.remove(e.id),"\u5220\u9664").then(()=>{(a==null?void 0:a.id)===e.id&&y(p==null?void 0:p[0]),D()})})]}),u(j.Col,{span:9,className:"overflow-y-auto h-full border-r border-neutral-3 pr-4 flex flex-col",children:[s(L,{title:"\u529F\u80FD\u6743\u9650",className:"mt-0.5"}),s("div",{className:"flex overflow-y-auto",children:s(W,{showLine:!0,checkable:!0,checkedKeys:d,autoExpandParent:!1,onCheck:(e,F)=>{console.log(e,F),i(e)},fieldNames:{title:"menuName",key:"menuId"},renderTitle:e=>u("div",{children:[s("span",{className:"mr-2",children:e.menuName}),s(Z,{size:"small",menuType:e.menuType})]}),treeData:B||[]})}),s("div",{className:"mt-10 gap-4 flex justify-end",children:s(I,{type:"primary",loading:n.loading,onClick:()=>{n.run({roleId:a==null?void 0:a.id,menuIdList:d})},children:"\u4FDD\u5B58"})})]}),u(j.Col,{span:9,className:"overflow-y-auto h-full",children:[s(L,{title:"\u6210\u5458\u5217\u8868",className:"mt-0.5"}),u(Y,{size:[10],children:[(c=a==null?void 0:a.roleUserInfoVOList)==null?void 0:c.map(e=>s(J,{checkable:!0,color:"arcoblue",checked:!0,children:e.userName},e.userId)),s(I,{type:"primary",size:"small",loading:C.loading,icon:s(M,{}),onClick:()=>{var e;h(((e=a==null?void 0:a.roleUserInfoVOList)==null?void 0:e.map(F=>F.userId))||[]),S(!0)},children:"\u6DFB\u52A0"})]})]})]}),s(O,U(R({},se),{confirmLoading:l==null?void 0:l.loading,onCancel:()=>{t(null),b.resetFields()},onOk:async()=>{const e=await b.validate();o===q.create&&l.run(e)},visible:!!o,title:`${ie[o]}\u7528\u6237\u7EC4`,children:s(ee,{form:b,labelLength:8,span:24,formItemConfigList:[{schema:{label:"\u7528\u6237\u7EC4\u540D\u79F0",span:12,field:"roleName",required:!0},control:"input"}]})})),s(O,{style:{width:"700px"},unmountOnExit:!0,confirmLoading:l==null?void 0:l.loading,onCancel:()=>{S(!1)},onOk:()=>z(()=>m.saveRoleUser({roleId:a.id,userIdList:r.map(e=>Number(e))})),visible:N,title:`\u7F16\u8F91 ${a==null?void 0:a.roleName} \u6210\u5458`,children:s(Q,{loading:C.loading,className:"flex justify-center",children:s(X,{simple:{retainSelectedItems:!0},dataSource:((f=C.data)==null?void 0:f.list.map(e=>({key:e.userId,value:e.userName})))||[],targetKeys:r||[],onChange:e=>{h(e)},titleTexts:["\u7528\u6237\u5217\u8868","\u5DF2\u6DFB\u52A0"]})})})]})}})})}export{we as default};
