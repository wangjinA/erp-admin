import{r as u,am as E,bh as R,s as g,a2 as q,a as r,j as i,G as C,c as d,B as v,ab as I,Z as L}from"./index.70dbfa87.js";import{T as M}from"./index.7da7c3b1.js";import{MenuTypeTag as S}from"./index.d20318ff.js";import{r as o,a as j,A as B,P as K,F as w}from"./index.e8394b68.js";import{L as z}from"./index.8115080c.js";import{S as b,F as H,a as G}from"./index.1719ed03.js";import"./statusTag.1d433c1a.js";import"./index.f17798d6.js";import"./index.799a4304.js";import"./index.069ead7c.js";import"./entrepot.ab30483f.js";import"./shopStore.58fa8985.js";import"./clipboard.0b66bc8e.js";import"./index.de762495.js";import"./index.d1a5dce5.js";import"./index.6b177cd3.js";import"./pad.bbb0af94.js";import"./b-tween.es.1edf7b52.js";import"./index.ac2853dc.js";import"./index.9c556245.js";import"./index.503ba2ce.js";import"./index.28b1ce7c.js";import"./index.8324c406.js";import"./style.4b618b1b.js";import"./index.dfe0a253.js";import"./schema.06835865.js";import"./index.cdb98767.js";function ge(){const D=["0-0","0-1","0-0-2"],[N,x]=u.exports.useState([]);u.exports.useState(D);const[e,p]=u.exports.useState(null),[l]=E(),T=R(),[P,c]=u.exports.useState(null),{data:m,loading:y,run:h}=g(()=>o.get({pageNum:1,pageSize:30}).then(t=>(e||p(t.data.data.list[0]),t.data.data.list))),F=g(()=>e!=null&&e.id?o.info(e.id).then(t=>{var n,s;x(((s=(n=t.data)==null?void 0:n.data)==null?void 0:s.menuIds)||[])}):null,{refreshDeps:[e==null?void 0:e.id]}),k=g(t=>q(()=>o.remove(t),"\u5220\u9664").then(()=>{(e==null?void 0:e.id)===t&&p(m==null?void 0:m[0]),h()}),{manual:!0});return r(j,{formRef:l,createRequest:o.create,updateRequest:o.update,refreshRequest:h,children:r(B.Consumer,{children:({showType:t,setShowType:n,createAction:s,updateAction:f})=>i("div",{className:"bg-white p-4 pb-6",children:[i(C.Row,{gutter:[20,0],children:[i(C.Col,{span:6,className:"border-r border-neutral-3 pr-4",children:[i(d.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:[r(d.Title,{heading:6,className:"mb-0",children:"\u7528\u6237\u7EC4"}),r(v,{icon:r(I,{}),type:"primary",size:"small",className:"ml-auto",loading:y||F.loading,onClick:()=>{n(b.create)},children:"\u6DFB\u52A0"})]}),r(z,{loading:y||F.loading,data:m,titleKey:"roleName",active:e==null?void 0:e.id,onUpdate:a=>{c(a),n(b.edit)},onActive:a=>{p(a)},onDelete:a=>k.run(a.id)})]}),i(C.Col,{span:9,className:"border-neutral-3 pr-4",children:[r(d.Paragraph,{className:"flex items-baseline !mb-0 !mt-2",children:r(d.Title,{heading:6,className:"mb-0",children:"\u529F\u80FD\u6743\u9650"})}),r(M,{checkable:!0,autoExpandParent:!1,checkedKeys:N,onCheck:(a,O)=>{x(a)},fieldNames:{title:"menuName",key:"menuId"},renderTitle:a=>i("div",{children:[r("span",{className:"mr-2",children:a.menuName}),r(S,{size:"small",menuType:a.menuType})]}),treeData:T.data||[]}),i("div",{className:"mt-10 flex justify-center gap-4",children:[r(K,{deleteRequest:()=>o.remove(e==null?void 0:e.id).then(a=>(h(),a))}),r(v,{type:"primary",loading:f.loading,onClick:()=>{f.run({...e,menuIds:N})},children:"\u4FDD\u5B58"})]})]})]}),r(L,{unmountOnExit:!0,...H,confirmLoading:s==null?void 0:s.loading,onCancel:()=>{c(null),n(null),l.resetFields()},onOk:async()=>{const a=await l.validate();t===b.create?s.run(a):(await f.run(a),c(null))},visible:!!t,title:`${G[t]}\u7528\u6237\u7EC4`,children:r(w,{initialValues:P,form:l,labelLength:8,span:24,formItemConfigList:[{schema:{label:"\u7528\u6237\u7EC4\u540D\u79F0",span:12,field:"roleName",required:!0},control:"input"}]})})]})})})}export{ge as default};
