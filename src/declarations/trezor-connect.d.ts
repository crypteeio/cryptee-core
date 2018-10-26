interface CipherKeyValueItem {
    path: string,
    key: string,
    value: string,
    encrypt: boolean,
    askOnEncrypt: boolean,
    askOnDecrypt: boolean
}

interface CipherKeyValueBundle {
    bundle: CipherKeyValueItem[]
}

type CipherKeyValueInput = CipherKeyValueItem | CipherKeyValueBundle

type CipheredKeyValue = {
    value: string,
}

type Unsuccessful = {
    success: false,
    payload: {
        error: string,
    }
}

type CipherKeyValueItemOutput = {
    success: true,
    payload: CipheredKeyValue,
} | Unsuccessful

type CipherKeyValueBundleOutput = {
    success: true,
    payload: CipheredKeyValue[],
} | Unsuccessful

declare function CipherKeyValue(input: CipherKeyValueItem): CipherKeyValueItemOutput
declare function CipherKeyValue(input: CipherKeyValueBundle): CipherKeyValueBundleOutput

interface TrezorConnect {   
    cipherKeyValue: typeof CipherKeyValue
}

declare module 'trezor-connect' {
    let TrezorConnect: TrezorConnect;
    export default TrezorConnect;
  }