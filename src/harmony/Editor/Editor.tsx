import React, { ComponentProps } from 'react';
import MonacoEditor from '@monaco-editor/react';
import cn from 'classnames';

import './Editor.css';

interface EditorProps extends ComponentProps<typeof MonacoEditor> {
    hasError?: boolean;
}

export const Editor: React.FC<EditorProps> = ({ className, hasError, ...props }) => {
    return <MonacoEditor className={cn('MonacoEditor', className, { MonacoEditorHasError: hasError })} {...props} />;
};
