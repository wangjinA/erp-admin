import {
  a,
  j as t,
  af as d,
  B as i,
  aE as u,
  M as p,
} from './index.2d355395.js';
function m(o) {
  if (navigator.clipboard)
    return navigator.clipboard.writeText(o).catch(function (c) {
      throw c !== void 0
        ? c
        : new DOMException('The request is not allowed', 'NotAllowedError');
    });
  const e = document.createElement('span');
  (e.textContent = o),
    (e.style.whiteSpace = 'pre'),
    document.body.appendChild(e);
  const n = window.getSelection(),
    r = window.document.createRange();
  n.removeAllRanges(), r.selectNode(e), n.addRange(r);
  let s = !1;
  try {
    s = window.document.execCommand('copy');
  } catch (c) {
    console.log('error', c);
  }
  return (
    n.removeAllRanges(),
    window.document.body.removeChild(e),
    s
      ? Promise.resolve()
      : Promise.reject(
          new DOMException('The request is not allowed', 'NotAllowedError')
        )
  );
}
var l = {
  'code-block': '_code-block_jkvrx_1',
  'code-block-content': '_code-block-content_jkvrx_7',
  'code-block-copy-btn': '_code-block-copy-btn_jkvrx_10',
};
function w(o) {
  const { code: e } = o;
  return a('pre', {
    className: l['code-block'],
    children: [
      t('code', { className: l['code-block-content'], children: e }),
      t(d, {
        content: '\u70B9\u51FB\u590D\u5236\u547D\u4EE4',
        children: t(i, {
          type: 'text',
          className: l['code-block-copy-btn'],
          icon: t(u, {}),
          onClick: () => {
            m(e), p.success('\u590D\u5236\u6210\u529F');
          },
        }),
      }),
    ],
  });
}
export { w as default };
