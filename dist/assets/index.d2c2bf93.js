var E=Object.defineProperty,P=Object.defineProperties;var H=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var $=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable;var R=(n,r,l)=>r in n?E(n,r,{enumerable:!0,configurable:!0,writable:!0,value:l}):n[r]=l,U=(n,r)=>{for(var l in r||(r={}))$.call(r,l)&&R(n,l,r[l]);if(w)for(var l of w(r))G.call(r,l)&&R(n,l,r[l]);return n},M=(n,r)=>P(n,H(r));import{r as h,aO as W,u as J,ae as F,j as s,d as p,aL as j,B as I,aB as O,aP as Q,p as X,q as Y,M as B,bI as Z}from"./vendor.ad15203e.js";/* empty css               */import{MenuTypeTag as _}from"./index.46f8eb7b.js";import{a as u,F as A}from"./index.bd56f4ba.js";import{C as ee,A as ae}from"./index.c4ccf43e.js";import{L as se}from"./index.69f8799a.js";import{T as L}from"./index.f14ac72c.js";import{S as q,F as re,a as te}from"./index.b1191912.js";import{a as K}from"./index.6a8b0597.js";import"./express.f245d51a.js";import"./statusTag.766c2cba.js";/* empty css               *//* empty css               *//* empty css              *//* empty css              */import"./index.10a8fb09.js";import"./entrepot.01346301.js";/* empty css              */import"./style.200a6193.js";import"./index.83e7bd00.js";/* empty css               */function ke(){const n=["0-0","0-1","0-0-2"],[r,l]=h.exports.useState([]);h.exports.useState(n);const[y,v]=h.exports.useState([]),[a,C]=h.exports.useState(null),[N,k]=h.exports.useState(!1),[x]=W(),{clientMenuList:V}=J(i=>i),g=F(i=>{if(!!i)return u.info(i).then(t=>{var o,d,c,f;l(((d=(o=t.data)==null?void 0:o.data)==null?void 0:d.menuIds)||[]),C(t.data.data),v((f=(c=t.data.data)==null?void 0:c.roleUserInfoVOList)==null?void 0:f.map(e=>e.userId))})},{manual:!0}),D=F(()=>{if(!(!(a==null?void 0:a.id)||!N))return u.getRoleUsers(a.id).then(i=>i.data.data)},{refreshDeps:[a==null?void 0:a.id,N]}),{data:m,loading:S,run:T}=F(()=>u.get({pageNum:1,pageSize:30}).then(i=>{var o;const t=i.data.data.list[0];return a||(C(t),g.run(t==null?void 0:t.id),v((o=t==null?void 0:t.roleUserInfoVOList)==null?void 0:o.map(d=>d.userId))),i.data.data.list}));return s(ee,{formRef:x,createRequest:u.create,updateRequest:u.saveRoleMenu,refreshRequest:T,children:s(ae.Consumer,{children:({showType:i,setShowType:t,createAction:o,updateAction:d})=>{var c,f;return p("div",{className:"bg-white p-4 h-[var(--syb-content-height)] test-1",children:[p(j.Row,{gutter:[20,0],className:"h-full",children:[p(j.Col,{span:6,className:"overflow-y-auto h-full border-r border-neutral-3 pr-4",children:[s(L,{title:"\u7528\u6237\u7EC4",children:s(I,{icon:s(O,{}),type:"primary",size:"small",className:"ml-auto",loading:S||g.loading,onClick:()=>{t(q.create)},children:"\u6DFB\u52A0"})}),s(se,{loading:S||g.loading,data:m==null?void 0:m.map(e=>({name:e.roleName,id:e.id})),active:a==null?void 0:a.id,onActive:e=>{g.run(e.id)},onDelete:e=>K(()=>u.remove(e.id),"\u5220\u9664").then(()=>{(a==null?void 0:a.id)===e.id&&(C(m==null?void 0:m[0]),T())})})]}),p(j.Col,{span:9,className:"overflow-y-auto h-full border-r border-neutral-3 pr-4 flex flex-col",children:[s(L,{title:"\u529F\u80FD\u6743\u9650",className:"mt-0.5"}),s("div",{className:"flex overflow-y-auto",children:s(Q,{showLine:!0,checkable:!0,checkedKeys:r,onCheck:(e,b)=>{console.log(e,b),l(e)},fieldNames:{title:"menuName",key:"menuId"},renderTitle:e=>p("div",{children:[s("span",{className:"mr-2",children:e.menuName}),s(_,{size:"small",menuType:e.menuType})]}),treeData:V||[]})}),s("div",{className:"mt-10 gap-4 flex justify-end",children:s(I,{type:"primary",loading:d.loading,onClick:()=>{d.run({roleId:a==null?void 0:a.id,menuIdList:r})},children:"\u4FDD\u5B58"})})]}),p(j.Col,{span:9,className:"overflow-y-auto h-full",children:[s(L,{title:"\u6210\u5458\u5217\u8868",className:"mt-0.5"}),s(X,{size:[16,16],children:(c=a==null?void 0:a.roleUserInfoVOList)==null?void 0:c.map(e=>s(Y,{checkable:!0,color:"arcoblue",checked:!0,children:e.userName},e.userId))}),s(I,{type:"primary",size:"small",loading:D.loading,icon:s(O,{}),onClick:()=>{k(!0)},children:"\u6DFB\u52A0"})]})]}),s(B,M(U({},re),{confirmLoading:o==null?void 0:o.loading,onCancel:()=>{t(null),x.resetFields()},onOk:async()=>{const e=await x.validate();i===q.create&&o.run(e)},visible:!!i,title:`${te[i]}\u7528\u6237\u7EC4`,children:s(A,{form:x,labelLength:8,span:24,formItemConfigList:[{schema:{label:"\u7528\u6237\u7EC4\u540D\u79F0",span:12,field:"roleName",required:!0},control:"input"}]})})),s(B,{style:{width:"700px"},unmountOnExit:!0,confirmLoading:o==null?void 0:o.loading,onCancel:()=>{k(!1)},onOk:()=>y.every(e=>{var b;return e===((b=a.roleUserInfoVOList)==null?void 0:b.map(z=>z.userId))})?null:K(()=>u.saveRoleUser({roleId:a.id,userIdList:y})),visible:N,title:`\u7F16\u8F91 ${a==null?void 0:a.roleName} \u6210\u5458`,children:s("div",{className:"flex justify-center",children:s(Z,{dataSource:((f=D.data)==null?void 0:f.list.map(e=>({key:e.userId,value:e.userName})))||[],targetKeys:y||[],onChange:e=>{v(e)},titleTexts:["\u7528\u6237\u5217\u8868","\u5DF2\u6DFB\u52A0"]})})})]})}})})}export{ke as default};
