import{b as t}from"./index.923f5d6c.js";const n={list(e){return t.post("/api/menu/list",e)},create(e){return t.post("/api/menu/insert",e)},update(e){return t.post("/api/menu/update",e)},remove(e){return t.get(`/api/menu/remove/${e}`)}};export{n as m};