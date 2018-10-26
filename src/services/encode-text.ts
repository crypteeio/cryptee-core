import { PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { encodeUnicodeToHex, padEnd, groupByLength } from '../utils/string-converters'

export const encodeText = (text: string) => {
    const encoded = encodeUnicodeToHex(text)
    const padding = Math.ceil(encoded.length / PADDING) * PADDING
    const padded = padEnd(encoded, padding, PADDING_CHAR)
    return groupByLength(padded, TREZOR_MAX_PAYLOAD_SIZE)
}