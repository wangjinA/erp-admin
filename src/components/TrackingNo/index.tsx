import { Link } from '@arco-design/web-react'

export default ({ value }) => {
  return (
    <Link
      className="!px-0"
      href={`https://www.baidu.com/s?wd=${value}`}
      target="_blank"
    >
      {value}
    </Link>
  )
}
