import React from 'react';
import styled from 'styled-components';
import { gray0, gray9 } from '@taskany/colors';

import { SheepLogo } from './SheepLogo';
import Text from './Text';
import Link from './Link';

const StyledFooter = styled.footer`
    display: grid;
    grid-template-columns: 1fr 6fr 0fr;
    align-items: end;
    padding: 20px 40px;
`;

const StyledFooterMenu = styled.div`
    display: flex;
`;

const StyledText = styled(Text)`
    padding: 0px 10px;
`;

interface FooterProps {
    className?: string;
    menuItems: {
        title: string;
        url: string;
    }[];
}

export const Footer: React.FC<FooterProps> = ({ className, menuItems }) => {
    return (
        <StyledFooter className={className}>
            <Text color={gray0}>{`© ${new Date().getFullYear()} Taskany, Inc.`}</Text>
            <StyledFooterMenu>
                {menuItems.map(({ title, url }) => (
                    <Link key={url} href={url} inline>
                        <StyledText color={gray9}>{title}</StyledText>
                    </Link>
                ))}
            </StyledFooterMenu>
            <SheepLogo />
        </StyledFooter>
    );
};

export default Footer;
