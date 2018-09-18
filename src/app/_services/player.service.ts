import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Player } from '../model/player.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
    playersCollection: AngularFirestoreCollection<Player>;
    playerDoc: AngularFirestoreDocument<Player>;
    players: Observable<Player[]>;
    playersIsLoading = false;
    numbers: Number[];

    constructor(private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });

        /*this.players = this.db.collection('players').valueChanges();*/

        if(!this.playersIsLoading) {
            this.players = this.db.collection('players')
            .snapshotChanges()
            .map(changes => {
                return changes.map(a => {
                   const data = a.payload.doc.data() as Player;
                    data.uid = a.payload.doc.id;
                    this.playersIsLoading = true;

                    return data;
                });
            });
        }
    }

    getPlayers() {
        return this.players;
    }

    getNumbers() {
        return this.players;
    }

    getPlayer(number: number): Observable<any> {
        return this.db
            .collection('players', ref => ref.where('number', '==', number))
            .valueChanges()
            .map(p => {
                return p[ 0 ];
            });
    }

    createPlayer(player: Player): Promise<any> {
        player.uid = '1';
        const obj = {};
        Object.keys(player).forEach(function (key, index) {
            obj[ key ] = player[ key ];
        });

        return this.db.collection('players').add(obj);
    }

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
    }
}
