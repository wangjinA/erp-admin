import { u as c, j as i, a as e, aG as d } from './index.2d355395.js';
import { T as m } from './index.040a1012.js';
import './index.1461bab3.js';
import './index.2ab862f4.js';
import './index.aca44f29.js';
import './index.2c30dc51.js';
import './index.d344c30f.js';
import { T as p } from './index.bd5bde21.js';
import { l as u } from './index.662e0e1f.js';
import { s as o } from './index.module.1dd0e4f6.js';
import './b-tween.es.064e2a03.js';
import './merge.040c62eb.js';
function _() {
  const t = c(u),
    s = [
      {
        title: t['monitor.list.title.order'],
        render: (l, a, n) => i('span', { children: n + 1 }),
      },
      {
        title: t['monitor.list.title.cover'],
        dataIndex: 'cover',
        render: (l, a) =>
          e('div', {
            className: o['data-statistic-list-cover-wrapper'],
            children: [
              i('img', { src: a.cover }),
              a.status === -1 &&
                i(m, {
                  color: 'red',
                  className: o['data-statistic-list-cover-tag'],
                  children: t['monitor.list.tag.auditFailed'],
                }),
            ],
          }),
      },
      { title: t['monitor.list.title.name'], dataIndex: 'name' },
      { dataIndex: 'duration', title: t['monitor.list.title.duration'] },
      { dataIndex: 'id', title: t['monitor.list.title.id'] },
    ],
    r = [
      {
        cover:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp',
        name: '\u89C6\u9891\u76F4\u64AD',
        duration: '00:05:19',
        id: '54e23ade',
        status: -1,
      },
    ];
  return e('div', {
    className: o[''],
    children: [
      i(p, {
        columns: s,
        data: r,
        rowKey: 'id',
        rowSelection: { type: 'checkbox' },
        border: !1,
        pagination: !1,
      }),
      e(d.Text, {
        type: 'secondary',
        className: o['data-statistic-list-tip'],
        children: [
          t['monitor.list.tip.rotations'],
          r.length,
          t['monitor.list.tip.rest'],
        ],
      }),
    ],
  });
}
export { _ as default };
