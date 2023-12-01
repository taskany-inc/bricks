import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../Text/Text';
import { Input } from '../Input/Input';
import { MenuItem } from '../MenuItem';
import { nullable } from '../../utils';

import { ComboBox } from './ComboBox';

export default {
    title: 'ComboBox',
    component: ComboBox,
} as Meta<typeof ComboBox>;

interface Item {
    name: string;
    description: string;
}

const allItems: Item[] = [
    { name: 'one', description: 'First item' },
    { name: 'two', description: 'Second item' },
    { name: 'three', description: 'Third item' },
];

export const Default: StoryFn<typeof ComboBox> = () => {
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState<Item>();

    const items = useMemo(() => {
        return allItems.filter((item) => item.name.includes(search));
    }, [search]);

    return (
        <>
            {nullable(selectedItem, (item) => (
                <Text>
                    {item.name} - {item.description}
                </Text>
            ))}
            <ComboBox
                value={search}
                onChange={(value: Item) => {
                    setSearch(value.name);
                    setSelectedItem(value);
                    setVisible(false);
                }}
                visible={visible}
                items={items}
                renderInput={(props) => (
                    <Input
                        onChange={(e) => {
                            setSelectedItem(undefined);
                            setSearch(e.target.value);
                        }}
                        onFocus={() => setVisible(true)}
                        {...props}
                    />
                )}
                onClickOutside={(cb) => {
                    cb();
                }}
                onClose={() => setVisible(false)}
                renderItem={(props) => (
                    <MenuItem
                        key={props.item.name}
                        focused={props.cursor === props.index}
                        onClick={props.onClick}
                        ghost
                    >
                        {props.item.name}
                    </MenuItem>
                )}
            />
        </>
    );
};
