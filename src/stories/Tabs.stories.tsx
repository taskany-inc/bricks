import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Tab, Tabs, TabContent } from '../components/Tabs';
import { TabsMenu, TabsMenuItem } from '../components/TabsMenu';
import { Text } from '../components/Text';

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
                <Tab name="tab one" label={<TabLabel label="First" />} selected>
                    <TabContentWrapper>
                        <TabContent>content for first</TabContent>
                    </TabContentWrapper>
                </Tab>
                <Tab name="tab two" label={<TabLabel label="Second" />}>
                    <TabContentWrapper>
                        <TabContent>content for second</TabContent>
                    </TabContentWrapper>
                </Tab>
                <Tab name="tab three" label={<TabLabel label="Third" />}>
                    <TabContentWrapper>
                        <TabContent>content for third</TabContent>
                    </TabContentWrapper>
                </Tab>
                <Tab name="tab four" label={<TabLabel label="Fourth" />}>
                    <TabContentWrapper>
                        <TabContent>content for fourth</TabContent>
                    </TabContentWrapper>
                </Tab>
                <Tab name="tab five" label={<TabLabel label="Fifth" />}>
                    <TabContentWrapper>
                        <TabContent>content for fifth</TabContent>
                    </TabContentWrapper>
                </Tab>
                <Tab name="tab six" label={<TabLabel label="Sixth" />}>
                    <TabContentWrapper>
                        <TabContent>content for sixth</TabContent>
                    </TabContentWrapper>
                </Tab>
            </Tabs>
        </div>
    );
};

Default.args = {
    layout: 'vertical',
};

Default.argTypes = {
    onChangeActiveTab: { action: 'tab change' },
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
TabsWithoutContent.args = Default.args;
