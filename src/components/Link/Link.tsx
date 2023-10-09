import React from 'react';
import styled from 'styled-components';
import { link10 } from '@taskany/colors';

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    as?: string | React.ComponentType<any>;

    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const StyledLink = styled(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ forwardRef, inline, ...props }: LinkProps & { forwardRef?: React.Ref<HTMLAnchorElement> }) => (
        <a ref={forwardRef} {...props} />
    ),
)`
    color: ${link10};

    transition: 0.2s cubic-bezier(0.3, 0, 0.5, 1);
    transition-property: color;

    cursor: pointer;

    &:hover,
    &:focus {
        transition-duration: 0.1s;
    }

    ${({ inline }) =>
        inline &&
        `
            color: inherit;
            text-decoration: none;

            &:hover {
                color: ${link10};
            }
        `}
`;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ ...props }, ref) => {
    const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (e.metaKey || e.ctrlKey || !props.onClick) return;

        e.preventDefault();
        props.onClick(e);
    };

    return <StyledLink {...props} onClick={onClick} forwardRef={ref} />;
});
