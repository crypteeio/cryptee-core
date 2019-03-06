var path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        'index': `./src/index.ts`,
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.join(__dirname, 'dist'),
        publicPath: './',
        library: 'CrypteeCore',
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