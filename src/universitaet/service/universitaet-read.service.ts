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

// FIXME Mock Datenbank durch echte Datenbank ersetzen
// TODO anbindung an Datenbank über TypeORM implementieren.
/**
 * Das Modul besteht aus der Klasse {@linkcode UniversitaetReadService}
 * @packageDocumentation
 */
import { Injectable, NotFoundException } from '@nestjs/common';
import { mockDB } from '../../DB/mock-db.js';
import { getLogger } from '../../logger/logger.js';

@Injectable()
export class UniversitaetReadService {
    static readonly ID_PATTERN = /^[1-9]\d{0,10}$/u;

    readonly #logger = getLogger(UniversitaetReadService.name);

    /**
     * Alle Universitaeten asynchron suchen.
     * @returns Alle Universitaeten oder ein leeres Array
     */
    async findAll() {
        this.#logger.debug('findAll()');
        // FIXME Nur für mocking sollte durch echten asynchronen aufruf ersetzt werden, sobnald echte DB vorhanden
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const result = await mockDB;
        this.#logger.debug('findAll() => %o', result);
        return result;
    }

    /**
     * Eine Universität asynchron anhand der Id suchen.
     * @param id die ID der Universität
     * @returns Die gefundene Universität in einem Promise
     * @throws NotFoundException wenn die Universität nicht gefunden wurde
     */
    async findByID(id: number) {
        this.#logger.debug('FindByID(%d)', id);

        // FIXME Nur für mocking sollte durch echten asynchronen aufruf ersetzt werden, sobnald echte DB vorhanden
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const result = await mockDB.find(
            (universitaet) => universitaet.id === id,
        );

        // FIXME: Muss an QueryBuilder angepasst werden sobald die DB läuft
        if (result === undefined) {
            throw new NotFoundException('Die Universität wurde nicht gefunden');
        }

        if (this.#logger.isLevelEnabled('debug')) {
            this.#logger.debug(
                'FindByID(%s) => %o',
                result.toString,
                result.name,
            );
        }
        return result;
    }
}
