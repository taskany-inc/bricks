import React from 'react';
import styled from 'styled-components';
import { gray0, gray9 } from '@taskany/colors';

import { SheepLogo } from './SheepLogo/SheepLogo';
import { Text } from './Text/Text';

const StyledFooter = styled.footer`
    display: grid;
    grid-template-columns: 1fr 6fr 0fr;
    align-items: end;
    padding: 20px 40px;
`;

const StyledFooterMenu = styled.div`
    display: flex;
    color: ${gray9};
`;

export const FooterItem = styled(Text).attrs({ color: 'inherit' })`
    padding: 0px 10px;
`;
interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className, children, ...attrs }) => {
    return (
        <StyledFooter className={className} {...attrs}>
            <Text color={gray0}>{`© ${new Date().getFullYear()} Taskany, Inc.`}</Text>
            <StyledFooterMenu>{children}</StyledFooterMenu>
            <SheepLogo />
        </StyledFooter>
    );
};
