import{b as e}from"./index.31234e72.js";const n={getList(t){return e.post("/api/tenantry/list",t)},getDPList(t){return e.post("/api/tenantry/list/user",t)},get(t){return e.get("/api/tenantry/info/${id}")},create(t){return e.post("/api/tenantry/insert",t)},update(t){return e.post("/api/tenantry/update",t)},remove(t){return e.get(`/api/tenantry/remove/${t}`)}};export{n as t};
