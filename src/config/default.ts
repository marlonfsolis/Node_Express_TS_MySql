import {resolve} from 'path';

const __basedir = resolve('.');

const config = {
    "port": 3000,
    "db": {
        "username": "username",
        "password": "password",
        "name": "node-express-ts",
        "host": "host",
        "trust-server-certificate": true
    },
    "jwt-secret": "Do not tell any body.",
    "jwt-exp": "1h",
    "path": {
        "basedir": __basedir
    }
};

export default config;
