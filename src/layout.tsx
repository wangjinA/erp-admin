import { Breadcrumb, Layout, Menu, Spin } from '@arco-design/web-react'
import {
  IconApps,
  IconArchive,
  IconBook,
  IconCheckCircle,
  IconCommon,
  IconExclamationCircle,
  IconFile,
  IconList,
  IconMenuFold,
  IconMenuUnfold,
  IconPublic,
  IconSettings,
  IconUser,
  IconUserGroup,
} from '@arco-design/web-react/icon'
import cs from 'classnames'
import NProgress from 'nprogress'
import qs from 'query-string'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'

import Footer from './components/Footer'

import Navbar from './components/NavBar'
import { GlobalState } from './store'
import styles from './style/layout.module.less'
import getUrlParams from './utils/getUrlParams'
import { isArray } from './utils/is'
import lazyload from './utils/lazyload'
import useLocale from './utils/useLocale'

import useRoute, { EndType, IRoute, getPathEndKey } from '@/routes'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

const Sider = Layout.Sider
const Content = Layout.Content

function getIconFromKey(key) {
  switch (key) {
    case 'admin/business':
      return <IconApps className={styles.icon} />
    case 'admin/order':
    case 'client/order':
      return <IconFile className={styles.icon} />
    case 'admin/entrepot':
      return <IconArchive className={styles.icon} />
    case 'admin/account':
    case 'admin/tenantry':
    case 'client/account':
      return <IconUserGroup className={styles.icon} />
    case 'admin/dict/list':
      return <IconBook className={styles.icon} />
    case 'admin/express':
    case 'client/express':
      return <IconCommon className={styles.icon} />
    case 'client/store':
      return <IconArchive className={styles.icon} />
    case 'client/stock':
      return <IconPublic className={styles.icon} />
    case 'list':
      return <IconList className={styles.icon} />
    case 'form':
      return <IconSettings className={styles.icon} />
    case 'profile':
      return <IconFile className={styles.icon} />
    case 'visualization':
      return <IconApps className={styles.icon} />
    case 'result':
      return <IconCheckCircle className={styles.icon} />
    case 'client/tools':
      return <IconCheckCircle className={styles.icon} />
    case 'exception':
      return <IconExclamationCircle className={styles.icon} />
    case 'user':
      return <IconUser className={styles.icon} />
    default:
      return <div className={styles['icon-empty']} />
  }
}

function getFlattenRoutes(routes) {
  const mod = import.meta.glob('./pages/**/[a-z[]*.tsx')
  const res = []
  function travel(_routes) {
    _routes.forEach((route) => {
      const visibleChildren = (route.children || []).filter(
        child => !child.ignore,
      )
      if (route.key && (!route.children || !visibleChildren.length)) {
        try {
          route.component = lazyload(mod[`./pages/${route.key}/index.tsx`])
          res.push(route)
        }
        catch (e) {
          console.error(e)
        }
      }

      if (isArray(route.children) && route.children.length) {
        travel(route.children)
      }
    })
  }
  travel(routes)
  return res
}

