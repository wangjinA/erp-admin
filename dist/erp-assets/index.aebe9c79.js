import{r as o,a9 as l,s as p,a2 as f,j as h,a as t,F as g,B as C,Z as b,a4 as F}from"./index.70dbfa87.js";import{S as E,b as r,k as A,F as I}from"./index.e8394b68.js";import"./index.f17798d6.js";import"./index.799a4304.js";import"./index.069ead7c.js";import"./entrepot.ab30483f.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.503ba2ce.js";import"./index.1719ed03.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./index.dfe0a253.js";import"./schema.06835865.js";const i=600;var Z=()=>{const[y,u]=o.exports.useState(!1);o.exports.useState(!1);const[S,a]=o.exports.useState(!1),s=o.exports.useRef(),[n]=l.useForm(),[c]=l.useForm();l.useForm();const d=p(async()=>{const e=await n.validate();return f(()=>r.synchronousGoods({productUpdateEndTime:F(e.date[1]).format("YYYY-MM-DD"),productUpdateStartTime:F(e.date[0]).format("YYYY-MM-DD"),storeId:e.storeId}),"\u540C\u6B65\u5546\u54C1").then(()=>{u(!1),s.current.refreshSearchTable()})},{manual:!0}),m=p(async()=>{const e=await c.validate();return f(()=>r.synchronousGoodsInfo({platformIds:e.platformIds,storeId:e.storeId}),"\u540C\u6B65\u6307\u5B9A\u5546\u54C1").then(()=>{a(!1),s.current.refreshSearchTable()})},{manual:!0});return h("div",{className:"bg-white p-4",children:[t(E,{name:"\u5546\u54C1\u7BA1\u7406",getListRequest:r.getProductList,removeRequest:r.deleteGoodsInfo,updateRequest:r.updateGoodsInfo,createRequest:r.addGoodsInfo,createText:"\u65B0\u589E\u5546\u54C1",createButtonProps:{status:"success"},filterFormProps:{span:24},ref:s,formItemConfigList:[{schema:{label:"\u56FE\u7247",field:"productImg"},control:"upload",controlProps:{limit:3},isCreate:!0,hideTable:!0},{schema:{label:"\u5546\u54C1\u540D\u79F0",field:"productName",required:!0},isCreate:!0,hideTable:!0},{schema:{label:"\u5546\u54C1\u7F16\u7801",field:"productCode"},hideTable:!0,isSearch:!0},{schema:{label:"\u5546\u54C1\u4FE1\u606F",field:"goodsInfo"},render(e,B){return t(A,{data:B})}},{schema:{label:"SKU",field:"sku"},isSearch:!0,isCreate:!0,render(e){return e||"\u672A\u586B\u5199"}},{schema:{label:"\u5546\u54C1\u540D\u79F0",field:"productName"},isSearch:!0,hideTable:!0},{schema:{label:"\u5546\u54C1ID",field:"platformItemId"},isSearch:!0,hideTable:!0},{schema:{label:"\u6210\u672C",field:"productCost"},control:"number",isCreate:!0},{schema:{label:"\u5546\u54C1\u4EF7\u683C",field:"unitPrice"},control:"number",isCreate:!0},{schema:{label:"\u5907\u6CE8",field:"remark"},isCreate:!0,render(e){return e||"-"}}],formModalProps:{style:{width:i}},leftTool:()=>h(g,{children:[t(C,{type:"primary",onClick:()=>{u(!0)},children:"\u540C\u6B65\u5546\u54C1"}),t(C,{type:"primary",onClick:()=>{a(!0)},children:"\u540C\u6B65\u6307\u5B9A\u5546\u54C1"})]})}),t(b,{style:{width:i},visible:y,title:"\u540C\u6B65\u5546\u54C1",onCancel:()=>u(!1),onOk:()=>{d.run()},confirmLoading:d.loading,unmountOnExit:!0,children:t(I,{form:n,span:24,formItemConfigList:[{schema:{label:"\u7535\u5546\u5E73\u53F0",field:"platform"},control:"dictSelector",controlProps:{dictCode:"platform_type"}},{schema:{label:"\u6240\u5C5E\u5E97\u94FA",field:"storeId"},control:"shopSelector",controlProps:{mode:"multiple"}},{schema:{label:"\u540C\u6B65\u65F6\u95F4\u6BB5",field:"date"},control:"datePickerRange"}]})}),t(b,{style:{width:i},visible:S,title:"\u540C\u6B65\u6307\u5B9A\u5546\u54C1",onCancel:()=>a(!1),onOk:()=>{m.run()},confirmLoading:m.loading,unmountOnExit:!0,children:t(I,{form:c,span:24,formItemConfigList:[{schema:{label:"\u7535\u5546\u5E73\u53F0",field:"platform"},control:"dictSelector",controlProps:{dictCode:"platform_type"}},{schema:{label:"\u6240\u5C5E\u5E97\u94FA",field:"storeId"},control:"shopSelector",controlProps:{}},{schema:{label:"\u5546\u54C1ID",field:"platformIds"},controlProps:{placeholder:"\u8BF7\u8F93\u5165\u5546\u54C1ID, \u591A\u4E2A\u5546\u54C1ID\u7528\u9017\u53F7\u9694\u5F00"}}]})})]})};export{i as ModalWidth,Z as default};
