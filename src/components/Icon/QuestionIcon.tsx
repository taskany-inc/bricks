import React from 'react';
import icon from 'teenyicons/outline/question-circle.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const QuestionIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));
