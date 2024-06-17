import React, { useState } from 'react';
import { baseURL } from '@/api';
import { Upload, Message } from '@arco-design/web-react';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { toArray } from '@/utils';
import { UploadProps } from '@arco-design/web-react/lib';
type Props = UploadProps & {
  value?: string | string[];
  fileSize?: number;
  onChange?: (urls: string | string[]) => void;
};

export default (props: Props) => {
  const { value, onChange, fileSize = 10, ...uploadProps } = props;
  const urls = toArray(value).filter(Boolean);
  const [fileList, setFileList] = useState<UploadItem[]>(
    urls.map((v) => ({
      uid: v.split('/').pop(),
      url: v,
    }))
  );

  const action = `${baseURL}/api/file/upload`;
  return (
    <Upload
      multiple={false}
      action={action}
      fileList={fileList}
      imagePreview
      accept="image/*"
      beforeUpload={(file) => {
        if (file.size > fileSize * 1024 * 1024) {
          const errMsg = `图片大小不能超过${fileSize}M`;
          Message.error(errMsg);
          return Promise.reject(new Error(errMsg));
        }
        return Promise.resolve();
      }}
      onRemove={(e) => {
        setFileList(fileList.filter((item) => item.url !== e.url));
      }}
      listType="picture-card"
      onChange={(list) => {
        const ls = list.map((item) => ({
          ...item,
          url: item.url || (item.response as any)?.data,
        }));
        setFileList(ls);
        const fileUrls = ls.map((item) => item.url).filter(Boolean);
        if (uploadProps.limit === 1) {
          const target = fileUrls[0];
          onChange(target);
        } else {
          onChange(fileUrls);
        }
      }}
      tip={`仅支持${fileSize}M以下`}
      onProgress={(file) => {
        setFileList((v) => {
          return v.map((x) => {
            return x.uid === file.uid ? file : x;
          });
        });
      }}
      {...uploadProps}
    ></Upload>
  );
};