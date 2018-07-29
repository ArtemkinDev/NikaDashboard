import { Pipe, PipeTransform } from '@angular/core';
import { Player } from '../../model/player.model';

@Pipe({
  name: 'teamSort'
})
export class TeamSortPipe implements PipeTransform {

  transform(team: Player[], path: string): Player[] {

      if (!team || !path) {
        return team;
      };

      if (path === 'age') {
        return team.sort((a, b) => {
          return a.age - b.age;
          });
      } else if (path === 'goal') {
          return team.sort((a, b) => {
              return a.playerStatistic.goals - b.playerStatistic.goals;
          });
      } else if (path === 'game') {
          return team.sort((a, b) => {
              return a.playerStatistic.matches - b.playerStatistic.matches;
          });
      } else if (path === 'number') {
          return team.sort((a, b) => {
              return a.number - b.number;
          });
      } else if (path === 'pos') {
          console.log('pos');
          return team.sort((a, b) => {
              let a1, b1;

              switch (a.position) {
                  case 'вратарь':
                      a1 = 0;
                      break;
                  case 'защитник':
                      a1 = 1;
                      break;
                  case 'нападающий':
                      a1 = 2;
                      break;
              }

              switch (b.position) {
                  case 'вратарь':
                      b1 = 0;
                      break;
                  case 'защитник':
                      b1 = 1;
                      break;
                  case 'нападающий':
                      b1 = 2;
                      break;
              }

              return a1 - b1;
          });
      } else if (path === 'star') {
          return team.sort((a, b) => {
              return a.playerStatistic.totalRating - b.playerStatistic.totalRating;
          });
      } else {
          return team;
      }
  }

}
