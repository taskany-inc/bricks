import type { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';

import { Text } from '../Text/Text';
import { ModalContent, ModalHeader } from '../Modal/Modal';

import { ModalPreview } from './ModalPreview';

const meta: Meta<typeof ModalPreview> = {
    title: '@harmony/ModalPreview',
    component: ModalPreview,
};

export default meta;

export const Default: StoryFn<typeof ModalPreview> = (args) => {
    const [visible, setIsVisible] = useState(true);
    return (
        <div style={{ minWidth: '100rem', padding: 0 }}>
            <ModalPreview visible={visible} onClose={() => setIsVisible(false)}>
                <ModalHeader view="warning">Modal Header</ModalHeader>
                <ModalContent>
                    <Text>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                        reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                        reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo
                        autem, provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                    </Text>
                </ModalContent>
            </ModalPreview>
        </div>
    );
};
