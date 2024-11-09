import { Kurs } from '../kurs.entity.js';
import type { Universitaet } from '../universitaet.entity.js';

export class KursBuilder {
    private id!: number;
    private titel: string | undefined;
    private startDatum: Date | undefined;
    private universitaet: Universitaet | undefined;

    withID(id: number): this {
        this.id = id;
        return this;
    }

    withTitel(titel: string): this {
        this.titel = titel;
        return this;
    }

    withStartDatum(startDatum: Date | undefined): this {
        this.startDatum = startDatum;
        return this;
    }

    withUniversitaet(universitaet: Universitaet | undefined): this {
        this.universitaet = universitaet;
        return this;
    }

    build(): Kurs {
        return new Kurs(
            this.id,
            this.titel!,
            this.startDatum,
            this.universitaet,
        );
    }
}
