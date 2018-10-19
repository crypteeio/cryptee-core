import {
    DIST,
    LIB_NAME,
    TS_SRC,
    NODE_MODULES
} from './constants';
import path from "path";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

module.exports = {
    mode: 'production',
    entry: {
        'cryptee-core': `${TS_SRC}/index.ts`
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: DIST,
        publicPath: './',
        library: LIB_NAME,
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: { configFile: 'tsconfig.prod.json' }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ TS_SRC, NODE_MODULES ]
    },
    externals: ['trezor-connect']
}