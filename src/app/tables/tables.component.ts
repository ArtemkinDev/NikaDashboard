import { Component, OnDestroy, OnInit } from '@angular/core';
import { Team } from '../model/team.model';
import { RestDatasource } from '../_services/rest.datasource';
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
    public headerRow: Array<string> = [];
    /*public teams: Team[] = [];*/
    public subscr1: Subscription;

    constructor(private service: RestDatasource) {
    }

  ngOnInit() {
      this.headerRow = [ '№', 'КОМАНДА', 'И', 'В', 'Н', 'П', '+:-', 'О'];
      /*this.subscr1 = this.service.getTeams()
          .subscribe(data => {
              /!*this.teams = data;*!/
          });*/
  }

    ngOnDestroy() {
        /*this.subscr1.unsubscribe();*/
    }

}
