import React, {
    ComponentProps,
    MutableRefObject,
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { Dropdown, DropdownPanel, DropdownTrigger, DropdownTriggerError } from '../Dropdown/Dropdown';
import { nullable } from '../../utils';
import { MenuItem } from '../MenuItem/MenuItem';
import { ListViewItem } from '../ListView/ListView';
import { AutoComplete, AutoCompleteList } from '../AutoComplete/AutoComplete';
import { KeyCode, useKeyboard } from '../../hooks';
import { Checkbox } from '../Checkbox/Checkbox';

interface SelectBaseProps<T> {
    items?: T[];
    value?: T[];
    onChange?: (items: T[]) => void;
    mode?: ComponentProps<typeof AutoComplete>['mode'];
    selectable?: boolean;
    renderItem?: (props: Parameters<ComponentProps<typeof ListViewItem>['renderItem']>['0'] & { item: T }) => ReactNode;
}

interface SelectContextProps<T> extends SelectBaseProps<T> {
    open?: boolean;
    toggle: () => void;
    onClose: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectContext = createContext<SelectContextProps<any>>({
    open: false,
    toggle: () => {},
    onClose: () => {},
    mode: 'single',
});

interface SelectProps extends ComponentProps<typeof Dropdown> {
    children: ReactNode;
}

export const Select = <T extends { id: string }>({
    children,
    isOpen,
    onClose,
    mode = 'single',
    items = [],
    value,
    onChange,
    renderItem,
    selectable,
    ...props
}: SelectProps & SelectBaseProps<T>) => {
    const [open, setOpen] = useState(isOpen);

    const toggle = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    const onClosePanel = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const ctx = useMemo<SelectContextProps<T>>(
        () => ({
            open,
            toggle,
            onClose: onClosePanel,
            onChange,
            renderItem,
            items,
            selectable,
            value,
            mode,
        }),
        [open, toggle, onClosePanel, onChange, items, selectable, value, mode],
    );

    return (
        <SelectContext.Provider value={ctx}>
            <Dropdown isOpen={open} onClose={onClosePanel} {...props}>
                {children}
            </Dropdown>
        </SelectContext.Provider>
    );
};

type DropdownTriggerProps = ComponentProps<typeof DropdownTrigger>;

interface SelectTriggerProps extends Omit<DropdownTriggerProps, 'error' | 'renderTrigger'> {
    error?: { message?: string };
    className?: string;
    renderTrigger?: (
        props: Omit<Parameters<NonNullable<DropdownTriggerProps['renderTrigger']>>['0'], 'ref'> & {
            onClick: () => void;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref?: MutableRefObject<any>;
        },
    ) => ReactNode;
}

export const SelectTrigger = ({
    children,
    className,
    placeholder,
    label,
    error,
    view = 'fill',
    renderTrigger,
    ...props
}: SelectTriggerProps) => {
    const { toggle } = useContext(SelectContext);

    return (
        <>
            <DropdownTrigger
                label={label}
                view={view}
                onClick={toggle}
                className={className}
                error={Boolean(error)}
                renderTrigger={
                    renderTrigger ? ({ ref, ...props }) => renderTrigger({ ...props, ref, onClick: toggle }) : undefined
                }
                placeholder={placeholder}
                {...props}
            >
                {children}
            </DropdownTrigger>
            {nullable(error, ({ message }) => (
                <DropdownTriggerError message={message} />
            ))}
        </>
    );
};

interface SelectPanelProps extends Omit<ComponentProps<typeof DropdownPanel>, 'onChange'> {
    width?: ComponentProps<typeof DropdownPanel>['width'];
    iconLeft?: ComponentProps<typeof MenuItem>['iconLeft'];
    placeholder?: string;
    title?: string;
}

export const SelectPanel = ({ placement = 'top-start', title, children, iconLeft, ...rest }: SelectPanelProps) => {
    const { open, onClose, items = [], value, onChange, mode, selectable, renderItem } = useContext(SelectContext);

    const valueMap = useMemo(
        () => (value || []).reduce<Record<string, boolean>>((acc, cur) => ({ ...acc, [cur.id]: true }), {}),
        [value],
    );
    const multiple = mode === 'multiple';

    const [onESC] = useKeyboard([KeyCode.Escape], () => {
        onClose();
    });

    return (
        // The content component instance remains in memory/mounted across open/closes of the popover.
        // https://github.com/atomiks/tippyjs-react/issues/82
        nullable(open, () => (
            <DropdownPanel placement={placement} {...onESC} {...rest}>
                {children}
                <AutoComplete
                    items={items}
                    mode={mode}
                    onChange={onChange}
                    value={value}
                    renderItem={({ item, isSelected, active, onChange, ...props }) => (
                        <MenuItem
                            onClick={() => {
                                onChange();
                                if (multiple) return;
                                onClose?.();
                            }}
                            {...props}
                            multiple={multiple}
                            hovered={active}
                            selected={valueMap[item.id]}
                            selectable={selectable}
                            iconLeft={nullable(selectable, () => {
                                return iconLeft || (multiple && <Checkbox id={item.id} defaultChecked={isSelected} />);
                            })}
                        >
                            {renderItem?.({ ...props, item })}
                        </MenuItem>
                    )}
                >
                    {nullable(
                        multiple,
                        () => (
                            <>
                                <AutoCompleteList selected />
                                <AutoCompleteList title={title} filterSelected />
                            </>
                        ),
                        <AutoCompleteList title={title} />,
                    )}
                </AutoComplete>
            </DropdownPanel>
        ))
    );
};
