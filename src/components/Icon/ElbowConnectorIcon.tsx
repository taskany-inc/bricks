import React from 'react';
import icon from 'teenyicons/outline/elbow-connector.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ElbowConnectorIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));
