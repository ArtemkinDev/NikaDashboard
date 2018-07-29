export class Team {
    constructor (
     public name: string  ,
     public games: number,
     public win: number,
     public draw: number,
     public defeats: number,
     public goalsScored: number,
     public goalsMissing: number,
     public points: number,
     public id?: number
    ) {}
}
