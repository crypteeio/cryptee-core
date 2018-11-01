import { padEnd, groupByLength } from '../utils/string-converters'
import { toHexString } from '../utils/number-converters'
import { PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { CrypteeFile } from '../models/CrypteeFile';

export const decodeFile = (bytes: number[]): CrypteeFile => {
    const paddedHex =  bytes.map(toHexString).join('')
    
    const padding = parseInt(paddedHex.substring(paddedHex.length - 2, paddedHex.length), 16);

    const hex = paddedHex.substring(0, paddedHex.length - 2);
    const padMultiple = Math.ceil(hex.length / PADDING);
    const hexPadded = padEnd(hex, (padMultiple * PADDING), PADDING_CHAR)
    
    return { value: groupByLength(hexPadded, TREZOR_MAX_PAYLOAD_SIZE), padding };
}