import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import {
    IconExclamationCircleSolid,
    IconLeftSmallOutline,
    IconQuestionCircleSolid,
    IconRightSmallOutline,
} from '@taskany/icons';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Link } from '../Link/Link';
import { Tooltip } from '../Tooltip/Tooltip';
import { Badge } from '../Badge/Badge';

import classes from './DatePicker.module.css';

type DatePickerRangeType = 'Year' | 'Quarter' | 'Strict';
type Quarter = 'Q1' | 'Q2' | 'Q3' | 'Q4';
type QuarterAlias = '@prev' | '@current' | '@next';

interface DatePickerRange {
    start?: Date;
    end: Date;
}

interface DatePickerValue {
    range: DatePickerRange;
    type?: DatePickerRangeType;
    alias?: QuarterAlias;
    shortcutQuarter?: Quarter;
}

interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    value?: DatePickerValue;
    translates: {
        hint?: string;
        reset?: string;
        warning?: string;
    };
    onChange: (val?: DatePickerValue) => void;
}

interface DatePickerContextProps {
    currentDate: Date;
    currentYear: number;
    currentQuarter: Quarter;
    currentAlias: QuarterAlias;
    selectedYear?: number;
    selectedQuarter?: Quarter;
    selectedAlias?: QuarterAlias;
    selectedDate?: Date;
    collapseFields?: Record<'year' | 'quarter' | 'date', boolean>;
    setSelectedYear: (year: number) => void;
    setSelectedQuarter: (quarter: Quarter) => void;
    setSelectedQuarterAlias: (alias?: QuarterAlias) => void;
    setStrictDate: (date: string | Date) => void;
    setCollapseFields: (mode: DatePickerRangeType) => void;
}

interface DatePickerOptionProps {
    title: string;
    trigger: string;
    collapse: boolean;
    onClick: () => void;
}

interface DatePickerState {
    currentDate: Date;
    currentYear: number;
    currentQuarter: Quarter;
    currentAlias: QuarterAlias;
    selectedYear?: number;
    selectedQuarter?: Quarter;
    selectedAlias?: QuarterAlias;
    selectedDate?: Date;
    collapseFields: ReturnType<typeof getReadOnlyFields>;
    value?: DatePickerValue | undefined;
    isPastDate?: boolean;
}

type Actions =
    | {
          type: 'set selected year';
          payload: number;
      }
    | {
          type: 'set selected quarter';
          payload: Quarter | undefined;
      }
    | {
          type: 'set selected alias';
          payload: QuarterAlias | undefined;
      }
    | {
          type: 'set strict date';
          payload: Date;
      }
    | {
          type: 'set collapse fields';
          payload: DatePickerState['collapseFields'];
      }
    | {
          type: 'reset';
      };

interface DatePickerPartProps extends React.HTMLAttributes<HTMLDivElement> {
    translates: Omit<DatePickerOptionProps, 'className' | 'collapse' | 'onClick'>;
    className?: string;
}

interface DatePickerYearProps extends DatePickerPartProps {
    max?: number;
    min?: number;
}

interface DatePickerQuarterProps extends DatePickerPartProps {
    withAliases?: boolean;
}

const dateFragments = {
    day: 'day',
    month: 'month',
    year: 'year',
};
interface DatePickerStrictProps extends DatePickerPartProps {
    dateFragments: Array<keyof typeof dateFragments>;
    splitter: string;
    translates: DatePickerPartProps['translates'] & { advice?: string };
}

const getDateObject = (now = new Date()) => {
    return {
        month: now.getMonth() + 1,
        day: now.getDate(),
        year: now.getFullYear(),
    };
};

const getCurrentQuarter = (now = new Date()): Quarter => `Q${Math.floor(now.getMonth() / 3) + 1}` as Quarter;

const getReadOnlyFields = (type: DatePickerRangeType) => {
    if (type === 'Strict') {
        return { year: true, quarter: true, date: false };
    }
    if (type === 'Quarter') {
        return { year: false, quarter: false, date: true };
    }
    return { year: false, quarter: true, date: true };
};

const createQuarterRange = (q: Quarter, year?: number): Required<DatePickerRange> => {
    const qToM: Record<Quarter, number> = {
        Q1: 2,
        Q2: 5,
        Q3: 8,
        Q4: 11,
    };
    const abstractDate = new Date();

    abstractDate.setMonth(qToM[q], 0);

    if (year) {
        abstractDate.setFullYear(year);
    }

    const d = new Date(abstractDate);
    const quarter = Math.floor(d.getMonth() / 3);
    const start = new Date(d.getFullYear(), quarter * 3, 1);

    return {
        end: new Date(start.getFullYear(), start.getMonth() + 3, 0),
        start,
    };
};

