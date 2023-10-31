import React from 'react';
import cn from 'classnames';

import styles from './Link.module.css';

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any>;
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
    ({ inline, className, as: Tag = 'a', ...props }, ref) => {
        const cls = cn(styles.Link, { [styles.LinkInline]: inline }, className);

        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (e.metaKey || e.ctrlKey || !props.onClick) return;

            e.preventDefault();
            props.onClick(e);
        };

        return <Tag ref={ref} className={cls} {...props} onClick={onClick} />;
    },
);
