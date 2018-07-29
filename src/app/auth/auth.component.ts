import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { User } from '../model/user.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare var $: any;

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: [ './auth.component.scss' ]
})
export class AuthComponent implements OnInit, OnDestroy {

    form: FormGroup;
    currentUser: User;
    authMsg;
    sub1: Subscription;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        this.createForm();
        this.sub1 = this.authService.user.subscribe((u) => {
            this.currentUser = u;
        });
    }

    createForm() {
        this.form = new FormGroup({
            'email': new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
            ]),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ])
        });
    }

    validatorMessages(fieldtype: string): string | boolean {
        const form = this.form;

        if ( !form || !form.invalid ) {
            return false;
        }

        let error: string;

        if ( fieldtype === 'email' ) {
            if ( form.get('email')[ 'errors' ][ 'required' ] ) {
                error = 'Введите email';
            } else if ( form.get('email')[ 'errors' ][ 'pattern' ] ) {
                error = 'Неправильно введен email';
            }
        } else if ( fieldtype === 'password' ) {
            if ( form.get('password')[ 'errors' ][ 'required' ] ) {
                error = 'Введите пароль';
            } else if ( form.get('password')[ 'errors' ][ 'minlength' ] ) {
                error = 'Минимальное количество символов - 6';
            }
        }
        ;

        return error;
    }

    onSubmit() {
        const form = this.form;
        const formData = form.value;

        if ( this.form.valid ) {
            const email = formData.email;
            const pass = formData.password;

            this.authService.signIn(email, pass)
                .then(() => {
                   this.authMsg = 'Добро пожаловать!!';
                   this.showNotification('top', 'center', 'success');
                   this.form.reset();
                    this.authMsg = '';
                })
                .catch(_error => {

                    if (_error.code === 'auth/user-not-found') {
                        this.authMsg = 'Такого пользователя незарегестрировано!';
                    } else if (_error.code === 'auth/wrong-password') {
                        this.authMsg = 'Неверный пароль!';
                    }
                    this.showNotification('top', 'center', 'danger');
                });
            ;
        } else {
            Object.keys(form.controls).forEach(field => { // {1}
                const control = form.get(field);            // {2}
                control.markAsTouched({ onlySelf: true });       // {3}
            });
        }
    }

    signOut() {
       this.authService.signOut();
        this.form.reset();
    }

    showNotification(from, align, type) {

        $.notify({
            icon: 'pe-7s-gift',
            message: this.authMsg
        }, {
            type: type,
            timer: 2000,
            placement: {
                from: from,
                align: align
            }
        });
    }

    ngOnDestroy() {
        this.sub1.unsubscribe();
    }

}
