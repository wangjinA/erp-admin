import{r,a as h,j as a,i as p,d as n,bk as w,bl as f,aB as v,ap as j,aE as C,aK as S}from"./vendor.073dee25.js";/* empty css               *//* empty css               *//* empty css              */import{u as I}from"./index.76707136.js";import{i as T}from"./index.80374888.js";const L="_symbol_okjyb_1";var $={symbol:L};function F(){const t=I(T),[s,c]=r.exports.useState(0),[d,u]=r.exports.useState([]),[m,l]=r.exports.useState(!0),[o,x]=r.exports.useState(1),[y,g]=r.exports.useState(0),i=r.exports.useCallback(()=>{l(!0),h.get(`/api/workplace/popular-contents?page=${o}&pageSize=5&category=${s}`).then(e=>{u(e.data.list),g(e.data.total)}).finally(()=>{l(!1)})},[o,s]);r.exports.useEffect(()=>{i()},[o,i]);const b=[{title:t["workplace.column.rank"],dataIndex:"rank",width:65},{title:t["workplace.column.title"],dataIndex:"title",render:e=>a(p.Paragraph,{style:{margin:0},ellipsis:!0,children:e})},{title:t["workplace.column.pv"],dataIndex:"pv",width:100,render:e=>`${e/1e3}k`},{title:t["workplace.column.increase"],dataIndex:"increase",sorter:(e,k)=>e.increase-k.increase,width:110,render:e=>n("span",{children:[`${(e*100).toFixed(2)}%`,a("span",{className:$.symbol,children:e<0?a(w,{style:{color:"rgb(var(--green-6))"}}):a(f,{style:{color:"rgb(var(--red-6))"}})})]})}];return n(v,{children:[n("div",{style:{display:"flex",justifyContent:"space-between"},children:[a(p.Title,{heading:6,children:t["workplace.popularContents"]}),a(j,{children:t["workplace.seeMore"]})]}),a(C.Group,{type:"button",value:s,onChange:c,options:[{label:t["workplace.text"],value:0},{label:t["workplace.image"],value:1},{label:t["workplace.video"],value:2}],style:{marginBottom:16}}),a(S,{rowKey:"rank",columns:b,data:d,loading:m,tableLayoutFixed:!0,onChange:e=>{x(e.current)},pagination:{total:y,current:o,pageSize:5,simple:!0}})]})}export{F as default};
