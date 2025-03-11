import {
  R as w,
  r as p,
  i as C,
  j as o,
  _ as j,
  aJ as D,
  a as f,
  u as _,
  bK as N,
  x as P,
  aG as S,
} from './index.2d355395.js';
import { S as I } from './index.29e172e8.js';
import { S as L } from './index.06e31434.js';
import './index.9f6c490d.js';
import { C as T } from './index.f7b40193.js';
import { a as A } from './axios.3a03232d.js';
import { l as E } from './index.b0c339fc.js';
import {
  C as $,
  L as M,
  a as U,
  T as G,
  A as H,
  b as R,
} from './index.08e89e5e.js';
import { C as F } from './customer-tooltip.a4ba7ef0.js';
import { G as d } from './index.b0bf8c54.js';
import './b-tween.es.064e2a03.js';
import './pad.98e707e2.js';
import './index.50660a18.js';
function h(e, a) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    a &&
      (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function O(e) {
  for (var a = 1; a < arguments.length; a++) {
    var t = arguments[a] != null ? arguments[a] : {};
    a % 2
      ? h(Object(t), !0).forEach(function (r) {
          j(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : h(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function K(e, a) {
  var t = p.exports.useContext(C),
    r = t.prefixCls,
    n = r === void 0 ? 'arco' : r,
    c = e.spin,
    i = e.className,
    s = O(
      O({ 'aria-hidden': !0, focusable: !1, ref: a }, e),
      {},
      {
        className: ''
          .concat(i ? i + ' ' : '')
          .concat(n, '-icon ')
          .concat(n, '-icon-heart'),
      }
    );
  return (
    c && (s.className = ''.concat(s.className, ' ').concat(n, '-icon-loading')),
    delete s.spin,
    delete s.isIcon,
    o('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...s,
      children: o('path', {
        d: 'M38.083 12.912a9.929 9.929 0 0 1 .177 13.878l-.177.18L25.76 39.273c-.972.97-2.548.97-3.52 0L9.917 26.971l-.177-.181a9.929 9.929 0 0 1 .177-13.878c3.889-3.883 10.194-3.883 14.083 0 3.889-3.883 10.194-3.883 14.083 0Z',
      }),
    })
  );
}
var v = w.forwardRef(K);
v.defaultProps = { isIcon: !0 };
v.displayName = 'IconHeart';
var B = v;
function x(e, a) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    a &&
      (r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(e, n).enumerable;
      })),
      t.push.apply(t, r);
  }
  return t;
}
function y(e) {
  for (var a = 1; a < arguments.length; a++) {
    var t = arguments[a] != null ? arguments[a] : {};
    a % 2
      ? x(Object(t), !0).forEach(function (r) {
          j(e, r, t[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t))
      : x(Object(t)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
        });
  }
  return e;
}
function W(e, a) {
  var t = p.exports.useContext(C),
    r = t.prefixCls,
    n = r === void 0 ? 'arco' : r,
    c = e.spin,
    i = e.className,
    s = y(
      y({ 'aria-hidden': !0, focusable: !1, ref: a }, e),
      {},
      {
        className: ''
          .concat(i ? i + ' ' : '')
          .concat(n, '-icon ')
          .concat(n, '-icon-thumb-up'),
      }
    );
  return (
    c && (s.className = ''.concat(s.className, ' ').concat(n, '-icon-loading')),
    delete s.spin,
    delete s.isIcon,
    o('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...s,
      children: o('path', {
        d: 'M7 17v26m35.17-21.394-5.948 18.697a1 1 0 0 1-.953.697H14V19h3l9.403-12.223a1 1 0 0 1 1.386-.196l2.535 1.87a6 6 0 0 1 2.044 6.974L31 19h9.265a2 2 0 0 1 1.906 2.606Z',
      }),
    })
  );
}
var b = w.forwardRef(W);
b.defaultProps = { isIcon: !0 };
b.displayName = 'IconThumbUp';
var Z = b;
const J = '_card_rxkii_1',
  V = '_content_rxkii_11',
  q = '_skeleton_rxkii_27';
var u = {
  card: J,
  content: V,
  'content-icon': '_content-icon_rxkii_15',
  skeleton: q,
};
const z = [
    'l (90) 0:rgba(131, 100, 255, 0.5) 1:rgba(80, 52, 255, 0.001)',
    'l (90) 0:rgba(100, 255, 236, 0.5) 1:rgba(52, 255, 243, 0.001)',
    'l (90) 0:rgba(255, 211, 100, 0.5) 1:rgba(255, 235, 52, 0.001)',
    'l (90) 0:rgba(100, 162, 255, 0.5) 1:rgba(52, 105, 255, 0.001)',
  ],
  Q = ['#722ED1', '#33D1C9', '#F77234', '#165DFF'];
function X({ data: e, loading: a }) {
  return o(D, {
    loading: a,
    style: { width: '100%' },
    children: f($, {
      height: 352,
      data: e,
      padding: [10, 0, 30, 30],
      autoFit: !0,
      scale: { time: 'time' },
      className: 'chart-wrapper',
      children: [
        o(M, { shape: 'smooth', position: 'time*count', color: ['name', Q] }),
        o(U, {
          position: 'time*count',
          shape: 'smooth',
          color: ['name', z],
          tooltip: !1,
        }),
        o(G, {
          crosshairs: { type: 'x' },
          showCrosshairs: !0,
          shared: !0,
          showMarkers: !0,
          children: (t, r) =>
            o(F, {
              title: t,
              data: r.sort((n, c) => c.value - n.value),
              formatter: (n) => Number(n).toLocaleString(),
            }),
        }),
        o(H, {
          name: 'count',
          label: { formatter: (t) => `${Number(t) / 100} k` },
        }),
        o(R, { visible: !1 }),
      ],
    }),
  });
}
const { Title: Y } = S;
var me = () => {
  const e = _(E),
    [a, t] = p.exports.useState([]),
    [r, n] = p.exports.useState([]),
    [c, i] = p.exports.useState(!1),
    s = async () => {
      i(!0);
      const { data: l } = await A.get('/api/multi-dimension/overview').finally(
          () => i(!1)
        ),
        { overviewData: m, chartData: k } = l;
      n(k), t(m);
    };
  p.exports.useEffect(() => {
    s();
  }, []);
  const g = p.exports.useMemo(
    () => [
      {
        title: e['multiDAnalysis.dataOverview.contentProduction'],
        icon: o(N, {}),
        value: a[0],
        background: 'rgb(var(--orange-2))',
        color: 'rgb(var(--orange-6))',
      },
      {
        title: e['multiDAnalysis.dataOverview.contentClicks'],
        icon: o(Z, {}),
        value: a[1],
        background: 'rgb(var(--cyan-2))',
        color: 'rgb(var(--cyan-6))',
      },
      {
        title: e['multiDAnalysis.dataOverview.contextExposure'],
        value: a[2],
        icon: o(B, {}),
        background: 'rgb(var(--arcoblue-1))',
        color: 'rgb(var(--arcoblue-6))',
      },
      {
        title: e['multiDAnalysis.dataOverview.activeUsers'],
        value: a[3],
        icon: o(P, {}),
        background: 'rgb(var(--purple-1))',
        color: 'rgb(var(--purple-6))',
      },
    ],
    [e, a]
  );
  return f(d.Row, {
    justify: 'space-between',
    children: [
      g.map((l, m) =>
        o(
          d.Col,
          {
            span: 24 / g.length,
            children: f(T, {
              className: u.card,
              title: null,
              children: [
                o(Y, { heading: 6, children: l.title }),
                f('div', {
                  className: u.content,
                  children: [
                    o('div', {
                      style: { backgroundColor: l.background, color: l.color },
                      className: u['content-icon'],
                      children: l.icon,
                    }),
                    c
                      ? o(I, {
                          animation: !0,
                          text: { rows: 1, className: u.skeleton },
                          style: { width: '120px' },
                        })
                      : o(L, { value: l.value, groupSeparator: !0 }),
                  ],
                }),
              ],
            }),
          },
          `${m}`
        )
      ),
      o(d.Col, { span: 24, children: o(X, { data: r, loading: c }) }),
    ],
  });
};
export { me as default };
