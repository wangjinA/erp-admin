var j=Object.defineProperty,D=Object.defineProperties;var g=Object.getOwnPropertyDescriptors;var l=Object.getOwnPropertySymbols;var C=Object.prototype.hasOwnProperty,S=Object.prototype.propertyIsEnumerable;var d=(t,s,a)=>s in t?j(t,s,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[s]=a,n=(t,s)=>{for(var a in s||(s={}))C.call(s,a)&&d(t,a,s[a]);if(l)for(var a of l(s))S.call(s,a)&&d(t,a,s[a]);return t},m=(t,s)=>D(t,g(s));import{r as i,R as E,u as A,af as p,j as u,aS as B,c as I,q as y,B as L}from"./vendor.a27d1a64.js";/* empty css              */import{s as c}from"./shipment.7a994859.js";import{S as N}from"./index.813cbbc4.js";import{D as R}from"./index.85e4c987.js";import{s as k}from"./index.24995e3b.js";import{s as f,a as h,n as v,f as b,o as w}from"./index.f0a84ea1.js";/* empty css               *//* empty css               */import"./index.a9b92500.js";import"./entrepot.b1e1023d.js";import"./index.de8b1cf5.js";import"./shopStore.5bccbd9a.js";import"./index.6eebe71c.js";/* empty css               */import"./schema.06835865.js";import"./index.c4d9ea3b.js";/* empty css              */import"./style.4b618b1b.js";var se=()=>{i.exports.useState();const t=E.useRef(),[s,a]=i.exports.useState();A(e=>e.userInfo);const F=p(async(e,r)=>{await f({content:"\u786E\u5B9A\u4FEE\u6539\uFF1F",okButtonProps:{status:"success"}}),await h(()=>c.agree({shopId:e.shopId,userLoginAccount:e.userLoginAccount,expiredDate:r})),t.current.refreshSearchTable()},{manual:!0}),x=p(async e=>{await f({content:"\u786E\u5B9A\u62D2\u7EDD\uFF1F",okButtonProps:{status:"warning"}}),await h(()=>c.refuse({shopId:e.shopId,userLoginAccount:e.userLoginAccount}),"\u62D2\u7EDD"),t.current.refreshSearchTable()},{manual:!0});return i.exports.useEffect(()=>{t.current.refreshSearchTable()},[JSON.stringify(s)]),u("div",{className:"p-4 bg-white",children:u(N,{ref:t,name:"\u5E97\u94FA\u6388\u6743",getListRequest:e=>c.getConsumerList(m(n(n({},e),v(s)),{searchAll:!0})),tableProps:{onChange(e,r){a(r)}},showActions:!1,formItemConfigList:[{schema:{label:"\u5E8F\u53F7",field:"index"},render(e,r,o){return o+1}},{schema:{label:"\u7528\u6237\u8D26\u6237",field:"userLoginAccount"},isCreate:!0},{schema:{label:"\u7528\u6237\u5907\u6CE8",field:"shopName"},isCreate:!0},{schema:{label:"\u5E97\u94FA\u540D\u79F0",field:"shopName"},isCreate:!0},{schema:{label:"\u6FC0\u6D3B\u65F6\u95F4",field:"activateDate"},render(e){return e?b(e):"-"}},{schema:{label:"\u7533\u8BF7\u65F6\u95F4",field:"applyForDate"},render(e){return e?b(e):"-"}},{schema:{label:"\u8FC7\u671F\u65F6\u95F4",field:"expiredDate"},render(e,r){return u(B,{className:I("date-picker-color-change",w(e)),style:{width:130},shortcuts:k,allowClear:!1,defaultValue:e,onChange:o=>{F.run(r,o)}})},sorter:()=>null},{schema:{label:"\u6388\u6743\u72B6\u6001",field:"status"},render(e){return u(R,{dictCode:"shopee_utils_status",value:e})}},{schema:{label:"\u64CD\u4F5C",field:"operator"},title:"\u64CD\u4F5C",dataIndex:"operator",render(e,r){return u(y,{children:(r==null?void 0:r.status)==="1"?u(L,{type:"primary",size:"mini",status:"danger",onClick:()=>x.run(r),children:"\u62D2\u7EDD"}):null})}}]})})};export{se as default};
