import { useState } from 'react';

import { formFieldName } from '../utils/upload';

export const useUpload = (onSuccess?: () => void, onFail?: (message?: string) => void, uploadLink = '/api/upload') => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState<{ type: string; filePath: string; name: string }[]>();

    const uploadFiles = async (files: FileList) => {
        setLoading(true);

        const body = new FormData();
        Array.from(files).forEach((f) => body.append(formFieldName, f));

        const response = await fetch(uploadLink, {
            method: 'POST',
            body,
        });

        setLoading(false);

        const res = await response.json();
        if (res.succeeded.length > 0) {
            onSuccess && onSuccess();
            setFiles(res.succeeded);
        }

        res.failed.length > 0 && onFail && onFail(`Failed to load files ${res.failed.join(', ')}: ${res.errorMessage}`);
    };
    return {
        files,
        loading,
        uploadFiles,
    };
};
