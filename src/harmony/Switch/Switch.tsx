import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Button } from '../Button/Button';
import { useMounted, useEventCallback } from '../../hooks';
import { Counter } from '../Counter/Counter';

import classes from './Switch.module.css';

interface SwitchProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange?: (event: React.SyntheticEvent<HTMLButtonElement>, active: string) => void;
    name?: string;
    value?: string;
    animated?: boolean;
}

interface SwitchContextProps {
    active?: string;
    nodesMapRef?: React.RefObject<Map<string, HTMLButtonElement>>;
    onChange?: (event: React.SyntheticEvent<HTMLButtonElement>, active: string) => void;
    name?: string;
    switchActive: (next: string) => void;
    register: (value: string, node: HTMLButtonElement) => () => void;
    animated?: boolean;
}

const SwitchContext = createContext<SwitchContextProps>({
    switchActive: () => {
        throw new Error("SwitchContext doesn't initialized");
    },
    register: () => {
        throw new Error("SwitchContext doesn't initialized");
    },
});

interface SwitchControlProps extends Omit<React.ComponentProps<typeof Button>, 'view'> {
    value: string;
    count?: number;
}

export const SwitchControl: React.FC<SwitchControlProps> = ({ text, value, className, count, onClick, ...props }) => {
    const { active, register, onChange, name, animated } = useContext(SwitchContext);
    const controlRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        let drop = () => {};

        if (controlRef.current) {
            drop = register(value, controlRef.current);
        }

        return () => {
            drop();
        };
    }, [value]);

    const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
        (event) => {
            onChange?.(event, value);
        },
        [onChange, value],
    );
    return (
        <Button
            ref={controlRef}
            className={classNames(classes.SwitchControl, className, {
                [classes.SwitchControl_active]: active === value,
                [classes.SwitchControl_animated]: animated,
            })}
            name={name}
            value={value}
            view="ghost"
            text={text}
            {...props}
            iconRight={nullable(
                count != null,
                () => (
                    <Counter size={props.size} count={count as number} active={active === value} />
                ),
                props.iconRight,
            )}
            onClick={onClick || handleClick}
        />
    );
};

const defaultPinStyles = {};

export const Switch: React.FC<PropsWithChildren<SwitchProps>> = ({
    animated = true,
    children,
    value,
    name,
    onChange,
    className,
    ...props
}) => {
    const [active, setActive] = useState(() => value);
    const [pinStyle, setPinStyle] = useState<{ left?: number; width?: number }>(defaultPinStyles);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const nodesMapRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const pinRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        setActive(value);
    }, [value]);

    const updatePinStyles = useEventCallback(() => {
        if (!active) {
            return;
        }

        const current = nodesMapRef.current.get(active);

        if (!current) return;

        const width = current.offsetWidth;
        const left = current.offsetLeft;

        const nextPinStyle = { width, left };

        const diffStart = Math.abs((pinStyle.left ?? 0) - nextPinStyle.left);
        const diffSize = Math.abs((pinStyle.width ?? 0) - nextPinStyle.width);

        if (diffStart >= 1 || diffSize >= 1) {
            setPinStyle(nextPinStyle);
        }
    }, [active]);

    const switchActive = useCallback((value: string) => {
        setActive(value);
    }, []);

    const register = useCallback((value: string, node: HTMLButtonElement) => {
        nodesMapRef.current.set(value, node);
        return () => {
            nodesMapRef.current.delete(value);
        };
    }, []);

    const onChangeHandler = useCallback(
        (event: React.SyntheticEvent<HTMLButtonElement>, nextActive: string) => {
            setActive(nextActive);

            onChange?.(event, nextActive);
        },
        [onChange],
    );

    useEffect(() => {
        updatePinStyles();
    });

    const mounted = useMounted();

    return (
        <SwitchContext.Provider
            value={{ animated, active, switchActive, register, nodesMapRef, name, onChange: onChangeHandler }}
        >
            <div className={classNames(classes.Switch, className)} ref={wrapperRef} {...props}>
                {children}
                {nullable(mounted, () => (
                    <span
                        className={classNames(classes.SwitchPin, { [classes.SwitchPin_animated]: animated })}
                        style={pinStyle}
                        ref={pinRef}
                    />
                ))}
            </div>
        </SwitchContext.Provider>
    );
};
