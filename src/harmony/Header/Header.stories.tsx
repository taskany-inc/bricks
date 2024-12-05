import React, { FC, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { gapS, gapXs, gray4 } from '@taskany/colors';

import { Button } from '../Button/Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { Text } from '../Text/Text';
import { Header, HeaderContent, HeaderMenu, HeaderNav } from '../../components/Header/Header';

const meta: Meta<typeof Header> = {
    title: 'Header',
    component: Header,
};

export default meta;

type Story = StoryObj<typeof meta>;

const HeaderWrapper = styled.div`
    min-width: 650px;
`;

const CreateDropdown: FC = () => {
    const onMenuItemClick = useCallback(() => {
        console.log('Change Click');
    }, []);

    return (
        <>
            <Button text="Create" view="primary" brick="right" />
            <Dropdown />
        </>
    );
};

export const PageHeader: Story = () => (
    <HeaderWrapper>
        <Header menu={<HeaderMenu></HeaderMenu>}>
            <HeaderContent>
                <CreateDropdown />
            </HeaderContent>
        </Header>
    </HeaderWrapper>
);

PageHeader.args = {};

const fruits = ['Apple', 'Peach', 'Pineapple', 'Banana', 'Tomato'];

export const PageHeaderWithSearch: Story = () => {
    const [query, setQuery] = useState('');

    const onKyeboardNavigate = useCallback((food: string) => {
        setQuery('');

        console.log(food);
    }, []);

    const resultsExists = Boolean(query && fruits.filter((fruit) => fruit.includes(query)).length);

    return (
        <HeaderWrapper style={{ width: 1000 }}>
            <Header menu={<HeaderMenu></HeaderMenu>}>
                <HeaderContent>
                    <CreateDropdown />
                </HeaderContent>
            </Header>
        </HeaderWrapper>
    );
};

PageHeaderWithSearch.args = {};
