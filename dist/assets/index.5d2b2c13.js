import{av as i,r as s,d as n,ax as m,aN as o,j as t,h as g,s as I,B as l,br as r,aE as L,v as x,a as c}from"./vendor.7897a533.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               */import{u as k}from"./index.80f47301.js";import{i as w,P as h}from"./item.f00218e8.js";import{s as A}from"./setupMock.250c3137.js";/* empty css               *//* empty css               */const F="_container_1acgl_1",_="_steps_1acgl_4";var b={container:F,steps:_};A({setup:()=>{i.mock(new RegExp("/api/basicProfile"),()=>({status:2,video:{mode:"\u81EA\u5B9A\u4E49",acquisition:{resolution:"720*1280",frameRate:15},encoding:{resolution:"720*1280",rate:{min:300,max:800,default:1500},frameRate:15,profile:"high"}},audio:{mode:"\u81EA\u5B9A\u4E49",acquisition:{channels:8},encoding:{channels:8,rate:128,profile:"ACC-LC"}}})),i.mock(new RegExp("/api/adjustment"),()=>new Array(2).fill("0").map(()=>({contentId:`${i.Random.pick(["\u89C6\u9891\u7C7B","\u97F3\u9891\u7C7B"])}${i.Random.natural(1e3,9999)}`,content:"\u89C6\u9891\u53C2\u6570\u53D8\u66F4\uFF0C\u97F3\u9891\u53C2\u6570\u53D8\u66F4",status:i.Random.natural(0,1),updatedTime:i.Random.datetime("yyyy-MM-dd HH:mm:ss")})))}});function Q(){const e=k(w),[P,d]=s.exports.useState(!1),[u,j]=s.exports.useState({status:1}),[y,p]=s.exports.useState(!1),[C,S]=s.exports.useState({}),[D,f]=s.exports.useState(!1),[T,B]=s.exports.useState([]);function R(){d(!0),c.get("/api/basicProfile").then(a=>{j(a.data||{})}).finally(()=>{d(!1)})}function v(){p(!0),c.get("/api/basicProfile").then(a=>{S(a.data||{})}).finally(()=>{p(!1)})}function E(){f(!0),c.get("/api/adjustment").then(a=>{B(a.data)}).finally(()=>{f(!1)})}return s.exports.useEffect(()=>{R(),v(),E()},[]),n("div",{className:b.container,children:[n(m,{children:[n(o.Row,{justify:"space-between",align:"center",children:[t(o.Col,{span:16,children:t(g.Title,{heading:6,children:e["basicProfile.title.form"]})}),t(o.Col,{span:8,style:{textAlign:"right"},children:n(I,{children:[t(l,{children:e["basicProfile.cancel"]}),t(l,{type:"primary",children:e["basicProfile.goBack"]})]})})]}),n(r,{current:u.status,lineless:!0,className:b.steps,children:[t(r.Step,{title:e["basicProfile.steps.commit"]}),t(r.Step,{title:e["basicProfile.steps.approval"]}),t(r.Step,{title:e["basicProfile.steps.finish"]})]})]}),t(h,{title:e["basicProfile.title.currentParams"],data:u,type:"current",loading:P}),t(h,{title:e["basicProfile.title.originParams"],data:C,type:"origin",loading:y}),n(m,{children:[t(g.Title,{heading:6,children:e["basicProfile.adjustment.record"]}),t(L,{loading:D,data:T,columns:[{dataIndex:"contentId",title:e["basicProfile.adjustment.contentId"]},{dataIndex:"content",title:e["basicProfile.adjustment.content"]},{dataIndex:"status",title:e["basicProfile.adjustment.status"],render:a=>a?t(x,{status:"success",text:e["basicProfile.adjustment.success"]}):t(x,{status:"processing",text:e["basicProfile.adjustment.waiting"]})},{dataIndex:"updatedTime",title:e["basicProfile.adjustment.updatedTime"]},{title:e["basicProfile.adjustment.operation"],headerCellStyle:{paddingLeft:"15px"},render(){return t(l,{type:"text",children:e["basicProfile.adjustment.operation.view"]})}}]})]})]})}export{Q as default};