const getQuaterByAlias = (alias: QuarterAlias): [Quarter, number] => {
    const currentQuarterRange = createQuarterRange(getCurrentQuarter());

    if (alias === '@current') {
        return [getCurrentQuarter(), currentQuarterRange.end.getFullYear()];
    }

    if (alias === '@next') {
        const endQuarterDate = new Date(currentQuarterRange.end);
        endQuarterDate.setMonth(endQuarterDate.getMonth() + 1);
        return [getCurrentQuarter(endQuarterDate), endQuarterDate.getFullYear()];
    }

    const startQuarterDate = new Date(currentQuarterRange.start);
    startQuarterDate.setMonth(startQuarterDate.getMonth() - 1);

    return [getCurrentQuarter(startQuarterDate), startQuarterDate.getFullYear()];
};

const createYearRange = (year: number) => ({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
});

const dateToShortISO = (date?: Date) => {
    const current = getDateObject(date);

    return `${current.year}-${String(current.month).padStart(2, '0')}-${String(current.day).padStart(2, '0')}`;
};

const calculateReturnedValue = ({
    collapseFields,
    selectedYear,
    selectedDate,
    selectedQuarter,
    selectedAlias,
}: DatePickerState): DatePickerValue | undefined => {
    if (collapseFields.quarter && collapseFields.year && collapseFields.date) {
        return;
    }

    if (!collapseFields.quarter && selectedQuarter) {
        return selectedYear
            ? {
                  range: createQuarterRange(selectedQuarter, selectedYear),
                  type: selectedQuarter ? 'Quarter' : 'Year',
                  alias: selectedAlias,
                  shortcutQuarter: selectedQuarter,
              }
            : undefined;
    }
    if (!collapseFields.year) {
        return selectedYear
            ? {
                  range: createYearRange(selectedYear),
                  type: 'Year',
              }
            : undefined;
    }
    return selectedDate
        ? {
              range: { end: selectedDate },
              type: 'Strict',
          }
        : undefined;
};

const dateLessCurrent = (date: Date): boolean => {
    const now = getDateObject();
    const nowDate = new Date(now.year, now.month - 1, now.day, 0, 0, 0, 0);

    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

    return compareDate < nowDate;
};

const mapValueToPartialState = (
    value?: DatePickerValue,
): Pick<
    DatePickerState,
    'selectedDate' | 'selectedQuarter' | 'selectedYear' | 'collapseFields' | 'selectedAlias' | 'value' | 'isPastDate'
> => {
    const collapseFields = value?.type ? getReadOnlyFields(value.type) : { year: true, quarter: true, date: true };
    const year = value?.range.end ? value.range.end.getFullYear() : undefined;
    const quarter = value?.type === 'Quarter' && value.range.end ? getCurrentQuarter(value.range.end) : undefined;
    const alias = value?.type === 'Quarter' && value?.alias ? value.alias : undefined;
    const date = value?.type === 'Strict' && value.range.end ? value.range.end : undefined;
    const isPastDate = value?.range.end ? dateLessCurrent(value.range.end) : undefined;

    const partialState = {
        collapseFields,
        selectedDate: date,
        selectedQuarter: quarter,
        selectedYear: year,
        selectedAlias: alias,
        isPastDate,
        value,
    };

    return partialState;
};

const DatePickerContext = createContext<DatePickerContextProps>({
    currentYear: new Date().getFullYear(),
    currentDate: new Date(),
    currentQuarter: getCurrentQuarter(),
    currentAlias: '@current',
    setSelectedYear: () => {},
    setSelectedQuarter: () => {},
    setSelectedQuarterAlias: () => {},
    setStrictDate: () => {},
    setCollapseFields: () => {},
});

const datePickerReducer: React.Reducer<DatePickerState, Actions> = (state, action) => {
    let nextState = { ...state };
    switch (action.type) {
        case 'set selected year':
            nextState = {
                ...state,
                selectedYear: action.payload,
                selectedAlias: undefined,
            };
            break;
        case 'set selected quarter':
            nextState = {
                ...state,
                selectedQuarter: action.payload,
                selectedAlias: undefined,
            };
            break;
        case 'set selected alias':
            nextState = {
                ...state,
                selectedAlias: action.payload,
            };
            break;
        case 'set strict date':
            nextState = {
                ...state,
                selectedDate: action.payload,
                selectedAlias: undefined,
                selectedYear: undefined,
                selectedQuarter: undefined,
            };

            break;
        case 'set collapse fields': {
            nextState = {
                ...state,
                collapseFields: action.payload,
            };
            break;
        }
        case 'reset':
            return {
                ...state,
                selectedAlias: undefined,
                selectedDate: undefined,
                selectedQuarter: undefined,
                selectedYear: undefined,
                collapseFields: {
                    year: true,
                    quarter: true,
                    date: true,
                },
                value: undefined,
                isPastDate: false,
            };
        default:
            return state;
    }

    nextState.value = calculateReturnedValue(nextState);

    if (nextState.value) {
        nextState.isPastDate = dateLessCurrent(nextState.value.range.end);
    }

    return nextState;
};

