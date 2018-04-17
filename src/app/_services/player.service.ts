import { Player } from '../model/player.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

const players: Player[] = [
    {
        'firstName': 'First',
        'lastName': 'Player',
        'login': 'login',
        'password': 'password',
        'year': '19.02.1992',
        number: 7,
        'playerStatistic': {
            matches: 5,
            goals: 2,
            yellowCard: 0,
            redCard: 0,
            totalRating: 4.9,
            lastRating: 4,
        },
        playerImage: 'assets/img/player-avatar.jpg',
        'id': 1
    },
    {
        'firstName': 'Second',
        'lastName': 'Player',
        'login': 'login',
        'password': 'password',
        'year': '19.02.1992',
        number: 33,
        'playerStatistic': {
            matches: 5,
            goals: 2,
            yellowCard: 0,
            redCard: 0,
            totalRating: 5.0,
            lastRating: 4,
        },
        playerImage: 'assets/img/player-avatar.jpg',
        'id': 2
    },
    {
        'firstName': 'Third',
        'lastName': 'Player',
        'login': 'login',
        'password': 'password',
        'year': '19.02.1992',
        number: 7,
        'playerStatistic': {
            matches: 5,
            goals: 2,
            yellowCard: 0,
            redCard: 0,
            totalRating: 7.8,
            lastRating: 4,
        },
        playerImage: 'assets/img/player-avatar.jpg',
        'id': 3
    },
    {
        'firstName': 'Fourth',
        'lastName': 'Player',
        'login': 'login',
        'password': 'password',
        'year': '19.02.1992',
        number: 11,
        'playerStatistic': {
            matches: 5,
            goals: 2,
            yellowCard: 0,
            redCard: 0,
            totalRating: 5.6,
            lastRating: 4,
        },
        playerImage: 'assets/img/player-avatar.jpg',
        'id': 4
    },
    {
        'firstName': 'Fifth',
        'lastName': 'Player',
        'login': 'login',
        'password': 'password',
        'year': '19.02.1990',
        number: 15,
        'playerStatistic': {
            matches: 5,
            goals: 2,
            yellowCard: 0,
            redCard: 0,
            totalRating: 2.6,
            lastRating: 4,
        },
        playerImage: 'assets/img/player-avatar.jpg',
        'id': 5
    },
]

@Injectable()
export class PlayerService {

    getPlayers(): Observable<Player[]> {
        return Observable.from([ players ]);
    }
}
