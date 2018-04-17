import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerService } from './player.service';
import { PlayerRepositoryService } from './player.repository';

@NgModule({
    imports: [ CommonModule ],
    providers: [ PlayerService, PlayerRepositoryService ]
})

export class ServicesModule {}
