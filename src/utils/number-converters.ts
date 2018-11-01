export const toHexString = (value: number) => {    
    if ((0 > value) || (value > 255)) {
        throw new RangeError('Number must be between 0 and 255 inclusive.')
    }
    if (!Number.isInteger(+value)) {
        throw new TypeError('Number must be an integer.')
    }
    return ('0' + (value & 0xFF).toString(16)).slice(-2).toUpperCase()
}