import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  Image,
  Menu,
  Message,
  Select,
  Tooltip,
} from '@arco-design/web-react'
import {
  IconLanguage,
  IconLoading,
  IconMoonFill,
  IconNotification,
  IconPoweroff,
  IconSettings,
  IconSunFill,
  IconUser,
} from '@arco-design/web-react/icon'
import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Settings from '../Settings'

import IconButton from './IconButton'

import styles from './style/index.module.less'

import { requestEndInfo } from '@/api'
import { loginExit } from '@/api/admin/user'
import Logo from '@/assets/logo.svg'
import MessageBox from '@/components/MessageBox'
import { GlobalContext } from '@/context'
import defaultLocale from '@/locale'
import { generatePermission, toLoginPage } from '@/routes'
import { GlobalState } from '@/store'
import useLocale from '@/utils/useLocale'

import useStorage from '@/utils/useStorage'

function Navbar({ show }: { show: boolean }) {
  const t = useLocale()
  const { userInfo, userLoading } = useSelector((state: GlobalState) => state)
  const dispatch = useDispatch()

  const [_, setUserStatus] = useStorage('userStatus')
  const [role, setRole] = useStorage('userRole', 'admin')

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext)

  function logout() {
    setUserStatus('logout')
    localStorage.removeItem('userInfo')
    localStorage.removeItem(requestEndInfo.tokenKey)
    toLoginPage()
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      loginExit()
      logout()
    }
    else {
      Message.info(`You clicked ${key}`)
    }
  }

  useEffect(() => {
    dispatch({
      type: 'update-userInfo',
      payload: {
        userInfo: {
          ...userInfo,
          permissions: generatePermission(role),
        },
      },
    })
  }, [role])

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<IconSettings />} type="primary" size="large" />
          }
        />
      </div>
    )
  }

  const handleChangeRole = () => {
    // const newRole = role === 'admin' ? 'user' : 'admin'
    // setRole(newRole)
  }

  const droplist = (
    <Menu>
      <Menu.Item onClick={handleChangeRole} key="switch role">
        {/* <IconTag className={styles['dropdown-icon']} /> */}
        <IconUser className={styles['dropdown-icon']} />
        {/* {t['menu.user.switchRoles']} */}
        {userInfo.userName}
      </Menu.Item>
      {/* <Menu.SubMenu
        key="role"
        title={
          <>
            <IconUser className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin'
                ? t['menu.user.role.admin']
                : t['menu.user.role.user']}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          {t['menu.user.switchRoles']}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item>
      <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
        <Menu.Item key="card list">
          <IconInteraction className={styles['dropdown-icon']} />
          {t['menu.list.cardList']}
        </Menu.Item>
      </Menu.SubMenu> */}

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item
        key="logout"
        onClick={() => {
          loginExit()
          logout()
        }}
      >
        <IconPoweroff className={styles['dropdown-icon']} />
        {/* {t['navbar.logout']} */}
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>速运宝 - 新一代电商货代平台</div>
        </div>
      </div>
      <ul className={styles.right}>
        {/* <li>
          <Input.Search
            className={styles.round}
            placeholder={t['navbar.search.placeholder']}
          />
        </li> */}
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'br',
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value)
              const nextLang = defaultLocale[value]
              Message.info(`${nextLang['message.lang.tips']}${value}`)
            }}
          />
        </li>
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
        <li>
          <Tooltip
            content={
              theme === 'light'
                ? t['settings.navbar.theme.toDark']
                : t['settings.navbar.theme.toLight']
            }
          >
            <IconButton
              icon={theme !== 'dark' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            />
          </Tooltip>
        </li>
        <li>
          <Settings />
        </li>
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br" disabled={userLoading}>
              <div className="cursor-pointer">
                {userLoading
                  ? (
                      <IconLoading />
                    )
                  : (
                      userInfo.headImg
                        ? (
                            <Image
                              error={
                                <Avatar className="bg-blue-500" size={32}><IconUser /></Avatar>
                              }
                              className="size-9 block rounded-full"
                              alt="avatar"
                              preview={false}
                              src={userInfo.headImg}
                            />
                          )
                        : <Avatar className="bg-blue-500" size={32}><IconUser /></Avatar>
                    )}
              </div>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Navbar
