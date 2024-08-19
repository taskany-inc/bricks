import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, ComponentProps } from 'react';
import { useDropzone } from 'react-dropzone';
import { IconAttachOutline } from '@taskany/icons';
import cn from 'classnames';

import { nullable } from '../../utils/nullable';
import { useKeyboard, KeyCode } from '../../hooks/useKeyboard';
import { useMounted } from '../../hooks/useMounted';
import { useUpload } from '../../hooks/useUpload';
import { formContext } from '../../context/form';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Editor } from '../Editor/Editor';

import s from './FormEditor.module.css';

export { loader as editorLoader } from '@monaco-editor/react';

const brickMap = {
    top: s.FormEditorWrapper_brick_top,
    bottom: s.FormEditorWrapper_brick_bottom,
    center: s.FormEditorWrapper_brick_center,
};

interface File {
    name: string;
    type: string;
    filePath: string;
}
type OnMountCallback = ComponentProps<typeof Editor>['onMount'];

interface FormEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur' | 'onFocus'> {
    id?: string;
    name?: string;
    value?: string;
    outline?: boolean;
    autoFocus?: boolean;
    brick?: keyof typeof brickMap;
    height?: number;
    placeholder?: string;
    disabled?: boolean;
    disableAttaches?: boolean;
    uploadLink?: string;
    view?: 'danger';

    messages?: {
        attachmentsButton: string;
        attachmentsDescription: string;
        attachmentsUploading?: string;
    };

    onChange?: (value: string | undefined) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onCancel?: () => void;
    onUploadSuccess?: () => void;
    onUploadFail?: (message?: string) => void;
    attachFormatter?: (files: File[]) => string;
    options?: React.ComponentProps<typeof Editor>['options'];
    onMount?: OnMountCallback;
}

const defaultAttachmentsButtonMessage = 'Attach files';
const defaultAttachmentsDescriptionMessage = "drag'n'drop or pasting also supported";
const defaultAttachmentsUploadingMessage = 'Uploading...';

const defaultOptions: React.ComponentProps<typeof Editor>['options'] = {
    fontSize: 16,
    wordWrap: 'on',
    minimap: {
        enabled: false,
    },
    lineNumbers: 'off',
    unicodeHighlight: {
        allowedLocales: {
            en: true,
            ru: true,
        },
    },
    overviewRulerBorder: false,
    scrollBeyondLastLine: false,
    scrollbar: { alwaysConsumeMouseWheel: false },
};

const fileToMD = (file: File) => {
    switch (true) {
        case file.type.includes('image/'):
            return `![](${file.filePath})`;
        default:
            return `[${file.name}](${file.filePath})`;
    }
};

const defaultAttachFormatter = (files: File[]) => {
    return files.map(fileToMD).join('\n');
};

const maxEditorHeight = 450;

const monacoWrapperProps = { className: s.MonacoWrapper };

const formEditorWrapperStyles: Record<string, string> = {
    '--form-editor-buttons-height': '36px',
};

