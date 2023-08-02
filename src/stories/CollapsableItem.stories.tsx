import React, { ComponentPropsWithoutRef, useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { CollapsableItem } from '../components/CollapsableItem';
import { Text } from '../components/Text';

const meta: Meta<typeof CollapsableItem> = {
    title: 'CollapsableItem',
    component: CollapsableItem,
};

export default meta;
type Story = StoryFn<typeof meta>;

type ItemProps = Omit<ComponentPropsWithoutRef<typeof CollapsableItem>, 'collapsed' | 'onClick'>;

const Item = ({ header, ...restProps }: ItemProps) => {
    const [collapsed, setCollapsed] = useState(true);
    return (
        <CollapsableItem
            collapsed={collapsed}
            header={
                <div style={{ padding: 10 }}>
                    <Text>{header}</Text>
                </div>
            }
            onClick={restProps.content ? () => setCollapsed(!collapsed) : undefined}
            {...restProps}
        />
    );
};

export const Default: Story = () => {
    return (
        <Item
            header="Level A"
            depth={0}
            content={
                <>
                    <Item header="Level AA" content="" depth={1} />
                    <Item
                        header="Level AB"
                        content={
                            <>
                                <Item header="Level ABA" content="" depth={2} />
                                <Item
                                    header="Level ABB"
                                    content={<Item header="Level ABBA" content="" depth={3} />}
                                    depth={2}
                                />
                            </>
                        }
                        depth={1}
                    />
                </>
            }
        />
    );
};
