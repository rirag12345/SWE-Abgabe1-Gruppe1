import {
    Controller,
    Get,
    Headers,
    HttpStatus,
    NotFoundException,
    Param,
    Req,
    Res,
} from '@nestjs/common';
import {
    ApiHeader,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { paths } from '../../config/paths.js';
import { getLogger } from '../../logger/logger.js';
import { UniversitaetReadService } from '../service/universitaet-read.service.js';

// TODO Modell Klassen implementieren

// FIXME MIME-Type sollte application/hal+json sein, sobald HATEOAS implementiert ist
const MIMETYPE = 'application/hal+json';

@Controller(paths.rest)
@ApiTags(`Universität REST API`)
@ApiParam({
    name: `id`,
    description: `Bsp: 1`,
})
@ApiHeader({
    name: 'If-None-Match',
    description: 'Header für bedingte GET-Requests, z.B. "0"',
    required: false,
})
export class UniversitaetGetController {
    readonly #service: UniversitaetReadService;
    readonly #logger = getLogger(UniversitaetGetController.name);

    constructor(service: UniversitaetReadService) {
        this.#service = service;
    }

    @Get()
    @Public()
    @ApiOperation({ summary: 'Suche aller Universitäten' })
    @ApiOkResponse({
        description: 'Eine evtl. leeres Json Array mit Universitäten',
    })
    async get(
        // TODO Query-Parameter für Filterung und Sortierung
        @Req() req: Request,
        @Res() res: Response,
    ) {
        if (req.accepts([MIMETYPE, 'json', 'html']) === false) {
            this.#logger.debug('get: accepted=%o', req.accepted);
            return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
        }

        const universitaeten = await this.#service.findAll();
        this.#logger.debug('get: universitaeten=%o', universitaeten);
        return res.contentType(MIMETYPE).json(universitaeten).send();
    }

    @Get(':id')
    @Public()
    @ApiOperation({ summary: `Suche mit id` })
    @ApiOkResponse({ description: `Die Universität wurde gefunden` })
    @ApiNotFoundResponse({
        description: `Die Universität wurde nicht gefunden`,
    })
    @ApiResponse({
        status: HttpStatus.NOT_MODIFIED,
        description: `Die Universität wurde bereits heruntergeladen`,
    })
    async getById(
        @Param('id') idString: string,
        @Req() req: Request,
        @Headers(`If-None-Match`) version: string | undefined,
        @Res() res: Response,
    ) {
        this.#logger.debug(`getById(id=%s)`, idString);
        const id = Number(idString);
        if (!Number.isInteger(id)) {
            this.#logger.debug('getById(): ID %s ist kein integer', idString);
            throw new NotFoundException(`ID ${idString} ist ungültig`);
        }

        if (req.accepts([MIMETYPE, 'json', 'html']) === false) {
            this.#logger.debug('getById: accepted=%o', req.accepted);
            return res.sendStatus(HttpStatus.NOT_ACCEPTABLE);
        }

        const universitaet = await this.#service.findByID(id);
        if (this.#logger.isLevelEnabled('debug')) {
            this.#logger.debug(
                'getById(): Universität=%s',
                universitaet.toString(),
            );
            this.#logger.debug(`get-ById(): name=%s`, universitaet.name);
        }

        // ETags
        const versionDb = universitaet.version;
        if (version === `"${versionDb}"`) {
            this.#logger.debug('getById: NOT_MODIFIED');
            return res.sendStatus(HttpStatus.NOT_MODIFIED);
        }
        this.#logger.debug('getById: versionDb=%s', versionDb);
        res.header('ETag', `"${versionDb}"`);

        return res.contentType(MIMETYPE).json(universitaet);
    }
}
