import{av as e,u as i,r as c,d as p,j as r,ax as s,G as u}from"./vendor.7897a533.js";/* empty css               */import{u as f}from"./index.80f47301.js";import{l}from"./index.f672973e.js";import x from"./header.54ba4671.js";import y from"./info.f340d54c.js";import{s as E}from"./setupMock.250c3137.js";/* empty css              *//* empty css               *//* empty css               *//* empty css              */E({setup:()=>{e.mock(new RegExp("/api/user/saveInfo"),()=>"ok"),e.mock(new RegExp("/api/user/verified/enterprise"),()=>e.mock({accountType:"\u4F01\u4E1A\u8D26\u53F7",isVerified:!0,verifiedTime:e.Random.datetime("yyyy-MM-dd HH:mm:ss"),legalPersonName:e.Random.cfirst()+"**",certificateType:"\u4E2D\u56FD\u8EAB\u4EFD\u8BC1",certificationNumber:/[1-9]{3}[*]{12}[0-9]{3}/,enterpriseName:e.Random.ctitle(),enterpriseCertificateType:"\u4F01\u4E1A\u8425\u4E1A\u6267\u7167",organizationCode:/[1-9]{1}[*]{7}[0-9]{1}/})),e.mock(new RegExp("/api/user/verified/authList"),()=>new Array(3).fill("0").map(()=>({authType:"\u4F01\u4E1A\u8BC1\u4EF6\u8BA4\u8BC1",authContent:`\u4F01\u4E1A\u8BC1\u4EF6\u8BA4\u8BC1\uFF0C\u6CD5\u4EBA\u59D3\u540D${e.Random.cfirst()}**`,authStatus:e.Random.natural(0,1),createdTime:e.Random.datetime("yyyy-MM-dd HH:mm:ss")})))}});function k(){f(l);const o=i(t=>t.userInfo),a=i(t=>t.userLoading),n=i(t=>t.editPassword),[d,m]=c.exports.useState("basic");return p("div",{children:[r(s,{style:{padding:"14px 20px"},children:r(x,{userInfo:o,loading:a})}),n&&r(s,{style:{marginTop:"16px"},children:r(u,{activeTab:d,onChange:m,type:"rounded",children:r(u.TabPane,{title:"\u4FEE\u6539\u5BC6\u7801",children:r(y,{loading:a})},"basic")})})]})}export{k as default};
