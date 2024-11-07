import { NotFoundException } from '@nestjs/common';
import { mockDB } from '../../DB/mock-db';
import { getLogger } from '../../logger/logger.js';

export class UniversitaetReadService {
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

    async findByID(id: number) {
        this.#logger.debug('FindByID(%d)', id);
        // FIXME Nur für mocking sollte durch echten asynchronen aufruf ersetzt werden, sobnald echte DB vorhanden
        // eslint-disable-next-line @typescript-eslint/await-thenable
        const result = await mockDB.find(
            (universitaet) => universitaet.id === id,
        );
        if (result === undefined) {
            throw new NotFoundException('Die Universität wurde nicht gefunden');
        }
        this.#logger.debug('FindByID(%d) => %o', id, result);
        return result;
    }
}
