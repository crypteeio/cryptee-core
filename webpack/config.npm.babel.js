import {
    TS_SRC,
    LIB,
    LIB_NAME,
    NODE_MODULES,
} from './constants';

module.exports = {
    mode: 'production',
    entry: {
        'index': `${TS_SRC}/index.ts`,
    },
    output: {
        path: LIB,
        publicPath: './',
        library: LIB_NAME,
        libraryTarget: 'umd',
        //libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: { configFile: 'tsconfig.npm.json' }
            },
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: [ TS_SRC, NODE_MODULES ],
    },
    performance: {
        hints: false
    },
    plugins: [],
    externals: ['trezor-connect'],
    optimization: {
        minimize: false
    }
}