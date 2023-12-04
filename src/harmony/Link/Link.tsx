import React, { AnchorHTMLAttributes, forwardRef } from 'react';
import cn from 'classnames';

import s from './Link.module.css';

const viewMap = {
    primary: s.link__primary,
    text: s.link__text,
    secondary: s.link__secondary,
};

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    view?: keyof typeof viewMap;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ children, className, view = 'primary', ...rest }, ref) => {
        const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
            if (e.metaKey || e.ctrlKey || !rest.onClick) return;

            e.preventDefault();
            rest.onClick(e);
        };

        return (
            <a className={cn(s.link, viewMap[view], className)} ref={ref} onClick={onClick} {...rest}>
                {children}
            </a>
        );
    },
);
