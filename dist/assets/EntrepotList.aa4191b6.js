import{d as r,F as u,h as n,j as a,B as i,aB as E,o as c,c as v,q as y}from"./vendor.7897a533.js";import{P as R}from"./index.15739c72.js";import{S as d}from"./index.70508b9f.js";var K=p=>{const{entrepotInfoHandle:l}=p,{showTypeRacks:b,setShowTypeRacks:L,showTypeEntrepot:f,setShowTypeEntrepot:o,formEntrepotRef:m,formRacksRef:x,activeEntrepot:t,setActiveEntrepot:g,racksList:T,rackLoading:j,getRacksList:F,createEntrepotHandler:N,createEntrepotLoading:w,getEntrepotList:P,entrepotList:s,entrepotLoading:A,activeRacks:B,setActiveRacks:S,createRacksLoading:z,createRacksHandler:C,removeRacks:H,removeRacksLoading:I,updateRacks:D,updateRacksLoading:q,updateEntrepot:M,updateEntrepotLoading:O,removeEntrepot:h,removeEntrepotLoading:k}=l;return r(u,{children:[r(n.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:[a(n.Title,{heading:6,className:"mb-0",children:"\u4ED3\u5E93\u5217\u8868"}),a(i,{icon:a(E,{}),type:"primary",size:"small",className:"ml-auto",onClick:()=>{o(d.create)},children:"\u65B0\u589E"})]}),a(c,{children:s==null?void 0:s.map(e=>r("div",{onClick:()=>{g(e)},children:[a(c.Item.Meta,{style:{height:76},className:v((t==null?void 0:t.id)===e.id?"bg-gray-100 dark:bg-zinc-500":"","hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer px-2 border-b border-neutral-3"),avatar:a(y,{children:e.consignee[0]}),title:e.entrepotName,description:e.detailedAddress}),r("div",{children:[a(i,{type:"primary",onClick:()=>{o(d.edit),m.setFieldsValue(e)},children:"\u7F16\u8F91"}),a(R,{onOk:()=>{h(e.id)},buttonProps:{loading:k}})]})]},e.id))})]})};export{K as E};
