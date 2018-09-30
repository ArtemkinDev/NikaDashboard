import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-filter',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.scss']
})
export class TeamFilterComponent implements OnInit {

  @Output() fileredData = new EventEmitter();

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

  constructor() { }

  ngOnInit() {
  }

  sortTeam(path: string, text: string) {
    this.path = path;
    this.pathText = text;
    this.fileredData.emit(path);
    return false;
}

}
