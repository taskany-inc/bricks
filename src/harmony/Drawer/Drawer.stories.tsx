import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { Text } from '../Text/Text';
import { Button } from '../Button/Button';

import { Drawer, DrawerHeader } from './Drawer';

const meta: Meta<typeof Drawer> = {
    title: '@harmony/Drawer',
    component: Drawer,
};

export default meta;

export const Default = () => (
    <Drawer visible>
        <DrawerHeader>
            <Text size="ml">Heading</Text>
        </DrawerHeader>

        <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam reiciendis
            ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates reprehenderit totam nemo eius
            sed commodi architecto labore impedit a in laborum explicabo autem, provident, minima exercitationem
            corrupti quasi sequi eveniet eaque iure unde.
            {Array.from({ length: 15 }).map((_, i) => (
                <br key={i} />
            ))}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam reiciendis
            ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates reprehenderit totam nemo eius
            sed commodi architecto labore impedit a in laborum explicabo autem, provident, minima exercitationem
            corrupti quasi sequi eveniet eaque iure unde.
            {Array.from({ length: 15 }).map((_, i) => (
                <br key={i} />
            ))}
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam reiciendis
            ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates reprehenderit totam nemo eius
            sed commodi architecto labore impedit a in laborum explicabo autem, provident, minima exercitationem
            corrupti quasi sequi eveniet eaque iure unde.
        </Text>
    </Drawer>
);

export const Toggle = () => {
    const [visible, setVisble] = useState(false);

    return (
        <>
            <Button text="Open drawer" onClick={() => setVisble(true)} />
            <Drawer visible={visible} onClose={() => setVisble(false)} animated>
                <DrawerHeader>
                    <Text size="ml">Heading</Text>
                </DrawerHeader>

                <Text>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                    reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                    reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo autem,
                    provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                    {Array.from({ length: 15 }).map((_, i) => (
                        <br key={i} />
                    ))}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                    reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                    reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo autem,
                    provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                    {Array.from({ length: 15 }).map((_, i) => (
                        <br key={i} />
                    ))}
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                    reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                    reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo autem,
                    provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                </Text>
            </Drawer>
        </>
    );
};
