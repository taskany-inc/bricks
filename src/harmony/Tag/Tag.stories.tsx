import React from 'react';
import { Meta } from '@storybook/react';

import { Tag, TagCleanButton } from './Tag';

const meta: Meta<typeof Tag> = {
    title: '@harmony/Tag',
    component: Tag,
};

export default meta;

const tags = ['Tag 1', 'Frontend', 'Backend', 'Q1', 'Q4/2025'];

export const TagsList = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ display: 'flex', gap: 4 }}>
                {tags.map((tag) => (
                    <Tag key={tag} view="rounded">
                        {tag}
                    </Tag>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
                {tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
                {tags.map((tag) => (
                    <Tag key={tag} view="rounded" action={<TagCleanButton />}>
                        {tag}
                    </Tag>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
                {tags.map((tag) => (
                    <Tag key={tag} action={<TagCleanButton />}>
                        {tag}
                    </Tag>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        onClick={tag.length <= 5 ? () => {} : undefined}
                        action={tag.length <= 5 && <TagCleanButton />}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
            <div style={{ display: 'flex', gap: 4, maxWidth: 200, flexWrap: 'wrap' }}>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        onClick={tag.length <= 5 ? () => {} : undefined}
                        action={tag.length <= 5 && <TagCleanButton />}
                    >
                        {tag}
                    </Tag>
                ))}
            </div>
        </div>
    );
};
