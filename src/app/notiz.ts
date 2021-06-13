
/**
 * Ein Objekt dieser Klasse enthält eine von Firebase ausgelesene Notiz.
 */
export class Notiz {

    constructor(public titel: string,
                public inhalt: string,
                public zeitstempel: number) {}


    /**
     * Datum der Erzeugung der Notiz, z.B "13.6.2021, 13:06 Uhr".
     *
     * @returns Datum zum Anzeigen.
     */
    public getDatumZeitErzeugung(): string {

        const date = new Date(this.zeitstempel);

        const tag   = date.getDate();
        const monat = date.getMonth() + 1;
        const jahr  = date.getFullYear();

        const stunde = date.getHours();
        const minute = date.getMinutes();
        const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;

        return `${tag}.${monat}.${jahr}, ${stunde}:${minuteStr} Uhr`;
    }
}
