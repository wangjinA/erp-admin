import{r as c,b,d,j as a,aR as f,A as v,a$ as _,aQ as x,aK as h,ap as j,b0 as p}from"./vendor.a27d1a64.js";/* empty css               *//* empty css               *//* empty css              */import{u as y}from"./index.f0a84ea1.js";import{l as w}from"./index.13de8a8e.js";var o={"info-wrapper":"_info-wrapper_g8kyo_1","info-avatar":"_info-avatar_g8kyo_4","info-content":"_info-content_g8kyo_14","verified-tag":"_verified-tag_g8kyo_20","edit-btn":"_edit-btn_g8kyo_25"};function U({userInfo:e={},loading:t}){const i=y(w),[s,r]=c.exports.useState(""),g=b();function m(k,l){r(l.originFile?URL.createObjectURL(l.originFile):"")}c.exports.useEffect(()=>{r(e.avatar)},[e]);const u=a(p,{text:{rows:0},style:{width:"100px",height:"100px"},animation:!0});console.log(e);const n=a(p,{text:{rows:1},animation:!0});return d("div",{className:o["info-wrapper"],children:[a(f,{showUploadList:!1,onChange:m,children:t?u:a(v,{size:100,triggerIcon:a(_,{}),className:o["info-avatar"],children:s?a("img",{src:s}):a(x,{})})}),a(h,{className:o["info-content"],column:2,colon:"\uFF1A",labelStyle:{textAlign:"right"},data:[{label:i["userSetting.label.name"],value:t?n:e.name},{label:i["userSetting.label.verified"],value:t?n:d("span",{children:["****************",a(j,{role:"button",className:o["edit-btn"],onClick:()=>{g({type:"editPassword",payload:{editPassword:!0}})},children:i["userSetting.btn.edit"]})]})},{label:i["userSetting.label.accountId"],value:t?n:e.accountId},{label:i["userSetting.label.registrationTime"],value:t?n:e.registrationTime}]})]})}export{U as default};
