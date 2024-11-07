import type { Bibliothek } from '../bibliothek.entity.js';
import type { Kurs } from '../kurs.entity.js';
import { Universitaet } from '../universitaet.entity.js';

export class UniversitaetBuilder {
    private id!: number;
    private version: number | undefined;
    private name: string | undefined;
    private standort: string | undefined;
    private anzahlStudierende: number | undefined;
    private homepage: string | undefined;
    private gegruendet: number | undefined;
    private fakultaeten: string[] | null | undefined;
    private ranking: number | undefined;
    private kurse: Kurs[] | undefined;
    private bibliothek: Bibliothek | undefined;

    withID(id: number): this {
        this.id = id;
        return this;
    }

    withVersion(version: number | undefined): this {
        this.version = version;
        return this;
    }

    withName(name: string): this {
        this.name = name;
        return this;
    }

    withStandort(standort: string | undefined): this {
        this.standort = standort;
        return this;
    }

    withAnzahlStudierende(anzahlStudierende: number | undefined): this {
        this.anzahlStudierende = anzahlStudierende;
        return this;
    }

    withHomepage(homepage: string | undefined): this {
        this.homepage = homepage;
        return this;
    }

    withGegruendet(gegruendet: number | undefined): this {
        this.gegruendet = gegruendet;
        return this;
    }

    withFakultaeten(fakultaeten: string[] | null | undefined): this {
        this.fakultaeten = fakultaeten;
        return this;
    }

    withRanking(ranking: number | undefined): this {
        this.ranking = ranking;
        return this;
    }

    withKurse(kurse: Kurs[] | undefined): this {
        this.kurse = kurse;
        return this;
    }

    withBibliothek(bibliothek: Bibliothek | undefined): this {
        this.bibliothek = bibliothek;
        return this;
    }

    build(): Universitaet {
        return new Universitaet(
            this.id,
            this.version,
            this.name!,
            this.standort,
            this.anzahlStudierende,
            this.homepage,
            this.gegruendet,
            this.fakultaeten,
            this.ranking,
            this.kurse,
            this.bibliothek,
        );
    }
}
