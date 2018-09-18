import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../../model/player.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs';
import { PlayerService } from '../../_services/player.service';

@Component({
    selector: 'app-player-info',
    templateUrl: './player-info.component.html',
    styleUrls: [ './player-info.component.scss' ]
})
export class PlayerInfoComponent implements OnInit, OnDestroy {

    subscr1: Subscription;
    subscr2: Subscription;
    currentPlayer: Player;
    id: number;

    constructor(private service: PlayerService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscr1 = this.route.params.subscribe(params => {
            const number = params[ 'number' ];
            this.subscr2 = this.service.getPlayer(+number).subscribe(data => {
                this.currentPlayer = data;
            });
        });

    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
        this.subscr2.unsubscribe();
    }

}
