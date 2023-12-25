import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { IconSearchOutline } from '@taskany/icons';

import { Table, TableRow, TableCell } from '../Table/Table';
import { Checkbox, CheckboxInput, CheckboxLabel } from '../Checkbox/Checkbox';

import { AutoComplete, AutoCompleteList, AutoCompleteRadioGroup, AutoCompleteInput } from './AutoComplete';

type Component = typeof AutoComplete;
type Props = React.ComponentProps<Component>;

export default {
    title: 'AutoComplete',
    component: AutoComplete,
    argTypes: {
        onChange: { action: 'onChange' },
    },
} as Meta<Component>;

interface Item {
    id: string;
    title: string;
}

type Items = Array<Item>;

const data: Items = Array.from({ length: 1000 }, (_, i) => {
    const value = i + 1;

    return {
        id: String(value),
        title: `Title ${value}`,
    };
});

export const Single: StoryFn<Props> = (args) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Items>([]);

    useEffect(() => {
        if (value.length >= 3) {
            setList(data.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())).slice(0, 10));
        } else {
            setList([]);
        }
    }, [value]);

    return (
        <AutoComplete
            mode="single"
            items={list}
            onChange={args.onChange}
            keyGetter={(item) => item.id}
            renderItem={(props) => <div onClick={props.onItemClick}>{`${props.item.id}: ${props.item.title}`}</div>}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Search..."
            />
            <AutoCompleteList title="Suggesstions" />
        </AutoComplete>
    );
};

export const Multiple: StoryFn<Props> = (args) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Items>([]);

    useEffect(() => {
        if (value.length >= 3) {
            setList(data.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())).slice(0, 10));
        } else {
            setList([]);
        }
    }, [value]);

    return (
        <AutoComplete
            mode="multiple"
            items={list}
            onChange={args.onChange}
            keyGetter={(item) => item.id}
            renderItem={(props) => (
                <div style={{ backgroundColor: props.active || props.hovered ? 'lightgrey' : 'transparent' }}>
                    <Checkbox onClick={props.onItemClick} name="item">
                        <CheckboxInput checked={props.checked} value={props.item.id} />
                        <CheckboxLabel>
                            {props.item.id}: {props.item.title}
                        </CheckboxLabel>
                    </Checkbox>
                </div>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Search..."
            />
            <AutoCompleteList title="Your choise" selected />
            <AutoCompleteList title="Suggesstions" filterSelected />
        </AutoComplete>
    );
};

const radios = [
    { title: 'Simple', value: 'simple' },
    { title: 'Goal', value: 'goal' },
];

export const WithRadio: StoryFn<Props> = (args) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Items>([]);
    const [mode, setMode] = useState<(typeof radios)[number]['value']>('simple');

    useEffect(() => {
        if (mode === 'goal') {
            if (value.length >= 3) {
                setList(data.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())).slice(0, 10));
            } else {
                setList([]);
            }
        } else {
            setList([]);
        }
    }, [value, mode]);

    return (
        <AutoComplete
            mode="single"
            items={list}
            onChange={args.onChange}
            keyGetter={(item) => item.id}
            renderItem={(props) => (
                <div key={props.item.id}>
                    <label onClick={props.onItemClick}>
                        <span>{`${props.item.id}: ${props.item.title}`}</span>
                    </label>
                </div>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Search..."
            />
            <AutoCompleteRadioGroup
                title="Mode"
                items={radios}
                name="mode"
                onChange={(val) => setMode(val.value)}
                value={mode}
            />
            <AutoCompleteList title="Suggesstions" />
        </AutoComplete>
    );
};

const Wrapper = ({ children }: React.PropsWithChildren) => <Table gap={10}>{children}</Table>;

export const MultipleWithTable: StoryFn<Props> = (args) => {
    const [value, setValue] = useState('');
    const [list, setList] = useState<Items>([]);

    useEffect(() => {
        if (value.length >= 3) {
            setList(data.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())).slice(0, 10));
        } else {
            setList([]);
        }
    }, [value]);

    return (
        <AutoComplete
            mode="multiple"
            items={list}
            onChange={args.onChange}
            keyGetter={(item) => item.id}
            renderItems={Wrapper}
            renderItem={(props) => (
                <TableRow
                    gap={5}
                    key={props.item.id}
                    interactive
                    focused={props.active || props.hovered}
                    style={{ borderRadius: '5px' }}
                >
                    <TableCell min>
                        <Checkbox onClick={props.onItemClick} name="item">
                            <CheckboxInput checked={props.checked} value={props.item.id} />
                        </Checkbox>
                    </TableCell>
                    <TableCell width="4ch" justify="end">
                        {props.item.id}
                    </TableCell>
                    <TableCell>{props.item.title}</TableCell>
                </TableRow>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Search..."
            />
            <AutoCompleteList selected />
            <AutoCompleteList filterSelected title="Sugesstions" />
        </AutoComplete>
    );
};
const finiteList: Items = Array.from({ length: 5 }, (_, i) => {
    const value = i + 1;

    return {
        id: String(value),
        title: `Title ${value}`,
    };
});

export const MultipleFiniteList: StoryFn<Props> = (args) => (
    <AutoComplete
        mode="multiple"
        onChange={args.onChange}
        keyGetter={(item) => item.id}
        items={finiteList}
        value={finiteList.slice(2, 4)}
        renderItem={(props) => (
            <Checkbox onClick={props.onItemClick} name="item">
                <CheckboxInput checked={props.checked} value={props.item.id} />
                <CheckboxLabel>{props.item.title}</CheckboxLabel>
            </Checkbox>
        )}
    >
        <AutoCompleteList />
    </AutoComplete>
);
