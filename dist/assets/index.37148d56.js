import{r,ag as u,af as c,d,j as e,F as p,B as l,aG as f,M as j}from"./vendor.7897a533.js";import x from"./schema.30cdb4c0.js";import{s as b}from"./shopStore.80dfca21.js";import{F}from"./index.0400ad0b.js";import{S as h}from"./index.cb66718c.js";import"./index.c8b77bef.js";/* empty css               */import"./dict.d6df7dec.js";import"./index.80f47301.js";/* empty css              *//* empty css              */import"./index.5c74a6e5.js";import"./entrepot.369b13c8.js";/* empty css              */import"./index.627cc3c6.js";import"./index.70508b9f.js";import"./style.200a6193.js";/* empty css               */import"./index.15739c72.js";const z=g=>{const o=r.exports.useRef(),[i,t]=r.exports.useState(),[s]=u.useForm(),{run:n,loading:a}=c(async()=>{await s.validate(),t(null)},{manual:!0});return d("div",{className:"p-4 bg-white",children:[e(h,{ref:o,getListRequest:b.getList,formItemConfigList:[...x,{schema:{label:"\u64CD\u4F5C",field:"actions"},render(C,m){return e(p,{children:e(l,{type:"text",icon:e(f,{}),onClick:()=>{t(m)},children:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570"})})}}],name:"\u5E97\u94FA\u6388\u6743"}),e(j,{title:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570",unmountOnExit:!0,visible:!!i,onCancel:()=>{t(null)},confirmLoading:a,onConfirm:()=>{n()},children:e(F,{form:s,formItemConfigList:[{schema:{span:24,label:"\u51FA\u8D27\u5929\u6570",field:"num"},control:"number"}]})})]})};export{z as default};
