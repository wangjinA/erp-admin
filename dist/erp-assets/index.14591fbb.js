var o=Object.defineProperty,m=Object.defineProperties;var n=Object.getOwnPropertyDescriptors;var s=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var l=(u,e,a)=>e in u?o(u,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):u[e]=a,t=(u,e)=>{for(var a in e||(e={}))c.call(e,a)&&l(u,a,e[a]);if(s)for(var a of s(e))b.call(e,a)&&l(u,a,e[a]);return u},d=(u,e)=>m(u,n(e));import{j as i,d as h,q as p,B as f}from"./vendor.61d82d8d.js";import{S as F,p as j,L as r}from"./index.383786f4.js";import{E as D}from"./index.4e6cebd7.js";import{D as E}from"./common.d56ba19c.js";/* empty css               *//* empty css               */import"./index.cd67ad60.js";/* empty css              */import"./index.df4a9039.js";import"./index.14ac94c5.js";import"./shopStore.0904b094.js";import"./index.e047ac3d.js";import"./entrepot.883334f2.js";/* empty css               */import"./schema.06835865.js";/* empty css              */import"./style.4b618b1b.js";var K=()=>i(F,{className:"bg-white p-4",name:"\u73B0\u6709\u5E93\u5B58",getListRequest:j.getList,formItemConfigList:[{schema:{field:"sendWarehouse",label:"\u6240\u5C5E\u4ED3\u5E93",span:24},control:"entrepotRadio",isSearch:!0,hideTable:!0},d(t({},E),{isSearch:!0,hideTable:!0}),{schema:{label:"SKU",field:"sku"},isSearch:!0,hideTable:!0},{schema:{label:"\u5546\u54C1\u540D\u79F0",field:"goodsName"},isSearch:!0,hideTable:!0},{schema:{label:"\u4ED3\u4F4D",field:"position"},isSearch:!0,hideTable:!0},{schema:{label:"\u5546\u54C1\u4FE1\u606F",field:"goodsInfo"}},{schema:{label:"\u4ED3\u5E93\u4FE1\u606F",field:"sendWarehouse"},render(u){return i(D,{value:u})}},{schema:{label:"\u4ED3\u4F4D\u4FE1\u606F",field:"seatId"}},{schema:{label:"\u5E93\u5B58\u6570\u91CF",field:"stockQuantity"}},{schema:{label:"\u53EF\u7528/\u51BB\u7ED3\u6570\u91CF",field:"availableQuantity"}},{schema:{label:"\u6536\u8D39\u4FE1\u606F",field:"chargeInfo"},render(u,e){return h(p,{children:[i(r,{label:"\u6700\u65B0\u5165\u5E93\u65F6\u95F4",value:""}),i(r,{label:"\u6700\u8FD1\u6263\u8D39\u65F6\u95F4",value:""}),i(r,{label:"\u6700\u8FD1\u6263\u8D39\u91D1\u989D",value:""}),i(r,{label:"\u8BA1\u8D39\u5468\u671F\u5355\u91CF",value:""})]})}},{schema:{label:"\u64CD\u4F5C",field:"acitons"},render(){return i("div",{children:i(f,{type:"primary",onClick:()=>{},children:"\u8865\u8D27"})})}}]});export{K as default};
