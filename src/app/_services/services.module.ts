import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestDatasource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './player.service';
import { UploadService } from './upload.service';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AuthService } from './auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
    imports: [ CommonModule, AngularFireAuthModule, AngularFireDatabaseModule, HttpClientModule ],
    providers: [ RestDatasource, PlayerService, UploadService, AuthService ]
})

export class ServicesModule {}
