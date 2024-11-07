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
import type { UniversitaetReadService } from '../service/universitaet-read.service';

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
class UniversitaetGetController {
    readonly #service: UniversitaetReadService;
    readonly #logger = getLogger(UniversitaetGetController.name);

    constructor(service: UniversitaetReadService) {
        this.#service = service;
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
        const result = await this.#service.findByID(id);
        if (this.#logger.isLevelEnabled('debug')) {
            this.#logger.debug('getById(): Universität=%s', result.toString());
            this.#logger.debug(`get-ById(): name=%s`, result.name)
        }
    }
}
