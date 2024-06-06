import React, { ReactNode } from 'react';
import { TooltipProps } from '@arco-design/web-react/es/Tooltip';
import TipLabel from './TipLabel';

export interface LabelWithTipsProps extends Pick<TooltipProps, 'position'> {
  label?: ReactNode;
  tips?: ReactNode;
}

const LabelWithTips: React.FC<LabelWithTipsProps> = ({
  label,
  tips,
  position = 'top',
}) => {
  if (tips) {
    return (
      <TipLabel
        label={label}
        tipContent={tips}
        toolTipProps={{
          position,
        }}
      />
    );
  }

  return <>{label}</>;
};

export default LabelWithTips;
