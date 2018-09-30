export class Calendar {
    constructor(
        public tours: Tour[],
        public uid?: string,
    ) { }
};

class Tour {
    constructor(
        public tourNumber: string,
        public matches: Match[],
    ) {

    }
}

class Match {
    constructor(
        public awayTeam: string,
        public homeTeam: string,
        public date: string,
        public time: string,
    ) {}
}