
/**
 * Ein Objekt dieser Klasse enthält eine von Firebase ausgelesene Notiz.
 */
export class Notiz {

    constructor(public titel: string,
                public inhalt: string,
                public zeitstempel: number) {}


    /**
     * Datum der Erzeugung der Notiz, 13.6.2021.
     *
     * @returns Datum zum Anzeigen.
     */
    public getDatumZeitErzeugung(): string {

        const date = new Date(this.zeitstempel);

        const tag   = date.getDate();
        const monat = date.getMonth() + 1;
        const jahr  = date.getFullYear();

        return `${tag}.${monat}.${jahr}`;
    }
}
