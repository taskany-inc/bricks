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

import s from './Dropdown.module.css';

interface DropdownContextProps {
    isOpen?: boolean;
    panelRef?: MutableRefObject<HTMLDivElement | null>;
    onClose?: () => void;
}

const DropdownContext = createContext<DropdownContextProps>({
    isOpen: false,
});

interface DropdownProps extends Omit<DropdownContextProps, 'panelRef'> {
    children?: ReactNode;
}

export const Dropdown = ({ children, isOpen, onClose }: DropdownProps) => {
    const panelRef = useRef<HTMLDivElement | null>(null);

    const ctx = useMemo(() => {
        return {
            isOpen,
            panelRef,
            onClose,
        };
    }, [isOpen, onClose]);

    return <DropdownContext.Provider value={ctx}>{children}</DropdownContext.Provider>;
};

const DropdownArrow = ({ isOpen }: { isOpen?: boolean }) =>
    nullable(!isOpen, () => <IconDownSmallOutline size="xs" />, <IconUpSmallOutline size="xs" />);

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
    children?: ReactNode;
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
    disabled,
    error,
    readOnly,
    className,
    onClick,
    renderTrigger,
    ...props
}: DropdownTriggerProps) => {
    const { panelRef, isOpen, onClose } = useContext(DropdownContext);

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        if (!isOpen) return;
        onClose?.();
    });

    return nullable(
        renderTrigger,
        (render) => render({ isOpen, ref: panelRef }),
        <div
            className={cn(
                s.DropdownTrigger,
                { [triggerViewMap[view]]: !error },
                { [s.DropdownTrigger_error]: error },
                { [s.DropdownTrigger_error_outline]: error && view === 'outline' },
                { [s.DropdownTrigger_disabled]: disabled },
                { [s.DropdownTrigger_readOnly]: readOnly },
                { [s.DropdownTriggerWithLabel]: Boolean(label) },
                { [s.DropdownTrigger_active]: isOpen },
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
                <div className={cn(s.DropdownTriggerValue)}>{children}</div>
                {nullable(!readOnly, () => (
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

    return (
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
    );
};
