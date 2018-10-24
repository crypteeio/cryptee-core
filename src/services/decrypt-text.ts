import TrezorConnect from 'trezor-connect'
import { BIP49_PATH, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { decodeHexToUnicode, groupByLength } from '../utils/string-converters'

export const decode = (text: string) => groupByLength(text, TREZOR_MAX_PAYLOAD_SIZE)

export const decryptText = async (encrypted: string, key: string) => {
    const decoded = decode(encrypted)

    const bundle = decoded.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: false,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))

    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let result: string;
    if (cipherKeyValueResult.success) {
        const text = cipherKeyValueResult.payload.map(item => item.value).join('')
        result = groupByLength(text, 4).map(decodeHexToUnicode).join('')
    }
    
    return result
}