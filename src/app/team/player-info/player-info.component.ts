import { Component, OnInit } from '@angular/core';
import { PlayerRepositoryService } from '../../_services/player.repository';
import { Player } from '../../model/player.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-player-info',
    templateUrl: './player-info.component.html',
    styleUrls: [ './player-info.component.scss' ]
})
export class PlayerInfoComponent implements OnInit {

    currentPlayer: Player;
    id: number;

    constructor(private playerService: PlayerRepositoryService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = +this.route.snapshot.params['id'];
        this.currentPlayer = this.playerService.getPlayer(this.id);
    }

}
