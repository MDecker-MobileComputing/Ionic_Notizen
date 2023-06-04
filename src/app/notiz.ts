
/**
 * Ein Objekt dieser Klasse repräsentiert eine von Firebase ausgelesene Notiz.
 */
export class Notiz {

    constructor(public id: string,
                public titel: string,
                public inhalt: string,
                public zeitstempel: number) {}
    
}
