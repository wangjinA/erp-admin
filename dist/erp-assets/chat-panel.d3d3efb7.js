import{u,r as i,j as t,a as e,c as g,n as o,a3 as r,ak as n,B as c,S as y,v as x}from"./index.70dbfa87.js";import{l as S}from"./index.7c38f5ff.js";import L from"./index.cd77ddaa.js";import{s}from"./index.module.2efb2bc0.js";import{I as v}from"./index.7da24610.js";import{I}from"./index.42503734.js";import"./item.e93c5b3c.js";import"./index.66b13c82.js";function F(){const a=u(S),[h,p]=i.exports.useState([]),[d,l]=i.exports.useState(!1);function m(){l(!0),x.get("/api/chatList").then(f=>{p(f.data||[])}).finally(()=>{l(!1)})}return i.exports.useEffect(()=>{m()},[]),t("div",{className:s["chat-panel"],children:[t("div",{className:s["chat-panel-header"],children:[e(g.Title,{style:{marginTop:0,marginBottom:16},heading:6,children:a["monitor.title.chatPanel"]}),t(o,{size:8,children:[e(r,{style:{width:80},defaultValue:"all",children:e(r.Option,{value:"all",children:a["monitor.chat.options.all"]})}),e(n.Search,{placeholder:a["monitor.chat.placeholder.searchCategory"]}),e(c,{type:"text",iconOnly:!0,children:e(v,{})})]})]}),e("div",{className:s["chat-panel-content"],children:e(y,{loading:d,style:{width:"100%"},children:e(L,{data:h})})}),e("div",{className:s["chat-panel-footer"],children:t(o,{size:8,children:[e(n,{suffix:e(I,{})}),e(c,{type:"primary",children:a["monitor.chat.update"]})]})})]})}export{F as default};
