export class Player {
    constructor (
        public firstName: string,
        public lastName: string,
        public login: string,
        public password: string,
        public year: string,
        public number: number,
        public playerStatistic: PlayerStatistic,
        public playerImage: string,
        public id?: number
    ) {
    }
}

export class PlayerStatistic {
    constructor (
        public matches: number,
        public goals: number,
        public yellowCard: number,
        public redCard: number,
        public totalRating: number,
        public lastRating: number,
    ) {
    }
}