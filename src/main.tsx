import { ConfigProvider, Message } from '@arco-design/web-react'
import enUS from '@arco-design/web-react/es/locale/en-US'
import zhCN from '@arco-design/web-react/es/locale/zh-CN'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { isEmpty } from 'lodash'
import Mock from 'mockjs'
import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux'

import { userAPI } from './api/admin/user'
import { GlobalContext } from './context'
import PageLayout from './layout'
import AdminLogin from './pages/admin/login'
import ClientLogin from './pages/client/login'
import { generatePermission, toLoginPage } from './routes'
import rootReducer from './store'
import './style/global.less'
// import Login from './components/Login';
import changeTheme from './utils/changeTheme'
import checkLogin from './utils/checkLogin'
import './utils/index'
import useStorage from './utils/useStorage'
// import './mock';

import userPNG from '@/assets/user.png'

dayjs.extend(duration)

// import { AccessDB, IndexedDB, initDB } from 'react-indexed-db-hook';
// import { DBConfig } from './db';
const store = createStore(rootReducer)
// initDB(DBConfig);
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
    const userRole = window.localStorage.getItem('userRole') || 'admin'
    const userInfo = {
      name: 'admin',
      avatar: userPNG,
      email: 'wangliqun@email.com',
      job: 'frontend',
      jobName: '前端开发工程师',
      organization: 'Frontend',
      organizationName: '前端',
      location: 'beijing',
      locationName: '北京',
      introduction: '王力群并非是一个真实存在的人。',
      personalWebsite: 'https://www.arco.design',
      verified: true,
      phoneNumber: 123123,
      accountId: 123123,
      registrationTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
      permissions: generatePermission(userRole),
    }

    if (!isEmpty(store.getState().userInfo)) {
      return
    }
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    })
    try {
      const res = await userAPI.personalCenter()
      console.log(res)
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
      Message.error('登录失效')
      toLoginPage()
      // store.dispatch({
      //   type: 'update-userInfo',
      //   payload: { userInfo, userLoading: false },
      // });
    }
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo()
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
