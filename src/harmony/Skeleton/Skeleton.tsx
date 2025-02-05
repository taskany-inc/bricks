import React, { forwardRef, useMemo, useRef } from 'react';
import cn from 'classnames';

import { Text } from '../Text/Text';

import s from './Skeleton.module.css';

type InternalTextProps = Pick<React.ComponentProps<typeof Text>, 'size' | 'className' | 'style' | 'children'>;
type RoundnessSizes = 's' | 'm' | 'l' | 'xl';

const InternalTextComponent = forwardRef<HTMLDivElement, InternalTextProps>((props, ref) => {
    return <Text {...props} as="div" ref={ref} />;
});

const roundnessStyles: Record<RoundnessSizes, string> = {
    s: s.SkeletonRoundness_s,
    m: s.SkeletonRoundness_m,
    l: s.SkeletonRoundness_l,
    xl: s.SkeletonRoundness_xl,
};

interface SkeletonBaseProps {
    roundness?: RoundnessSizes;
    width?: string;
    height?: string;
    className?: string;
    animated?: boolean;
    style?: React.CSSProperties;
}

interface RectSkeletornProps extends SkeletonBaseProps {
    height: string;
    width: string;
}

interface LineSkeletonProps extends React.ComponentProps<typeof InternalTextComponent>, SkeletonBaseProps {}

const BaseSkeleton: React.FC<SkeletonBaseProps> = ({
    className,
    width,
    height,
    roundness = 's',
    animated = true,
    style,
    ...rest
}) => {
    const passStyles = useMemo<React.CSSProperties>(() => {
        return {
            width: width ?? '100%',
            height: height ?? '100%',
            ...style,
        } as React.CSSProperties;
    }, [width, height]);
    return (
        <div
            className={cn(
                s.Skeleton,
                roundnessStyles[roundness],
                {
                    [s.SkeletonAnimated]: animated,
                },
                className,
            )}
            {...rest}
            style={passStyles}
        />
    );
};

export const RectSkeleton: React.FC<RectSkeletornProps> = (props) => <BaseSkeleton {...props} />;

const variousWidth = [7.58, 5.27, 13.54, 6.63, 0.28, 14.8, 0.33, 11.26, 14.1, 10.59, 3.38, 13.5, 7.71, 3.34, 7.96];

const getLineWidth = (i: number, all: number) => {
    let w: number;
    switch (true) {
        // Последняя строка
        case i === all - 1 && all !== 1:
            w = 45 - variousWidth[i % variousWidth.length];
            break;
        // Единственная или первая из двух
        case all === 1 || all === 2:
            w = 100;
            break;
        default:
            w = 100 - variousWidth[i % variousWidth.length];
    }

    return w;
};

export const LineSkeleton: React.FC<LineSkeletonProps> = ({
    className,
    animated = true,
    width,
    style,
    roundness = 's',
    ...props
}) => {
    const ref = useRef<HTMLDivElement>(null);

    const passStyles = useMemo<React.CSSProperties>(() => {
        return {
            width: width ?? '100%',
            ...style,
        } as React.CSSProperties;
    }, [width, style]);

    return (
        <InternalTextComponent
            className={cn(s.Skeleton, s.LineSkeleton, roundnessStyles[roundness], className, {
                [s.SkeletonAnimated]: animated,
            })}
            {...props}
            ref={ref}
            style={passStyles}
        >
            {String.fromCharCode(0xa0)}
        </InternalTextComponent>
    );
};

export const TextSkeleton: React.FC<LineSkeletonProps & { lines: number }> = ({ lines, width, ...props }) => {
    return (
        <div className={s.TextSkeleton}>
            {Array.from({ length: lines }).map((_, i) => (
                <LineSkeleton key={`TextSkeleton.${i}`} width={width ?? `${getLineWidth(i, lines)}%`} {...props} />
            ))}
        </div>
    );
};