export const FormEditor = React.forwardRef<HTMLDivElement, FormEditorProps>(
    (
        {
            id,
            value,
            brick,
            outline,
            height = 120,
            placeholder,
            autoFocus,
            disabled: internalDisabled,
            onChange,
            onFocus,
            onBlur,
            onCancel,
            messages,
            disableAttaches,
            uploadLink,
            onUploadSuccess,
            onUploadFail,
            attachFormatter = defaultAttachFormatter,
            className,
            onMount,
            view,
            options,
            ...attrs
        },
        ref,
    ) => {
        const [focused, setFocused] = useState(false);
        const [contentHeight, setContentHeight] = useState(height);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const monacoEditorRef = useRef<any>(null);
        const extraRef = useRef<HTMLDivElement>(null);
        const [viewValue, setViewValue] = useState<string | undefined>('');
        const mounted = useMounted();
        const { loading, files, uploadFiles } = useUpload(onUploadSuccess, onUploadFail, uploadLink);

        const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop: uploadFiles });
        const formCtx = useContext(formContext);
        const disabled = formCtx.disabled || internalDisabled;

        const handleEditorDidMount: OnMountCallback = (editor, monaco) => {
            monacoEditorRef.current = editor;

            if (autoFocus) {
                if (viewValue !== value) {
                    editor.trigger('keyboard', 'type', { text: value });
                }
            }

            editor.onDidContentSizeChange(() => {
                const calculatedHeight = Math.min(1000, editor.getContentHeight()) + 20;
                const nextContentHeight = calculatedHeight > maxEditorHeight ? maxEditorHeight : calculatedHeight;
                setContentHeight(nextContentHeight);
                editor.layout();
            });

            setViewValue(value);

            onMount?.(editor, monaco);
        };

        useEffect(() => {
            if (mounted && viewValue !== value) setViewValue(value);
        }, [value, viewValue, mounted]);

        useEffect(() => {
            if (autoFocus) {
                monacoEditorRef.current?.focus();
                setFocused(true);
                onFocus?.();
                monacoEditorRef.current?.setPosition(monacoEditorRef.current?.getPosition());
            }
        }, [autoFocus, onFocus, viewValue, value]);

        const onEditorFocus = useCallback(() => {
            setFocused(true);
            onFocus?.();
        }, [onFocus]);

        const onEditorBlur = useCallback(() => {
            setFocused(false);
            onBlur?.();
        }, [onBlur]);

        const [onESC] = useKeyboard([KeyCode.Escape], () => {
            onEditorBlur();

            extraRef.current?.focus();
            extraRef.current?.blur();

            onCancel?.();
        });

        const onEditorClickOutside = useCallback(
            (e: MouseEvent) => {
                if (!(e.target instanceof Node)) return;
                if (extraRef.current && !extraRef.current.contains(e.target)) {
                    onEditorBlur();
                }
            },
            [onEditorBlur],
        );

        useEffect(() => {
            document.addEventListener('click', onEditorClickOutside, true);

            return () => {
                document.removeEventListener('click', onEditorClickOutside, true);
            };
        }, [onEditorClickOutside]);

        useEffect(() => {
            if (!files) return;

            const p = monacoEditorRef.current.getPosition();
            monacoEditorRef.current.executeEdits('', [
                {
                    range: {
                        startLineNumber: p.lineNumber,
                        startColumn: p.column,
                        endLineNumber: p.lineNumber,
                        endColumn: p.column,
                    },
                    text: attachFormatter(files),
                },
            ]);
        }, [files, attachFormatter]);

        const onEditorPaste = useCallback(
            (e: React.ClipboardEvent<HTMLDivElement>) => {
                if (!e.clipboardData.files.length) return;

                uploadFiles(Array.from(e.clipboardData.files));
            },
            [uploadFiles],
        );

        const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            await uploadFiles(Array.from(e.target.files));
        };

        const uploadInputProps = getInputProps();

        const onUploadLinkClick = useCallback(
            (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                open();
            },
            [open],
        );

        useEffect(() => {
            if (!disabled) return;
            onEditorBlur();

            extraRef.current?.focus();
            extraRef.current?.blur();
            return () => {
                monacoEditorRef.current?.focus();
            };
        }, [disabled]);

        const editorContentStyles = useMemo(() => {
            return {
                height: contentHeight,
                minHeight: height,
                maxHeight: maxEditorHeight,
            };
        }, [height, contentHeight]);

        const editorOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);

        return (
            <div
                tabIndex={0}
                ref={extraRef}
                onPaste={onEditorPaste}
                className={cn(
                    s.FormEditorWrapper,
                    { [s.FormEditorWrapper_view_danger]: view === 'danger' },
                    { [s.FormEditor_focused]: focused && !outline },
                    brick ? brickMap[brick] : '',
                )}
                style={formEditorWrapperStyles}
            >
                <div
                    {...getRootProps()}
                    tabIndex={-1}
                    id={id}
                    ref={ref}
                    {...onESC}
                    onClick={disabled ? undefined : () => {}}
                    {...attrs}
                    className={cn({ [s.FormEditor_disabled]: disabled }, { [s.FormEditor_filled]: value }, className)}
                >
                    {nullable(isDragActive && !disableAttaches, () => (
                        <div className={s.UploadInput}>
                            <input {...uploadInputProps} />
                        </div>
                    ))}

                    {nullable(!focused && !value && placeholder, () => (
                        <Text className={s.FormEditorPlaceholder} size="s" as="span">
                            {placeholder}
                        </Text>
                    ))}

                    <div
                        onFocus={onEditorFocus}
                        style={editorContentStyles}
                        className={cn(
                            s.EditorBackground,
                            { [s.FormEditor_outlined]: outline },
                            { [s.FormEditor_focused]: focused && outline },
                        )}
                    >
                        <div className={cn(s.PaddingWrapper, { [s.PaddingWrapper_view_danger]: view === 'danger' })}>
                            <Editor
                                loading=""
                                theme="vs-dark"
                                defaultLanguage="markdown"
                                value={viewValue}
                                options={editorOptions}
                                onChange={onChange}
                                onMount={handleEditorDidMount}
                                className={cn(s.MonacoEditor)}
                                wrapperProps={monacoWrapperProps}
                            />
                        </div>
                    </div>
                    {nullable(focused && !disableAttaches, () => (
                        <div className={s.UploadButton}>
                            <input className={s.UploadInput} onChange={onFileInputChange} type="file" multiple />

                            {nullable(
                                loading,
                                () => (
                                    <Text as="span" size="s" className={s.LoadingMessage}>
                                        {messages?.attachmentsUploading || defaultAttachmentsUploadingMessage}
                                    </Text>
                                ),
                                <>
                                    <Button
                                        size="xs"
                                        view="ghost"
                                        text={messages?.attachmentsButton || defaultAttachmentsButtonMessage}
                                        iconLeft={<IconAttachOutline size="xs" />}
                                        onClick={onUploadLinkClick}
                                    />
                                    <Text as="span" size="s" className={s.AttachmentDescriptionMessage}>
                                        {messages?.attachmentsDescription || defaultAttachmentsDescriptionMessage}
                                    </Text>
                                </>,
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    },
);
