import {
  R as ne,
  r as v,
  i as te,
  a as O,
  j as y,
  _ as ie,
  k as h,
  l as b,
  m as P,
  n as oe,
  t as ae,
  p as ue,
  q as se,
  s as Y,
  v as ce,
  u as le,
  w as J,
  x as fe,
  B as G,
  M as de,
} from './index.2d355395.js';
import { S as ve } from './index.d344c30f.js';
import { L as me } from './index.034cc5da.js';
import { C as pe } from './index.1461bab3.js';
import './index.9f6c490d.js';
import { F as W } from './index.ff131e37.js';
import { l as ge, s as w } from './index.module.5542e971.js';
import { a as he } from './axios.3a03232d.js';
import './merge.040c62eb.js';
import './index.b0bf8c54.js';
import './isEqualWith.989afe97.js';
function K(e, r) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var t = Object.getOwnPropertySymbols(e);
    r &&
      (t = t.filter(function (i) {
        return Object.getOwnPropertyDescriptor(e, i).enumerable;
      })),
      n.push.apply(n, t);
  }
  return n;
}
function Q(e) {
  for (var r = 1; r < arguments.length; r++) {
    var n = arguments[r] != null ? arguments[r] : {};
    r % 2
      ? K(Object(n), !0).forEach(function (t) {
          ie(e, t, n[t]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : K(Object(n)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
        });
  }
  return e;
}
function be(e, r) {
  var n = v.exports.useContext(te),
    t = n.prefixCls,
    i = t === void 0 ? 'arco' : t,
    a = e.spin,
    o = e.className,
    c = Q(
      Q({ 'aria-hidden': !0, focusable: !1, ref: r }, e),
      {},
      {
        className: ''
          .concat(o ? o + ' ' : '')
          .concat(i, '-icon ')
          .concat(i, '-icon-lock'),
      }
    );
  return (
    a && (c.className = ''.concat(c.className, ' ').concat(i, '-icon-loading')),
    delete c.spin,
    delete c.isIcon,
    O('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...c,
      children: [
        y('rect', { width: '34', height: '20', x: '7', y: '21', rx: '1' }),
        y('path', { d: 'M15 21v-6a9 9 0 1 1 18 0v6M24 35v-8' }),
      ],
    })
  );
}
var U = ne.forwardRef(be);
U.defaultProps = { isIcon: !0 };
U.displayName = 'IconLock';
var ye = U,
  Pe = function (e) {
    return function (r, n) {
      var t = v.exports.useRef(!1);
      e(function () {
        return function () {
          t.current = !1;
        };
      }, []),
        e(function () {
          if (!t.current) t.current = !0;
          else return r();
        }, n);
    };
  },
  M = function (e) {
    return typeof e == 'function';
  },
  we = !1,
  j = we;
function R(e) {
  j &&
    (M(e) ||
      console.error(
        'useMemoizedFn expected parameter is a function, got '.concat(typeof e)
      ));
  var r = v.exports.useRef(e);
  r.current = v.exports.useMemo(
    function () {
      return e;
    },
    [e]
  );
  var n = v.exports.useRef();
  return (
    n.current ||
      (n.current = function () {
        for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
        return r.current.apply(this, t);
      }),
    n.current
  );
}
var H = Pe(v.exports.useEffect),
  Z = function (e, r) {
    var n = r.manual,
      t = r.ready,
      i = t === void 0 ? !0 : t,
      a = r.defaultParams,
      o = a === void 0 ? [] : a,
      c = r.refreshDeps,
      l = c === void 0 ? [] : c,
      f = r.refreshDepsAction,
      m = v.exports.useRef(!1);
    return (
      (m.current = !1),
      H(
        function () {
          !n && i && ((m.current = !0), e.run.apply(e, h([], b(o), !1)));
        },
        [i]
      ),
      H(function () {
        m.current || n || ((m.current = !0), f ? f() : e.refresh());
      }, h([], b(l), !1)),
      {
        onBefore: function () {
          if (!i) return { stopNow: !0 };
        },
      }
    );
  };
Z.onInit = function (e) {
  var r = e.ready,
    n = r === void 0 ? !0 : r,
    t = e.manual;
  return { loading: !t && n };
};
var xe = Z;
function Re(e, r) {
  if (e === r) return !0;
  for (var n = 0; n < e.length; n++) if (!Object.is(e[n], r[n])) return !1;
  return !0;
}
function ee(e, r) {
  var n = v.exports.useRef({ deps: r, obj: void 0, initialized: !1 }).current;
  return (
    (n.initialized === !1 || !Re(n.deps, r)) &&
      ((n.deps = r), (n.obj = e()), (n.initialized = !0)),
    n.obj
  );
}
function re(e) {
  var r = v.exports.useRef(e);
  return (r.current = e), r;
}
var Ce = function (e) {
    j &&
      (M(e) ||
        console.error(
          'useUnmount expected parameter is a function, got '.concat(typeof e)
        ));
    var r = re(e);
    v.exports.useEffect(function () {
      return function () {
        r.current();
      };
    }, []);
  },
  z = Ce,
  N = new Map(),
  Oe = function (e, r, n) {
    var t = N.get(e);
    t != null && t.timer && clearTimeout(t.timer);
    var i = void 0;
    r > -1 &&
      (i = setTimeout(function () {
        N.delete(e);
      }, r)),
      N.set(e, P(P({}, n), { timer: i }));
  },
  Se = function (e) {
    return N.get(e);
  },
  T = new Map(),
  Le = function (e) {
    return T.get(e);
  },
  Ee = function (e, r) {
    T.set(e, r),
      r
        .then(function (n) {
          return T.delete(e), n;
        })
        .catch(function () {
          T.delete(e);
        });
  },
  x = {},
  Ne = function (e, r) {
    x[e] &&
      x[e].forEach(function (n) {
        return n(r);
      });
  },
  _ = function (e, r) {
    return (
      x[e] || (x[e] = []),
      x[e].push(r),
      function () {
        var t = x[e].indexOf(r);
        x[e].splice(t, 1);
      }
    );
  },
  Te = function (e, r) {
    var n = r.cacheKey,
      t = r.cacheTime,
      i = t === void 0 ? 5 * 60 * 1e3 : t,
      a = r.staleTime,
      o = a === void 0 ? 0 : a,
      c = r.setCache,
      l = r.getCache,
      f = v.exports.useRef(),
      m = v.exports.useRef(),
      s = function (d, u) {
        c ? c(u) : Oe(d, i, u), Ne(d, u.data);
      },
      p = function (d, u) {
        return u === void 0 && (u = []), l ? l(u) : Se(d);
      };
    return (
      ee(function () {
        if (!!n) {
          var d = p(n);
          d &&
            Object.hasOwnProperty.call(d, 'data') &&
            ((e.state.data = d.data),
            (e.state.params = d.params),
            (o === -1 || new Date().getTime() - d.time <= o) &&
              (e.state.loading = !1)),
            (f.current = _(n, function (u) {
              e.setState({ data: u });
            }));
        }
      }, []),
      z(function () {
        var d;
        (d = f.current) === null || d === void 0 || d.call(f);
      }),
      n
        ? {
            onBefore: function (d) {
              var u = p(n, d);
              return !u || !Object.hasOwnProperty.call(u, 'data')
                ? {}
                : o === -1 || new Date().getTime() - u.time <= o
                ? {
                    loading: !1,
                    data: u == null ? void 0 : u.data,
                    error: void 0,
                    returnNow: !0,
                  }
                : { data: u == null ? void 0 : u.data, error: void 0 };
            },
            onRequest: function (d, u) {
              var g = Le(n);
              return g && g !== m.current
                ? { servicePromise: g }
                : ((g = d.apply(void 0, h([], b(u), !1))),
                  (m.current = g),
                  Ee(n, g),
                  { servicePromise: g });
            },
            onSuccess: function (d, u) {
              var g;
              n &&
                ((g = f.current) === null || g === void 0 || g.call(f),
                s(n, { data: d, params: u, time: new Date().getTime() }),
                (f.current = _(n, function (E) {
                  e.setState({ data: E });
                })));
            },
            onMutate: function (d) {
              var u;
              n &&
                ((u = f.current) === null || u === void 0 || u.call(f),
                s(n, {
                  data: d,
                  params: e.state.params,
                  time: new Date().getTime(),
                }),
                (f.current = _(n, function (g) {
                  e.setState({ data: g });
                })));
            },
          }
        : {}
    );
  },
  Me = Te,
  je = function (e, r) {
    var n = r.debounceWait,
      t = r.debounceLeading,
      i = r.debounceTrailing,
      a = r.debounceMaxWait,
      o = v.exports.useRef(),
      c = v.exports.useMemo(
        function () {
          var l = {};
          return (
            t !== void 0 && (l.leading = t),
            i !== void 0 && (l.trailing = i),
            a !== void 0 && (l.maxWait = a),
            l
          );
        },
        [t, i, a]
      );
    return (
      v.exports.useEffect(
        function () {
          if (n) {
            var l = e.runAsync.bind(e);
            return (
              (o.current = oe(
                function (f) {
                  f();
                },
                n,
                c
              )),
              (e.runAsync = function () {
                for (var f = [], m = 0; m < arguments.length; m++)
                  f[m] = arguments[m];
                return new Promise(function (s, p) {
                  var d;
                  (d = o.current) === null ||
                    d === void 0 ||
                    d.call(o, function () {
                      l.apply(void 0, h([], b(f), !1))
                        .then(s)
                        .catch(p);
                    });
                });
              }),
              function () {
                var f;
                (f = o.current) === null || f === void 0 || f.cancel(),
                  (e.runAsync = l);
              }
            );
          }
        },
        [n, c]
      ),
      n
        ? {
            onCancel: function () {
              var l;
              (l = o.current) === null || l === void 0 || l.cancel();
            },
          }
        : {}
    );
  },
  Ae = je,
  Fe = function (e, r) {
    var n = r.loadingDelay,
      t = r.ready,
      i = v.exports.useRef();
    if (!n) return {};
    var a = function () {
      i.current && clearTimeout(i.current);
    };
    return {
      onBefore: function () {
        return (
          a(),
          t !== !1 &&
            (i.current = setTimeout(function () {
              e.setState({ loading: !0 });
            }, n)),
          { loading: !1 }
        );
      },
      onFinally: function () {
        a();
      },
      onCancel: function () {
        a();
      },
    };
  },
  De = Fe,
  $e = !!(
    typeof window != 'undefined' &&
    window.document &&
    window.document.createElement
  ),
  A = $e;
function k() {
  return A ? document.visibilityState !== 'hidden' : !0;
}
var S = [];
function Be(e) {
  return (
    S.push(e),
    function () {
      var n = S.indexOf(e);
      S.splice(n, 1);
    }
  );
}
if (A) {
  var We = function () {
    if (!!k())
      for (var e = 0; e < S.length; e++) {
        var r = S[e];
        r();
      }
  };
  window.addEventListener('visibilitychange', We, !1);
}
var _e = function (e, r) {
    var n = r.pollingInterval,
      t = r.pollingWhenHidden,
      i = t === void 0 ? !0 : t,
      a = r.pollingErrorRetryCount,
      o = a === void 0 ? -1 : a,
      c = v.exports.useRef(),
      l = v.exports.useRef(),
      f = v.exports.useRef(0),
      m = function () {
        var s;
        c.current && clearTimeout(c.current),
          (s = l.current) === null || s === void 0 || s.call(l);
      };
    return (
      H(
        function () {
          n || m();
        },
        [n]
      ),
      n
        ? {
            onBefore: function () {
              m();
            },
            onError: function () {
              f.current += 1;
            },
            onSuccess: function () {
              f.current = 0;
            },
            onFinally: function () {
              o === -1 || (o !== -1 && f.current <= o)
                ? (c.current = setTimeout(function () {
                    !i && !k()
                      ? (l.current = Be(function () {
                          e.refresh();
                        }))
                      : e.refresh();
                  }, n))
                : (f.current = 0);
            },
            onCancel: function () {
              m();
            },
          }
        : {}
    );
  },
  He = _e;
function Ue(e, r) {
  var n = !1;
  return function () {
    for (var t = [], i = 0; i < arguments.length; i++) t[i] = arguments[i];
    n ||
      ((n = !0),
      e.apply(void 0, h([], b(t), !1)),
      setTimeout(function () {
        n = !1;
      }, r));
  };
}
function ze() {
  return A && typeof navigator.onLine != 'undefined' ? navigator.onLine : !0;
}
var L = [];
function ke(e) {
  return (
    L.push(e),
    function () {
      var n = L.indexOf(e);
      n > -1 && L.splice(n, 1);
    }
  );
}
if (A) {
  var X = function () {
    if (!(!k() || !ze()))
      for (var e = 0; e < L.length; e++) {
        var r = L[e];
        r();
      }
  };
  window.addEventListener('visibilitychange', X, !1),
    window.addEventListener('focus', X, !1);
}
var Ie = function (e, r) {
    var n = r.refreshOnWindowFocus,
      t = r.focusTimespan,
      i = t === void 0 ? 5e3 : t,
      a = v.exports.useRef(),
      o = function () {
        var c;
        (c = a.current) === null || c === void 0 || c.call(a);
      };
    return (
      v.exports.useEffect(
        function () {
          if (n) {
            var c = Ue(e.refresh.bind(e), i);
            a.current = ke(function () {
              c();
            });
          }
          return function () {
            o();
          };
        },
        [n, i]
      ),
      z(function () {
        o();
      }),
      {}
    );
  },
  qe = Ie,
  Ve = function (e, r) {
    var n = r.retryInterval,
      t = r.retryCount,
      i = v.exports.useRef(),
      a = v.exports.useRef(0),
      o = v.exports.useRef(!1);
    return t
      ? {
          onBefore: function () {
            o.current || (a.current = 0),
              (o.current = !1),
              i.current && clearTimeout(i.current);
          },
          onSuccess: function () {
            a.current = 0;
          },
          onError: function () {
            if (((a.current += 1), t === -1 || a.current <= t)) {
              var c =
                n != null ? n : Math.min(1e3 * Math.pow(2, a.current), 3e4);
              i.current = setTimeout(function () {
                (o.current = !0), e.refresh();
              }, c);
            } else a.current = 0;
          },
          onCancel: function () {
            (a.current = 0), i.current && clearTimeout(i.current);
          },
        }
      : {};
  },
  Je = Ve,
  Ge = function (e, r) {
    var n = r.throttleWait,
      t = r.throttleLeading,
      i = r.throttleTrailing,
      a = v.exports.useRef(),
      o = {};
    return (
      t !== void 0 && (o.leading = t),
      i !== void 0 && (o.trailing = i),
      v.exports.useEffect(
        function () {
          if (n) {
            var c = e.runAsync.bind(e);
            return (
              (a.current = ae(
                function (l) {
                  l();
                },
                n,
                o
              )),
              (e.runAsync = function () {
                for (var l = [], f = 0; f < arguments.length; f++)
                  l[f] = arguments[f];
                return new Promise(function (m, s) {
                  var p;
                  (p = a.current) === null ||
                    p === void 0 ||
                    p.call(a, function () {
                      c.apply(void 0, h([], b(l), !1))
                        .then(m)
                        .catch(s);
                    });
                });
              }),
              function () {
                var l;
                (e.runAsync = c),
                  (l = a.current) === null || l === void 0 || l.cancel();
              }
            );
          }
        },
        [n, t, i]
      ),
      n
        ? {
            onCancel: function () {
              var c;
              (c = a.current) === null || c === void 0 || c.cancel();
            },
          }
        : {}
    );
  },
  Ke = Ge,
  Qe = function (e) {
    j &&
      (M(e) ||
        console.error(
          'useMount: parameter `fn` expected to be a function, but got "'.concat(
            typeof e,
            '".'
          )
        )),
      v.exports.useEffect(function () {
        e == null || e();
      }, []);
  },
  Xe = Qe,
  Ye = function () {
    var e = b(v.exports.useState({}), 2),
      r = e[1];
    return v.exports.useCallback(function () {
      return r({});
    }, []);
  },
  Ze = Ye,
  er = (function () {
    function e(r, n, t, i) {
      i === void 0 && (i = {}),
        (this.serviceRef = r),
        (this.options = n),
        (this.subscribe = t),
        (this.initState = i),
        (this.count = 0),
        (this.state = {
          loading: !1,
          params: void 0,
          data: void 0,
          error: void 0,
        }),
        (this.state = P(P(P({}, this.state), { loading: !n.manual }), i));
    }
    return (
      (e.prototype.setState = function (r) {
        r === void 0 && (r = {}),
          (this.state = P(P({}, this.state), r)),
          this.subscribe();
      }),
      (e.prototype.runPluginHandler = function (r) {
        for (var n = [], t = 1; t < arguments.length; t++)
          n[t - 1] = arguments[t];
        var i = this.pluginImpls
          .map(function (a) {
            var o;
            return (o = a[r]) === null || o === void 0
              ? void 0
              : o.call.apply(o, h([a], b(n), !1));
          })
          .filter(Boolean);
        return Object.assign.apply(Object, h([{}], b(i), !1));
      }),
      (e.prototype.runAsync = function () {
        for (var r = [], n = 0; n < arguments.length; n++) r[n] = arguments[n];
        return ue(this, void 0, void 0, function () {
          var t, i, a, o, c, l, f, m, s, p, d, u, g, E, F, I, D, q, $, V, B;
          return se(this, function (C) {
            switch (C.label) {
              case 0:
                if (
                  ((this.count += 1),
                  (t = this.count),
                  (i = this.runPluginHandler('onBefore', r)),
                  (a = i.stopNow),
                  (o = a === void 0 ? !1 : a),
                  (c = i.returnNow),
                  (l = c === void 0 ? !1 : c),
                  (f = Y(i, ['stopNow', 'returnNow'])),
                  o)
                )
                  return [2, new Promise(function () {})];
                if ((this.setState(P({ loading: !0, params: r }, f)), l))
                  return [2, Promise.resolve(f.data)];
                (g = (u = this.options).onBefore) === null ||
                  g === void 0 ||
                  g.call(u, r),
                  (C.label = 1);
              case 1:
                return (
                  C.trys.push([1, 3, , 4]),
                  (m = this.runPluginHandler(
                    'onRequest',
                    this.serviceRef.current,
                    r
                  ).servicePromise),
                  m ||
                    (m = (d = this.serviceRef).current.apply(
                      d,
                      h([], b(r), !1)
                    )),
                  [4, m]
                );
              case 2:
                return (
                  (s = C.sent()),
                  t !== this.count
                    ? [2, new Promise(function () {})]
                    : (this.setState({ data: s, error: void 0, loading: !1 }),
                      (F = (E = this.options).onSuccess) === null ||
                        F === void 0 ||
                        F.call(E, s, r),
                      this.runPluginHandler('onSuccess', s, r),
                      (D = (I = this.options).onFinally) === null ||
                        D === void 0 ||
                        D.call(I, r, s, void 0),
                      t === this.count &&
                        this.runPluginHandler('onFinally', r, s, void 0),
                      [2, s])
                );
              case 3:
                if (((p = C.sent()), t !== this.count))
                  return [2, new Promise(function () {})];
                throw (
                  (this.setState({ error: p, loading: !1 }),
                  ($ = (q = this.options).onError) === null ||
                    $ === void 0 ||
                    $.call(q, p, r),
                  this.runPluginHandler('onError', p, r),
                  (B = (V = this.options).onFinally) === null ||
                    B === void 0 ||
                    B.call(V, r, void 0, p),
                  t === this.count &&
                    this.runPluginHandler('onFinally', r, void 0, p),
                  p)
                );
              case 4:
                return [2];
            }
          });
        });
      }),
      (e.prototype.run = function () {
        for (var r = this, n = [], t = 0; t < arguments.length; t++)
          n[t] = arguments[t];
        this.runAsync.apply(this, h([], b(n), !1)).catch(function (i) {
          r.options.onError || console.error(i);
        });
      }),
      (e.prototype.cancel = function () {
        (this.count += 1),
          this.setState({ loading: !1 }),
          this.runPluginHandler('onCancel');
      }),
      (e.prototype.refresh = function () {
        this.run.apply(this, h([], b(this.state.params || []), !1));
      }),
      (e.prototype.refreshAsync = function () {
        return this.runAsync.apply(this, h([], b(this.state.params || []), !1));
      }),
      (e.prototype.mutate = function (r) {
        var n = M(r) ? r(this.state.data) : r;
        this.runPluginHandler('onMutate', n), this.setState({ data: n });
      }),
      e
    );
  })(),
  rr = er;
function nr(e, r, n) {
  r === void 0 && (r = {}), n === void 0 && (n = []);
  var t = r.manual,
    i = t === void 0 ? !1 : t,
    a = r.ready,
    o = a === void 0 ? !0 : a,
    c = Y(r, ['manual', 'ready']);
  j &&
    r.defaultParams &&
    !Array.isArray(r.defaultParams) &&
    console.warn(
      'expected defaultParams is array, got '.concat(typeof r.defaultParams)
    );
  var l = P({ manual: i, ready: o }, c),
    f = re(e),
    m = Ze(),
    s = ee(function () {
      var p = n
        .map(function (d) {
          var u;
          return (u = d == null ? void 0 : d.onInit) === null || u === void 0
            ? void 0
            : u.call(d, l);
        })
        .filter(Boolean);
      return new rr(f, l, m, Object.assign.apply(Object, h([{}], b(p), !1)));
    }, []);
  return (
    (s.options = l),
    (s.pluginImpls = n.map(function (p) {
      return p(s, l);
    })),
    Xe(function () {
      if (!i && o) {
        var p = s.state.params || r.defaultParams || [];
        s.run.apply(s, h([], b(p), !1));
      }
    }),
    z(function () {
      s.cancel();
    }),
    {
      loading: s.state.loading,
      data: s.state.data,
      error: s.state.error,
      params: s.state.params || [],
      cancel: R(s.cancel.bind(s)),
      refresh: R(s.refresh.bind(s)),
      refreshAsync: R(s.refreshAsync.bind(s)),
      run: R(s.run.bind(s)),
      runAsync: R(s.runAsync.bind(s)),
      mutate: R(s.mutate.bind(s)),
    }
  );
}
function tr(e, r, n) {
  return nr(
    e,
    r,
    h(h([], b(n || []), !1), [Ae, De, He, qe, Ke, xe, Me, Je], !1)
  );
}
const ir = '',
  or = he.create({ baseURL: ir, timeout: 10 * 1e3 }),
  ar = (e) => {
    const { userLoginAccount: r, userLoginPassword: n, captcha: t } = e;
    return or.post('/api/system/login', {
      captcha: t,
      userLoginAccount: r,
      userLoginPassword: n,
    });
  };
function br() {
  const e = v.exports.useRef(),
    [r, n] = v.exports.useState(''),
    [t, i, a] = ce('loginParams'),
    o = le(ge),
    [c, l] = v.exports.useState(!!t),
    {
      run: f,
      loading: m,
      data: s,
    } = tr(async (u) => {
      const g = await ar(u);
      console.log(g),
        g.data.code === 0 ||
          de.error(g.data.msg || o['login.form.login.errMsg']),
        p(u);
    }, {});
  console.log(s);
  function p(u) {
    c ? i(JSON.stringify(u)) : a(),
      localStorage.setItem('userStatus', 'login'),
      (window.location.href = '/');
  }
  function d() {
    e.current.validate().then((u) => {
      f(u);
    });
  }
  return (
    v.exports.useEffect(() => {
      const u = !!t;
      if ((l(u), e.current && u)) {
        const g = JSON.parse(t);
        e.current.setFieldsValue(g);
      }
    }, [t]),
    O('div', {
      className: w['login-form-wrapper'],
      children: [
        y('div', {
          className: w['login-form-title'],
          children: o['login.form.title'],
        }),
        y('div', {
          className: w['login-form-sub-title'],
          children: o['login.form.title'],
        }),
        y('div', { className: w['login-form-error-msg'], children: r }),
        O(W, {
          className: w['login-form'],
          layout: 'vertical',
          ref: e,
          initialValues: { userName: 'admin', password: 'admin' },
          children: [
            y(W.Item, {
              field: 'userLoginAccount',
              rules: [
                { required: !0, message: o['login.form.userName.errMsg'] },
              ],
              children: y(J, {
                prefix: y(fe, {}),
                placeholder: o['login.form.userName.placeholder'],
                onPressEnter: d,
              }),
            }),
            y(W.Item, {
              field: 'userLoginPassword',
              rules: [
                { required: !0, message: o['login.form.password.errMsg'] },
              ],
              children: y(J.Password, {
                prefix: y(ye, {}),
                placeholder: o['login.form.password.placeholder'],
                onPressEnter: d,
              }),
            }),
            O(ve, {
              size: 16,
              direction: 'vertical',
              children: [
                O('div', {
                  className: w['login-form-password-actions'],
                  children: [
                    y(pe, {
                      checked: c,
                      onChange: l,
                      children: o['login.form.rememberPassword'],
                    }),
                    y(me, { children: o['login.form.forgetPassword'] }),
                  ],
                }),
                y(G, {
                  type: 'primary',
                  long: !0,
                  onClick: d,
                  loading: m,
                  children: o['login.form.login'],
                }),
                y(G, {
                  type: 'text',
                  long: !0,
                  className: w['login-form-register-btn'],
                  children: o['login.form.register'],
                }),
              ],
            }),
          ],
        }),
      ],
    })
  );
}
export { br as default };
