import { Team } from './team.model';

export class League {
    constructor(
        public season: string,
        public lNumber: number,
        public lTeams: Team[],
        public uid?: string,
    ){}
};