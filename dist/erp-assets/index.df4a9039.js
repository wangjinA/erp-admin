var C=Object.defineProperty,N=Object.defineProperties;var j=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var h=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var f=(t,e,a)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,d=(t,e)=>{for(var a in e||(e={}))h.call(e,a)&&f(t,a,e[a]);if(c)for(var a of c(e))g.call(e,a)&&f(t,a,e[a]);return t},u=(t,e)=>N(t,j(e));var D=(t,e)=>{var a={};for(var r in t)h.call(t,r)&&e.indexOf(r)<0&&(a[r]=t[r]);if(t!=null&&c)for(var r of c(t))e.indexOf(r)<0&&g.call(t,r)&&(a[r]=t[r]);return a};import{af as b,j as p,F as v,r as S,J as F,aE as P}from"./vendor.61d82d8d.js";/* empty css               */import{b as s}from"./index.cd67ad60.js";const R={getList(t){return s.post("/api/dict/list",t)},get(t){return s.get(`/api/dict/info/${t}`)},create(t){return s.post("/api/dict/insert",t)},update(t){return s.post("/api/dict/update",t)},remove(t){return s.get(`/api/dict/remove/${t}`)}},$={getList(t){return s.post("/api/dict/child/list",t)},get(t){return s.get(`/api/dict/child/info/${t}`)},create(t){return s.post("/api/dict/child/insert",t)},update(t){return s.post("/api/dict/child/update",t)},remove(t){return s.get(`/api/dict/child/remove/${t}`)}},l={};function x(t){const{dictCode:e,displayName:a}=t,r={dictCode:e,pageSize:100,pageNum:1};return(a==null?void 0:a.trim())&&(r.displayName=a),l[e]=l[e]||$.getList(r),l[e].then(i=>{var o;return(o=i.data.data)==null?void 0:o.list.map(n=>({label:n.displayName,value:n.dictValue}))})}function w(t){const{dictCode:e}=t;return b(async()=>x(t),{refreshDeps:[e]})}async function A({dictCode:t,value:e}){var r;return(r=(await x({dictCode:t})).find(i=>i.value===e))==null?void 0:r.label}function L({dictCode:t,value:e}){return b(async()=>!t||!e?"":A({dictCode:t,value:e}),{refreshDeps:[t,e]})}function q({dictCode:t,value:e}){const{data:a}=L({dictCode:t,value:e});return p(v,{children:a||"-"})}const z=t=>{const m=t,{dictCode:e,type:a}=m,r=D(m,["dictCode","type"]),[i,o]=S.exports.useState(),{data:n,loading:y}=w({dictCode:e,displayName:i});switch(a){case"radio":return p(P.Group,u(d({},r),{options:n,onChange:r.onChange}));case"select":default:return p(F,u(d({placeholder:"\u8BF7\u9009\u62E9",allowClear:!0},r),{loading:y,options:n}))}};export{q as D,z as a,$ as b,R as d,w as u};
