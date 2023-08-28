export const getInitials = (fullName?: string | null) => {
    if (!fullName) return '';
    const arr = fullName.split(' ');
    return `${arr[0]?.[0] || ''} ${arr[1]?.[0] || ''}`;
};
