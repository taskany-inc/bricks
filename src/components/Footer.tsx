import React from 'react';
import styled from 'styled-components';
import { gray0 } from '@taskany/colors';

import { SheepLogo } from './SheepLogo';
import Text from './Text';

const StyledFooter = styled.footer`
    display: grid;
    grid-template-columns: 1fr 6fr 0fr;
    align-items: end;
    padding: 20px 40px;
`;

const StyledFooterMenu = styled.div`
    display: flex;
`;

export const FooterItem = styled(Text)`
    padding: 0px 10px;
`;
interface FooterProps {
    className?: string;
    children: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ className, children }) => {
    return (
        <StyledFooter className={className}>
            <Text color={gray0}>{`© ${new Date().getFullYear()} Taskany, Inc.`}</Text>
            <StyledFooterMenu>{children}</StyledFooterMenu>
            <SheepLogo />
        </StyledFooter>
    );
};

export default Footer;
