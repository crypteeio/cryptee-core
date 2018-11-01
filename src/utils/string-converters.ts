import { range } from "./common";
import { PADDING_CHAR } from '../constants'

export const groupByLength = (value: string, length: number) => {
    const groups = value.match(new RegExp(`([a-z0-9]){${length}}|([a-z0-9]){1,}`, 'gi')) || []
    const groupCount = Math.ceil(value.length / length)
    return range(groupCount).map(index => groups[index])
}

export const encodeUnicodeToHex = (value: string) => range(value.length)
    .map(index => (PADDING_CHAR.repeat(3) + value.charCodeAt(index).toString(16)).slice(-4))
    .join('')

export const decodeHexToUnicode = (value: string) => {
    const groups = value.match(/[a-z0-9]{1,4}/gi) || [];
    return range(groups.length)
        .filter(index => groups[index] !== PADDING_CHAR.repeat(4))
        .map(index => String.fromCharCode(parseInt(groups[index], 16)))
        .join('')
}

export const padEnd = (value: string, count: number, char: string) => value + char.repeat(count - value.length)