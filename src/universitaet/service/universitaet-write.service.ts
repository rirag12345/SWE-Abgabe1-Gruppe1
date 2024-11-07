import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getLogger } from '../../logger/logger.js';
import { Universitaet } from '../entity/universitaet.entity.js';
import { NameExistsException } from './exceptions.js';
import { UniversitaetReadService } from './universitaet-read.service.js';

// TODO Herausfinden ob EmailService gebraucht wird, falls ja hinzufügen
/**
 * Die Klasse `UniversitaetWriteService` stellt die Geschäftslogik
 * für das Schreiben von Universitäten bereit und greift mittels TypeORM aud die Datenbank zu.
 */
@Injectable()
export class UniversitaetWriteService {
    private static readonly VERSION_PATTERN = /^"\d{1,3}"/u;

    readonly #repo: Repository<Universitaet>;

    // FIXME: Entfernen, wenn update implementiert ist
    // eslint-disable-next-line no-unused-private-class-members
    readonly #readService: UniversitaetReadService;

    readonly #logger = getLogger(UniversitaetWriteService.name);

    constructor(
        @InjectRepository(Universitaet) repo: Repository<Universitaet>,
        readService: UniversitaetReadService,
    ) {
        this.#repo = repo;
        this.#readService = readService;
    }

    /**
     * Eine neue Universität anlegen.
     * @param universitaet - Die anzulegende Universität.
     * @returns Die ID der angelegten Universität.
     * @throws NameExistsException - Wenn der Name der Universität bereits existiert.
     */
    async create(universitaet: Universitaet): Promise<number> {
        this.#logger.debug(`create: universitaet=%o`, universitaet);
        await this.#validateCreate(universitaet);

        const universitaetDb = await this.#repo.save(universitaet);
        this.#logger.debug(`create: UniversitaetDb=%o`, universitaetDb);

        return universitaetDb.id!;
    }

    async #validateCreate({ name }: Universitaet): Promise<void> {
        this.#logger.debug(`#validateCreation: name=%s`, name);
        if (await this.#repo.existsBy({ name })) {
            throw new NameExistsException(
                `Universität ${name} existiert bereits`,
            );
        }
    }
}
