import{r,d as n,j as t,h as d,aT as b,t as o,aE as j,v as l,B as s,s as w,a as u,aU as D}from"./vendor.7897a533.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               */import{u as L}from"./index.80f47301.js";import{l as N}from"./index.701ebe05.js";import{s as c}from"./index.module.1bed7eb0.js";function F(){const e=L(N),[p,f]=r.exports.useState({accountType:"",isVerified:!0,verifiedTime:"",legalPersonName:"",certificateType:"",certificationNumber:"",enterpriseName:"",enterpriseCertificateType:"",organizationCode:""}),[g,x]=r.exports.useState(!0),[v,S]=r.exports.useState([]),[h,m]=r.exports.useState(!0),y=async()=>{const{data:a}=await u.get("/api/user/verified/enterprise").finally(()=>x(!1));f(a);const{data:i}=await u.get("/api/user/verified/authList").finally(()=>m(!1));S(i)};r.exports.useEffect(()=>{y()},[]);const T=t(D,{text:{rows:1}});return n("div",{className:c.verified,children:[t(d.Title,{heading:6,children:e["userSetting.verified.enterprise"]}),t(b,{className:c["verified-enterprise"],labelStyle:{textAlign:"right"},layout:"inline-horizontal",colon:"\uFF1A",column:3,data:Object.entries(p).map(([a,i])=>({label:e[`userSetting.verified.label.${a}`],value:g?T:typeof i=="boolean"?i?t(o,{color:"green",children:e["userSetting.value.verified"]}):t(o,{color:"red",children:e["userSetting.value.notVerified"]}):i}))}),t(d.Title,{heading:6,children:e["userSetting.verified.records"]}),t(j,{columns:[{title:e["userSetting.verified.authType"],dataIndex:"authType"},{title:e["userSetting.verified.authContent"],dataIndex:"authContent"},{title:e["userSetting.verified.authStatus"],dataIndex:"authStatus",render(a){return a?t(l,{status:"success",text:e["userSetting.verified.status.success"]}):t("span",{children:t(l,{status:"processing",text:e["userSetting.verified.status.waiting"]})})}},{title:e["userSetting.verified.createdTime"],dataIndex:"createdTime"},{title:e["userSetting.verified.operation"],headerCellStyle:{paddingLeft:"15px"},render:(a,i)=>i.authStatus?t(s,{type:"text",children:e["userSetting.verified.operation.view"]}):n(w,{children:[t(s,{type:"text",children:e["userSetting.verified.operation.view"]}),t(s,{type:"text",children:e["userSetting.verified.operation.revoke"]})]})}],data:v,loading:h})]})}export{F as default};
