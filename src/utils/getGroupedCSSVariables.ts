export const getGroupedRootCSSVariables = (selectorText = ':root') => {
    return Array.from(document.styleSheets)
        .filter((sheet) => sheet.href === null || sheet.href.startsWith(window.location.origin))
        .reduce<Record<string, Record<string, string>>>((acc, sheet) => {
            Array.from(sheet.cssRules).forEach((rule) => {
                if (!(rule instanceof CSSStyleRule)) {
                    return;
                }

                if (rule.selectorText === selectorText) {
                    Array.from(rule.style).forEach((name) => {
                        const matched = name.match(/--([\w-]+)-\d+/);
                        if (matched) {
                            const [, baseName] = matched;
                            acc[baseName] = acc[baseName] || {};
                            acc[baseName][name] = rule.style.getPropertyValue(name);
                        } else {
                            acc[name] = acc[name] || {};
                            acc[name][name] = rule.style.getPropertyValue(name);
                        }
                    });
                }
            });
            return acc;
        }, {});
};
