import type { Meta, StoryObj } from '@storybook/react';

import { SheepLogo } from '../components/SheepLogo';

const meta: Meta<typeof SheepLogo> = {
    title: 'SheepLogo',
    component: SheepLogo,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};
