import{r as f,d as t,j as e,ai as r,aj as m,J as u,aL as C,af as d,B as p,aE as B,aD as E,aM as w}from"./vendor.a400a50c.js";/* empty css              */import{G as y,u as S}from"./index.468900fe.js";import{s as i,C as D,F as I,S as j}from"./constants.7e485c3b.js";const v={"en-US":{"menu.list":"List","menu.list.searchTable":"Search Table","searchTable.form.search":"Search","searchTable.form.reset":"Reset","searchTable.columns.id":"Collection ID","searchTable.columns.name":"Collection Name","searchTable.columns.contentType":"Content genre","searchTable.columns.filterType":"Filter method","searchTable.columns.createdTime":"Creation time","searchTable.columns.status":"Status","searchTable.columns.contentNum":"Content quantity","searchTable.columns.operations":"Operation","searchTable.columns.operations.view":"View","searchTable.columns.operations.update":"Edit","searchTable.columns.operations.offline":"Offline","searchTable.columns.operations.online":"Online","searchTable.operations.add":"New","searchTable.operations.upload":"Bulk upload","searchTable.operation.download":"Download","searchForm.id.placeholder":"Please enter the collection ID","searchForm.name.placeholder":"Please enter the collection name","searchForm.all.placeholder":"all"},"zh-CN":{"menu.list":"\u5217\u8868\u9875","menu.list.searchTable":"\u67E5\u8BE2\u8868\u683C","searchTable.form.search":"\u67E5\u8BE2","searchTable.form.reset":"\u91CD\u7F6E","searchTable.columns.id":"\u96C6\u5408\u7F16\u53F7","searchTable.columns.name":"\u96C6\u5408\u540D\u79F0","searchTable.columns.contentType":"\u5185\u5BB9\u4F53\u88C1","searchTable.columns.filterType":"\u7B5B\u9009\u65B9\u5F0F","searchTable.columns.createdTime":"\u521B\u5EFA\u65F6\u95F4","searchTable.columns.status":"\u72B6\u6001","searchTable.columns.contentNum":"\u5185\u5BB9\u91CF","searchTable.columns.operations":"\u64CD\u4F5C","searchTable.columns.operations.view":"\u67E5\u770B","searchTable.columns.operations.update":"\u4FEE\u6539","searchTable.columns.operations.online":"\u4E0A\u7EBF","searchTable.columns.operations.offline":"\u4E0B\u7EBF","searchTable.operations.add":"\u65B0\u5EFA","searchTable.operations.upload":"\u6279\u91CF\u5BFC\u5165","searchTable.operation.download":"\u4E0B\u8F7D","searchForm.id.placeholder":"\u8BF7\u8F93\u5165\u96C6\u5408\u7F16\u53F7","searchForm.name.placeholder":"\u8BF7\u8F93\u5165\u96C6\u5408\u540D\u79F0","searchForm.all.placeholder":"\u5168\u90E8"}},{Row:g,Col:o}=w,{useForm:N}=r;function x(h){const{lang:b}=f.exports.useContext(y),a=S(v),[n]=N(),T=()=>{const l=n.getFieldsValue();h.onSearch(l)},F=()=>{n.resetFields(),h.onSearch({})},s=b==="zh-CN"?8:12;return t("div",{className:i["search-form-wrapper"],children:[e(r,{form:n,className:i["search-form"],labelAlign:"left",labelCol:{span:5},wrapperCol:{span:19},children:t(g,{gutter:24,children:[e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.id"],field:"id",children:e(m,{placeholder:a["searchForm.id.placeholder"],allowClear:!0})})}),e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.name"],field:"name",children:e(m,{allowClear:!0,placeholder:a["searchForm.name.placeholder"]})})}),e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.contentType"],field:"contentType",children:e(u,{placeholder:a["searchForm.all.placeholder"],options:D.map((l,c)=>({label:l,value:c})),mode:"multiple",allowClear:!0})})}),e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.filterType"],field:"filterType",children:e(u,{placeholder:a["searchForm.all.placeholder"],options:I.map((l,c)=>({label:l,value:c})),mode:"multiple",allowClear:!0})})}),e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.createdTime"],field:"createdTime",children:e(C.RangePicker,{allowClear:!0,style:{width:"100%"},disabledDate:l=>d(l).isAfter(d())})})}),e(o,{span:s,children:e(r.Item,{label:a["searchTable.columns.status"],field:"status",children:e(u,{placeholder:a["searchForm.all.placeholder"],options:j.map((l,c)=>({label:l,value:c})),mode:"multiple",allowClear:!0})})})]})}),t("div",{className:i["right-button"],children:[e(p,{type:"primary",icon:e(B,{}),onClick:T,children:a["searchTable.form.search"]}),e(p,{icon:e(E,{}),onClick:F,children:a["searchTable.form.reset"]})]})]})}var P=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:x});export{x as S,P as f,v as i};
