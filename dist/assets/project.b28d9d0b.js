import{b as t,af as d,j as e,aA as o,F as p,at as i,f as x}from"./vendor.eb7e7369.js";/* empty css                *//* empty css                *//* empty css               */const u="_avatar_5xo8m_9",h="_more_5xo8m_12";var s={"project-wrapper":"_project-wrapper_5xo8m_1",avatar:u,more:h};const{Text:n,Title:j}=x;function w(r){const{loading:a,contributors:c}=r;return t(d,{className:s["project-wrapper"],bordered:!0,size:"small",children:[a?e(o,{text:{rows:1},animation:!0}):e(j,{heading:6,children:r.title}),a?e(o,{text:{rows:1},animation:!0,style:{marginTop:"4px"}}):e(n,{type:"secondary",ellipsis:!0,style:{margin:"0"},children:r.enTitle}),e("div",{className:s.avatar,children:a?e(o,{text:{rows:1},animation:!0}):t(p,{children:[e(i.Group,{size:24,children:(c||[]).map((l,m)=>e(i,{children:e("img",{src:l.avatar})},m))}),t(n,{type:"secondary",className:s.more,children:["\u7B49",(r.contributorsLength||0).toLocaleString(),"\u4EBA"]})]})})]})}export{w as default};
