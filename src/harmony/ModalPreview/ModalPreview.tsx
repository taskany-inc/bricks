import React, { useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { useKeyboard, KeyCode } from '../../hooks/useKeyboard';
import { Portal } from '../../components/Portal';
import { ModalCross } from '../Modal/Modal';

import s from './ModalPreview.module.css';

interface ModalPreviewProps {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    width?: number;

    onClose?: () => void;
    onShow?: () => void;
}

export const ModalPreview: React.FC<ModalPreviewProps> = ({ visible, children, onClose, onShow, className }) => {
    const [focused, setFocused] = useState(false);

    const [onESC] = useKeyboard([KeyCode.Escape], () => onClose?.(), {
        disableGlobalEvent: false,
    });

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

    useEffect(() => {
        visible && onShow?.();
    }, [visible, onShow]);

    return (
        <>
            {nullable(visible, () => (
                <Portal id="modalPreview">
                    <div
                        className={cn(s.ModalPreview, className)}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        {...onESC}
                    >
                        {nullable(onClose, () => (
                            <ModalCross onClick={onClose} />
                        ))}
                        {children}
                    </div>
                </Portal>
            ))}
        </>
    );
};
