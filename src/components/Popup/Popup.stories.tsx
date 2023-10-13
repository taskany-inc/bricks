import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { IconEditOutline } from '@taskany/icons';
import styled from 'styled-components';

import { Button } from '../Button/Button';
import { MenuItem } from '../MenuItem';
import { Text } from '../Text/Text';

import { Popup } from './Popup';

const Box = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 36px;
`;

const meta: Meta<typeof Popup> = {
    title: 'Popup',
    component: Popup,
};

export default meta;

type Story = StoryObj<typeof meta>;

interface ShownPopupProps {
    items: { title: string }[];
    minWidth?: number;
    maxWidth?: number;
    placement: React.ComponentProps<typeof Popup>['placement'];
    text?: string;
}

const ShownPopup: React.FC<ShownPopupProps> = ({ items, minWidth = 100, maxWidth, placement }) => {
    const ref = React.useRef(null);
    return (
        <div>
            <Button text="open" ref={ref} />
            <Popup visible reference={ref} minWidth={minWidth} maxWidth={maxWidth} placement={placement} interactive>
                <div>
                    <Text size="xxs">
                        minW={minWidth}; maxW={maxWidth}
                    </Text>
                    {items?.map((item, index) => {
                        return (
                            <MenuItem
                                key={index}
                                focused={index === 0}
                                // eslint-disable-next-line no-console
                                onClick={() => console.log('click')}
                                view="primary"
                                ghost
                                icon={<IconEditOutline size="xxs" />}
                            >
                                {item.title}
                            </MenuItem>
                        );
                    })}
                </div>
            </Popup>
        </div>
    );
};

const items1 = [{ title: 'lorem ipsum' }, { title: 'lorem ipsum' }, { title: 'lorem ipsum' }];
const items2 = [{ title: 'lor' }, { title: 'em' }];
const items3 = [
    { title: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum' },
    { title: 'lorem' },
    { title: 'lorem ipsum' },
];

export const PopupContent: Story = () => {
    return (
        <Box>
            <ShownPopup items={items1} placement="top-end" minWidth={50} maxWidth={150} />
            <ShownPopup items={items2} placement="top-start" />
            <ShownPopup items={items3} placement="bottom-end" minWidth={150} maxWidth={250} />
            <ShownPopup items={items3} placement="bottom-start" minWidth={200} />
        </Box>
    );
};

PopupContent.args = {};
