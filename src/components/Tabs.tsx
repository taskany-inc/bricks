import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gray7 } from '@taskany/colors';

import { nullable } from '../utils';

import { TabsMenu, TabsMenuDefault } from './TabsMenu';
import { ListView, ListViewItem } from './ListView';

interface TabsProps {
    layout: 'horizontal' | 'vertical';
    onChangeActiveTab?: (nextTab: string) => void;
    className?: string;
}

interface TabProps {
    name: string;
    label: React.ReactNode;
    selected?: boolean;
}

interface TabContextValue {
    name: string;
    content: React.ReactNode;
    selected?: boolean;
}

interface TabsContextValue {
    register: (props: TabContextValue) => void;
    switchTab: (name: string) => void;
    active: string | null;
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
    register: () => {
        throw new Error('Context in not initialized');
    },
    switchTab: () => {
        throw new Error('Context in not initialized');
    },
    active: null,
});

const StyledTabContent = styled.div`
    overflow: auto;
`;

export const Tabs: React.FC<React.PropsWithChildren<TabsProps>> = ({
    layout,
    onChangeActiveTab,
    children,
    className,
}) => {
    const [tabItems, setTabItems] = useState<Record<string, TabContextValue>>({});
    const [activeTabName, setActiveTabName] = useState('');

    const register = useCallback((props: TabContextValue) => {
        if (props.selected) {
            setActiveTabName(props.name);
        }

        setTabItems((prev) => ({
            ...prev,
            [props.name]: props,
        }));
    }, []);

    const switchTab = useCallback(
        (name: string) => {
            setActiveTabName(name);
            onChangeActiveTab?.(name);
        },
        [onChangeActiveTab],
    );

    const activeTab = tabItems[activeTabName];

    return (
        <TabsContext.Provider value={{ register, switchTab, active: activeTabName }}>
            <StyledTabs layout={layout} className={className}>
                <StyledTabsMenu layout={layout}>
                    <ListView onKeyboardClick={switchTab}>{children}</ListView>
                </StyledTabsMenu>
                {nullable(activeTab?.content, (content) => (
                    <StyledTabContent>{content}</StyledTabContent>
                ))}
            </StyledTabs>
        </TabsContext.Provider>
    );
};

export const Tab: React.FC<React.PropsWithChildren<TabProps>> = ({ name, label, children, selected }) => {
    const { switchTab, register, active: activeTab } = useContext(TabsContext);
    const registerRef = useRef(false);

    useEffect(() => {
        if (registerRef.current) {
            return;
        }

        register({
            name,
            selected,
            content: children,
        });

        registerRef.current = true;
    }, [register, name, label, selected, children]);

    return (
        <ListViewItem
            value={name}
            renderItem={({ active, hovered, onMouseLeave, onMouseMove }) => (
                <StyledTabItem
                    onClick={() => switchTab(name)}
                    active={activeTab === name}
                    focused={active || hovered}
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                >
                    {label}
                </StyledTabItem>
            )}
        />
    );
};

export const TabContent = StyledTabContent;
