import{u as s,d as t,j as l,h as u,A as m,ay as i,t as p,az as o,aA as c}from"./vendor.019c2987.js";/* empty css              *//* empty css               */import{u as d}from"./index.923f5d6c.js";import w from"./code-block.babb2b14.js";const h={"en-US":{"welcome.title.welcome":"Welcome","welcome.invite":"Arco Cli commands can be used to install materials from the material market, and we sincerely invite you to experience it.","welcome.usage":"Usage","welcome.step.title.pickup":"Select materials from the material market","welcome.step.title.install":"Install","welcome.step.title.result":"Result","welcome.step.content.pickup":"For example, if you want the workplace page of pro, you can get the package name of the material from the material details","welcome.step.content.install":"After getting the package name, you can install the material through the following command.","welcome.step.content.result":"Then, you get a workplace page easily.","welcome.title.material":"For more materials, please check the following link","welcome.link.material-pro":"ERP Admin material collection","welcome.link.material-all":"All materials"},"zh-CN":{"welcome.title.welcome":"\u6B22\u8FCE","welcome.invite":"\u901A\u8FC7 Arco Cli \u547D\u4EE4\u53EF\u4EE5\u5B89\u88C5\u7269\u6599\u5E02\u573A\u7684\u7269\u6599\uFF0C\u8BDA\u9080\u60A8\u4F53\u9A8C\u3002","welcome.usage":"\u4F7F\u7528\u65B9\u5F0F","welcome.step.title.pickup":"\u4ECE\u7269\u6599\u5E02\u573A\u9009\u62E9\u7269\u6599","welcome.step.title.install":"\u5B89\u88C5\u7269\u6599","welcome.step.title.result":"\u6210\u679C","welcome.step.content.pickup":"\u4F8B\u5982\u60A8\u770B\u4E2D\u4E86 pro \u7684 workplace \u9875\u9762\uFF0C\u53EF\u4EE5\u4ECE\u7269\u6599\u8BE6\u60C5\u4E2D\u83B7\u5F97\u8BE5\u7269\u6599\u7684\u5305\u540D","welcome.step.content.install":"\u5F97\u5230\u5305\u540D\u540E\uFF0C\u60A8\u5C31\u53EF\u4EE5\u901A\u8FC7\u5982\u4E0B\u547D\u4EE4\u5B89\u88C5\u8BE5\u7269\u6599","welcome.step.content.result":"\u8FD9\u6837\u60A8\u5C31\u80FD\u8F7B\u677E\u83B7\u5F97\u4E00\u4E2A workplace \u9875\u9762","welcome.title.material":"\u66F4\u591A\u7269\u6599\u8BF7\u67E5\u770B\u4EE5\u4E0B\u94FE\u63A5","welcome.link.material-pro":"\u901F\u8FD0\u5B9D - \u65B0\u4E00\u4EE3\u7535\u5546\u8D27\u4EE3\u5E73\u53F0","welcome.link.material-all":"\u6240\u6709\u7269\u6599"}};var E=h;const g="_header_1wdt2_1";var r={header:g};function C(){const e=d(E),a=s(n=>n.userInfo)||{};return t("div",{className:r.container,children:[t("div",{className:r.header,children:[l(u.Title,{heading:5,style:{marginTop:0},children:e["welcome.title.welcome"]}),t(u.Text,{type:"secondary",children:[a.name,", ",a.email]})]}),t("div",{children:[l(m,{type:"success",content:e["welcome.invite"]}),t(i,{style:{marginTop:20},title:e["welcome.usage"],children:[t(u.Title,{heading:6,style:{marginTop:0},children:["1. ",e["welcome.step.title.pickup"]]}),t(u.Text,{children:[e["welcome.step.content.pickup"],l(p,{style:{marginLeft:8},children:"@arco-design/pro-pages-workplace"})]}),t(u.Title,{heading:6,children:["2. ",e["welcome.step.title.install"]]}),l(u.Text,{children:e["welcome.step.content.install"]}),l(w,{code:"arco block use @arco-design/pro-pages-workplace"}),t(u.Title,{heading:6,style:{marginTop:0},children:["3. ",e["welcome.step.title.result"]]}),l(u.Text,{children:e["welcome.step.content.result"]})]}),t(i,{style:{marginTop:20},children:[l(u.Text,{children:e["welcome.title.material"]}),l("div",{style:{marginTop:8},children:t(o,{target:"_blank",href:"https://arco.design/material?category=arco-design-pro",children:[e["welcome.link.material-pro"]," ",l(c,{})]})}),l("div",{style:{marginTop:8},children:t(o,{target:"_blank",href:"https://arco.design/material",children:[e["welcome.link.material-all"]," ",l(c,{})]})})]})]})]})}export{C as default};