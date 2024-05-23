import type { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { Card, CardContent } from '../Card/Card';

import { Md } from './Md';

const meta: Meta<typeof Md> = {
    title: '@harmony/Md',
    component: Md,
};

export default meta;

export const Default: StoryFn<typeof Md> = () => {
    return (
        <div style={{ width: 500 }}>
            <Card>
                <CardContent view="transparent">
                    <Md>
                        <a href="#">Link to some page</a>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                            reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                            reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo
                            autem, provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                        </p>
                        <img src="https://www.dogeat.ru/img/%D0%9F%D0%BE%D1%87%D0%B5%D0%BC%D1%83%20%D0%BA%D0%BE%D1%82%20%D1%85%D1%80%D0%B8%D0%BF%D0%B8%D1%82%20%D0%B8%20%D1%82%D1%8F%D0%B6%D0%B5%D0%BB%D0%BE%20%D0%B4%D1%8B%D1%88%D0%B8%D1%82.jpg" />
                    </Md>
                </CardContent>
            </Card>
        </div>
    );
};
