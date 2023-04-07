import React, { Suspense } from 'react';
import styled from 'styled-components';
import plus from 'teenyicons/outline/plus-circle.svg';
import user from 'teenyicons/outline/user.svg';
import sun from 'teenyicons/outline/sun.svg';
import moon from 'teenyicons/outline/moon.svg';
import cross from 'teenyicons/outline/x.svg';
import elbowСonnector from 'teenyicons/outline/elbow-connector.svg';
import bookmark from 'teenyicons/outline/bookmark.svg';
import building from 'teenyicons/outline/building.svg';
import bulbOn from 'teenyicons/outline/bulb-on.svg';
import cog from 'teenyicons/outline/cog.svg';
import wand from 'teenyicons/outline/wand.svg';
import location from 'teenyicons/outline/location.svg';
import arrowDownSmall from 'teenyicons/solid/down-small.svg';
import arrowUpSmall from 'teenyicons/solid/up-small.svg';
import clipboardPlus from 'teenyicons/outline/clipboard-plus.svg';
import clipboardTick from 'teenyicons/outline/clipboard-tick.svg';
import calendarTick from 'teenyicons/outline/calendar-tick.svg';
import calendar from 'teenyicons/outline/calendar.svg';
import flow from 'teenyicons/outline/git-compare.svg';
import tag from 'teenyicons/outline/tag.svg';
import search from 'teenyicons/outline/search.svg';
import gitFork from 'teenyicons/outline/git-fork.svg';
import message from 'teenyicons/outline/message.svg';
import eye from 'teenyicons/outline/eye.svg';
import eyeClosed from 'teenyicons/outline/eye-closed.svg';
import star from 'teenyicons/outline/star.svg';
import starFilled from 'teenyicons/solid/star.svg';
import emoji from 'teenyicons/outline/mood-tongue.svg';
import markdown from 'teenyicons/outline/markdown.svg';
import question from 'teenyicons/outline/question-circle.svg';
import editCircle from 'teenyicons/outline/edit-circle.svg';
import edit from 'teenyicons/outline/edit.svg';
import bin from 'teenyicons/outline/bin.svg';
import moreVertical from 'teenyicons/outline/more-vertical.svg';

const componentsMap = {
    plus,
    user,
    sun,
    moon,
    cross,
    elbowСonnector,
    bookmark,
    building,
    bulbOn,
    cog,
    wand,
    location,
    arrowDownSmall,
    arrowUpSmall,
    clipboardPlus,
    clipboardTick,
    calendarTick,
    calendar,
    flow,
    tag,
    search,
    gitFork,
    message,
    eye,
    eyeClosed,
    star,
    starFilled,
    emoji,
    markdown,
    question,
    editCircle,
    edit,
    bin,
    moreVertical,
};

export const sizesMap = {
    xxs: 12,
    xs: 14,
    s: 15,
    m: 32,
    l: 48,
};

interface IconProps {
    type: keyof typeof componentsMap;
    size: keyof typeof sizesMap | number;
    color?: string;
    stroke?: number;
    className?: string;
    noWrap?: boolean;

    onClick?: (e: React.MouseEvent) => void;
}

const StyledIcon = styled.span<{ onClick?: IconProps['onClick'] }>`
    ${({ onClick }) =>
        onClick &&
        `
            cursor: pointer;
        `}
`;

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
    ({ type, size, color = 'inherit', stroke = 1, className, onClick, noWrap }, ref) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Component: React.ComponentType<any> = componentsMap[type];
        const sizePx = `${typeof size === 'string' ? sizesMap[size] : size}px`;
        const content = (
            <Component
                width={sizePx}
                height={sizePx}
                color={color}
                strokeWidth={stroke}
                onClick={onClick}
                style={{
                    cursor: onClick ? 'pointer' : 'default',
                }}
            />
        );

        return (
            <Suspense fallback={'Loading...'}>
                {noWrap ? (
                    content
                ) : (
                    <StyledIcon ref={ref} className={className} style={{ lineHeight: 'initial' }} onClick={onClick}>
                        {content}
                    </StyledIcon>
                )}
            </Suspense>
        );
    },
);
