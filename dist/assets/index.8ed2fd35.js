var d=Object.defineProperty,g=Object.defineProperties;var f=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var m=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var s=(n,e,t)=>e in n?d(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,u=(n,e)=>{for(var t in e||(e={}))m.call(e,t)&&s(n,t,e[t]);if(o)for(var t of o(e))E.call(e,t)&&s(n,t,e[t]);return n},p=(n,e)=>g(n,f(e));import{ae as S,j as c,F as b,J as h}from"./vendor.446b4cc8.js";import{e as j}from"./entrepot.af389fbe.js";let a;function v(){return a=a||j.getList({pageNum:1,pageSize:100,entrepotType:1}).then(n=>{var e;return(e=n.data.data)==null?void 0:e.list.map(t=>({label:t.entrepotName,value:t.id}))}),a}function i(){return S(()=>v())}function O(n){var r;const{value:e}=n,{data:t}=i();return c(b,{children:((r=t==null?void 0:t.find(l=>String(l.value)===String(e)))==null?void 0:r.label)||"-"})}const q=n=>{const e=i();return c(h,p(u({placeholder:"\u8BF7\u9009\u62E9"},n),{options:e.data,loading:e.loading}))};export{q as E,O as a,i as u};