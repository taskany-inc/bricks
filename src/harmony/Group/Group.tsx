import React, { ReactNode } from 'react';
import cn from 'classnames';

import s from './Group.module.css';

const overlaySize = {
    xs: s.Group_overlay_xs,
    s: s.Group_overlay_s,
};

interface GroupProps {
    children?: ReactNode;
    className?: string;

    /**
     * Prop to determine whether to enable the adjusted stacking order of group items during hover within the group.
     * If passed, the hovered item will be brought to the front, overlapping others.
     */
    withHover?: boolean;

    /**
     *  To superimpose group elements on top of each other, `xs` by default
     */
    overlay?: keyof typeof overlaySize;
}

export const Group = ({ children, className, withHover, overlay = 'xs' }: GroupProps) => {
    return (
        <div className={cn(s.Group, { [s.Group_hovered]: withHover }, overlaySize[overlay], className)}>{children}</div>
    );
};

interface GroupItemProps {
    children?: ReactNode;
    className?: string;
}

export const GroupItem = ({ children, className }: GroupItemProps) => {
    return <div className={cn(s.GroupItem, className)}>{children}</div>;
};
