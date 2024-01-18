import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { TreeView, TreeViewElement, TreeViewNode } from './TreeView';

const meta: Meta<typeof TreeView> = {
    title: '@Harmony/TreeView',
    component: TreeView,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => {
        return (
            <div style={{ padding: '100px' }}>
                <TreeView>
                    <TreeViewNode title="Project 1">
                        <TreeViewElement>Goal 1.1</TreeViewElement>
                        <TreeViewElement>Goal 1.2</TreeViewElement>
                        <TreeViewNode
                            title={
                                <div style={{ padding: '8px 12px', background: 'var(--gray-700)' }}>Project 1.2</div>
                            }
                        >
                            <TreeViewElement>Goal 1.1.1</TreeViewElement>
                            <TreeViewElement>Goal 1.2.1</TreeViewElement>
                            <TreeViewNode title="Project 1.2.1">
                                <TreeViewElement>Goal 1.2.1.1</TreeViewElement>
                            </TreeViewNode>
                        </TreeViewNode>
                    </TreeViewNode>
                    <TreeViewNode title="Project 2" visible>
                        <TreeViewElement>Goal 2.1</TreeViewElement>
                        <TreeViewElement>Goal 2.2</TreeViewElement>
                    </TreeViewNode>
                </TreeView>
            </div>
        );
    },
};
