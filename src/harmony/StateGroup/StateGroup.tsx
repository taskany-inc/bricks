import React from 'react';

import { Dot } from '../Dot/Dot';
import { Group, GroupItem } from '../Group/Group';

import s from './StateGroup.module.css';

interface State {
    title: string;
    color?: string;
}

interface StateGroupProps {
    items: State[];
}

export const StateGroup = ({ items }: StateGroupProps) => {
    return (
        <Group>
            {items.map((item) => (
                <GroupItem key={item?.title}>
                    <Dot color={item?.color} title={item?.title} className={s.StateGroupDot} />
                </GroupItem>
            ))}
        </Group>
    );
};
