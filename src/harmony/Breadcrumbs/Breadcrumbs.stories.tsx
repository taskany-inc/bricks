import React, { useMemo, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../Text/Text';
import { Link } from '../Link/Link';
import { Button } from '../Button/Button';

import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: '@harmony/Breadcrumbs',
    component: Breadcrumbs,
};

export default meta;

export const Default: StoryFn = () => {
    const [itemCount, setItemCount] = useState(6);

    const items = useMemo(() => Array.from({ length: itemCount }).map((_, i) => `${i} Item`), [itemCount]);

    return (
        <div
            style={{
                border: '1px solid var(--text-color)',
                padding: 'var(--gap-l)',
                resize: 'horizontal',
                overflow: 'hidden',
                width: 450,
            }}
        >
            <Breadcrumbs>
                {items.map((item) => (
                    <Breadcrumb key={item}>
                        <Link view="inline" href="#">
                            {item}
                        </Link>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>

            <Breadcrumbs>
                {items.map((item) => (
                    <Breadcrumb key={item}>
                        <Text weight="bold" ellipsis as="span">
                            {item} long
                        </Text>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>

            <div style={{ display: 'flex', gap: 'var(--gap-s)', marginTop: 'var(--gap-m)' }}>
                <Button text="+" onClick={() => setItemCount((v) => v + 1)} />
                <Button text="-" onClick={() => setItemCount((v) => Math.max(0, v - 1))} />
            </div>
        </div>
    );
};
