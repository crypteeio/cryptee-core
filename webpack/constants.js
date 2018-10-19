import path from 'path';

export const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'));
export const DIST = path.join(ABSOLUTE_BASE, 'dist/');
export const LIB_NAME = 'CrypteeCore';
export const TS_SRC = path.join(ABSOLUTE_BASE, '/src');
export const NODE_MODULES = path.join(ABSOLUTE_BASE, 'node_modules/');