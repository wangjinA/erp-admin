import{c as m,j as e,d as a,s as l,h as i,b1 as n,b2 as r}from"./vendor.019c2987.js";var s={"message-item":"_message-item_r05tj_1","message-item-footer":"_message-item-footer_r05tj_7","message-item-actions":"_message-item-actions_r05tj_12","message-item-actions-item":"_message-item-actions-item_r05tj_16","message-item-collected":"_message-item-collected_r05tj_34","message-item-actions-collect":"_message-item-actions-collect_r05tj_34"};function d(c){const{data:t={}}=c,o=m(s["message-item"],{[s["message-item-collected"]]:t.isCollect});return e("div",{className:o,children:a(l,{size:4,direction:"vertical",style:{width:"100%"},children:[e(i.Text,{type:"warning",children:t.username}),e(i.Text,{children:t.content}),a("div",{className:s["message-item-footer"],children:[e("div",{className:s["message-item-time"],children:e(i.Text,{type:"secondary",children:t.time})}),a("div",{className:s["message-item-actions"],children:[e("div",{className:s["message-item-actions-item"],children:e(n,{})}),e("div",{className:m(s["message-item-actions-item"],s["message-item-actions-collect"]),children:e(r,{})})]})]})]})})}var _=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:d});export{d as M,_ as i,s};
