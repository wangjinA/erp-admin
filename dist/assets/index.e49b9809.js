var u=Object.defineProperty,j=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var t=Object.getOwnPropertySymbols;var c=Object.prototype.hasOwnProperty,d=Object.prototype.propertyIsEnumerable;var m=(e,o,s)=>o in e?u(e,o,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[o]=s,l=(e,o)=>{for(var s in o||(o={}))c.call(o,s)&&m(e,s,o[s]);if(t)for(var s of t(o))d.call(o,s)&&m(e,s,o[s]);return e},f=(e,o)=>j(e,x(o));var p=(e,o)=>{var s={};for(var r in e)c.call(e,r)&&o.indexOf(r)<0&&(s[r]=e[r]);if(e!=null&&t)for(var r of t(e))o.indexOf(r)<0&&d.call(e,r)&&(s[r]=e[r]);return s};import{j as n,L as b,c as h,r as N,b as a}from"./vendor.1997470e.js";import{R as v}from"./index.a9c28d0b.js";import g from"./form.ae0cba9f.js";import F from"./banner.6ecede7f.js";import{s as i}from"./index.module.ddb54cb0.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css               */import"./index.224556eb.js";/* empty css              */const L="_footer_1si67_1";var y={footer:L};function P(e={}){const r=e,{className:o}=r,s=p(r,["className"]);return n(b.Footer,f(l({className:h(y.footer,o)},s),{children:"\u901F\u8FD0\u5B9D\u6280\u672F\u652F\u6301"}))}function R(){return N.exports.useEffect(()=>{document.body.setAttribute("arco-theme","light")},[]),a("div",{className:i.container,children:[a("div",{className:i.logo,children:[n(v,{}),n("div",{className:i["logo-text"],children:"ERP Admin"})]}),n("div",{className:i.banner,children:n("div",{className:i["banner-inner"],children:n(F,{})})}),a("div",{className:i.content,children:[n("div",{className:i["content-inner"],children:n(g,{})}),n("div",{className:i.footer,children:n(P,{})})]})]})}R.displayName="LoginPage";export{R as default};
