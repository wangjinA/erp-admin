import{u as m,r as b,j as t,b as e,aC as o,aq as d,aE as g,p as F,i as y,aF as B,a as j}from"./vendor.bb408984.js";/* empty css              *//* empty css               */import{u as C}from"./index.2043ebfc.js";import A from"./header.71b6ac91.js";import{s as n}from"./index.module.fd3800a2.js";import{s as h,M as a}from"./setupMock.df9c0205.js";import x from"./my-projects.7e1c1964.js";import I from"./my-team.103c95f8.js";import v from"./latest-news.1b2577b8.js";import"./project.9bf24075.js";import"./entrepot.7377f9af.js";import"./index.055835f8.js";import"./index.9d4791ac.js";/* empty css               */import"./index.aedfa0dd.js";import"./shopStore.cb49cab0.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.5a88c625.js";/* empty css               */import"./index.68a41d33.js";import"./index.1ac1b297.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";const D={"en-US":{"menu.user":"Personal Center","menu.user.info":"User Center","userInfo.title.project":"My project","userInfo.title.news":"Latest News","userInfo.title.team":"My team","userInfo.title.notice":"In-site Notification","userInfo.btn.more":"More","userInfo.btn.all":"All","userInfo.notice.empty":"No Data"},"zh-CN":{"menu.user":"\u4E2A\u4EBA\u4E2D\u5FC3","menu.user.info":"\u7528\u6237\u4E2D\u5FC3","userInfo.title.project":"\u6211\u7684\u9879\u76EE","userInfo.title.news":"\u6700\u65B0\u52A8\u6001","userInfo.title.team":"\u6211\u7684\u56E2\u961F","userInfo.title.notice":"\u7AD9\u5185\u901A\u77E5","userInfo.btn.more":"\u67E5\u770B\u66F4\u591A","userInfo.btn.all":"\u67E5\u770B\u5168\u90E8","userInfo.notice.empty":"\u6682\u65E0\u6570\u636E"}};h({setup:()=>{a.mock(new RegExp("/api/user/projectList"),()=>{const u=[{name:"\u79E6\u81FB\u5B87",email:"qingzhenyu@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u4E8E\u6D9B",email:"yuebao@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u5B81\u6CE2",email:"ningbo@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u90D1\u66E6\u6708",email:"zhengxiyue@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u5B81\u6CE2",email:"ningbo@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"}];return new Array(6).fill(null).map((i,r)=>({id:r,enTitle:["Arco Design System","The Volcano Engine","OCR text recognition","Content resource management","Toutiao content management","Intelligent Robot Project"][r],title:["\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u8BBE\u8BA1\u7CFB\u7EDF","\u706B\u5C71\u5F15\u64CE\u667A\u80FD\u5E94\u7528","OCR\u6587\u672C\u8BC6\u522B","\u5185\u5BB9\u8D44\u6E90\u7BA1\u7406","\u4ECA\u65E5\u5934\u6761\u5185\u5BB9\u7BA1\u7406","\u667A\u80FD\u673A\u5668\u4EBA"][r],contributors:u,contributorsLength:a.Random.natural(5,100)}))}),a.mock(new RegExp("/api/users/teamList"),()=>new Array(4).fill(null).map((u,i)=>({name:["\u706B\u5C71\u5F15\u64CE\u667A\u80FD\u5E94\u7528\u56E2\u961F","\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u8BBE\u8BA1\u56E2\u961F","\u524D\u7AEF/UE\u5C0F\u5206\u961F","\u5185\u5BB9\u8BC6\u522B\u63D2\u4EF6\u5C0F\u5206\u961F"][i],avatar:["//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"][i],members:a.Random.natural(1,1e3)}))),a.mock(new RegExp("/api/user/latestNews"),()=>new Array(8).fill(null).map((u,i)=>({id:i,title:"\u738B\u591A\u9C7C\u5BA1\u6838\u4E86\u56FE\u6587\u5185\u5BB9\uFF1A 2021\u5E74\uFF0C\u4F60\u8FC7\u5F97\u600E\u4E48\u6837\uFF1F",description:"\u65B0\u534E\u7F51\u5E74\u7EC8\u7279\u522B\u7B56\u5212\uFF1A\u300A\u8FD9\u4E00\u5E74\uFF0C\u4F60\u8FC7\u5F97\u600E\u4E48\u6837\uFF1F\u300B\u56DE\u8BBF\u90A3\u4E9B\u4F60\u6700\u719F\u6089\u7684\u201C\u964C\u751F\u4EBA\u201D\u5E26\u4F60\u91CD\u6E29\u8FD9\u96BE\u5FD8\u76842021\u5E74\u56DE\u987E\u6211\u4EEC\u5171\u540C\u8BB0\u5FC6\u4E2D\u7684\u751F\u52A8\u6545\u4E8B\uFF01",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"}))),a.mock(new RegExp("/api/user/notice"),()=>[])}});const{Title:s}=y,{Row:f,Col:p}=B;function ie(){const u=C(D),i=m(c=>c.userInfo),r=m(c=>c.userLoading),[E,l]=b.exports.useState(!1),w=async()=>{l(!0),await j.get("/api/user/notice").finally(()=>l(!1))};return b.exports.useEffect(()=>{w()},[]),t("div",{children:[e(A,{userInfo:i,loading:r}),t(f,{gutter:16,children:[e(p,{span:16,children:t(o,{className:n.wrapper,children:[t("div",{className:n["card-title-wrapper"],children:[e(s,{heading:6,style:{marginBottom:"20px"},children:u["userInfo.title.project"]}),e(d,{children:u["userInfo.btn.more"]})]}),e(x,{})]})}),e(p,{span:8,children:t(o,{className:n.wrapper,children:[e("div",{className:n["card-title-wrapper"],children:e(s,{heading:6,style:{marginBottom:"12px"},children:u["userInfo.title.team"]})}),e(I,{})]})})]}),t(f,{gutter:16,children:[e(p,{span:16,children:t(o,{className:n.wrapper,children:[t("div",{className:n["card-title-wrapper"],children:[e(s,{heading:6,style:{marginBottom:"8px"},children:u["userInfo.title.news"]}),e(d,{children:u["userInfo.btn.all"]})]}),e(v,{})]})}),e(p,{span:8,children:t(o,{className:n.wrapper,children:[e("div",{className:n["card-title-wrapper"],children:e(s,{heading:6,children:u["userInfo.title.notice"]})}),E?e(g,{text:{rows:10},animation:!0}):e(F,{status:"404",subTitle:u["userInfo.notice.empty"],style:{paddingTop:"60px",paddingBottom:"130px"}})]})})]})]})}export{ie as default};
