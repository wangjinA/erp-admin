var d=Object.defineProperty,g=Object.defineProperties;var m=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var s=(a,e,t)=>e in a?d(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,u=(a,e)=>{for(var t in e||(e={}))f.call(e,t)&&s(a,t,e[t]);if(o)for(var t of o(e))E.call(e,t)&&s(a,t,e[t]);return a},p=(a,e)=>g(a,m(e));import{ae as S,j as i,F as h,J as j}from"./vendor.a400a50c.js";import{e as v}from"./entrepot.a3a77f75.js";let n;function F(){return n=n||v.getList({pageNum:1,pageSize:100,entrepotType:1}).then(a=>{var e;return(e=a.data.data)==null?void 0:e.list.map(t=>({label:t.entrepotName,value:t.id}))}),n}function l(){return S(()=>F())}function O(a){var r;const{value:e}=a,{data:t}=l();return i(h,{children:((r=t==null?void 0:t.find(c=>String(c.value)===String(e)))==null?void 0:r.label)||"-"})}const q=a=>{const e=l();return i(j,p(u({placeholder:"\u8BF7\u9009\u62E9"},a),{options:e.data,loading:e.loading}))};export{q as E,O as a,l as u};
