type CookiesOptions = Record<string, string | number | Date | boolean>;

export const setCookie = (name: string, value: string | number | boolean, defaults: CookiesOptions = {}) => {
    const options: CookiesOptions = {
        path: '/',
        ...defaults,
    };

    document.cookie = Object.keys(options).reduce((cookie, optionKey) => {
        const optionValue = options[optionKey];
        const cookieWithOption = `${cookie}; ${optionKey}`;

        if (optionValue !== true) {
            return `${cookieWithOption}=${optionValue}`;
        }

        return cookieWithOption;
    }, `${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
};

export const deleteCookie = (name: string) => {
    setCookie(name, '', {
        'max-age': -999,
    });
};
