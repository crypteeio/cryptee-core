declare interface String {
    groupByLength(length: number): string[];
    encodeUnicodeToHex(): string;
    decodeHexToUnicode(): string;
    padEnd(count: number, char: string): string;
}

String.prototype.groupByLength = function (this: string, length: number) {
    const groups = this.match(new RegExp(`([a-z0-9]){${length}}|([a-z0-9]){1,}`, 'gi'))
    const range = Math.ceil(this.length / length)
    return [...Array(range).keys()].map(index => groups[index])
};

String.prototype.encodeUnicodeToHex = function (this: string) {
    let result = "";
    [...Array(this.length).keys()].forEach(index => {
        const hexCharCode = this.charCodeAt(index).toString(16)
        result += ("000" + hexCharCode).slice(-4)
    })
    return result
}

String.prototype.decodeHexToUnicode = function (this: string) {
    const groups = this.match(/[a-z0-9]{1,4}/gi) || [];
    return [...Array(groups.length).keys()]
        .map(index => String.fromCharCode(parseInt(groups[index], 16)))
        .join('')
}

String.prototype.padEnd = function (this: string, count: number, char: string) {
    return this + [...Array(count - this.length).keys()].map(() => char).join('')
}