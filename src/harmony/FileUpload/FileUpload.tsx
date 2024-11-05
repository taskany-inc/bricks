import React, { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import { IconFileTickOutline, IconFileXOutline, IconXCircleOutline } from '@taskany/icons';
import cn from 'classnames';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';
import { Badge } from '../Badge/Badge';
import { useUpload } from '../../hooks/useUpload';
import { Spinner } from '../Spinner/Spinner';
import { Tooltip } from '../Tooltip/Tooltip';

import styles from './FileUpload.module.css';

interface FileStatus {
    file: { type: string; filePath: string; name: string };
    state: 'accepted' | 'failed';
}

interface FileNameBadgeProps {
    fullName: string;
    errorMessage: string;
    onClick: () => void;
    state: FileStatus['state'];
}

interface FileUploadProps extends Omit<DropzoneOptions, 'onDropAccepted' | 'onDropRejected'> {
    translates: {
        idle: string;
        active: string;
        loading: string;
        accepted: string;
        error: string;
        fileExtensionsText: string;
    };
    id?: string;
    forwardedRef?: React.MutableRefObject<HTMLDivElement | null>;
    onChange?: (fileList: FileStatus['file'][]) => void;
    onUploadSuccess?: () => void;
    onUploadFail?: (message?: string, list?: Array<FileStatus['file']>) => void;
    uploadLink?: string;
    isError?: boolean;
}

interface FileUploadTextContentProps {
    state: 'loading' | 'drop' | 'idle';
    translates: FileUploadProps['translates'];
}

const viewedFileNameLen = 40;

const formatFileName = (fileName: string): string => {
    if (fileName.length <= viewedFileNameLen) {
        return fileName;
    }

    const extension = fileName.split('.').at(-1);

    if (!extension) {
        return fileName.slice(0, viewedFileNameLen);
    }

    const leftFileNameLen = viewedFileNameLen - extension.length - 1; // include dot symbol before extencios
    const onlyName = fileName.replace(`.${extension}`, '');

    const firstPart = onlyName.slice(0, Math.floor(leftFileNameLen / 3));
    const lastPart = onlyName.slice(Math.floor(leftFileNameLen / 3) * -1);

    return `${firstPart}...${lastPart}.${extension}`;
};

const FileUploadTextContent: React.FC<FileUploadTextContentProps> = ({ state, translates }) => {
    switch (state) {
        case 'loading':
            return <Badge as="div" iconLeft={<Spinner size="s" />} text={translates.loading} />;
        case 'drop':
            return (
                <Text as="div" size="m" weight="thin" className={styles.FileUpload_DropzoneText}>
                    {translates.active}
                </Text>
            );
        default:
            return (
                <Text as="div" size="m" weight="thin" className={styles.FileUpload_DropzoneText}>
                    {translates.idle}
                </Text>
            );
    }
};

const FileNameBadge: React.FC<FileNameBadgeProps> = ({ fullName, onClick, state, errorMessage }) => {
    const nodeRef = useRef<HTMLElement>(null);
    const isFailed = state !== 'accepted';

    const IconFile = isFailed ? IconFileXOutline : IconFileTickOutline;
    const visibleName = formatFileName(fullName);

    return (
        <>
            <Badge
                className={cn({ [styles.FileUpload_File_error]: state === 'failed' })}
                ref={nodeRef}
                action={isFailed ? 'static' : 'dynamic'}
                iconLeft={<IconFile size="s" />}
                iconRight={<IconXCircleOutline size="s" onClick={onClick} />}
                text={formatFileName(fullName)}
                weight="regular"
            />
            {nullable(visibleName !== fullName || isFailed, () => (
                <Tooltip placement="top" reference={nodeRef} maxWidth={300} view={isFailed ? 'danger' : 'primary'}>
                    <Text size="s" wordBreak="break-word" wordWrap="break-word">
                        {nullable(isFailed, () => errorMessage, fullName)}
                    </Text>
                </Tooltip>
            ))}
        </>
    );
};

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
    ({ translates, onChange, onUploadFail, onUploadSuccess, onDrop, uploadLink, forwardedRef, id, ...props }, ref) => {
        const [uploadedFiles, setUploadedFiles] = useState<FileStatus[]>([]);

        const handleFailFiles = useCallback((message?: string, rejectionList?: FileStatus['file'][]) => {
            onUploadFail?.(message, rejectionList);

            setUploadedFiles((prev) => {
                if (!rejectionList) {
                    return prev;
                }

                const res = prev.concat(rejectionList.map((file) => ({ file, state: 'failed' })));

                const uniqueMap = new Map();

                for (const value of res) {
                    const it = uniqueMap.get(value.file.name);

                    if (it == null) {
                        uniqueMap.set(value.file.name, value);
                    }
                }

                return Array.from(uniqueMap.values());
            });
        }, []);

        const { loading, files, uploadFiles } = useUpload(onUploadSuccess, handleFailFiles, uploadLink);
        const { isDragActive, getInputProps, getRootProps, fileRejections } = useDropzone({
            ...props,
            onDrop: (accepted, rejected, event) => {
                onDrop?.(accepted, rejected, event);
                uploadFiles(accepted);
            },
        });

        const handleRemove = useCallback((file: (typeof uploadedFiles)[number]) => {
            setUploadedFiles((prev) => prev.filter((f) => f !== file));
        }, []);

        useEffect(() => {
            if (fileRejections.length) {
                const { message = translates.error } = fileRejections[0].errors[0];
                handleFailFiles(
                    message,
                    fileRejections.map(({ file }: { file: File & { path?: string } }) => ({
                        type: file.type,
                        filePath: file.path || '',
                        name: file.name,
                    })),
                );
            }
        }, [fileRejections, handleFailFiles, translates]);

        useEffect(() => {
            setUploadedFiles((prev) => {
                if (!files) {
                    return prev;
                }

                const res = prev.concat(files.map((file) => ({ file, state: 'accepted' })));

                const uniqueMap = new Map();

                for (const value of res) {
                    const it = uniqueMap.get(value.file.name);

                    if (it == null) {
                        uniqueMap.set(value.file.name, value);
                    }
                }

                return Array.from(uniqueMap.values());
            });
        }, [files]);

        useEffect(() => {
            if (uploadFiles.length > 0) {
                onChange?.(uploadedFiles.filter((v) => v.state === 'accepted').map(({ file }) => file));
            }
        }, [uploadedFiles, onChange]);

        const textNodeState: FileUploadTextContentProps['state'] = useMemo(() => {
            switch (true) {
                case loading:
                    return 'loading';
                case isDragActive:
                    return 'drop';
                default:
                    return 'idle';
            }
        }, [loading, isDragActive]);

        return (
            <div className={styles.FileUpload}>
                <div
                    {...getRootProps()}
                    className={cn(styles.FileUpload_Dropzone, {
                        [styles.FileUpload_Dropzone_disabled]: props.disabled,
                        [styles.FileUpload_Dropzone_error]: props.isError,
                    })}
                    ref={forwardedRef}
                >
                    <input {...getInputProps()} id={id} ref={ref} />
                    <FileUploadTextContent state={textNodeState} translates={translates} />
                    {nullable(props.accept, () => (
                        <Text className={styles.FileUpload_DropzoneText} size="xs" weight="thin" as="div">
                            {translates.fileExtensionsText}
                        </Text>
                    ))}
                </div>

                {nullable(uploadedFiles, (fileList) => (
                    <div>
                        {fileList.map((file) => (
                            <FileNameBadge
                                fullName={file.file.name}
                                state={file.state}
                                errorMessage={translates.error}
                                onClick={() => handleRemove(file)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        );
    },
);
