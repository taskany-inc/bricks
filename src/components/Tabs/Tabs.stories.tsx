import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { TabsMenu, TabsMenuItem } from '../TabsMenu';
import { Text } from '../Text/Text';

import { Tab, Tabs } from './Tabs';

type TabsProps = React.ComponentProps<typeof Tabs>;

export default {
    title: 'Tabs',
    component: Tabs,
} as Meta<TabsProps>;

const TabLabel = ({ label }) => <Text style={{ width: '6ch' }}>{label}</Text>;
const TabContentWrapper = ({ children }) => (
    <div
        style={{
            width: '200px',
            height: '100%',
            boxSizing: 'border-box',
            padding: '0.25rem',
        }}
    >
        {children}
    </div>
);

export const Default: StoryFn<TabsProps> = (args) => {
    return (
        <div style={{ width: args.layout === 'vertical' ? '300px' : '500px', height: '200px' }}>
            <Tabs {...args}>
                <Tab name="1" label={<TabLabel label="First" />}>
                    <TabContentWrapper>content for first</TabContentWrapper>
                </Tab>
                <Tab name="2" label={<TabLabel label="Second" />}>
                    <TabContentWrapper>content for second</TabContentWrapper>
                </Tab>
                <Tab name="3" label={<TabLabel label="Third" />}>
                    <TabContentWrapper>content for third</TabContentWrapper>
                </Tab>
                <Tab name="4" label={<TabLabel label="Fourth" />}>
                    <TabContentWrapper>content for fourth</TabContentWrapper>
                </Tab>
                <Tab name="5" label={<TabLabel label="Fifth" />}>
                    <TabContentWrapper>content for fifth</TabContentWrapper>
                </Tab>
                <Tab name="6" label={<TabLabel label="Sixth" />}>
                    <TabContentWrapper>content for sixth</TabContentWrapper>
                </Tab>
            </Tabs>
        </div>
    );
};

Default.args = {
    layout: 'vertical',
    active: '2',
};

Default.argTypes = {
    onChange: { action: 'tab change' },
};

export const AsMenu: StoryFn = () => (
    <TabsMenu>
        <TabsMenuItem active>
            <Text>First</Text>
        </TabsMenuItem>
        <TabsMenuItem>
            <Text>Second</Text>
        </TabsMenuItem>
    </TabsMenu>
);

export const TabsWithoutContent: StoryFn<TabsProps> = (args) => (
    <Tabs {...args}>
        <Tab name="tab one" label={<TabLabel label="First" />} />
        <Tab name="tab two" label={<TabLabel label="Second" />} />
        <Tab name="tab three" label={<TabLabel label="Third" />} />
        <Tab name="tab four" label={<TabLabel label="Fourth" />} />
        <Tab name="tab five" label={<TabLabel label="Fifth" />} />
        <Tab name="tab six" label={<TabLabel label="Sixth" />} />
    </Tabs>
);

TabsWithoutContent.argTypes = Default.argTypes;
TabsWithoutContent.args = {
    layout: 'horizontal',
};
