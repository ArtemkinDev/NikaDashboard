import { Component, OnInit } from '@angular/core';
import { PlayerRepositoryService } from '../_services/player.repository';
import { Player } from '../model/player.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
    constructor(private playerService: PlayerRepositoryService) { }

  ngOnInit() {}

  get players(): Player[] {
      return this.playerService.getPlayers();
  }

}
