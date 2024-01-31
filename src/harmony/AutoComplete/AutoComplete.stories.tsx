import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { IconSearchOutline } from '@taskany/icons';

import { Checkbox } from '../Checkbox/Checkbox';

import { AutoComplete, AutoCompleteInput, AutoCompleteList, AutoCompleteRadioGroup } from './AutoComplete';

type Component = typeof AutoComplete;
type Props = React.ComponentProps<Component>;

export default {
    title: '@harmony/AutoComplete',
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

interface FocusableItemProps extends React.HTMLAttributes<HTMLDivElement> {
    focused?: boolean;
}

const FocusableItem: React.FC<FocusableItemProps> = ({ focused, children, style = {}, ...attr }) => (
    <div style={{ backgroundColor: focused ? 'lightgrey' : 'transparent', ...style }} {...attr}>
        {children}
    </div>
);

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
            renderItem={(props) => (
                <FocusableItem
                    focused={props.active}
                    onClick={props.onItemClick}
                    onMouseLeave={props.onMouseLeave}
                    onMouseMove={props.onMouseMove}
                >{`${props.item.id}: ${props.item.title}`}</FocusableItem>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Type `tit...` for search"
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
                <FocusableItem
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    focused={props.active}
                    onMouseLeave={props.onMouseLeave}
                    onMouseMove={props.onMouseMove}
                >
                    <Checkbox
                        checked={props.checked}
                        onChange={props.onItemClick}
                        value={props.item.id}
                        name="item"
                        label={`${props.item.id}: ${props.item.title}`}
                    />
                </FocusableItem>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Type `tit...` for search"
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
                <FocusableItem focused={props.active} onMouseLeave={props.onMouseLeave} onMouseMove={props.onMouseMove}>
                    <label onClick={props.onItemClick}>
                        <span>{`${props.item.id}: ${props.item.title}`}</span>
                    </label>
                </FocusableItem>
            )}
        >
            <AutoCompleteInput
                type="text"
                value={value}
                onChange={setValue}
                iconLeft={<IconSearchOutline size="s" />}
                placeholder="Type `tit...` for search"
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

// const Wrapper = ({ children }: React.PropsWithChildren) => <Table gap={10}>{children}</Table>;

// export const MultipleWithTable: StoryFn<Props> = (args) => {
//     const [value, setValue] = useState('');
//     const [list, setList] = useState<Items>([]);

//     useEffect(() => {
//         if (value.length >= 3) {
//             setList(data.filter(({ title }) => title.toLowerCase().includes(value.toLowerCase())).slice(0, 10));
//         } else {
//             setList([]);
//         }
//     }, [value]);

//     return (
//         <AutoComplete
//             mode="multiple"
//             items={list}
//             onChange={args.onChange}
//             keyGetter={(item) => item.id}
//             renderItems={Wrapper}
//             renderItem={(props) => (
//                 <TableRow
//                     gap={5}
//                     key={props.item.id}
//                     interactive
//                     focused={props.active || props.hovered}
//                     style={{ borderRadius: '5px' }}
//                 >
//                     <TableCell min>
//                         <Checkbox onClick={props.onItemClick} name="item">
//                             <CheckboxInput checked={props.checked} value={props.item.id} />
//                         </Checkbox>
//                     </TableCell>
//                     <TableCell width="4ch" justify="end">
//                         {props.item.id}
//                     </TableCell>
//                     <TableCell>{props.item.title}</TableCell>
//                 </TableRow>
//             )}
//         >
//             <AutoCompleteInput
//                 type="text"
//                 value={value}
//                 onChange={setValue}
//                 iconLeft={<IconSearchOutline size="s" />}
//                 placeholder="Type `tit...` for search"
//             />
//             <AutoCompleteList selected />
//             <AutoCompleteList filterSelected title="Sugesstions" />
//         </AutoComplete>
//     );
// };

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
            <FocusableItem focused={props.active} onMouseLeave={props.onMouseLeave} onMouseMove={props.onMouseMove}>
                <Checkbox
                    onChange={props.onItemClick}
                    name="item"
                    checked={props.checked}
                    value={props.item.id}
                    label={props.item.title}
                />
            </FocusableItem>
        )}
    >
        <AutoCompleteList />
    </AutoComplete>
);
