import{b as l,j as t,aP as m,f as n}from"./vendor.eb7e7369.js";/* empty css                */var i={"customer-tooltip-title":"_customer-tooltip-title_1bc0l_1","customer-tooltip-item":"_customer-tooltip-item_1bc0l_4"};const{Text:r}=n;function h(e){const{formatter:c=o=>o,color:s,name:a}=e;return l("div",{className:i["customer-tooltip"],children:[t("div",{className:i["customer-tooltip-title"],children:t(r,{bold:!0,children:e.title})}),t("div",{children:e.data.map((o,d)=>l("div",{className:i["customer-tooltip-item"],children:[l("div",{children:[t(m,{color:s||o.color}),a||o.name]}),t("div",{children:t(r,{bold:!0,children:c(o.value)})})]},d))})]})}export{h as C};
