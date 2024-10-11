import React, {
    ComponentProps,
    MouseEventHandler,
    MutableRefObject,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
} from 'react';
import { IconDownSmallOutline, IconUpSmallOutline } from '@taskany/icons';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';
import { Popup } from '../Popup/Popup';
import { KeyCode, useKeyboard } from '../../hooks';
import { Tooltip } from '../Tooltip/Tooltip';

import s from './Dropdown.module.css';

const sizeMap = {
    xs: s.DropdownTrigger_size_xs,
    s: s.DropdownTrigger_size_s,
    m: s.DropdownTrigger_size_m,
} as const;

interface DropdownContextProps {
    isOpen?: boolean;
    panelRef?: MutableRefObject<HTMLDivElement | null>;
    onClose?: () => void;
    arrow?: boolean;
}

const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
    arrow: false,
});

interface DropdownProps extends Omit<DropdownContextProps, 'panelRef'> {
    children?: ReactNode;
}

export const Dropdown = ({ children, isOpen, onClose, arrow }: DropdownProps) => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    const ctx = useMemo(() => {
        return {
            isOpen,
            panelRef,
            onClose,
            arrow,
        };
    }, [isOpen, onClose, arrow]);

    return <DropdownContext.Provider value={ctx}>{children}</DropdownContext.Provider>;
};

const DropdownArrow = ({ isOpen }: { isOpen?: boolean }) =>
    nullable(!isOpen, () => <IconDownSmallOutline size="xs" />, <IconUpSmallOutline size="xs" />);

interface DropdownTriggerErrorProps extends Pick<ComponentProps<typeof Tooltip>, 'placement' | 'offset'> {
    message?: ReactNode;
}

export const DropdownTriggerError = ({
    message,
    offset = [0, 8],
    placement = 'bottom',
    ...props
}: DropdownTriggerErrorProps) => {
    const { panelRef } = useContext(DropdownContext);
    return (
        <Tooltip view="danger" reference={panelRef} placement={placement} offset={offset} {...props}>
            {message}
        </Tooltip>
    );
};

const triggerViewMap = {
    default: s.DropdownTrigger_view_default,
    outline: s.DropdownTrigger_view_outline,
    fill: s.DropdownTrigger_view_fill,
};

interface DropdownTriggerProps {
    className?: string;
    label?: ReactNode;
    error?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    view?: keyof typeof triggerViewMap;
    size?: keyof typeof sizeMap;
    children?: ReactNode;
    placeholder?: string;
    renderTrigger?: ({
        isOpen,
        ref,
    }: {
        ref: DropdownContextProps['panelRef'];
        isOpen: DropdownContextProps['isOpen'];
    }) => ReactNode | null;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

export const DropdownTrigger = ({
    children,
    label,
    view = 'default',
    size = 's',
    disabled,
    error,
    readOnly,
    className,
    placeholder,
    onClick,
    renderTrigger,
    ...props
}: DropdownTriggerProps) => {
    const { panelRef, isOpen, onClose, arrow } = useContext(DropdownContext);

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        if (!isOpen) return;
        onClose?.();
    });

    const hasArrow = !readOnly && arrow;

    return nullable(
        renderTrigger,
        (render) => render({ isOpen, ref: panelRef }),
        <div
            className={cn(
                s.DropdownTrigger,
                sizeMap[size],
                {
                    [triggerViewMap[view]]: !error,
                    [s.DropdownTrigger_error]: error,
                    [s.DropdownTrigger_error_outline]: error && view === 'outline',
                    [s.DropdownTrigger_disabled]: disabled,
                    [s.DropdownTrigger_readOnly]: readOnly,
                    [s.DropdownTriggerWithLabel]: Boolean(label),
                    [s.DropdownTrigger_active]: isOpen,
                },
                className,
            )}
            tabIndex={0}
            onClick={readOnly || disabled ? undefined : onClick}
            ref={panelRef}
            {...onESC}
            {...props}
        >
            {nullable(label, () => (
                <Text size="xs" className={cn(s.DropdownTriggerLabel, { [s.DropdownTriggerLabel_error]: error })}>
                    {label}
                </Text>
            ))}
            <div className={cn(s.DropdownTriggerValueWrapper)}>
                <div className={cn(s.DropdownTriggerValue, { [s.DropdownTriggerValue_interactive]: hasArrow })}>
                    {nullable(
                        children,
                        () => children,
                        <Text
                            size="s"
                            ellipsis
                            className={cn(s.DropdownTriggerValuePlaceholder, {
                                [s.DropdownTriggerValuePlaceholder_error]: error,
                            })}
                        >
                            {placeholder}
                        </Text>,
                    )}
                </div>
                {nullable(hasArrow, () => (
                    <DropdownArrow isOpen={isOpen} />
                ))}
            </div>
        </div>,
    );
};

type PopupProps = ComponentProps<typeof Popup>;
interface DropdownPanelProps extends Omit<PopupProps, 'minWidth' | 'maxWidth'> {
    width?: PopupProps['minWidth'];
}

const defaultOffset = [0, 4];

export const DropdownPanel = ({
    children,
    className,
    onClickOutside,
    width,
    offset = defaultOffset,
    placement = 'bottom',
    ...props
}: DropdownPanelProps) => {
    const { panelRef, isOpen, onClose } = useContext(DropdownContext);

    const onClick = useCallback(
        (...args: Parameters<NonNullable<PopupProps['onClickOutside']>>) => {
            onClickOutside?.(...args);
            onClose?.();
        },
        [onClose, onClickOutside],
    );

    return nullable(isOpen, () => (
        // The content component instance remains in memory/mounted across open/closes of the popover.
        // https://github.com/atomiks/tippyjs-react/issues/82
        <Popup
            arrow={false}
            interactive
            visible={isOpen}
            reference={panelRef}
            placement={placement}
            offset={offset}
            onClickOutside={onClick}
            className={cn(s.DropdownPanel, className)}
            minWidth={width}
            maxWidth={width}
            {...props}
        >
            {children}
        </Popup>
    ));
};
