import { League } from './../../model/league.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { LeagueService } from '../../_services/league.service';

declare var $: any;

@Component({
    selector: 'app-add-league',
    templateUrl: './add-league.component.html',
    styleUrls: ['./add-league.component.scss']
})
export class AddLeagueComponent implements OnInit {

    form: FormGroup;
    invalid = false;
    defaultTeamStatistic = {
        games: 0,
        gamesWon: 0,
        gamesLost: 0,
        gamesDraw: 0,
        goalsScored: 0,
        goalsMissed: 0,
        goalsDifference: 0,
        point: 0,
    };
    authMsg;
    leagueLoading = false;

    constructor(private formBuilder: FormBuilder, private service: LeagueService) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.formBuilder.group({
            'season': ['', Validators.required],
            'lnumber': ['', Validators.required],
            'teams': this.formBuilder.array([
                this.initTeam()
            ]),
        });
    }

    initTeam(): FormGroup {
        return this.formBuilder.group({
            'teamName': ['', Validators.required],
        })
    }

    addNewTeam() {
        const control = <FormArray>this.form.controls['teams'];
        control.push(this.initTeam());
        this.invalid = false;
    }

    get teams() {
        return this.form.get('teams') as FormArray;
    }

    validatorMessages(fieldtype: string): string | boolean {
        const form = this.form;

        if (!form || !form.invalid) {
            return false;
        }

        let error: string;

        if (fieldtype === 'season') {
            if (form.get('season')['errors']['required']) {
                error = 'Введите название лиги, например - Весна 2018';
            }
        } else if (fieldtype === 'lnumber') {
            if (form.get('lnumber')['errors']['required']) {
                error = 'Введите номер лиги';
            }
        } else if (fieldtype === 'teamName') {
            error = 'Введите название команды';
        }

        return error;
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
        const form = this.form;
        const formData = form.value;

        if (form.invalid) {
            Object.keys(form.controls).forEach(field => {
                const control = form.get(field);
                control.markAsTouched({ onlySelf: true });

                if (control instanceof FormArray) {
                    Object.keys(control.controls).forEach(f => {
                        const contr = control.get(f);
                        if (contr.invalid) {
                            contr.markAsTouched({ onlySelf: true });
                            contr.markAsDirty({ onlySelf: true });
                            this.invalid = true;
                        }
                    });
                }
            });
        } else {
            const [season, lNumber, lTeams] = [formData.season, formData.lnumber, formData.teams];
            lTeams.forEach(element => {
                element.statistic = this.defaultTeamStatistic,
                    element.squad = []
            });

            const league = new League(season, lNumber, lTeams);

            this.leagueLoading = true;

            this.service.createLeague(league).then(() => {
                this.leagueLoading = false;
                this.authMsg = 'Новая лига создана!';
                this.showNotification('top', 'center', 'success');
                this.form.reset();
                this.authMsg = '';
            })

        }

    }
}
