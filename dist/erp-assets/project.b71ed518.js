import{j as t,a as r,F as d,bo as s,c as p}from"./index.177a6609.js";import{S as o}from"./index.54b44213.js";import{C as u}from"./index.70c5a716.js";const h="_avatar_1a5rn_9",g="_more_1a5rn_12";var n={"project-wrapper":"_project-wrapper_1a5rn_1",avatar:h,more:g};const{Text:i,Title:y}=p;function j(a){const{loading:e,contributors:c}=a;return t(u,{className:n["project-wrapper"],bordered:!0,size:"small",children:[e?r(o,{text:{rows:1},animation:!0}):r(y,{heading:6,children:a.title}),e?r(o,{text:{rows:1},animation:!0,style:{marginTop:"4px"}}):r(i,{type:"secondary",ellipsis:!0,style:{margin:"0"},children:a.enTitle}),r("div",{className:n.avatar,children:e?r(o,{text:{rows:1},animation:!0}):t(d,{children:[r(s.Group,{size:24,children:(c||[]).map((l,m)=>r(s,{children:r("img",{src:l.avatar})},m))}),t(i,{type:"secondary",className:n.more,children:["\u7B49",(a.contributorsLength||0).toLocaleString(),"\u4EBA"]})]})})]})}export{j as default};
