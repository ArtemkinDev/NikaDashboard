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
    sortItem = [
        {
            text: 'Возрасту',
            data: 'age'
        },
        {
            text: 'Голам',
            data: 'goal'
        },
        {
            text: 'Играм',
            data: 'game'
        },
        {
            text: 'Номеру',
            data: 'number'
        },
        {
            text: 'Позиции',
            data: 'pos'
        },
        {
            text: 'Рейтингу',
            data: 'star'
        }
    ];
    path = 'pos';
    pathText = 'Позиции';

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

    sortTeam(path: string, text: string) {
        this.path = path;
        this.pathText = text;
        return false;
    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
    }

}
