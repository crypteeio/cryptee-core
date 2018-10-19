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

interface CipherKeyValueOutputPayload {
    value: string
}

interface CipherKeyValueOutput {
    success: boolean
    payload: CipherKeyValueOutputPayload[]
}

interface TrezorConnect {
    cipherKeyValue: (input: CipherKeyValueInput) => CipherKeyValueOutput
}

declare module 'trezor-connect' {
    let TrezorConnect: TrezorConnect;
    export default TrezorConnect;
  }