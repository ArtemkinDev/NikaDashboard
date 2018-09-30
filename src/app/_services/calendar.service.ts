import { Subscription } from 'rxjs/Subscription';
import { League } from './../model/league.model';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeagueService {
    playersCollection: AngularFirestoreCollection<League>;
    playerDoc: AngularFirestoreDocument<League>;
    calendar: Observable<League[]>;
    calendarIsLoading = false;

    constructor(private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });

        if (!this.calendarIsLoading) {
            this.calendar = this.db.collection('calendar')
                .snapshotChanges()
                .map(changes => {
                    return changes.map(a => {
                        const data = a.payload.doc.data() as League;
                        data.uid = a.payload.doc.id;
                        this.calendarIsLoading = true;

                        return data;
                    });
                });
        }
    }


    getLeague() {
        return this.calendar;
    }


    createLeague(calendar): Promise<any> {
        calendar.uid = '1';

        const obj = {};

        Object.keys(calendar).forEach(function (key, index) {
            obj[key] = calendar[key];
        });

        return this.db.collection('calendar').add(obj);
    }

    /*

    deletePlayer(player: Player): Promise<any> {
        this.playerDoc = this.db.doc(`players/${player.uid}`);
        return this.playerDoc.delete();
    }

    updatePlayer(player: Player): Promise<any> {
        const obj = {};
        Object.keys(player).forEach(function (key, index) {
            obj[ key ] = player[ key ];
        });
        const itemsRef  = this.db.doc(`players/${player.uid}`);
        return itemsRef.update(obj);
    }*/
}
