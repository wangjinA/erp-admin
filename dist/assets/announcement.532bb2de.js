import{r as n,d as s,ax as u,j as t,i as m,ay as f,aT as h,q as x,a as y}from"./vendor.ad15203e.js";/* empty css               *//* empty css               *//* empty css              */import{u as k}from"./index.a07d4460.js";import{i as j}from"./index.953fdb56.js";const g="_item_17fky_1",w="_link_17fky_8";var r={item:g,link:w};function S(){const[o,c]=n.exports.useState([]),[l,i]=n.exports.useState(!0),a=k(j),d=()=>{i(!0),y.get("/api/workplace/announcement").then(e=>{c(e.data)}).finally(()=>{i(!1)})};n.exports.useEffect(()=>{d()},[]);function p(e){switch(e){case"activity":return"orangered";case"info":return"cyan";case"notice":return"arcoblue";default:return"arcoblue"}}return s(u,{children:[s("div",{style:{display:"flex",justifyContent:"space-between"},children:[t(m.Title,{heading:6,children:a["workplace.announcement"]}),t(f,{children:a["workplace.seeMore"]})]}),t(h,{loading:l,text:{rows:5,width:"100%"},animation:!0,children:t("div",{children:o.map(e=>s("div",{className:r.item,children:[t(x,{color:p(e.type),size:"small",children:a[`workplace.${e.type}`]}),t("span",{className:r.link,children:e.content})]},e.key))})})]})}export{S as default};
