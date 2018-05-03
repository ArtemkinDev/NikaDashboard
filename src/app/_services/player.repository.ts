import { Injectable } from '@angular/core';
import { Player } from '../model/player.model';
import { RestDatasource } from './rest.datasource';

@Injectable()
export class PlayerRepositoryService {
    private players: Player[];

    constructor(private service: RestDatasource) {
        this.service.getPlayers()
            .subscribe(data => {
                this.players = data;
            });
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getPlayer(id: number): Player {
        return this.players.find(p => p.id === id);
    }
}
