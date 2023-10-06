import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';

import { KeyCode, useKeyboard } from '../../hooks/useKeyboard';
import { useClickOutside } from '../../hooks/useClickOutside';
import { nullable } from '../../utils';
import { Form } from '../Form';

interface InlineFormProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;

    renderTrigger?: (props: { onClick: () => void }) => React.ReactNode;
    onSubmit: () => Promise<void>;
    onReset: () => void;
}

const StyledWrapper = styled.div`
    display: contents;
`;

export const InlineForm: React.FC<InlineFormProps> = ({ renderTrigger, onSubmit, onReset, children, ...attrs }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [visible, toggleVisible] = useReducer((state) => !state, !renderTrigger);

    const [onESC] = useKeyboard(
        [KeyCode.Escape],
        () => {
            if (visible) {
                toggleVisible();
            }
        },
        {
            capture: true,
        },
    );

    useClickOutside(wrapperRef, () => {
        if (visible) {
            toggleVisible();
        }
    });

    const handleSubmit = useCallback(async () => {
        await onSubmit();
        toggleVisible();
        onReset();
    }, [onSubmit, onReset]);

    useEffect(() => {
        if (!visible) {
            onReset();
        }
    }, [visible, onReset]);

    return (
        <StyledWrapper ref={wrapperRef} {...onESC} {...attrs}>
            {nullable(!visible && renderTrigger, (render) => render({ onClick: toggleVisible }))}
            {nullable(visible, () => (
                <Form onSubmit={handleSubmit}>{children}</Form>
            ))}
        </StyledWrapper>
    );
};
