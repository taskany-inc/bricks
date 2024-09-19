export type DateRangeType = 'Year' | 'Quarter' | 'Strict';

export interface DateRange {
    start?: Date;
    end: Date;
}

export enum Quarters {
    Q1 = 'Q1',
    Q2 = 'Q2',
    Q3 = 'Q3',
    Q4 = 'Q4',
}

export type QuartersKeys = keyof typeof Quarters;

export enum QuartersAliases {
    '@prev' = '@prev',
    '@current' = '@current',
    '@next' = '@next',
}

export type QuarterAlias = keyof typeof QuartersAliases;

const urlDateRangeSeparator = '~';

export const createLocaleDate = (date: Date | string, { locale }: { locale: Intl.LocalesArgument }): string =>
    new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(date));

const pad = (num: number) => (num < 10 ? '0' : '') + num;

// Return string in format yyyy-mm-dd from local Date

export const getDateString = (date: Date | string) => {
    const parsedDate = new Date(date);

    return `${parsedDate.getFullYear()}-${pad(parsedDate.getMonth() + 1)}-${pad(parsedDate.getDate())}`;
};

export const encodeUrlDateRange = ({ start, end }: DateRange): string =>
    [start ? getDateString(start) : '', getDateString(end)].join(urlDateRangeSeparator);

export const getYearFromDate = (date: Date | string): number => new Date(date).getFullYear();

export const getQuarterFromDate = (date: Date | string): QuartersKeys =>
    `Q${Math.floor(new Date(date).getMonth() / 3 + 1)}` as QuartersKeys;

export const getAvailableYears = (n = 5, currY = new Date().getFullYear()): number[] =>
    Array(n)
        .fill(0)
        .map((_, i) => currY + i);

export const createYearRange = (year: number): DateRange => {
    const date = new Date();

    date.setFullYear(year);

    return {
        start: new Date(date.getFullYear(), 0, 1),
        end: new Date(date.getFullYear(), 11, 31),
    };
};

export const createQuarterRange = (q: QuartersKeys, year?: number): DateRange => {
    const qToM = {
        [Quarters.Q1]: 2,
        [Quarters.Q2]: 5,
        [Quarters.Q3]: 8,
        [Quarters.Q4]: 11,
    };
    const abstractDate = new Date();

    abstractDate.setMonth(qToM[q], 0);

    if (year) {
        abstractDate.setFullYear(year);
    }

    const qEndDate = (date: number) => {
        const d = new Date(date);
        const quarter = Math.floor(d.getMonth() / 3);
        const start = new Date(d.getFullYear(), quarter * 3, 1);

        return {
            end: new Date(start.getFullYear(), start.getMonth() + 3, 0),
            start,
        };
    };

    return qEndDate(+abstractDate);
};

export const createDateRange = (year: number, quarter?: QuartersKeys | null): DateRange => {
    if (quarter) {
        return createQuarterRange(quarter, year);
    }

    return createYearRange(year);
};

export const createQuarterRangeFromDate = (value: Date): DateRange => {
    return createDateRange(getYearFromDate(value), getQuarterFromDate(value));
};

export const getRelativeQuarterRange = (target: QuartersAliases): DateRange => {
    const current = createQuarterRangeFromDate(new Date());

    if (target === QuartersAliases['@current']) {
        return current;
    }

    const endOfQuarter = current.end;

    if (target === QuartersAliases['@next']) {
        endOfQuarter.setMonth(endOfQuarter.getMonth() + 1);

        return createQuarterRangeFromDate(endOfQuarter);
    }

    const startOfQuarter = current.start ?? current.end;

    startOfQuarter.setMonth(startOfQuarter.getMonth() - 1);

    return createQuarterRangeFromDate(startOfQuarter);
};

export const decodeUrlQuarterAlias = (data: string): QuartersAliases | null => {
    if (Object.keys(QuartersAliases).includes(data)) {
        return data as QuartersAliases;
    }

    return null;
};

export const decodeUrlDateRange = (data: string): null | DateRange => {
    const alias = decodeUrlQuarterAlias(data);

    if (alias) {
        return getRelativeQuarterRange(alias);
    }

    const [start = null, end] = data.split(urlDateRangeSeparator);

    if (!end) {
        return null;
    }

    return {
        start: start ? new Date(start) : undefined,
        end: new Date(end),
    };
};

const getMonthDifference = (start: Date, end: Date): number =>
    end.getMonth() - start.getMonth() + 12 * (end.getFullYear() - start.getFullYear());

export const getDateTypeFromRange = ({ start, end }: DateRange): DateRangeType => {
    if (start && getMonthDifference(start, end) === 11) {
        return 'Year';
    }

    if (start && getMonthDifference(start, end) === 2) {
        return 'Quarter';
    }

    return 'Strict';
};

export const decodeDateRangeFromString = (value?: string) => {
    if (!value) {
        return undefined;
    }

    const range = decodeUrlDateRange(value);

    if (!range) {
        return undefined;
    }

    return {
        range,
        type: getDateTypeFromRange(range),
        alias: decodeUrlQuarterAlias(value) || undefined,
    };
};

export const formateEstimate = (
    date: Date | string,
    {
        locale,
        type,
    }: {
        locale: Intl.LocalesArgument;
        type?: DateRangeType;
    },
): string => {
    const realDate = new Date(date);
    if (type === 'Year') {
        return String(getYearFromDate(realDate));
    }

    if (type === 'Quarter') {
        return `${getQuarterFromDate(realDate)}/${getYearFromDate(realDate)}`;
    }

    return createLocaleDate(realDate, { locale });
};
