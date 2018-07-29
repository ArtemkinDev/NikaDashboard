import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../model/user.model';
import { Subscription } from 'rxjs/Subscription';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}


export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Главная', icon: 'pe-7s-home', class: '' },
    { path: 'team', title: 'Команда', icon: 'pe-7s-users', class: '' },
    { path: 'user', title: 'Мой профиль', icon: 'pe-7s-id', class: '' },
    { path: 'table', title: 'Турнирная таблица', icon: 'pe-7s-note2', class: '' },
    { path: 'typography', title: 'События', icon: 'pe-7s-news-paper', class: '' },
    { path: 'icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
    { path: 'notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' }
];

export const AdminRoutes = [
    { path: 'admin', title: 'Админ панель', icon: 'pe-7s-news-paper', class: '', role: 'admin' }
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: [ './sidebar.component.scss' ]
})
export class SidebarComponent implements OnInit, OnDestroy {
    menuItems: any[];
    adminMenuItems: any[];
    currentUser: User;
    sub1: Subscription;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.adminMenuItems = AdminRoutes.filter(menuItem => menuItem);
        this.sub1 = this.authService.user.subscribe((u) => {
            this.currentUser = u;
        });
    }

    isMobileMenu() {
        if ( $(window).width() > 991 ) {
            return false;
        }
        return true;
    };

    isAdmin() {
        if ( !this.currentUser ) {
            return false;
        } else {
            return this.currentUser.roles.admin;
        }
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }
}
