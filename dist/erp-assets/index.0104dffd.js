import{r as n,ag as o,b as t,j as i,X as m,B as c}from"./vendor.bb408984.js";import{e as d}from"./entrepot.7377f9af.js";import{S as p,L as r}from"./index.055835f8.js";import{a as l}from"./index.9d4791ac.js";import{s as f,S as b}from"./index.2043ebfc.js";import"./index.aedfa0dd.js";/* empty css               */import"./shopStore.cb49cab0.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.5a88c625.js";/* empty css               */import"./index.68a41d33.js";import"./index.1ac1b297.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";var z=()=>{const u=n.exports.useRef(),s=o(e=>f(()=>d.setDefualt(e)).then(()=>u.current.refreshSearchTable()),{manual:!0});return t(p,{ref:u,name:"\u4ED3\u5E93\u5217\u8868",className:"bg-white p-4",getListRequest:d.getList,formItemConfigList:[{schema:{label:"\u4ED3\u5E93\u540D\u79F0",field:"entrepotName"},isSearch:!0,render(e,a){return i("div",{children:[t("div",{children:e}),a.defaultFlag?t(b,{tagInfos:[{text:"\u9ED8\u8BA4\u4ED3\u5E93",value:1,color:"red"}],value:1}):""]})}},{schema:{label:"\u4ED3\u5E93\u5730\u5740",field:"deliveryAddress"},render(e,a){return i("div",{className:"relative",children:[t(r,{label:"\u6536\u8D27\u4EBA",value:a.consignee}),t(r,{label:"\u8054\u7CFB\u7535\u8BDD",value:a.telephone}),t(r,{label:"\u6536\u8D27\u5730\u5740",value:a.deliveryAddress+a.detailedAddress}),t(m,{className:"absolute right-0 top-0 bottom-0 my-auto size-16",src:a.qrCode})]})}},{schema:{label:"\u4ED3\u5E93\u7C7B\u578B",field:"entrepotType"},render:e=>t(l,{dictCode:"entrepot_type",value:String(e)})},{schema:{label:"\u652F\u6301\u5E97\u94FA\u7C7B\u578B",field:"storeType"},render:e=>t(l,{dictCode:"store_type",value:e})},{schema:{label:"\u652F\u6301\u5E93\u5B58",field:"inventoryStatus"},render:e=>e?"\u652F\u6301":"\u4E0D\u652F\u6301"},{schema:{label:"\u521B\u5EFA\u65F6\u95F4",field:"createTime"}},{schema:{label:"\u64CD\u4F5C",field:"actions"},render(e,a){return a.defaultFlag?"-":t(c,{loading:s.loading,type:"text",size:"small",onClick:()=>{s.run(a.id)},children:"\u8BBE\u4E3A\u9ED8\u8BA4"})}}]})};export{z as default};
