var S=Object.defineProperty,E=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var T=(t,a,u)=>a in t?S(t,a,{enumerable:!0,configurable:!0,writable:!0,value:u}):t[a]=u,n=(t,a)=>{for(var u in a||(a={}))p.call(a,u)&&T(t,u,a[u]);if(l)for(var u of l(a))h.call(a,u)&&T(t,u,a[u]);return t},o=(t,a)=>E(t,I(a));var f=(t,a)=>{var u={};for(var e in t)p.call(t,e)&&a.indexOf(e)<0&&(u[e]=t[e]);if(t!=null&&l)for(var e of l(t))a.indexOf(e)<0&&h.call(t,e)&&(u[e]=t[e]);return u};import{r as v,R as M,ae as b,j as s,l as j,ai as y,S as P,J as q,n as B}from"./vendor.a400a50c.js";import{s as R,a as x,m as i,M as C,l as w,t as g,f as F}from"./index.468900fe.js";import{e as A}from"./express.f8a3364b.js";import{S as N}from"./index.407b6825.js";import{c as k}from"./statusTag.766c2cba.js";/* empty css               *//* empty css               */import"./index.a184ec97.js";/* empty css              */import"./index.a61c6fab.js";import"./entrepot.a3a77f75.js";/* empty css              */import"./index.8712af64.js";import"./style.200a6193.js";import"./index.435cacc0.js";const d=[{label:"\u76EE\u5F55",value:"M"},{label:"\u83DC\u5355",value:"C"},{label:"\u6309\u94AE",value:"F"}];function z(t){const r=t,{menuType:a}=r,u=f(r,["menuType"]),e=b(async()=>(await i.list({pageNum:1,pageSize:C,menuType:a==="C"?"M":"C"})).data.data.list.map(c=>({label:c.menuName,value:c.menuId})),{refreshDeps:[a]});return s(q,n({placeholder:"\u8BF7\u9009\u62E9",options:e.data||[],loading:e.loading},u))}function D({menuType:t,size:a}){var u;return s(B,{size:a,color:k[d.findIndex(e=>e.value===t)],children:(u=d.find(e=>e.value===t))==null?void 0:u.label})}var te=()=>{const[t,a]=v.exports.useState(),u=M.useRef();return b(async e=>{await R({content:"\u786E\u5B9A\u53D6\u6D88\uFF1F",okButtonProps:{status:"warning"}}),a(e),await x(()=>A.cancelReject(e.id)),u.current.refreshSearchTable()},{manual:!0}),s("div",{className:"p-4 bg-white",children:s(N,{majorKey:"menuId",ref:u,formProps:{onChange(e){console.log(e)}},name:"\u7269\u6D41\u83DC\u5355",getListRequest:e=>i.list(o(n({},e),{pageNum:1,pageSize:C})).then(r=>(r.data.data.list=w(r.data.data.list),r.data.data.pageSize=1,r.data.data.total=r.data.data.list.length,r)),createRequest:i.create,updateRequest:i.update,removeRequest:i.remove,requestQueryTransform:e=>n(n(n({},j.exports.omit(e,["applyTime","rejectionTime"])),g(e.applyTime,"applyStartTime","applyEndTime")),g(e.rejectionTime,"rejectionStartTime","rejectionEndTime")),formItemConfigList:[{schema:{label:"\u540D\u79F0",field:"menuName",required:!0},isCreate:!0},{schema:{label:"\u83DC\u5355\u7C7B\u578B",field:"menuType"},isCreate:!0,control:"select",controlProps:{options:d},render(e){return s(D,{menuType:e})}},{schema:{label:"\u8DEF\u5F84",field:"menuPath"},isCreate:!0},{schema:{label:"\u6807\u8BC6",field:"menuPerms",required:!0},isCreate:!0},{schema:{label:"\u7236\u7EA7\u83DC\u5355",field:"parentId"},isCreate:!0,hideTable:!0,showItemHandle(e){return!(!(e==null?void 0:e.menuType)||(e==null?void 0:e.menuType)==="M")},formItemProps:{noStyle:!0},control:s(y.Item,{noStyle:!0,shouldUpdate:(e,r)=>e.menuType!==r.menuType,children:e=>s(y.Item,{rules:[{required:!0,message:"\u8BF7\u9009\u62E9"}],field:"parentId",label:e.menuType==="C"?"\u76EE\u5F55":"\u83DC\u5355",children:s(z,{menuType:e.menuType})})})},{schema:{label:"\u521B\u5EFA\u65F6\u95F4",field:"createTime"},render(e){return F(e)}},{schema:{label:"\u4FEE\u6539\u65F6\u95F4",field:"updateTime"},render(e){return F(e)}},{schema:{label:"\u72B6\u6001",field:"menuStatus"},render(e,r){return s(P,{defaultChecked:e==="0",type:"line",checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528",onChange:m=>{x(()=>i.update(o(n({},j.exports.omit(r,"children")),{menuStatus:m?"0":"1"})))}})}}]})})};export{d as MenuTypeOptipns,D as MenuTypeTag,te as default};
