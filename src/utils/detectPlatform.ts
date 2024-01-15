enum Platforms {
    mac = 'mac',
    windows = 'windows',
}

export const detectPlatform = () => {
    if (typeof window === 'undefined') {
        return Platforms.mac;
    }

    const userAgent = window.navigator.userAgent.toLowerCase();

    if (userAgent.includes(Platforms.windows)) {
        return Platforms.windows;
    }

    return userAgent.includes(Platforms.mac);
};
