import React, { FC, ReactNode, useCallback, useState } from 'react';
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
        <div className={className}>
            <div className={s.TreeViewTitle} onClick={interactive ? onClick : undefined}>
                <IconRightSmallOutline
                    className={cn([s.Icon, { [s.Icon_transform]: visible }])}
                    size="s"
                    onClick={interactive ? undefined : onClick}
                />
                <div className={s.TreeViewTitleContent}>{title}</div>
            </div>

            {nullable(visible && children, () => (
                <div className={s.TreeViewContent}>{children}</div>
            ))}
        </div>
    );
};
