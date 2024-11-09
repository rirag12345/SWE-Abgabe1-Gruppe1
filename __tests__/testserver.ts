// Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
// Copyright (C) 2024 - present Philip Neuffer
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import {
    HttpStatus,
    type INestApplication,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Agent } from 'node:https';
import { AppModule } from '../src/app.module.js';
import { config } from '../src/config/app.js';
import { env } from '../src/config/env.js';
import { nodeConfig } from '../src/config/node.js';
import { paths } from '../src/config/paths.js';

export const tokenPath = `${paths.auth}/${paths.token}`;
export const refreshPath = `${paths.auth}/${paths.refresh}`;

export const { host, port } = nodeConfig;

const { httpsOptions } = nodeConfig;

// -----------------------------------------------------------------------------
// T e s t s e r v e r   m i t   H T T P S
// -----------------------------------------------------------------------------
let server: INestApplication;

export const startServer = async () => {
    if (
        env.START_DB_SERVER === 'true' ||
        env.START_DB_SERVER === 'TRUE' ||
        config.test?.startDbServer === true
    ) {
        // TODO: DB-Server muss gestartet werden.
        // console.info('DB-Server muss gestartet werden.');
        // await startDbServer();
    }
    server = await NestFactory.create(AppModule, {
        httpsOptions,
        logger: ['log'],
        // logger: ['debug'],
    });
    server.useGlobalPipes(
        new ValidationPipe({
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    );

    await server.listen(port);
    return server;
};

export const shutdownServer = async () => {
    try {
        await server.close();
    } catch {
        console.warn('Der Server wurde fehlerhaft beendet.');
    }

    if (env.START_DB_SERVER === 'true' || env.START_DB_SERVER === 'TRUE') {
        // TODO: DB-Server muss beendet werden.
        // await shutdownDbServer();
    }
};

// fuer selbst-signierte Zertifikate
export const httpsAgent = new Agent({
    requestCert: true,
    rejectUnauthorized: false,
    ca: httpsOptions.cert as Buffer,
});
