import{r as i,d as t,j as e,i as u,q as n,J as o,aj as c,B as r,a$ as x,z as g,b0 as y,a as j}from"./vendor.446b4cc8.js";import{u as L}from"./index.fde44074.js";import{l as S}from"./index.3e071dc9.js";import v from"./index.4547451d.js";import{s}from"./index.module.24813742.js";import"./item.fd9c895c.js";function T(){const a=L(S),[d,h]=i.exports.useState([]),[p,l]=i.exports.useState(!1);function m(){l(!0),j.get("/api/chatList").then(f=>{h(f.data||[])}).finally(()=>{l(!1)})}return i.exports.useEffect(()=>{m()},[]),t("div",{className:s["chat-panel"],children:[t("div",{className:s["chat-panel-header"],children:[e(u.Title,{style:{marginTop:0,marginBottom:16},heading:6,children:a["monitor.title.chatPanel"]}),t(n,{size:8,children:[e(o,{style:{width:80},defaultValue:"all",children:e(o.Option,{value:"all",children:a["monitor.chat.options.all"]})}),e(c.Search,{placeholder:a["monitor.chat.placeholder.searchCategory"]}),e(r,{type:"text",iconOnly:!0,children:e(x,{})})]})]}),e("div",{className:s["chat-panel-content"],children:e(g,{loading:p,style:{width:"100%"},children:e(v,{data:d})})}),e("div",{className:s["chat-panel-footer"],children:t(n,{size:8,children:[e(c,{suffix:e(y,{})}),e(r,{type:"primary",children:a["monitor.chat.update"]})]})})]})}export{T as default};