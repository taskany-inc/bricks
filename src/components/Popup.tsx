import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import { backgroundColor, colorPrimary, danger0, gapXs, gray3, gray4, radiusS, warn0 } from '@taskany/colors';
import Tippy from '@tippyjs/react/headless';

/**
 * @see all props https://atomiks.github.io/tippyjs/v6/all-props/
 */
interface PopupProps
    extends Omit<ComponentProps<typeof Tippy>, 'role' | 'content' | 'children' | 'offset' | 'ref'>,
        React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    target?: React.ReactElement;
    arrow?: boolean;
    overflow?: 'hidden';
    minWidth?: number;
    maxWidth?: number;
    tooltip?: boolean;
    view?: 'warning' | 'danger' | 'primary';
    offset?: number[];
    children: React.ReactNode;
}

const colorsMap = {
    primary: colorPrimary,
    danger: danger0,
    warning: warn0,
};

const StyledPopupArrow = styled.div`
    visibility: hidden;
    position: absolute;
    z-index: 0;

    width: 8px;
    height: 8px;

    background: inherit;

    &::before {
        visibility: visible;
        position: absolute;
        z-index: 0;

        width: 8px;
        height: 8px;

        background: inherit;

        content: '';

        transform: rotate(45deg);
    }
`;

const StyledPopupContent = styled.div`
    position: relative;
    z-index: 1;
`;

const StyledPopupContainer = styled.div<{
    overflow?: PopupProps['overflow'];
    minWidth?: PopupProps['minWidth'];
    maxWidth?: PopupProps['maxWidth'];
    tooltip?: PopupProps['tooltip'];
    view?: PopupProps['view'];
}>`
    position: relative;

    background: ${backgroundColor};

    border-radius: ${radiusS};

    ${({ tooltip }) =>
        tooltip &&
        `
            font-size: 14px;
            font-weight: 500;
        `}

    ${({ view }) =>
        view &&
        `
            background-color: ${colorsMap[view]};
        `}

    ${({ overflow }) =>
        overflow
            ? `
                  overflow: hidden;
              `
            : `
                  padding: ${gapXs};
              `}

    ${({ maxWidth }) =>
        maxWidth &&
        `
            max-width: ${maxWidth}px;
        `}

    ${({ minWidth }) =>
        minWidth &&
        `
            min-width: ${minWidth}px;
        `}

    &[data-placement^='top'] > ${StyledPopupArrow} {
        bottom: -4px;
    }

    &[data-placement^='top-start'] > ${StyledPopupArrow} {
        left: 4px;
    }

    &[data-placement^='bottom'] > ${StyledPopupArrow} {
        top: -4px;
    }

    &[data-placement^='left'] > ${StyledPopupArrow} {
        right: -4px;
    }

    &[data-placement^='right'] > ${StyledPopupArrow} {
        left: -4px;
    }

    &:before {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: linear-gradient(-45deg, ${gray3} 0%, ${gray4} 100%);
        transform: translate3d(0px, 5px, 0) scale(0.95);
        filter: blur(10px);
        opacity: var(0.7);
        transition: opacity 0.3s;
        border-radius: inherit;
    }

    &:after {
        content: '';
        z-index: -1;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: inherit;
        border-radius: inherit;
    }
`;

/**
 * @see https://github.com/atomiks/tippyjs-react
 * Styling https://popper.js.org/docs/v2/tutorial/#styling
 */
export const Popup: React.FC<PopupProps> = ({
    placement = 'auto',
    interactive,
    reference,
    children,
    target,
    arrow = true,
    offset,
    visible,
    onTrigger,
    onShow,
    onShown,
    onMount,
    onHide,
    onHidden,
    onClickOutside,
    hideOnClick,
    ...props
}) => (
    <Tippy
        onTrigger={onTrigger}
        onShow={onShow}
        onShown={onShown}
        onMount={onMount}
        onHide={onHide}
        onHidden={onHidden}
        onClickOutside={onClickOutside}
        hideOnClick={hideOnClick}
        reference={reference}
        interactive={interactive}
        placement={placement}
        visible={visible}
        render={(tippyProps) => (
            <StyledPopupContainer tabIndex={-1} {...tippyProps} {...props}>
                <StyledPopupContent>{children}</StyledPopupContent>

                {arrow && <StyledPopupArrow data-popper-arrow />}
            </StyledPopupContainer>
        )}
        popperOptions={{
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        // https://popper.js.org/docs/v2/tutorial/#offset
                        offset: offset || [-10, 8],
                    },
                },
            ],
        }}
    >
        {target}
    </Tippy>
);
