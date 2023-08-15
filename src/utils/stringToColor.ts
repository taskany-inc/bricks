/* eslint-disable no-bitwise */

export const stringToColor = (str: string) => {
    let hash = 0;
    str.split('').forEach((char) => {
        hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += value.toString(16).padStart(2, '0');
    }
    return color;
};

const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgb(${r}, ${g}, ${b})`;
};

export const isColorDark = (color: string) => {
    const rgb = (hexToRgb(color).match(/\d+/g) || []).map(Number);
    const brightness = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

    return brightness < 0.5;
};
