import{r as n,d as s,ay as u,j as t,h as m,az as f,aT as h,t as y,a as x}from"./vendor.019c2987.js";/* empty css               *//* empty css               *//* empty css              */import{u as k}from"./index.923f5d6c.js";import{i as j}from"./index.953fdb56.js";const g="_item_17fky_1",w="_link_17fky_8";var r={item:g,link:w};function S(){const[o,c]=n.exports.useState([]),[l,i]=n.exports.useState(!0),a=k(j),d=()=>{i(!0),x.get("/api/workplace/announcement").then(e=>{c(e.data)}).finally(()=>{i(!1)})};n.exports.useEffect(()=>{d()},[]);function p(e){switch(e){case"activity":return"orangered";case"info":return"cyan";case"notice":return"arcoblue";default:return"arcoblue"}}return s(u,{children:[s("div",{style:{display:"flex",justifyContent:"space-between"},children:[t(m.Title,{heading:6,children:a["workplace.announcement"]}),t(f,{children:a["workplace.seeMore"]})]}),t(h,{loading:l,text:{rows:5,width:"100%"},animation:!0,children:t("div",{children:o.map(e=>s("div",{className:r.item,children:[t(y,{color:p(e.type),size:"small",children:a[`workplace.${e.type}`]}),t("span",{className:r.link,children:e.content})]},e.key))})})]})}export{S as default};
