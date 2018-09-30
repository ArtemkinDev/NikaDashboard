import { League } from './../../model/league.model';
import { LeagueService } from './../../_services/league.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.scss']
})
export class AddCalendarComponent implements OnInit {

  form: FormGroup;
  subscr1: Subscription;
  league: League;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private service: LeagueService) { }

  ngOnInit() {

    this.subscr1 = this.service.getLeague()
      .subscribe(data => {
        this.league = data[data.length - 1];
        this.isLoading = true;
      });

    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      'tours': this.formBuilder.array([
        this.initTour()
      ])
    });
  }

  initTour(): FormGroup {
    return this.formBuilder.group({
      'tourNumber': [''],
      'matches': this.formBuilder.array([
        this.initMatch()
      ])
    })
  }

  initMatch() {
    return this.formBuilder.group({
      'date': [''],
      'time': [''],
      'homeTeam': [''],
      'awayTeam': [''],
    })
  }

  addMatch(control) {
    control.push(this.initMatch());
  }

  addTour() {
    const control = <FormArray>this.form.controls['tours'];
    control.push(this.initTour());
  }

  ngOnDestroy() {
    this.subscr1.unsubscribe();
  }

  onSubmit() {
    const val = this.form.value;

    console.log(val);
  }

}
