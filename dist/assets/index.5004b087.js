var te=Object.defineProperty,ae=Object.defineProperties;var ie=Object.getOwnPropertyDescriptors;var K=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,ne=Object.prototype.propertyIsEnumerable;var R=(s,n,i)=>n in s?te(s,n,{enumerable:!0,configurable:!0,writable:!0,value:i}):s[n]=i,k=(s,n)=>{for(var i in n||(n={}))re.call(n,i)&&R(s,i,n[i]);if(K)for(var i of K(n))ne.call(n,i)&&R(s,i,n[i]);return s},T=(s,n)=>ae(s,ie(n));import{r as d,u as G,e as se,l as J,ae as L,N as V,d as o,j as t,B as x,bJ as le,aH as U,ay as oe,i as W,a_ as M,aM as z,D as ce,ai as X,aJ as de,aF as me,ao as pe,F as Fe,z as ge,bK as he,bL as fe,q as Ce,X as Q,M as Ee,m as ye}from"./vendor.a400a50c.js";/* empty css              *//* empty css               *//* empty css               *//* empty css               */import{s as A}from"./shipment.5c7e95ff.js";import{F as Y}from"./index.a184ec97.js";import{a as N,s as O,S as Z}from"./index.468900fe.js";import _e from"./schema.abb33c85.js";import{s as be}from"./shopStore.84d34b8f.js";import{S as xe}from"./index.407b6825.js";import{K as Ae}from"./index.8712af64.js";import{s as ee}from"./date.2851dbe2.js";/* empty css              */import"./index.a61c6fab.js";import"./entrepot.a3a77f75.js";import"./style.200a6193.js";import"./shopee.e37024fa.js";import"./index.17a3e5e3.js";import"./dict.3248fbce.js";import"./index.435cacc0.js";const P="Product is duplicate with another product in the same shop";var Be=({data:s,shopId:n})=>{var I;const[i,B]=d.exports.useState({}),[f,D]=d.exports.useState(!1),y=G(e=>e.userInfo),[F,v]=d.exports.useState([]),[l,g]=d.exports.useState([]),[m,$]=se("categortyAttributeFillInfo",{defaultValue:{}}),h=(s==null?void 0:s.list.filter(e=>e.status==="error"))||[],j=h.filter(e=>!(i.category_id&&i.category_id!==e.detail.categoryInfo.category_id||i.item_name&&!e.detail.item_name.includes(i.item_name)||i.item_id&&String(e.detail.item_id)!==i.item_id||i.repeat&&(i.repeat===1?!e.msg.includes(P):e.msg.includes(P)))).sort((e,u)=>e.detail.item_name.localeCompare(u.detail.item_name,"zh-Hans-CN")).map((e,u)=>T(k({},e),{index:u+1}))||[],_=J.exports.uniqBy(h,e=>{var u;return(u=e.detail)==null?void 0:u.categoryInfo.category_id}).map(e=>{var u,a;return{label:`${(u=e.detail)==null?void 0:u.categoryInfo.display_category_name}(${h.filter(r=>{var c;return r.detail.categoryInfo.category_id===((c=e.detail)==null?void 0:c.categoryInfo.category_id)}).length}\u4E2A)`,value:(a=e.detail)==null?void 0:a.categoryInfo.category_id}}),q=L(async e=>{!y.userLoginAccount||await N(()=>A.saveCategortyAttribute({userLoginAccount:y.userLoginAccount,data:e}),"\u4FDD\u5B58")},{manual:!0,debounceWait:300}),w=L(async()=>{if(!(l==null?void 0:l.length))return V.warning("\u8BF7\u9009\u62E9\u5546\u54C1");await O({content:"\u5728\u7C7B\u76EE\u5C5E\u6027\u51FA\u73B0\u95EE\u9898\uFF0C\u5F71\u54CD\u4FEE\u6539\u51FA\u8D27\u65F6\u95F4\u65F6\uFF0C\u518D\u4F7F\u7528\u6B64\u64CD\u4F5C\uFF01\uFF08\u5982\u679C\u9519\u8BEF\u7C7B\u578B\u662F\uFF1A\u3010\u5546\u54C1\u91CD\u590D\u3011\uFF0C\u8BF7\u79FB\u6B65\u5220\u9664\u64CD\u4F5C\uFF09",okText:"\u786E\u8BA4\u4FEE\u6539"}),await N(()=>A.changeCategorty({userLoginAccount:y.userLoginAccount,shopId:n,itemIds:l,isToCurrentCategoryOther:!0}).then(e=>{var a;const u=((a=e.data.data)==null?void 0:a.filter(r=>r.status==="error"))||[];if(u.length)throw new Error(`\u51FA\u9519${u.length}\u4E2A\u5546\u54C1\uFF0C\u539F\u56E0\uFF1A${J.exports.uniq(u.map(r=>r.msg).join("\u3001"))}`);return e}),"\u8BBE\u7F6E"),g([])},{manual:!0}),S=L(async()=>{if(!(l==null?void 0:l.length))return V.warning("\u8BF7\u9009\u62E9\u5546\u54C1");await O({content:`\u786E\u8BA4\u5220\u9664${l.length}\u4E2A\u5546\u54C1`,okText:"\u786E\u8BA4\u5220\u9664"}),await N(()=>A.deleteItems({userLoginAccount:y.userLoginAccount,shopId:n,itemIds:l}),"\u5220\u9664"),g([])},{manual:!0});return o("div",{className:"pr-4",children:[f?null:t(Y,{className:"mb-4 mt-2",initialValues:{repeat:0},formItemConfigList:[{schema:{label:"\u5546\u54C1\u540D\u79F0",field:"item_name"}},{schema:{label:"\u5546\u54C1ID",field:"item_id"}},{schema:{label:"\u9519\u8BEF\u7C7B\u76EE",field:"category_id"},control:"select",controlProps:{options:_}},{schema:{label:"\u5546\u54C1\u91CD\u590D",field:"repeat"},control:"radio",controlProps:{options:[{label:"\u5168\u90E8",value:0},{label:"\u662F",value:1},{label:"\u5426",value:2}]}}],onValuesChange:(e,u)=>{B(u)}}),t("div",{className:"flex mb-4",children:f?t("div",{className:"w-full",children:t(x,{icon:t(le,{}),type:"text",onClick:()=>{D(!1)},children:"\u8FD4\u56DE"})}):o("div",{className:"w-full mb-4 flex gap-4",children:[o(x,{type:"primary",status:"warning",loading:w.loading,onClick:()=>{w.run()},children:["\u8BBE\u7F6E\u7C7B\u76EE\u4E3A\uFF1A\u5176\u4ED6"," ",l.length?`(${l.length})\u4E2A`:""]}),o(x,{type:"primary",status:"danger",loading:S.loading,onClick:()=>{S.run()},children:["\u5220\u9664\u5546\u54C1"," ",l.length?`(${l.length})\u4E2A`:""]}),t(x,{icon:t(U,{}),className:"ml-auto",type:"primary",onClick:()=>{D(!0)},children:"\u7F16\u8F91\u5C5E\u6027"})]})}),f?o("div",{children:[t(oe,{title:"\u4FDD\u5B58\u6210\u529F\u540E\u53EF\u524D\u5F80\u3010\u4FEE\u6539\u51FA\u8D27\u5929\u6570\u3011\uFF0C\u91CD\u65B0\u53D1\u8D77\u4FEE\u6539",type:"info",className:"mb-4"}),t(W.Title,{heading:6,children:"\u4FEE\u6539\u51FA\u9519\u5546\u54C1\u7C7B\u76EE(\u4E0D\u5305\u542B\u91CD\u590D\u7684\u5546\u54C1\u51FA\u9519\u7C7B\u76EE)"}),t(M.Group,{className:"w-full",value:F,onChange:e=>{_.every(u=>e.includes(u.value))?e.push("all"):e.includes("all")&&e.splice(e.indexOf("all"),1),v(e)},children:o(z.Row,{children:[t(z.Col,{span:6,style:{marginBottom:12},children:t(M,{value:"all",onChange:e=>{v(e?[..._.map(u=>u.value),"all"]:[])},children:"\u5168\u9009"})}),_.map(e=>t(z.Col,{span:6,style:{marginBottom:12},children:t(M,{value:e.value,children:e.label})},e.value))]})}),t(ce,{}),(I=s==null?void 0:s.categoryAttributes)==null?void 0:I.filter(e=>F.includes(e.category_id)).map(e=>o("div",{children:[t(W.Title,{heading:6,children:e.display_category_name}),t("div",{children:e.attribute_list.map(u=>{var c,C,E,b;const a=u.attribute_value_list.map(p=>({label:p.display_value_name,value:p.value_id})),r=(b=(E=(C=(c=m[e.category_id])==null?void 0:c.find(p=>p.attribute_id===u.attribute_id))==null?void 0:C.attribute_value_list)==null?void 0:E.find(p=>p.original_value_name===u.original_attribute_name))==null?void 0:b.value_id;return t("div",{children:t(X.Item,{label:u.display_attribute_name,labelCol:{span:4},wrapperCol:{span:20},children:t(de.Group,{value:r,onChange:p=>{const H=T(k({},m),{[e.category_id]:[...(m[e.category_id]||[]).filter(ue=>ue.attribute_id!==u.attribute_id),{attribute_id:u.attribute_id,attribute_value_list:[{original_value_name:u.original_attribute_name,value_id:p}]}]});$(H),q.run(H)},options:a})})},u.attribute_id)})})]},e.category_id))]}):null,f?null:t(me,{rowSelection:{type:"checkbox",selectedRowKeys:l,onChange:e=>{g(e)},onSelectAll:e=>{g(e?j.map(u=>u.detail.item_id):[])}},data:j,rowKey:e=>e.detail.item_id,pagePosition:"tr",pagination:{sizeOptions:[15,20,50,100],defaultPageSize:15,showTotal:!0},columns:[{title:"\u5E8F\u53F7",dataIndex:"index",width:100},{title:"\u5546\u54C1\u540D\u79F0",dataIndex:"item_name",width:600,render(e,u,a){return o("span",{children:[t(pe,{target:"_blank",href:`https://seller.shopee.tw/portal/product/${u.detail.item_id}`,children:u.detail.item_name}),"\uFF08",u.detail.item_id,"\uFF09"]})}},{title:"\u9519\u8BEF\u539F\u56E0",dataIndex:"msg",render(e){const u=e==null?void 0:e.replace(P,"\u5546\u54C1\u91CD\u590D").replace("please check and update","\u8BF7\u68C0\u67E5\u540E\u518D\u66F4\u65B0").replace("is mandatory required","\u662F\u5FC5\u586B\u9879").replace("Attribute","\u5C5E\u6027").replace("requests too frequent","\u9891\u7387\u8FC7\u9AD8\uFF0C\u91CD\u8BD5\u5373\u53EF");return t("div",{children:u})}},{title:"\u7C7B\u76EE",width:200,dataIndex:"detail.categoryInfo.display_category_name"}]})]})},De="/assets/kf1.821d352d.png",ve="/assets/kf2.3c289594.png";const Xe=s=>{var I;const{userInfo:n}=G(e=>e),i=d.exports.useRef(),[B,f]=d.exports.useState(),[D,y]=d.exports.useState(),[F,v]=d.exports.useState(null),[l,g]=d.exports.useState(),[m,$]=d.exports.useState(),[h,j]=d.exports.useState([]),[_]=X.useForm(),{run:q,loading:w}=L(async()=>{const e=await _.validate();return N(()=>A.update(T(k({},e),{userLoginAccount:n.userLoginAccount,shopId:B==null?void 0:B.id}))).then(()=>{f(null)})},{manual:!0}),S=L(e=>N(()=>A.apply({userLoginAccount:n.userLoginAccount,shopId:e}).then(u=>(y(null),i.current.refreshSearchTable(),u))),{manual:!0});return d.exports.useEffect(()=>{let e;function u(){if(!!((h==null?void 0:h.map(r=>r.id))||[]).length)return A.getProcess({userLoginAccount:n.userLoginAccount,shopIds:h.map(r=>r.id)}).then(r=>{v(r.data.data)}).finally(()=>{e=setTimeout(u,2e3)})}return u(),()=>{clearTimeout(e)}},[JSON.stringify(h)]),o("div",{className:"p-4 bg-white",children:[t(xe,{ref:i,getListRequest:(...e)=>be.getList(...e).then(async u=>{const a=await A.getConsumerList({userLoginAccount:n.userLoginAccount,pageNum:1,pageSize:1e3});return u.data.data.list.forEach(r=>{var c,C,E;r.consumerInfo=(E=(C=(c=a==null?void 0:a.data)==null?void 0:c.data)==null?void 0:C.list)==null?void 0:E.find(b=>b.shopId===r.id)}),u}),onDataChange:e=>{j(e.list)},formItemConfigList:[..._e,{schema:{label:"\u64CD\u4F5C",field:"actions"},render(e,u){var C,E,b;const a=(C=F==null?void 0:F.progress)==null?void 0:C[u.id];(E=a==null?void 0:a.list)==null||E.filter(p=>p.status==="error");const r=Number(((b=a==null?void 0:a.value)==null?void 0:b.replace("%",""))||0),c=a==null?void 0:a.errorMsg;return o("div",{className:"flex gap-2",children:[o("div",{className:"flex flex-col items-center",children:[t(x,{type:"text",className:"-ml-4",icon:t(U,{}),onClick:()=>{f(u)},children:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570"}),r===1&&!c?t("div",{className:"flex gap-2 items-center",children:t(Z,{tagInfos:[{text:o(Fe,{children:[t(ge,{size:12,className:"!inline-block mr-1"}),"\u6B63\u5728\u83B7\u53D6\u5546\u54C1\u6570\u91CF..."]}),value:0,color:"green"}],value:0})}):null,r&&r!==1||c?o("div",{className:"pl-4",children:[t(he,{className:"mb-1",percent:r}),(a==null?void 0:a.duration)||c?c?o("div",{className:"text-sm max-w-[600px]",style:{color:"red"},children:[`\u5546\u54C1\u6570\u91CF\uFF1A${a.goodsTotal}\uFF0C\u65F6\u957F\uFF1A${ee(a.duration)}${c}`,t(x,{type:"primary",className:"mt-2",status:"danger",size:"mini",onClick:()=>{$({title:`${u.shopName} - \u4FEE\u6539\u51FA\u9519\u5217\u8868`,shopId:u.id}),g(u.id)},children:"\u67E5\u770B\u9519\u8BEF"})]}):t(Z,{tagInfos:[{text:`\u5546\u54C1\u6570\u91CF\uFF1A${a.goodsTotal}\uFF0C\u65F6\u957F\uFF1A${ee(a.duration)}`,value:0,color:"green"}],value:0}):null]}):null]}),t("div",{children:t(x,{type:"text",className:"-ml-4",loading:S.loading&&(D==null?void 0:D.id)===u.id,icon:t(fe,{}),status:"danger",onClick:async()=>{await O({title:"\u5E73\u53F0\u5185\u6D4B\u671F\u95F4\uFF0C\u6DFB\u52A0\u5BA2\u670D\u5FAE\u4FE1\u514D\u8D39\u4F7F\u7528",okText:"\u7533\u8BF7",content:o("div",{children:[o("div",{className:"mb-2",children:["\u786E\u5B9A\u7533\u8BF7\u6743\u9650\uFF1F\u7533\u8BF7\u540E\u8054\u7CFB\u5BA2\u670D\u540C\u610F\u6388\u6743\uFF1A",Ae]}),o(Ce,{className:"items-start",children:[t(Q,{width:200,src:De}),t(Q,{width:200,src:ve})]})]}),okButtonProps:{status:"default"}}),y(u),S.run(u.id)},children:"\u7533\u8BF7\u6743\u9650"})})]})}}],name:"\u5E97\u94FA\u6388\u6743"}),t(Ee,{title:"\u4FEE\u6539\u51FA\u8D27\u5929\u6570",unmountOnExit:!0,visible:!!B,onCancel:()=>{f(null)},confirmLoading:w,onConfirm:()=>{q()},children:t(Y,{form:_,formItemConfigList:[{schema:{span:24,label:"\u51FA\u8D27\u5929\u6570",field:"day",required:!0},control:"number",controlProps:{max:30,min:2}}]})}),t(ye,{title:m==null?void 0:m.title,width:"80%",visible:!!l,onCancel:()=>g(null),unmountOnExit:!0,onOk:()=>g(null),children:t(Be,{data:(I=F==null?void 0:F.progress)==null?void 0:I[l],shopId:m==null?void 0:m.shopId})})]})};export{Xe as default};
