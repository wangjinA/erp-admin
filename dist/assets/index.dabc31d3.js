var c=Object.defineProperty,p=Object.defineProperties;var l=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var u=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var i=(s,e,t)=>e in s?c(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,d=(s,e)=>{for(var t in e||(e={}))u.call(e,t)&&i(s,t,e[t]);if(a)for(var t of a(e))j.call(e,t)&&i(s,t,e[t]);return s},n=(s,e)=>p(s,l(e));import{ae as x,r as g,d as f,j as o,F as h,z as b}from"./vendor.446b4cc8.js";import{O as I}from"./index.247255cf.js";import N from"./index.d6ef22eb.js";import{s as L}from"./entrepot.575c0010.js";import{a as S}from"./index.284063d0.js";/* empty css              */import"./order.68432f2f.js";import"./express.b00e5c12.js";import"./index.0c4b5e83.js";import"./index.a09911d2.js";import"./index.5449918f.js";/* empty css               *//* empty css              */import"./index.05923c0e.js";/* empty css              */import"./index.85a6a963.js";import"./style.200a6193.js";import"./index.1376f9ee.js";import"./dict.c93cd217.js";import"./index.aa03eae7.js";import"./schema.9b907bdb.js";import"./index.e5ee785d.js";import"./shopStore.2c879861.js";import"./date.d339ad7b.js";/* empty css               */var Z=()=>{const{run:s,data:e,loading:t}=x(async r=>(await S(()=>L.ScanOut(r))).data.data,{manual:!0}),[k,m]=g.exports.useState();return f("div",{className:"bg-white py-6 px-4",children:[o(N,{placeholder:"\u626B\u63CF\u6216\u8F93\u5165\u8BA2\u5355\u53F7",onScan:r=>{s({shrimpOrderNo:r.trackingNo,sendWarehouse:r.sendWarehouse}),m(r.trackingNo)}}),console.log(t),o("div",{children:e?o(h,{children:e.orderItemInfoBgResultList?o(I,{className:"mt-10 text-left",data:{list:e.orderItemInfoBgResultList.map(r=>n(d({},r),{orderProductVOList:r.logisticsOrderProductList,orderPackageList:[]})),pageNum:1,pageSize:e.orderItemInfoBgResultList.length,total:e.orderItemInfoBgResultList.length},dictCode:"order_status",loading:!1}):null}):t?o(b,{className:"block text-center pt-10"}):null})]})};export{Z as default};
