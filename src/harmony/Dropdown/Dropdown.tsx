import React, { createContext, forwardRef, useCallback, useContext, useMemo, useRef, useState } from 'react';
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
    setTriggerRef: (el: HTMLSpanElement) => void;
    dropdownRef: React.MutableRefObject<HTMLSpanElement | null>;
    hideOnClick?: boolean;
}

export const DropdownContext = createContext<DropdownContextProps>({
    toggle: () => {},
    setTriggerRef: () => {},
    dropdownRef: { current: null },
});

export const Dropdown: React.FC<React.PropsWithChildren<DropdownProps>> = ({ children, hideOnClick }) => {
    const [opened, setOpened] = useState(false);
    const dropdownRef = useRef<HTMLSpanElement | null>(null);
    const setTriggerRef = useCallback((el: HTMLSpanElement) => {
        dropdownRef.current = el;
    }, []);

    const value = useMemo(
        () => ({ isOpen: opened, toggle: () => setOpened((p) => !p), dropdownRef, setTriggerRef, hideOnClick }),
        [opened, setTriggerRef],
    );

    return <DropdownContext.Provider value={value}>{children}</DropdownContext.Provider>;
};

interface DropdownTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    label?: string;
    error?: { message: string };
    readonly?: boolean;
    view?: 'default' | 'outline';
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
    ({ children, view, label, readonly, className, ...attrs }, ref) => (
        <DropdownContext.Consumer>
            {({ toggle, setTriggerRef }) => (
                <div
                    className={classNames(
                        classes.DropdownTrigger,
                        {
                            [classes.DropdownTriggerOutline]: view === 'outline',
                        },
                        className,
                    )}
                    {...attrs}
                    ref={ref}
                >
                    {nullable(label, (l) => (
                        <span className={classes.DropdownTriggerLabel}>
                            {l}
                            <DropdownArrow />
                        </span>
                    ))}
                    <span
                        className={classes.DropdownTriggerControl}
                        onClick={!readonly ? toggle : undefined}
                        ref={setTriggerRef}
                    >
                        <span className={classes.DropdownTriggerValue}>{children}</span>
                        {nullable(!readonly && !label, () => (
                            <DropdownArrow />
                        ))}
                    </span>
                </div>
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
