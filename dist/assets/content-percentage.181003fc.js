import{r as e,d as f,ay as m,j as o,h as x,E as g,a as h}from"./vendor.019c2987.js";/* empty css               */import{D as y}from"./index.79717135.js";import{u as F}from"./index.923f5d6c.js";import{i as b}from"./index.953fdb56.js";function D(){const a=F(b),[s,n]=e.exports.useState([]),[i,r]=e.exports.useState(!0),l=()=>{r(!0),h.get("/api/workplace/content-percentage").then(t=>{n(t.data)}).finally(()=>{r(!1)})};return e.exports.useEffect(()=>{l()},[]),f(m,{children:[o(x.Title,{heading:6,children:a["workplace.contentPercentage"]}),o(g,{loading:i,style:{display:"block"},children:o(y,{autoFit:!0,height:340,data:s,radius:.7,innerRadius:.65,angleField:"count",colorField:"type",color:["#21CCFF","#313CA9","#249EFF"],interactions:[{type:"element-single-selected"}],tooltip:{showMarkers:!1},label:{visible:!0,type:"spider",formatter:t=>`${(t.percent*100).toFixed(0)}%`,style:{fill:"#86909C",fontSize:14}},legend:{position:"bottom"},statistic:{title:{style:{fontSize:"14px",lineHeight:2,color:"rgb(--var(color-text-1))"},formatter:()=>"\u5185\u5BB9\u91CF"},content:{style:{fontSize:"16px",color:"rgb(--var(color-text-1))"},formatter:(t,c)=>{const d=c.reduce((p,u)=>p+u.count,0);return Number(d).toLocaleString()}}}})})]})}export{D as default};
