import { useState } from 'react';

import { formFieldName } from '../utils/upload';

export const useUpload = (onSuccess?: () => void, onFail?: (message?: string) => void, uploadLink = '/api/upload') => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<{ type: string; filePath: string; name: string }[]>();

    const uploadFiles = async (files: File[]) => {
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
            .then((res) => {
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
                    );
            })
            .catch((err) => {
                onFail && onFail(err.message);
            })
            .finally(() => setLoading(false));
    };
    return {
        files,
        loading,
        uploadFiles,
    };
};
