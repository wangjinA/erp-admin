import { j as a, aC as r, a as e, b2 as c } from './index.2d355395.js';
import { C as i } from './index.f7b40193.js';
import { s } from './index.module.27984758.js';
function n(d) {
  return a(i, {
    className: r(s['card-block'], s['add-card']),
    title: null,
    bordered: !0,
    size: 'small',
    children: e('div', {
      className: s.content,
      children: [
        a('div', { className: s['add-icon'], children: a(c, {}) }),
        a('div', { className: s.description, children: d.description }),
      ],
    }),
  });
}
export { n as default };
