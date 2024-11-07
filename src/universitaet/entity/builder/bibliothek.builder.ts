import { Bibliothek } from '../bibliothek.entity.js';
import type { Universitaet } from '../universitaet.entity.js';

export class BibliothekBuilder {
    private id!: number;
    private name: string | undefined;
    private isil: string | undefined;
    private universitaet: Universitaet | undefined;

    withId(id: number): this {
        this.id = id;
        return this;
    }

    withName(name: string): this {
        this.name = name;
        return this;
    }

    withIsil(isil: string | undefined): this {
        this.isil = isil;
        return this;
    }

    withUniversitaet(universitaet: Universitaet | undefined): this {
        this.universitaet = universitaet;
        return this;
    }

    build(): Bibliothek {
        return new Bibliothek(
            this.id,
            this.name!,
            this.isil,
            this.universitaet,
        );
    }
}
