var k=Object.defineProperty,I=Object.defineProperties;var C=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var j=(t,e,r)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,u=(t,e)=>{for(var r in e||(e={}))y.call(e,r)&&j(t,r,e[r]);if(p)for(var r of p(e))T.call(e,r)&&j(t,r,e[r]);return t},c=(t,e)=>I(t,C(e));var b=(t,e)=>{var r={};for(var s in t)y.call(t,s)&&e.indexOf(s)<0&&(r[s]=t[s]);if(t!=null&&p)for(var s of p(t))e.indexOf(s)<0&&T.call(t,s)&&(r[s]=t[s]);return r};import{b as L,j as l,t as S,b1 as B,F as N,a8 as g,a9 as R,S as V,as as A,R as D,r as w,at as v,aS as E}from"./vendor.1997470e.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               *//* empty css                */const G=t=>{const{label:e,tipContent:r,toolTipProps:s={}}=t;return L("span",{children:[e,l(S,c(u({},s),{content:r,children:l(B,{style:{marginLeft:4}})}))]})},$=({label:t,tips:e,position:r="top"})=>e?l(G,{label:t,tipContent:e,toolTipProps:{position:r}}):l(N,{children:t}),H=({schema:t,control:e,formItemProps:r,controlProps:s})=>{const{field:o,label:m,tips:i,position:h,rules:F,defaultValue:x}=t,f=a=>{if(!e||e==="input")return l(R,u({placeholder:"\u8BF7\u8F93\u5165",allowClear:!0},s));if(typeof e=="string")switch(e.toLowerCase()){case"radio":return l(A.Group,u({type:"button"},s));case"textarea":return l(R.TextArea,u({placeholder:"\u8BF7\u8F93\u5165",rows:4},s));case"switch":return l(V,u({checkedText:"\u662F",uncheckedText:"\u5426"},s));default:return l("span",{children:e})}else return typeof e=="function"?e(a):e},n=x!==void 0?{initialValue:x}:{};return l(g.Item,c(u(u({label:l($,{label:m,tips:i,position:h}),field:o,rules:F,wrapperCol:{style:{flex:1,width:0}}},n),r),{children:f(u({},t))}),o)},O=t=>t.reduce((e,r)=>(r.schema.defaultValue!==void 0&&(e[r.schema.field]=r.schema.defaultValue),e),{}),P=D.forwardRef((x,F)=>{var f=x,{formItemConfigList:t,className:e="",labelCol:r,onValuesChange:s,gutter:o=12,span:m=8,initialValues:i}=f,h=b(f,["formItemConfigList","className","labelCol","onValuesChange","gutter","span","initialValues"]);const n=w.exports.useRef();return w.exports.useImperativeHandle(F,()=>n.current),w.exports.useEffect(()=>{const a=u(u(u({},i),n.current.getFieldsValue()),O(t));setTimeout(()=>{var d;(d=n.current)==null||d.setFieldsValue(a)})},[t.map(a=>a.schema.field).toString()]),l(g,c(u({ref:n,labelCol:c(u({},r),{style:u({flex:"0 0 6em"},r==null?void 0:r.style)}),wrapperCol:{className:"w-0 flex-1"},onValuesChange:a=>{s==null||s(a,n.current.getFieldsValue())},initialValues:i},h),{className:`${e} bg-white`,children:l(v.Row,{gutter:o,children:[...t].filter(a=>a.schema.field||a.schema.key).map(a=>{var d;return a.control?l(v.Col,{span:a.schema.span||m,children:H(c(u({},a),{schema:c(u({},a.schema),{defaultValue:(d=i==null?void 0:i[a.schema.field])!=null?d:a.schema.defaultValue})}))},a.schema.field||a.schema.key):null})})}))});var Q=P;const W=[{schema:{field:"timeRange",label:"\u65F6\u95F4\u8303\u56F4:"},control:t=>l(E.RangePicker,u({style:{width:"100%"},allowClear:!1,showTime:!0},t))},{schema:{field:"timeType",label:"\u805A\u5408\u65B9\u5F0F:"}}];var Y=()=>l("div",{className:"bg-white",children:l(Q,{formItemConfigList:W})});export{W as EchartCommonFilter,Y as default};
