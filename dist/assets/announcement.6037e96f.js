import{r as n,u,a as r,j as t,aG as d}from"./index.150f61d2.js";import{T as f}from"./index.0950d4c9.js";import{S as h}from"./index.a3a14b5f.js";import{C as y}from"./index.506db198.js";import{L as k}from"./index.72f89853.js";import{a as g}from"./axios.3a03232d.js";import{i as x}from"./index.9464998a.js";const w="_item_1h3pz_1",_="_link_1h3pz_8";var s={item:w,link:_};function z(){const[i,c]=n.exports.useState([]),[l,o]=n.exports.useState(!0),a=u(x),m=()=>{o(!0),g.get("/api/workplace/announcement").then(e=>{c(e.data)}).finally(()=>{o(!1)})};n.exports.useEffect(()=>{m()},[]);function p(e){switch(e){case"activity":return"orangered";case"info":return"cyan";case"notice":return"arcoblue";default:return"arcoblue"}}return r(y,{children:[r("div",{style:{display:"flex",justifyContent:"space-between"},children:[t(d.Title,{heading:6,children:a["workplace.announcement"]}),t(k,{children:a["workplace.seeMore"]})]}),t(h,{loading:l,text:{rows:5,width:"100%"},animation:!0,children:t("div",{children:i.map(e=>r("div",{className:s.item,children:[t(f,{color:p(e.type),size:"small",children:a[`workplace.${e.type}`]}),t("span",{className:s.link,children:e.content})]},e.key))})})]})}export{z as default};
