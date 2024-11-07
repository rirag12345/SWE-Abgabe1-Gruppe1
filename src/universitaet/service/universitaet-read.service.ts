import { mockDB } from '../../DB/mock-db';
import { getLogger } from '../../logger/logger.js';

export class UniversitaetReadServie {
    readonly #logger = getLogger(UniversitaetReadServie.name);

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

    async FindByID(id: number) {
        this.#logger.debug('FindByID(%d)', id);
        const result = await mockDB.filter((id) => {
            id === this.id
        })
    }
}
