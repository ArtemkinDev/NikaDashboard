import { Component, OnDestroy, OnInit } from '@angular/core';
import { Player } from '../model/player.model';
import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from '../_services/player.service';

@Component({
    selector: 'app-team',
    templateUrl: './team.component.html',
    styleUrls: [ './team.component.scss' ]
})
export class TeamComponent implements OnInit, OnDestroy {

    subscr1: Subscription;
    players: Player[] = [];
    isLoading = false;
    path = 'pos';

    constructor(private service: PlayerService) {
    }

    ngOnInit() {
        this.subscr1 = this.service.getPlayers()
            .subscribe(data => {
                    this.players = data;
                    this.isLoading = true;
                },
                error2 => {
                    console.log(error2);
                });
    }

    filterPath(path: string) {
        this.path = path;
    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
    }

}
