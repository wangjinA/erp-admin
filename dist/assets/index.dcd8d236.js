var x=Object.defineProperty,b=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var f=(s,r,t)=>r in s?x(s,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[r]=t,u=(s,r)=>{for(var t in r||(r={}))I.call(r,t)&&f(s,t,r[t]);if(p)for(var t of p(r))L.call(r,t)&&f(s,t,r[t]);return s},d=(s,r)=>b(s,j(r));import{r as C,R as q,ae as F,j as l,l as h,n as g,S}from"./vendor.a400a50c.js";import{a as T,x as i}from"./index.468900fe.js";import{S as w}from"./index.407b6825.js";import{S as n}from"./index.8712af64.js";/* empty css               *//* empty css               */import"./index.a184ec97.js";/* empty css              */import"./index.a61c6fab.js";import"./entrepot.a3a77f75.js";/* empty css              */import"./style.200a6193.js";import"./index.435cacc0.js";var z=()=>{C.exports.useState();const s=q.useRef(),{run:r,loading:t}=F(async({id:e,enable:a})=>{await T(()=>i.enableUser({id:e,enable:a}),"\u5207\u6362")},{manual:!0});return l("div",{className:"p-4 bg-white",children:l(w,{ref:s,name:"\u7528\u6237\u7BA1\u7406",getListRequest:i.userList,createRequest:e=>i.insertUser(d(u({},e),{roleIdList:[e.roleIdList]})),removeRequest:i.removeUser,updateRequest:e=>i.updateUser(d(u({},e),{roleIdList:[e.roleIdList]})),editTransform:e=>d(u({},h.exports.omit(e,["userPassword"])),{roleIdList:e.roleIdList[0]}),requestQueryTransform:e=>u({},h.exports.omit(e,["applyTime","rejectionTime"])),formItemConfigList:[{schema:{label:"\u5E8F\u53F7",field:"index"},render(e,a,o){return o+1}},{schema:{label:"\u59D3\u540D",field:"userName"},isCreate:!0,isSearch:!0,formItemProps:{required:!0}},{schema:{label:"\u767B\u5F55\u8D26\u53F7",field:"userLoginAccount"},isCreate:!0,dynamicHandle({showType:e}){return{formItemProps:{required:!0,disabled:e===n.edit}}}},{schema:{label:"\u5BC6\u7801",field:"userPassword"},isCreate:!0,hideTable:!0,dynamicHandle({showType:e}){return{controlProps:{required:e===n.create,type:"password",placeholder:e===n.create?"\u8BF7\u8F93\u5165\u5BC6\u7801":"\u4E0D\u4FEE\u6539\u8BF7\u7559\u7A7A"}}}},{schema:{label:"\u7528\u6237\u89D2\u8272",field:"roleIdList"},isCreate:!0,control:"role",formItemProps:{required:!0},render(e,a,o){var c;return((c=a.roleNameList)==null?void 0:c.map(m=>l(g,{checkable:!0,color:"arcoblue",checked:!0,children:m},m)))||"-"}},{schema:{label:"\u72B6\u6001",field:"userStatus"},render(e,a){return l(S,{defaultChecked:!e,checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528",loading:t,onChange:o=>{r({id:a.id,enable:Number(!o)})}})}},{schema:{label:"\u5907\u6CE8",field:"remark"},isCreate:!0,render:e=>e||"-",control:"textarea"}]})})};export{z as default};
