import React, { ComponentProps } from 'react';
import MonacoEditor from '@monaco-editor/react';
import cn from 'classnames';

import './Editor.css';

export const Editor = ({ className, ...props }: ComponentProps<typeof MonacoEditor>) => {
    return <MonacoEditor className={cn('MonacoEditor', className)} {...props} />;
};
