import { useCallback, useEffect, useState } from 'react';

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;

export const useCopyToClipboard = (onError?: (err: Error) => void, ms = 500): [CopiedValue, CopyFn, boolean] => {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        let timer: number;

        if (success) {
            window.setTimeout(() => {
                setSuccess(false);
            }, ms);
        }

        return () => {
            window.clearTimeout(timer);
        };
    }, [success, ms]);

    const copy = useCallback(
        async (text: string) => {
            try {
                await navigator.clipboard.writeText(text);
                setCopiedText(text);
                setSuccess(true);
                return true;
            } catch (error) {
                setCopiedText(null);
                setSuccess(false);

                const copyFailedError = new Error('Copy failed');
                onError && onError(copyFailedError);
                return Promise.reject(copyFailedError);
            }
        },
        [onError],
    );

    return [copiedText, copy, success];
};
