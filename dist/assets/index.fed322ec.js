var ue=Object.defineProperty,de=Object.defineProperties;var me=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var he=Object.prototype.hasOwnProperty,fe=Object.prototype.propertyIsEnumerable;var W=(s,a,e)=>a in s?ue(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,i=(s,a)=>{for(var e in a||(a={}))he.call(a,e)&&W(s,e,a[e]);if(G)for(var e of G(a))fe.call(a,e)&&W(s,e,a[e]);return s},g=(s,a)=>de(s,me(a));import{R as pe,r as I,ae as H,j as r,_ as Se,ai as _,e as Ce,aA as ye,d as P,l as ge,c as Fe,p as M,B as b,aB as xe,aC as Ie,aD as Pe,aE as be,aF as we,aG as Ve,M as ve}from"./vendor.ad15203e.js";/* empty css               *//* empty css               */import{a as q}from"./index.a07d4460.js";import{F as X}from"./index.05524fc4.js";import{P as je}from"./index.96c0931e.js";import{S as j,F as ke,a as $e}from"./index.b1191912.js";const Y=pe.createContext({}),De=s=>{const{formRef:a,children:e,createRequest:t,updateRequest:o,refreshRequest:n}=s,[S,u]=I.exports.useState(null),m=H(async f=>{t&&(await q(()=>t(f)),a==null||a.resetFields(),u(null),n==null||n())},{manual:!0}),h=H(async f=>{o&&(await q(()=>o(f)),a==null||a.resetFields(),u(null),n==null||n())},{manual:!0});return r(Y.Provider,{value:{showType:S,setShowType:u,createAction:m,updateAction:h},children:e})};function Z(s={}){return Object.entries(s).reduce((a,[e,t])=>{if(["",null,void 0].includes(t))return a;const o=JSON.stringify(t);return a?`${a}&${e}=${encodeURIComponent(o)}`:`?${e}=${encodeURIComponent(o)}`},"")}function Ee(s=location.search.slice(1)){if(!s)return{};const a=s.split("&"),e={};for(const t of a){const[o,n]=t.split("=");try{e[o]=JSON.parse(decodeURIComponent(n))}catch{e[o]=n}}return e}const ee=new Map;function Re(s){const{initialValues:a,cacheId:e,isSearchParams:t=!0}=s,o=Se(),[n,S]=I.exports.useState(i(i(i({},a),e?ee.get(e):{}),t?Ee():{}));return I.exports.useEffect(()=>{if(t){const m=Z(n);o.replace({search:m})}e&&ee.set(e,n)},[n,t,e]),{value:n,setValue:S,resetParams:m=>{const h=m||a;if(t){const f=Z(h);o.replace({search:f})}return S(h),h}}}const Le=I.exports.forwardRef((s,a)=>{const{name:e,formItemConfigList:t,isSearchParams:o=!0,className:n,style:S,majorKey:u="id",tableProps:m,formProps:h,initialValues:f={},createInitialValue:te={},showActions:se=!0,requestQueryTransform:B,leftTool:k,onView:O,createRequest:$,createHandle:D,getListRequest:E,updateRequest:Q,removeRequest:U,editTransform:A}=s,[F]=_.useForm(),[R]=_.useForm(),{value:L,setValue:re,resetParams:ne}=Re({initialValues:f,isSearchParams:o}),[N,oe]=Ce(`${e}-page-size`,{defaultValue:10}),[C,T]=ye(`${e}-page-num`,{defaultValue:1}),{data:y,run:x,loading:z}=H(()=>E==null?void 0:E(g(i({},B?B(L):L),{pageNum:C,pageSize:N})).then(d=>{const p=d.data.data;if(p.total&&p.list.length===0&&C!==1){T(C-1);return}return p}),{refreshDeps:[N,C]});I.exports.useImperativeHandle(a,()=>({refreshSearchTable:x}));const w=t.some(d=>d.isSearch),ie=w||$;return r(De,{formRef:F,createRequest:$,updateRequest:Q,refreshRequest:x,children:r(Y.Consumer,{children:({showType:d,setShowType:p,createAction:V,updateAction:J})=>P("div",{className:n,style:S,children:[w?r(X,g(i({},h),{form:R,initialValues:L,formItemConfigList:ae(t,"isSearch"),onValuesChange:(c,l)=>{re(l)}})):null,ie?P("div",{className:Fe("flex justify-between pr-2",w?"py-6":"pb-6"),children:[P(M,{size:20,children:[($||D)&&r(b,{type:"primary",onClick:()=>{D?D():p(j.create)},icon:r(xe,{}),children:"\u65B0\u5EFA"}),k==null?void 0:k()]}),w?P(M,{size:20,children:[r(b,{type:"default",loading:z,icon:r(Ie,{}),onClick:()=>{R.clearFields(),R.setFieldsValue(ne()),setTimeout(()=>{C===1?x():T(1)})},children:"\u91CD\u7F6E"}),r(b,{type:"primary",icon:r(Pe,{}),loading:z,onClick:()=>x(),children:"\u67E5\u8BE2"})]}):null]}):null,r(be,g(i({rowKey:u,pagination:{pageSize:N,current:C,total:y==null?void 0:y.total,showTotal:!0,sizeCanChange:!0,onChange(c,l){T(c),oe(l)}},data:y==null?void 0:y.list,loading:z},m),{columns:[...Ne(t.filter(c=>!c.hideTable&&c.schema.field!=="actions")),...se?[{title:"\u64CD\u4F5C",key:"actions",width:315,render:(c,l,ce)=>{var v,K;return P(M,{size:0,children:[O&&r(b,{type:"text",icon:r(we,{}),onClick:()=>{O(l)},children:"\u67E5\u770B"}),(K=(v=t.find(le=>le.schema.field==="actions"))==null?void 0:v.render)==null?void 0:K.call(v,c,l,ce),Q&&r(b,{type:"text",status:"warning",icon:r(Ve,{}),onClick:()=>{p(j.edit),F.setFieldsValue(A?A(l):l)},children:"\u7F16\u8F91"}),U&&r(je,{buttonProps:{type:"text"},onOk:()=>q(()=>U(l[u])).then(()=>{x()})})]})}}]:[]]})),r(ve,g(i({},ke),{confirmLoading:(V==null?void 0:V.loading)||J.loading,onCancel:()=>{p(null),F.resetFields()},onOk:async()=>{const c=await F.validate();switch(d){case j.create:V.run(c);break;case j.edit:J.run(c);break}},visible:!!d,title:`${$e[d]}${e}`,children:r(X,{initialValues:te,form:F,labelLength:8,span:12,className:"pb-4 pt-6",formItemConfigList:[...ae(t,"isCreate",{showType:d}),{schema:{field:u},formItemProps:{hidden:!0}}]})}))]})})})});function ae(s,a,e={}){return s.filter(t=>t[a]).map(t=>i(i({},ge.exports.omit(t,["isCreate","isSearch","dynamicHandle"])),t.dynamicHandle?t.dynamicHandle(e):{}))}function Ne(s){return s.filter(e=>{var t;return!((t=e.formItemProps)==null?void 0:t.hidden)}).map(e=>g(i({},e),{title:e.title||e.schema.label,dataIndex:e.schema.field}))}var Ue=Le;export{Y as A,De as C,Ue as S};
