import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './Textarea.module.css';

const viewMap = {
    default: s.Textarea_default,
    success: s.Textarea_success,
    danger: s.Textarea_danger,
};

const brickMap = {
    top: s.Textarea_brick_top,
    bottom: s.Textarea_brick_bottom,
    center: s.Textarea_brick_center,
};

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'children'> {
    view?: keyof typeof viewMap;
    brick?: keyof typeof brickMap;
    outline?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, view = 'default', brick, outline = true, ...rest }, ref) => {
        const classes = [
            s.Textarea,
            viewMap[view],
            brick ? brickMap[brick] : '',
            { [s.Textarea_outline]: outline },
            className,
        ];

        return <textarea className={cn(classes)} ref={ref} {...rest} />;
    },
);
