import {
  R as B,
  r as w,
  i as v,
  j as a,
  _ as O,
  bJ as S,
  u as E,
  a as h,
  w as f,
  aK as T,
  B as F,
  b8 as g,
} from './index.2d355395.js';
import './index.9f6c490d.js';
import { D as I } from './index.02406541.js';
import './index.034cc5da.js';
import { S as p } from './index.2ab862f4.js';
import './index.1461bab3.js';
import './index.040a1012.js';
import { F as t } from './index.ff131e37.js';
import { s as d, C as j, F as x, S as D } from './constants.c05abfa9.js';
import { G as N } from './index.b0bf8c54.js';
function C(r, s) {
  var e = Object.keys(r);
  if (Object.getOwnPropertySymbols) {
    var l = Object.getOwnPropertySymbols(r);
    s &&
      (l = l.filter(function (c) {
        return Object.getOwnPropertyDescriptor(r, c).enumerable;
      })),
      e.push.apply(e, l);
  }
  return e;
}
function y(r) {
  for (var s = 1; s < arguments.length; s++) {
    var e = arguments[s] != null ? arguments[s] : {};
    s % 2
      ? C(Object(e), !0).forEach(function (l) {
          O(r, l, e[l]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(r, Object.getOwnPropertyDescriptors(e))
      : C(Object(e)).forEach(function (l) {
          Object.defineProperty(r, l, Object.getOwnPropertyDescriptor(e, l));
        });
  }
  return r;
}
function P(r, s) {
  var e = w.exports.useContext(v),
    l = e.prefixCls,
    c = l === void 0 ? 'arco' : l,
    m = r.spin,
    n = r.className,
    o = y(
      y({ 'aria-hidden': !0, focusable: !1, ref: s }, r),
      {},
      {
        className: ''
          .concat(n ? n + ' ' : '')
          .concat(c, '-icon ')
          .concat(c, '-icon-refresh'),
      }
    );
  return (
    m && (o.className = ''.concat(o.className, ' ').concat(c, '-icon-loading')),
    delete o.spin,
    delete o.isIcon,
    a('svg', {
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '4',
      viewBox: '0 0 48 48',
      ...o,
      children: a('path', {
        d: 'M38.837 18C36.463 12.136 30.715 8 24 8 15.163 8 8 15.163 8 24s7.163 16 16 16c7.455 0 13.72-5.1 15.496-12M40 8v10H30',
      }),
    })
  );
}
var b = B.forwardRef(P);
b.defaultProps = { isIcon: !0 };
b.displayName = 'IconRefresh';
var R = b;
const _ = {
    'en-US': {
      'menu.list': 'List',
      'menu.list.searchTable': 'Search Table',
      'searchTable.form.search': 'Search',
      'searchTable.form.reset': 'Reset',
      'searchTable.columns.id': 'Collection ID',
      'searchTable.columns.name': 'Collection Name',
      'searchTable.columns.contentType': 'Content genre',
      'searchTable.columns.filterType': 'Filter method',
      'searchTable.columns.createdTime': 'Creation time',
      'searchTable.columns.status': 'Status',
      'searchTable.columns.contentNum': 'Content quantity',
      'searchTable.columns.operations': 'Operation',
      'searchTable.columns.operations.view': 'View',
      'searchTable.columns.operations.update': 'Edit',
      'searchTable.columns.operations.offline': 'Offline',
      'searchTable.columns.operations.online': 'Online',
      'searchTable.operations.add': 'New',
      'searchTable.operations.upload': 'Bulk upload',
      'searchTable.operation.download': 'Download',
      'searchForm.id.placeholder': 'Please enter the collection ID',
      'searchForm.name.placeholder': 'Please enter the collection name',
      'searchForm.all.placeholder': 'all',
    },
    'zh-CN': {
      'menu.list': '\u5217\u8868\u9875',
      'menu.list.searchTable': '\u67E5\u8BE2\u8868\u683C',
      'searchTable.form.search': '\u67E5\u8BE2',
      'searchTable.form.reset': '\u91CD\u7F6E',
      'searchTable.columns.id': '\u96C6\u5408\u7F16\u53F7',
      'searchTable.columns.name': '\u96C6\u5408\u540D\u79F0',
      'searchTable.columns.contentType': '\u5185\u5BB9\u4F53\u88C1',
      'searchTable.columns.filterType': '\u7B5B\u9009\u65B9\u5F0F',
      'searchTable.columns.createdTime': '\u521B\u5EFA\u65F6\u95F4',
      'searchTable.columns.status': '\u72B6\u6001',
      'searchTable.columns.contentNum': '\u5185\u5BB9\u91CF',
      'searchTable.columns.operations': '\u64CD\u4F5C',
      'searchTable.columns.operations.view': '\u67E5\u770B',
      'searchTable.columns.operations.update': '\u4FEE\u6539',
      'searchTable.columns.operations.online': '\u4E0A\u7EBF',
      'searchTable.columns.operations.offline': '\u4E0B\u7EBF',
      'searchTable.operations.add': '\u65B0\u5EFA',
      'searchTable.operations.upload': '\u6279\u91CF\u5BFC\u5165',
      'searchTable.operation.download': '\u4E0B\u8F7D',
      'searchForm.id.placeholder': '\u8BF7\u8F93\u5165\u96C6\u5408\u7F16\u53F7',
      'searchForm.name.placeholder':
        '\u8BF7\u8F93\u5165\u96C6\u5408\u540D\u79F0',
      'searchForm.all.placeholder': '\u5168\u90E8',
    },
  },
  { Row: k, Col: u } = N,
  { useForm: A } = t;
function z(r) {
  const { lang: s } = w.exports.useContext(S),
    e = E(_),
    [l] = A(),
    c = () => {
      const o = l.getFieldsValue();
      r.onSearch(o);
    },
    m = () => {
      l.resetFields(), r.onSearch({});
    },
    n = s === 'zh-CN' ? 8 : 12;
  return h('div', {
    className: d['search-form-wrapper'],
    children: [
      a(t, {
        form: l,
        className: d['search-form'],
        labelAlign: 'left',
        labelCol: { span: 5 },
        wrapperCol: { span: 19 },
        children: h(k, {
          gutter: 24,
          children: [
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.id'],
                field: 'id',
                children: a(f, {
                  placeholder: e['searchForm.id.placeholder'],
                  allowClear: !0,
                }),
              }),
            }),
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.name'],
                field: 'name',
                children: a(f, {
                  allowClear: !0,
                  placeholder: e['searchForm.name.placeholder'],
                }),
              }),
            }),
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.contentType'],
                field: 'contentType',
                children: a(p, {
                  placeholder: e['searchForm.all.placeholder'],
                  options: j.map((o, i) => ({ label: o, value: i })),
                  mode: 'multiple',
                  allowClear: !0,
                }),
              }),
            }),
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.filterType'],
                field: 'filterType',
                children: a(p, {
                  placeholder: e['searchForm.all.placeholder'],
                  options: x.map((o, i) => ({ label: o, value: i })),
                  mode: 'multiple',
                  allowClear: !0,
                }),
              }),
            }),
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.createdTime'],
                field: 'createdTime',
                children: a(I.RangePicker, {
                  allowClear: !0,
                  style: { width: '100%' },
                  disabledDate: (o) => T(o).isAfter(T()),
                }),
              }),
            }),
            a(u, {
              span: n,
              children: a(t.Item, {
                label: e['searchTable.columns.status'],
                field: 'status',
                children: a(p, {
                  placeholder: e['searchForm.all.placeholder'],
                  options: D.map((o, i) => ({ label: o, value: i })),
                  mode: 'multiple',
                  allowClear: !0,
                }),
              }),
            }),
          ],
        }),
      }),
      h('div', {
        className: d['right-button'],
        children: [
          a(F, {
            type: 'primary',
            icon: a(g, {}),
            onClick: c,
            children: e['searchTable.form.search'],
          }),
          a(F, {
            icon: a(R, {}),
            onClick: m,
            children: e['searchTable.form.reset'],
          }),
        ],
      }),
    ],
  });
}
var W = Object.freeze(
  Object.defineProperty({ __proto__: null, default: z }, Symbol.toStringTag, {
    value: 'Module',
  })
);
export { z as S, W as f, _ as i };
