import{b as e}from"./index.923f5d6c.js";const s={getList(t){return e.post("/api/tenantry/store/list",t)},getAuthLink(){return e.post("/api/tenantry/store/create/accredit/url")},unbind(t){return e.get(`/api/tenantry/store/remove/${t}`)}};export{s};