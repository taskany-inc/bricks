import React, { createContext, useContext, useMemo } from 'react';
import cn from 'classnames';

import s from './Breadcrumbs.module.css';

const defaultSeparator = '•';

const BreadcrumbsContext = createContext({ separator: defaultSeparator });

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {
    separator?: string;
}

export const Breadcrumbs = ({ separator, className, children, ...rest }: BreadcrumbsProps) => {
    const contextValue = useMemo(() => ({ separator: separator ?? defaultSeparator }), []);
    return (
        <div className={cn(s.Breadcrumbs, className)} {...rest}>
            <BreadcrumbsContext.Provider value={contextValue}>{children}</BreadcrumbsContext.Provider>
        </div>
    );
};

interface BreadcrumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Breadcrumb = (props: BreadcrumbProps) => {
    const { separator } = useContext(BreadcrumbsContext);
    return (
        <>
            <span {...props} />
            <span className={s.BreadcrumbSeparator}>{separator}</span>
        </>
    );
};
