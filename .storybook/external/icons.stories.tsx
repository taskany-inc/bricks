import React, { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react'
import * as Icons from '@taskany/icons';
import type { BaseIconProps } from '@taskany/icons';
import styled from 'styled-components';

import { Text } from '../../src/components/Text/Text';
import { Input } from '../../src/components/Input/Input';
import { Popup } from '../../src/components/Popup'

type IconStory = React.ComponentType<{ type: 'solid' | 'outline' } & Omit<BaseIconProps, 'value'>>

export default {
    title: '@taskany/icons',
    argTypes: {
        size: {
            options: ["xxs", "xs", "s", "m", "l"],
            control: { type: 'inline-radio' },
        },
        type: {
            options: ['solid', 'outline'],
            control: { type: 'inline-radio' },

        },
        color: {
            type: 'string',
        },
        noWrap: {
            type: 'boolean',
        }
    },
    args: {
        size: 's',
        type: 'outline',
        noWrap: false,
    },
    parameters: {
        layout: 'padded',
    }
} as Meta<IconStory>;

type RenderIconProps = {
    name: string;
    originalName: string;
    icon: React.ComponentType<Omit<React.ComponentProps<typeof Icons.BaseIcon>, 'value'>>
}

const regex = /(?:(?:([a-z][A-Z]?\d?)([A-Z]))|(?:([a-z])(\d))|(?:(\d)([A-Z])))/g

const splitName = (str: string) => str.replace(regex, (substring) => substring.split('').join(' '))

const pickIconName = (name: string) => {
    const normalizeName = splitName(name);
    const splittedName = normalizeName.split(' ');

    return splittedName.slice(1, splittedName.length - 1).join(' ');
}

const getIcons = (type: 'solid' | 'outline') => {
    return Object.keys(Icons).reduce<RenderIconProps[]>((acc, iconName) => {
        const parsedName = pickIconName(iconName);

        if (iconName.toLowerCase().includes(type)) {
            acc.push({
                originalName: iconName,
                name: parsedName,
                icon: Icons[iconName],
            });
        }

        return acc;
    }, []);
}

const Wrapper = styled.div`
    max-width: 500px;
    margin: 0 auto;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    max-width: 500px;
`;

const GridItem = styled.div`
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
`;

const copyToClipBoard = (value: string) => navigator.clipboard.writeText(value);

const Item: React.FC<
    React.PropsWithChildren<{
        name: string;
        originalName: string;
        filtered?: boolean;
    }>
> = ({ children, name, originalName }) => {
    const [showTooltip, setShowTolltip] = useState(false);
    const timerRef = useRef<number>(-1);
    const nodeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showTooltip) {
            timerRef.current = window.setTimeout(() => {
                setShowTolltip(false);
            }, 1500)
        }

        return () => {
            window.clearTimeout(timerRef.current);
        }
    }, [showTooltip])

    const handleClick = useCallback(() => {
        copyToClipBoard(`import { ${originalName} } from '@taskany/icons';`);

        setShowTolltip(true);
    }, [originalName]);

    const hide = useCallback(() => {
        if (showTooltip) {
            window.clearTimeout(timerRef.current);
            setShowTolltip(false);
        }
    }, [showTooltip])

    return (
        <>
            <Popup
                target={
                    <GridItem onClick={handleClick} ref={nodeRef}>
                        {children}
                        <Text size="xs">{name}</Text>
                    </GridItem>
                }
                placement="top"
            >
                <code>{`import { ${originalName} } from '@taskany/icons';`}</code>
            </Popup>
            
            <Popup visible={showTooltip} reference={nodeRef} placement="top">
                <Text size="xs" onClick={hide}>Copied!</Text>
            </Popup>
        </>
    );
}

const Results: React.FC<{
    type: 'solid' | 'outline';
    searchValue: string;
    size: "xxs" | "xs" | "s" | "m" | "l" | number;
    color?: string;
}> = ({ type, searchValue = '', size, color }) => {
    const iconsToRender = useMemo(() => getIcons(type), [type]);
    const filteredList = iconsToRender.filter(({ originalName }) => originalName.toLowerCase().includes(searchValue));

    return (
        <>
            {!filteredList.length && <Text size="s" color="gray">Nothing found</Text>}
            {filteredList.length && (
                <Grid>
                    {filteredList.map(({ name, icon: Icon, originalName }) => (
                        <Item name={name} key={name} originalName={originalName}>
                            <Icon size={size} color={color} />
                        </Item>
                    ))}
                </Grid>
            )}
        </>
    )
}

export const All: StoryFn<IconStory> = (args) => {
    const [search, setSearch] = useState('');
    const deferredValue = useDeferredValue(search);

    return (
        <Wrapper>
            <InputWrapper>
                <Input
                    value={search}
                    placeholder='Type to search icon ...'
                    onChange={(ev) => setSearch(ev.target.value)}
                    style={{ width: '300px', margin: '0 auto' }}
                />
            </InputWrapper>
            <Results type={args.type} size={args.size} color={args.color} searchValue={deferredValue} />
        </Wrapper>
    )
}