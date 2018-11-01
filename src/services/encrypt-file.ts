import TrezorConnect from 'trezor-connect'
import { BIP49_PATH } from '../constants'
import { CrypteeFile } from '../models/CrypteeFile';

export const encryptFile = async (encodedFile: CrypteeFile, key: string) => {
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