import React, { ChangeEvent, ComponentProps, useCallback, useEffect, useRef, useState } from 'react';
import { IconSearchOutline } from '@taskany/icons';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useHotkey } from '../../hooks/useHotkeys';
import { Popup } from '../Popup/Popup';
import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { Keyboard } from '../../components';
import { useKeyboard, KeyCode } from '../../hooks';
import { ModalOverlay } from '../Modal/Modal';

import s from './GlobalSearch.module.css';

export interface GlobalSearchProps
    extends Omit<
        ComponentProps<typeof Input>,
        'ref' | 'forwardedRef' | 'onFocus' | 'onChange' | 'iconLeft' | 'iconRight'
    > {
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    searchResultExists?: boolean;
    placement?: ComponentProps<typeof Popup>['placement'];
    offset?: ComponentProps<typeof Popup>['offset'];
    expandable?: boolean;
    popupMinWidth?: ComponentProps<typeof Popup>['minWidth'];
    popupMaxWidth?: ComponentProps<typeof Popup>['maxWidth'];
}

const defaultSizes = {
    popupMinWidth: 400,
    popupMaxWidth: 800,
};

const defaultOffset = [-8, -40];

export const GlobalSearch = ({
    value,
    onChange,
    placeholder,
    disabled,
    children,
    searchResultExists,
    expandable,
    placement = 'bottom-start',
    offset = defaultOffset,
    popupMinWidth = defaultSizes.popupMinWidth,
    popupMaxWidth = defaultSizes.popupMaxWidth,
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
        onChange('');
    }, [onChange]);

    useHotkey('/', inputHardFocus);
    useClickOutside(popupTargetRef, (e) => {
        if (!popupContentRef.current?.contains(e.target as Node)) {
            setEditMode(false);
            onChange('');
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
    }, [searchResultExists]);

    const onQueryChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.value === '') {
                surfaceVisible.current = false;
            }

            onChange(e.currentTarget.value);
        },
        [onChange],
    );

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        if (value === '') {
            setEditMode(false);
            inputRef.current?.blur();
        } else {
            onChange('');
        }

        surfaceVisible.current = false;
    });

    return (
        <>
            {nullable(editMode && surfaceVisible.current, () => (
                <ModalOverlay />
            ))}
            <Input
                ref={inputRef}
                forwardedRef={popupTargetRef}
                placeholder={placeholder}
                iconLeft={<IconSearchOutline size="s" />}
                iconRight={nullable(!editMode, () => (
                    <Text size="xs" onClick={inputHardFocus}>
                        <Keyboard size="s">/</Keyboard>
                    </Text>
                ))}
                value={value}
                onChange={onQueryChange}
                onFocus={() => setEditMode(true)}
                disabled={disabled}
                className={cn(
                    s.Input,
                    { [s.InputIndex]: editMode && surfaceVisible.current },
                    { [s.Input_expanded]: editMode && expandable },
                )}
                {...onESC}
                {...attrs}
            />
            <Popup
                placement={placement}
                arrow={false}
                visible={popupVisible}
                reference={popupTargetRef}
                interactive
                minWidth={popupMinWidth}
                maxWidth={popupMaxWidth}
                offset={offset}
                className={s.Popup}
            >
                <div ref={popupContentRef} {...onESC}>
                    {children}
                </div>
            </Popup>
        </>
    );
};
