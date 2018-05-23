import { Command, command, metadata, option, Options } from 'clime';
import * as Fs from 'fs';
import * as Path from 'path';

export class DefaultOptions extends Options {
    @option({
        flag: 'v',
        description: 'The version of lxdhub-api',
        toggle: true,
        required: false
    })
    version: boolean = false;
}

@command({
    description: 'lxdhub-dbsync is a CLI-tool to manage the dbsync-script of LXDHub.'
})
export default class DBSyncCommand extends Command {
    @metadata
    async execute(
        options: DefaultOptions
    ) {
        const isVersion = !!options.version;
        if (isVersion) {
            const packageJsonPath = Path.join(__dirname, '../../package.json');
            const packageJsonContent = Fs.readFileSync(packageJsonPath, 'utf8');
            const packageJson = JSON.parse(packageJsonContent);
            return packageJson.version;
        }
        return DBSyncCommand.getHelp();
    }
}
