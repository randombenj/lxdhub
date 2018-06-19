import { LogType } from '@lxdhub/common';

export interface IDatabaseSettings {
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
    logLevel?: LogType;
}
