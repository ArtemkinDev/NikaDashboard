import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Player } from '../model/player.model';
import { Team } from '../model/team.model';

const PROTOCOL = 'http';
const PORT = 3100;

@Injectable()
export class RestDatasource {
    baseUrl: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // Players method
    getPlayers(): Observable<Player[]> {
        return this.http.get<Array<Player>>(this.baseUrl + 'players');
    }

    getPlayer(id: number): Observable<Player> {
        return this.http.get<Player>(this.baseUrl + `players/${id}`);
    }

    // Tournament tables method
    getTeams() {
        return this.http.get<Array<Team>>(this.baseUrl + 'teams');
    }

}
