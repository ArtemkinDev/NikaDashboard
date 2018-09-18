import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { PlayerService } from '../../_services/player.service';
import { UploadService } from '../../_services/upload.service';
import { Upload } from '../../model/upload.model';
import { Player } from '../../model/player.model';

declare var $: any;

@Component({
    selector: 'app-edit-player',
    templateUrl: './edit-player.component.html',
    styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit, OnDestroy {

    @ViewChild('file') inputFile: ElementRef;

    subscr1: Subscription;
    subscr2: Subscription;
    subscr3: Subscription;
    form: FormGroup;
    numberIsLoading = false;
    playerNumbers = [];
    currentPlayersNumbers: number[];

    newImgUploaderURL;
    currentImgURL;
    imgLoad = false;

    selectedFiles: FileList;
    currentUpload: Upload;
    currentUploadUrl;
    positions: string[] = ['нападающий', 'защитник', 'вратарь'];
    authMsg;
    playerLoading = false;
    players: Player[] = [];
    currentEditingPlayer: Player = null;

    constructor(private service: PlayerService,
        private uploadService: UploadService) {
    }

    ngOnInit() {
        this.subscr1 = this.service.getPlayers().subscribe(data => {
            this.players = data;
            console.log(this.players)
        });
        this.subscr2 = this.service.getNumbers().subscribe(data => {
            this.currentPlayersNumbers = data.map(p => p.number);
            this.numberIsLoading = true;
        });
    }

    getDays() {
        const days = [];

        for (let i = 1; i <= 31; i++) {

            if (i < 10) {
                days.push('0' + String(i));
            } else {
                days.push(String(i));
            }
        }
        ;

        return days;
    }

    getMonth() {
        const month = [];

        for (let i = 1; i <= 12; i++) {

            if (i < 10) {
                month.push('0' + String(i));
            } else {
                month.push(String(i));
            }
        }
        ;

        return month;
    }

    getYears() {
        const years = [];

        for (let i = 1945; i <= 2018; i++) {
            years.push(i);
        }
        ;

        return years;
    }

    /*
    * Вызываю форму с параметрами потому что select selected не работает в цикле
    */

    createForm(name, lastname, day, month, year, email, password, number, position) {
        this.form = new FormGroup({
            'name': new FormControl(name, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'lastname': new FormControl(lastname, [
                Validators.required,
                Validators.minLength(2)
            ]),
            'day': new FormControl(day, [
                Validators.required
            ]),
            'month': new FormControl(month, [
                Validators.required
            ]),
            'year': new FormControl(year, [
                Validators.required,
            ]),
            'email': new FormControl(email, [
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$')
            ]),
            'password': new FormControl(password, [
                Validators.required,
                Validators.minLength(6)
            ]),
            'numbers': new FormControl(number, [
                Validators.required
            ]),
            'position': new FormControl(position, [
                Validators.required
            ])
        });
    }

    validatorMessages(fieldtype: string): string | boolean {
        const form = this.form;

        if (!form || !form.invalid) {
            return false;
        }

        let error: string;

        if (fieldtype === 'name') {
            if (form.get('name')['errors']['required']) {
                error = 'Введите Имя игрока';
            } else if (form.get('name')['errors']['minlength']) {
                error = 'Минимальное количество символов - 2';
            }
        } else if (fieldtype === 'lastname') {
            if (form.get('lastname')['errors']['required']) {
                error = 'Введите фамилию игрока';
            } else if (form.get('lastname')['errors']['minlength']) {
                error = 'Минимальное количество символов - 2';
            }
        } else if (fieldtype === 'day') {
            if (form.get('day')['errors']['required']) {
                error = 'Введите день рождения';
            }
        } else if (fieldtype === 'month') {
            if (form.get('month')['errors']['required']) {
                error = 'Введите месяц рождения';
            }
        } else if (fieldtype === 'year') {
            if (form.get('year')['errors']['required']) {
                error = 'Введите год рождения';
            }
        } else if (fieldtype === 'email') {
            if (form.get('email')['errors']['required']) {
                error = 'Введите email';
            } else if (form.get('email')['errors']['pattern']) {
                error = 'Неправильно введен email';
            }
        } else if (fieldtype === 'password') {
            if (form.get('password')['errors']['required']) {
                error = 'Введите пароль';
            } else if (form.get('password')['errors']['minlength']) {
                error = 'Минимальное количество символов - 6';
            }
        } else if (fieldtype === 'numbers') {
            if (form.get('numbers')['errors']['required']) {
                error = 'Укажите номер';
            }
        } else if (fieldtype === 'position') {
            if (form.get('position')['errors']['required']) {
                error = 'Выберете позицию игрока';
            }
        }

        return error;
    }

    createNumber() {
        const maxNumber = 100;

        this.playerNumbers = [];

        for (let i = 1; i <= maxNumber; i++) {
            this.playerNumbers.push(i);
        }

        if (this.currentPlayersNumbers) {
            for (let i = 0; i <= this.currentPlayersNumbers.length - 1; i++) {
                if (!(this.currentPlayersNumbers[i] === this.currentEditingPlayer.number)) {
                    this.playerNumbers
                        .splice(this.playerNumbers.indexOf(this.currentPlayersNumbers[i]), 1);
                }
            }
        }
    }

    showPreviewImage(event: any) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            this.selectedFiles = event.target.files;

            reader.onload = (event: any) => {
                this.newImgUploaderURL = event.target.result;
                this.imgLoad = true;
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    uploadSingle() {
        if (this.selectedFiles && this.selectedFiles.length > 0) {
            const file = this.selectedFiles.item(0);
            this.currentUpload = new Upload(file);
            return this.uploadService.pushUpload(this.currentUpload);
        }
    }

    resetFile() {
        this.newImgUploaderURL = '';
        this.currentImgURL = '';
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
        const calcAge = new Date().getFullYear() - +formData.year;
        const playerImageURLDefault = 'https://firebasestorage.googleapis.com/v0/b/mfcnika-be47b.appspot.com/o/player-images%2Fdefault-avatar.png?alt=media&token=1811dfa0-391a-4688-bacd-bc7406520138';
        const [firstName, lastName, email, password, yearOfBirth, monthOfBirth, dayOfBirth, age, number, position, playerStatistic, playerImage, id, uid] = [
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
            this.currentEditingPlayer.playerStatistic,
            this.currentEditingPlayer.playerImage,
            this.currentEditingPlayer.id,
            this.currentEditingPlayer.uid
        ];

        if (form.invalid) {
            Object.keys(form.controls).forEach(field => { // {1}
                const control = form.get(field);            // {2}
                control.markAsTouched({ onlySelf: true });       // {3}
            });
        } else {
            if (this.newImgUploaderURL) {
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
                        data.metadata.downloadURLs[0], id, uid
                    );

                    this.service.updatePlayer(player).then(() => {
                        this.playerLoading = false;
                        this.authMsg = 'Данные игрока отредактированы!';
                        this.showNotification('top', 'center', 'success');
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
                    playerImage,
                    id,
                    uid
                );

                this.playerLoading = true;

                this.service.updatePlayer(player).then(() => {
                    this.playerLoading = false;
                    this.authMsg = 'Данные игрока отредактированы!';
                    this.showNotification('top', 'center', 'success');
                    this.authMsg = '';
                });
            }
        }
    }

    addCurrentPlayer(number: number) {
        /* this.subscr3 = this.service.getPlayer(number).subscribe(data => {
             if (!this.currentEditingPlayer || this.currentEditingPlayer.number != data.number) {
                 this.currentEditingPlayer = data;
                 console.log(data)
                 this.currentImgURL = data.playerImage;
                 this.imgLoad = true;
                 this.createNumber();
                 this.createForm(
                     this.currentEditingPlayer.firstName,
                     this.currentEditingPlayer.lastName,
                     this.currentEditingPlayer.dayOfBirth, this.currentEditingPlayer.monthOfBirth, this.currentEditingPlayer.yearOfBirth,
                     this.currentEditingPlayer.email,
                     this.currentEditingPlayer.password,
                     this.currentEditingPlayer.number,
                     this.currentEditingPlayer.position
                 );
             }
         });
         */

        if (this.players.length > 0) {
            const curPlayer = this.players.filter(p => {
                return p.number === number;
            })[0];

            this.currentEditingPlayer = curPlayer;
            this.currentImgURL = curPlayer.playerImage;
            this.imgLoad = true;
            this.createNumber();
            this.createForm(
                this.currentEditingPlayer.firstName,
                this.currentEditingPlayer.lastName,
                this.currentEditingPlayer.dayOfBirth, this.currentEditingPlayer.monthOfBirth, this.currentEditingPlayer.yearOfBirth,
                this.currentEditingPlayer.email,
                this.currentEditingPlayer.password,
                this.currentEditingPlayer.number,
                this.currentEditingPlayer.position
            );
        }

        return false;
    }

    deletePlayer() {
        this.service.deletePlayer(this.currentEditingPlayer)
            .then(() => {
                this.authMsg = 'Игрок успешно удалён!';
                this.showNotification('top', 'center', 'success');
                this.authMsg = '';
                this.currentEditingPlayer = null;
            });
    }

    ngOnDestroy() {
        this.subscr1.unsubscribe();
        this.subscr2.unsubscribe();
        if (this.subscr3) {
            this.subscr3.unsubscribe();
        }
    }
}
