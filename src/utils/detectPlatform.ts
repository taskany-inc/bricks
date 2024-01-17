enum Platforms {
    mac = 'mac',
    windows = 'windows',
}

export const detectPlatform = (): keyof typeof Platforms => {
    if (typeof window === 'undefined') {
        return Platforms.mac;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes(Platforms.windows)) {
        return Platforms.windows;
    }

    return Platforms.mac;
};
