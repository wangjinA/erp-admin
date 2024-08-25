import classNames from 'classnames'

import { labelClass } from '@/pages/admin/components/OrderTable'

interface LabelValueProps {
  label: any
  value: any
  labelClassName?: string
  valueClassName?: string
  className?: string
}

export default ({ label, value, className, labelClassName, valueClassName }: LabelValueProps) => {
  return (
    <div className={classNames('break-all mb-1', className)}>
      <span className={classNames(labelClass, labelClassName)}>
        {label}
        ：
      </span>
      <span className={classNames(labelClass, valueClassName)}>{value || '-'}</span>
    </div>
  )
}
