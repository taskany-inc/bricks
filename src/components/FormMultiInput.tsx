import React, { useCallback, useState, ChangeEvent, useEffect, useContext, ReactNode } from 'react';
import styled from 'styled-components';
import { gapS, gray3, gray8, radiusS, textColor } from '@taskany/colors';
import { IconPlusCircleOutline } from '@taskany/icons';

import { nullable } from '../utils/nullable';
import { formContext } from '../context/form';

import { Text } from './Text/Text';
import { Tag, TagCleanButton } from './Tag/Tag';
import { MenuItem } from './MenuItem';
import { ComboBox } from './ComboBox/ComboBox';

interface Item {
    title: string;
    id: any;
}

type ComboBoxInputProps = Parameters<React.ComponentProps<typeof ComboBox>['renderInput']>['0'];
interface FormMultiInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onInput' | 'onClick'> {
    items?: Item[];
    id?: string;
    name?: string;
    label?: string;
    query?: string;
    value?: Item[];
    disabled?: boolean;
    className?: string;

    onChange?: (value: Item[]) => void;
    onInput?: (query: string) => void;
    renderItem?: (item: Item & { onClick: () => void }) => React.ReactNode;
    renderTrigger?: React.ComponentProps<typeof ComboBox>['renderTrigger'];
    renderInput: (props: ComboBoxInputProps & { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => ReactNode;
}

const StyledFormInputContainer = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;

    border-radius: ${radiusS};

    background-color: ${gray3};
    color: ${textColor};
    font-weight: 600;
    font-size: 22px;
    width: 100%;
`;

const StyledLabel = styled(Text)`
    padding: 8px 8px 8px 16px;

    background-color: transparent;
`;

const StyledComboBox = styled(ComboBox)`
    margin-left: ${gapS};
`;

export const FormMultiInput = React.forwardRef<HTMLDivElement, FormMultiInputProps>(
    (
        {
            name,
            id,
            items,
            label,
            value = [],
            query = '',
            disabled: internalDisabled,
            onChange,
            onInput,
            renderItem = (item) => (
                <Tag key={item.id}>
                    <TagCleanButton onClick={item.onClick} />
                    {item.title}
                </Tag>
            ),
            renderTrigger = (props) => <IconPlusCircleOutline size="xs" onClick={props.onClick} />,
            renderInput,
            ...props
        },
        ref,
    ) => {
        const [completionVisible, setCompletionVisibility] = useState(false);
        const [inputState, setInputState] = useState(query);
        const formCtx = useContext(formContext);
        const disabled = formCtx.disabled || internalDisabled;

        useEffect(() => {
            onInput?.(inputState);
        }, [inputState, onInput]);

        const onValueDelete = useCallback(
            (deleted: Item) => () => {
                onChange?.(value.filter((item) => item.id !== deleted.id));
            },
            [onChange, value],
        );

        const onValueAdd = useCallback(
            (added: Item) => {
                onChange?.([...value, added]);
            },
            [onChange, value],
        );

        return (
            <StyledFormInputContainer {...props}>
                {nullable(label, (l) => (
                    <StyledLabel as="label" htmlFor={id || name} size="m" color={gray8} weight="bold">
                        {l}:
                    </StyledLabel>
                ))}

                {value.map((item) => renderItem({ ...item, onClick: onValueDelete(item) }))}

                <StyledComboBox
                    ref={ref}
                    value={inputState}
                    visible={completionVisible}
                    disabled={disabled}
                    onChange={onValueAdd}
                    items={items}
                    renderTrigger={renderTrigger}
                    renderInput={(props) =>
                        renderInput({
                            onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                setInputState(e.currentTarget.value);
                                setCompletionVisibility(true);
                            },
                            ...props,
                        })
                    }
                    renderItem={(props) => (
                        <MenuItem
                            ghost
                            key={props.item.id}
                            focused={props.cursor === props.index}
                            onClick={props.onClick}
                        >
                            {props.item.title}
                        </MenuItem>
                    )}
                />
            </StyledFormInputContainer>
        );
    },
);
