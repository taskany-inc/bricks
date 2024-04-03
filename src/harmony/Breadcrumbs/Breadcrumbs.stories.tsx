import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { Text } from '../Text/Text';
import { Link } from '../Link/Link';

import { Breadcrumb, Breadcrumbs } from './Breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
    title: '@harmony/Breadcrumbs',
    component: Breadcrumbs,
};

export default meta;

const items = ['Item 1', 'Item 2', 'Items 3', 'Item 4'];

export const Default: StoryFn = () => {
    return (
        <>
            <Breadcrumbs>
                {items.map((item) => (
                    <Breadcrumb key={item}>
                        <Link view="inline" href="#">
                            {item}
                        </Link>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>

            <Breadcrumbs separator="/">
                {items.map((item) => (
                    <Breadcrumb key={item}>
                        <Text weight="bold">{item}</Text>
                    </Breadcrumb>
                ))}
            </Breadcrumbs>
        </>
    );
};
