import * as models from '../models';

import { IDatabaseSettings } from '.';
import { LogService } from '../log/log.service';

/**
 * Returns the database configuration
 * depending on the settings of
 * LXDHubAPI class and the set
 * NODE_ENV environment variable.
 */
export function getOrmConfig(settings?: IDatabaseSettings) {
    let ormConfig;
    const entities = Object.values(models);

    if (process.env.NODE_ENV !== 'test') {
        ormConfig = {
            type: 'postgres',
            host: settings.host,
            port: settings.port,
            username: settings.username,
            password: settings.password,
            database: settings.database,
            entities,
            synchronize: true,
            logging: true,
            logger: new LogService(settings.logLevel)
        };
    } else {
        ormConfig = {
            type: 'sqlite',
            database: './db/test-db.sql',
            entities,
            synchronize: true,
            logging: false,
            logger: new LogService()
        };
    }
    return ormConfig;
}
