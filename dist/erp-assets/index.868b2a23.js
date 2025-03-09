import{u as g,b as m,r as b,j as t,a as e,L as d,bv as F,c as y,G as B,v as C}from"./index.70dbfa87.js";import{C as a}from"./index.cdb98767.js";import{S as A}from"./index.4cc90dfe.js";import h from"./header.0008d0aa.js";import{s as n}from"./index.module.249dbb66.js";import{s as I,M as i}from"./setupMock.e9d90baf.js";import v from"./my-projects.b3b6cf51.js";import D from"./my-team.6c2fc444.js";import N from"./latest-news.c9a7a21c.js";import"./index.d28ba70a.js";import"./project.46c1656f.js";import"./entrepot.ab30483f.js";import"./index.e8394b68.js";import"./index.f17798d6.js";import"./index.799a4304.js";import"./index.069ead7c.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.503ba2ce.js";import"./index.1719ed03.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./index.dfe0a253.js";import"./schema.06835865.js";const x={"en-US":{"menu.user":"Personal Center","menu.user.info":"User Center","userInfo.title.project":"My project","userInfo.title.news":"Latest News","userInfo.title.team":"My team","userInfo.title.notice":"In-site Notification","userInfo.btn.more":"More","userInfo.btn.all":"All","userInfo.notice.empty":"No Data"},"zh-CN":{"menu.user":"\u4E2A\u4EBA\u4E2D\u5FC3","menu.user.info":"\u7528\u6237\u4E2D\u5FC3","userInfo.title.project":"\u6211\u7684\u9879\u76EE","userInfo.title.news":"\u6700\u65B0\u52A8\u6001","userInfo.title.team":"\u6211\u7684\u56E2\u961F","userInfo.title.notice":"\u7AD9\u5185\u901A\u77E5","userInfo.btn.more":"\u67E5\u770B\u66F4\u591A","userInfo.btn.all":"\u67E5\u770B\u5168\u90E8","userInfo.notice.empty":"\u6682\u65E0\u6570\u636E"}};I({setup:()=>{i.mock(new RegExp("/api/user/projectList"),()=>{const u=[{name:"\u79E6\u81FB\u5B87",email:"qingzhenyu@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u4E8E\u6D9B",email:"yuebao@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u5B81\u6CE2",email:"ningbo@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u90D1\u66E6\u6708",email:"zhengxiyue@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"},{name:"\u5B81\u6CE2",email:"ningbo@arco.design",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"}];return new Array(6).fill(null).map((r,o)=>({id:o,enTitle:["Arco Design System","The Volcano Engine","OCR text recognition","Content resource management","Toutiao content management","Intelligent Robot Project"][o],title:["\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u8BBE\u8BA1\u7CFB\u7EDF","\u706B\u5C71\u5F15\u64CE\u667A\u80FD\u5E94\u7528","OCR\u6587\u672C\u8BC6\u522B","\u5185\u5BB9\u8D44\u6E90\u7BA1\u7406","\u4ECA\u65E5\u5934\u6761\u5185\u5BB9\u7BA1\u7406","\u667A\u80FD\u673A\u5668\u4EBA"][o],contributors:u,contributorsLength:i.Random.natural(5,100)}))}),i.mock(new RegExp("/api/users/teamList"),()=>new Array(4).fill(null).map((u,r)=>({name:["\u706B\u5C71\u5F15\u64CE\u667A\u80FD\u5E94\u7528\u56E2\u961F","\u4F01\u4E1A\u7EA7\u4EA7\u54C1\u8BBE\u8BA1\u56E2\u961F","\u524D\u7AEF/UE\u5C0F\u5206\u961F","\u5185\u5BB9\u8BC6\u522B\u63D2\u4EF6\u5C0F\u5206\u961F"][r],avatar:["//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp","//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"][r],members:i.Random.natural(1,1e3)}))),i.mock(new RegExp("/api/user/latestNews"),()=>new Array(8).fill(null).map((u,r)=>({id:r,title:"\u738B\u591A\u9C7C\u5BA1\u6838\u4E86\u56FE\u6587\u5185\u5BB9\uFF1A 2021\u5E74\uFF0C\u4F60\u8FC7\u5F97\u600E\u4E48\u6837\uFF1F",description:"\u65B0\u534E\u7F51\u5E74\u7EC8\u7279\u522B\u7B56\u5212\uFF1A\u300A\u8FD9\u4E00\u5E74\uFF0C\u4F60\u8FC7\u5F97\u600E\u4E48\u6837\uFF1F\u300B\u56DE\u8BBF\u90A3\u4E9B\u4F60\u6700\u719F\u6089\u7684\u201C\u964C\u751F\u4EBA\u201D\u5E26\u4F60\u91CD\u6E29\u8FD9\u96BE\u5FD8\u76842021\u5E74\u56DE\u987E\u6211\u4EEC\u5171\u540C\u8BB0\u5FC6\u4E2D\u7684\u751F\u52A8\u6545\u4E8B\uFF01",avatar:"//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp"}))),i.mock(new RegExp("/api/user/notice"),()=>[])}});const{Title:p}=y,{Row:E,Col:s}=B;function pe(){const u=g(x),r=m(c=>c.userInfo),o=m(c=>c.userLoading),[f,l]=b.exports.useState(!1),w=async()=>{l(!0),await C.get("/api/user/notice").finally(()=>l(!1))};return b.exports.useEffect(()=>{w()},[]),t("div",{children:[e(h,{userInfo:r,loading:o}),t(E,{gutter:16,children:[e(s,{span:16,children:t(a,{className:n.wrapper,children:[t("div",{className:n["card-title-wrapper"],children:[e(p,{heading:6,style:{marginBottom:"20px"},children:u["userInfo.title.project"]}),e(d,{children:u["userInfo.btn.more"]})]}),e(v,{})]})}),e(s,{span:8,children:t(a,{className:n.wrapper,children:[e("div",{className:n["card-title-wrapper"],children:e(p,{heading:6,style:{marginBottom:"12px"},children:u["userInfo.title.team"]})}),e(D,{})]})})]}),t(E,{gutter:16,children:[e(s,{span:16,children:t(a,{className:n.wrapper,children:[t("div",{className:n["card-title-wrapper"],children:[e(p,{heading:6,style:{marginBottom:"8px"},children:u["userInfo.title.news"]}),e(d,{children:u["userInfo.btn.all"]})]}),e(N,{})]})}),e(s,{span:8,children:t(a,{className:n.wrapper,children:[e("div",{className:n["card-title-wrapper"],children:e(p,{heading:6,children:u["userInfo.title.notice"]})}),f?e(A,{text:{rows:10},animation:!0}):e(F,{status:"404",subTitle:u["userInfo.notice.empty"],style:{paddingTop:"60px",paddingBottom:"130px"}})]})})]})]})}export{pe as default};
