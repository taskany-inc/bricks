import React, { FC, useCallback, useState } from 'react';
import type { Meta } from '@storybook/react';
import { IconDownSmallSolid, IconUpSmallSolid } from '@taskany/icons';

import { Button } from '../Button/Button';
import { User } from '../User/User';
import { Dropdown, DropdownPanel, DropdownTrigger } from '../Dropdown/Dropdown';
import { MenuItem } from '../MenuItem/MenuItem';
import { GlobalSearch } from '../GlobalSearch/GlobalSearch';
import { Text } from '../Text/Text';
import { Table } from '../Table/Table';
import { ListView, ListViewItem } from '../ListView/ListView';

import { Header, HeaderContent, HeaderMenu, HeaderNav, HeaderNavLink } from './Header';

const meta: Meta<typeof Header> = {
    title: '@Harmony/Header',
    component: Header,
};

export default meta;

const navItems = ['Item 1', 'Item 2'];
const items = [
    {
        title: 'Team',
    },
    {
        title: 'User',
    },
];

const CreateDropdown: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onMenuItemClick = useCallback(() => {
        console.log('Change Click');
    }, []);

    return (
        <>
            <Button text="Create" brick="right" />
            <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <DropdownTrigger
                    renderTrigger={(props) => (
                        <div style={{}} ref={props.ref}>
                            <Button
                                brick="left"
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                iconRight={
                                    props.isOpen ? <IconUpSmallSolid size="s" /> : <IconDownSmallSolid size="s" />
                                }
                            />
                        </div>
                    )}
                />
                <DropdownPanel placement="top-end">
                    <ListView>
                        {items?.map((i) => (
                            <ListViewItem
                                key={i.title}
                                value={i}
                                renderItem={({ active, hovered, ...props }) => (
                                    <MenuItem
                                        hovered={active || hovered}
                                        onClick={onMenuItemClick}
                                        key={i.title}
                                        {...props}
                                    >
                                        {i.title}
                                    </MenuItem>
                                )}
                            />
                        ))}
                    </ListView>
                </DropdownPanel>
            </Dropdown>
        </>
    );
};

export const PageHeader = () => (
    <div style={{ minWidth: ' 650px', gap: '3px' }}>
        <Header
            menu={
                <HeaderMenu>
                    <User short email="storybook@taskany.com" />
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
    </div>
);

const fruits = ['Apple', 'Peach', 'Pineapple', 'Banana', 'Tomato'];

export const HeaderWithSearch = () => {
    const [query, setQuery] = useState('');

    const onKyeboardNavigate = useCallback((food: string) => {
        setQuery('');

        console.log(food);
    }, []);

    const resultsExists = Boolean(query && fruits.filter((fruit) => fruit.includes(query)).length);

    return (
        <div style={{ width: 1000 }}>
            <Header
                menu={
                    <HeaderMenu>
                        <User short email="ololo@gmail.com" />
                    </HeaderMenu>
                }
                nav={
                    <HeaderNav style={{ display: 'flex', alignItems: 'center' }}>
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
                    <div
                        style={{
                            paddingLeft: '40px',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxSizing: 'border-box',
                            paddingTop: '10px',
                            maxWidth: '392px',
                            paddingBottom: '5px',
                            margin: '0, 10px',
                        }}
                    >
                        <GlobalSearch searchResultExists={resultsExists} value={query} onChange={setQuery}>
                            <ListView onKeyboardClick={onKyeboardNavigate}>
                                <Text style={{ display: 'flex' }} size="m" weight="bolder">
                                    Fruits
                                </Text>
                                <Table>
                                    {fruits
                                        .filter((fruit) => fruit.toLowerCase().includes(query.toLowerCase()))
                                        .map((fruit) => (
                                            <ListViewItem
                                                value={fruit}
                                                key={fruit}
                                                renderItem={({ active, ...props }) => (
                                                    <MenuItem
                                                        style={{ border: 'none' }}
                                                        {...props}
                                                        onClick={() => onKyeboardNavigate(fruit)}
                                                    >
                                                        {fruit}
                                                    </MenuItem>
                                                )}
                                            />
                                        ))}
                                </Table>
                            </ListView>
                        </GlobalSearch>
                    </div>
                </HeaderContent>
            </Header>
        </div>
    );
};