const quartersBricks = ['right', 'center', 'center', 'left'] as const;
const aliasesBricks = ['right', 'center', 'left'] as const;
const quarters: Quarter[] = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
const aliases: QuarterAlias[] = ['@prev', '@current', '@next'] as const;

const inputNames = {
    'date-picker-year': 'date-picker-year',
    'date-picker-quarters': {
        Q1: 'date-picker-quarter-Q1',
        Q2: 'date-picker-quarter-Q2',
        Q3: 'date-picker-quarter-Q3',
        Q4: 'date-picker-quarter-Q4',
    },
    'date-picker-strict-date': {
        [dateFragments.day]: `date-picker-strict-date-${dateFragments.day}`,
        [dateFragments.month]: `date-picker-strict-date-${dateFragments.month}`,
        [dateFragments.year]: `date-picker-strict-date-${dateFragments.year}`,
    },
} as const;

export const DatePicker: React.FC<React.PropsWithChildren<DatePickerProps>> = ({
    value: defaultValue,
    translates,
    onChange,
    children,
    className,
    ...attrs
}) => {
    const [{ value, ...state }, dispatch] = useReducer(datePickerReducer, {
        currentDate: new Date(),
        currentYear: new Date().getFullYear(),
        currentQuarter: getCurrentQuarter(),
        currentAlias: '@current',
        ...mapValueToPartialState(defaultValue),
    });

    const prevDatePickerValue = useRef(defaultValue);

    const setSelectedYear = useCallback((year: number) => {
        dispatch({
            type: 'set selected year',
            payload: year,
        });
    }, []);

    const setSelectedQuarter = useCallback((quarter?: Quarter) => {
        dispatch({
            type: 'set selected quarter',
            payload: quarter,
        });
    }, []);

    const setSelectedQuarterAlias = useCallback((alias?: QuarterAlias) => {
        dispatch({
            type: 'set selected alias',
            payload: alias,
        });
    }, []);

    const setStrictDate = useCallback((date: string | Date) => {
        dispatch({
            type: 'set strict date',
            payload: new Date(date),
        });
    }, []);

    const setCollapseFields = useCallback((mode: DatePickerRangeType) => {
        dispatch({
            type: 'set collapse fields',
            payload: getReadOnlyFields(mode),
        });
    }, []);

    useEffect(() => {
        if (!value) {
            return;
        }

        const prevValue = prevDatePickerValue.current;

        const newStartDate = value.range.start ? dateToShortISO(value.range.start) : null;
        const prevStartDate = prevValue?.range.start ? dateToShortISO(prevValue.range.start) : null;

        const newEndDate = value.range.end ? dateToShortISO(value.range.end) : null;
        const prevEndDate = prevValue?.range.end ? dateToShortISO(prevValue.range.end) : null;

        if (
            value?.type !== prevValue?.type ||
            value?.alias !== prevValue?.alias ||
            prevStartDate !== newStartDate ||
            prevEndDate !== newEndDate
        ) {
            onChange(value);

            prevDatePickerValue.current = value;
        }
    }, [defaultValue, value]);

    const onReset = useCallback(() => {
        dispatch({ type: 'reset' });
        onChange(undefined);
    }, [onChange]);

    const context = useMemo<DatePickerContextProps>(() => {
        return {
            setSelectedQuarter,
            setSelectedQuarterAlias,
            setSelectedYear,
            setStrictDate,
            setCollapseFields,
            ...state,
        };
    }, [setSelectedQuarter, setSelectedQuarterAlias, setCollapseFields, setSelectedYear, state]);

    const warning = useMemo(() => {
        if (!state.isPastDate || !translates.warning) {
            return null;
        }

        return translates.warning;
    }, [translates.warning, state.isPastDate]);

    return (
        <DatePickerContext.Provider value={context}>
            <div className={classNames(classes.DatePicker, className)} {...attrs}>
                {children}
                <div className={classes.DatePickerFooter}>
                    {nullable(translates.hint, (hint) => (
                        <Tooltip
                            target={<IconQuestionCircleSolid size={20} className={classes.DatePickerHintIcon} />}
                            placement="top"
                            offset={[10, 10]}
                            maxWidth={180}
                            minWidth={180}
                            interactive
                        >
                            {hint}
                        </Tooltip>
                    ))}

                    {nullable(value, () => (
                        <Link className={classes.DatePickerResetControl} onClick={onReset} view="secondary">
                            {translates.reset}
                        </Link>
                    ))}
                </div>
                {nullable(warning, (warnText) => (
                    <Badge
                        className={classes.DatePickerWarningMessage}
                        iconLeft={<IconExclamationCircleSolid size="s" />}
                        text={warnText}
                        weight="regular"
                    />
                ))}
            </div>
        </DatePickerContext.Provider>
    );
};

