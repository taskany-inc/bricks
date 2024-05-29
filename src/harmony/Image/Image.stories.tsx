import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Card, CardContent } from '../Card/Card';

import { Image } from './Image';

const meta: Meta = {
    title: '@harmony/Image',
    component: Image,
};

export default meta;

export const Default: StoryObj<typeof Image> = {
    args: {
        src: 'https://cs11.pikabu.ru/post_img/big/2019/04/20/10/1555780815170653117.jpg',
    },

    render(args) {
        return (
            <div style={{ width: 400 }}>
                <Card>
                    <CardContent view="transparent">
                        <Image {...args} />
                    </CardContent>
                </Card>
            </div>
        );
    },
};
