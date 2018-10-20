import TrezorConnect from 'trezor-connect'
import { BIP49_PATH, PADDING, PADDING_CHAR, TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import { readFileAsync } from '../utils/read-file-async'
import { padEnd, groupByLength } from '../utils/string-converters'
import { toHexString } from '../utils/number-converters'

export const decode = async (file: File) => {
    const byteArray = await readFileAsync(file);
    const paddedHex =  byteArray.map(toHexString).join('')
    
    const padding = parseInt(paddedHex.substring(paddedHex.length - 2, paddedHex.length), 16);

    const hex = paddedHex.substring(0, paddedHex.length - 2);
    const padMultiple = Math.ceil(hex.length / PADDING);
    const hexPadded = padEnd(hex, (padMultiple * PADDING), PADDING_CHAR)
    
    return { value: groupByLength(hexPadded, TREZOR_MAX_PAYLOAD_SIZE), padding };
}

export const decryptFile = async (file: File, key: string) => {
    const decoded = await decode(file);

    // progress total?

    const bundle = decoded.value.map((item, index) => ({
        path: BIP49_PATH,
        key,
        value: item,
        encrypt: false,
        askOnEncrypt: index === 0,
        askOnDecrypt: index === 0
    }))
    
    const cipherKeyValueResult = await TrezorConnect.cipherKeyValue({ bundle })

    let byteArray = [];
    if (cipherKeyValueResult.success) {
        let encrypted = cipherKeyValueResult.payload
        .map(item => item.value)
        .join('');

        if (decoded.padding > 0) {
            encrypted = encrypted.slice(0, encrypted.length - decoded.padding);
        }
        
        for (let i = 0; i < encrypted.length / 2; i++) {
            const byte = parseInt(encrypted.substr(i * 2, 2), 16);
            byteArray.push(byte)          
        }        
    }
    return byteArray;
}