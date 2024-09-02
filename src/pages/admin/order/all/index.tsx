import React from 'react'

import OrderPage, { OrderPageType } from '@/pages/client/order/orderPage'

export default (props: {}) => {
  return <OrderPage type={OrderPageType.PACK_ORDER}></OrderPage>
}
