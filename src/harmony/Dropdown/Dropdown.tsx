import React, { ReactNode, createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { IconDownSmallOutline, IconUpSmallOutline } from '@taskany/icons';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Popup } from '../Popup/Popup';

import classes from './Dropdown.module.css';

interface DropdownProps {
    hideOnClick?: boolean;
}

interface DropdownContextProps {
    isOpen?: boolean;
    toggle: () => void;
    setTriggerRef: (el: HTMLElement | null) => void;
    dropdownRef: React.MutableRefObject<HTMLElement | null>;
    hideOnClick?: boolean;
}

export const DropdownContext = createContext<DropdownContextProps>({
    toggle: () => {},
    setTriggerRef: () => {},
    dropdownRef: { current: null },
});

export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({ children, hideOnClick }) => {
    const [opened, setOpened] = useState(false);
    const dropdownRef = useRef<HTMLElement | null>(null);
    const setTriggerRef = useCallback((el: HTMLElement | null) => {
        dropdownRef.current = el;
    }, []);

    const value = useMemo(
        () => ({ isOpen: opened, toggle: () => setOpened((p) => !p), dropdownRef, setTriggerRef, hideOnClick }),
        [opened, setTriggerRef],
    );

    return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: ReactNode;
    error?: { message: string };
    readonly?: boolean;
    view?: 'default' | 'outline';
    arrow?: boolean;
    renderTrigger?: (props: {
        isOpen?: boolean;
        onClick?: () => void;
        ref: (el: HTMLElement | null) => void;
    }) => ReactNode;
}

const DropdownArrow: React.FC = () => (
    <DropdownContext.Consumer>
        {({ isOpen }) =>
            nullable(
                !isOpen,
                () => <IconDownSmallOutline className={classes.DropdownTriggerIcon} size="xs" />,
                <IconUpSmallOutline className={classes.DropdownTriggerIcon} size="xs" />,
            )
        }
    </DropdownContext.Consumer>
);

export const DropdownTrigger = forwardRef<HTMLDivElement, React.PropsWithChildren<DropdownTriggerProps>>(
    ({ children, view, label, readonly, className, arrow = true, onClick, renderTrigger, ...attrs }, ref) => (
        <DropdownContext.Consumer>
            {({ isOpen, toggle, setTriggerRef }) => (
                <>
                    {nullable(
                        renderTrigger,
                        (render) =>
                            render({
                                onClick: !readonly ? toggle : undefined,
                                ref: setTriggerRef,
                                isOpen,
                            }),
                        <div
                            className={classNames(
                                classes.DropdownTrigger,
                                {
                                    [classes.DropdownTriggerOutline]: view === 'outline',
                                },
                                className,
                            )}
                            onClick={(e) => {
                                if (readonly) return;
                                onClick?.(e);
                                toggle();
                            }}
                            {...attrs}
                            ref={ref}
                        >
                            {nullable(label, (l) => (
                                <span className={classes.DropdownTriggerLabel}>
                                    {l}
                                    {nullable(arrow, () => (
                                        <DropdownArrow />
                                    ))}
                                </span>
                            ))}
                            <span className={classes.DropdownTriggerControl} ref={setTriggerRef}>
                                <span className={classes.DropdownTriggerValue}>{children}</span>
                                {nullable(!readonly && !label && arrow, () => (
                                    <DropdownArrow />
                                ))}
                            </span>
                        </div>,
                    )}
                </>
            )}
        </DropdownContext.Consumer>
    ),
);

interface DropdownPanelProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DropdownPanel: React.FC<
    React.PropsWithChildren<DropdownPanelProps & React.ComponentProps<typeof Popup>>
> = ({ className, children, placement = 'bottom', onClick, offset = [0, 10], ...attrs }) => {
    const { isOpen, toggle, dropdownRef, hideOnClick } = useContext(DropdownContext);

    const handleClick = useCallback<React.MouseEventHandler<HTMLDivElement>>(
        (event) => {
            if (hideOnClick) {
                toggle();
            }
            onClick?.(event);
        },
        [hideOnClick],
    );

    return (
        <Popup
            visible={isOpen}
            interactive
            reference={dropdownRef}
            placement={placement}
            onClickOutside={toggle}
            arrow={false}
            offset={offset}
            {...attrs}
            onClick={handleClick}
            className={classNames(classes.DropdownPanel, className)}
        >
            {children}
        </Popup>
    );
};
