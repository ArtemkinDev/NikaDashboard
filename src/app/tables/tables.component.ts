import { LeagueService } from './../_services/league.service';
import { League } from './../model/league.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { Subscription } from 'rxjs/Subscription';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, OnDestroy {

    public league: League;
    public subscr1: Subscription;
    public isLoading = false;
    public headerRow = [ '№', 'КОМАНДА', 'И', 'В', 'Н', 'П', 'ГЗ','ГП','РМ','О'];

    constructor(private legueService: LeagueService) {
    }

  ngOnInit() {
      this.subscr1 = this.legueService.getLeague()
          .subscribe(data => {
              this.league = data[data.length-1];
              this.isLoading = true;
        });
  }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
    }

}
