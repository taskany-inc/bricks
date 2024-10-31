import React, {
    ComponentProps,
    ComponentPropsWithoutRef,
    HTMLAttributes,
    MutableRefObject,
    PropsWithChildren,
    ReactNode,
    createContext,
    forwardRef,
    useCallback,
    useContext,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react';
import { IconExclamationCircleSolid } from '@taskany/icons';
import classNames from 'classnames';

import { Input } from '../Input/Input';
import { Text } from '../Text/Text';
import { nullable, setRefs } from '../../utils';
import { Tooltip } from '../Tooltip/Tooltip';
import { FormEditor } from '../FormEditor/FormEditor';
import { FileUpload } from '../FileUpload/FileUpload';

import classes from './FormControl.module.css';

interface FormControlContext {
    id?: string;
    error?: {
        message?: ReactNode;
    };
    popupRef: MutableRefObject<HTMLDivElement | null>;
    required?: boolean;
    handleError: (error: { message?: ReactNode } | undefined) => void;
}

const FormControlContext = createContext<FormControlContext | void>(undefined);

const useFormControlContext = () => {
    const formContext = useContext(FormControlContext);

    if (!formContext) {
        throw new Error("Don't use before initialization or outside of `FormControl` component");
    }

    return formContext;
};

interface FormControlProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    required?: boolean;
}

export const FormControl = ({ children, required, ...props }: FormControlProps) => {
    const [error, setError] = useState<{ message?: ReactNode } | undefined>();
    const popupRef = useRef<HTMLDivElement | null>(null);
    const id = useId();

    const handleError = useCallback((error: { message?: ReactNode } | undefined) => {
        setError(error);
    }, []);

    const ctx = useMemo(
        () => ({ id, error, popupRef, handleError, required }),
        [id, error, popupRef, handleError, required],
    );

    return (
        <FormControlContext.Provider value={ctx}>
            <div {...props}>{children}</div>
        </FormControlContext.Provider>
    );
};

interface FormControlInputProps extends ComponentProps<typeof Input> {}

export const FormControlInput = forwardRef<HTMLInputElement, FormControlInputProps>(({ size = 's', ...props }, ref) => {
    const { id, error, popupRef } = useFormControlContext();

    return (
        <Input
            id={id}
            view={error ? 'danger' : 'default'}
            ref={ref}
            size={size}
            forwardedRef={popupRef}
            iconRight={error && <IconExclamationCircleSolid size={size === 'm' ? 's' : size} />}
            pointerEvents="none"
            {...props}
        />
    );
});

interface FormControlEditorProps extends ComponentProps<typeof FormEditor> {}

export const FormControlEditor = forwardRef<HTMLDivElement, FormControlEditorProps>(({ ...props }, ref) => {
    const { id, error, popupRef } = useFormControlContext();

    return <FormEditor id={id} view={error && 'danger'} ref={setRefs(popupRef, ref)} {...props} />;
});

interface FormControlLabelProps extends Omit<ComponentProps<typeof Text>, 'as' | 'weight' | 'view' | 'size'> {}

export const FormControlLabel = ({ ...props }: FormControlLabelProps) => {
    const { id, required } = useFormControlContext();
    return (
        <Text
            htmlFor={id}
            as="label"
            weight="normal"
            size="sm"
            className={classNames(classes.FormControlLabel, { [classes.FormControlLabelRequired]: required })}
            {...props}
        />
    );
};

interface FormControlErrorProps extends ComponentProps<typeof Tooltip> {
    error?: NonNullable<FormControlContext['error']>;
}

export const FormControlError = ({ children, error, placement = 'bottom', ...props }: FormControlErrorProps) => {
    const { popupRef, handleError } = useFormControlContext();

    useEffect(() => {
        if (error) {
            handleError(error);
        } else {
            handleError({ message: children });
        }

        return () => {
            handleError(undefined);
        };
    }, [children, error, handleError]);

    if (error && children) {
        throw new Error("FormControlError: Both 'error' and 'children' props are provided. Only one should be used.");
    }

    return (
        <Tooltip view="danger" reference={popupRef} interactive placement={placement} {...props}>
            {nullable(error, ({ message }) => message, children)}
        </Tooltip>
    );
};

interface FormControlFileUploadProps extends ComponentPropsWithoutRef<typeof FileUpload> {}

export const FormControlFileUpload = forwardRef<HTMLInputElement, FormControlFileUploadProps>((props, ref) => {
    const { id, error, popupRef } = useFormControlContext();
    const hasError = error != null && error.message != null;

    return <FileUpload {...props} id={id} isError={hasError} forwardedRef={popupRef} ref={ref} />;
});
