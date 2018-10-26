import TrezorConnect from 'trezor-connect'
import { BIP49_PATH } from '../constants'
import { CrypteeFile } from '../models/CrypteeFile';

export const decryptFile = async (decodedFile: CrypteeFile, key: string) => {
    // progress total?

    const bundle = decodedFile.value.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: false,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))
    
    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let result = [];
    if (cipherKeyValueResult.success) {
        let encrypted = cipherKeyValueResult.payload
        .map(item => item.value)
        .join('');

        if (decodedFile.padding > 0) {
            encrypted = encrypted.slice(0, encrypted.length - decodedFile.padding);
        }
        
        for (let i = 0; i < encrypted.length / 2; i++) {
            const byte = parseInt(encrypted.substr(i * 2, 2), 16);
            result.push(byte)          
        }        
    }
    return result;
}