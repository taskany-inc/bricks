import React, { useState, useEffect, useCallback } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { IconSearchOutline } from '@taskany/icons';

import { AutoComplete, AutoCompleteList, AutoCompleteRadioGroup, AutoCompleteInput } from '../components/AutoComplete';
import { Table, TableRow, TableCell } from '../components/Table';
import { Checkbox } from '../components/Checkbox';

type Component = typeof AutoComplete;
type Props = React.ComponentProps<Component>;

export default {
    title: 'AutoComplete',
    component: AutoComplete,
    subcomponents: { AutoCompleteList, AutoCompleteRadioGroup, AutoCompleteInput },
    argTypes: {
        onChange: { action: 'onChange' },
    },
} as Meta<Component>;

type Item = {
    id: string;
    title: string;
};

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
            renderItem={(props) => (
                <Checkbox
                    key={props.item.id}
                    onClick={props.onItemClick}
                    label={`${props.item.id}: ${props.item.title}`}
                    name="item"
                    checked={props.checked}
                    value={props.item.id}
                />
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
            <AutoCompleteList title="Suggesstions" />
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
            renderItems={({ children }) => <Table gap={10}>{children}</Table>}
            renderItem={(props) => (
                <TableRow gap={5} key={props.item.id}>
                    <TableCell min>
                        <Checkbox
                            value={props.item.id}
                            onClick={props.onItemClick}
                            name="item"
                            checked={props.checked}
                        />
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
            <AutoCompleteList title="Suggesstions" />
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
        items={finiteList}
        value={finiteList.slice(2, 4)}
        renderItem={(props) => (
            <Checkbox
                key={props.item.id}
                onClick={props.onItemClick}
                label={props.item.title}
                name="item"
                checked={props.checked}
                value={props.item.id}
            />
        )}
    >
        <AutoCompleteList />
    </AutoComplete>
);
