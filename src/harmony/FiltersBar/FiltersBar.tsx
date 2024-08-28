import React, { ComponentProps, FC, HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';
import { IconAddOutline, IconAdjustHorizontalSolid } from '@taskany/icons';

import { Dropdown, DropdownPanel, DropdownTrigger } from '../Dropdown/Dropdown';
import { Text } from '../Text/Text';
import { nullable } from '../../utils';
import { Button } from '../Button/Button';
import { Select, SelectPanel, SelectTrigger } from '../Select/Select';

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

interface FiltersBarViewDropdownProps {
    children?: ReactNode;
    title?: string;
}

export const FiltersBarViewDropdown: FC<FiltersBarViewDropdownProps> = ({ children, title }) => {
    return (
        <Dropdown>
            <DropdownTrigger className={s.FiltersBarViewDropdownDrigger} view="fill">
                <div className={s.FiltersBarViewDropdownDrigger}>
                    <IconAdjustHorizontalSolid size="xxs" />
                    {nullable(title, (t) => (
                        <Text size="s">{t}</Text>
                    ))}
                </div>
            </DropdownTrigger>
            <DropdownPanel width={335} placement="bottom-start" className={s.FiltersBarDropdownPanel}>
                <div className={s.FiltersBarDropdownPanelContainer}>{children}</div>
            </DropdownPanel>
        </Dropdown>
    );
};

interface AddFilterDropdownProps<T> {
    items: T[];
    onChange: (value: T[]) => void;
    title?: string;
}
export const AddFilterDropdown = <T extends { id: string; title: string }>({
    items,
    onChange,
    title,
}: AddFilterDropdownProps<T>) => {
    return (
        <Select
            items={items}
            mode="single"
            onChange={onChange}
            renderItem={(props) => <Text size="s">{props.item.title}</Text>}
        >
            <SelectTrigger
                renderTrigger={(props) =>
                    nullable(Boolean(items.length), () => (
                        <Button
                            text={title}
                            iconLeft={<IconAddOutline size="xxs" />}
                            onClick={props.onClick}
                            ref={props.ref}
                        />
                    ))
                }
            />
            <SelectPanel placement="bottom" />
        </Select>
    );
};

export const FiltersBarDropdownTitle: FC<ComponentProps<typeof Text>> = ({ children }) => {
    return (
        <Text className={s.FiltersBarDropdownTitle} weight="bold">
            {children}
        </Text>
    );
};

export const FiltersBarDropdownContent: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return <div className={s.FiltersBarDropdownContent}>{children}</div>;
};
