import { useCallback, useMemo, useRef } from 'react';

const separator = ',';

interface ParamMap {
    boolean: true;
    string: string;
    stringArray: string[];
    number: number;
    numberArray: number[];
}

type Serializers = { [K in keyof ParamMap]: (value?: ParamMap[K]) => string | undefined };

const serializers: Serializers = {
    boolean: (value) => (value ? '1' : undefined),
    string: (value) => value,
    stringArray: (value) => value?.join(separator),
    number: (value) => (value === undefined ? undefined : String(value)),
    numberArray: (value) => value?.join(separator),
};

const parseNumber = (value: string) => {
    const number = parseInt(value, 10);
    return Number.isNaN(number) ? undefined : number;
};

type Deserializers = { [K in keyof ParamMap]: (param?: string) => ParamMap[K] | undefined };

const deserializers: Deserializers = {
    boolean: (value) => (value ? true : undefined),
    string: (value) => value,
    stringArray: (value) => {
        const array = value?.split(separator).filter(Boolean);
        return array?.length ? array : undefined;
    },
    number: (value) => (value ? parseNumber(value) : undefined),
    numberArray: (value) => {
        const array = value
            ?.split(separator)
            .map((v) => parseNumber(v))
            .filter((v): v is number => v !== undefined);
        return array?.length ? array : undefined;
    },
};

type ParamsConfig = Record<string, keyof ParamMap>;

type ParamsValues<T extends ParamsConfig> = { [K in keyof T]?: ParamMap[T[K]] };

const getParam = (param: string | string[] | undefined) => (typeof param === 'string' ? param : undefined);

export const useUrlParams = <T extends ParamsConfig>(
    paramsConfig: T,
    query: Record<string, string | string[] | undefined>,
    pushUrl: (url: string) => void,
) => {
    const values = useMemo((): ParamsValues<T> => {
        const values: Record<string, unknown> = {};
        Object.keys(paramsConfig).forEach((key) => {
            const type = paramsConfig[key];
            const param = getParam(query[key]);
            values[key] = deserializers[type](param);
        });
        return values as ParamsValues<T>;
    }, [paramsConfig, query]);

    const accumulator = useRef<Record<string, string | undefined>>({});

    const updateUrl = useCallback(() => {
        const accKeys = Object.keys(accumulator.current);
        if (accKeys.length === 0) return;
        const url = window.location.pathname;
        const paramString = window.location.search;
        const params = new URLSearchParams(paramString);
        accKeys.forEach((k) => {
            const accValue = accumulator.current[k];
            if (accValue) {
                params.set(k, accValue);
            } else {
                params.delete(k);
            }
        });
        accumulator.current = {};
        if (params.size === 0) {
            pushUrl(url);
        } else {
            pushUrl(`${url}?${params}`);
        }
    }, [pushUrl]);

    const setter = useCallback(
        <K extends keyof T & string>(key: K, value?: ParamMap[T[K]]) => {
            const type = paramsConfig[key];
            const serialized = serializers[type](value);
            if (serialized === undefined) {
                accumulator.current[key] = undefined;
            } else {
                accumulator.current[key] = serialized;
            }
            queueMicrotask(updateUrl);
        },
        [paramsConfig, updateUrl],
    );

    const clearParams = useCallback(() => {
        const url = window.location.pathname;
        const paramString = window.location.search;
        const params = new URLSearchParams(paramString);
        Object.keys(paramsConfig).forEach((key) => {
            params.delete(key);
        });
        if (params.size === 0) {
            pushUrl(url);
        } else {
            pushUrl(`${url}?${params}`);
        }
    }, [paramsConfig, pushUrl]);

    return { values, setter, clearParams };
};
