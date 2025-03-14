import{r as _,C as A,f as D,Q as I,e as E,a as g,ar as U,K as $,J as B,N as H,R as J,V as G,j as F,as as K,F as L,at as Q,U as Y}from"./index.177a6609.js";var w=globalThis&&globalThis.__assign||function(){return w=Object.assign||function(n){for(var e,a=1,r=arguments.length;a<r;a++){e=arguments[a];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n},w.apply(this,arguments)},q=globalThis&&globalThis.__read||function(n,e){var a=typeof Symbol=="function"&&n[Symbol.iterator];if(!a)return n;var r=a.call(n),t,i=[],d;try{for(;(e===void 0||e-- >0)&&!(t=r.next()).done;)i.push(t.value)}catch(l){d={error:l}}finally{try{t&&!t.done&&(a=r.return)&&a.call(r)}finally{if(d)throw d.error}}return i},W={type:"radio"},X={type:"radio",mode:"outline",direction:"horizontal"},S=_.exports.createContext(W);function M(n){var e,a=_.exports.useContext(A),r=a.getPrefixCls,t=a.size,i=a.componentConfig,d=a.rtl,l=D(n,X,i==null?void 0:i["Radio.Group"]),s=l.style,f=l.className,o=l.name,m=l.children,b=l.direction,O=l.type,N=l.mode,C=l.options,p=l.disabled,x=q(I(void 0,{defaultValue:l.defaultValue,value:l.value}),2),v=x[0],j=x[1],P=l.size||t,h=r("radio"),T=E(h+"-group",(e={},e[h+"-group-type-button"]=O!=="radio",e[h+"-size-"+P]=!!P,e[h+"-mode-"+N]=!!N,e[h+"-group-disabled"]=p,e[h+"-group-direction-vertical"]=b==="vertical",e[h+"-group-rtl"]=d,e),f),c=function(u,V){var z=l.onChange;u!==v&&("value"in l||j(u),z&&z(u,V))},R={onChangeValue:c,type:O,value:v,disabled:p,group:!0,name:o};return g(S.Provider,{value:R,children:g("div",{...w({className:T,role:"radiogroup",style:s},U(l),$(l)),children:C&&B(C)?C.map(function(u,V){return H(u)?g(y,{disabled:p||u.disabled,value:u.value,children:u.label},u.value):g(y,{value:u,disabled:p,children:u},V)}):m})})}M.displayName="RadioGroup";var k=globalThis&&globalThis.__assign||function(){return k=Object.assign||function(n){for(var e,a=1,r=arguments.length;a<r;a++){e=arguments[a];for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t])}return n},k.apply(this,arguments)},Z=globalThis&&globalThis.__rest||function(n,e){var a={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(a[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,r=Object.getOwnPropertySymbols(n);t<r.length;t++)e.indexOf(r[t])<0&&Object.prototype.propertyIsEnumerable.call(n,r[t])&&(a[r[t]]=n[r[t]]);return a},ee=globalThis&&globalThis.__read||function(n,e){var a=typeof Symbol=="function"&&n[Symbol.iterator];if(!a)return n;var r=a.call(n),t,i=[],d;try{for(;(e===void 0||e-- >0)&&!(t=r.next()).done;)i.push(t.value)}catch(l){d={error:l}}finally{try{t&&!t.done&&(a=r.return)&&a.call(r)}finally{if(d)throw d.error}}return i};function y(n){var e,a=_.exports.useRef(null),r=_.exports.useContext(A),t=r.getPrefixCls,i=r.componentConfig,d=r.rtl,l=D(n,{},i==null?void 0:i.Radio),s=_.exports.useContext(S),f=t("radio"),o=k({},l);s.group&&(o.checked=s.value===l.value,o.disabled="disabled"in l?l.disabled:s.disabled);var m=o.disabled,b=o.children,O=o.value,N=o.style,C=o.className,p=Z(o,["disabled","children","value","style","className"]),x=ee(I(!1,{value:o.checked,defaultValue:o.defaultChecked}),2),v=x[0],j=x[1],P=E(""+f+(s.type==="button"?"-button":""),(e={},e[f+"-checked"]=v,e[f+"-disabled"]=m,e[f+"-rtl"]=d,e),C),h=function(c){var R=o.onChange,u=o.value;m||(s.group?s.onChangeValue&&s.onChangeValue(u,c):!("checked"in l)&&!v&&j(!0),!v&&R&&R(!0,c))},T=J.useCallback(function(c){G(l.children)&&(c.preventDefault(),a.current&&a.current.click()),p.onClick&&p.onClick(c)},[l.children,p.onClick]);return F("label",{...k({},K(p,["checked","onChange"]),{onClick:T,style:N,className:P}),children:[g("input",{...k({ref:a,disabled:m,value:O||"",type:"radio"},s.name?{name:s.name}:{},{checked:v,onChange:function(c){c.persist(),h(c)},onClick:function(c){c.stopPropagation()}})}),G(b)?b({checked:v}):s.type==="radio"?F(L,{children:[g(Q,{prefix:f,className:f+"-mask-wrapper",disabled:v||m,children:g("div",{className:f+"-mask"})}),!Y(b)&&g("span",{className:f+"-text",children:b})]}):s.type==="button"&&g("span",{className:f+"-button-inner",children:b})]})}y.__BYTE_RADIO=!0;y.displayName="Radio";y.Group=M;y.GroupContext=S;export{y as R};