const DatePickerOption: React.FC<
    React.PropsWithChildren<DatePickerOptionProps & React.HTMLAttributes<HTMLDivElement>>
> = ({ title, children, trigger, className, collapse, onClick, ...attrs }) => {
    return (
        <div className={classNames(classes.DatePickerOption, className)} {...attrs}>
            <Text size="s" className={classes.DatePickerOptionLabel}>
                {title}
            </Text>
            {nullable(
                !collapse,
                () => (
                    <Button onClick={onClick} text={trigger} />
                ),
                children,
            )}
        </div>
    );
};

export const DatePickerYear: React.FC<DatePickerYearProps> = ({ translates, max, min, className, ...attrs }) => {
    const {
        currentYear,
        selectedYear,
        setSelectedYear,
        setCollapseFields,
        collapseFields: { year = true } = {},
    } = useContext(DatePickerContext);

    const handleClick = useCallback(() => {
        setCollapseFields('Year');
    }, [selectedYear, setSelectedYear, currentYear, setCollapseFields]);

    const switchYears = useCallback(
        (diff: 1 | -1) => {
            const nextYear = (selectedYear ?? currentYear) + diff;
            setSelectedYear(nextYear);
        },
        [selectedYear, setSelectedYear],
    );

    const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        const parsed = parseInt(event.target.value, 10);
        if (!Number.isNaN(parsed)) {
            setSelectedYear(parsed);
        }
    }, []);

    const buttonsDisabled = useMemo(() => {
        return {
            decrease: min != null ? currentYear === min : false,
            increase: max != null ? currentYear === max : false,
        };
    }, [currentYear, min, max]);

    return (
        <DatePickerOption
            {...translates}
            {...attrs}
            className={classNames(className)}
            collapse={!year}
            onClick={handleClick}
        >
            <div className={classes.DatePickerInlineWrapper}>
                <Button
                    iconLeft={<IconLeftSmallOutline size="s" />}
                    onClick={() => switchYears(-1)}
                    brick="right"
                    disabled={buttonsDisabled.decrease}
                />
                <Input
                    className={classes.DatePickerYearInput}
                    value={selectedYear ?? currentYear}
                    type="number"
                    brick="center"
                    name={inputNames['date-picker-year']}
                    onChange={handleInputChange}
                />
                <Button
                    iconLeft={<IconRightSmallOutline size="s" />}
                    onClick={() => switchYears(1)}
                    brick="left"
                    disabled={buttonsDisabled.increase}
                />
            </div>
        </DatePickerOption>
    );
};

export const DatePickerQuarter: React.FC<DatePickerQuarterProps> = ({
    translates,
    withAliases,
    className,
    ...attrs
}) => {
    const {
        currentQuarter,
        currentYear,
        selectedQuarter,
        selectedAlias,
        setSelectedQuarterAlias,
        setSelectedYear,
        setSelectedQuarter,
        collapseFields: { quarter = true } = {},
        setCollapseFields,
    } = useContext(DatePickerContext);

    const handleSelectQuarter = useCallback((q: Quarter) => {
        setSelectedQuarter(q);
        setSelectedQuarterAlias(undefined);
    }, []);

    const handleClick = useCallback(() => {
        setCollapseFields('Quarter');
        setSelectedQuarter(currentQuarter);
        setSelectedYear(currentYear);
    }, [setCollapseFields]);

    const handleSelectQuarterAlias = useCallback(
        (alias: QuarterAlias) => {
            const [currentQuarter, year] = getQuaterByAlias(alias);
            const selectedDateRange = createQuarterRange(currentQuarter, year);

            setSelectedYear(selectedDateRange.end.getFullYear());
            setSelectedQuarter(currentQuarter);
            setSelectedQuarterAlias(alias);
        },
        [setSelectedQuarter, setSelectedQuarterAlias, setSelectedYear],
    );

    return (
        <DatePickerOption {...translates} {...attrs} className={className} collapse={!quarter} onClick={handleClick}>
            <div className={classNames(classes.DatePickerQuarter)}>
                {quarters.map((quarter, index) => (
                    <Button
                        key={quarter}
                        text={quarter}
                        brick={quartersBricks[index]}
                        size="s"
                        onClick={() => handleSelectQuarter(quarter)}
                        view={selectedQuarter === quarter ? 'checked' : 'default'}
                        name={inputNames['date-picker-quarters'][quarter]}
                    />
                ))}
            </div>
            {nullable(withAliases, () => (
                <div className={classNames(classes.DatePickerQuarterAlias)}>
                    {aliases.map((alias, index) => (
                        <Button
                            brick={aliasesBricks[index]}
                            key={alias}
                            text={alias}
                            view={selectedAlias === alias ? 'checked' : 'default'}
                            size="s"
                            onClick={() => handleSelectQuarterAlias(alias)}
                        />
                    ))}
                </div>
            ))}
        </DatePickerOption>
    );
};

