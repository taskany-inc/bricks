import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { brandColor, textColor } from '@taskany/colors';

interface PageLoadProgressCommonProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    start?: number;
    max?: number;
    height?: number;
}

type StrippedProps =
    | {
          stripped?: false;
          stopColor?: never;
          size?: never;
      }
    | {
          stripped: true;
          stopColor?: string;
          size?: number;
      };

type PageLoadProgressProps = PageLoadProgressCommonProps & StrippedProps;

export interface PageLoadProgressRef {
    start: () => void;
    done: () => void;
}

type StyledProgressBarInnerProps = Pick<PageLoadProgressProps, 'color' | 'height' | 'stripped' | 'size' | 'stopColor'>;
type Action = { type: 'start' } | { type: 'tick'; payload?: number } | { type: 'stop' } | { type: 'reset' };
type ProgressState = 'idle' | 'load' | 'finish';

interface State {
    progress: number;
    state: ProgressState;
    readonly max: number;
}

const animatedLoadedBackground = (shift: number) => keyframes`
    from {
        background-position: 0 0;
    }
    to {
        background-position: ${shift}px 0;
}`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledProgressWrapper = styled(({ height, ...props }: PageLoadProgressProps) => <div {...props} />)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({ height }) => height}px;
`;

const StyledProgressBar = styled.div`
    height: 100%;
    width: 0;
    transition: width 0.6s linear;
    position: relative;
    display: flex;
`;

const StyledProgressBarInner = styled.div<StyledProgressBarInnerProps>`
    ${({ stripped, stopColor = textColor, size = 72 }) => {
        if (stripped) {
            return css`
                background-image: linear-gradient(
                    -45deg,
                    ${stopColor} 25%,
                    transparent 25%,
                    transparent 50%,
                    ${stopColor} 50%,
                    ${stopColor} 75%,
                    transparent 75%,
                    transparent
                );
                background-size: ${size}px ${size}px;
                animation: ${animatedLoadedBackground(size)} 2s linear infinite forwards;
            `;
        }

        return undefined;
    }}

    background-color: ${({ color }) => color || brandColor};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

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
    ({ color, start = 0.05, max = 0.995, height = 4, stripped = false, stopColor, size, ...attrs }, ref) => {
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

        return (
            <StyledProgressWrapper height={height} {...attrs}>
                <StyledProgressBar ref={barRef} onTransitionEnd={transitionEndHandle}>
                    <StyledProgressBarInner stripped={stripped} stopColor={stopColor} size={size} color={color} />
                </StyledProgressBar>
            </StyledProgressWrapper>
        );
    },
);
