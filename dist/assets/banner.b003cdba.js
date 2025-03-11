import { u as i, j as n, a as g } from './index.2d355395.js';
import { C as c } from './index.8274ca4d.js';
import { l as r, s as e } from './index.module.5542e971.js';
function d() {
  const a = i(r),
    s = [
      {
        slogan: a['login.banner.slogan1'],
        subSlogan: a['login.banner.subSlogan1'],
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
      },
      {
        slogan: a['login.banner.slogan2'],
        subSlogan: a['login.banner.subSlogan2'],
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
      },
      {
        slogan: a['login.banner.slogan3'],
        subSlogan: a['login.banner.subSlogan3'],
        image:
          'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png',
      },
    ];
  return n(c, {
    className: e.carousel,
    animation: 'fade',
    children: s.map((l, o) =>
      n(
        'div',
        {
          children: g('div', {
            className: e['carousel-item'],
            children: [
              n('div', { className: e['carousel-title'], children: l.slogan }),
              n('div', {
                className: e['carousel-sub-title'],
                children: l.subSlogan,
              }),
              n('img', {
                alt: 'banner-image',
                className: e['carousel-image'],
                src: l.image,
              }),
            ],
          }),
        },
        `${o}`
      )
    ),
  });
}
export { d as default };
