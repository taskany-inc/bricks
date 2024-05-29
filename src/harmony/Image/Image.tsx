import React, { FC, ImgHTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Image.module.css';

export const Image: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ className, ...props }) => (
    <img className={cn(s.Image, className)} {...props} />
);
