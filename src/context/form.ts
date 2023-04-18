import { createContext } from 'react';

interface FormContextProps {
    disabled?: boolean;
}

export const formContext = createContext<FormContextProps>({ disabled: undefined });
