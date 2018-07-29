import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from '../../_services/player.service';
import { UploadService } from '../../_services/upload.service';
import { Upload } from '../../model/upload.model';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../model/player.model';

declare var $: any;

@Component({
    selector: 'app-add-player',
    templateUrl: './add-player.component.html',
    styleUrls: [ './add-player.component.scss' ]
})
export class AddPlayerComponent implements OnInit, OnDestroy {

    @ViewChild('file') inputFile: ElementRef;

    subscr1: Subscription;
    form: FormGroup;
    numberIsLoading = false;
    playerNumbers = [];
    currentPlayersNumbers: number[];
    imgUploaderURL;
    imgLoad = false;
    selectedFiles: FileList;
    currentUpload: Upload;
    currentUploadUrl;
    positions: [ string ] = [ 'нападающий', 'защитник', 'вратарь' ];
    authMsg;
    playerLoading = false;

    constructor(private service: PlayerService,
                private uploadService: UploadService) {
    }

    ngOnInit() {
        this.subscr1 = this.service.getNumbers().subscribe(data => {
            this.currentPlayersNumbers = data.map(p => p.number);
            this.numberIsLoading = true;
            this.createNumber();
        });

        this.createForm();
    }

    getDays() {
        const days = [];

        for ( let i = 1; i <= 31; i++ ) {

            if ( i < 10 ) {
                days.push('0' + String(i));
            } else {
                days.push(String(i));
            }
        };

        return days;
    }

    getMonth() {
        const month = [];

        for ( let i = 1; i <= 12; i++ ) {

            if ( i < 10 ) {
                month.push('0' + String(i));
            } else {
                month.push(String(i));
            }
        };

        return month;
    }

    getYears() {
        const years = [];

        for ( let i = 1945; i <= 2018; i++ ) {
            years.push(i);
        };

        return years;
    }

