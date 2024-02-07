import React from 'react';

import { Alert } from '../Alert/Alert';

import s from './OfflineBanner.module.css';

interface OfflineBannerProps {
    text: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ text }) => {
    return <Alert view="danger" text={text} className={s.Alert} />;
};
