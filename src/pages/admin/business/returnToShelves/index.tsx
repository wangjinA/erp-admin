import ScanCommon, { ScanMinWidth } from '../ScanCommon';
import FilterForm from '@/components/FilterForm';
import dayjs from 'dayjs';
import { useRequest } from 'ahooks';
import { Form } from '@arco-design/web-react';
import { showMessage } from '@/utils';
import { useState } from 'react';
import { EmitTypes, useEventBus } from '@/hooks/useEventBus';
import { ScanResult } from '../deposit';
import { scanAPI } from '@/api/admin/entrepot';
import { OrderPageDict } from '@/pages/client/order/orderPage';
export default function returnToShelves() {

  const [trackingNo, setTrackingNo] = useState<string>()
  const [form] = Form.useForm();

  const scanHandle = useRequest(async (v) => {
    const formData = await form.validate()
    return showMessage(() => scanAPI.scanMarkOverseasWarehouseReturnOrder({
      shopeeOrderNo: v.trackingNo,
      overseasWarehouseListingTime: formData.startTime,
      overseasWarehouseDelistingTime: formData.endTime,
    })).then(r => r.data.data)
  }, {
    manual: true
  })

  // 其他刷新都是基于这个bug，复用一下
  useEventBus(EmitTypes.refreshOrderPage, () => {
    scanHandle.refresh()
  })

  return (
    <div className="bg-white py-6 px-4">
      <ScanCommon
        loading={scanHandle.loading}
        isAuto={true}
        placeholder="扫描单号或者输入单号"
        showAlert={false}
        onScan={(info) => {
          setTrackingNo(info.trackingNo)
          scanHandle.run(info)
        }}
      />
      <FilterForm
        form={form}
        className="mx-auto w-1/2 mt-4"
        style={{
          minWidth: ScanMinWidth,
        }}
        initialValues={{
          startTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          endTime: dayjs().add(1, 'month').format('YYYY-MM-DD HH:mm:ss'),
        }}
        formItemConfigList={[{
          schema: {
            label: '上架时间',
            field: 'startTime',
            span: 12,
            required: true
          },
          control: 'datePicker',
        }, {
          schema: {
            label: '下架时间',
            field: 'endTime',
            span: 12,
            required: true,
          },
          control: 'datePicker',
        }]}></FilterForm>
      <ScanResult
        trackingNo={trackingNo}
        scanHandle={scanHandle}
        dictCode={OrderPageDict.OUT_ORDER_STATUS}
      />
    </div>
  );
};
