import{d as t,ax as m,j as e,aT as o,F as p,A as i,i as x}from"./vendor.ad15203e.js";/* empty css               *//* empty css               */const u="_avatar_5xo8m_9",h="_more_5xo8m_12";var s={"project-wrapper":"_project-wrapper_5xo8m_1",avatar:u,more:h};const{Text:n,Title:j}=x;function _(r){const{loading:a,contributors:c}=r;return t(m,{className:s["project-wrapper"],bordered:!0,size:"small",children:[a?e(o,{text:{rows:1},animation:!0}):e(j,{heading:6,children:r.title}),a?e(o,{text:{rows:1},animation:!0,style:{marginTop:"4px"}}):e(n,{type:"secondary",ellipsis:!0,style:{margin:"0"},children:r.enTitle}),e("div",{className:s.avatar,children:a?e(o,{text:{rows:1},animation:!0}):t(p,{children:[e(i.Group,{size:24,children:(c||[]).map((l,d)=>e(i,{children:e("img",{src:l.avatar})},d))}),t(n,{type:"secondary",className:s.more,children:["\u7B49",(r.contributorsLength||0).toLocaleString(),"\u4EBA"]})]})})]})}export{_ as default};
