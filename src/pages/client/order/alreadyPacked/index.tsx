import React from 'react'

import OrderPage, { OrderPageType } from '../orderPage'

export default (props) => {
  return <OrderPage type={OrderPageType.PACK_ORDER}></OrderPage>
}
