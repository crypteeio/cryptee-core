import { BIP49_PATH, PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import TrezorConnect from 'trezor-connect'

export const format = (text: string) => {
    const encoded = text.encodeUnicodeToHex()
    const padding = Math.ceil(encoded.length / PADDING) * PADDING
    const padded = encoded.padEnd(padding, PADDING_CHAR)
    return padded.groupByLength(TREZOR_MAX_PAYLOAD_SIZE)
}

export const encryptText = async (text: string, key: string) => {
    const formattedText = format(text)

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
        encrypted = cipherKeyValueResult.payload.map(item => item.value).join('');
    }
    
    return encrypted;
}