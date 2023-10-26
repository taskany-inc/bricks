import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { gapS, gray7 } from '@taskany/colors';
import { IconRightSmallOutline } from '@taskany/icons';

import { nullable } from '../../utils';

type ValidChild = React.ReactElement<typeof TreeViewNode | typeof TreeViewElement>;

interface TreeViewNodeProps {
    title: React.ReactNode;
    children?: ValidChild[] | ValidChild;
    visible?: boolean;
    interactive?: boolean;
    className?: string;

    onShow?: () => void;
    onHide?: () => void;
}

const StyledIconRightSmallOutline = styled(IconRightSmallOutline)<{ visible?: boolean }>`
    display: block;

    transition: transform 100ms ease-in-out;

    ${({ visible }) =>
        visible &&
        `
        transform: rotate(90deg);
    `}
`;

const StyledTreeViewNodeTitleContent = styled.div``;

const StyledTreeViewNodeTitle = styled.div`
    display: flex;
    align-items: center;
`;

const StyledTreeViewNodeContent = styled.div`
    box-sizing: border-box;

    border-left: 1px solid ${gray7};

    margin-left: ${gapS};
`;

const StyledTreeViewNode = styled.div``;

export const TreeViewElement = styled.div`
    padding-left: ${gapS};
`;

export const TreeViewNode: React.FC<TreeViewNodeProps> = ({
    title,
    children,
    visible: defaultVisible,
    interactive,
    className,
    onShow,
    onHide,
}) => {
    const [visible, setVisible] = useState(defaultVisible);

    const onClick = useCallback(() => {
        if (!visible && children) {
            setVisible(true);
            onShow?.();
        } else {
            setVisible(false);
            onHide?.();
        }
    }, [visible, children, setVisible, onHide, onShow]);

    return (
        <StyledTreeViewNode className={className}>
            <StyledTreeViewNodeTitle onClick={interactive ? onClick : undefined}>
                <StyledIconRightSmallOutline size="s" visible={visible} onClick={interactive ? undefined : onClick} />
                <StyledTreeViewNodeTitleContent>{title}</StyledTreeViewNodeTitleContent>
            </StyledTreeViewNodeTitle>

            {nullable(visible && children, () => (
                <StyledTreeViewNodeContent>{children}</StyledTreeViewNodeContent>
            ))}
        </StyledTreeViewNode>
    );
};

export const TreeView = styled.div``;
