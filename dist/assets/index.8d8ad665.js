var m=Object.defineProperty;var l=Object.getOwnPropertySymbols;var p=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var n=(t,e,r)=>e in t?m(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,d=(t,e)=>{for(var r in e||(e={}))p.call(e,r)&&n(t,r,e[r]);if(l)for(var r of l(e))h.call(e,r)&&n(t,r,e[r]);return t};import{r as f,R as x,aj as b,j as u,l as j,Y as C,S as c,n as g}from"./vendor.019c2987.js";import{a as w,m as i}from"./index.923f5d6c.js";import{S as D}from"./index.f880861f.js";import{W as F}from"./index.335c814c.js";/* empty css               *//* empty css               */import"./index.6d111a23.js";/* empty css              *//* empty css              */import"./index.c844fdd9.js";import"./entrepot.e592173e.js";/* empty css              */import"./style.200a6193.js";import"./index.2695b224.js";var M=()=>{f.exports.useState();const t=x.useRef(),{run:e,loading:r}=b(async({id:s,enable:a})=>{await w(()=>i.enableUser({id:s,enable:a}),"\u5207\u6362")},{manual:!0});return u("div",{className:"p-4 bg-white",children:u(D,{ref:t,name:"\u7528\u6237\u7BA1\u7406",getListRequest:i.userList,createRequest:i.insertUser,removeRequest:i.removeUser,updateRequest:i.updateUser,requestQueryTransform:s=>d({},j.exports.omit(s,["applyTime","rejectionTime"])),formItemConfigList:[{schema:{label:"\u5E8F\u53F7",field:"index"},render(s,a,o){return o+1}},{schema:{label:"\u7528\u6237\u5934\u50CF",field:"headImg"},render(s){return u(C,{className:"size-9",alt:"avatar",src:s})},control:"upload",controlProps:{limit:1},isCreate:!0},{schema:{label:"\u662F\u5426\u4E3A\u7BA1\u7406\u5458",field:"isAdmin"},render(s,a){return u(c,{onClick:()=>{g.warning({content:"\u7BA1\u7406\u5458\u4E0D\u53EF\u53D6\u6D88",duration:2e3})},checked:!!s,checkedText:"\u662F",uncheckedText:"\u5426"})},control:"select",controlProps:{options:F}},{schema:{label:"\u59D3\u540D",field:"userName"},isCreate:!0,isSearch:!0},{schema:{label:"\u89D2\u8272",field:"roleName"}},{schema:{label:"\u767B\u5F55\u8D26\u53F7",field:"userLoginAccount"},isCreate:!0,isSearch:!0},{schema:{label:"\u5BC6\u7801",field:"userPassword"},isCreate:!0,hideTable:!0,controlProps:{type:"password"}},{schema:{label:"\u7528\u6237\u7EC4",field:"roleIds"},isCreate:!0,control:"role",controlProps:{mode:"multiple"}},{schema:{label:"\u7535\u8BDD",field:"telephone"},isCreate:!0,isSearch:!0},{schema:{label:"\u72B6\u6001",field:"userStatus"},render(s,a){return u(c,{defaultChecked:!s,checkedText:"\u542F\u7528",uncheckedText:"\u7981\u7528",loading:r,onChange:o=>{e({id:a.id,enable:Number(!o)})}})}}]})})};export{M as default};
