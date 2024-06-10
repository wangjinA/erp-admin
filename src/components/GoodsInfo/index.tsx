import React from 'react';
import { List, Image, Descriptions } from '@arco-design/web-react';
import styles from './index.module.less';
import classNames from 'classnames';
export default () => {
  return (
    <div
      style={{ height: 'max-content', overflow: 'hidden' }}
      className="arco-list-style"
    >
      <List
        className={classNames(styles['goods-info'])}
        dataSource={new Array(4).fill({
          title: 'Beijing Bytedance Technology Co., Ltd.',
          description:
            'Beijing ByteDance Technology Co., Ltd. is an enterprise located in China.',
        })}
        render={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={
                <Image
                  width={80}
                  height={80}
                  src="https://img.alicdn.com/bao/uploaded/i1/2200798012881/O1CN01pZ7wCC1X9XeviUTY2_!!0-item_pic.jpg"
                />
              }
              title={
                '遮陽網 防曬網 隔熱網 加密 加厚 隔熱 降溫 黑色大棚樓頂太陽網遮陽 防曬網佈'
              }
              description={
                <Descriptions
                  size="mini"
                  column={2}
                  colon=" :"
                  data={[
                    {
                      label: '单  价',
                      value: '729',
                    },
                    {
                      label: '数  量',
                      value: '12',
                    },
                    {
                      label: '规格名称',
                      value: '全新料30針[店長推薦款],3米寬30米長整捲',
                      span: 24,
                    },
                    {
                      label: '规格SKU',
                      value:
                        '456767407574_全新料30針[店長推薦款]_3米寬30米長整捲',
                      span: 24,
                    },
                  ]}
                  labelStyle={{ textAlign: 'right' }}
                  style={{ marginBottom: 20 }}
                />
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};
