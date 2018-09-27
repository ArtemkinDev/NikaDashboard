import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { AdminRoutingModule } from './admin.routing';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EditPlayerComponent } from './edit-player/edit-player.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { AddCalendarComponent } from './add-calendar/add-calendar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule
    ],
    declarations: [ AdminComponent, AddPlayerComponent, EditPlayerComponent, AddLeagueComponent, AddCalendarComponent ],
    exports: [ AdminRoutingModule ]
})
export class AdminModule {
}
