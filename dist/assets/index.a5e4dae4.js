import{r as n,aj as p,n as x,d as o,j as s,F,aM as d,h as f,aF as j}from"./vendor.019c2987.js";/* empty css               *//* empty css               */import h from"./index.b1dd8906.js";import{s as B}from"./entrepot.e592173e.js";import{M as E}from"./index.07d39300.js";import{S as N}from"./statusTag.766c2cba.js";import{a as b,f as w}from"./index.923f5d6c.js";import"./index.c844fdd9.js";function c(e){return["\u62D2\u6536","\u5F02\u5E38","\u95EE\u9898"].some(a=>e==null?void 0:e.includes(a))}const C=[{title:"\u5FEB\u9012\u5355\u53F7",dataIndex:"trackingNumber"},{title:"\u4ED3\u5E93",dataIndex:"sendWarehouseName"},{title:"\u8BF4\u660E",dataIndex:"instructions",render(e){const r=c(e)?"error":"success";return s(E,{status:"default",color:N[r],text:e})}},{title:"\u626B\u7801\u65F6\u95F4",dataIndex:"createTime",render(e){return w(e,new Date)}},{title:"\u64CD\u4F5C\u4EBA",dataIndex:"operator"}];var R=()=>{const[e,r]=n.exports.useState(),[a,i]=n.exports.useState([]),{run:m,data:D,loading:l}=p(async t=>{if(a.some(g=>g.trackingNumber===e)){x.error("\u8BE5\u5FEB\u9012\u5355\u53F7\u5DF2\u626B\u7801\uFF0C\u8BF7\u52FF\u91CD\u590D\u626B\u7801");return}const u=await b(()=>B.scanSign(t),"\u7B7E\u6536");u.data.data&&i([u.data.data,...a])},{manual:!0});return console.log(a),o("div",{className:"bg-white py-6 px-4",children:[s(h,{onScan:t=>{console.log(t.trackingNo),r(t.trackingNo),setTimeout(()=>{m(t)})}}),(a==null?void 0:a.length)?o(F,{children:[s(d.Row,{justify:"space-between",align:"center",className:"my-4",children:s(d.Col,{span:16,children:s(f.Title,{heading:6,className:"!mb-0",children:"\u7B7E\u6536\u5217\u8868"})})}),s(j,{loading:l,data:a,columns:C,rowClassName:t=>c(t.instructions)?"error-row":""})]}):null]})};export{c as checkIsProblem,R as default};
