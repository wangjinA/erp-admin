var O=Object.defineProperty;var F=Object.getOwnPropertySymbols;var Q=Object.prototype.hasOwnProperty,X=Object.prototype.propertyIsEnumerable;var H=(s,a,e)=>a in s?O(s,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[a]=e,S=(s,a)=>{for(var e in a||(a={}))Q.call(a,e)&&H(s,e,a[e]);if(F)for(var e of F(a))X.call(a,e)&&H(s,e,a[e]);return s};import{r as i,aY as T,ag as r}from"./vendor.bb408984.js";import{r as f,e as w}from"./entrepot.7a63f9f2.js";import{S as x}from"./index.68a41d33.js";import{s as c}from"./index.a0706607.js";function at(s){const{isPureList:a}=s,[e,L]=i.exports.useState(),[v,y]=i.exports.useState(x.edit),[k]=T(),[p]=T(),[n,E]=i.exports.useState(null),[j,h]=i.exports.useState(null),[d,l]=i.exports.useState(null),{data:A,loading:D,run:g}=r(async t=>{if(a)return[];p.resetFields(),l(null);const o=S({pageNum:1,pageSize:100,entrepotId:n==null?void 0:n.id},t);if(!o.entrepotId)return[];const R=await f.getList(o),{list:u}=R.data.data;if(u.length){const I=u.find(K=>K.id===(d==null?void 0:d.id))||u[0];l(I),p.setFieldsValue(I)}return u},{manual:!1,refreshDeps:[n],debounceWait:300}),{run:m,data:b,loading:P}=r(async()=>{const t=await w.getList({pageNum:1,pageSize:100,entrepotType:1}),{list:o}=t.data.data;if(o.length){const R=o.find(u=>u.id===(n==null?void 0:n.id))||o[0];E(R)}return o}),{run:z,loading:N}=r(async t=>{await c(()=>w.insert(t)),L(null),m()},{manual:!0}),{run:q,loading:M}=r(async t=>{await c(()=>w.update(t)),L(null),m()},{manual:!0}),{run:U,loading:V}=r(async t=>{await c(()=>f.insert(S({entrepotId:n.id},t))),p.resetFields(),await g({entrepotId:n.id})},{manual:!0}),{run:W,loading:Y}=r(async t=>{await c(()=>f.remove(t)),l(null),await g({entrepotId:n.id})},{manual:!0}),{run:B,loading:C}=r(async t=>{await c(()=>w.remove(t)),E(null),m()},{manual:!0}),{run:G,loading:J}=r(async t=>{await c(()=>f.update(t)),l(null),g({entrepotId:n.id})},{manual:!0});return i.exports.useEffect(()=>{y(d?x.edit:x.create)},[d]),i.exports.useEffect(()=>{e||(h(null),k.clearFields())},[e,k]),{showTypeEntrepot:e,setShowTypeEntrepot:L,formEntrepotRef:k,formRacksRef:p,activeEntrepot:n,setActiveEntrepot:E,racksList:A,rackLoading:D,getRacksList:g,createEntrepotHandler:z,createEntrepotLoading:N,getEntrepotList:m,entrepotList:b,entrepotLoading:P,showTypeRacks:v,setShowTypeRacks:y,activeRacks:d,setActiveRacks:l,createRacksLoading:V,createRacksHandler:U,removeRacksHandler:W,removeRacksLoading:Y,updateRacksHandler:G,updateRacksLoading:J,updateEntrepotHandler:q,updateEntrepotLoading:M,removeEntrepotHandler:B,removeEntrepotLoading:C,updateEntrepotData:j,setUpdateEntrepotData:h}}export{at as useEntrepotInfo};
