var u=Object.defineProperty,i=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var a=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,f=Object.prototype.propertyIsEnumerable;var h=(t,e,r)=>e in t?u(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,o=(t,e)=>{for(var r in e||(e={}))g.call(e,r)&&h(t,r,e[r]);if(a)for(var r of a(e))f.call(e,r)&&h(t,r,e[r]);return t},n=(t,e)=>i(t,k(e));import{l as m}from"./index.de87991c.js";import{u as l,r as c}from"./vendor.7483067a.js";const p=m.getTheme("dark");m.registerTheme("darkTheme",n(o({},p),{background:"transparent"}));function N(){const t=l(s=>s.theme),e=t==="dark"?"darkTheme":"light",[r,d]=c.exports.useState(m.getTheme(e));return c.exports.useEffect(()=>{const s=t==="dark"?"darkTheme":"light",T=m.getTheme(s);d(T)},[t]),r}export{N as u};
