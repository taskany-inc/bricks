import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';
import { nullable } from '../../utils';

import s from './FiltersBar.module.css';

interface FilterBarCounterProps {
    counter?: number;
    total?: number;
}

export const FiltersBarCounter: FC<FilterBarCounterProps> = ({ counter, total }) => (
    <Text className={s.FiltersBarCounter} size="s">
        {nullable(
            counter === undefined || total === counter,
            () => total,
            <>
                <span key="counter">{counter}</span>
                {`/${total}`}
            </>,
        )}
    </Text>
);

export const FiltersBar: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <div className={cn(s.FiltersBar, className)} {...props}>
        {children}
    </div>
);

export const FiltersBarTitle: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <Text className={cn(s.FiltersBarTitle, className)} {...props}>
        {children}
    </Text>
);

interface FilterBarItem extends HTMLAttributes<HTMLDivElement> {
    layout?: 'default' | 'fill';
}

export const FiltersBarItem: FC<FilterBarItem> = ({ children, className, layout = 'default', ...props }) => (
    <div className={cn(s.FiltersBarItem, { [s.FiltersBarItemCenter]: layout === 'fill' }, className)} {...props}>
        {children}
    </div>
);

export const FiltersBarControlGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
    <div className={cn(s.FiltersBarControlGroup, className)} {...props}>
        {children}
    </div>
);
