import React from 'react';
import styled from 'styled-components';
import type { Meta, StoryObj } from '@storybook/react';
import { backgroundColor, gapM, gapS, gray9 } from '@taskany/colors';

import { TreeView, TreeViewNode, TreeViewElement } from './TreeView';

const meta: Meta<typeof TreeView> = {
    title: 'TreeView',
    component: TreeView,
};

export default meta;
type Story = StoryObj<typeof meta>;

const StyledCardExample = styled.div`
    padding: ${gapS} ${gapM};

    background-color: ${gray9};
`;

export const Default: Story = {
    render: () => {
        return (
            <div style={{ backgroundColor, padding: '100px' }}>
                <TreeView>
                    <TreeViewNode title="Project 1">
                        <TreeViewElement>Goal 1.1</TreeViewElement>
                        <TreeViewElement>Goal 1.2</TreeViewElement>
                        <TreeViewNode title={<StyledCardExample>Project 1.2</StyledCardExample>}>
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
