import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconXOutline } from '@taskany/icons';
import cn from 'classnames';

import { Portal } from '../../components';
import { useKeyboard, KeyCode } from '../../hooks/useKeyboard';
import { Button } from '../Button/Button';
import { nullable } from '../../utils';

import s from './Drawer.module.css';

interface DrawerProps {
    visible?: boolean;
    className?: string;
    animated?: boolean;
    onClose?: () => void;
}

const useFocusedState = (visible?: boolean) => {
    const [focused, setFocused] = useState(false);
    const onMouseEnter = useCallback(() => {
        setFocused(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setFocused(false);
    }, []);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = focused ? 'hidden' : 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [visible, focused]);

    return {
        onMouseEnter,
        onMouseLeave,
    };
};

const DrawerContext = React.createContext<Partial<{ onClose(): void }>>({
    onClose: () => {
        throw new Error('Not implemented');
    },
});

const forceReflow = <T extends HTMLElement>(node: T) => node.scrollTop;

export const DrawerBody: React.FC<React.PropsWithChildren<DrawerElementProps>> = ({ children, className }) => (
    <div className={cn(s.DrawerBody, className)}>
        <div className={s.DrawerBodyContent}>{children}</div>
    </div>
);

export const Drawer: React.FC<React.PropsWithChildren<DrawerProps>> = ({
    visible,
    animated,
    children,
    onClose,
    className,
}) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const [opened, setOpened] = useState(false);
    const [onESC] = useKeyboard([KeyCode.Escape], () => onClose?.(), {
        disableGlobalEvent: false,
    });
    const onFocusState = useFocusedState(visible);

    const performState = useCallback((condition: boolean, classes: [string, string]) => {
        if (drawerRef.current == null) {
            return;
        }

        const node = drawerRef.current;

        if (condition) {
            if (animated) {
                node.addEventListener('transitionend', () => setOpened((p) => !p), { once: true });
            } else {
                setOpened((p) => !p);
            }

            forceReflow(node);
            requestAnimationFrame(() => {
                node.classList.add(classes[0]);
                node.classList.remove(classes[1]);
            });
        }
    }, []);

    useEffect(() => {
        /** handle open */
        performState(Boolean(visible && !opened), [s.DrawerOpened, s.DrawerClosed]);

        /** handle close */
        performState(Boolean(!visible && opened), [s.DrawerClosed, s.DrawerOpened]);
    }, [visible, opened, performState]);

    const shouldRenderPortal = useMemo(() => {
        if (visible) {
            return visible || opened;
        }

        return opened;
    }, [visible, opened]);

    return nullable(shouldRenderPortal, () => (
        <Portal id="drawer">
            <div
                className={cn(s.Drawer, s.DrawerClosed, className, {
                    [s.DrawerAnimated]: animated,
                })}
                ref={drawerRef}
                {...onESC}
                {...onFocusState}
            >
                <DrawerContext.Provider value={{ onClose }}>
                    <DrawerBody className={s.DrawerWrapper}>{children}</DrawerBody>
                </DrawerContext.Provider>
            </div>
        </Portal>
    ));
};

interface DrawerElementProps {
    className?: string;
}

export const DrawerHeader: React.FC<
    React.PropsWithChildren<DrawerElementProps & { topBarContent?: React.ReactNode }>
> = ({ children, topBarContent, className }) => (
    <DrawerContext.Consumer>
        {({ onClose }) => (
            <header className={cn(s.DrawerHeading, className)}>
                <div className={cn(s.DrawerTopBar)}>
                    {topBarContent}
                    <Button
                        className={s.DrawerCloseBtn}
                        view="clear"
                        iconLeft={<IconXOutline size="s" />}
                        onClick={onClose}
                        type="button"
                    />
                </div>
                <div className={cn(s.DrawerHeadingContent)}>{children}</div>
            </header>
        )}
    </DrawerContext.Consumer>
);
