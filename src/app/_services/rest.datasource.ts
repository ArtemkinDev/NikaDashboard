import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Player } from '../model/player.model';

const PROTOCOL = 'http';
const PORT = 3500;

@Injectable()
export class RestDatasource {
    baseUrl: string;
    auth_token: string;

    constructor(private http: HttpClient) {
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    // Players method
    getPlayers(): Observable<Player[]> {
        return this.http.get<Array<Player>>(this.baseUrl + 'players');
    }

}
