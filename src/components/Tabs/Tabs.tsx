import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { gray7 } from '@taskany/colors';

import { nullable } from '../../utils';
import { ListView, ListViewItem } from '../ListView/ListView';
import { TabsMenuDefault, TabsMenu } from '../TabsMenu';

interface TabsProps {
    layout: 'horizontal' | 'vertical';
    onChange?: (nextTab: string) => void;
    active?: string;
    className?: string;
}

interface TabProps {
    name: string;
    label: React.ReactNode;
}

interface TabsContextValue {
    switchTab: (nextState: TabActiveState) => void;
    active: string;
    content: React.ReactNode;
}

const layoutMap: Record<TabsProps['layout'], string> = {
    horizontal: 'column',
    vertical: 'row',
} as const;

const swapLayoutForMenu: Record<TabsProps['layout'], string> = {
    horizontal: 'row',
    vertical: 'column',
} as const;

const StyledTabs = styled.div<TabsProps>`
    display: flex;
    flex-direction: ${({ layout }) => layoutMap[layout]};
    padding: 0;
    margin: 0;
`;

const StyledTabItem = styled(TabsMenuDefault)<{ focused?: boolean }>`
    ${({ focused }) => focused && `background-color: ${gray7};`}
`;

const StyledTabsMenu = styled(TabsMenu)<TabsProps>`
    display: flex;
    flex-direction: ${({ layout }) => swapLayoutForMenu[layout]};

    padding: 0;
    margin: 0;

    ${({ layout }) =>
        layout === 'horizontal' &&
        `
            flex-wrap: no-wrap;

            & ${StyledTabItem} {
                text-align: center;
            }
        `}
`;

const TabsContext = createContext<TabsContextValue>({
    switchTab: () => {
        throw new Error('Context in not initialized');
    },
    active: 'unknown',
    content: null,
});

const StyledTabContent = styled.div`
    overflow: auto;
`;

const TabInnerContent = () => (
    <TabsContext.Consumer>
        {({ content }) => nullable(content, (c) => <StyledTabContent>{c}</StyledTabContent>)}
    </TabsContext.Consumer>
);

interface TabActiveState {
    name: string;
    content: React.ReactNode;
}

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
    layout,
    active = 'unknown',
    onChange,
    children,
    className,
}) => {
    const [{ name, content }, setActiveTab] = useState<TabActiveState>(() => ({ name: active, content: null }));
    const prevActiveTabName = useRef(name);

    useEffect(() => {
        if (prevActiveTabName.current !== name) {
            onChange?.(name);
        }
    }, [name, onChange]);

    return (
        <TabsContext.Provider value={{ switchTab: setActiveTab, active: name, content }}>
            <StyledTabs layout={layout} className={className}>
                <StyledTabsMenu layout={layout}>
                    <ListView onKeyboardClick={setActiveTab}>{children}</ListView>
                </StyledTabsMenu>
                <TabInnerContent />
            </StyledTabs>
        </TabsContext.Provider>
    );
};

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = memo(({ name, label, children }) => {
    const { switchTab, active } = useContext(TabsContext);
    const prevChildRef = useRef<React.ReactNode>();

    const currentTab = active === name;

    const value: TabActiveState = useMemo(() => ({ name, content: children }), [name, children]);

    const handleTabChange = useCallback(() => switchTab(value), [switchTab, value]);

    useEffect(() => {
        if (currentTab && prevChildRef.current !== value.content) {
            handleTabChange();
            prevChildRef.current = value.content;
        }
    }, [currentTab, value, handleTabChange]);

    return (
        <ListViewItem
            value={value}
            renderItem={({ active, hovered, onMouseLeave, onMouseMove }) => (
                <StyledTabItem
                    onClick={handleTabChange}
                    active={currentTab}
                    focused={active || hovered}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                >
                    {label}
                </StyledTabItem>
            )}
        />
    );
});

export const TabContent = StyledTabContent;
