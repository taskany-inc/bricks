import React, { FC, HTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Md.module.css';

export const Md: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
    <div className={cn(s.Md, className)} {...props}></div>
);
