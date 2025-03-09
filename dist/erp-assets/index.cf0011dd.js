import{j as o,a as e,r as n,a9 as W,s as x,M as E,a2 as k,B,Z as S,n as O,d as V,ai as D,t as z,S as M,$ as j,a0 as R}from"./index.70dbfa87.js";import{L as s,W as h,S as $,j as N}from"./index.e8394b68.js";import"./index.799a4304.js";import{T as q}from"./index.503ba2ce.js";import{E as I}from"./index.069ead7c.js";import{ModalWidth as U}from"./index.aebe9c79.js";import"./index.f17798d6.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.1719ed03.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./entrepot.ab30483f.js";import"./index.dfe0a253.js";import"./schema.06835865.js";var P=C=>{const{data:r}=C;return o("div",{className:"p-2 w-full flex items-center",children:[e("img",{className:"size-16",src:r.productImg}),e("div",{className:"ml-2 flex-1 w-0",children:o("div",{className:"text-sm text-gray-500",children:[e(s,{className:"!mb-0",labelClassName:"!text-sm !pr-1 !align-baseline",valueClassName:"!text-sm",label:"\u5546\u54C1\u7F16\u7801",value:r.productCode}),e(s,{className:"!mb-0",labelClassName:"!text-sm !pr-1 !align-baseline",valueClassName:"!text-sm",label:"\u5546\u54C1\u540D\u79F0",value:r.productName}),r!=null&&r.platformItemId?e(s,{className:"!mb-0",labelClassName:"!text-sm !pr-1 !align-baseline",valueClassName:"!text-sm",label:"\u5E73\u53F0\u5546\u54C1ID",value:r.platformItemId}):null]})})]})},pe=()=>{var v;const[C,r]=n.exports.useState(!1),[y,m]=n.exports.useState(),[a,g]=n.exports.useState(),[i,p]=n.exports.useState();W.useForm();const F=n.exports.useRef(),{run:A,loading:L}=x(async()=>(i==null?void 0:i.serviceCharge)===void 0?E.error({content:"\u8BF7\u586B\u5199\u4E0A\u67B6\u670D\u52A1\u8D39",duration:2500}):i!=null&&i.putStorageProductVOS.every(u=>!u.receiveProductCount)?E.error({content:"\u8BF7\u81F3\u5C11\u8F93\u5165\u4E00\u4E2A\u6536\u8D27\u6570\u91CF",duration:2500}):k(()=>h.warehousing(i)).then(()=>{r(!1),F.current.refreshSearchTable()}),{manual:!0}),{run:T,data:b,loading:c}=x(async u=>{if(u)return h.logs(u).then(t=>t.data.data.list)},{manual:!0});return o("div",{className:"bg-white p-4",children:[e($,{ref:F,name:"\u5165\u5E93\u7533\u8BF7",getListRequest:h.getList,formItemConfigList:[{schema:{label:"\u7533\u8BF7\u4FE1\u606F",field:"storageCode"},isSearch:!0,render(u,t){var l,d;return o("div",{children:[e(s,{label:"\u7F16\u7801",value:t.storageCode}),e(s,{label:"\u7533\u8BF7\u4EBA",value:(l=t.selectApplyUser)==null?void 0:l.account}),e(s,{label:"\u7528\u6237\u6807\u8BC6",value:(d=t.selectApplyUser)==null?void 0:d.number})]})}},{schema:{label:"\u6240\u5C5E\u4ED3\u5E93",field:"sendWarehouse"},render(u){return e(I,{value:u})}},{schema:{label:"\u5546\u54C1\u4FE1\u606F",field:"logisticsProductList"},width:300,render(u){return u.map(t=>e(P,{data:t},t.id))}},{schema:{label:"\u5546\u54C1\u540D\u79F0",field:"goodsInfo"},isSearch:!0,hideTable:!0},{schema:{label:"\u5FEB\u9012\u5355\u53F7",field:"expressNo"},isSearch:!0},{schema:{label:"\u53D1\u8D27/\u6536\u8D27\u6570\u91CF",field:"sendProductCount"},render(u,t){return e("div",{children:`${t.sendProductCount||0}/${t.receiveProductCount||0}`})}},{schema:{label:"\u4E0A\u67B6\u670D\u52A1\u8D39",field:"serviceCharge"}},{schema:{label:"\u72B6\u6001",field:"storageStatus"},isSearch:!0,control:"dictSelector",controlProps:{dictCode:"storage_status"}},{schema:{label:"\u521B\u5EFA\u65F6\u95F4",field:"createTime"}},{schema:{label:"\u64CD\u4F5C",field:"actions"},render(u,t){return o("div",{children:[e(B,{type:"text",size:"small",status:"default",loading:c,onClick:()=>{p({applyId:t.id,putStorageProductVOS:t.logisticsProductList.map(l=>({id:l.id,logisticsProductId:l.logisticsProductId,productStorageId:l.productStorageId,receiveProductCount:l.receiveProductCount||0})),sendWarehouse:t.sendWarehouse,serviceCharge:void 0}),g(t)},children:"\u5165\u5E93"}),e(B,{type:"text",size:"small",status:"warning",loading:c,onClick:()=>{m(t),T(t.id)},children:"\u64CD\u4F5C\u8BB0\u5F55"})]})}}]}),e(S,{style:{width:U},visible:!!a,title:"\u5165\u5E93\u7533\u8BF7",onCancel:()=>g(null),confirmLoading:L,onOk:async()=>{A()},okText:"\u5165\u5E93",children:o("div",{children:[o(O,{direction:"vertical",children:[e(s,{label:"\u4ED3\u5E93\u540D\u79F0",value:e(I,{value:a==null?void 0:a.sendWarehouse})}),e(s,{label:"\u5FEB\u9012\u5355\u53F7",value:(v=a==null?void 0:a.expressNo)==null?void 0:v.split(",").map(u=>e(V,{color:"blue",children:u},u))}),e(s,{className:"flex",label:"\u4E0A\u67B6\u670D\u52A1\u8D39",value:e(D,{size:"mini",placeholder:"\u8BF7\u8F93\u5165",suffix:"\u5143",onChange:u=>{p(t=>(t.serviceCharge=u,t))}})})]}),e(z,{}),e(q,{size:"small",data:a==null?void 0:a.logisticsProductList,columns:[{title:"\u5546\u54C1\u4FE1\u606F",dataIndex:"goodsInfo",width:250,render(u,t){return e(P,{data:t})}},{width:120,title:"\u5546\u54C1\u6570\u91CF",dataIndex:"sendProductCount"},{title:"\u6536\u8D27\u6570\u91CF",dataIndex:"receiveProductCount",render(u,t,l){return e(D,{placeholder:"\u8BF7\u8F93\u5165",defaultValue:u,suffix:"\u4EF6",onChange:d=>{p(f=>(f.putStorageProductVOS[l].receiveProductCount=d,f))}})}}]})]})}),e(S,{title:"\u64CD\u4F5C\u8BB0\u5F55",visible:y,onCancel:()=>m(null),cancelText:"\u5173\u95ED",unmountOnExit:!0,onOk:async()=>{m(null)},children:e(M,{loading:c,className:"mx-auto block max-h-96 overflow-y-auto",children:!c&&b?e(N,{children:b.map(u=>o(N.Item,{label:u.operationContent||"-",children:[e("span",{children:u.operationProcedure}),e("span",{className:"text-gray-500",children:j(u.createTime)})]},u.id))}):e(R,{description:"\u6682\u65E0\u8BB0\u5F55"})})})]})};export{pe as default};
