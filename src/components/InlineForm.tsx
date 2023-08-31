import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import styled from 'styled-components';

import { KeyCode, useKeyboard } from '../hooks/useKeyboard';
import { useClickOutside } from '../hooks/useClickOutside';
import { nullable } from '../utils';

import { Form } from './Form';

interface RenderTriggerProps {
    onClick: () => void;
}

interface InlineFormProps {
    renderTrigger: (props: RenderTriggerProps) => React.ReactNode;
    onSubmit: () => Promise<void>;
    children: React.ReactNode;
    onReset: () => void;
    className?: string;
}

const StyledForm = styled(Form)`
    background-color: transparent;
`;

const StyledWrapper = styled.div`
    display: contents;
}
`;

export const InlineForm: React.FC<InlineFormProps> = ({ renderTrigger, onSubmit, onReset, children, className }) => {
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
        <StyledWrapper ref={wrapperRef} className={className} {...onESC}>
            {nullable(!visible, () => renderTrigger({ onClick: toggleVisible }))}
            {nullable(visible, () => (
                <StyledForm onSubmit={handleSubmit}>{children}</StyledForm>
            ))}
        </StyledWrapper>
    );
};
