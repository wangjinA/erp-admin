export enum ShippingOrderPrintingTemplateEnum {
  /** 圆通速运 */
  YUANTONG = '0',
  /** 二维码 */
  QR_CODE = '1',
  /** 条形码 */
  BAR_CODE = '2',
}

export const ShippingOrderPrintingTemplateMap = {
  [ShippingOrderPrintingTemplateEnum.YUANTONG]: '圆通速运',
  [ShippingOrderPrintingTemplateEnum.QR_CODE]: '二维码',
  [ShippingOrderPrintingTemplateEnum.BAR_CODE]: '条形码',
}

export const ShippingOrderPrintingTemplateOptions = [
  {
    label: ShippingOrderPrintingTemplateMap[ShippingOrderPrintingTemplateEnum.YUANTONG],
    value: ShippingOrderPrintingTemplateEnum.YUANTONG,
  },
  {
    label: ShippingOrderPrintingTemplateMap[ShippingOrderPrintingTemplateEnum.QR_CODE],
    value: ShippingOrderPrintingTemplateEnum.QR_CODE,
  },
  {
    label: ShippingOrderPrintingTemplateMap[ShippingOrderPrintingTemplateEnum.BAR_CODE],
    value: ShippingOrderPrintingTemplateEnum.BAR_CODE,
  },
]