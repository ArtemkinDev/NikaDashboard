export class Team {
    constructor(
        public teamName: string,
        public statistic: TeamStatistic,
        public squad: lPlayer[]
    ) { }
};

export class TeamStatistic {
    constructor(
        public games: number,
        public gamesWon: number,
        public gamesLost: number,
        public gamesDraw: number,
        public goalsScored: number,
        public goalsMissed: number,
        public goalsDifference: number,
        public point: number,
    ) { }
};

export class lPlayer {
    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: number,
        public games: number,
        public goals: number,
        public yCard: number,
        public rCard: number,
    ) {}
};
