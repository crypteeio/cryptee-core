import { TREZOR_MAX_PAYLOAD_SIZE } from '../constants'
import {  groupByLength } from '../utils/string-converters'

export const decodeText = (text: string) => groupByLength(text, TREZOR_MAX_PAYLOAD_SIZE)