var c=Object.defineProperty,p=Object.defineProperties;var l=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var i=(t,e,s)=>e in t?c(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s,d=(t,e)=>{for(var s in e||(e={}))u.call(e,s)&&i(t,s,e[s]);if(o)for(var s of o(e))j.call(e,s)&&i(t,s,e[s]);return t},n=(t,e)=>p(t,l(e));import{ae as x,r as f,d as g,j as a,F as h,z as b}from"./vendor.e85ad009.js";import{O as I}from"./index.bc76237d.js";import N from"./index.8dab1371.js";import{s as L}from"./entrepot.0410365f.js";import{a as S}from"./index.4f7e72ca.js";/* empty css              */import"./order.1c759bf8.js";import"./express.7aafeddd.js";import"./index.643e1fa4.js";import"./index.f26d9882.js";import"./index.c88cadd8.js";/* empty css               *//* empty css              */import"./index.bcff1c87.js";/* empty css              */import"./index.f140870a.js";import"./style.200a6193.js";import"./index.e23946f0.js";import"./dict.65fc3607.js";import"./index.d4fecd69.js";import"./schema.f66aa95e.js";import"./index.004e14f6.js";import"./shopStore.8bc023d8.js";/* empty css               */var Y=()=>{const{run:t,data:e,loading:s}=x(async r=>(await S(()=>L.ScanOut(r))).data.data,{manual:!0}),[k,m]=f.exports.useState();return g("div",{className:"bg-white py-6 px-4",children:[a(N,{placeholder:"\u626B\u63CF\u6216\u8F93\u5165\u8BA2\u5355\u53F7",onScan:r=>{t({shrimpOrderNo:r.trackingNo,sendWarehouse:r.sendWarehouse}),m(r.trackingNo)}}),console.log(s),a("div",{children:e?a(h,{children:e.orderItemInfoBgResultList?a(I,{className:"mt-10 text-left",data:{list:e.orderItemInfoBgResultList.map(r=>n(d({},r),{orderProductVOList:r.logisticsOrderProductList,orderPackageList:[]})),pageNum:1,pageSize:e.orderItemInfoBgResultList.length,total:e.orderItemInfoBgResultList.length},dictCode:"order_status",loading:!1}):null}):s?a(b,{className:"block text-center pt-10"}):null})]})};export{Y as default};
