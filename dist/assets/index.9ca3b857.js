import{r,ai as u,ae as c,d,j as e,F as l,B as p,aG as f,M as j}from"./vendor.ad15203e.js";import x from"./schema.27e25c7c.js";import{s as F}from"./shopStore.eefb53b7.js";import{F as h}from"./index.05524fc4.js";import{S as b}from"./index.fed322ec.js";import"./index.be77c21e.js";/* empty css               */import"./dict.a4fa61c1.js";import"./index.a07d4460.js";/* empty css              *//* empty css              */import"./index.56c9572e.js";import"./entrepot.e08d6e66.js";/* empty css              */import"./index.b1191912.js";import"./style.200a6193.js";/* empty css               */import"./index.96c0931e.js";const T=g=>{const o=r.exports.useRef(),[i,t]=r.exports.useState(),[s]=u.useForm(),{run:n,loading:a}=c(async()=>{await s.validate(),t(null)},{manual:!0});return d("div",{className:"p-4 bg-white",children:[e(b,{ref:o,getListRequest:F.getList,formItemConfigList:[...x,{schema:{label:"\u64CD\u4F5C",field:"actions"},render(C,m){return e(l,{children:e(p,{type:"text",icon:e(f,{}),onClick:()=>{t(m)},children:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570"})})}}],name:"\u5E97\u94FA\u6388\u6743"}),e(j,{title:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570",unmountOnExit:!0,visible:!!i,onCancel:()=>{t(null)},confirmLoading:a,onConfirm:()=>{n()},children:e(h,{form:s,formItemConfigList:[{schema:{span:24,label:"\u51FA\u8D27\u5929\u6570",field:"num"},control:"number"}]})})]})};export{T as default};
