import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { Player } from '../model/player.model';

@Injectable()
export class PlayerRepositoryService {
    private players: Player[];

    constructor(private playerService: PlayerService) {
        this.playerService.getPlayers()
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
