var i=Object.defineProperty;var p=Object.getOwnPropertySymbols;var a=Object.prototype.hasOwnProperty,u=Object.prototype.propertyIsEnumerable;var o=(e,r,s)=>r in e?i(e,r,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[r]=s,n=(e,r)=>{for(var s in r||(r={}))a.call(r,s)&&o(e,s,r[s]);if(p)for(var s of p(r))u.call(r,s)&&o(e,s,r[s]);return e};import{b as t}from"./index.923f5d6c.js";const l={getList(e){return t.post("/api/entrepot/list",n({entrepotType:1},e))},getListAll(e){return t.post("/api/entrepot/list/all",n({entrepotType:1},e))},insert(e){return t.post("/api/entrepot/insert",e)},remove(e){return t.get(`/api/entrepot/remove/${e}`)},update(e){return t.post("/api/entrepot/update",e)},getDeliveryHistory(e){return t.post("/api/logistics/order/out/record/list",e)},getSenderAll(e){return t.post("/api/entrepot/sender/list/all",e)},getSenderList(e){return t.post("/api/entrepot/sender/list",e)},removeSender(e){return t.get(`/api/entrepot/sender/remove/${e}`)},insertSender(e){return t.post("/api/entrepot/sender/insert",e)},updateSender(e){return t.post("/api/entrepot/sender/update",e)},updateSenderDefault(e,r){return t.post("/api/entrepot/sender/update/default",{id:e,defaultStatus:r})}},g={getList(e){return t.post("/api/racks/list",e)},insert(e){return t.post("/api/racks/insert",e)},remove(e){return t.get(`/api/racks/remove/${e}`)},update(e){return t.post("/api/racks/update",e)}},m={getRecord(e){return t.post("/api/scanning/record/list",e)},scanPut(e){return t.post("/api/business/operation/scan/put",e)},scanSign(e){return t.post("/api/business/operation/scan/sign",e)},ScanOut(e){return t.post("/api/business/operation/scan/out/storage",e)},outList(e){return t.post("/api/logistics/order/delivery/storage",e.orderIdList)},scanHistory(e){return t.post("/api/sign/record/list",e)}};export{l as e,g as r,m as s};
