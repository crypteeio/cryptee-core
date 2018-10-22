import fs from 'fs-extra';
import path from 'path';
import packageJSON from '../package.json';

const npm = path.resolve(__dirname, '../npm');

delete packageJSON.devDependencies;
delete packageJSON.scripts;
delete packageJSON.bin;

packageJSON.dependencies = {
    ...packageJSON.dependencies,
    ...packageJSON.npmDependencies
}
delete packageJSON.npmDependencies;

packageJSON.main = "lib/index.js";
fs.writeFileSync(path.resolve(npm, 'package.json'), JSON.stringify(packageJSON, null, '  '), 'utf-8');

fs.copySync( path.resolve(npm, '../README.md'), path.resolve(npm, 'README.md'));
fs.copySync( path.resolve(npm, '../LICENSE'), path.resolve(npm, 'LICENSE'));