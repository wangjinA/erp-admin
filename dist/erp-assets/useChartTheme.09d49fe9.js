var u=Object.defineProperty,i=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,g=Object.prototype.propertyIsEnumerable;var h=(t,e,r)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,o=(t,e)=>{for(var r in e||(e={}))f.call(e,r)&&h(t,r,e[r]);if(a)for(var r of a(e))g.call(e,r)&&h(t,r,e[r]);return t},n=(t,e)=>i(t,k(e));import{l as m}from"./index.f81d65d0.js";import{u as b,r as d}from"./vendor.bb408984.js";const l=m.getTheme("dark");m.registerTheme("darkTheme",n(o({},l),{background:"transparent"}));function N(){const t=b(s=>s.theme),e=t==="dark"?"darkTheme":"light",[r,c]=d.exports.useState(m.getTheme(e));return d.exports.useEffect(()=>{const s=t==="dark"?"darkTheme":"light",T=m.getTheme(s);c(T)},[t]),r}export{N as u};
