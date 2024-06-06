import React, { ReactNode } from 'react';
import { Tooltip } from '@arco-design/web-react';
import { TooltipProps } from '@arco-design/web-react/lib/Tooltip';
import { IconQuestionCircle } from '@arco-design/web-react/icon';

type Props = {
  label: ReactNode;
  tipContent: ReactNode;
  toolTipProps?: TooltipProps;
};

const TipLabel = (props: Props) => {
  const { label, tipContent, toolTipProps = {} } = props;

  return (
    <span>
      {label}
      <Tooltip {...toolTipProps} content={tipContent}>
        <IconQuestionCircle style={{ marginLeft: 4 }} />
      </Tooltip>
    </span>
  );
};

export default TipLabel;
