import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './Link.module.css';

const viewMap = {
    primary: s.Link_primary,
    secondary: s.Link_secondary,
    inline: s.Link_inline,
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    view?: keyof typeof viewMap;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, view = 'primary', ...rest }, ref) => {
        const classes = [s.Link, viewMap[view], className];

        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (e.metaKey || e.ctrlKey || !rest.onClick) return;

            e.preventDefault();
            rest.onClick(e);
        };

        return (
            <a className={cn(classes)} ref={ref} onClick={onClick} {...rest}>
                {children}
            </a>
        );
    },
);
