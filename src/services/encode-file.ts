import { PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { padEnd, groupByLength } from '../utils/string-converters'
import { toHexString } from '../utils/number-converters'
import { CrypteeFile } from '../models/CrypteeFile';

export const encodeFile = (bytes: number[]): CrypteeFile => {
    const hexString = bytes.map(toHexString).join('')

    const padMultiple = Math.ceil(hexString.length / PADDING);
    const hexPadded = padEnd(hexString, (padMultiple * PADDING), PADDING_CHAR);
    const zeroPaddingLength = hexString.length % PADDING
    
    return { value: groupByLength(hexPadded, TREZOR_MAX_PAYLOAD_SIZE), padding: zeroPaddingLength > 0 ? (PADDING - zeroPaddingLength) : 0 }
}