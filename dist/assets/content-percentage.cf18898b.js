import {
  u as f,
  r as e,
  a as m,
  j as o,
  aG as g,
  aJ as h,
} from './index.2d355395.js';
import { C as x } from './index.f7b40193.js';
import { D as y } from './index.08e89e5e.js';
import { a as C } from './axios.3a03232d.js';
import { i as F } from './index.9464998a.js';
function v() {
  const a = f(F),
    [s, i] = e.exports.useState([]),
    [n, r] = e.exports.useState(!0),
    l = () => {
      r(!0),
        C.get('/api/workplace/content-percentage')
          .then((t) => {
            i(t.data);
          })
          .finally(() => {
            r(!1);
          });
    };
  return (
    e.exports.useEffect(() => {
      l();
    }, []),
    m(x, {
      children: [
        o(g.Title, { heading: 6, children: a['workplace.contentPercentage'] }),
        o(h, {
          loading: n,
          style: { display: 'block' },
          children: o(y, {
            autoFit: !0,
            height: 340,
            data: s,
            radius: 0.7,
            innerRadius: 0.65,
            angleField: 'count',
            colorField: 'type',
            color: ['#21CCFF', '#313CA9', '#249EFF'],
            interactions: [{ type: 'element-single-selected' }],
            tooltip: { showMarkers: !1 },
            label: {
              visible: !0,
              type: 'spider',
              formatter: (t) => `${(t.percent * 100).toFixed(0)}%`,
              style: { fill: '#86909C', fontSize: 14 },
            },
            legend: { position: 'bottom' },
            statistic: {
              title: {
                style: {
                  fontSize: '14px',
                  lineHeight: 2,
                  color: 'rgb(--var(color-text-1))',
                },
                formatter: () => '\u5185\u5BB9\u91CF',
              },
              content: {
                style: { fontSize: '16px', color: 'rgb(--var(color-text-1))' },
                formatter: (t, c) => {
                  const p = c.reduce((u, d) => u + d.count, 0);
                  return Number(p).toLocaleString();
                },
              },
            },
          }),
        }),
      ],
    })
  );
}
export { v as default };
