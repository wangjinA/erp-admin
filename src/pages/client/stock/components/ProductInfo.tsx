interface IProductInfo {
  // productImg: string[]
  // productName: string
  // unitPrice: number
  // quantity: number
  // specificationName: string
}

export default (props: IProductInfo) => {
  return (
    <div className="p-2 w-full flex items-center">
      {/* <img
        className="size-24"
        src={item.productImg[0]}
        alt=""
      />
      <div className="ml-2 flex-1 w-0">
        <div className="truncate">{item.productName}</div>
        <div className="text-sm text-gray-500">
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="商品编码" value={item.unitPrice}></LabelValue>
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="商品名称" value={item.quantity}></LabelValue>
          <LabelValue className="!mb-0" labelClassName="!text-sm !pr-1 !align-baseline" valueClassName="!text-sm" label="平台商品ID" value={item.specificationName}></LabelValue>
        </div>
      </div> */}
    </div>
  )
}
