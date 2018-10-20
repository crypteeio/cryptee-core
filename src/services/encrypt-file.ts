import TrezorConnect from 'trezor-connect'
import { BIP49_PATH, PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { readFileAsync } from '../utils/read-file-async'
import { padEnd, groupByLength } from '../utils/string-converters'
import { toHexString } from '../utils/number-converters'

export const encode = async (file: File) => {
    const byteArray = await readFileAsync(file);
    const hexString = byteArray.map(toHexString).join('')

    const padMultiple = Math.ceil(hexString.length / PADDING);
    const hexPadded = padEnd(hexString, (padMultiple * PADDING), PADDING_CHAR);
    const zeroPaddingLength = hexString.length % PADDING
    
    return { value: groupByLength(hexPadded, TREZOR_MAX_PAYLOAD_SIZE), padding: zeroPaddingLength > 0 ? (PADDING - zeroPaddingLength) : 0 }
}

export const encryptFile = async (file: File, key: string) => {
    const encodedFile = await encode(file)

    // progress total?
    const bundle = encodedFile.value.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: true,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))

    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    const byteArray = []
    if (cipherKeyValueResult.success) {
        const encrypted = cipherKeyValueResult.payload.map(item => item.value).join('')
        for (var i = 0; i < encrypted.length / 2; i++) {
            const byte = parseInt(encrypted.substr(i * 2, 2), 16)
            byteArray.push(byte)
        }
    }
    byteArray.push(encodedFile.padding);
    return byteArray;
}