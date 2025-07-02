import { ProductItem } from '@/api/client/stock'
import LabelValue from '@/components/LabelValue'
import { Image } from '@arco-design/web-react'
import { isArray } from 'lodash'

interface IProductInfo {
  data: Partial<ProductItem>
  className?: string
}

export default (props: IProductInfo) => {
  const { data, className } = props
  return (
    <div className={`p-2 w-full flex items-center ${className}`}>
      <Image
        className="size-16"
        src={isArray(data.productImg) ? data.productImg?.[0] : data.productImg}
      />
      <div className="ml-2 flex-1 w-0">
        <div className="text-sm text-gray-500">
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="商品编码" value={data.productCode}></LabelValue>
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="商品名称" value={data.productName}></LabelValue>
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="SKU" value={data.sku}></LabelValue>
          {data?.platformItemId ? <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="平台商品ID" value={data.platformItemId}></LabelValue> : null}
        </div>
      </div>
    </div>
  )
}
