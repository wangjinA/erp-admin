import { a as i, j as t, aG as d } from './index.2d355395.js';
import { B as n } from './index.50660a18.js';
var l = {
  'customer-tooltip-title': '_customer-tooltip-title_1xpmx_1',
  'customer-tooltip-item': '_customer-tooltip-item_1xpmx_4',
};
const { Text: r } = d;
function h(e) {
  const { formatter: c = (o) => o, color: s, name: a } = e;
  return i('div', {
    className: l['customer-tooltip'],
    children: [
      t('div', {
        className: l['customer-tooltip-title'],
        children: t(r, { bold: !0, children: e.title }),
      }),
      t('div', {
        children: e.data.map((o, m) =>
          i(
            'div',
            {
              className: l['customer-tooltip-item'],
              children: [
                i('div', {
                  children: [t(n, { color: s || o.color }), a || o.name],
                }),
                t('div', {
                  children: t(r, { bold: !0, children: c(o.value) }),
                }),
              ],
            },
            m
          )
        ),
      }),
    ],
  });
}
export { h as C };
