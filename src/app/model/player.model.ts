export class Player {
    constructor (
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public yearOfBirth: number,
        public monthOfBirth: string,
        public dayOfBirth: string,
        public age: number,
        public number: number,
        public position: string,
        public playerStatistic: PlayerStatistic,
        public playerImage: string,
        public id?: string | number,
        public uid?: string
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