import {
  R as x,
  r as b,
  i as y,
  a as i,
  j as a,
  _ as j,
  x as N,
} from './index.2d355395.js';
import { S as m } from './index.29e172e8.js';
import { S as u } from './index.d344c30f.js';
import { A as w } from './index.f6dfcd83.js';
import { s } from './index.module.c0778cea.js';
import { I as C } from './index.141e41f6.js';
function h(t, n) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(t);
    n &&
      (e = e.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      })),
      r.push.apply(r, e);
  }
  return r;
}
function g(t) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] != null ? arguments[n] : {};
    n % 2
      ? h(Object(r), !0).forEach(function (e) {
          j(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : h(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function I(t, n) {
  var r = b.exports.useContext(y),
    e = r.prefixCls,
    o = e === void 0 ? 'arco' : e,
    p = t.spin,
    l = t.className,
    c = g(
      g({ 'aria-hidden': !0, focusable: !1, ref: n }, t),
      {},
      {
        className: ''
          .concat(l ? l + ' ' : '')
          .concat(o, '-icon ')
          .concat(o, '-icon-home'),
      }
    );
  return (
    p && (c.className = ''.concat(c.className, ' ').concat(o, '-icon-loading')),
    delete c.spin,
    delete c.isIcon,
    i('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...c,
      children: [
        a('path', { d: 'M7 17 24 7l17 10v24H7V17Z' }),
        a('path', { d: 'M20 28h8v13h-8V28Z' }),
      ],
    })
  );
}
var f = x.forwardRef(I);
f.defaultProps = { isIcon: !0 };
f.displayName = 'IconHome';
var P = f;
function v(t, n) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var e = Object.getOwnPropertySymbols(t);
    n &&
      (e = e.filter(function (o) {
        return Object.getOwnPropertyDescriptor(t, o).enumerable;
      })),
      r.push.apply(r, e);
  }
  return r;
}
function O(t) {
  for (var n = 1; n < arguments.length; n++) {
    var r = arguments[n] != null ? arguments[n] : {};
    n % 2
      ? v(Object(r), !0).forEach(function (e) {
          j(t, e, r[e]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(r))
      : v(Object(r)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(r, e));
        });
  }
  return t;
}
function S(t, n) {
  var r = b.exports.useContext(y),
    e = r.prefixCls,
    o = e === void 0 ? 'arco' : e,
    p = t.spin,
    l = t.className,
    c = O(
      O({ 'aria-hidden': !0, focusable: !1, ref: n }, t),
      {},
      {
        className: ''
          .concat(l ? l + ' ' : '')
          .concat(o, '-icon ')
          .concat(o, '-icon-location'),
      }
    );
  return (
    p && (c.className = ''.concat(c.className, ' ').concat(o, '-icon-loading')),
    delete c.spin,
    delete c.isIcon,
    i('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...c,
      children: [
        a('circle', { cx: '24', cy: '19', r: '5' }),
        a('path', {
          d: 'M39 20.405C39 28.914 24 43 24 43S9 28.914 9 20.405C9 11.897 15.716 5 24 5c8.284 0 15 6.897 15 15.405Z',
        }),
      ],
    })
  );
}
var d = x.forwardRef(S);
d.defaultProps = { isIcon: !0 };
d.displayName = 'IconLocation';
var D = d;
function L(t) {
  const { userInfo: n = {}, loading: r } = t,
    e = a(m, {
      text: {
        rows: 1,
        style: { width: '100px', height: '20px', marginBottom: '-4px' },
        width: ['100%'],
      },
      animation: !0,
    }),
    o = a(m, {
      text: { rows: 0 },
      image: { style: { width: '64px', height: '64px' }, shape: 'circle' },
      animation: !0,
    });
  return a('div', {
    className: s.header,
    children: i(u, {
      size: 8,
      direction: 'vertical',
      align: 'center',
      className: s['header-content'],
      children: [
        r
          ? o
          : a(w, {
              size: 64,
              triggerIcon: a(C, {}),
              children: a('img', { src: n.avatar }),
            }),
        a('div', { className: s.username, children: r ? e : n.name }),
        a('div', {
          className: s['user-msg'],
          children: i(u, {
            size: 18,
            children: [
              i('div', {
                children: [
                  a(N, {}),
                  a('span', {
                    className: s['user-msg-text'],
                    children: r ? e : n.jobName,
                  }),
                ],
              }),
              i('div', {
                children: [
                  a(P, {}),
                  a('span', {
                    className: s['user-msg-text'],
                    children: r ? e : n.organizationName,
                  }),
                ],
              }),
              i('div', {
                children: [
                  a(D, {}),
                  a('span', {
                    className: s['user-msg-text'],
                    children: r ? e : n.locationName,
                  }),
                ],
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
export { L as default };
