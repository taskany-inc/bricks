import React, { ComponentPropsWithoutRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { CollapsableItem, CollapsableContentItem, Text } from '../components';

const meta: Meta<typeof CollapsableItem> = {
    title: 'CollapsableItem',
    component: CollapsableItem,
};

export default meta;
type Story = StoryFn<typeof meta>;

type ItemProps = Omit<ComponentPropsWithoutRef<typeof CollapsableItem>, 'onClick' | 'isOpen'>;

const Item = ({ header, ...restProps }: ItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <CollapsableItem
            isOpen={isOpen}
            header={<Text style={{ padding: 10 }}>{header}</Text>}
            onClick={restProps.children ? () => setIsOpen((prev) => !prev) : undefined}
            {...restProps}
        />
    );
};

export const Default: Story = () => {
    return (
        <Item header="Level A" hasChild isRoot>
            <Item header="Level A-A" hasChild>
                <Item header="Level A-A-A" hasChild>
                    <Item header="Level A-A-A-A" />
                    <Item header="Level A-A-A-B" hasChild>
                        <Item header="Level A-A-A-B-A">
                            <CollapsableContentItem>Hi</CollapsableContentItem>
                            <CollapsableContentItem>Every</CollapsableContentItem>
                            <CollapsableContentItem>One</CollapsableContentItem>
                        </Item>
                    </Item>
                    <Item header="Level A-A-A-C" />
                </Item>
                <Item header="Level A-A-B" />
                <Item header="Level A-A-C" />
                <Item header="Level A-A-D" hasChild>
                    <Item header="Level A-A-D-A" hasChild>
                        <Item header="Level A-A-D-A-A" />
                    </Item>
                </Item>
            </Item>
            <Item header="Level A-B" hasChild>
                <Item header="Level A-B-A" />
                <Item header="Level A-B-B" hasChild>
                    <Item header="Level A-B-B-A" />
                </Item>
            </Item>
        </Item>
    );
};
