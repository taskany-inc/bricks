import React, { TextareaHTMLAttributes, forwardRef, useMemo } from 'react';
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
    height?: number | string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, view = 'default', brick, outline, height, style, ...rest }, ref) => {
        const classes = [
            s.Textarea,
            viewMap[view],
            brick ? brickMap[brick] : '',
            { [s.Textarea_outline]: outline },
            className,
        ];

        const styles = useMemo(() => {
            const map: Record<string, unknown> = {};

            if (height) {
                map['--textarea-height'] = typeof height === 'number' ? `${height}px` : height;
            }

            return {
                ...map,
                ...style,
            };
        }, [height, style]);

        return <textarea className={cn(classes)} ref={ref} style={styles} {...rest} />;
    },
);
