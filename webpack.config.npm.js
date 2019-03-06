var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'index': './src/index.ts',
    },
    output: {
        path: path.join(__dirname, 'npm/lib/'),
        publicPath: './',
        library: 'CrypteeCore',
        libraryTarget: 'umd'
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
        modules: [ './src/index.ts', 'node_modules' ],
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