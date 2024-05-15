const ru = [
    'А',
    'а',
    'Б',
    'б',
    'В',
    'в',
    'Г',
    'г',
    'Д',
    'д',
    'Е',
    'е',
    'Ё',
    'ё',
    'Ж',
    'ж',
    'З',
    'з',
    'И',
    'и',
    'Й',
    'й',
    'К',
    'к',
    'Л',
    'л',
    'М',
    'м',
    'Н',
    'н',
    'О',
    'о',
    'П',
    'п',
    'Р',
    'р',
    'С',
    'с',
    'Т',
    'т',
    'У',
    'у',
    'Ф',
    'ф',
    'Х',
    'х',
    'Ц',
    'ц',
    'Ч',
    'ч',
    'Ш',
    'ш',
    'Щ',
    'щ',
    'Ъ',
    'ъ',
    'Ы',
    'ы',
    'Ь',
    'ь',
    'Э',
    'э',
    'Ю',
    'ю',
    'Я',
    'я',
];
const en = [
    'A',
    'a',
    'B',
    'b',
    'V',
    'v',
    'G',
    'g',
    'D',
    'd',
    'E',
    'e',
    'E',
    'e',
    'ZH',
    'zh',
    'Z',
    'z',
    'I',
    'i',
    'I',
    'i',
    'K',
    'k',
    'L',
    'l',
    'M',
    'm',
    'N',
    'n',
    'O',
    'o',
    'P',
    'p',
    'R',
    'r',
    'S',
    's',
    'T',
    't',
    'U',
    'u',
    'F',
    'f',
    'H',
    'h',
    'C',
    'c',
    'CH',
    'ch',
    'SH',
    'sh',
    'SCH',
    'sch',
    "'",
    "'",
    'Y',
    'y',
    "'",
    "'",
    'E',
    'e',
    'YU',
    'Yu',
    'YA',
    'ya',
];

export const translit = (str: string) => {
    const from = /[а-яё]/i.test(str) ? 'ru' : 'en';

    const [sourceAlphabet, targetAlphabet] = from === 'ru' ? [ru, en] : [en, ru];

    const result: string[] = [];

    for (let i = 0; i < str.length; i++) {
        const index = sourceAlphabet.indexOf(str[i]);
        if (index !== -1) {
            result.push(targetAlphabet[index]);
        } else {
            result.push(str[i]);
        }
    }

    return result.join('');
};
