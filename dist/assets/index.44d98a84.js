import{u as d,j as t,d as s,p as o}from"./vendor.ad15203e.js";import c from"./chat-panel.609c4ac7.js";import n from"./studio.2f77cf08.js";import u from"./data-statistic.7a1f9f0b.js";import m from"./studio-status.dc4306ab.js";import l from"./quick-operation.e13b05c7.js";import p from"./studio-information.00b05408.js";import{s as i}from"./index.module.24813742.js";import{s as f,M as a}from"./setupMock.2a090785.js";import"./index.a07d4460.js";import"./index.3e071dc9.js";import"./index.e00a11fd.js";import"./item.e96c1d6c.js";/* empty css               *//* empty css               */import"./data-statistic-list.3b489d7e.js";/* empty css               *//* empty css               */f({setup:()=>{a.mock(new RegExp("/api/chatList"),()=>a.mock({"data|4-6":[{"id|+1":1,username:"\u7528\u62377352772",content:"\u9A6C\u4E0A\u5C31\u5F00\u59CB\u4E86\uFF0C\u597D\u6FC0\u52A8\uFF01",time:"13:09:12","isCollect|2":!0}]}).data)}});function D(){const e=d(r=>r.userInfo);return t("div",{children:s("div",{className:i.layout,children:[t("div",{className:i["layout-left-side"],children:t(c,{})}),t("div",{className:i["layout-content"],children:s(o,{size:16,direction:"vertical",style:{width:"100%"},children:[t(n,{userInfo:e}),t(u,{})]})}),t("div",{className:i["layout-right-side"],children:s(o,{size:16,direction:"vertical",style:{width:"100%"},children:[t(m,{}),t(l,{}),t(p,{})]})})]})})}export{D as default};
