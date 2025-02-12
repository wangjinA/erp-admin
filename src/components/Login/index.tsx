import React, { useEffect } from 'react'

import LoginBanner from './banner'
import LoginForm from './form'
import styles from './style/index.module.less'

import Logo from '@/assets/logo.svg'
import Footer from '@/components/Footer'

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo />
        <div className={styles['logo-text']}>速运宝 - 新一代电商货代平台</div>
      </div>
      <div className={styles.banner}>
        <div className={styles['banner-inner']}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  )
}
Login.displayName = 'LoginPage'

export default Login
