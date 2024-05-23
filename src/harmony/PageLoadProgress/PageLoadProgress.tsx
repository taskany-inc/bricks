import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import cn from 'classnames';

import s from './PageLoadProgress.module.css';

interface PageLoadProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    start?: number;
    max?: number;
    height?: number;
}

export interface PageLoadProgressRef {
    start: () => void;
    done: () => void;
}

type Action = { type: 'start' } | { type: 'tick'; payload?: number } | { type: 'stop' } | { type: 'reset' };
type ProgressState = 'idle' | 'load' | 'finish';

interface State {
    progress: number;
    state: ProgressState;
    readonly max: number;
}

const limit = (n: number) => (1 + 1 / n) ** n - 1;
const clampToMax = (n: number, max: number) => {
    return Math.min(n, max);
};

const reducer: React.Reducer<State, Action> = (state, action) => {
    switch (action.type) {
        case 'start': {
            return {
                ...state,
                state: 'load',
                progress: 0.05,
            };
        }
        case 'tick': {
            return {
                ...state,
                progress: clampToMax(limit(state.progress), state.max),
            };
        }
        case 'stop':
            return {
                ...state,
                state: 'finish',
                progress: 1,
            };

        case 'reset': {
            return {
                ...state,
                state: 'idle',
                progress: 0,
            };
        }
        default:
            return state;
    }
};

export const PageLoadProgress = forwardRef<PageLoadProgressRef, PageLoadProgressProps>(
    ({ className, color, start = 0.05, max = 0.995, height = 4, ...attrs }, ref) => {
        const barRef = useRef<HTMLDivElement>(null);
        const [{ state, progress }, dispatch] = useReducer(reducer, {
            progress: start,
            max,
            state: 'idle',
        });

        useImperativeHandle(
            ref,
            () => ({
                start: () => {
                    dispatch({ type: 'start' });
                },
                done: () => {
                    dispatch({ type: 'stop' });
                },
            }),
            [],
        );

        useEffect(() => {
            if (barRef.current) {
                const node = barRef.current;
                if (state !== 'idle') {
                    node.style.width = `${progress * 100}%`;
                } else {
                    node.style.transition = 'none';
                    node.style.removeProperty('width');

                    node.offsetHeight; // trigger reflow

                    node.style.removeProperty('transition');
                }
            }
        }, [progress, state]);

        const transitionEndHandle = useCallback(() => {
            if (state === 'load') {
                dispatch({ type: 'tick' });
            }

            if (state === 'finish') {
                dispatch({ type: 'reset' });
            }
        }, [state]);

        const style = {
            '--progress-bar-height': `${height}px`,
            '--progress-bar-color': color,
        } as React.CSSProperties;

        return (
            <div className={cn(s.PageLoadProgress, className)} style={style} {...attrs}>
                <div className={s.PageLoadProgressBar} ref={barRef} onTransitionEnd={transitionEndHandle}>
                    <div className={cn(s.PageLoadProgressBarInner)} />
                </div>
            </div>
        );
    },
);
