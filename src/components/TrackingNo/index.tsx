import { Link } from '@arco-design/web-react'

export default ({ value }) => {
  return (
    <Link
      href={`https://www.baidu.com/s?wd=${value}`}
      target="_blank"
    >
      {value}
    </Link>
  )
}
