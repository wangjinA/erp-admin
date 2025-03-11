import { aC as m, a as o, j as t, F as u, aG as x } from './index.2d355395.js';
import { S as f } from './index.29e172e8.js';
import { S as g } from './index.06e31434.js';
import {
  C as p,
  L as j,
  l as k,
  I as _,
  c as v,
  T as b,
  b as F,
} from './index.08e89e5e.js';
import { I as S, a as D, b as C } from './index.f464f16d.js';
import './b-tween.es.064e2a03.js';
import './pad.98e707e2.js';
const N = '_card_3ij6k_1',
  w = '_statistic_3ij6k_17',
  I = '_chart_3ij6k_20',
  L = '_title_3ij6k_26',
  T = '_diff_3ij6k_42';
var r = {
  card: N,
  'card-line': '_card-line_3ij6k_8',
  'card-interval': '_card-interval_3ij6k_11',
  'card-pie': '_card-pie_3ij6k_14',
  statistic: w,
  chart: I,
  title: L,
  'compare-yesterday-text': '_compare-yesterday-text_3ij6k_37',
  diff: T,
  'diff-increment': '_diff-increment_3ij6k_47',
};
const { Title: A, Text: G } = x,
  h = { pure: !0, autoFit: !0, height: 80, padding: [10, 10, 0, 10] };
function P(s) {
  const { chartData: i } = s;
  return t(p, {
    data: i,
    ...h,
    children: t(j, {
      position: 'x*y',
      size: 3,
      shape: 'smooth',
      color: ['name', ['#165DFF', 'rgba(106,161,255,0.3)']],
      style: {
        fields: ['name'],
        callback: (n) => (n === '\u7C7B\u76EE2' ? { lineDash: [8, 10] } : {}),
      },
    }),
  });
}
function B(s) {
  const { chartData: i } = s;
  return (
    k.registerShape('interval', 'border-radius', {
      draw(n, l) {
        const e = n.points;
        let a = [];
        a.push(['M', e[0].x, e[0].y]),
          a.push(['L', e[1].x, e[1].y]),
          a.push(['L', e[2].x, e[2].y]),
          a.push(['L', e[3].x, e[3].y]),
          a.push('Z'),
          (a = this.parsePath(a));
        const c = l.addGroup();
        return (
          c.addShape('rect', {
            attrs: {
              x: a[1][1],
              y: a[1][2],
              width: a[2][1] - a[1][1],
              height: a[0][2] - a[1][2],
              fill: n.color,
              radius: (a[2][1] - a[1][1]) / 2,
            },
          }),
          c
        );
      },
    }),
    t(p, {
      data: i,
      ...h,
      children: t(_, {
        position: 'x*y',
        color: ['x', (n) => (Number(n) % 2 === 0 ? '#2CAB40' : '#86DF6C')],
        shape: 'border-radius',
      }),
    })
  );
}
function E(s) {
  const { chartData: i } = s;
  return o(p, {
    data: i,
    ...h,
    padding: [0, 20, 0, 0],
    children: [
      t(v, { type: 'theta', radius: 0.8, innerRadius: 0.7 }),
      t(_, {
        adjust: 'stack',
        position: 'count',
        shape: 'sliceShape',
        color: ['name', ['#8D4EDA', '#00B2FF', '#165DFF']],
        label: !1,
      }),
      t(b, { visible: !0 }),
      t(F, { position: 'right' }),
      t(C, { type: 'element-single-selected' }),
    ],
  });
}
function H(s) {
  const {
      chartType: i,
      title: n,
      count: l,
      increment: e,
      diff: a,
      chartData: c,
      loading: d,
    } = s,
    y = m(r.card, r[`card-${i}`]);
  return o('div', {
    className: y,
    children: [
      o('div', {
        className: r.statistic,
        children: [
          t(g, {
            title: t(A, { heading: 6, className: r.title, children: n }),
            loading: d,
            value: l,
            groupSeparator: !0,
          }),
          o('div', {
            className: r['compare-yesterday'],
            children: [
              t(G, {
                type: 'secondary',
                className: r['compare-yesterday-text'],
                children: s.compareTime,
              }),
              t('span', {
                className: m(r.diff, { [r['diff-increment']]: e }),
                children: d
                  ? t(f, { text: { rows: 1 }, animation: !0 })
                  : o(u, { children: [a, e ? t(S, {}) : t(D, {})] }),
              }),
            ],
          }),
        ],
      }),
      t('div', {
        className: r.chart,
        children: d
          ? t(f, {
              text: { rows: 3, width: Array(3).fill('100%') },
              animation: !0,
            })
          : o(u, {
              children: [
                i === 'interval' && t(B, { chartData: c }),
                i === 'line' && t(P, { chartData: c }),
                i === 'pie' && t(E, { chartData: c }),
              ],
            }),
      }),
    ],
  });
}
export { H as default };
