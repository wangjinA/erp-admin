import { orderAPI } from "@/api/admin/order";
import { downloadPdfsToZip } from "@/utils/file";
import { Alert, Button, Message, Modal, Progress } from "@arco-design/web-react";
import { useRequest } from "ahooks";
import { useMemo, useState } from "react";

export default (props: {
  selectIds: string[];
  getPageQuery: (otherQuery: any, isBindSelect?: boolean) => any;
}) => {
  const { selectIds, getPageQuery } = props;
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)
  const contentText = useMemo(() => {
    return `批量下载面单 ${selectIds.length ? `(${selectIds.length}个)` : ''}`
  }, [selectIds.length])

  const countSheetFileHandle = useRequest(() => {
    return orderAPI.countSheetFile(getPageQuery({}, true)).then(r => {
      const data = r.data.data
      if(data.count === data.total) {
        Message.error('没有可下载的面单，请检查相关信息！')
        return ;
      }
      setVisible(true);
      return r.data.data
    })
  }, {
    manual: true
  })

  const { data, loading, run, mutate } = useRequest(async () => {
    const sheetFileRes = await orderAPI.getDownloadSheetFile(getPageQuery({}, true))
    const urls = sheetFileRes.data.data.list.map(o => o.documentUrl)
    return downloadPdfsToZip(urls, (progress) => {
      setProgress(progress.percentage)
    }).then(res => {
      if (!res?.results?.failed) {
        setVisible(false)
        Message.success({
          duration: 3000,
          content: '下载成功',
        })
      }
      return res;
    })
  }, {
    manual: true
  })

  return <>
    <Button
      type="outline"
      loading={countSheetFileHandle.loading}
      onClick={async () => {
        mutate(null);
        countSheetFileHandle.mutate(null);
        countSheetFileHandle.run()
      }}
    >
      {contentText}
    </Button >
    <Modal
      title={contentText}
      onOk={() => {
        run()
      }}
      okText={loading ? '下载中' : `确认下载 ${countSheetFileHandle.data?.total - countSheetFileHandle.data?.count} 条`}
      confirmLoading={loading}
      visible={visible}
      onCancel={() => {
        setVisible(false)
      }}
      cancelText="关闭"
    >
      {
        (loading || data) ? <div>
          <div className="flex gap-2">
            <span>下载进度：</span>
            <Progress className="flex-1" percent={progress} status='success' animation width={300} />
          </div>
          {
            data?.results?.failed ? <Alert className="mt-4" showIcon={true} type='error' content={`下载失败 ${data.results.failed} 个`} /> : null
          }
        </div>
          : <div>
            {countSheetFileHandle.data?.count ? `确认下载全部面单？其中有 ${countSheetFileHandle.data.count} 条数据暂未获取到面单，是否继续下载？` : '确认下载全部面单？'}
          </div>
      }
    </Modal>
  </>
}