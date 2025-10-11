import { Button, Form, Input, Modal } from '@arco-design/web-react'
import { ButtonProps } from '@arco-design/web-react/lib'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import { orderAPI } from '@/api/admin/order'
import { EmitTypes, bus } from '@/hooks/useEventBus'
import { showMessage } from '@/utils'

interface RemarkButtonProps {
  buttonProps?: ButtonProps
  id: string
}

export default function RemarkButton(props: RemarkButtonProps) {
  const { buttonProps, id } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()

  const { run: updateRemark, loading } = useRequest(async (values: { remark: string }) => {
    await showMessage(() => orderAPI.updateRemark({
      orderId: id,
      remark: values.remark,
    }), '修改仓库备注')
    bus.emit(EmitTypes.refreshOrderPage)
  }, {
    manual: true,
  })

  return (
    <div>
      <Button type="primary" {...buttonProps} onClick={() => setVisible(true)}>
        仓库备注
      </Button>

      <Modal
        title="操作记录"
        visible={visible}
        onCancel={() => setVisible(false)}
        cancelText="关闭"
        unmountOnExit={true}
        onOk={async () => {
          const res = form.getFieldValue('remark')
          updateRemark({ remark: res ?? '' })
          setVisible(false)
          form.resetFields()
        }}
        confirmLoading={loading}
      >
        <Form form={form}>
          <Form.Item label="仓库备注" field="remark">
            <Input placeholder="请输入仓库备注" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
