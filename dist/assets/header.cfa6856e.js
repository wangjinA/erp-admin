import { u as v, r as m, a as o, j as e, b2 as b } from './index.2d355395.js';
import { L as u } from './index.034cc5da.js';
import { S as d } from './index.29e172e8.js';
import { T as p } from './index.040a1012.js';
import { D as h } from './index.21372eac.js';
import { U as _ } from './index.df0b3ff9.js';
import { A as x } from './index.f6dfcd83.js';
import { l as S } from './index.69444b8c.js';
import { I as N } from './index.141e41f6.js';
import './index.6136f4f5.js';
import './index.8ab50f0f.js';
var r = {
  'info-wrapper': '_info-wrapper_1rqux_1',
  'info-avatar': '_info-avatar_1rqux_4',
  'info-content': '_info-content_1rqux_14',
  'verified-tag': '_verified-tag_1rqux_20',
  'edit-btn': '_edit-btn_1rqux_25',
};
function I({ userInfo: a = {}, loading: i }) {
  const t = v(S),
    [l, s] = m.exports.useState('');
  function f(w, c) {
    s(c.originFile ? URL.createObjectURL(c.originFile) : '');
  }
  m.exports.useEffect(() => {
    s(a.avatar);
  }, [a]);
  const g = e(d, {
      text: { rows: 0 },
      style: { width: '100px', height: '100px' },
      animation: !0,
    }),
    n = e(d, { text: { rows: 1 }, animation: !0 });
  return o('div', {
    className: r['info-wrapper'],
    children: [
      e(_, {
        showUploadList: !1,
        onChange: f,
        children: i
          ? g
          : e(x, {
              size: 100,
              triggerIcon: e(N, {}),
              className: r['info-avatar'],
              children: l ? e('img', { src: l }) : e(b, {}),
            }),
      }),
      e(h, {
        className: r['info-content'],
        column: 2,
        colon: '\uFF1A',
        labelStyle: { textAlign: 'right' },
        data: [
          { label: t['userSetting.label.name'], value: i ? n : a.name },
          {
            label: t['userSetting.label.verified'],
            value: i
              ? n
              : o('span', {
                  children: [
                    a.verified
                      ? e(p, {
                          color: 'green',
                          className: r['verified-tag'],
                          children: t['userSetting.value.verified'],
                        })
                      : e(p, {
                          color: 'red',
                          className: r['verified-tag'],
                          children: t['userSetting.value.notVerified'],
                        }),
                    e(u, {
                      role: 'button',
                      className: r['edit-btn'],
                      children: t['userSetting.btn.edit'],
                    }),
                  ],
                }),
          },
          {
            label: t['userSetting.label.accountId'],
            value: i ? n : a.accountId,
          },
          {
            label: t['userSetting.label.phoneNumber'],
            value: i
              ? n
              : o('span', {
                  children: [
                    a.phoneNumber,
                    e(u, {
                      role: 'button',
                      className: r['edit-btn'],
                      children: t['userSetting.btn.edit'],
                    }),
                  ],
                }),
          },
          {
            label: t['userSetting.label.registrationTime'],
            value: i ? n : a.registrationTime,
          },
        ],
      }),
    ],
  });
}
export { I as default };
