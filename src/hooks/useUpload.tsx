import { useState } from 'react';

import { formFieldName } from '../utils/upload';

interface FileData {
    type: string;
    filePath: string;
    name: string;
}

export const useUpload = (
    onSuccess?: () => void,
    onFail?: (message?: string, rejectionFiles?: FileData[]) => void,
    uploadLink?: string,
) => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<FileData[]>();

    const uploadFiles = async (files: (File & { path?: string })[]) => {
        if (!uploadLink) return;

        setLoading(true);

        const body = new FormData();
        files.forEach((f) => body.append(formFieldName, f));

        await fetch(uploadLink, {
            method: 'POST',
            body,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(new Error(`${res.status} ${res.statusText}`));
            })
            .then(
                (res) => {
                    if (res.succeeded.length > 0) {
                        onSuccess && onSuccess();
                        setFiles(res.succeeded);
                    }

                    res.failed.length > 0 &&
                        onFail &&
                        onFail(
                            `Failed to load files ${res.failed.map(({ name }: { name: string }) => name).join(', ')}: ${
                                res.errorMessage
                            }`,
                            res.failed,
                        );
                },
                (err) => {
                    onFail &&
                        onFail(
                            err.message,
                            files.map((f) => ({
                                filePath: f.path != null ? f.path : '',
                                name: f.name,
                                type: f.type,
                            })),
                        );
                },
            )
            .finally(() => setLoading(false));
    };
    return {
        files,
        loading,
        uploadFiles,
    };
};
