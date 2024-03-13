import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Badge } from '../Badge/Badge';

import classes from './Checkbox.module.css';

type BadgeProps = Omit<
    React.ComponentPropsWithoutRef<typeof Badge>,
    keyof React.HTMLAttributes<HTMLSpanElement> | 'size' | 'view' | 'weight' | 'iconLeft' | 'as' | 'text'
>;

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement>, BadgeProps {
    label?: React.ReactNode;
    view?: 'default' | 'rounded';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, className, view = 'default', strike, iconRight, lines, wordBreak, wordWrap, ellipsis, ...rest }, ref) => (
        <Badge
            as="label"
            size="s"
            weight="regular"
            className={cn(classes.Checkbox, className, {
                [classes.CheckboxDisabled]: rest.disabled,
                [classes.CheckboxRounded]: view === 'rounded',
                [classes.CheckboxReadonly]: rest.readOnly,
            })}
            iconLeft={<input className={cn(classes.CheckboxInput)} type="checkbox" ref={ref} {...rest} />}
            text={nullable(label, (labelComponent) => (
                <span className={cn(classes.CheckboxLabel)}>{labelComponent}</span>
            ))}
            strike={strike}
            iconRight={iconRight}
            lines={lines}
            wordBreak={wordBreak}
            wordWrap={wordWrap}
            ellipsis={ellipsis}
        />
    ),
);
