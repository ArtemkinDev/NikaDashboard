import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LbdModule } from './lbd/lbd.module';

import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TablesComponent } from './tables/tables.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { TeamComponent } from './team/team.component';
import { ServicesModule } from './_services/services.module';
import { PlayerInfoComponent } from './team/player-info/player-info.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth-guard.guard';
import { TeamSortPipe } from './shared/pipes/team-sort.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        UserComponent,
        TablesComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        UpgradeComponent,
        TeamComponent,
        PlayerInfoComponent,
        AuthComponent,
        TeamSortPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        NavbarModule,
        FooterModule,
        SidebarModule,
        RouterModule,
        AppRoutingModule,
        ReactiveFormsModule,
        LbdModule,
        ServicesModule
    ],
    providers: [AuthGuard],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
