import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { SheepLogo } from '../SheepLogo/SheepLogo';

import { Footer, FooterCopyright, FooterMenu, FooterItem } from './Footer';

const meta: Meta<typeof Footer> = {
    title: '@harmony/Footer',
    component: Footer,
};

export default meta;

export const Default: StoryFn<typeof Footer> = () => {
    return (
        <Footer>
            <FooterCopyright />
            <FooterMenu>
                <FooterItem>Apple</FooterItem>
                <FooterItem>Tomato</FooterItem>
                <FooterItem>Banana</FooterItem>
                <FooterItem>About us</FooterItem>
            </FooterMenu>
            <SheepLogo />
        </Footer>
    );
};
