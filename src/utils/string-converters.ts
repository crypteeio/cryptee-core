export const groupByLength = (value: string, length: number) => {
    const groups = value.match(new RegExp(`([a-z0-9]){${length}}|([a-z0-9]){1,}`, 'gi'))
    const range = Math.ceil(value.length / length)
    return [...Array(range).keys()].map(index => groups[index])
}

export const encodeUnicodeToHex = (value: string) => {
    let result = "";
    [...Array(value.length).keys()].forEach(index => {
        const hexCharCode = value.charCodeAt(index).toString(16)
        result += ("000" + hexCharCode).slice(-4)
    })
    return result
}

export const decodeHexToUnicode = (value: string) => {
    const groups = value.match(/[a-z0-9]{1,4}/gi) || [];
    return [...Array(groups.length).keys()]
        .map(index => String.fromCharCode(parseInt(groups[index], 16)))
        .join('')
}

export const padEnd = (value: string, count: number, char: string) => {
    return value + [...Array(count - value.length).keys()].map(() => char).join('')
}