import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Button } from '../Button/Button';
import { useMounted, useEventCallback } from '../../hooks';

import classes from './Switch.module.css';

interface SwitchProps extends Omit<React.HTMLAttributes<HTMLInputElement>, 'onChange'> {
    onChange?: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    name?: string;
    value?: string;
}

interface SwitchContextProps {
    active?: string;
    nodesMapRef?: React.RefObject<Map<string, HTMLButtonElement>>;
    onChange?: (event: React.SyntheticEvent<HTMLButtonElement>, active: string) => void;
    name?: string;
    switchActive: (next: string) => void;
    register: (value: string, node: HTMLButtonElement) => () => void;
}

const SwitchContext = createContext<SwitchContextProps>({
    switchActive: () => {
        throw new Error("SwitchContext doesn't initialized");
    },
    register: () => {
        throw new Error("SwitchContext doesn't initialized");
    },
});

interface SwitchControlProps extends React.ComponentProps<typeof Button> {
    value: string;
}

export const SwitchControl: React.FC<SwitchControlProps> = ({ text, value, className, ...props }) => {
    const { active, register, onChange, name } = useContext(SwitchContext);
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
            })}
            name={name}
            value={value}
            view="ghost"
            text={text}
            {...props}
            onClick={handleClick}
        />
    );
};

const defaultPinStyles = {};

export const Switch: React.FC<PropsWithChildren<SwitchProps>> = ({ children, value, name, onChange }) => {
    const [active, setActive] = useState(() => value);
    const [pinStyle, setPinStyle] = useState<{ left?: number; width?: number }>(defaultPinStyles);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const nodesMapRef = useRef<Map<string, HTMLButtonElement>>(new Map());
    const pinRef = useRef<HTMLSpanElement>(null);

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

            onChange?.(event);
        },
        [onChange],
    );

    useEffect(() => {
        updatePinStyles();
    });

    const mounted = useMounted();

    return (
        <SwitchContext.Provider
            value={{ active, switchActive, register, nodesMapRef, name, onChange: onChangeHandler }}
        >
            <div className={classes.Switch} ref={wrapperRef}>
                {children}
                {nullable(mounted, () => (
                    <span className={classes.SwitchPin} style={pinStyle} ref={pinRef} />
                ))}
            </div>
        </SwitchContext.Provider>
    );
};
