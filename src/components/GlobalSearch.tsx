import React, { ChangeEvent, ComponentProps, HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gapS, textColor } from '@taskany/colors';
import { IconSearchOutline } from '@taskany/icons';

import { nullable } from '../utils/nullable';
import { useClickOutside } from '../hooks/useClickOutside';
import { useHotkey } from '../hooks/useHotkeys';
import { KeyCode, useKeyboard } from '../hooks/useKeyboard';

import { Popup } from './Popup/Popup';
import { Keyboard } from './Keyboard/Keyboard';
import { Input } from './Input/Input';
import { Text } from './Text/Text';

type InputProps = ComponentProps<typeof Input>;

const StyledInput = styled(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ focused, forwardRef, ...props }: InputProps & { focused?: boolean; forwardRef: InputProps['ref'] }) => (
        <Input ref={forwardRef} {...props} />
    ),
)`
    width: 200px;

    transition: width 100ms ease-in-out;

    ${({ focused }) =>
        focused &&
        `
        position: relative;
        z-index: 10001; // 9999 — Popup z-index

            width: 400px;
        `}
`;

const StyledResults = styled.div`
    padding-top: 36px; // Popup default offset + Input height 28px
    padding-bottom: ${gapS};
`;

const StyledGlobalSearch = styled.div`
    position: relative;
`;

const StyledPopupSurface = styled.div<{ visible?: boolean }>`
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;

    background-color: transparent;
    transition: background-color 100ms ease-in-out;

    ${({ visible }) =>
        visible &&
        `
        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);
    `}
`;

const StyledText = styled(Text)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
`;
export interface GlobalSearchProps extends HTMLAttributes<HTMLDivElement> {
    query: string;
    setQuery: (agr: string) => void;
    placeholder?: string;
    disabled?: boolean;
    searchResultExists?: boolean;
}

export const GlobalSearch = ({
    query,
    setQuery,
    placeholder,
    disabled,
    children,
    searchResultExists,
    ...attrs
}: GlobalSearchProps) => {
    const popupContentRef = useRef<HTMLDivElement>(null);
    const popupTargetRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const surfaceVisible = useRef(false);

    const [editMode, setEditMode] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const inputHardFocus = useCallback(() => {
        inputRef.current?.focus();
        setQuery('');
    }, []);

    useHotkey('/', inputHardFocus);
    useClickOutside(popupTargetRef, (e) => {
        if (!popupContentRef.current?.contains(e.target as Node)) {
            setEditMode(false);
            setQuery('');
        }
    });

    useEffect(() => {
        setPopupVisible(!!searchResultExists);
        setTimeout(() => {
            popupContentRef.current?.focus();
        }, 0);
        if (searchResultExists && !surfaceVisible.current) {
            surfaceVisible.current = true;
        }
    }, [query, searchResultExists]);

    const onQueryChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            surfaceVisible.current = false;
        }

        setQuery(e.currentTarget.value);
    }, []);

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        if (query === '') {
            setEditMode(false);
            inputRef.current?.blur();
        } else {
            setQuery('');
        }

        surfaceVisible.current = false;
    });

    return (
        <>
            {nullable(editMode, () => (
                <StyledPopupSurface visible={surfaceVisible.current} />
            ))}
            <StyledGlobalSearch ref={popupTargetRef}>
                <StyledInput
                    forwardRef={inputRef}
                    focused={editMode}
                    placeholder={placeholder}
                    iconLeft={<IconSearchOutline size="s" color={textColor} />}
                    iconRight={nullable(!editMode, () => (
                        <StyledText size="xs" onClick={inputHardFocus}>
                            <Keyboard size="s">/</Keyboard>
                        </StyledText>
                    ))}
                    value={query}
                    onChange={onQueryChange}
                    onFocus={() => setEditMode(true)}
                    disabled={disabled}
                    {...onESC}
                />
            </StyledGlobalSearch>
            <Popup
                placement="bottom-start"
                arrow={false}
                visible={popupVisible}
                reference={popupTargetRef}
                interactive
                minWidth={400}
                maxWidth={800}
                offset={[-8, -36]}
                {...attrs}
            >
                <StyledResults ref={popupContentRef} {...onESC}>
                    {children}
                </StyledResults>
            </Popup>
        </>
    );
};
