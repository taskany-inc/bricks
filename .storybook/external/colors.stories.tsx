import React, { CSSProperties } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import styled from 'styled-components';
import { backgroundColor, gray0, gray6, gray9 } from '@taskany/colors';

import { getGroupedRootCSSVariables } from '../../src/utils/getGroupedCSSVariables';

export default {
    title: '@taskany/colors',
    decorators: [
        (Story) => {
            return <Story />;
        },
    ],
} as Meta;

const ColorTitle = styled.div`
    flex: 0 0 30%;
`;

const ColorText = styled.div`
    text-align: center;
    font-size: 12px;
    line-height: 1;
    color: ${gray9};
`;

const ColorPalette = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const ColorsItemWrapper = styled.div`
    border-radius: 4px;
    background: ${gray0};
    box-shadow: ${gray6} 0 1px 3px 0;
    display: flex;
    height: 50px;
    margin-bottom: 5px;
    overflow: hidden;
    background-color: ${gray0};
    background-image: repeating-linear-gradient(
        -45deg,
        ${gray6},
        ${gray6} 1px,
        ${backgroundColor} 1px,
        ${backgroundColor} 16px
    );
`;

const ColorItem = styled.div<{ background?: CSSProperties['background'] }>`
    flex: 1;
    background: ${({ background }) => background};
`;

const rootCssVariables = getGroupedRootCSSVariables(':root');

export const AllColors: StoryFn = (_, context) => {
    const { theme } = context.globals;
    const themeCssVariables = getGroupedRootCSSVariables(`html[data-theme="${theme}"]`);

    const variables = {
        ...rootCssVariables,
        ...themeCssVariables,
    };

    return (
        <div style={{ maxWidth: '1000px', padding: '2rem 0' }}>
            <div style={{ fontSize: 48, fontWeight: 700, marginBottom: 24 }}>Color palette for {theme} theme</div>
            {Object.entries(variables).map(([title, pallette]) => {
                return (
                    <div style={{ display: 'flex' }} key={title}>
                        <ColorTitle>{title}</ColorTitle>
                        <ColorPalette>
                            <ColorsItemWrapper>
                                {Object.values(pallette).map((variable) => {
                                    return <ColorItem title={variable} key={variable} background={variable} />;
                                })}
                            </ColorsItemWrapper>
                            <div style={{ display: 'flex' }}>
                                {Object.entries(pallette).map(([name, variable]) => {
                                    return (
                                        <div style={{ flex: 1 }} key={name}>
                                            <ColorText>
                                                <span>{name}</span>
                                                <br />
                                                <span>{variable}</span>
                                            </ColorText>
                                        </div>
                                    );
                                })}
                            </div>
                        </ColorPalette>
                    </div>
                );
            })}
        </div>
    );
};
