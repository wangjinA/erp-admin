var L=Object.defineProperty,O=Object.defineProperties;var G=Object.getOwnPropertyDescriptors;var B=Object.getOwnPropertySymbols;var P=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable;var A=(e,r,t)=>r in e?L(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t,a=(e,r)=>{for(var t in r||(r={}))P.call(r,t)&&A(e,t,r[t]);if(B)for(var t of B(r))q.call(r,t)&&A(e,t,r[t]);return e},m=(e,r)=>O(e,G(r));var E=(e,r)=>{var t={};for(var n in e)P.call(e,n)&&r.indexOf(n)<0&&(t[n]=e[n]);if(e!=null&&B)for(var n of B(e))r.indexOf(n)<0&&q.call(e,n)&&(t[n]=e[n]);return t};import{d as V,j as u,P as J,aI as W,F as D,z as K,aJ as S,B as Q,l as w,J as k,ae as X,r as $,aK as Y,N as Z,ai as C,aL as U,I as _,S as ee,aj as M,R as re,aM as H,c as te}from"./vendor.a400a50c.js";/* empty css               *//* empty css              */import{u as ae}from"./index.a61c6fab.js";import{b as i,i as se,c as ne,r as ue}from"./index.468900fe.js";/* empty css              */import{T as oe,b as le}from"./index.8712af64.js";import{H as ie}from"./style.200a6193.js";const pe=e=>{const{label:r,tipContent:t,toolTipProps:n={}}=e;return V("span",{children:[r,u(J,m(a({},n),{content:t,children:u(W,{style:{marginLeft:4}})}))]})},de=({label:e,tips:r,position:t="top"})=>r?u(pe,{label:e,tipContent:r,toolTipProps:{position:t}}):u(D,{children:e});var ce=e=>{const r=ae();return r.loading?u(K,{}):r.data?u(S.Group,m(a({},e),{children:[{label:"\u5168\u90E8",value:void 0},...r.data].map(t=>u(S,{className:"pl-0",value:t.value,children:({checked:n})=>u(Q,{tabIndex:-1,type:n?"primary":"default",children:t.label},t.value||"all")},t.value||"all"))})):u(D,{children:"-"})};const me={get(e){return i.post("/api/role/list",e)},create(e){return i.post("/api/role/insert",a({menuIds:[],roleCode:w.exports.random(0,1e3).toString(),systemAcquiesce:0,tenantryId:0},e))},remove(e){return i.get(`/api/role/remove/${e}`)},update(e){return i.post("/api/role/update",e)},info(e){return i.get(`/api/role/info/${e}`)}},fe={get(e){return i.post("/api/tenantry/role/list",e)},create(e){return i.post("/api/tenantry/role/insert",a({menuIds:[],roleCode:w.exports.random(0,1e3).toString(),systemAcquiesce:0,tenantryId:0},e))},remove(e){return i.get(`/api/tenantry/role/remove/${e}`)},update(e){return i.post("/api/tenantry/role/update",e)},info(e){return i.get(`/api/tenantry/role/info/${e}`)},getRoleUsers(e){return i.get(`/api/tenantry/role/user/info/${e}`)},saveRoleMenu(e){return i.post("/api/tenantry/role/menu/save/or/update",e)},saveRoleUser(e){return i.post("/api/tenantry/role/user/save/or/update",e)},saveRoleUserByAdmin(e){return i.post("/api/tenantry/role/save/or/update/user",e)},saveRoleMenuByAdmin(e){return i.post("/api/tenantry/role/save/or/update/menu",e)}};let T,N;function he(){return T=T||me.get({pageNum:1,pageSize:50}).then(e=>{var r;return(r=e.data.data)==null?void 0:r.list.map(t=>({label:t.roleName,value:t.id}))}),T}function ge(){return N=N||fe.get({pageNum:1,pageSize:50}).then(e=>{var r;return(r=e.data.data)==null?void 0:r.list.map(t=>({label:t.roleName,value:t.id}))}),N}function ye(){return X(()=>se()?he():ge())}const Fe=e=>{const r=ye();return u(k,m(a({placeholder:"\u8BF7\u9009\u62E9"},e),{options:r.data,loading:r.loading}))};var ve=e=>{const R=e,{value:r,onChange:t,autoCard:n=!1,fileSize:g=10}=R,v=E(R,["value","onChange","autoCard","fileSize"]),y=ne(r).filter(Boolean),[d,p]=$.exports.useState(y.map(l=>({uid:l.split("/").pop(),url:l}))),x=`${ue.baseUrl}/api/file/upload`;return u(Y,a({multiple:!1,action:x,fileList:d,imagePreview:!0,accept:"image/*",beforeUpload:l=>{if(l.size>g*1024*1024){const o=`\u56FE\u7247\u5927\u5C0F\u4E0D\u80FD\u8D85\u8FC7${g}M`;return Z.error(o),Promise.reject(new Error(o))}return Promise.resolve()},onRemove:l=>{p(d.filter(o=>o.url!==l.url))},listType:n?d.length?"picture-card":"text":"picture-card",onChange:l=>{const o=l.map(c=>{var F;return m(a({},c),{url:c.url||((F=c.response)==null?void 0:F.data)})});p(o);const h=o.map(c=>c.url).filter(Boolean);if(v.limit===1){const c=h[0];t(c)}else t(h)},tip:`\u4EC5\u652F\u6301${g}M\u4EE5\u4E0B`,onProgress:l=>{p(o=>o.map(h=>h.uid===l.uid?l:h))}},v))};const xe={flex:1},Re=v=>{var y=v,{schema:e,control:r,formItemProps:t,controlProps:n}=y,g=E(y,["schema","control","formItemProps","controlProps"]);const{field:d,label:p="",tips:x,position:R,rules:l,defaultValue:o,required:h}=e,c=j=>{if(typeof r=="function")return r(j);if(typeof r=="object")return r;switch(r){case void 0:case"input":return u(M,a({placeholder:`\u8BF7\u8F93\u5165${p}`,allowClear:!0},n));case"radio":return u(S.Group,a({type:"button"},n));case"textarea":return u(M.TextArea,a({placeholder:"\u8BF7\u8F93\u5165",rows:4},n));case"switch":return u(ee,a({checkedText:"\u662F",uncheckedText:"\u5426"},n));case"select":return u(k,a({allowClear:!0,placeholder:`\u8BF7\u9009\u62E9${p}`},n));case"upload":return u(ve,a({},n));case"number":return u(_,a({placeholder:`\u8BF7\u8F93\u5165${p}`},n));case"datePicker":return u(U,a(a({},le),n));case"datePickerRange":return u(U.RangePicker,a(a({className:"w-full"},oe),n));case"entrepotRadio":return u(ce,a({},n));case"role":return u(Fe,a({},n));default:return u("span",{children:r})}},F=o!==void 0?{initialValue:o}:{};return u(C.Item,m(a(a(a({colon:p?":":"",label:u(de,{label:p,tips:x,position:R}),field:d,rules:l||h?[{required:!0,message:["input","number"].includes(r)?`\u8BF7\u8F93\u5165${p}`:`\u8BF7\u5B8C\u5584${p}`}]:[],labelCol:{style:a({},p?{}:{display:"none"})},wrapperCol:xe},F),t),w.exports.omit(g,["render","showItemHandle","hideTable"])),{children:c(a({},e))}),d)};function be(e){return e.reduce((r,t)=>(t.schema.defaultValue!==void 0&&(r[t.schema.field]=t.schema.defaultValue),r),{})}const Ie=re.forwardRef((R,x)=>{var l=R,{formItemConfigList:e,className:r="",labelCol:t,onValuesChange:n,gutter:g=[0,10],span:v=8,labelLength:y,initialValues:d}=l,p=E(l,["formItemConfigList","className","labelCol","onValuesChange","gutter","span","labelLength","initialValues"]);const o=$.exports.useRef(),[h,c]=$.exports.useState();$.exports.useImperativeHandle(x,()=>o.current),$.exports.useEffect(()=>{const s=a(a(a({},d),o.current.getFieldsValue()),be(e));setTimeout(()=>{var f;(f=o.current)==null||f.setFieldsValue(s),c(s)})},[e.map(s=>s.schema.field).toString()]);const F=e.some(s=>{var f,b,I;return s.schema.required||((f=s.formItemProps)==null?void 0:f.required)||((I=(b=s.formItemProps)==null?void 0:b.rules)==null?void 0:I.some(z=>z.required))})?.6:0,j=y||w.exports.max(e.map(s=>w.exports.isString(s.schema.label)?s.schema.label.length:0))+2+F;return u(C,m(a({ref:o,layout:"inline",labelCol:m(a({},t),{style:a({flex:`0 0 ${j}em`},t==null?void 0:t.style)}),onSubmit:s=>{console.log(s)},wrapperCol:{className:"w-0 flex-1"},onValuesChange:s=>{const f=o.current.getFieldsValue();n==null||n(s,f),c(f)},initialValues:d},p),{className:`${r} bg-white`,children:u(H.Row,{gutter:g,className:"w-full",children:[...e].filter(s=>s.schema.field||s.schema.key).map(s=>{var f,b,I;return(s.showItemHandle?s.showItemHandle(h):!0)?u(H.Col,{className:te(((f=s.formItemProps)==null?void 0:f.hidden)?ie:""),span:s.schema.span||v,children:Re(m(a({},s),{formItemProps:m(a({},s.formItemProps),{labelCol:m(a(a({},t),(b=s.formItemProps)==null?void 0:b.labelCol),{style:s.schema.label?a({flex:`0 0 ${j}em`},t==null?void 0:t.style):{display:"none"}})}),schema:m(a({},s.schema),{defaultValue:(I=d==null?void 0:d[s.schema.field])!=null?I:s.schema.defaultValue})}))},s.schema.field||s.schema.key):null})})}))});var qe=Ie;export{ce as E,qe as F,fe as a,me as r};
