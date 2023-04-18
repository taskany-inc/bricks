import { createContext } from 'react';

interface FormRadioContextProps {
    name?: string;
    value?: string;

    onChange?: (v: string) => void;
}

export const radioContext = createContext<FormRadioContextProps>({
    name: undefined,
    value: undefined,
    onChange: undefined,
});
