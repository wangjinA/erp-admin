import{r as c,d as u,j as d,b as e,aU as f,A as v,b2 as _,aO as x,aW as h,aq as j,aE as p}from"./vendor.bb408984.js";/* empty css               *//* empty css               *//* empty css              */import{u as y}from"./index.2043ebfc.js";import{l as w}from"./index.13de8a8e.js";var o={"info-wrapper":"_info-wrapper_g8kyo_1","info-avatar":"_info-avatar_g8kyo_4","info-content":"_info-content_g8kyo_14","verified-tag":"_verified-tag_g8kyo_20","edit-btn":"_edit-btn_g8kyo_25"};function F({userInfo:a={},loading:t}){const i=y(w),[s,r]=c.exports.useState(""),g=u();function m(k,l){r(l.originFile?URL.createObjectURL(l.originFile):"")}c.exports.useEffect(()=>{r(a.avatar)},[a]);const b=e(p,{text:{rows:0},style:{width:"100px",height:"100px"},animation:!0});console.log(a);const n=e(p,{text:{rows:1},animation:!0});return d("div",{className:o["info-wrapper"],children:[e(f,{showUploadList:!1,onChange:m,children:t?b:e(v,{size:100,triggerIcon:e(_,{}),className:o["info-avatar"],children:s?e("img",{src:s}):e(x,{})})}),e(h,{className:o["info-content"],column:2,colon:"\uFF1A",labelStyle:{textAlign:"right"},data:[{label:i["userSetting.label.name"],value:t?n:a.name},{label:i["userSetting.label.verified"],value:t?n:d("span",{children:["****************",e(j,{role:"button",className:o["edit-btn"],onClick:()=>{g({type:"editPassword",payload:{editPassword:!0}})},children:i["userSetting.btn.edit"]})]})},{label:i["userSetting.label.accountId"],value:t?n:a.accountId},{label:i["userSetting.label.registrationTime"],value:t?n:a.registrationTime}]})]})}export{F as default};
