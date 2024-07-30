import classNames from 'classnames';
import React from 'react';
import styles from './index.module.less';
import { Descriptions, Link } from '@arco-design/web-react';

interface SendCargoInfoProps {
  data: any;
}
const SkuList: React.FC<SendCargoInfoProps> = (props) => {
  const { data } = props;
  return (
    <div className={classNames(styles['goods-info'], 'pr-2')}>
      {data.orderProductVOList?.map((item, i) => (
        <div
          key={i}
          className={classNames('h-28 pt-2 border-r', i > 0 ? 'border-t' : '')}
        >
          <Descriptions
            size="small"
            column={1}
            colon=" :"
            data={[
              {
                label: '快递',
                value: (
                  <Link
                    href={`https://www.baidu.com/s?wd=${item.trackingNo}`}
                    target="_blank"
                  >
                    {item.trackingNo}
                  </Link>
                ),
              },
              {
                label: '仓位',
                value: item.freightSpaceName || '-',
              },
            ]}
            labelStyle={{ textAlign: 'right' }}
            style={{ marginBottom: 20 }}
          />
        </div>
      ))}
    </div>
  );
};

export default SkuList;
