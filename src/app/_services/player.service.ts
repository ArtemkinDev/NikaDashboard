import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Player } from '../model/player.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
    playersCollection: AngularFirestoreCollection<Player>;
    playerDoc: AngularFirestoreDocument<Player>;
    players: Observable<Player[]>;
    numbers: [ Number ];

    constructor(private db: AngularFirestore) {
        db.firestore.settings({ timestampsInSnapshots: true });

        /*this.players = this.db.collection('players').valueChanges();*/
        this.players = this.db.collection('players')
            .snapshotChanges()
            .map(changes => {
                return changes.map(a => {
                    const data = a.payload.doc.data() as Player;
                    data.id = a.payload.doc.id;
                    console.log(data);
                    return data;
                });
            });
    }

    getPlayers() {
        return this.players;
    }

    getNumbers() {
        return this.players;
    }

    getPlayer(number: number): Observable<Player> {
        return this.db
            .collection('players', ref => ref.where('number', '==', number))
            .valueChanges()
            .map(p => {
                return p[ 0 ];
            });
    }

    createPlayer(player: Player): Promise<any> {
        const obj = {};
        Object.keys(player).forEach(function (key, index) {
            obj[ key ] = player[ key ];
        });
        return this.db.collection('players').add(obj);
    }

    deleteItem(player: Player) {
        this.playerDoc = this.db.doc(`players/${player.id}`);
        this.playerDoc.delete();
    }

    updateItem(player: Player) {
        this.playerDoc = this.db.doc(`players/${player.id}`);
        this.playerDoc.update(player);
    }
}
