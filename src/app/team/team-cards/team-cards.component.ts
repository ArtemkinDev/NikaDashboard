import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../../model/player.model';

@Component({
  selector: 'app-team-cards',
  templateUrl: './team-cards.component.html',
  styleUrls: ['./team-cards.component.scss']
})
export class TeamCardsComponent implements OnInit {

  @Input() players: Player[] = [];
  @Input() path: string;

  constructor() { }

  ngOnInit() {
  }

}
