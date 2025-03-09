import{aw as xe,r as C,j as ne,e as de,a as v,bj as Ie,F as ge,as as pe,g as we,an as ve,R as Ce,C as De,ak as ke,ac as Pe,N as he,E as Ne,B as _e,f as Le,Q as me,K as Re,b0 as Ee,a$ as je}from"./index.70dbfa87.js";import{I as Ae}from"./index.d1a5dce5.js";var ye=globalThis&&globalThis.__assign||function(){return ye=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},ye.apply(this,arguments)},fe=globalThis&&globalThis.__read||function(e,r){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var t=n.call(e),a,l=[],b;try{for(;(r===void 0||r-- >0)&&!(a=t.next()).done;)l.push(a.value)}catch(o){b={error:o}}finally{try{a&&!a.done&&(n=t.return)&&n.call(t)}finally{if(b)throw b.error}}return l};function Ve(e){var r,n=e.className,t=e.prefixCls,a=e.render,l=e.item,b=e.selectedKeys,o=e.disabled,Y=e.draggable,D=e.droppable,H=e.allowClear,Q=e.onItemSelect,K=e.onItemRemove,L=e.onDragStart,T=e.onDragEnd,ee=e.onDragLeave,q=e.onDragOver,k=e.onDrop,_=xe(),m=t+"-view-item",re=C.exports.useRef(null),R=C.exports.useRef(null),z=fe(C.exports.useState("none"),2),P=z[0],O=z[1],E=fe(C.exports.useState(!1),2),te=E[0],p=E[1],j=fe(C.exports.useState(0),2),M=j[0],I=j[1],A=o||l.disabled,U=Y&&!A,G=b.indexOf(l.key)>-1,V=a?a(l):l.value;return C.exports.useEffect(function(){return function(){R.current&&clearTimeout(R.current)}},[]),C.exports.useEffect(function(){P==="dragged"&&(R.current=setTimeout(function(){return O("none")},1e3))},[P]),ne("li",{ref:re,className:de(m,(r={},r[m+"-disabled"]=A,r[m+"-draggable"]=U,r[m+"-gap-top"]=te&&M<0,r[m+"-gap-bottom"]=te&&M>0,r[m+"-"+P]=P!=="none",r),n),draggable:U,onDragStart:function(s){s.stopPropagation(),O("dragging"),L&&L(s,l);try{s.dataTransfer.setData("text/plain","")}catch{}},onDragEnd:function(s){s.stopPropagation(),p(!1),O("dragged"),T&&T(s,l)},onDragOver:function(s){if(D){s.stopPropagation(),s.preventDefault();var W=re.current.getBoundingClientRect(),J=window.pageYOffset+W.top+W.height/2,F=s.pageY>J?1:-1;p(!0),I(F),q&&q(s,l)}},onDragLeave:function(s){D&&(s.stopPropagation(),p(!1),ee&&ee(s,l))},onDrop:function(s){D&&(s.stopPropagation(),s.preventDefault(),p(!1),I(0),O("none"),k&&k(s,l,M))},children:[Y?v(Ie,{className:m+"-icon-drag"}):null,H?ne(ge,{children:[v("span",{className:m+"-content",children:V}),!A&&v(pe,{...ye({className:m+"-icon-remove",onClick:function(){return K(l.key)},tabIndex:0,role:"button"},_({onPressEnter:function(){return K(l.key)}})),children:v(we,{})})]}):v(ve,{className:m+"-content",checked:G,disabled:A,onChange:function(s){return Q(l.key,s)},children:V})]},l.key)}var Z=globalThis&&globalThis.__assign||function(){return Z=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},Z.apply(this,arguments)},oe=globalThis&&globalThis.__read||function(e,r){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var t=n.call(e),a,l=[],b;try{for(;(r===void 0||r-- >0)&&!(a=t.next()).done;)l.push(a.value)}catch(o){b={error:o}}finally{try{a&&!a.done&&(n=t.return)&&n.call(t)}finally{if(b)throw b.error}}return l},Se=globalThis&&globalThis.__spreadArray||function(e,r,n){if(n||arguments.length===2)for(var t=0,a=r.length,l;t<a;t++)(l||!(t in r))&&(l||(l=Array.prototype.slice.call(r,0,t)),l[t]=r[t]);return e.concat(l||Array.prototype.slice.call(r))},Fe=function(e,r){var n=xe(),t=e.style,a=e.prefixCls,l=e.className,b=e.listType,o=e.dataSource,Y=e.selectedKeys,D=Y===void 0?[]:Y,H=e.validKeys,Q=e.selectedDisabledKeys,K=e.title,L=K===void 0?"":K,T=e.disabled,ee=e.draggable,q=e.allowClear,k=e.showSearch,_=e.showFooter,m=e.searchPlaceholder,re=e.render,R=e.renderList,z=e.pagination,P=e.handleSelect,O=e.handleRemove,E=e.filterOption,te=e.renderHeaderUnit,p=e.virtualListProps,j=e.onSearch,M=e.onResetData,I=e.onDragStart,A=e.onDragEnd,U=e.onDragLeave,G=e.onDragOver,V=e.onDrop,s=a+"-view",W=C.exports.useContext(De).locale,J=oe(C.exports.useState(null),2),F=J[0],N=J[1],$=oe(C.exports.useState(""),2),B=$[0],ue=$[1],ie=oe(C.exports.useState(o),2),X=ie[0],i=ie[1];C.exports.useEffect(function(){i(B?o.filter(function(c){return E(B,c)}):o)},[o,B,E]);var h=function(c,S){return P(S?D.concat(c):D.filter(function(d){return d!==c}))},g=function(c,S){return P(S?Se([],oe(new Set(D.concat(c))),!1):D.filter(function(d){return c.indexOf(d)===-1}))},u=function(c){return function(){return O(c)}},f=v(ke,{...Z({size:"small",disabled:T,placeholder:m,suffix:v(Pe,{})},he(k)?k:{},{onChange:function(c,S){ue(c),j&&j(c),he(k)&&k.onChange&&k.onChange(c,S)}})}),x=function(){var c=D.length,S=X.length,d=B?H.filter(function(le){return X.find(function(Te){var Oe=Te.key;return Oe===le})}):H,y=d.filter(function(le){return D.indexOf(le)>-1}).length,ce={disabled:T,checked:y>0&&y===d.length,indeterminate:y>0&&y<d.length,onChange:function(le){return g(d,le)}};if(typeof L=="function")return L({countTotal:S,countSelected:c,clear:u(d),checkbox:v(ve,{...Z({},ce)}),searchInput:f});var be=v("span",{className:s+"-header-unit",children:te(c,S)});return q?ne(ge,{children:[v("span",{className:s+"-header-title",children:L}),be,!T&&H.length?v(pe,{...Z({className:s+"-icon-clear",onClick:u(d),tabIndex:0,role:"button"},n({onPressEnter:u(d)})),children:v(Ae,{})}):null]}):ne(ge,{children:[v("span",{className:s+"-header-title",children:v(ve,{...Z({},ce),children:L})}),be]})},w=function(){var c=R&&R({listType:b,disabled:T,selectedKeys:D,validKeys:H,selectedDisabledKeys:Q,filteredItems:X,onItemRemove:function(S){return O([S])},onItemSelect:h,onItemSelectAll:function(S,d){P(d?S.concat(Q):Se([],oe(Q),!1))}});return c?v("div",{className:s+"-custom-list",children:c}):v(Ne,{bordered:!1,paginationInFooter:!0,virtualListProps:p,wrapperClassName:s+"-list",dataSource:X,pagination:z?Z({simple:!0,size:"mini"},typeof z=="object"?z:{}):void 0,footer:_===!0?v(_e,{size:"mini",disabled:T,onClick:M,children:W.Transfer.resetText}):_||null,render:function(S){return v(Ve,{prefixCls:a,item:S,disabled:T,draggable:ee,droppable:!!F,allowClear:q,render:re,selectedKeys:D,onItemSelect:function(d,y){return h(d,y)},onItemRemove:function(d){return O([d])},onDragStart:function(d,y){N(y),I&&I(d,y)},onDragEnd:function(d,y){N(null),A&&A(d,y)},onDragLeave:function(d,y){return U&&U(d,y)},onDragOver:function(d,y){return G&&G(d,y)},onDrop:function(d,y,ce){V&&F&&F.key!==y.key&&V({e:d,dropItem:y,dropPosition:ce,dragItem:F})}},S.key)}})};return ne("div",{ref:r,className:de(s,l),style:t,children:[v("div",{className:s+"-header",children:x()}),k&&v("div",{className:s+"-search",children:f}),w()]})},$e=Ce.forwardRef(Fe),Be=$e,se=globalThis&&globalThis.__assign||function(){return se=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++){r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},se.apply(this,arguments)},He=globalThis&&globalThis.__rest||function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,t=Object.getOwnPropertySymbols(e);a<t.length;a++)r.indexOf(t[a])<0&&Object.prototype.propertyIsEnumerable.call(e,t[a])&&(n[t[a]]=e[t[a]]);return n},ae=globalThis&&globalThis.__read||function(e,r){var n=typeof Symbol=="function"&&e[Symbol.iterator];if(!n)return e;var t=n.call(e),a,l=[],b;try{for(;(r===void 0||r-- >0)&&!(a=t.next()).done;)l.push(a.value)}catch(o){b={error:o}}finally{try{a&&!a.done&&(n=t.return)&&n.call(t)}finally{if(b)throw b.error}}return l},ze={titleTexts:["Source","Target"],defaultSelectedKeys:[],defaultTargetKeys:[],dataSource:[],filterOption:function(e,r){return typeof(r==null?void 0:r.value)=="string"&&r.value.indexOf(e)!==-1}};function Me(e,r){var n,t=C.exports.useContext(De),a=t.getPrefixCls,l=t.componentConfig,b=t.rtl,o=Le(e,ze,l==null?void 0:l.Transfer),Y=o.prefixCls,D=o.style,H=o.className,Q=o.children,K=o.dataSource,L=o.defaultTargetKeys,T=o.defaultSelectedKeys,ee=o.targetKeys,q=o.selectedKeys,k=o.oneWay,_=o.simple,m=o.disabled,re=o.titleTexts,R=o.operationTexts,z=o.operationStyle,P=o.onSearch,O=o.onChange,E=o.onSelectChange,te=He(o,["prefixCls","style","className","children","dataSource","defaultTargetKeys","defaultSelectedKeys","targetKeys","selectedKeys","oneWay","simple","disabled","titleTexts","operationTexts","operationStyle","onSearch","onChange","onSelectChange"]),p=Y||a("transfer"),j=!!(_||k),M=ae(me([],{value:ee,defaultValue:_?L.concat(T):L}),2),I=M[0],A=M[1],U=ae(me([],{value:q,defaultValue:_?[]:T}),2),G=U[0],V=U[1],s=ae(C.exports.useMemo(function(){return[[],[]]},[K,I]),2),W=s[0],J=s[1],F=ae(C.exports.useMemo(function(){W.length=0,J.length=0;var i={dataSource:W,selectedKeys:[],validKeys:[],selectedValidKeys:[],selectedDisabledKeys:[]},h={dataSource:J,selectedKeys:[],validKeys:[],selectedValidKeys:[],selectedDisabledKeys:[]};return K.forEach(function(g){var u=I.indexOf(g.key)>-1?h:i;g.disabled||u.validKeys.push(g.key),G.indexOf(g.key)>-1&&(u.selectedKeys.push(g.key),g.disabled?u.selectedDisabledKeys.push(g.key):u.selectedValidKeys.push(g.key)),u.dataSource.push(g)}),he(_)&&_.retainSelectedItems&&(Object.entries(i).forEach(function(g){var u=ae(g,2),f=u[0],x=u[1];Array.isArray(x)&&(i[f]=x.concat(h[f]))}),i.dataSource=K.slice(),i.selectedKeys=I.slice()),[i,h]},[K,I,G,_]),2),N=F[0],$=F[1],B=function(i,h){if(h===void 0&&(h=null),!(Array.isArray(h)&&h.length===0)){h=h||(i==="target"?N.selectedValidKeys:$.selectedValidKeys);var g=i==="target"?I.concat(h).sort(function(u,f){return K.findIndex(function(x){var w=x.key;return w===u})-K.findIndex(function(x){var w=x.key;return w===f})}):I.filter(function(u){return h.indexOf(u)===-1});V(N.selectedDisabledKeys.concat($.selectedDisabledKeys)),A(g),O==null||O(g,i,h)}},ue=function(i,h){if(h==="source")if(_){var g=i.filter(function(f){return N.selectedKeys.indexOf(f)===-1}),u=N.selectedKeys.filter(function(f){return i.indexOf(f)===-1});B("target",g),B("source",u)}else V(i.concat($.selectedKeys)),E&&E(i,$.selectedKeys);else V(N.selectedKeys.concat(i)),E&&E(N.selectedKeys,i)},ie=function(){var i,h=$.selectedKeys.length>0,g=N.selectedKeys.length>0,u=j?["target"]:["target","source"];return _?null:v("div",{style:z,className:de(p+"-operations",(i={},i[p+"-operations-words"]=R,i)),children:u.map(function(f,x){var w,c;return f==="source"?(w=Ee,c=m||!h):(w=je,c=m||!g),v(_e,{tabIndex:c?-1:void 0,"aria-label":"move selected "+(f==="target"?"right":"left"),type:"secondary",size:"small",shape:"round",disabled:c,onClick:function(){return B(f)},icon:v(w,{}),children:R&&R[x]},x)})})},X=function(i){var h=i==="source"?N:$,g=i==="target",u=se({},te);return Object.entries(u).forEach(function(f){var x=ae(f,2),w=x[0],c=x[1],S=["searchPlaceholder","showSearch","showFooter","pagination","listStyle"];S.indexOf(w)>-1&&(u[w]=Array.isArray(c)?c[i==="source"?0:1]:c)}),v(Be,{...se({},h,u,{style:u.listStyle,prefixCls:p,className:p+"-view-"+i,listType:i,title:re[g?1:0],disabled:m,allowClear:g&&j,renderList:Q,handleSelect:function(f){return ue(f,i)},handleRemove:function(f){return B(g?"source":"target",f)},onSearch:function(f){return P&&P(f,i)},renderHeaderUnit:function(f,x){return(j?"":f+" / ")+x}})})};return ne("div",{...se({},Re(o),{ref:r,className:de(p,(n={},n[p+"-simple"]=_,n[p+"-disabled"]=m,n[p+"-rtl"]=b,n),H),style:D}),children:[X("source"),ie(),X("target")]})}var Ke=Ce.forwardRef(Me);Ke.displayName="Transfer";var Ye=Ke;export{Ye as T};
