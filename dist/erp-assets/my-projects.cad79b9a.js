var g=Object.defineProperty,m=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var c=(a,t,e)=>t in a?g(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,p=(a,t)=>{for(var e in t||(t={}))y.call(t,e)&&c(a,e,t[e]);if(d)for(var e of d(t))h.call(t,e)&&c(a,e,t[e]);return a},l=(a,t)=>m(a,x(t));import{r as o,j as n,aU as w,a as b}from"./vendor.61d82d8d.js";import C from"./project.71f6a146.js";/* empty css               *//* empty css              */function A(){const[a,t]=o.exports.useState(new Array(6).fill({})),[e,i]=o.exports.useState(!0),{Row:f,Col:j}=w,u=async()=>{i(!0);const{data:r}=await b.get("/api/user/projectList").finally(()=>{i(!1)});t(r)};return o.exports.useEffect(()=>{u()},[]),n(f,{gutter:12,children:a.map((r,s)=>n(j,{span:8,style:s>a.length-4&&s<a.length?{marginTop:"16px"}:{},children:n(C,l(p({},r),{loading:e}))},s))})}export{A as default};
