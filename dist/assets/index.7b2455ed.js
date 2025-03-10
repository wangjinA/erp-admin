import{r as p,D as L,C as B,c as J,j as V,E as q,z as F,G,R as N,g as Q,H as I,a as D,o as W,F as X,J as Y,K as Z}from"./index.08c3b40b.js";var z=globalThis&&globalThis.__assign||function(){return z=Object.assign||function(r){for(var a,t=1,e=arguments.length;t<e;t++){a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(r[l]=a[l])}return r},z.apply(this,arguments)},M=globalThis&&globalThis.__read||function(r,a){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var e=t.call(r),l,n=[],c;try{for(;(a===void 0||a-- >0)&&!(l=e.next()).done;)n.push(l.value)}catch(h){c={error:h}}finally{try{l&&!l.done&&(t=e.return)&&t.call(e)}finally{if(c)throw c.error}}return n},H=globalThis&&globalThis.__spreadArray||function(r,a,t){if(t||arguments.length===2)for(var e=0,l=a.length,n;e<l;e++)(n||!(e in a))&&(n||(n=Array.prototype.slice.call(a,0,e)),n[e]=a[e]);return r.concat(n||Array.prototype.slice.call(a))},ee={isCheckboxGroup:!1,checkboxGroupValue:[],onGroupChange:function(){},registerValue:function(){},unRegisterValue:function(){}},K=p.exports.createContext(ee);function U(r){var a,t=M(L([],{defaultValue:"defaultValue"in r?r.defaultValue||[]:void 0,value:"value"in r?r.value||[]:void 0}),2),e=t[0],l=t[1],n=M(p.exports.useState([]),2),c=n[0],h=n[1],s=p.exports.useContext(B),g=s.getPrefixCls,d=s.rtl,_=r.disabled,o=r.options,S=r.style,y=r.className,w=r.error,f=r.children,m=r.direction,x=m===void 0?"horizontal":m,u=g("checkbox"),C=J(u+"-group",(a={},a[u+"-group-is-error"]=w,a[u+"-group-direction-"+x]=x,a[u+"-group-rtl"]=d,a),y),k=p.exports.useCallback(function(i,v,A){var O=e.slice();v?O.push(i):O.splice(e.indexOf(i),1),l(O),r.onChange&&r.onChange(O.filter(function(E){return c.indexOf(E)>-1}),A)},[e,r.onChange,c]);return V("span",{...z({className:C,style:S},q(r)),children:V(K.Provider,{value:{isCheckboxGroup:!0,checkboxGroupValue:e,onGroupChange:k,disabled:_,registerValue:function(i){h(function(v){return Array.from(new Set(H(H([],M(v),!1),[i],!1)))})},unRegisterValue:function(i){h(function(v){return v.filter(function(A){return A!==i})})}},children:F(o)?o.map(function(i){var v=G(i)?i.label:i,A=G(i)?i.value:i,O=G(i)?i.icon:void 0;return V(ce,{disabled:_||G(i)&&i.disabled,value:A,icon:O,children:v},A)}):f})})}U.displayName="CheckboxGroup";var P=globalThis&&globalThis.__read||function(r,a){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var e=t.call(r),l,n=[],c;try{for(;(a===void 0||a-- >0)&&!(l=e.next()).done;)n.push(l.value)}catch(h){c={error:h}}finally{try{l&&!l.done&&(t=e.return)&&t.call(e)}finally{if(c)throw c.error}}return n},T=globalThis&&globalThis.__spreadArray||function(r,a,t){if(t||arguments.length===2)for(var e=0,l=a.length,n;e<l;e++)(n||!(e in a))&&(n||(n=Array.prototype.slice.call(a,0,e)),n[e]=a[e]);return r.concat(n||Array.prototype.slice.call(a))},re=function(r,a){var t=P(p.exports.useState(T([],P(a||[]),!1)),2),e=t[0],l=t[1],n=p.exports.useMemo(function(){var y=function(f){return e.indexOf(f)>-1},w=function(f,m){var x=F(f)?f:[f],u;m?u=T(T([],P(e),!1),P(x),!1):u=e.filter(function(C){return x.indexOf(C)===-1}),l(Array.from(new Set(u)))};return{isSelected:y,setValueSelected:w}},[e]),c=n.isSelected,h=n.setValueSelected,s=p.exports.useMemo(function(){var y=function(){l(r)},w=function(){l([])},f=function(u){u===void 0&&(u=r);var C=F(u)?u:[u],k=T([],P(e),!1);C.forEach(function(i){var v=k.indexOf(i);v>-1?k.splice(v,1):k.push(i)}),l(k)},m=function(){return r.every(function(u){return c(u)})},x=function(){return r.some(function(u){return c(u)})&&!m()};return{selectAll:y,unSelectAll:w,toggle:f,isAllSelected:m,isPartialSelected:x}},[e,r,c]),g=s.selectAll,d=s.unSelectAll,_=s.toggle,o=s.isAllSelected,S=s.isPartialSelected;return{selected:e,setSelected:l,setValueSelected:h,selectAll:g,unSelectAll:d,toggle:_,isSelected:c,isAllSelected:o,isPartialSelected:S}},ae=re;function le(r){var a=r.className;return N.createElement("svg",{className:a,"aria-hidden":!0,focusable:!1,viewBox:"0 0 1024 1024",width:"200",height:"200",fill:"currentColor"},N.createElement("path",{d:"M877.44815445 206.10060629a64.72691371 64.72691371 0 0 0-95.14856334 4.01306852L380.73381888 685.46812814 235.22771741 533.48933518a64.72691371 64.72691371 0 0 0-92.43003222-1.03563036l-45.82665557 45.82665443a64.72691371 64.72691371 0 0 0-0.90617629 90.61767965l239.61903446 250.10479331a64.72691371 64.72691371 0 0 0 71.19960405 15.14609778 64.33855261 64.33855261 0 0 0 35.08198741-21.23042702l36.24707186-42.71976334 40.5190474-40.77795556-3.36579926-3.49525333 411.40426297-486.74638962a64.72691371 64.72691371 0 0 0-3.88361443-87.64024149l-45.3088404-45.43829334z","p-id":"840"}))}var j=globalThis&&globalThis.__assign||function(){return j=Object.assign||function(r){for(var a,t=1,e=arguments.length;t<e;t++){a=arguments[t];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(r[l]=a[l])}return r},j.apply(this,arguments)},te=globalThis&&globalThis.__rest||function(r,a){var t={};for(var e in r)Object.prototype.hasOwnProperty.call(r,e)&&a.indexOf(e)<0&&(t[e]=r[e]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var l=0,e=Object.getOwnPropertySymbols(r);l<e.length;l++)a.indexOf(e[l])<0&&Object.prototype.propertyIsEnumerable.call(r,e[l])&&(t[e[l]]=r[e[l]]);return t},ne=globalThis&&globalThis.__read||function(r,a){var t=typeof Symbol=="function"&&r[Symbol.iterator];if(!t)return r;var e=t.call(r),l,n=[],c;try{for(;(a===void 0||a-- >0)&&!(l=e.next()).done;)n.push(l.value)}catch(h){c={error:h}}finally{try{l&&!l.done&&(t=e.return)&&t.call(e)}finally{if(c)throw c.error}}return n};function ie(r,a){var t,e=p.exports.useRef(null),l=p.exports.useContext(B),n=l.getPrefixCls,c=l.componentConfig,h=l.rtl,s=Q(r,{},c==null?void 0:c.Checkbox),g=p.exports.useContext(K),d=n("checkbox"),_=g.onGroupChange,o=j({},s);g.isCheckboxGroup&&(o.checked=g.checkboxGroupValue.indexOf(s.value)!==-1,o.disabled="disabled"in s?s.disabled:g.disabled);var S=o.disabled,y=o.children,w=o.className,f=o.value,m=o.style,x=o.indeterminate,u=o.error,C=te(o,["disabled","children","className","value","style","indeterminate","error"]),k=ne(L(!1,{value:o.checked,defaultValue:o.defaultChecked}),2),i=k[0],v=k[1],A=J(d,(t={},t[d+"-disabled"]=!!S,t[d+"-indeterminate"]=!!x,t[d+"-checked"]=i,t[d+"-rtl"]=h,t.error=u,t),w);p.exports.useEffect(function(){return g.registerValue(f),function(){g.unRegisterValue(f)}},[f]);var O=p.exports.useCallback(function(b){b.persist(),b.stopPropagation(),v(b.target.checked),g.isCheckboxGroup&&_&&_(s.value,b.target.checked,b),s.onChange&&s.onChange(b.target.checked,b)},[_,g.isCheckboxGroup,s.onChange,s.value]),E=N.useCallback(function(b){I(s.children)&&(b.preventDefault(),e.current&&e.current.click()),C.onClick&&C.onClick(b)},[s.children,C.onClick]),$=V(le,{className:d+"-mask-icon"});return o.icon&&(N.isValidElement(o.icon)?$=N.cloneElement(o.icon,{className:d+"-mask-icon"}):$=o.icon),D("label",{...j({ref:a,"aria-disabled":S},W(C,["onChange"]),{onClick:E,className:A,style:m}),children:[V("input",{value:f,disabled:!!S,ref:e,checked:!!i,onChange:O,onClick:function(b){return b.stopPropagation()},type:"checkbox"}),I(y)?y({checked:i,indeterminate:x}):D(X,{children:[V(Y,{prefix:d,className:d+"-mask-wrapper",disabled:i||S||x,children:V("div",{className:d+"-mask",children:$})}),!Z(y)&&V("span",{className:d+"-text",children:y})]})]})}var R=N.forwardRef(ie);R.displayName="Checkbox";R.Group=U;R.useCheckbox=ae;var ce=R;export{ce as C};
