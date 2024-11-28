import{af as y,r as n,d as B,ay as b,j as a,G as i,al as j,h as v,aM as L,a as R}from"./vendor.019c2987.js";/* empty css               */import{u as k}from"./index.923f5d6c.js";import{l as q,C as T}from"./card-block.71a07e2a.js";import{s as c}from"./index.module.6e574a18.js";import M from"./card-add.73527cd8.js";import{s as N,M as t}from"./setupMock.bf327aa9.js";/* empty css               *//* empty css               */import"./index.4cf7fbe8.js";const S=["\u5206\u7C7B1","\u5206\u7C7B2","\u5206\u7C7B3"],w=["\u5386\u53F2\u5BFC\u5165","\u5185\u5BB9\u7248\u6743","\u654F\u611F\u5185\u5BB9","\u5546\u4E1A\u54C1\u724C"],d=["\u6F0F\u6597\u5206\u6790","\u7528\u6237\u5206\u5E03","\u8D44\u6E90\u5206\u53D1","\u7528\u6237\u753B\u50CF\u5206\u6790","\u4E8B\u4EF6\u5206\u6790"],P=["\u7528\u6237\u884C\u4E3A\u5206\u6790\u4E4B\u6F0F\u6597\u5206\u6790\u6A21\u578B\u662F\u4F01\u4E1A\u5B9E\u73B0\u7CBE\u7EC6\u5316\u8FD0\u8425\u3001\u8FDB\u884C\u7528\u6237\u884C\u4E3A\u5206\u6790\u7684\u91CD\u8981\u6570\u636E\u5206\u6790\u6A21\u578B\u3002 ","\u5FEB\u901F\u8BCA\u65AD\u7528\u6237\u4EBA\u7FA4\uFF0C\u5730\u57DF\u7EC6\u5206\u60C5\u51B5\uFF0C\u4E86\u89E3\u6570\u636E\u5206\u5E03\u7684\u96C6\u4E2D\u5EA6\uFF0C\u4EE5\u53CA\u4E3B\u8981\u7684\u6570\u636E\u5206\u5E03\u7684\u533A\u95F4\u6BB5\u662F\u4EC0\u4E48\u3002","\u79FB\u52A8\u7AEF\u52A8\u6001\u5316\u8D44\u6E90\u5206\u53D1\u89E3\u51B3\u65B9\u6848\u3002\u63D0\u4F9B\u7A33\u5B9A\u5927\u6D41\u91CF\u670D\u52A1\u652F\u6301\u3001\u7075\u6D3B\u5B9A\u5236\u7684\u5206\u53D1\u5708\u9009\u89C4\u5219\uFF0C\u901A\u8FC7\u79BB\u7EBF\u5316\u9884\u52A0\u8F7D\u3002  ","\u7528\u6237\u753B\u50CF\u5C31\u662F\u5C06\u5178\u578B\u7528\u6237\u4FE1\u606F\u6807\u7B7E\u5316\uFF0C\u6839\u636E\u7528\u6237\u7279\u5F81\u3001\u4E1A\u52A1\u573A\u666F\u548C\u7528\u6237\u884C\u4E3A\u7B49\u4FE1\u606F\uFF0C\u6784\u5EFA\u4E00\u4E2A\u6807\u7B7E\u5316\u7684\u7528\u6237\u6A21\u578B\u3002 ","\u4E8B\u4EF6\u5206\u6790\u5373\u53EF\u8FDB\u884C\u7B5B\u9009\u3001\u5206\u7EC4\u3001\u805A\u5408\u7684\u7075\u6D3B\u591A\u7EF4\u6570\u636E\u5206\u6790\u3002\u8BE6\u60C5\u8BF7\u70B9\u51FB\u5361\u7247\u3002"],E=["\u5185\u5BB9\u5C4F\u853D\u89C4\u5219","\u5185\u5BB9\u7F6E\u9876\u89C4\u5219","\u5185\u5BB9\u52A0\u6743\u89C4\u5219","\u5185\u5BB9\u5206\u53D1\u89C4\u5219","\u591A\u8BED\u8A00\u6587\u5B57\u7B26\u53F7\u8BC6\u522B"],Y=["\u7528\u6237\u5728\u6267\u884C\u7279\u5B9A\u7684\u5185\u5BB9\u5206\u53D1\u4EFB\u52A1\u65F6\uFF0C\u53EF\u4F7F\u7528\u5185\u5BB9\u5C4F\u853D\u89C4\u5219\u6839\u636E\u7279\u5B9A\u6807\u7B7E\uFF0C\u8FC7\u6EE4\u5185\u5BB9\u96C6\u5408\u3002  ","\u8BE5\u89C4\u5219\u652F\u6301\u7528\u6237\u5728\u6267\u884C\u7279\u5B9A\u5185\u5BB9\u5206\u53D1\u4EFB\u52A1\u65F6\uFF0C\u5BF9\u56FA\u5B9A\u7684\u51E0\u6761\u5185\u5BB9\u7F6E\u9876\u3002","\u9009\u5B9A\u5185\u5BB9\u52A0\u6743\u89C4\u5219\u540E\u53EF\u81EA\u5B9A\u4E49\u4ECE\u4E0D\u540C\u5185\u5BB9\u96C6\u5408\u83B7\u53D6\u5185\u5BB9\u7684\u6982\u7387\u3002","\u5185\u5BB9\u5206\u53D1\u65F6\uFF0C\u5BF9\u67D0\u4E9B\u5185\u5BB9\u9700\u8981\u56FA\u5B9A\u5728C\u7AEF\u5C55\u793A\u7684\u4F4D\u7F6E\u3002","\u7CBE\u51C6\u8BC6\u522B\u82F1\u8BED\u3001\u7EF4\u8BED\u3001\u85CF\u8BED\u3001\u8499\u53E4\u8BED\u3001\u671D\u9C9C\u8BED\u7B49\u591A\u79CD\u8BED\u8A00\u4EE5\u53CAemoji\u8868\u60C5\u5F62\u6001\u7684\u8BED\u4E49\u8BC6\u522B\u3002"],$=()=>{const{list:u}=t.mock({"list|10":[{title:()=>`${t.Random.pick(S)}-${t.Random.pick(w)}`,time:()=>y().subtract(t.Random.natural(0,30),"days").format("YYYY-MM-DD HH:mm:ss"),qualityCount:()=>t.Random.natural(100,500),randomCount:()=>t.Random.natural(0,100),duration:()=>t.Random.natural(0,200)}]});return u},G=()=>{const{list:u}=t.mock({"list|10":[{icon:()=>t.Random.natural(0,d.length-1),title:function(){return d[this.icon]},description:function(){return P[this.icon]},status:()=>t.Random.natural(0,2)}]});return u},H=()=>{const{list:u}=t.mock({"list|10":[{index:()=>t.Random.natural(0,E.length-1),title:function(){return E[this.index]},description:function(){return Y[this.index]},status:()=>t.Random.natural(0,1)}]});return u};N({setup:()=>{t.mock(new RegExp("/api/cardList"),()=>({quality:$(),service:G(),rules:H()}))}});const{Title:C}=v,{Row:K,Col:A}=L,l=new Array(10).fill({});function _(){const u=k(q),[m,D]=n.exports.useState(!0),[o,p]=n.exports.useState({quality:l,service:l,rules:l}),[s,x]=n.exports.useState("all"),h=()=>{R.get("/api/cardList").then(e=>{p(e.data)}).finally(()=>D(!1))};n.exports.useEffect(()=>{h()},[]);const F=(e,r)=>B(K,{gutter:24,className:c["card-content"],children:[r==="quality"&&a(A,{xs:24,sm:12,md:8,lg:6,xl:6,xxl:6,children:a(M,{description:u["cardList.add.quality"]})}),e.map((f,g)=>a(A,{xs:24,sm:12,md:8,lg:6,xl:6,xxl:6,children:a(T,{card:f,type:r,loading:m})},g))]});return B(b,{children:[a(C,{heading:6,children:u["menu.list.card"]}),B(i,{activeTab:s,type:"rounded",onChange:x,extra:a(j.Search,{style:{width:"240px"},placeholder:u[`cardList.tab.${s}.placeholder`]}),children:[a(i.TabPane,{title:u["cardList.tab.title.all"]},"all"),a(i.TabPane,{title:u["cardList.tab.title.quality"]},"quality"),a(i.TabPane,{title:u["cardList.tab.title.service"]},"service"),a(i.TabPane,{title:u["cardList.tab.title.rules"]},"rules")]}),a("div",{className:c.container,children:s==="all"?Object.entries(o).map(([e,r])=>B("div",{children:[a(C,{heading:6,children:u[`cardList.tab.title.${e}`]}),F(r,e)]},e)):a("div",{className:c["single-content"],children:F(o[s],s)})})]})}export{_ as default};
