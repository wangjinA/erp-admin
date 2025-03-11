import {
  u as g,
  r as d,
  j as t,
  a as n,
  aC as C,
  aJ as v,
  aG as S,
} from './index.2d355395.js';
import { S as T } from './index.29e172e8.js';
import { C as D } from './index.f7b40193.js';
import './index.9f6c490d.js';
import { S as k } from './index.06e31434.js';
import { C as h, L as w, T as y, I as L } from './index.08e89e5e.js';
import { a as N } from './axios.3a03232d.js';
import { l as I } from './index.b0c339fc.js';
import { G as F } from './index.b0bf8c54.js';
import { I as b, a as G, b as R } from './index.f464f16d.js';
import './b-tween.es.064e2a03.js';
import './pad.98e707e2.js';
const A = '_card_jjj49_1',
  P = '_statistic_jjj49_1',
  $ = '_title_jjj49_4',
  q = '_diff_jjj49_16',
  B = '_tooltip_jjj49_24';
var o = {
  card: A,
  statistic: P,
  title: $,
  diff: q,
  'diff-increment': '_diff-increment_jjj49_21',
  tooltip: B,
};
const { Row: E, Col: J } = F,
  { Title: M, Text: z } = S,
  j = { pure: !0, autoFit: !0, height: 80, padding: [0, 10, 0, 10] };
function _(a) {
  const { items: r } = a;
  return t('div', {
    className: o.tooltip,
    children: r.map((i, s) =>
      t(
        'div',
        {
          children: t(z, {
            bold: !0,
            children: Number(i.data.y).toLocaleString(),
          }),
        },
        s
      )
    ),
  });
}
function H(a) {
  const { chartData: r } = a;
  return n(h, {
    data: r,
    ...j,
    children: [
      t(w, {
        position: 'x*y',
        shape: ['name', ['smooth', 'dash']],
        color: ['name', ['#165DFF', 'rgba(106,161,255,0.3)']],
      }),
      t(y, {
        shared: !1,
        showCrosshairs: !0,
        children: (i, s) => t(_, { items: s }),
      }),
    ],
  });
}
function K(a) {
  const { chartData: r } = a;
  return n(h, {
    data: r,
    ...j,
    children: [
      t(L, {
        position: 'x*y',
        color: ['x', (i) => (Number(i) % 2 === 0 ? '#86DF6C' : '#468DFF')],
      }),
      t(y, { shared: !1, children: (i, s) => t(_, { items: s }) }),
      t(R, { type: 'active-region' }),
    ],
  });
}
function O(a) {
  const {
    chartType: r,
    title: i,
    count: s,
    increment: c,
    diff: p,
    chartData: l,
    loading: e,
  } = a;
  return n(D, {
    className: o.card,
    children: [
      t('div', {
        className: o.statistic,
        children: t(k, {
          title: t(M, { heading: 6, className: o.title, children: i }),
          loading: e,
          value: s,
          extra: t('div', {
            className: o['compare-yesterday'],
            children: e
              ? t(T, {
                  text: { rows: 1 },
                  style: { width: '100px' },
                  animation: !0,
                })
              : n('span', {
                  className: C(o.diff, { [o['diff-increment']]: c }),
                  children: [p, c ? t(b, {}) : t(G, {})],
                }),
          }),
          groupSeparator: !0,
        }),
      }),
      t('div', {
        className: o.chart,
        children: n(v, {
          style: { width: '100%' },
          loading: e,
          children: [
            r === 'interval' && t(K, { chartData: l }),
            r === 'line' && t(H, { chartData: l }),
          ],
        }),
      }),
    ],
  });
}
const f = [
  { key: 'userRetentionTrend', type: 'line' },
  { key: 'userRetention', type: 'interval' },
  { key: 'contentConsumptionTrend', type: 'line' },
  { key: 'contentConsumption', type: 'interval' },
];
function st() {
  const a = g(I),
    [r, i] = d.exports.useState(!1),
    [s, c] = d.exports.useState(f.map((e) => ({ ...e, chartType: e.type }))),
    p = async () => {
      const e = f.map(async (u) => {
        const { data: x } = await N.get(
          `/api/multi-dimension/card?type=${u.type}`
        ).catch(() => ({ data: {} }));
        return { ...x, key: u.key, chartType: u.type };
      });
      i(!0);
      const m = await Promise.all(e).finally(() => i(!1));
      c(m);
    };
  d.exports.useEffect(() => {
    p();
  }, []);
  const l = d.exports.useMemo(
    () =>
      s.map((e) => ({ ...e, title: a[`multiDAnalysis.cardList.${e.key}`] })),
    [a, s]
  );
  return t(E, {
    gutter: 16,
    children: l.map((e, m) =>
      t(J, { span: 6, children: t(O, { ...e, loading: r }) }, m)
    ),
  });
}
export { st as default };
