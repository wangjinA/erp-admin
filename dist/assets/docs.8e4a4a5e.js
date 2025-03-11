import { u as o, a as t, j as e, aG as n } from './index.2d355395.js';
import { C as d } from './index.f7b40193.js';
import { L as r } from './index.034cc5da.js';
import { i as l } from './index.9464998a.js';
const m = '_docs_dimkm_1',
  p = '_link_dimkm_5';
var i = { docs: m, link: p };
const h = {
  react: 'https://arco.design/react/docs/start',
  vue: 'https://arco.design/vue/docs/start',
  designLab: 'https://arco.design/themes',
  materialMarket: 'https://arco.design/material/',
};
function _() {
  const s = o(l);
  return t(d, {
    children: [
      t('div', {
        style: { display: 'flex', justifyContent: 'space-between' },
        children: [
          e(n.Title, { heading: 6, children: s['workplace.docs'] }),
          e(r, { children: s['workplace.seeMore'] }),
        ],
      }),
      e('div', {
        className: i.docs,
        children: Object.entries(h).map(([a, c]) =>
          e(
            r,
            {
              className: i.link,
              href: c,
              target: '_blank',
              children: s[`workplace.${a}`],
            },
            a
          )
        ),
      }),
    ],
  });
}
export { _ as default };
