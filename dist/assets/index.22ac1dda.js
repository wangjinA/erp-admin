var X=Object.defineProperty,Z=Object.defineProperties;var ee=Object.getOwnPropertyDescriptors;var R=Object.getOwnPropertySymbols;var te=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var w=(s,r,o)=>r in s?X(s,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[r]=o,a=(s,r)=>{for(var o in r||(r={}))te.call(r,o)&&w(s,o,r[o]);if(R)for(var o of R(r))re.call(r,o)&&w(s,o,r[o]);return s},g=(s,r)=>Z(s,ee(r));import{e as se,r as I,bx as oe,ai as ae,bw as ue,l as f,ae as b,N as d,af as z,d as l,j as t,p as H,F as Y,B as c,bo as B,q as ie,aC as ne,aD as ce,C as _,s as de}from"./vendor.ad15203e.js";import{getOrderFilter as le}from"./schema.5f93fc60.js";import{s as me}from"./entrepot.01346301.js";import{o as pe}from"./order.da9159c8.js";import{b as ge,E as M,o as O,u as he,R as Fe,O as fe}from"./index.2d9ed9b3.js";import{F as Oe}from"./index.bd56f4ba.js";import{u as Ee}from"./index.8a35acc1.js";import{u as De}from"./index.46977908.js";import{t as N,a as j,i as Ae,s as K}from"./index.6a8b0597.js";/* empty css              */import"./express.f245d51a.js";import"./index.a71cd845.js";import"./index.83e7bd00.js";import"./index.10a8fb09.js";import"./index.fb62b474.js";import"./index.b1191912.js";import"./schema.43602d07.js";/* empty css               */import"./dict.599599e6.js";/* empty css              *//* empty css              */import"./style.200a6193.js";import"./shopStore.7ba7d358.js";var h;(function(s){s.SHOPEE="shopee",s.PACK_ORDER="pack_order"})(h||(h={}));var qe=s=>{var V;const{type:r}=s,o={shopee:"shopee_status",pack_order:"order_status"}[r],[p,y]=se(location.pathname),[E,x]=I.exports.useState(),[i,$]=I.exports.useState([]),[m,q,U]=oe({selectLogisticsOrderVO:{},selectOrderProductVO:{},trackingNumber:""}),[k]=ae.useForm(),S=De();function G(e){q(a(a({},m),e))}const{data:u}=Ee({dictCode:o,displayName:""});p===void 0&&(u==null?void 0:u.length)&&y((V=u[0])==null?void 0:V.value);const{data:J,run:P,pagination:F,loading:D,refresh:A}=ue(async e=>{if(ge.emit(M.clearSelectOrderList),!(u==null?void 0:u.length))return null;const n=g(a({},m),{selectOrderProductVO:a({},m.selectOrderProductVO),selectLogisticsOrderVO:a(g(a(a(a({},m.selectLogisticsOrderVO),N(m.selectLogisticsOrderVO.packTimes,"packStartTime","packEndTime")),N(m.selectLogisticsOrderVO.stockRemovalTimes,"stockRemovalStartTime","stockRemovalEndTime")),{orderStatus:r===h.PACK_ORDER?p:void 0}),r===h.SHOPEE?{shrimpStatus:p,storeFlag:!0}:{whetherPack:!0}),pageNum:(e==null?void 0:e.current)||F.current,pageSize:(e==null?void 0:e.pageSize)||F.pageSize}),Q=await O.getList(n);if(r===h.PACK_ORDER)O.getPackCount(g(a({},f.exports.omit(n,["selectLogisticsOrderVO"])),{selectLogisticsOrderVO:a({},f.exports.omit(n.selectLogisticsOrderVO,["orderStatus"]))})).then(C=>{x(C.data.data)});else{const C=g(a({},f.exports.omit(n,["selectLogisticsOrderVO"])),{selectLogisticsOrderVO:a({},f.exports.omit(n.selectLogisticsOrderVO,["shrimpStatus"]))});O.getShopOrderCount(C).then(W=>{x(W.data.data)})}return Q.data.data},{defaultPageSize:10,defaultCurrent:1,manual:!1,refreshDeps:[p,u]}),L=b(async()=>{await j(()=>me.outList({orderIdList:i}),"\u51FA\u5E93"),A()},{manual:!0}),v=b(async()=>{await j(()=>pe.cancel(i),"\u53D6\u6D88"),A()},{manual:!0});he(M.refreshOrderPage,()=>{A()});const T=b(async()=>{var e;if(!((e=S.data)==null?void 0:e.length))return d.error("\u672A\u83B7\u53D6\u5230\u5E97\u94FA\u4FE1\u606F");await j(()=>O.syncOrder({orderUpdateStartTime:z().subtract(15,"day").format("YYYY-MM-DD HH:mm:ss"),orderUpdateEndTime:z().format("YYYY-MM-DD HH:mm:ss"),storeId:S.data.map(n=>n.value)}),"\u540C\u6B65\u8BA2\u5355")},{manual:!0});return l("div",{className:"bg-white p-4",children:[t(Oe,{form:k,size:"small",formItemConfigList:le({type:r}),onValuesChange:(e,n)=>{G(n)},onSubmit:e=>{console.log(e)}}),l("div",{className:"flex justify-between py-6 pr-2",children:[l(H,{size:8,children:[Ae()?l(Y,{children:[t(c,{type:"outline",icon:t(B,{}),onClick:()=>{d.error("\u5F00\u53D1\u4E2D...")},children:"\u5BFC\u51FA\u6570\u636E"}),t(c,{type:"outline",status:"warning",loading:v.loading,onClick:async()=>{if(!i.length)return d.error("\u8BF7\u9009\u62E9\u8BA2\u5355");await K({content:`\u786E\u8BA4\u53D6\u6D88\u9009\u4E2D\u7684${i.length}\u4E2A\u8BA2\u5355\uFF1F`}),v.run()},children:"\u6279\u91CF\u53D6\u6D88\u8BA2\u5355"}),t(c,{type:"outline",onClick:()=>{if(!i.length)return d.error("\u8BF7\u9009\u62E9\u8BA2\u5355");d.error("\u5F00\u53D1\u4E2D...")},children:"\u6279\u91CF\u7533\u8BF7\u8FD0\u5355\u53F7"}),t(Fe,{ids:i,buttonProps:{type:"outline",status:"default"},children:"\u6279\u91CF\u66F4\u65B0\u8BA2\u5355"}),t(c,{type:"outline",onClick:()=>{d.error("\u5F00\u53D1\u4E2D...")},children:"\u4E0B\u8F7D\u5168\u90E8\u9762\u5355"}),t(c,{type:"outline",loading:L.loading,onClick:async()=>{if(!i.length)return d.error("\u8BF7\u9009\u62E9\u8BA2\u5355");await K({content:`\u786E\u5B9A\u51FA\u5E93 ${i.length} \u4E2A\u8BA2\u5355\uFF1F`,okButtonProps:{status:"success"}}),L.run()},children:"\u6279\u91CF\u51FA\u5E93"})]}):l(Y,{children:[t(c,{type:"outline",icon:t(B,{}),loading:T.loading,onClick:()=>{T.run()},children:"\u540C\u6B65\u8BA2\u5355"}),t(c,{type:"outline",icon:t(B,{}),onClick:()=>{d.error("\u5F00\u53D1\u4E2D...")},children:"\u5BFC\u51FA\u8BA2\u5355"})]}),i.length?l(ie,{checked:!0,color:"pinkpurple",children:["\u5DF2\u9009\u4E2D"," ",i.length," ","\u4E2A\u8BA2\u5355"]}):null]}),l(H,{size:20,children:[t(c,{type:"default",loading:D,icon:t(ne,{}),onClick:()=>{k.resetFields(),U(),setTimeout(()=>{F.changeCurrent(1)},0)},children:"\u91CD\u7F6E"}),t(c,{type:"primary",icon:t(ce,{}),loading:D,onClick:()=>P({current:1,pageSize:10}),children:"\u67E5\u8BE2"})]})]}),t(_,{lazyload:!0,className:"mb-4",activeTab:p,onChange:e=>y(e),children:u==null?void 0:u.map((e,n)=>t(_.TabPane,{title:t(de,{offset:[13,-5],count:E==null?void 0:E[e.value],children:t("span",{children:e.label})})},e.value))}),t(fe,{dictCode:o,run:P,data:J,loading:D,pagination:F,onSelect:e=>{$(e)}})]})};export{h as OrderPageType,qe as default};
