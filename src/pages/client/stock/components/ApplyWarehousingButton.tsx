import { Button, Form } from "@arco-design/web-react"
import ApplyWarehousingModal from "./ApplyWarehousingModal"
import { ReactNode, useEffect, useState } from "react"
import { useRequest } from "ahooks"
import { WarehousingApplyAPI } from "@/api/client/stock"
import { showMessage } from "@/utils"

interface ApplyWarehousingButtonProps {
  refreshSearchTable: () => void
  children?: ReactNode
  productInfo?: any
}

const ApplyWarehousingButton = (props: ApplyWarehousingButtonProps) => {
  const { refreshSearchTable, productInfo, children = '入库申请' } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { run, loading } = useRequest(async () => {
    const formData = await form.validate()
    return showMessage(() => WarehousingApplyAPI.insert({
      ...formData,
      expressNo: formData.expressNo?.toString(),
      stockStorageApplyProductList: formData.stockStorageApplyProductList.map(item => ({
        logisticsProductId: item.id,
        sendProductCount: item.num, // 发货数量
      })),
    })).then(() => {
      setVisible(false)
      refreshSearchTable();
    })
  }, {
    manual: true,
  })

  useEffect(() => {
    if (visible) {
      if (productInfo) {
        form.setFieldsValue({
          stockStorageApplyProductList: [{
            ...productInfo,
            num: 20,
          }],
        })
      } else {
        form.resetFields();

      }
    }
  }, [visible, productInfo])

  return <>
    <Button
      type="primary"
      onClick={() => {
        setVisible(true)
      }}
      status="warning"
    >
      {children}
    </Button>
    <ApplyWarehousingModal
      form={form}
      modalProps={{
        visible,
        title: '入库申请',
        onCancel: () => setVisible(false),
        confirmLoading: loading,
        onOk: async () => {
          run()
        },
      }}
    ></ApplyWarehousingModal>
  </>
}
export default ApplyWarehousingButton