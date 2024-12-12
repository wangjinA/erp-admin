import{r as B,ai as t,j as r,d as u,ax as b,bp as l,aj as a,J as d,aK as A,bq as I,S as C,p as y,B as o,o as g,i as q}from"./vendor.ad15203e.js";/* empty css               *//* empty css              *//* empty css              *//* empty css               */import{u as v}from"./index.a07d4460.js";const x={"en-US":{"menu.form":"Form","menu.form.step":"Step Form","stepForm.title":"Create a channel form","stepForm.next":"Next","stepForm.prev":"Prev","stepForm.title.basicInfo":"Basic Information","stepForm.desc.basicInfo":"Create event channel","stepForm.title.channel":"Channel Information","stepForm.desc.channel":"Enter detailed channel content","stepForm.title.created":"Complete creation","stepForm.desc.created":"Created successfully","stepForm.basicInfo.name":"Event name","stepForm.basicInfo.name.required":"Please enter the event name","stepForm.basicInfo.name.placeholder":"Enter Chinese characters, letters or numbers, up to 20 characters","stepForm.basicInfo.channelType":"Channel Type","stepForm.basicInfo.channelType.required":"Please select the channel type","stepForm.basicInfo.time":"Promotion time","stepForm.basicInfo.time.required":"Please select the promotion time","stepForm.basicInfo.link":"Promotion URL","stepForm.basicInfo.link.placeholder":"Please enter the promotion page address","stepForm.basicInfo.link.tips":"Such as Android or iOS download address, intermediate redirect URL, the URL must start with http:// or https://","stepForm.channel.source":"Advertising source","stepForm.channel.source.required":"Please enter the advertising source","stepForm.channel.source.placeholder":"Referral address: sohu, sina","stepForm.channel.media":"Advertising medium","stepForm.channel.media.required":"Please enter the advertising medium","stepForm.channel.media.placeholder":"Marketing media: cpc, bannner, edm","stepForm.channel.keywords":"Key words","stepForm.channel.remind":"Push reminder","stepForm.channel.content":"Advertising content","stepForm.channel.content.required":"Please enter the advertising content","stepForm.channel.content.placeholder":"Please enter the description of the advertisement content, no more than 200 words","stepForm.created.success.title":"Created successfully","stepForm.created.success.desc":"Form created successfully","stepForm.created.success.view":"View form","stepForm.created.success.again":"Create again","stepForm.created.extra.title":"Channel form description","stepForm.created.extra.desc":"Advertiser channel promotion supports the tracking of users who place ads on third-party advertisers to download App users, such as launching App download advertisements on Toutiao channels, and tracking users who activate App by downloading on channels. ","stepForm.created.extra.detail":"Details"},"zh-CN":{"menu.form":"\u8868\u5355\u9875","menu.form.step":"\u5206\u5E03\u8868\u5355","stepForm.title":"\u521B\u5EFA\u6E20\u9053\u8868\u5355","stepForm.next":"\u4E0B\u4E00\u6B65","stepForm.prev":"\u4E0A\u4E00\u6B65","stepForm.title.basicInfo":"\u57FA\u672C\u4FE1\u606F","stepForm.desc.basicInfo":"\u521B\u5EFA\u6D3B\u52A8\u6E20\u9053","stepForm.title.channel":"\u8F93\u5165\u6E20\u9053\u4FE1\u606F","stepForm.desc.channel":"\u8F93\u5165\u8BE6\u7EC6\u7684\u6E20\u9053\u5185\u5BB9","stepForm.title.created":"\u5B8C\u6210\u521B\u5EFA","stepForm.desc.created":"\u521B\u5EFA\u6210\u529F","stepForm.basicInfo.name":"\u6D3B\u52A8\u540D\u79F0","stepForm.basicInfo.name.required":"\u8BF7\u8F93\u5165\u6D3B\u52A8\u540D\u79F0","stepForm.basicInfo.name.placeholder":"\u8F93\u5165\u6C49\u5B57\u3001\u5B57\u6BCD\u6216\u6570\u5B57\uFF0C\u6700\u591A20\u5B57\u7B26","stepForm.basicInfo.channelType":"\u6E20\u9053\u7C7B\u578B","stepForm.basicInfo.channelType.required":"\u8BF7\u9009\u62E9\u6E20\u9053\u7C7B\u578B","stepForm.basicInfo.time":"\u63A8\u5E7F\u65F6\u95F4","stepForm.basicInfo.time.required":"\u8BF7\u9009\u62E9\u63A8\u5E7F\u65F6\u95F4","stepForm.basicInfo.link":"\u63A8\u5E7F\u5730\u5740","stepForm.basicInfo.link.placeholder":"\u8BF7\u8F93\u5165\u63A8\u5E7F\u9875\u9762\u5730\u5740","stepForm.basicInfo.link.tips":"\u5982 Android \u6216 iOS \u7684\u4E0B\u8F7D\u5730\u5740\u3001\u4E2D\u95F4\u8DF3\u8F6CURL\uFF0C\u7F51\u5740\u5FC5\u987B\u4EE5 http:// \u6216 https:// \u5F00\u5934","stepForm.channel.source":"\u5E7F\u544A\u6765\u6E90","stepForm.channel.source.required":"\u8BF7\u8F93\u5165\u5E7F\u544A\u6765\u6E90","stepForm.channel.source.placeholder":"\u5F15\u8350\u6765\u6E90\u5730\u5740\uFF1Asohu\u3001sina","stepForm.channel.media":"\u5E7F\u544A\u5A92\u4ECB","stepForm.channel.media.required":"\u8BF7\u8F93\u5165\u5E7F\u544A\u5A92\u4ECB","stepForm.channel.media.placeholder":"\u8425\u9500\u5A92\u4ECB\uFF1Acpc\u3001bannner\u3001edm","stepForm.channel.keywords":"\u5173\u952E\u8BCD","stepForm.channel.remind":"\u63A8\u9001\u63D0\u9192","stepForm.channel.content":"\u5E7F\u544A\u5185\u5BB9","stepForm.channel.content.required":"\u8BF7\u8F93\u5165\u5E7F\u544A\u5185\u5BB9","stepForm.channel.content.placeholder":"\u8BF7\u8F93\u5165\u5E7F\u544A\u5185\u5BB9\u4ECB\u7ECD\uFF0C\u6700\u591A\u4E0D\u8D85\u8FC7200\u5B57","stepForm.created.success.title":"\u521B\u5EFA\u6210\u529F","stepForm.created.success.desc":"\u8868\u5355\u521B\u5EFA\u6210\u529F","stepForm.created.success.view":"\u67E5\u770B\u8868\u5355","stepForm.created.success.again":"\u518D\u6B21\u521B\u5EFA","stepForm.created.extra.title":"\u6E20\u9053\u8868\u5355\u8BF4\u660E","stepForm.created.extra.desc":"\u5E7F\u544A\u5546\u6E20\u9053\u63A8\u5E7F\u652F\u6301\u8FFD\u8E2A\u5728\u7B2C\u4E09\u65B9\u5E7F\u544A\u5546\u6295\u653E\u5E7F\u544A\u4E0B\u8F7DApp\u7528\u6237\u7684\u573A\u666F\uFF0C\u4F8B\u5982\u5728\u4ECA\u65E5\u5934\u6761\u6E20\u9053\u6295\u653E\u4E0B\u8F7DApp\u5E7F\u544A\uFF0C\u8FFD\u8E2A\u901A\u8FC7\u5728\u6E20\u9053\u4E0B\u8F7D\u6FC0\u6D3BApp\u7684\u7528\u6237\u3002","stepForm.created.extra.detail":"\u67E5\u770B\u8BE6\u60C5"}},w="_container_12y57_1",k="_wrapper_12y57_7",D="_form_12y57_13";var m={container:w,wrapper:k,form:D,"form-extra":"_form-extra_12y57_19"};const{Title:p,Paragraph:P}=q;function L(){const e=v(x),[s,c]=B.exports.useState(1),[n]=t.useForm(),F=()=>{const i=n.getFields();n.setFields(i),c(1)},h=()=>{n.resetFields(),c(1)},E=async()=>{try{await n.validate(),c(s+1)}catch{}};return r("div",{className:m.container,children:u(b,{children:[r(p,{heading:5,children:e["stepForm.desc.basicInfo"]}),u("div",{className:m.wrapper,children:[u(l,{current:s,lineless:!0,children:[r(l.Step,{title:e["stepForm.title.basicInfo"],description:e["stepForm.desc.basicInfo"]}),r(l.Step,{title:e["stepForm.title.channel"],description:e["stepForm.desc.channel"]}),r(l.Step,{title:e["stepForm.title.created"],description:e["stepForm.desc.created"]})]}),u(t,{form:n,className:m.form,children:[s===1&&u(t.Item,{noStyle:!0,children:[r(t.Item,{label:e["stepForm.basicInfo.name"],required:!0,field:"basic.name",rules:[{required:!0,message:e["stepForm.basicInfo.name.required"]},{validator:(i,f)=>{/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(i)||f(e["stepForm.basicInfo.name.placeholder"])}}],children:r(a,{placeholder:e["stepForm.basicInfo.name.placeholder"]})}),r(t.Item,{label:e["stepForm.basicInfo.channelType"],required:!0,initialValue:"app",field:"basic.channelType",rules:[{required:!0,message:e["stepForm.basicInfo.channelType.required"]}],children:u(d,{children:[r(d.Option,{value:"app",children:"APP\u901A\u7528\u6E20\u9053"}),r(d.Option,{value:"site",children:"\u7F51\u9875\u901A\u7528\u6E20\u9053"}),r(d.Option,{value:"game",children:"\u6E38\u620F\u901A\u7528\u6E20\u9053"})]})}),r(t.Item,{label:e["stepForm.basicInfo.time"],required:!0,field:"basic.time",rules:[{required:!0,message:e["stepForm.basicInfo.time.required"]}],children:r(A.RangePicker,{style:{width:"100%"}})}),r(t.Item,{label:e["stepForm.basicInfo.link"],required:!0,extra:e["stepForm.basicInfo.link.tips"],field:"basic.link",initialValue:"https://arco.design",rules:[{required:!0}],children:r(a,{placeholder:e["stepForm.basicInfo.link.placeholder"]})})]}),s===2&&u(t.Item,{noStyle:!0,children:[r(t.Item,{label:e["stepForm.channel.source"],required:!0,field:"channel.source",rules:[{required:!0,message:e["stepForm.channel.source.required"]}],children:r(a,{placeholder:e["stepForm.channel.source.placeholder"]})}),r(t.Item,{label:e["stepForm.channel.media"],required:!0,field:"channel.media",rules:[{required:!0,message:e["stepForm.channel.media.required"]}],children:r(a,{placeholder:e["stepForm.channel.media.placeholder"]})}),r(t.Item,{label:e["stepForm.channel.keywords"],required:!0,field:"channel.keywords",initialValue:["\u4ECA\u65E5\u5934\u6761","\u706B\u5C71"],rules:[{required:!0}],children:r(I,{})}),r(t.Item,{label:e["stepForm.channel.remind"],required:!0,initialValue:!0,field:"channel.remind",triggerPropName:"checked",rules:[{required:!0}],children:r(C,{})}),r(t.Item,{label:e["stepForm.channel.content"],required:!0,field:"channel.content",rules:[{required:!0,message:e["stepForm.channel.content.required"]}],children:r(a.TextArea,{placeholder:e["stepForm.channel.content.placeholder"]})})]}),s!==3?r(t.Item,{label:" ",children:u(y,{children:[s===2&&r(o,{size:"large",onClick:()=>c(s-1),children:e["stepForm.prev"]}),s!==3&&r(o,{type:"primary",size:"large",onClick:E,children:e["stepForm.next"]})]})}):r(t.Item,{noStyle:!0,children:r(g,{status:"success",title:e["stepForm.created.success.title"],subTitle:e["stepForm.created.success.desc"],extra:[r(o,{style:{marginRight:16},onClick:F,children:e["stepForm.created.success.view"]},"reset"),r(o,{type:"primary",onClick:h,children:e["stepForm.created.success.again"]},"again")]})})]})]}),s===3&&u("div",{className:m["form-extra"],children:[r(p,{heading:6,children:e["stepForm.created.extra.title"]}),u(P,{type:"secondary",children:[e["stepForm.created.extra.desc"],r(o,{type:"text",children:e["stepForm.created.extra.detail"]})]})]})]})})}export{L as default};
