import React, { createContext, FC, ReactNode, useContext, useMemo, useState } from 'react';
import { IconRightSmallOutline } from '@taskany/icons';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './TreeView.module.css';

interface TreeViewNodeProps {
    title: ReactNode;
    children?: ReactNode;
    visible?: boolean;
    interactive?: boolean;
    className?: string;

    onShow?: () => void;
    onHide?: () => void;
}

interface TreeViewContext {
    visible?: boolean;
    interactive?: boolean;
    onTitleClick?: () => void;
}

const treeViewContext = createContext<TreeViewContext>({});

interface TreeViewProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TreeView: FC<TreeViewProps> = ({ children, ...rest }) => {
    return <div {...rest}>{children}</div>;
};

export const TreeViewElement: FC<TreeViewProps> = ({ children, className, ...rest }) => {
    return (
        <div className={cn(s.TreeViewElement, className)} {...rest}>
            {children}
        </div>
    );
};

interface TreeViewTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TreeViewTitle: FC<TreeViewTitleProps> = ({ children, className }) => {
    const { interactive, onTitleClick, visible } = useContext(treeViewContext);

    return (
        <div className={cn(s.TreeViewTitle, className)} onClick={interactive ? onTitleClick : undefined}>
            <IconRightSmallOutline
                className={cn([s.Icon, { [s.Icon_transform]: visible }])}
                size="s"
                onClick={interactive ? undefined : onTitleClick}
            />
            <div className={s.TreeViewTitleContent}>{children}</div>
        </div>
    );
};

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

    const context = useMemo(
        () => ({
            visible,
            interactive,
            onTitleClick: () => {
                if (!visible && children) {
                    setVisible(true);
                    onShow?.();
                } else {
                    setVisible(false);
                    onHide?.();
                }
            },
        }),
        [visible, children, setVisible, onHide, onShow, interactive],
    );

    return (
        <treeViewContext.Provider value={context}>
            <div className={className}>
                {title}
                {nullable(visible && children, () => (
                    <div className={s.TreeViewContent}>{children}</div>
                ))}
            </div>
        </treeViewContext.Provider>
    );
};
