import { ConfigProvider, Message } from '@arco-design/web-react'
import enUS from '@arco-design/web-react/es/locale/en-US'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'
import weekday from 'dayjs/plugin/weekday'
import { useEffect } from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'

import { requestEndInfo } from './api'
import { userAPI } from './api/admin/user'
import { menuAPI } from './api/client/menu'
import { AuthShopeePath, WhitePathList } from './constants/login'
import { GlobalContext } from './context'
import PageLayout from './layout'
import { listToTree } from './pages/admin/account/menu/hooks'
import AdminLogin from './pages/admin/login'
import ClientLogin from './pages/client/login'
import AuthShopee from './pages/common/auth/shopee'
import { isClient, isLoginPage, toLoginPage } from './routes'
import rootReducer from './store'
import './style/global.less'
import changeTheme from './utils/changeTheme'
import checkLogin from './utils/checkLogin'
import { isSuccessCode } from './utils/index'
import useStorage from './utils/useStorage'

dayjs.extend(duration)
dayjs.extend(weekday)
dayjs().locale('zh-cn')

console.log(import.meta.env.MODE)
if (import.meta.env.MODE === 'development') {
  const hm = document.createElement('script');
  hm.src = 'https://hm.baidu.com/hm.js?fbba72768e8eb71ce20ab470e53488b9';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode?.insertBefore(hm, s);
}


const store = createStore(rootReducer)
function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zh-CN')
  const [theme, setTheme] = useStorage('arco-theme', 'light')

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN
      case 'en-US':
        return enUS
      default:
        return zhCN
    }
  }

  async function fetchUserInfo() {
    // if (!isEmpty(store.getState().userInfo)) {
    //   return
    // }
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    })
    const localLoginInfo = localStorage.getItem(requestEndInfo.loginInfoKey)
    if (localLoginInfo) {
      store.dispatch({
        type: 'set-login-info',
        payload: { loginInfo: JSON.parse(localLoginInfo) },
      })
    }
    try {
      const res = await userAPI.personalCenter()
      store.dispatch({
        type: 'update-userInfo',
        payload: { userInfo: res.data.data, userLoading: false },
      })

      // const res = await userAPI.personalCenter();
      // console.log(res);
      // store.dispatch({
      //   type: 'update-userInfo',
      //   payload: {
      //     userInfo: {
      //       createBy: '0',
      //       createTime: '2024-06-24 15:44:10',
      //       updateBy: '0',
      //       updateTime: '2024-06-24 15:44:10',
      //       id: '38803390127000130',
      //       tenantryId: '38803385032000196',
      //       userName: '15279298921',
      //       userLoginAccount: '15279298921',
      //       userPassword:
      //         '$2a$12$Lcr/b1acV0i1rBMv0ybbfe7OGojc6XrDjrNqmxkL2pT51zCuP/T0K',
      //       userStatus: 0,
      //       isAdmin: 1,
      //       remark: '',
      //       deleteStatus: 0,
      //     },
      //     userLoading: false,
      //   },
      // });
    }
    catch (error) {
      if (!isLoginPage() && !WhitePathList.includes(window.location.pathname)) {
        Message.error('登录失效')
      }
      toLoginPage()
      // store.dispatch({
      //   type: 'update-userInfo',
      //   payload: { userInfo, userLoading: false },
      // });
    }
  }

  async function initMain() {
    fetchUserInfo()
    fetchClientMenuList()
  }

  async function fetchClientMenuList() {
    if (isClient()) {
      const res = await menuAPI.list()
      if (isSuccessCode(res.data.code)) {
        const list = listToTree(res.data.data.list)
        console.log(list)

        store.dispatch({
          type: 'set-client-menu-list',
          payload: { clientMenuList: list },
        })
      }
    }
  }

  useEffect(() => {
    if (checkLogin()) {
      initMain()
    }
    else {
      toLoginPage()
    }
  }, [])

  useEffect(() => {
    changeTheme(theme)
  }, [theme])

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  }

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
        componentConfig={{
          Card: {
            bordered: false,
          },
          List: {
            bordered: false,
          },
          // Table: {
          //   border: false,
          // },
          Button: {
            size: 'small',
          },
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path={AuthShopeePath} component={AuthShopee} />
              <Route path="/admin/login" component={AdminLogin} />
              <Route path="/client/login" component={ClientLogin} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
