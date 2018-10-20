import { BIP49_PATH, PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import TrezorConnect from 'trezor-connect'
import { encodeUnicodeToHex, padEnd, groupByLength } from '../utils/string-converters'

export const encode = (text: string) => {
    const encoded = encodeUnicodeToHex(text)
    const padding = Math.ceil(encoded.length / PADDING) * PADDING
    const padded = padEnd(encoded, padding, PADDING_CHAR)
    return groupByLength(padded, TREZOR_MAX_PAYLOAD_SIZE)
}

export const encryptText = async (text: string, key: string) => {
    const formattedText = encode(text)

    const bundle = formattedText.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: true,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))

    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let encrypted: string;
    if (cipherKeyValueResult.success) {
        encrypted = cipherKeyValueResult.payload.map(item => item.value).join('')
    }
    
    return encrypted;
}