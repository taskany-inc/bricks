import React, { useMemo } from 'react';
import cn from 'classnames';

import { nullable } from '../../utils';
import { detectPlatform } from '../../utils/detectPlatform';

import s from './Keyboard.module.css';

const viewMap = {
    default: s.Keyboard_default,
    success: s.Keyboard_success,
    danger: s.Keyboard_danger,
};

const sizeMap = {
    s: s.Keyboard_size_s,
    m: s.Keyboard_size_m,
};

interface KeyboardProps {
    command?: boolean;
    shift?: boolean;
    option?: boolean;
    ctrl?: boolean;
    enter?: boolean;
    space?: boolean;
    size?: keyof typeof sizeMap;
    view?: keyof typeof viewMap;
    children?: React.ReactNode;
}

export const Keyboard: React.FC<KeyboardProps> = ({
    command,
    shift,
    option,
    ctrl,
    enter,
    space,
    size = 'm',
    view = 'default',
    children,
}) => {
    const commandKey = useMemo(
        () => nullable(detectPlatform() === 'windows', () => <span>ctrl</span>, <span>⌘</span>),
        [],
    );

    return (
        <kbd className={cn(s.Keyboard, [sizeMap[size], viewMap[view]])}>
            {command && commandKey}
            {shift && <span>⇧</span>}
            {option && <span>⌥</span>}
            {ctrl && <span>⌃</span>}
            {enter && <span>⏎</span>}
            {space && <span>Space</span>}
            {children && <span>{children}</span>}
        </kbd>
    );
};
