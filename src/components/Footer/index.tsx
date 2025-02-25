import { Divider, Layout } from '@arco-design/web-react'
import { FooterProps } from '@arco-design/web-react/es/Layout/interface'
import cs from 'classnames'
import React from 'react'

import styles from './style/index.module.less'

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      速运宝
      <Divider type="vertical" className="!border-l-blue-900"></Divider>
      黑桃A技术支持
    </Layout.Footer>
  )
}

export default Footer
