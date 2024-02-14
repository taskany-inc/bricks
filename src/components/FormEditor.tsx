/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Editor from '@monaco-editor/react';
import { danger10, gapS, gapXs, gray2, gray3, gray4, gray6, gray8, radiusS, textColor } from '@taskany/colors';
import { IconAttachOutline } from '@taskany/icons';

import { nullable } from '../utils/nullable';
import { useKeyboard, KeyCode } from '../hooks/useKeyboard';
import { useMounted } from '../hooks/useMounted';
import { useUpload } from '../hooks/useUpload';
import { formContext } from '../context/form';

import { Popup } from './Popup/Popup';
import { Link } from './Link/Link';

export { loader as editorLoader } from '@monaco-editor/react';

interface File {
    name: string;
    type: string;
    filePath: string;
}

interface FormEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onBlur' | 'onFocus'> {
    id?: string;
    name?: string;
    value?: string;
    autoFocus?: boolean;
    flat?: 'top' | 'bottom' | 'both';
    height?: number;
    placeholder?: string;
    disabled?: boolean;
    error?: {
        message?: string;
    };
    disableAttaches?: boolean;
    uploadLink?: string;

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
}

const defaultAttachmentsButtonMessage = 'Attach files';
const defaultAttachmentsDescriptionMesssage = "drag'n'drop or pasting also supported";
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

const StyledEditor = styled.div<{ flat: FormEditorProps['flat']; value: boolean; disabled: boolean }>`
    position: relative;
    box-sizing: border-box;

    outline: none;
    border: 0;
    border-radius: ${radiusS};

    background-color: ${gray3};

    ${({ flat }) =>
        flat === 'top' &&
        `
            border-top-left-radius: 0;
            border-top-right-radius: 0;
        `}

    ${({ flat }) =>
        flat === 'bottom' &&
        `
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `}

    ${({ flat }) =>
        flat === 'both' &&
        `
            border-radius: 0;
        `}

    .monaco-editor {
        background-color: ${gray3};

        color: ${textColor};

        transition: 100ms cubic-bezier(0.3, 0, 0.5, 1);
        transition-property: background-color, height;

        .monaco-editor-background,
        .margin,
        .inputarea.ime-input {
            background-color: ${gray3};

            transition: 150ms cubic-bezier(0.3, 0, 0.5, 1);
            transition-property: background-color, height;
        }

        .inputarea.ime-input,
        .mtk1 {
            color: ${textColor};
        }

        .view-overlays .current-line {
            border: 0;
        }

        .monaco-scrollable-element {
            margin-left: -10px;
            padding-left: 10px;

            & > .scrollbar > .slider {
                background-color: ${gray3};
            }
        }

        .lines-content {
            margin-top: 8px;
        }

        .decorationsOverviewRuler {
            visibility: hidden;
        }
    }

    .monaco-editor.focused {
        background-color: ${gray2};

        .monaco-editor-background,
        .margin,
        .inputarea.ime-input {
            background-color: ${gray2};
        }
    }

    ${({ value }) =>
        value &&
        `
            .monaco-editor {
                background-color: ${gray2};

                .monaco-editor-background,
                .margin,
                .inputarea.ime-input {
                    background-color: ${gray2};
                }
            }
        `}

    ${({ disabled }) =>
        disabled &&
        `
            pointer-events: none;
            cursor: not-allowed;

            .monaco-editor {
                color: ${gray8};

                .inputarea.ime-input,
                .mtk1 {
                    color: ${gray8};
                }
            }
        `}
`;

const StyledPlaceholder = styled.div`
    position: absolute;
    top: 5px;
    left: 16px;
    z-index: 100;

    pointer-events: none;

    font-size: ${defaultOptions.fontSize}px;
    color: ${gray6};
`;

const StyledErrorTrigger = styled.div`
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: ${danger10};
    top: 12px;
    left: -2px;
    z-index: 2;
`;

const StyledUploadButton = styled.div`
    padding: ${gapXs} ${gapS};

    border-top: 1px dashed ${gray4};

    color: ${gray6};
    font-size: 13px;

    cursor: pointer;
`;

const StyledUploadInput = styled.input`
    position: absolute;
    z-index: 90;
    width: 100%;

    opacity: 0;

    cursor: pointer;
`;

const StyledDropZone = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;

    opacity: 0;
`;

const StyledUploadLink = styled(Link)`
    position: relative;
    z-index: 100;

    text-decoration: none;

    margin-right: ${gapXs};
`;

const StyledUploadIcon = styled(IconAttachOutline)`
    padding-right: ${gapXs};
