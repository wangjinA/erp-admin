import{b as m,a as t,j as o,n as e}from"./index.75d3eb21.js";import u from"./chat-panel.24fb031f.js";import c from"./studio.4a89953b.js";import n from"./data-statistic.3e581642.js";import p from"./studio-status.4851d2b3.js";import d from"./quick-operation.1d98d406.js";import l from"./studio-information.e0356397.js";import{s as i}from"./index.module.4d6794e0.js";import{s as f,M as a}from"./setupMock.446438b5.js";import"./index.31f8279f.js";import"./index.297754f4.js";import"./item.3fef2bcd.js";import"./index.90b412d7.js";import"./index.64417e62.js";import"./index.b034cb05.js";import"./index.6700d9e8.js";import"./index.09a57cf0.js";import"./data-statistic-list.cca85a46.js";import"./index.77a39af4.js";import"./b-tween.es.1edf7b52.js";import"./index.cf6d6a5b.js";import"./index.8046b3c9.js";f({setup:()=>{a.mock(new RegExp("/api/chatList"),()=>a.mock({"data|4-6":[{"id|+1":1,username:"\u7528\u62377352772",content:"\u9A6C\u4E0A\u5C31\u5F00\u59CB\u4E86\uFF0C\u597D\u6FC0\u52A8\uFF01",time:"13:09:12","isCollect|2":!0}]}).data)}});function P(){const r=m(s=>s.userInfo);return t("div",{children:o("div",{className:i.layout,children:[t("div",{className:i["layout-left-side"],children:t(u,{})}),t("div",{className:i["layout-content"],children:o(e,{size:16,direction:"vertical",style:{width:"100%"},children:[t(c,{userInfo:r}),t(n,{})]})}),t("div",{className:i["layout-right-side"],children:o(e,{size:16,direction:"vertical",style:{width:"100%"},children:[t(p,{}),t(d,{}),t(l,{})]})})]})})}export{P as default};
