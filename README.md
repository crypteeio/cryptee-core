# cryptee-core version 1.0.8
Library for data encryption using Trezor.

![](https://travis-ci.com/LukasRada/cryptee-core.svg?branch=master)

[![Coverage Status](https://coveralls.io/repos/github/LukasRada/cryptee-core/badge.svg?branch=master)](https://coveralls.io/github/LukasRada/cryptee-core?branch=master)

## Attention
trezor-connect since version 7 requires to invoke before any trezor-connect method used:
```
TrezorConnect.manifest({
    email: 'developer@xyz.com',
    appUrl: 'http://your.application.com'
})

more at:
https://github.com/trezor/connect/blob/develop/docs/index.md
```