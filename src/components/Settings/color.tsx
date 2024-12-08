import { generate, getRgbStr } from '@arco-design/color'
import { Trigger, Typography } from '@arco-design/web-react'
import { useLocalStorageState } from 'ahooks'
import React from 'react'
import { SketchPicker } from 'react-color'
import { useDispatch, useSelector } from 'react-redux'

import defaultSettings from '../../settings.json'
import { GlobalState } from '../../store'

import styles from './style/color-panel.module.less'

import { getEndType } from '@/routes'
import useLocale from '@/utils/useLocale'

function ColorPanel() {
  const theme
    = document.querySelector('body').getAttribute('arco-theme') || 'light'
  const settings = useSelector((state: GlobalState) => state.settings)
  const locale = useLocale()
  const themeColor = settings.themeColor
  const list = generate(themeColor, { list: true })
  const dispatch = useDispatch()
  const [, setSettings] = useLocalStorageState(`${getEndType()}-settings`, {
    defaultValue: defaultSettings,
  })

  return (
    <div>
      <Trigger
        trigger="hover"
        position="bl"
        popup={() => (
          <SketchPicker
            color={themeColor}
            onChangeComplete={(color) => {
              const newColor = color.hex
              setSettings({
                ...defaultSettings,
                themeColor: newColor,
              })
              dispatch({
                type: 'update-settings',
                payload: { settings: { ...settings, themeColor: newColor } },
              })
              const newList = generate(newColor, {
                list: true,
                dark: theme === 'dark',
              })
              console.log(newList)

              newList.forEach((l, index) => {
                const rgbStr = getRgbStr(l)
                document.body.style.setProperty(
                  `--arcoblue-${index + 1}`,
                  rgbStr,
                )
              })
            }}
          />
        )}
      >
        <div className={styles.input}>
          <div
            className={styles.color}
            style={{ backgroundColor: themeColor }}
          />
          <span>{themeColor}</span>
        </div>
      </Trigger>
      <ul className={styles.ul}>
        {list.map((item, index) => (
          <li
            key={index}
            className={styles.li}
            style={{ backgroundColor: item }}
          />
        ))}
      </ul>
      <Typography.Paragraph style={{ fontSize: 12 }}>
        {locale['settings.color.tooltip']}
      </Typography.Paragraph>
    </div>
  )
}

export default ColorPanel
