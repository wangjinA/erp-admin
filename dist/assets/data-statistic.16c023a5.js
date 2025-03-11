import { u as s, a as e, j as t, B as l } from './index.2d355395.js';
import { T as r } from './index.12a64c8d.js';
import { R as o } from './index.2c30dc51.js';
import { C as n } from './index.f7b40193.js';
import { l as d } from './index.662e0e1f.js';
import m from './data-statistic-list.ddfb3c1c.js';
import { s as a } from './index.module.1dd0e4f6.js';
import './isEqualWith.989afe97.js';
import './index.040a1012.js';
import './index.1461bab3.js';
import './index.2ab862f4.js';
import './index.aca44f29.js';
import './index.d344c30f.js';
import './index.bd5bde21.js';
import './b-tween.es.064e2a03.js';
import './merge.040c62eb.js';
function P() {
  const i = s(d);
  return e(n, {
    children: [
      e(r, {
        defaultActiveTab: 'liveMethod',
        children: [
          t(
            r.TabPane,
            { title: i['monitor.tab.title.liveMethod'] },
            'liveMethod'
          ),
          t(
            r.TabPane,
            { title: i['monitor.tab.title.onlineUsers'] },
            'onlineUsers'
          ),
        ],
      }),
      e('div', {
        className: a['data-statistic-content'],
        children: [
          e(o.Group, {
            defaultValue: '3',
            type: 'button',
            children: [
              t(o, { value: '1', children: i['monitor.liveMethod.normal'] }),
              t(o, {
                value: '2',
                children: i['monitor.liveMethod.flowControl'],
              }),
              t(o, { value: '3', children: i['monitor.liveMethod.video'] }),
              t(o, { value: '4', children: i['monitor.liveMethod.web'] }),
            ],
          }),
          e('div', {
            className: a['data-statistic-list-wrapper'],
            children: [
              e('div', {
                className: a['data-statistic-list-header'],
                children: [
                  t(l, { type: 'text', children: i['monitor.editCarousel'] }),
                  t(l, { disabled: !0, children: i['monitor.startCarousel'] }),
                ],
              }),
              t('div', {
                className: a['data-statistic-list-content'],
                children: t(m, {}),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { P as default };
