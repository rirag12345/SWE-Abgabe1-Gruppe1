// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable max-classes-per-file */
import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Das Modul besteht aus Klassen für die Fehlerbehandlung von universitäten.
 * @packageDocumentation
 */

/**
 * Exception, die geworfen wird, wenn eine Universität mit einem bestimmten Namen bereits existiert.
 */
export class NameExistsException extends HttpException {
    constructor(readonly universityName: string) {
        super(
            `Universität ${universityName} existiert bereits`,
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}

/**
 * Exception-Klasse für eine ungültige Versionsnummer beim Ändern.
 */
export class VersionInvalidException extends HttpException {
    constructor(readonly version: string | undefined) {
        super(
            `Die Versionsnummer ${version} ist ungueltig.`,
            HttpStatus.PRECONDITION_FAILED,
        );
    }
}

/**
 * Exception-Klasse für eine veraltete Versionsnummer beim Ändern.
 */
export class VersionOutdatedException extends HttpException {
    constructor(readonly version: number) {
        super(
            `Die Versionsnummer ${version} ist nicht aktuell.`,
            HttpStatus.PRECONDITION_FAILED,
        );
    }
}