const valueLen = {
    month: 2,
    day: 2,
    year: 4,
};

export const DatePickerStrict: React.FC<DatePickerStrictProps> = ({
    translates,
    className,
    dateFragments,
    splitter,
    ...attrs
}) => {
    const {
        currentDate,
        collapseFields: { date = true } = {},
        selectedDate = new Date(),
        setCollapseFields,
        setStrictDate,
    } = useContext(DatePickerContext);

    const [dateValues, setDateValues] = useState(() => getDateObject(selectedDate));
    const wrapperRef = useRef<HTMLDivElement>(null);

    const focusSequence = useMemo(() => {
        const seq: { [K in (typeof dateFragments)[number]]?: (typeof dateFragments)[number] } = {};

        for (let i = 1; i < dateFragments.length; i += 1) {
            const from = dateFragments[i - 1];
            const to = dateFragments[i];

            seq[from] = to;
        }

        return seq;
    }, [dateFragments]);

    const switchInputFocus = useCallback(
        (from: (typeof dateFragments)[number]) => {
            const node = wrapperRef.current;
            if (!node) {
                return;
            }

            const next = focusSequence[from];

            if (!next) {
                return;
            }

            queueMicrotask(() => {
                const target = node.querySelector(`[name=${inputNames['date-picker-strict-date'][next]}]`);
                if (target instanceof HTMLElement) {
                    target.focus();
                }
            });
        },
        [focusSequence],
    );

    const handleClick = useCallback(() => {
        setCollapseFields('Strict');
        setStrictDate(currentDate);
    }, [setCollapseFields, currentDate]);

    const handleChangeDatePart = useCallback(
        (part: (typeof dateFragments)[number]): React.ChangeEventHandler<HTMLInputElement> => {
            return (event) => {
                const value = parseInt(event.target.value, 10);

                if (event.target.value.length === event.target.maxLength) {
                    switchInputFocus(part);
                }

                setDateValues((prev) => ({ ...prev, [part]: value }));
            };
        },
        [],
    );

    useEffect(() => {
        if (date) {
            return;
        }

        if (dateValues.day && dateValues.month && dateValues.year) {
            setStrictDate(new Date(dateValues.year, dateValues.month - 1, dateValues.day));
        }
    }, [dateValues.day, dateValues.month, dateValues.year, date]);

    return (
        <>
            {nullable(translates.advice, (t) => (
                <Text size="s" className={classes.DatePickerStrictDateAdvice}>
                    {t}
                </Text>
            ))}
            <DatePickerOption
                {...translates}
                {...attrs}
                className={classNames(className)}
                collapse={!date}
                onClick={handleClick}
            >
                <div
                    className={classNames(classes.DatePickerInlineWrapper, classes.DatePickerInlineGap)}
                    ref={wrapperRef}
                >
                    {dateFragments.map((part, index) => {
                        return (
                            <React.Fragment key={part}>
                                <Input
                                    className={classNames(
                                        part === 'year'
                                            ? classes.DatePickerYearInput
                                            : classes.DatePickerStrictDateInput,
                                    )}
                                    type="number"
                                    name={inputNames['date-picker-strict-date'][part]}
                                    maxLength={valueLen[part]}
                                    value={dateValues[part]}
                                    onChange={handleChangeDatePart(part)}
                                />
                                {nullable(index !== dateFragments.length - 1, () => splitter)}
                            </React.Fragment>
                        );
                    })}
                </div>
            </DatePickerOption>
        </>
    );
};
