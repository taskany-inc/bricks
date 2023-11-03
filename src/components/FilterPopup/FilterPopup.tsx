import React, { useRef } from 'react';
import styled from 'styled-components';
import { gray10, gapS, gapXs, textColor, gapM, radiusM } from '@taskany/colors';
import { IconBulbOnOutline } from '@taskany/icons';

import { useClickOutside } from '../../hooks/useClickOutside';
import { KeyCode, useKeyboard } from '../../hooks/useKeyboard';
import { nullable } from '../../utils/nullable';
import { TabContent, Tabs } from '../Tabs/Tabs';
import { TabsMenu } from '../TabsMenu';
import { Popup } from '../Popup/Popup';
import { Tip } from '../Tip/Tip';
import { Button } from '../Button/Button';

interface FilterPopupProps {
    visible: boolean;
    switchVisible: (val: boolean) => void;
    filterRef: React.RefObject<HTMLSpanElement>;
    onApplyClick: () => void;
    cancelButtonText: string;
    applyButtonText: string;
    activeTab?: string;
    footerTipText?: string;
    footerTipTitle?: string;
}

const StyledPopupWrapper = styled.div`
    padding: ${gapXs};
`;

const StyledTabs = styled(Tabs)`
    width: 500px;
    min-height: 200px;

    gap: ${gapM};

    ${TabsMenu} {
        width: 200px;
        max-width: 100%;
        flex-basis: auto;
    }

    ${TabContent} {
        display: block;
        flex: 1;
    }
`;

const StyledPopup = styled(Popup)`
    border-radius: ${radiusM};
`;

const StyledFilterPanelPopupFooter = styled.div`
    display: flex;
    padding: ${gapXs} ${gapS};
    margin-top: ${gapXs};
    align-items: center;
    gap: ${gapS};
`;

const StyledActionWrapper = styled.div`
    display: flex;
    flex-wrap: nowrap;
    margin-left: auto;
    gap: ${gapS};
`;

const StyledTip = styled(Tip)`
    color: ${gray10};
`;

const StyledPopupOverlay = styled.div`
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const FilterPopup: React.FC<React.PropsWithChildren<FilterPopupProps>> = ({
    activeTab,
    filterRef,
    visible,
    switchVisible,
    onApplyClick,
    footerTipTitle,
    footerTipText,
    cancelButtonText,
    applyButtonText,
    children,
}) => {
    const popupWrapperRef = useRef<HTMLDivElement>(null);

    useClickOutside(filterRef, ({ target }) => {
        if (visible && !popupWrapperRef.current?.contains(target as HTMLElement)) {
            switchVisible(false);
        }
    });

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        if (visible) {
            switchVisible(false);
        }
    });

    return (
        <>
            {nullable(visible, () => (
                <StyledPopupOverlay />
            ))}
            <StyledPopup
                reference={filterRef}
                interactive
                placement="bottom-start"
                visible={visible}
                {...onESC}
                offset={[-5, 0]}
            >
                <StyledPopupWrapper key={String(visible)} ref={popupWrapperRef}>
                    <StyledTabs active={activeTab} layout="vertical">
                        {children}
                    </StyledTabs>
                    <StyledFilterPanelPopupFooter>
                        {footerTipTitle && footerTipText && (
                            <StyledTip
                                title={footerTipTitle}
                                size="xs"
                                icon={<IconBulbOnOutline size="xs" color={textColor} />}
                            >
                                {footerTipText}
                            </StyledTip>
                        )}
                        <StyledActionWrapper>
                            <Button outline text={cancelButtonText} onClick={() => switchVisible(false)} />
                            <Button view="primary" outline text={applyButtonText} onClick={onApplyClick} />
                        </StyledActionWrapper>
                    </StyledFilterPanelPopupFooter>
                </StyledPopupWrapper>
            </StyledPopup>
        </>
    );
};
