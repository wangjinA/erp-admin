import './style/global.less';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from '@arco-design/web-react';
import zhCN from '@arco-design/web-react/es/locale/zh-CN';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rootReducer from './store';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
import Mock from 'mockjs';
// import './mock';
import { generatePermission } from './routes';
import userPNG from '@/assets/user.png';

const store = createStore(rootReducer);

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'zhCN');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    const userRole = window.localStorage.getItem('userRole') || 'admin';
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
    };
    store.dispatch({
      type: 'update-userInfo',
      payload: { userLoading: true },
    });
    store.dispatch({
      type: 'update-userInfo',
      payload: { userInfo, userLoading: false },
    });
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

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
          Table: {
            border: false,
          },
        }}
      >
        <Provider store={store}>
          <GlobalContext.Provider value={contextValue}>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" component={PageLayout} />
            </Switch>
          </GlobalContext.Provider>
        </Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));
