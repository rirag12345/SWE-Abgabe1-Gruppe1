// Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
// Copyright (C) 2024 - present Philip Neuffer
//
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

import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { HttpStatus } from '@nestjs/common';
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { isDate } from 'class-validator';
import type { UniversitaetDTO } from '../../src/universitaet/controller/universitaetDTO.entity.js';
import { UniversitaetReadService } from '../../src/universitaet/service/universitaet-read.service';
import {
    host,
    httpsAgent,
    port,
    shutdownServer,
    startServer,
} from '../testserver.js';

// -----------------------------------------------------------------------------
// T e s t d a t e n
// -----------------------------------------------------------------------------
const neueUniversitaet: UniversitaetDTO = {
    name: 'Technische Universitaet Muenchen',
    standort: 'Muenchen',
    anzahlStudierende: 42_000,
    homepage: 'https://www.tum.de',
    gegruendet: 1868,
    fakultaeten: ['Informatik', 'Maschinenbau', 'Elektrotechnik'],
    ranking: 1,
    bibliothek: {
        name: 'Universitaetsbibliothek',
        isil: 'DE-Mun1',
    },
    kurse: [
        {
            titel: 'Informatik',
            startDatum: isDate('2024-09-11')
                ? new Date('2024-09-11')
                : undefined,
        },
        {
            titel: 'Maschinenbau',
            startDatum: isDate('2023-04-01')
                ? new Date('2023-04-01')
                : undefined,
        },
    ],
};

// TODO Testfälle für Ungültige Universitäten

// -----------------------------------------------------------------------------
// T e s t s
// -----------------------------------------------------------------------------
// Test-Suite
describe('POST /rest', () => {
    let client: AxiosInstance;
    const headers: Record<string, string> = {
        'Content-Type': 'application/json', // eslint-disable-line @typescript-eslint/naming-convention
    };

    // Testserver starten und dabei mit der DB verbinden
    beforeAll(async () => {
        await startServer();
        const baseURL = `https://${host}:${port}`;
        client = axios.create({
            baseURL,
            httpsAgent,
            validateStatus: (status) => status < 500, // eslint-disable-line @typescript-eslint/no-magic-numbers
        });
    });

    afterAll(async () => {
        await shutdownServer();
    });

    test('Neue Universitaet anlegen', async () => {
        // given
        // TODO Keycloak-Token holen
        // const token = await tokenRest(client);
        // headers.Authorization = `Bearer ${token}`;

        // when
        const response: AxiosResponse<string> = await client.post(
            '/rest',
            neueUniversitaet,
            { headers },
        );

        // then
        const { status, data } = response;

        expect(status).toBe(HttpStatus.CREATED);

        const { location } = response.headers as { location: string };

        expect(location).toBeDefined();

        // ID nach dem letzten "/"
        const indexLastSlash: number = location.lastIndexOf('/');

        expect(indexLastSlash).not.toBe(-1);

        const idStr = location.slice(indexLastSlash + 1);

        expect(idStr).toBeDefined();
        expect(UniversitaetReadService.ID_PATTERN.test(idStr)).toBe(true);

        expect(data).toBe('');
    });
});
