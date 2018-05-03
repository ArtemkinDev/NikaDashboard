import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerRepositoryService } from './player.repository';
import { RestDatasource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [ CommonModule, HttpClientModule ],
    providers: [ RestDatasource, PlayerRepositoryService ]
})

export class ServicesModule {}
