import React from 'react';
import { Button, Radio } from '@arco-design/web-react';

export default (props) => {
  const data = [
    {
      label: '全部',
      value: '0',
    },
    {
      label: '仓库1',
      value: '1',
    },
    {
      label: '仓库2',
      value: '2',
    },
    {
      label: '仓库3',
      value: '3',
    },
  ];
  return (
    <Radio.Group {...props}>
      {data.map((item) => {
        return (
          <Radio key={item.value} value={item.value}>
            {({ checked }) => {
              return (
                <Button
                  tabIndex={-1}
                  key={item.value}
                  type={checked ? 'primary' : 'default'}
                >
                  {item.label}
                </Button>
              );
            }}
          </Radio>
        );
      })}
    </Radio.Group>
  );
};
