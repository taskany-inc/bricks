import React, { ComponentProps, useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { DatePicker, DatePickerQuarter, DatePickerStrict, DatePickerYear } from './DatePicker';

const translates = {
    year: {
        title: 'Year',
        trigger: 'Choose year',
    },
    quarter: {
        title: 'Quarter',
        trigger: 'Choose quarter',
    },
    strict: {
        title: 'Strict Date',
        trigger: 'Set date',
        advice: 'or type the strict date',
    },
    default: {
        hint: 'Some hint about usage',
        reset: 'Reset',
        warning: 'Selected date is past',
    },
};

const meta: Meta<typeof DatePicker> = {
    title: '@harmony/DatePicker',
    component: DatePicker,
    args: {
        translates: translates.default,
    },
};

export default meta;

export const Default: StoryObj<typeof DatePicker> = {
    render(props) {
        const [date, setDate] = useState<ComponentProps<typeof DatePicker>['value']>();
        return (
            <DatePicker {...props} value={date} onChange={setDate}>
                <DatePickerYear translates={translates.year} />
                <DatePickerQuarter translates={translates.quarter} />
                <DatePickerStrict
                    translates={translates.strict}
                    dateFragments={['month', 'day', 'year']}
                    splitter="/"
                />
            </DatePicker>
        );
    },
};

export const PrefilledValue: StoryObj<typeof DatePicker> = {
    args: {
        value: {
            type: 'Quarter',
            range: {
                start: new Date(2023, 9, 1),
                end: new Date(2023, 11, 31),
            },
            alias: '@prev',
        },
    },
    render(props) {
        return (
            <DatePicker {...props}>
                <DatePickerYear translates={translates.year} />
                <DatePickerQuarter translates={translates.quarter} withAliases />
                <DatePickerStrict
                    translates={translates.strict}
                    dateFragments={['month', 'day', 'year']}
                    splitter="/"
                />
            </DatePicker>
        );
    },
};

export const OnlyYearField: StoryObj<typeof DatePicker> = {
    args: {
        value: {
            type: 'Year',
            range: {
                start: new Date(2023, 0, 1),
                end: new Date(2023, 11, 31),
            },
        },
    },
    render(props) {
        return (
            <DatePicker {...props}>
                <DatePickerYear translates={translates.year} />
            </DatePicker>
        );
    },
};

export const OnlyStrictDateField: StoryObj<typeof DatePicker> = {
    args: {
        value: {
            type: 'Strict',
            range: {
                end: new Date(2023, 7, 25),
            },
        },
    },
    render(props) {
        return (
            <DatePicker {...props}>
                <DatePickerStrict
                    translates={{ title: 'Date', trigger: 'Choose date' }}
                    dateFragments={['year', 'month', 'day']}
                    splitter="-"
                />
            </DatePicker>
        );
    },
};
