import { LeagueService } from './../../_services/league.service';
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
    subscr3: Subscription;
    currentPlayer: Player;
    currentSeason;
    id: number;

    constructor(private service: PlayerService,
                private route: ActivatedRoute,
                private legueService: LeagueService) {
    }

    ngOnInit() {
        this.subscr1 = this.route.params.subscribe(params => {
            const number = params[ 'number' ];
            this.subscr2 = this.service.getPlayer(+number).subscribe(data => {
                this.currentPlayer = data;
            });
            this.subscr3 = this.legueService.getLeague()
            .subscribe(data => {
                const league = data[data.length - 1];
                this.currentSeason = league.season;
            });
        });

    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
        this.subscr2.unsubscribe();
        this.subscr3.unsubscribe();
    }

}
