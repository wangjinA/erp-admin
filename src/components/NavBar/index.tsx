import {
  Button,
  Divider,
  Message,
  Modal,
  Select,
  Tooltip,
} from '@arco-design/web-react'
import {
  IconLanguage,
  IconMoonFill,
  IconNotification,
  IconPoweroff,
  IconSettings,
  IconSunFill,
} from '@arco-design/web-react/icon'
import { useContext, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Settings from '../Settings'

import StatusTag from '../StatusTag'

import UserAvatar from '../UserAvatar'

import IconButton from './IconButton'

import styles from './style/index.module.less'

import { requestEndInfo } from '@/api'
import { loginExit } from '@/api/admin/user'
import Logo from '@/assets/logo.svg'
import MessageBox from '@/components/MessageBox'
import { GlobalContext } from '@/context'
import defaultLocale from '@/locale'
import { generatePermission, isAdmin, toLoginPage } from '@/routes'
import { GlobalState } from '@/store'
import useI18n from '@/utils/useI18n'

import useStorage from '@/utils/useStorage'
import { checkIsSpotRole } from '@/utils'

function Navbar({ show }: { show: boolean }) {
  const t = useI18n()
  const { userInfo } = useSelector((state: GlobalState) => state)
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
  const isSpotRole = useMemo(() => checkIsSpotRole(userInfo), [userInfo]);

  const handleChangeRole = () => {
    // const newRole = role === 'admin' ? 'user' : 'admin'
    // setRole(newRole)
  }

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>速运宝 - 新一代电商货代平台</div>
          <Divider type="vertical"></Divider>
          <StatusTag
            value={Number(isAdmin())}
            tagInfos={[
              {
                text: '店铺端',
                value: 0,
                color: 'green',
              },
              {
                text: `物流端${isSpotRole ? '｜现货' : ''}`,
                value: 1,
                color: 'blue',
              },
            ]}
          >
          </StatusTag>
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
        <li className="flex gap-2">
          <UserAvatar src={userInfo?.headImg}></UserAvatar>
          <div className="text-base">{userInfo.userName}</div>
        </li>
        <Divider type="vertical"></Divider>
        <li
          className="flex cursor-pointer text-blue-600 hover:text-red-600"
          onClick={() => {
            Modal.confirm({
              title: '确认退出登录吗?',
              okText: '确认',
              okButtonProps: {
                status: 'danger',
              },
              onOk: () => {
                loginExit()
                logout()
              },
            })
          }}
        >
          <IconPoweroff className={styles['dropdown-icon']} />
          {/* {t['navbar.logout']} */}
          退出登录
        </li>
        {/* {userInfo
          ? (
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
            )
          : null} */}
      </ul>
    </div>
  )
}

export default Navbar
