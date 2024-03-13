import React, { forwardRef } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Badge } from '../Badge/Badge';

import classes from './Radio.module.css';

type BadgeProps = Omit<
    React.ComponentPropsWithoutRef<typeof Badge>,
    keyof React.HTMLAttributes<HTMLSpanElement> | 'size' | 'view' | 'weight' | 'iconLeft' | 'as' | 'text'
>;

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement>, BadgeProps {
    label?: React.ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, className, checked, strike, iconRight, lines, wordBreak, wordWrap, ellipsis, ...rest }, ref) => (
        <Badge
            as="label"
            size="s"
            weight="regular"
            className={cn(classes.Radio, className, {
                [classes.RadioDisabled]: rest.disabled,
                [classes.RadioReadonly]: rest.readOnly,
            })}
            iconLeft={
                <input className={cn(classes.RadioInput)} type="radio" ref={ref} {...rest} defaultChecked={checked} />
            }
            text={nullable(label, (labelComponent) => (
                <span className={cn(classes.RadioLabel)}>{labelComponent}</span>
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
