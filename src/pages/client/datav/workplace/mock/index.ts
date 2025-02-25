import Mock from 'mockjs'
import qs from 'query-string'

import setupMock from '@/utils/setupMock'

setupMock({
  setup: () => {
    Mock.mock(new RegExp('/api/workplace/overview-content'), () => {
      const year = new Date().getFullYear()
      const getLineData = () => {
        return Array.from({ length: 12 }).fill(0).map((_item, index) => ({
          date: `${year}-${index + 1}`,
          count: Mock.Random.natural(20000, 75000),
        }))
      }
      return {
        allContents: '373.5w+',
        liveContents: '368',
        increaseComments: '8874',
        growthRate: '3400',
        chartData: getLineData(),
      }
    })

    const getList = () => {
      const { list } = Mock.mock({
        'list|100': [
          {
            'rank|+1': 1,
            'title': () =>
              Mock.Random.pick([
                '经济日报：财政政策要精准提升效能',
                '“双12”遇冷消费者厌倦了电商平台的促销“套路”',
                '致敬坚守战“疫”一线的社区工作者',
                '普高还是职高？家长们陷入选校难题',
              ]),
            'pv': function () {
              return 500000 - 3200 * this.rank
            },
            'increase': '@float(-1, 1)',
          },
        ],
      })
      return list
    }
    const listText = getList()
    const listPic = getList()
    const listVideo = getList()

    Mock.mock(new RegExp('/api/workplace/popular-contents'), (params) => {
      const {
        page = 1,
        pageSize = 5,
        category = 0,
      } = qs.parseUrl(params.url).query as unknown as {
        page?: number
        pageSize?: number
        category?: number
      }

      const list = [listText, listPic, listVideo][Number(category)]
      return {
        list: list.slice((page - 1) * pageSize, page * pageSize),
        total: 100,
      }
    })

    Mock.mock(new RegExp('/api/workplace/content-percentage'), () => {
      return [
        {
          type: '分类1',
          count: 148564,
          percent: 0.16,
        },
        {
          type: '分类2',
          count: 334271,
          percent: 0.36,
        },
        {
          type: '分类3',
          count: 445695,
          percent: 0.48,
        },
      ]
    })
  },
})
