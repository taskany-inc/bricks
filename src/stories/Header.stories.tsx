import React, { FC, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';

import { Header, HeaderContent, HeaderMenu, HeaderNav, HeaderNavLink } from '../components/Header';
import Button from '../components/Button';
import UserMenu from '../components/UserMenu';
import Dropdown from '../components/Dropdown';
import { ArrowDownSmallIcon, ArrowUpSmallIcon } from '../components/Icon';
import MenuItem from '../components/MenuItem';

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
                        iconRight={
                            props.visible ? (
                                <ArrowUpSmallIcon size="s" noWrap />
                            ) : (
                                <ArrowDownSmallIcon size="s" noWrap />
                            )
                        }
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
