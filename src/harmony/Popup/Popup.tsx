import React, { ComponentProps, useMemo } from 'react';
import Tippy from '@tippyjs/react/headless';
import cn from 'classnames';

import { nullable } from '../../utils';

import s from './Popup.module.css';

/**
 * @see all props https://atomiks.github.io/tippyjs/v6/all-props/
 */
interface PopupProps
    extends Omit<ComponentProps<typeof Tippy>, 'role' | 'content' | 'children' | 'offset' | 'ref'>,
        React.HTMLAttributes<HTMLDivElement> {
    visible?: boolean;
    target?: React.ReactElement;
    arrow?: boolean;
    minWidth?: number;
    maxWidth?: number;
    maxHeight?: number;
    offset?: number[];
    children?: React.ReactNode;
}

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
    minWidth,
    maxWidth,
    className,
    ...props
}) => {
    const popperOptions = useMemo(
        () => ({
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        // https://popper.js.org/docs/v2/tutorial/#offset
                        offset: offset || [-10, 8],
                    },
                },
            ],
        }),
        [offset],
    );

    const [popupStyles, popupContentStyles] = useMemo(() => {
        return [{ minWidth, maxWidth }, { maxWidth }];
    }, [minWidth, maxWidth]);

    return (
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
                <div className={cn(s.Popup, className)} tabIndex={-1} style={popupStyles} {...tippyProps} {...props}>
                    <div className={s.PopupContent} style={popupContentStyles}>
                        {children}
                    </div>

                    {nullable(arrow, () => (
                        <div className={s.PopupArrow} data-popper-arrow />
                    ))}
                </div>
            )}
            popperOptions={popperOptions}
        >
            {target}
        </Tippy>
    );
};
