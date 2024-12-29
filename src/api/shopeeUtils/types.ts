export type MiniDetail = Pick<ItemDetail, 'item_id' | 'item_name'>
export interface UpdateItemResult {
  status: 'error' | 'notChange' | 'success'
  msg: string
  detail?: MiniDetail
}

export interface ProcessInfo {
  userLoginAccount: string
  erpToken: string
  accessToken: string
  storeId: string
  progress: Record<string, ProgressInfo>
}

export interface ProgressInfo {
  duration: number
  goodsTotal: number
  errorMsg?: string
  list: UpdateItemResult[]
  value: string
}

export interface ShipmentUpdateBody {
  userLoginAccount: string
  shopId: string
  day: number
}

export interface ItemDetail {
  item_id: number
  category_id: number
  item_name: string
  item_sku: string
  create_time: number
  update_time: number
  attribute_list: Attributelist[]
  image: Image
  weight: string
  dimension: Dimension
  logistic_info: Logisticinfo[]
  pre_order: {
    is_pre_order: boolean
    days_to_ship: number
  }
  condition: string
  size_chart: string
  item_status: string
  has_model: boolean
  brand: {
    brand_id: number
    original_brand_name: string
  }
  item_dangerous: number
  description_info: {
    extended_description: {
      field_list: Fieldlist[]
    }
  }
  description_type: string
  size_chart_id: number
  promotion_image: {
    image_id_list: string[]
    image_url_list: string[]
  }
  deboost: string
  compatibility_info: any
  authorised_brand_id: number
}

interface Fieldlist {
  field_type: string
  text: string
}

interface Logisticinfo {
  logistic_id: number
  logistic_name: string
  enabled: boolean
  size_id: number
  is_free: boolean
  estimated_shipping_fee: number
}

interface Dimension {
  package_length: number
  package_width: number
  package_height: number
}

interface Image {
  image_id_list: string[]
  image_url_list: string[]
  image_ratio: string
}

interface Attributelist {
  attribute_id: number
  original_attribute_name: string
  attribute_value_list: Attributevaluelist[]
  is_mandatory: boolean
}

interface Attributevaluelist {
  value_id: number
  original_value_name: string
  value_unit: string
}
