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

const crumbs = [
    'Lorem ipsum dolor sit amet',
    'elit',
    'Nunc in accumsan est. Suspendisse dapibus ac lorem',
    'vel',
    'platea dictumst',
    'Class aptent taciti sociosqu',
    'ad litora torquent per conubia nostra',
    'per inceptos himenaeos',
    'Mauris fringilla tempus bibendum',
    'Phasellus nec malesuada sapien',
];

export const Default: StoryFn = () => {
    const [itemCount, setItemCount] = useState(7);

    const items = useMemo(
        () => Array.from({ length: itemCount }).map((_, i) => crumbs[i % crumbs.length]),
        [itemCount],
    );

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
                {items.map((item, i) => (
                    <Breadcrumb key={`${item}-${i}`}>
                        <Link view="inline" href="#">
                            {item}
                        </Link>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>

            <Breadcrumbs>
                {items.map((item, i) => (
                    <Breadcrumb key={`${item}-${i}`}>
                        <Text weight="bold" ellipsis as="span">
                            {item} long
                        </Text>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>

            <div style={{ display: 'flex', gap: 'var(--gap-s)', marginTop: 'var(--gap-m)' }}>
                <Button text="-" onClick={() => setItemCount((v) => Math.max(0, v - 1))} />
                <Button text="+" onClick={() => setItemCount((v) => v + 1)} />
            </div>
        </div>
    );
};
