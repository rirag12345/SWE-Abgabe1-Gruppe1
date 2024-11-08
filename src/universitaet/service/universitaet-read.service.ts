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
