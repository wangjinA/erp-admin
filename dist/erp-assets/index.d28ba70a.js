import{R as m,r as u,m as O,a as i,_ as d}from"./index.70dbfa87.js";function p(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);a&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,r)}return t}function f(e){for(var a=1;a<arguments.length;a++){var t=arguments[a]!=null?arguments[a]:{};a%2?p(Object(t),!0).forEach(function(r){d(e,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))})}return e}function v(e,a){var t=u.exports.useContext(O),r=t.prefixCls,n=r===void 0?"arco":r,l=e.spin,s=e.className,o=f(f({"aria-hidden":!0,focusable:!1,ref:a},e),{},{className:"".concat(s?s+" ":"").concat(n,"-icon ").concat(n,"-icon-camera")});return l&&(o.className="".concat(o.className," ").concat(n,"-icon-loading")),delete o.spin,delete o.isIcon,i("svg",{fill:"none",stroke:"currentColor",strokeWidth:"4",viewBox:"0 0 48 48",...o,children:i("path",{d:"m33 12-1.862-3.724A.5.5 0 0 0 30.691 8H17.309a.5.5 0 0 0-.447.276L15 12m16 14a7 7 0 1 1-14 0 7 7 0 0 1 14 0ZM7 40h34a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1Z"})})}var c=m.forwardRef(v);c.defaultProps={isIcon:!0};c.displayName="IconCamera";var b=c;export{b as I};
