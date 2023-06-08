import { useEffect, useRef, useState } from 'react';

export type UseOfflineDetectorParams = {
    setStatus: (online: boolean) => void;
    pollingDelay: number;
    remoteServerUrl: string;
};

export const useOfflineDetector = ({
    setStatus,
    pollingDelay = 5000,
    remoteServerUrl = '/',
}: UseOfflineDetectorParams) => {
    const [globalOnlineStatus, setGlobalOnlineStatus] = useState(true);
    const [remoteServerStatus, setRemoteServerStatus] = useState(true);
    const remoteServerPollingInProgress = useRef(true);

    useEffect(() => {
        const goOnline = () => {
            setGlobalOnlineStatus(true);
            setRemoteServerStatus(true);
            setStatus(true);
        };

        const goOffline = () => {
            setGlobalOnlineStatus(false);
            setRemoteServerStatus(false);
            setStatus(false);
        };

        if (typeof window === 'undefined') {
            return;
        }

        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);

        const polling = () => {
            if (!remoteServerPollingInProgress.current) return;

            if (!globalOnlineStatus) {
                setTimeout(polling, pollingDelay);

                return;
            }

            fetch(remoteServerUrl)
                .then((res) => {
                    const newStatus = res.status < 400;
                    setRemoteServerStatus(newStatus);
                })
                .catch(() => {
                    setRemoteServerStatus(false);
                })
                .finally(() => {
                    setTimeout(polling, pollingDelay);
                });
        };

        polling();

        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
            remoteServerPollingInProgress.current = false;
        };
    }, []);

    return globalOnlineStatus && remoteServerStatus;
};