    createForm() {
        this.form = new FormGroup({
            'name': new FormControl(null, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'lastname': new FormControl(null, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'day': new FormControl(null, [
                Validators.required
            ]),
            'month': new FormControl(null, [
                Validators.required
            ]),
            'year': new FormControl(null, [
                Validators.required,
            ]),
            'email': new FormControl(null, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
            ]),
            'password': new FormControl(null, [
                Validators.required,
                Validators.minLength(6)
            ]),
            'numbers': new FormControl(null, [
                Validators.required
            ]),
            'position': new FormControl(null, [
                Validators.required
            ])
        });
    }

    validatorMessages(fieldtype: string): string | boolean {
        const form = this.form;

        if ( !form || !form.invalid ) {
            return false;
        }

        let error: string;

        if ( fieldtype === 'name' ) {
            if ( form.get('name')[ 'errors' ][ 'required' ] ) {
                error = 'Введите Имя игрока';
            } else if ( form.get('name')[ 'errors' ][ 'minlength' ] ) {
                error = 'Минимальное количество символов - 2';
            }
        } else if ( fieldtype === 'lastname' ) {
            if ( form.get('lastname')[ 'errors' ][ 'required' ] ) {
                error = 'Введите фамилию игрока';
            } else if ( form.get('lastname')[ 'errors' ][ 'minlength' ] ) {
                error = 'Минимальное количество символов - 2';
            }
        } else if ( fieldtype === 'day' ) {
            if ( form.get('day')[ 'errors' ][ 'required' ] ) {
                error = 'Введите день рождения';
            }
        } else if ( fieldtype === 'month' ) {
            if ( form.get('month')[ 'errors' ][ 'required' ] ) {
                error = 'Введите месяц рождения';
            }
        } else if ( fieldtype === 'year' ) {
            if ( form.get('year')[ 'errors' ][ 'required' ] ) {
                error = 'Введите год рождения';
            }
        } else if ( fieldtype === 'email' ) {
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
        } else if ( fieldtype === 'numbers' ) {
            if ( form.get('numbers')[ 'errors' ][ 'required' ] ) {
                error = 'Укажите номер';
            }
        } else if ( fieldtype === 'position' ) {
            if ( form.get('position')[ 'errors' ][ 'required' ] ) {
                error = 'Выберете позицию игрока';
            }
        }

        return error;
    }

    createNumber() {
        const maxNumber = 100;
        for ( let i = 1; i <= maxNumber; i++ ) {
            this.playerNumbers.push(i);
        }

        if ( this.currentPlayersNumbers ) {
            for ( let i = 0; i <= this.currentPlayersNumbers.length - 1; i++ ) {
                this.playerNumbers
                    .splice(this.playerNumbers.indexOf(this.currentPlayersNumbers[ i ]), 1);
            }
        }
    }

    showPreviewImage(event: any) {
        if ( event.target.files && event.target.files[ 0 ] ) {
            const reader = new FileReader();

            this.selectedFiles = event.target.files;

            reader.onload = (event: any) => {
                this.imgUploaderURL = event.target.result;
                this.imgLoad = true;
            };
            reader.readAsDataURL(event.target.files[ 0 ]);
        }
    }

    uploadSingle() {
        if ( this.selectedFiles && this.selectedFiles.length > 0 ) {
            const file = this.selectedFiles.item(0);
            this.currentUpload = new Upload(file);
            return this.uploadService.pushUpload(this.currentUpload);
        }
    }

    resetFile() {
        this.imgUploaderURL = '';
        this.imgLoad = false;
        this.inputFile.nativeElement.value = '';
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

    onSubmit() {
        const defaultPlayerStat = {
            matches: 0,
            goals: 0,
            yellowCard: 0,
            redCard: 0,
            totalRating: 0,
            lastRating: 0,
        };
        const form = this.form;
        const formData = form.value;
        const date = Date.now();
        const calcAge = new Date().getFullYear() - +formData.year;
        const playerImageURLDefault = 'https://firebasestorage.googleapis.com/v0/b/mfcnika-be47b.appspot.com/o/player-images%2Fdefault-avatar.png?alt=media&token=1811dfa0-391a-4688-bacd-bc7406520138';
        const [ firstName, lastName, email, password, yearOfBirth, monthOfBirth, dayOfBirth, age, number, position, playerStatistic, playerImage, id ] = [
            formData.name,
            formData.lastname,
            formData.email,
            formData.password,
            +formData.year,
            formData.month,
            formData.day,
            calcAge,
            +formData.numbers,
            formData.position,
            defaultPlayerStat,
            playerImageURLDefault,
            date
        ];

        if ( form.invalid ) {
            Object.keys(form.controls).forEach(field => { // {1}
                const control = form.get(field);            // {2}
                control.markAsTouched({ onlySelf: true });       // {3}
            });
        } else {
            if ( this.imgLoad ) {
                this.playerLoading = true;
                this.uploadSingle().then(data => {

                    const player = new Player(
                        firstName,
                        lastName,
                        email,
                        password,
                        yearOfBirth,
                        monthOfBirth,
                        dayOfBirth,
                        age,
                        number,
                        position,
                        playerStatistic,
                        data.metadata.downloadURLs[ 0 ], id
                    );

                    this.service.createPlayer(player).then(() => {
                        this.playerLoading = false;
                        this.authMsg = 'Новый игрок добавлен!';
                        this.showNotification('top', 'center', 'success');
                        this.resetFile();
                        this.form.reset();
                        this.authMsg = '';
                    });
                });
            } else {
                const player = new Player(
                    firstName,
                    lastName,
                    email,
                    password,
                    yearOfBirth,
                    monthOfBirth,
                    dayOfBirth,
                    age,
                    number,
                    position,
                    playerStatistic,
                    playerImageURLDefault,
                    id
                );

                this.playerLoading = true;

                this.service.createPlayer(player).then(() => {
                    this.playerLoading = false;
                    this.authMsg = 'Новый игрок добавлен!';
                    this.showNotification('top', 'center', 'success');
                    this.resetFile();
                    this.form.reset();
                    this.authMsg = '';
                });
            }
        }
    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
    }
}
