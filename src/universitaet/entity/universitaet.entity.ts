// Copyright (C) 2016 - present Juergen Zimmermann, Hochschule Karlsruhe
// Copyright (C) 2024 - present Felix Jaeger
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    VersionColumn,
} from 'typeorm';
import { Bibliothek } from './bibliothek.entity.js';
import { Kurs } from './kurs.entity.js';

// Universität Entity
@Entity()
export class Universitaet {
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @VersionColumn()
    readonly version: number | undefined;

    @Column()
    @ApiProperty({ example: 'Technische Universitaet Muenchen', type: String })
    readonly name!: string;

    @Column('varchar')
    @ApiProperty({ example: 'Muenchen', type: String })
    readonly standort: string | undefined;

    @Column('int')
    @ApiProperty({ example: 42_000, type: Number })
    readonly anzahlStudierende: number | undefined;

    @Column('varchar')
    @ApiProperty({ example: 'https://www.tum.de', type: String })
    readonly homepage: string | undefined;

    @Column('int')
    @ApiProperty({ example: 1868, type: Number })
    readonly gegruendet: number | undefined;

    @Column('simple-array')
    @ApiProperty({
        example: ['Informatik', 'Maschinenbau', 'Elektrotechnik'],
        type: [String],
    })
    readonly fakultaeten: string[] | null | undefined;

    @Column('int')
    @ApiProperty({ example: 1, type: Number })
    readonly ranking: number | undefined;

    @OneToOne(() => Bibliothek, (bibliothek) => bibliothek.universitaet, {
        cascade: ['insert', 'remove'],
    })
    @JoinColumn({ name: 'bibliothek_id' })
    readonly bibliothek: Bibliothek | undefined;

    @OneToMany(() => Kurs, (kurs) => kurs.universitaet, {
        cascade: ['insert', 'remove'],
    })
    readonly kurse: Kurs[] | undefined;

    @CreateDateColumn({ type: 'timestamp' })
    readonly erzeugt: Date | undefined;

    @UpdateDateColumn({ type: 'timestamp' })
    readonly aktualisiert: Date | undefined;

    // FIXME kann später weg, nur für DB mocking
    // eslint-disable-next-line max-params
    constructor(
        id: number,
        version: number | undefined,
        name: string,
        standort: string | undefined,
        anzahlStudierende: number | undefined,
        homepage: string | undefined,
        gegruendet: number | undefined,
        fakultaeten: string[] | null | undefined,
        ranking: number | undefined,
        kurse: Kurs[] | undefined,
        bibliothek: Bibliothek | undefined,
    ) {
        this.id = id;
        this.version = version;
        this.name = name;
        this.standort = standort;
        this.anzahlStudierende = anzahlStudierende;
        this.homepage = homepage;
        this.gegruendet = gegruendet;
        this.fakultaeten = fakultaeten;
        this.ranking = ranking;
        this.kurse = kurse;
        this.bibliothek = bibliothek;
    }

    public toString = (): string =>
        JSON.stringify({
            id: this.id,
            version: this.version,
            name: this.name,
            standort: this.standort,
            anzahlStudierende: this.anzahlStudierende,
            homepage: this.homepage,
            gegruendet: this.gegruendet,
            fakultaeten: this.fakultaeten,
            ranking: this.ranking,
            erzeugt: this.erzeugt,
            aktualisiert: this.aktualisiert,
        });
}
