import {
  u,
  r as o,
  a,
  j as t,
  aG as g,
  w as r,
  B as l,
  aJ as y,
} from './index.2d355395.js';
import { S as n } from './index.2ab862f4.js';
import './index.1461bab3.js';
import './index.040a1012.js';
import { S as c } from './index.d344c30f.js';
import { a as x } from './axios.3a03232d.js';
import { l as S } from './index.662e0e1f.js';
import L from './index.76b4dd3a.js';
import { s } from './index.module.1dd0e4f6.js';
import { I as v } from './index.ca55756e.js';
import { I } from './index.2c2ab182.js';
import './index.15d55bbd.js';
import './index.6136f4f5.js';
import './index.8ab50f0f.js';
import './item.54bfcd4a.js';
function V() {
  const e = u(S),
    [m, p] = o.exports.useState([]),
    [h, i] = o.exports.useState(!1);
  function d() {
    i(!0),
      x
        .get('/api/chatList')
        .then((f) => {
          p(f.data || []);
        })
        .finally(() => {
          i(!1);
        });
  }
  return (
    o.exports.useEffect(() => {
      d();
    }, []),
    a('div', {
      className: s['chat-panel'],
      children: [
        a('div', {
          className: s['chat-panel-header'],
          children: [
            t(g.Title, {
              style: { marginTop: 0, marginBottom: 16 },
              heading: 6,
              children: e['monitor.title.chatPanel'],
            }),
            a(c, {
              size: 8,
              children: [
                t(n, {
                  style: { width: 80 },
                  defaultValue: 'all',
                  children: t(n.Option, {
                    value: 'all',
                    children: e['monitor.chat.options.all'],
                  }),
                }),
                t(r.Search, {
                  placeholder: e['monitor.chat.placeholder.searchCategory'],
                }),
                t(l, { type: 'text', iconOnly: !0, children: t(v, {}) }),
              ],
            }),
          ],
        }),
        t('div', {
          className: s['chat-panel-content'],
          children: t(y, {
            loading: h,
            style: { width: '100%' },
            children: t(L, { data: m }),
          }),
        }),
        t('div', {
          className: s['chat-panel-footer'],
          children: a(c, {
            size: 8,
            children: [
              t(r, { suffix: t(I, {}) }),
              t(l, { type: 'primary', children: e['monitor.chat.update'] }),
            ],
          }),
        }),
      ],
    })
  );
}
export { V as default };
