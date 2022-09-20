import config from 'config';

/**
 * Class to serve the config variables.
 */
export class Configuration {
    static db = {
        username: config.get<string>('db.username'),
        password: config.get<string>('db.password'),
        name: config.get<string>('db.name'),
        host: config.get<string>('db.host'),
        trustServerCertificate: Boolean(config.get<string>('db.trust-server-certificate'))
    };
    static jwtSecret = config.get<string>('jwt-secret');
    static jwtExp = config.get<string>('jwt-exp');
}

export const validateConfig = () => {
    const db = Configuration.db;
    if (
        !db.username || db.username === "username" ||
        !db.password || db.password === "password" ||
        !db.host || db.host === "host"
    ) {
        return false;
    }

    return true;
}
