import{bq as r,j as e,d as c,p as l,B as i,h as a}from"./vendor.019c2987.js";/* empty css               */import{u as p}from"./index.923f5d6c.js";const n={"en-US":{"menu.result":"Result","menu.result.success":"Success","success.result.title":"Submit Success","success.result.subTitle":"Submit form success!","success.result.printResult":"Print result","success.result.projectList":"Project List","success.result.progress":"Progress","success.submitApplication":"Submit Application","success.leaderReview":"Leader Review","success.purchaseCertificate":"Purchase Certificate","success.safetyTest":"Safety Test","success.launched":"Officially launched","success.waiting":"Waiting","success.processing":"Processing"},"zh-CN":{"menu.result":"\u7ED3\u679C\u9875","menu.result.success":"\u6210\u529F\u9875","success.result.title":"\u63D0\u4EA4\u6210\u529F","success.result.subTitle":"\u8868\u5355\u63D0\u4EA4\u6210\u529F\uFF01","success.result.printResult":"\u6253\u5370\u7ED3\u679C","success.result.projectList":"\u8FD4\u56DE\u9879\u76EE\u5217\u8868","success.result.progress":"\u5F53\u524D\u8FDB\u5EA6","success.submitApplication":"\u63D0\u4EA4\u7533\u8BF7","success.leaderReview":"\u76F4\u5C5E\u9886\u5BFC\u5BA1\u6838","success.purchaseCertificate":"\u8D2D\u4E70\u8BC1\u4E66","success.safetyTest":"\u5B89\u5168\u6D4B\u8BD5","success.launched":"\u6B63\u5F0F\u4E0A\u7EBF","success.waiting":"\u672A\u5F00\u59CB","success.processing":"\u8FDB\u884C\u4E2D"}},o="_wrapper_1inht_1",d="_result_1inht_7";var t={wrapper:o,result:d,"steps-wrapper":"_steps-wrapper_1inht_10"};const u=r.Step;function f(){const s=p(n);return e("div",{children:c("div",{className:t.wrapper,children:[e(l,{className:t.result,status:"success",title:s["success.result.title"],subTitle:s["success.result.subTitle"],extra:[e(i,{type:"secondary",style:{marginRight:16},children:s["success.result.printResult"]},"again"),e(i,{type:"primary",children:s["success.result.projectList"]},"back")]}),c("div",{className:t["steps-wrapper"],children:[e(a.Paragraph,{bold:!0,children:s["success.result.progress"]}),c(r,{type:"dot",current:2,children:[e(u,{title:s["success.submitApplication"],description:"2020/10/10 14:00:39"}),e(u,{title:s["success.leaderReview"],description:s["success.processing"]}),e(u,{title:s["success.purchaseCertificate"],description:s["success.waiting"]}),e(u,{title:s["success.safetyTest"],description:s["success.waiting"]}),e(u,{title:s["success.launched"],description:s["success.waiting"]})]})]})]})})}export{f as default};