`;

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

export const FormEditor = React.forwardRef<HTMLDivElement, FormEditorProps>(
    (
        {
            id,
            value,
            flat,
            height = 200,
            placeholder,
            error,
            autoFocus,
            disabled: internalDisabled,
            onChange,
            onFocus,
            onBlur,
            onCancel,
            messages = {},
            disableAttaches,
            uploadLink,
            onUploadSuccess,
            onUploadFail,
            attachFormatter = defaultAttachFormatter,
            ...attrs
        },
        ref,
    ) => {
        const [focused, setFocused] = useState(false);
        const [contentHeight, setContentHeight] = useState(height);
        const monacoEditorRef = useRef<any>(null);
        const extraRef = useRef<HTMLDivElement>(null);
        const popupRef = useRef<HTMLDivElement>(null);
        const [viewValue, setViewValue] = useState<string | undefined>('');
        const [popupVisible, setPopupVisibility] = useState(false);
        const mounted = useMounted();
        const { loading, files, uploadFiles } = useUpload(onUploadSuccess, onUploadFail, uploadLink);
        // @ts-ignore
        const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop: uploadFiles });
        const formCtx = useContext(formContext);
        const disabled = formCtx.disabled || internalDisabled;

        const handleEditorDidMount = (editor: any /* IStandaloneEditor */) => {
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
            error && setPopupVisibility(true);
            onFocus?.();
        }, [onFocus, error]);

        const onEditorBlur = useCallback(() => {
            setFocused(false);
            error && setPopupVisibility(false);
            onBlur?.();
        }, [onBlur, error]);

        const [onESC] = useKeyboard([KeyCode.Escape], () => {
            onEditorBlur();

            extraRef.current?.focus();
            extraRef.current?.blur();

            onCancel?.();
        });

        const onPopupClickOutside = useCallback(() => setPopupVisibility(false), [setPopupVisibility]);

        const onEditorClickOutside = useCallback(
            (e: MouseEvent) => {
                // @ts-ignore
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
            (e: React.MouseEvent<HTMLAnchorElement>) => {
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

        return (
            <div tabIndex={0} ref={extraRef} style={{ outline: 'none' }} onPaste={onEditorPaste}>
                <StyledEditor
                    {...getRootProps()}
                    value={Boolean(viewValue)}
                    disabled={disabled}
                    tabIndex={-1}
                    id={id}
                    flat={flat}
                    ref={ref}
                    {...onESC}
                    onClick={disabled ? undefined : () => {}}
                    {...attrs}
                >
                    {nullable(isDragActive && !disableAttaches, () => (
                        <StyledDropZone>
                            <input {...uploadInputProps} />
                        </StyledDropZone>
                    ))}

                    {nullable(error, (err) => (
                        <>
                            <StyledErrorTrigger
                                ref={popupRef}
                                onMouseEnter={() => setPopupVisibility(true)}
                                onMouseLeave={() => setPopupVisibility(false)}
                            />
                            <Popup
                                tooltip
                                view="danger"
                                placement="top-start"
                                visible={popupVisible}
                                onClickOutside={onPopupClickOutside}
                                reference={popupRef}
                            >
                                {err.message}
                            </Popup>
                        </>
                    ))}

                    {nullable(!focused && !value && placeholder, () => (
                        <StyledPlaceholder>{placeholder}</StyledPlaceholder>
                    ))}

                    <div
                        onFocus={onEditorFocus}
                        style={{
                            height: contentHeight,
                            minHeight: height,
                            maxHeight: maxEditorHeight,
                            paddingBottom: '24px', // upload message height
                        }}
                    >
                        <Editor
                            loading=""
                            theme="vs-dark"
                            defaultLanguage="markdown"
                            value={viewValue}
                            options={defaultOptions}
                            onChange={onChange}
                            onMount={handleEditorDidMount}
                        />

                        {nullable(focused && !disableAttaches, () => (
                            <StyledUploadButton>
                                <StyledUploadInput onChange={onFileInputChange} type="file" multiple />

                                {loading ? (
                                    messages?.attachmentsUploading || defaultAttachmentsUploadingMessage
                                ) : (
                                    <>
                                        <StyledUploadLink onClick={onUploadLinkClick}>
                                            <StyledUploadIcon size="xs" />
                                            {messages?.attachmentsButton || defaultAttachmentsButtonMessage}
                                        </StyledUploadLink>
                                        {messages?.attachmentsDescription || defaultAttachmentsDescriptionMesssage}
                                    </>
                                )}
                            </StyledUploadButton>
                        ))}
                    </div>
                </StyledEditor>
            </div>
        );
    },
);
