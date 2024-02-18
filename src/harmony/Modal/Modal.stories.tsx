import React, { ComponentProps, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button/Button';

import { Modal, ModalContent, ModalCross, ModalHeader } from './Modal';

const meta: Meta = {
    title: '@harmony/Modal',
    component: Modal,
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
    render: () => {
        const [view, setView] = useState<ComponentProps<typeof ModalHeader>['view']>();
        return (
            <Modal visible>
                <ModalHeader view={view}>You are going to archive the goal</ModalHeader>
                <ModalContent>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut impedit possimus fugit numquam
                        reiciendis ratione at praesentium cumque, nisi ea quia delectus rem! Ipsa, id voluptates
                        reprehenderit totam nemo eius sed commodi architecto labore impedit a in laborum explicabo
                        autem, provident, minima exercitationem corrupti quasi sequi eveniet eaque iure unde.
                    </p>
                    <p>
                        <b>Select ModalHeader view</b>
                    </p>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button text="default" view="default" onClick={() => setView(undefined)} />
                        <Button text="warning" view="warning" onClick={() => setView('warning')} />
                        <Button text="danger" view="danger" onClick={() => setView('danger')} />
                    </div>
                </ModalContent>
            </Modal>
        );
    },
};

export const ModalCrossIcon = () => (
    <div style={{ position: 'relative' }}>
        <ModalCross />
    </div>
);
