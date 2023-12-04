import React, { FC, useCallback, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { IconDownSmallSolid, IconUpSmallSolid } from '@taskany/icons';
import { gapS, gapXs, gray4 } from '@taskany/colors';

import { Button } from '../Button/Button';
import { UserMenu } from '../UserMenu';
import { Dropdown } from '../Dropdown/Dropdown';
import { MenuItem } from '../MenuItem';
import { GlobalSearch } from '../GlobalSearch';
import { Text } from '../Text/Text';
import { Table } from '../Table/Table';
import { ListView, ListViewItem } from '../ListView/ListView';

import { Header, HeaderContent, HeaderMenu, HeaderNav, HeaderNavLink } from './Header';

const meta: Meta<typeof Header> = {
    title: 'Header',
    component: Header,
};

export default meta;

type Story = StoryObj<typeof meta>;

const navItems = ['Item 1', 'Item 2'];

const HeaderWrapper = styled.div`
    min-width: 650px;
`;

const CreateDropdown: FC = () => {
    const onMenuItemClick = useCallback(() => {
        console.log('Change Click');
    }, []);

    return (
        <>
            <Button text="Create" view="primary" outline brick="right" />
            <Dropdown
                onChange={onMenuItemClick}
                items={[
                    {
                        title: 'Create goal',
                    },
                    {
                        title: 'Create project',
                    },
                    {
                        title: 'Create team',
                    },
                ]}
                renderTrigger={(props) => (
                    <Button
                        view="primary"
                        outline
                        brick="left"
                        iconRight={props.visible ? <IconUpSmallSolid size="s" /> : <IconDownSmallSolid size="s" />}
                        ref={props.ref}
                        onClick={props.onClick}
                    />
                )}
                renderItem={(props) => (
                    <MenuItem
                        key={props.item.title}
                        focused={props.cursor === props.index}
                        onClick={props.onClick}
                        view="primary"
                        ghost
                    >
                        {props.item.title}
                    </MenuItem>
                )}
            />
        </>
    );
};

export const PageHeader: Story = () => (
    <HeaderWrapper>
        <Header
            menu={
                <HeaderMenu>
                    <UserMenu email="storybook@taskany.com" />
                </HeaderMenu>
            }
            nav={
                <HeaderNav>
                    {navItems.map((title) => (
                        <HeaderNavLink key={title} href="#">
                            {title}
                        </HeaderNavLink>
                    ))}
                </HeaderNav>
            }
        >
            <HeaderContent>
                <CreateDropdown />
            </HeaderContent>
        </Header>
    </HeaderWrapper>
);

PageHeader.args = {};

const StyledGroupHeader = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    box-sizing: border-box;

    padding-top: ${gapS};
    padding-bottom: ${gapXs};
    margin: 0 ${gapS};

    max-width: 392px;

    border-bottom: 1px solid ${gray4};
`;

const StyledHeaderNav = styled(HeaderNav)`
    display: flex;
    align-items: center;
`;

const HeaderGlobalSearch = styled.div`
    padding-left: 40px;
`;

const fruits = ['Apple', 'Peach', 'Pineapple', 'Banana', 'Tomato'];

const StyledMenuItem = styled(MenuItem)`
    border: none;
`;

export const PageHeaderWithSearch: Story = () => {
    const [query, setQuery] = useState('');

    const onKyeboardNavigate = useCallback((food: string) => {
        setQuery('');

        console.log(food);
    }, []);

    const resultsExists = Boolean(query && fruits.filter((fruit) => fruit.includes(query)).length);

    return (
        <HeaderWrapper style={{ width: 1000 }}>
            <Header
                menu={
                    <HeaderMenu>
                        <UserMenu email="storybook@taskany.com" />
                    </HeaderMenu>
                }
                nav={
                    <StyledHeaderNav>
                        {navItems.map((title) => (
                            <HeaderNavLink key={title} href="#">
                                {title}
                            </HeaderNavLink>
                        ))}
                        <HeaderGlobalSearch>
                            <GlobalSearch searchResultExists={resultsExists} query={query} setQuery={setQuery}>
                                <ListView onKeyboardClick={onKyeboardNavigate}>
                                    <StyledGroupHeader size="m" weight="bolder">
                                        Fruits
                                    </StyledGroupHeader>
                                    <Table width={700}>
                                        {fruits
                                            .filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase()))
                                            .map((fruit) => (
                                                <ListViewItem
                                                    value={fruit}
                                                    key={fruit}
                                                    renderItem={({ active, ...props }) => (
                                                        <StyledMenuItem
                                                            {...props}
                                                            onClick={() => onKyeboardNavigate(fruit)}
                                                            focused={active}
                                                        >
                                                            {fruit}
                                                        </StyledMenuItem>
                                                    )}
                                                />
                                            ))}
                                    </Table>
                                </ListView>
                            </GlobalSearch>
                        </HeaderGlobalSearch>
                    </StyledHeaderNav>
                }
            >
                <HeaderContent>
                    <CreateDropdown />
                </HeaderContent>
            </Header>
        </HeaderWrapper>
    );
};

PageHeaderWithSearch.args = {};
