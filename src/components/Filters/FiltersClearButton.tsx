import React, { FC } from 'react';

import Button from '../Button';

import { useFilterContext } from './FiltersPanel';

export const FiltersClearButton: FC<{ text: string }> = ({ text }) => {
    const { reset } = useFilterContext();

    return <Button text={text} onClick={reset} />;
};
