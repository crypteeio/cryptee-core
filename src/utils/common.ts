/**
Generates a sequence of integral numbers within a specified range.
@param count The number of sequential integers to generate.
@param start The value of the first integer in the sequence. Starts from 0 in default.
*/
export const range = (count: number, start: number = 0) => [...Array(count).keys()].map(item => item + start)