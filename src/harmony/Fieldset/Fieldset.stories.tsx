import type { Meta, StoryFn } from '@storybook/react';
import React, { ComponentProps, useState } from 'react';

import { Button } from '../Button/Button';
import { Card, CardContent } from '../Card/Card';

import { Fieldset } from './Fieldset';

const meta: Meta<typeof Fieldset> = {
    title: '@harmony/Fieldset',
    component: Fieldset,
};

export default meta;

export const Default: StoryFn<typeof Fieldset> = () => {
    const [view, setView] = useState<ComponentProps<typeof Fieldset>['view']>('default');
    return (
        <Card>
            <CardContent view="transparent">
                <Fieldset title="View" view={view}>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <Button text="default" view="default" onClick={() => setView('default')} />
                        <Button text="warning" view="warning" onClick={() => setView('warning')} />
                        <Button text="danger" view="danger" onClick={() => setView('danger')} />
                    </div>
                </Fieldset>
            </CardContent>
        </Card>
    );
};