function PageLayout() {
  const urlParams = getUrlParams()
  const history = useHistory()
  const pathname = history.location.pathname
  const locale = useLocale()
  const { settings, userLoading } = useSelector(
    (state: GlobalState) => state,
  )

  const [routes, defaultRouteKeyMap] = useRoute()
  const defaultRoute = defaultRouteKeyMap[getPathEndKey()]
  const currentComponent = qs.parseUrl(pathname).url.slice(1) || defaultRoute
  if (!currentComponent) {
    location.href = `${EndType.CLIENT}`
    return null
  }
  const defaultSelectedKeys = [currentComponent]
  const paths = currentComponent?.split('/')
  const defaultOpenKeys = paths.slice(0, paths.length - 1)

  const [breadcrumb, setBreadCrumb] = useState([])
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys]
    = useState<string[]>(defaultSelectedKeys)

  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys)

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map())
  const menuMap = useRef<
    Map<string, { menuItem?: boolean, subMenu?: boolean }>
  >(new Map())

  const navbarHeight = 60
  const menuWidth = collapsed ? 48 : settings.menuWidth

  const showNavbar = settings.navbar && urlParams.navbar !== false
  const showMenu = settings.menu && urlParams.menu !== false
  const showFooter = settings.footer && urlParams.footer !== false

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes])

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find(r => r.key === key)
    const component = currentRoute.component
    const preload = component.preload()
    NProgress.start()
    preload.then(() => {
      history.push(currentRoute.path ? currentRoute.path : `/${key}`)
      NProgress.done()
    })
  }

  function toggleCollapse() {
    setCollapsed(collapsed => !collapsed)
  }

  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {}
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {}
  const paddingStyle = { ...paddingLeft, ...paddingTop }

  // 渲染menu菜单组件
  function renderRoutes(locale) {
    routeMap.current.clear()
    return function travel(_routes: IRoute[], level, parentNode = []) {
      return _routes.map((route) => {
        const { breadcrumb = true, ignore } = route
        const iconDom = getIconFromKey(route.key)
        const titleDom = (
          <>
            {iconDom}
            {' '}
            {locale[route.name] || route.name}
          </>
        )

        routeMap.current.set(
          `/${route.key}`,
          breadcrumb ? [...parentNode, route.name] : [],
        )

        const visibleChildren = (route.children || []).filter((child) => {
          const { ignore, breadcrumb = true } = child
          if (ignore || route.ignore) {
            routeMap.current.set(
              `/${child.key}`,
              breadcrumb ? [...parentNode, route.name, child.name] : [],
            )
          }

          return !ignore
        })

        if (ignore) {
          return ''
        }
        if (visibleChildren.length) {
          menuMap.current.set(route.key, { subMenu: true })
          return (
            <SubMenu key={route.key} title={titleDom}>
              {travel(visibleChildren, level + 1, [...parentNode, route.name])}
            </SubMenu>
          )
        }
        menuMap.current.set(route.key, { menuItem: true })
        return <MenuItem key={route.key}>{titleDom}</MenuItem>
      })
    }
  }

  function updateMenuStatus() {
    const pathKeys = pathname.split('/')

    const newSelectedKeys: string[] = []
    const newOpenKeys: string[] = [...openKeys]
    while (pathKeys.length > 0) {
      const currentRouteKey = pathKeys.join('/')
      const menuKey = currentRouteKey.replace(/^\//, '')
      const menuType = menuMap.current.get(menuKey)
      if (menuType && menuType.menuItem) {
        newSelectedKeys.push(menuKey)
      }
      if (menuType && menuType.subMenu && !openKeys.includes(menuKey)) {
        newOpenKeys.push(menuKey)
      }
      pathKeys.pop()
    }

    setSelectedKeys(newSelectedKeys)
    setOpenKeys(newOpenKeys)
  }

  useEffect(() => {
    setTimeout(() => {
      const routeConfig = routeMap.current.get(pathname)
      setBreadCrumb(routeConfig || [])
      updateMenuStatus()
    }, 1000)
  }, [pathname, defaultRouteKeyMap])

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles['layout-navbar'], {
          [styles['layout-navbar-hidden']]: !showNavbar,
        })}
      >
        <Navbar show={showNavbar} />
      </div>
      {userLoading
        ? (
            <Spin className={styles.spin} />
          )
        : (
            <Layout>
              {showMenu && (
                <Sider
                  className={styles['layout-sider']}
                  width={menuWidth}
                  collapsed={collapsed}
                  onCollapse={setCollapsed}
                  trigger={null}
                  collapsible
                  breakpoint="xl"
                  style={paddingTop}
                >
                  <div className={styles['menu-wrapper']}>
                    <Menu
                      autoOpen={true}
                      // accordion={true}
                      collapse={collapsed}
                      onClickMenuItem={onClickMenuItem}
                      selectedKeys={selectedKeys}
                      openKeys={openKeys}
                      onClickSubMenu={(_, openKeys) => {
                        setOpenKeys(openKeys)
                      }}
                    >
                      {renderRoutes(locale)(routes, 1)}
                    </Menu>
                  </div>
                  <div className={styles['collapse-btn']} onClick={toggleCollapse}>
                    {collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
                  </div>
                </Sider>
              )}
              <Layout className={styles['layout-content']} style={paddingStyle}>
                <div className="content-style pt-4 px-5">
                  {!!breadcrumb.length && (
                    <div className="mb-4">
                      <Breadcrumb>
                        {breadcrumb.map((node, index) => (
                          <Breadcrumb.Item key={index}>
                            {typeof node === 'string' ? locale[node] || node : node}
                          </Breadcrumb.Item>
                        ))}
                      </Breadcrumb>
                    </div>
                  )}
                  <Content>
                    <Switch>
                      {flattenRoutes.map((route, index) => {
                        return (
                          <Route
                            key={index}
                            path={`/${route.key}`}
                            component={route.component}
                          />
                        )
                      })}
                      {Object.values(EndType).map(endKey => (
                        <Route exact path={`/${endKey}`} key={endKey}>
                          {defaultRoute ? <Redirect to={`/${defaultRoute}`} /> : null}
                        </Route>
                      ))}
                      <Route
                        path="*"
                        component={lazyload(
                          () => import('./pages/common/exception/403'),
                        )}
                      />
                    </Switch>
                  </Content>
                </div>
                {showFooter && <Footer />}
              </Layout>
            </Layout>
          )}
    </Layout>
  )
}

export default PageLayout
