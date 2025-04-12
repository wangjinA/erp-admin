import{r as g,b as l,a8 as u,af as t,j as e,f as c,ar as i,ai as r,a9 as a,ab as b,B as s,M as E}from"./vendor.eb7e7369.js";/* empty css               *//* empty css               *//* empty css              *//* empty css               *//* empty css               *//* empty css               *//* empty css               */import{a as R}from"./index.224556eb.js";import{u as x}from"./index.cc39e113.js";import{s as A,M as C}from"./setupMock.9841fccd.js";const q={"en-US":{"menu.form":"Form","menu.form.group":"Group Form","groupForm.title.video":"Video Parameters","groupForm.title.audio":"Audio Parameters","groupForm.title.explanation":"Enter Explanation","groupForm.form.label.video.mode":"Match Mode","groupForm.form.label.video.acquisition.resolution":"Acquisition Resolution","groupForm.form.label.video.acquisition.frameRate":"Acquisition Frame Rate","groupForm.form.label.video.encoding.resolution":"Encoding Resolution","groupForm.form.label.video.encoding.rate.min":"Encoding Min Rate","groupForm.form.label.video.encoding.rate.max":"Encoding Max Rate","groupForm.form.label.video.encoding.rate.default":"Encoding Default Rate","groupForm.form.label.video.encoding.frameRate":"Encoding Frame Rate","groupForm.form.label.video.encoding.profile":"Encoding Profile","groupForm.placeholder.video.mode":"Please Select","groupForm.placeholder.video.acquisition.resolution":"Please Select","groupForm.placeholder.video.acquisition.frameRate":"Enter Range [1, 30]","groupForm.placeholder.video.encoding.resolution":"Please Select","groupForm.placeholder.video.encoding.rate.min":"Enter Range [150, 1800]","groupForm.placeholder.video.encoding.rate.max":"Enter Range [150, 1800]","groupForm.placeholder.video.encoding.rate.default":"Enter Range [150, 1800]","groupForm.placeholder.video.encoding.frameRate":"Enter Range [1, 30]","groupForm.placeholder.video.encoding.profile":"Enter Range [150, 1800]","groupForm.form.label.audio.mode":"Match Mode","groupForm.form.label.audio.acquisition.channels":"Acquisition Channels","groupForm.form.label.audio.encoding.rate":"Encoding Rate","groupForm.form.label.audio.encoding.profile":"Encoding Profile","groupForm.placeholder.audio.mode":"Please Select","groupForm.placeholder.audio.acquisition.channels":"Please Select","groupForm.placeholder.audio.encoding.rate":"Enter Range [150, 1800]","groupForm.placeholder.audio.encoding.profile":"Enter Range [150, 1800]","groupForm.form.label.explanation":"Explanation","groupForm.placeholder.explanation":"Please fill in the parameter description, no more than 200 characters","groupForm.submit":"Submit","groupForm.reset":"Reset","groupForm.submitSuccess":"Submit Success"},"zh-CN":{"menu.form":"\u8868\u5355\u9875","menu.form.group":"\u5206\u7EC4\u8868\u5355","groupForm.title.video":"\u89C6\u9891\u53C2\u6570","groupForm.title.audio":"\u97F3\u9891\u53C2\u6570","groupForm.title.explanation":"\u586B\u5199\u8BF4\u660E","groupForm.form.label.video.mode":"\u5339\u914D\u6A21\u5F0F","groupForm.form.label.video.acquisition.resolution":"\u91C7\u96C6\u5206\u8FA8\u7387","groupForm.form.label.video.acquisition.frameRate":"\u91C7\u96C6\u5E27\u7387","groupForm.form.label.video.encoding.resolution":"\u7F16\u7801\u5206\u8FA8\u7387","groupForm.form.label.video.encoding.rate.min":"\u7F16\u7801\u7801\u7387\u6700\u5C0F\u503C","groupForm.form.label.video.encoding.rate.max":"\u7F16\u7801\u7801\u7387\u6700\u5927\u503C","groupForm.form.label.video.encoding.rate.default":"\u7F16\u7801\u7801\u7387\u9ED8\u8BA4\u503C","groupForm.form.label.video.encoding.frameRate":"\u7F16\u7801\u5E27\u7387","groupForm.form.label.video.encoding.profile":"\u7F16\u7801profile","groupForm.placeholder.video.mode":"\u8BF7\u9009\u62E9","groupForm.placeholder.video.acquisition.resolution":"\u8BF7\u9009\u62E9","groupForm.placeholder.video.acquisition.frameRate":"\u8F93\u5165\u8303\u56F4[1, 30]","groupForm.placeholder.video.encoding.resolution":"\u8BF7\u9009\u62E9","groupForm.placeholder.video.encoding.rate.min":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.placeholder.video.encoding.rate.max":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.placeholder.video.encoding.rate.default":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.placeholder.video.encoding.frameRate":"\u8F93\u5165\u8303\u56F4[1, 30]","groupForm.placeholder.video.encoding.profile":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.form.label.audio.mode":"\u914D\u7F6E\u6A21\u5F0F","groupForm.form.label.audio.acquisition.channels":"\u91C7\u96C6\u58F0\u9053\u6570","groupForm.form.label.audio.encoding.rate":"\u7F16\u7801\u7801\u7387","groupForm.form.label.audio.encoding.profile":"\u7F16\u7801profile","groupForm.placeholder.audio.mode":"\u8BF7\u9009\u62E9","groupForm.placeholder.audio.acquisition.channels":"\u8BF7\u9009\u62E9","groupForm.placeholder.audio.encoding.rate":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.placeholder.audio.encoding.profile":"\u8F93\u5165\u8303\u56F4[150, 1800]","groupForm.form.label.explanation":"\u53C2\u6570\u8BF4\u660E","groupForm.placeholder.explanation":"\u8BF7\u586B\u5199\u53C2\u6570\u8BF4\u660E\uFF0C\u6700\u591A\u4E0D\u8D85\u591A200\u5B57","groupForm.submit":"\u63D0\u4EA4","groupForm.reset":"\u91CD\u7F6E","groupForm.submitSuccess":"\u63D0\u4EA4\u6210\u529F"}},B="_container_bannw_1",S="_actions_bannw_10";var m={container:B,actions:S};A({setup:()=>{C.mock(new RegExp("/api/groupForm"),()=>!0)}});function N(){const o=x(q),n=g.exports.useRef(),[F,p]=g.exports.useState(!1);function h(d){p(!0),R.post("/api/groupForm",{data:d}).then(()=>{E.success(o["groupForm.submitSuccess"])}).finally(()=>{p(!1)})}function f(){n.current.validate().then(d=>{h(d)})}function v(){n.current.resetFields()}return l("div",{className:m.container,children:[l(u,{layout:"vertical",ref:n,className:m["form-group"],children:[l(t,{children:[e(c.Title,{heading:6,children:o["groupForm.title.video"]}),l(i.Row,{gutter:80,children:[e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.mode"],field:"video.mode",initialValue:"custom",children:l(r,{placeholder:o["groupForm.placeholder.video.mode"],children:[e(r.Option,{value:"custom",children:"\u81EA\u5B9A\u4E49"}),e(r.Option,{value:"mode1",children:"\u6A21\u5F0F1"}),e(r.Option,{value:"mode2",children:"\u6A21\u5F0F2"})]})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.acquisition.resolution"],field:"video.acquisition.resolution",children:l(r,{placeholder:o["groupForm.placeholder.video.acquisition.resolution"],children:[e(r.Option,{value:"resolution1",children:"\u5206\u8FA8\u73871"}),e(r.Option,{value:"resolution2",children:"\u5206\u8FA8\u73872"}),e(r.Option,{value:"resolution3",children:"\u5206\u8FA8\u73873"})]})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.acquisition.frameRate"],field:"video.acquisition.frameRate",children:e(a,{placeholder:o["groupForm.placeholder.video.acquisition.frameRate"],addAfter:"fps"})})})]}),l(i.Row,{gutter:80,children:[e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.resolution"],field:"video.encoding.resolution",children:l(r,{placeholder:o["groupForm.placeholder.video.encoding.resolution"],children:[e(r.Option,{value:"resolution1",children:"\u5206\u8FA8\u73871"}),e(r.Option,{value:"resolution2",children:"\u5206\u8FA8\u73872"}),e(r.Option,{value:"resolution3",children:"\u5206\u8FA8\u73873"})]})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.rate.min"],field:"video.encoding.rate.min",children:e(a,{placeholder:o["groupForm.placeholder.video.encoding.rate.min"],addAfter:"bps"})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.rate.max"],field:"video.encoding.rate.max",children:e(a,{placeholder:o["groupForm.placeholder.video.encoding.rate.max"],addAfter:"bps"})})})]}),l(i.Row,{gutter:80,children:[e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.rate.default"],field:"video.encoding.rate.default",children:e(a,{placeholder:o["groupForm.placeholder.video.encoding.rate.default"],addAfter:"bps"})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.frameRate"],field:"video.encoding.frameRate",children:e(a,{placeholder:o["groupForm.placeholder.video.encoding.frameRate"],addAfter:"fps"})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.video.encoding.profile"],field:"video.encoding.profile",children:e(a,{placeholder:o["groupForm.placeholder.video.encoding.profile"],addAfter:"bps"})})})]})]}),l(t,{children:[e(c.Title,{heading:6,children:o["groupForm.title.audio"]}),l(i.Row,{gutter:80,children:[e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.audio.mode"],initialValue:"custom",field:"audio.mode",children:l(r,{placeholder:o["groupForm.placeholder.audio.mode"],children:[e(r.Option,{value:"custom",children:"\u81EA\u5B9A\u4E49"}),e(r.Option,{value:"mode1",children:"\u6A21\u5F0F1"}),e(r.Option,{value:"mode2",children:"\u6A21\u5F0F2"})]})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.audio.acquisition.channels"],field:"audio.acquisition.channels",children:l(r,{placeholder:o["groupForm.placeholder.audio.acquisition.channels"],children:[e(r.Option,{value:"1",children:"1"}),e(r.Option,{value:"2",children:"2"}),e(r.Option,{value:"3",children:"3"})]})})}),e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.audio.encoding.rate"],field:"audio.encoding.rate",children:e(a,{placeholder:o["groupForm.placeholder.audio.encoding.rate"],addAfter:"bps"})})})]}),e(i.Row,{gutter:80,children:e(i.Col,{span:8,children:e(u.Item,{label:o["groupForm.form.label.audio.encoding.profile"],field:"audio.encoding.profile",children:e(a,{placeholder:o["groupForm.placeholder.audio.encoding.profile"],addAfter:"fps"})})})})]}),l(t,{style:{marginBottom:"40px"},children:[e(c.Title,{heading:6,children:o["groupForm.title.explanation"]}),e(u.Item,{label:o["groupForm.form.label.explanation"],field:"audio.explanation",children:e(a.TextArea,{placeholder:o["groupForm.placeholder.explanation"]})})]})]}),e("div",{className:m.actions,children:l(b,{children:[e(s,{onClick:v,size:"large",children:o["groupForm.reset"]}),e(s,{type:"primary",onClick:f,loading:F,size:"large",children:o["groupForm.submit"]})]})})]})}export{N as default};
