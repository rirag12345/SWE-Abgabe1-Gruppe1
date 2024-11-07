import { mockDB } from '../../DB/mock-db';
import { getLogger } from '../../logger/logger.js';
import type { Universitaet } from '../entity/universitaet.entity';

export class UniversitaetReadServie {
    readonly #logger = getLogger(UniversitaetReadServie.name);

    /**
     * Alle Universitaeten suchen.
     * @returns Alle Universitaeten oder ein leeres Array
     */
    findAll(): Universitaet[] {
        this.#logger.debug('findAll()');
        const result = mockDB;
        this.#logger.debug('findAll() => %o', result);
        return result;
    }
}
