var S=Object.defineProperty,E=Object.defineProperties;var I=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var T=(t,u,r)=>u in t?S(t,u,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[u]=r,n=(t,u)=>{for(var r in u||(u={}))c.call(u,r)&&T(t,r,u[r]);if(l)for(var r of l(u))h.call(u,r)&&T(t,r,u[r]);return t},o=(t,u)=>E(t,I(u));var f=(t,u)=>{var r={};for(var e in t)c.call(t,e)&&u.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&l)for(var e of l(t))u.indexOf(e)<0&&h.call(t,e)&&(r[e]=t[e]);return r};import{r as q,R as v,ae as b,j as s,l as j,ai as y,S as B,J as M,n as P}from"./vendor.446b4cc8.js";import{e as R}from"./express.df07d4e7.js";import{s as w,a as x,q as i,M as C,l as A,t as F,f as g}from"./index.27d6feff.js";import{S as N}from"./index.03a94523.js";import{c as k}from"./statusTag.766c2cba.js";/* empty css               *//* empty css               */import"./index.4d6f2199.js";/* empty css              *//* empty css              */import"./index.8ed2fd35.js";import"./entrepot.af389fbe.js";/* empty css              */import"./index.85a6a963.js";import"./style.200a6193.js";import"./index.516cfbdb.js";const d=[{label:"\u76EE\u5F55",value:"M"},{label:"\u83DC\u5355",value:"C"},{label:"\u6309\u94AE",value:"F"}];function z(t){const a=t,{menuType:u}=a,r=f(a,["menuType"]),e=b(async()=>(await i.list({pageNum:1,pageSize:C,menuType:u==="C"?"M":"C"})).data.data.list.map(p=>({label:p.menuName,value:p.menuId})),{refreshDeps:[u]});return s(M,n({placeholder:"\u8BF7\u9009\u62E9",options:e.data||[],loading:e.loading},r))}function D({menuType:t,size:u}){var r;return s(P,{size:u,color:k[d.findIndex(e=>e.value===t)],children:(r=d.find(e=>e.value===t))==null?void 0:r.label})}var ue=()=>{const[t,u]=q.exports.useState(),r=v.useRef();return b(async e=>{await w({content:"\u786E\u5B9A\u53D6\u6D88\uFF1F",okButtonProps:{status:"warning"}}),u(e),await x(()=>R.cancelReject(e.id)),r.current.refreshSearchTable()},{manual:!0}),s("div",{className:"p-4 bg-white",children:s(N,{majorKey:"menuId",ref:r,formProps:{onChange(e){console.log(e)}},name:"\u83DC\u5355\u7BA1\u7406",getListRequest:e=>i.list(o(n({},e),{pageNum:1,pageSize:C})).then(a=>(a.data.data.list=A(a.data.data.list),a)),createRequest:i.create,updateRequest:i.update,removeRequest:i.remove,requestQueryTransform:e=>n(n(n({},j.exports.omit(e,["applyTime","rejectionTime"])),F(e.applyTime,"applyStartTime","applyEndTime")),F(e.rejectionTime,"rejectionStartTime","rejectionEndTime")),formItemConfigList:[{schema:{label:"\u540D\u79F0",field:"menuName",required:!0},isCreate:!0},{schema:{label:"\u83DC\u5355\u7C7B\u578B",field:"menuType"},isCreate:!0,control:"select",controlProps:{options:d},render(e){return s(D,{menuType:e})}},{schema:{label:"\u8DEF\u5F84",field:"menuPath"},isCreate:!0},{schema:{label:"\u6807\u8BC6",field:"menuPerms",required:!0},isCreate:!0},{schema:{label:"\u7236\u7EA7\u83DC\u5355",field:"parentId"},isCreate:!0,hideTable:!0,showItemHandle(e){return!(!(e==null?void 0:e.menuType)||(e==null?void 0:e.menuType)==="M")},formItemProps:{noStyle:!0},control:s(y.Item,{noStyle:!0,shouldUpdate:(e,a)=>e.menuType!==a.menuType,children:e=>s(y.Item,{rules:[{required:!0,message:"\u8BF7\u9009\u62E9"}],field:"parentId",label:e.menuType==="C"?"\u76EE\u5F55":"\u83DC\u5355",children:s(z,{menuType:e.menuType})})})},{schema:{label:"\u521B\u5EFA\u65F6\u95F4",field:"createTime"},render(e){return g(e)}},{schema:{label:"\u4FEE\u6539\u65F6\u95F4",field:"updateTime"},render(e){return g(e)}},{schema:{label:"\u72B6\u6001",field:"menuStatus"},render(e,a){return s(B,{defaultChecked:e==="0",type:"line",checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528",onChange:m=>{x(()=>i.update(o(n({},j.exports.omit(a,"children")),{menuStatus:m?"0":"1"})))}})}}]})})};export{D as MenuTypeTag,ue as default};