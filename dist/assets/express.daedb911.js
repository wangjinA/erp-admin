import{b as t}from"./index.80f47301.js";const a={getClaimList(e){return t.post("/api/parcel/management/claim/list",e)},getProblemList(e){return t.post("/api/parcel/management/problem/list",e)},getRejectList(e){return t.post("/api/reject/management/list",e)},addReject(e){return t.post("/api/reject/management/insert",e)},cancelReject(e){return t.get(`/api/reject/management/cancel/${e}`)},orderCancelReject(e){return t.post("/api/reject/management/order/cancel",e)},getReturnList(e){return t.post("/api/return/management/list",e)},claimHandle(e){return t.get("/api/parcel/management/claim/parcel",{params:e})},updateExpressStatus(e){return t.post("/api/logistics/order/update/order/product/status",e)},returnOperation(e){return t.post("/api/return/management/insert",e)},cancelReturn(e){return t.get(`/api/return/management/cancel/${e}`)},orderCancelReturn(e){return t.post("/api/return/management/order/cancel",e)},getOrderTrack(e){return t.get(`/api/logistics/order/get/tracking/info/${e}`)}};export{a as e};
