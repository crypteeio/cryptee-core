import { BIP49_PATH } from '../constants'
import TrezorConnect from 'trezor-connect'

export const encryptText = async (encodedText: string[], key: string) => {
    const bundle = encodedText.map((item, index) => ({
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