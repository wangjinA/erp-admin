import{u as n,r as c,b as a,j as i,af as u,ar as t}from"./vendor.1997470e.js";/* empty css                *//* empty css               */import{u as f}from"./index.a9c28d0b.js";import{l as x}from"./index.69444b8c.js";import j from"./header.60be5b0a.js";import l from"./info.96c9c7bf.js";import b from"./security.1cd3ae52.js";import{s as y,M as e}from"./setupMock.174193b9.js";import E from"./verified.82eb72fa.js";/* empty css               *//* empty css                *//* empty css               *//* empty css                *//* empty css              *//* empty css                *//* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css               */import"./index.module.ba15ba1a.js";/* empty css                *//* empty css                *//* empty css                *//* empty css                */import"./index.224556eb.js";y({setup:()=>{e.mock(new RegExp("/api/user/saveInfo"),()=>"ok"),e.mock(new RegExp("/api/user/verified/enterprise"),()=>e.mock({accountType:"\u4F01\u4E1A\u8D26\u53F7",isVerified:!0,verifiedTime:e.Random.datetime("yyyy-MM-dd HH:mm:ss"),legalPersonName:e.Random.cfirst()+"**",certificateType:"\u4E2D\u56FD\u8EAB\u4EFD\u8BC1",certificationNumber:/[1-9]{3}[*]{12}[0-9]{3}/,enterpriseName:e.Random.ctitle(),enterpriseCertificateType:"\u4F01\u4E1A\u8425\u4E1A\u6267\u7167",organizationCode:/[1-9]{1}[*]{7}[0-9]{1}/})),e.mock(new RegExp("/api/user/verified/authList"),()=>new Array(3).fill("0").map(()=>({authType:"\u4F01\u4E1A\u8BC1\u4EF6\u8BA4\u8BC1",authContent:`\u4F01\u4E1A\u8BC1\u4EF6\u8BA4\u8BC1\uFF0C\u6CD5\u4EBA\u59D3\u540D${e.Random.cfirst()}**`,authStatus:e.Random.natural(0,1),createdTime:e.Random.datetime("yyyy-MM-dd HH:mm:ss")})))}});function O(){const r=f(x),d=n(s=>s.userInfo),o=n(s=>s.userLoading),[m,p]=c.exports.useState("basic");return a("div",{children:[i(u,{style:{padding:"14px 20px"},children:i(j,{userInfo:d,loading:o})}),i(u,{style:{marginTop:"16px"},children:a(t,{activeTab:m,onChange:p,type:"rounded",children:[i(t.TabPane,{title:r["userSetting.title.basicInfo"],children:i(l,{loading:o})},"basic"),i(t.TabPane,{title:r["userSetting.title.security"],children:i(b,{})},"security"),i(t.TabPane,{title:r["userSetting.label.verified"],children:i(E,{})},"verified")]})})]})}export{O as default};
