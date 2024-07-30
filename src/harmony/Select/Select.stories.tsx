import { useState } from 'react';
import { Meta } from '@storybook/react';

import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

import { Select, SelectPanel, SelectTrigger } from './Select';

const meta: Meta = {
    title: '@harmony/Select',
    component: Select,
};

export default meta;
const items = [
    { id: 'asdasd', title: 'title 1' },
    { id: 'awwqe', title: 'title 2' },
];

export const Default = () => {
    const [value, setValue] = useState([]);
    return (
        <Select
            mode="single"
            onChange={setValue}
            items={items}
            isOpen
            value={value}
            renderItem={({ item }) => <Text>{item.title}</Text>}
        >
            <SelectTrigger
                renderTrigger={({ onClick, ref, isOpen }) => (
                    <Button onClick={onClick} ref={ref} text={isOpen ? 'Close' : 'Open'} />
                )}
            />
            <SelectPanel />
        </Select>
    );
};
