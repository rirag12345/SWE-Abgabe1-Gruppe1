// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { BibliothekBuilder } from '../universitaet/entity/builder/bibliothek.builder.js';
import { KursBuilder } from '../universitaet/entity/builder/kurs.builder.js';
import { UniversitaetBuilder } from '../universitaet/entity/builder/universitaet.builder.js';
import type { Universitaet } from '../universitaet/entity/universitaet.entity.js';

export const mockDB: Universitaet[] = [
    new UniversitaetBuilder()
        .withID(1)
        .withVersion(1)
        .withName('Technische Universitaet Muenchen')
        .withStandort('Muenchen')
        .withAnzahlStudierende(42_000)
        .withHomepage('https://www.tum.de')
        .withGegruendet(1868)
        .withFakultaeten(['Informatik', 'Maschinenbau', 'Elektrotechnik'])
        .withRanking(1)
        .withKurse([
            new KursBuilder()
                .withID(1)
                .withTitel('Einfuehrung in die Informatik')
                .withStartDatum(new Date('2023-04-01'))
                .build(),
            new KursBuilder()
                .withID(2)
                .withTitel('Medizinische Grundlagen')
                .withStartDatum(new Date('2023-05-01'))
                .build(),
        ])
        .withBibliothek(
            new BibliothekBuilder()
                .withId(1)
                .withName('Universitaetsbibliothek')
                .withIsil('DE-Mun1')
                .build(),
        )
        .build(),
    new UniversitaetBuilder()
        .withID(2)
        .withVersion(2)
        .withName('Universitaet Heidelberg')
        .withStandort('Heidelberg')
        .withAnzahlStudierende(30_000)
        .withHomepage('https://www.uni-heidelberg.de')
        .withGegruendet(1386)
        .withFakultaeten(['Medizin', 'Philosophie', 'Rechtswissenschaft'])
        .withRanking(2)
        .withKurse([
            new KursBuilder()
                .withID(3)
                .withTitel('Einfuehrung in die Informatik')
                .withStartDatum(new Date('2023-04-01'))
                .build(),
            new KursBuilder()
                .withID(4)
                .withTitel('Medizinische Grundlagen')
                .withStartDatum(new Date('2023-05-01'))
                .build(),
        ])
        .withBibliothek(
            new BibliothekBuilder()
                .withId(2)
                .withName('Universitaetsbibliothek Heidelberg')
                .withIsil('DE-Hd1')
                .build(),
        )
        .build(),
];
