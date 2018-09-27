import { AddCalendarComponent } from './add-calendar/add-calendar.component';
import { AddLeagueComponent } from './add-league/add-league.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { EditPlayerComponent } from './edit-player/edit-player.component';

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
        { path: 'add-player', component: AddPlayerComponent },
        { path: 'edit-player', component: EditPlayerComponent },
        { path: 'add-league', component: AddLeagueComponent },
        { path: 'add-calendar', component: AddCalendarComponent },
        { path: '**', redirectTo: 'main' },
    ] },
    { path: '**', component: AdminComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AdminRoutingModule {
}
