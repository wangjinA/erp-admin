import{Y as l,j as i,q as c,b as r}from"./vendor.bb408984.js";import j from"./announcement.54c69061.js";import f from"./carousel.424c9bdc.js";import{s as b,M as e}from"./setupMock.df9c0205.js";import x from"./overview.1eb69dff.js";import C from"./shortcuts.3c133bd6.js";import F from"./latest-news.1b2577b8.js";/* empty css               *//* empty css              */import"./index.76e72754.js";import"./index.2043ebfc.js";import"./index.module.fd3800a2.js";import"./entrepot.7377f9af.js";import"./index.055835f8.js";import"./index.9d4791ac.js";/* empty css               */import"./index.aedfa0dd.js";import"./shopStore.cb49cab0.js";import"./clipboard.a809cca0.js";import"./index.c5d4a6d1.js";/* empty css              */import"./index.5a88c625.js";/* empty css               */import"./index.68a41d33.js";import"./index.1ac1b297.js";/* empty css              */import"./style.4b618b1b.js";/* empty css               */import"./schema.06835865.js";b({setup:()=>{e.mock(new RegExp("/api/workplace/overview-content"),()=>{const t=new Date().getFullYear();return{allContents:"373.5w+",liveContents:"368",increaseComments:"8874",growthRate:"3400",chartData:(()=>Array.from({length:12}).fill(0).map((o,s)=>({date:`${t}-${s+1}`,count:e.Random.natural(2e4,75e3)})))()}});const u=()=>{const{list:t}=e.mock({"list|100":[{"rank|+1":1,title:()=>e.Random.pick(["\u7ECF\u6D4E\u65E5\u62A5\uFF1A\u8D22\u653F\u653F\u7B56\u8981\u7CBE\u51C6\u63D0\u5347\u6548\u80FD","\u201C\u53CC12\u201D\u9047\u51B7\u6D88\u8D39\u8005\u538C\u5026\u4E86\u7535\u5546\u5E73\u53F0\u7684\u4FC3\u9500\u201C\u5957\u8DEF\u201D","\u81F4\u656C\u575A\u5B88\u6218\u201C\u75AB\u201D\u4E00\u7EBF\u7684\u793E\u533A\u5DE5\u4F5C\u8005","\u666E\u9AD8\u8FD8\u662F\u804C\u9AD8\uFF1F\u5BB6\u957F\u4EEC\u9677\u5165\u9009\u6821\u96BE\u9898"]),pv:function(){return 5e5-3200*this.rank},increase:"@float(-1, 1)"}]});return t},p=u(),m=u(),d=u();e.mock(new RegExp("/api/workplace/popular-contents"),t=>{const{page:n=1,pageSize:o=5,category:s=0}=l.parseUrl(t.url).query;return{list:[p,m,d][Number(s)].slice((n-1)*o,n*o),total:100}}),e.mock(new RegExp("/api/workplace/content-percentage"),()=>[{type:"\u5206\u7C7B1",count:148564,percent:.16},{type:"\u5206\u7C7B2",count:334271,percent:.36},{type:"\u5206\u7C7B3",count:445695,percent:.48}])}});const g="_banner_14de6_1",w="_wrapper_14de6_5",D="_left_14de6_9",E="_right_14de6_13",_="_panel_14de6_16";var a={banner:g,wrapper:w,left:D,right:E,panel:_};function te(){return i("div",{className:a.wrapper,children:[i(c,{size:16,direction:"vertical",className:a.left,children:[r(x,{}),r(F,{})]}),i(c,{className:a.right,size:16,direction:"vertical",children:[r(C,{}),r(f,{}),r(j,{})]})]})}export{te as default};
