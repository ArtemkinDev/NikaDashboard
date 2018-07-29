import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable()
export class AuthService {

    authState: Observable<firebase.User>;
    user: Observable<User>;

    constructor(private afAuth: AngularFireAuth,
                private afs: AngularFirestore) {

        afs.firestore.settings({ timestampsInSnapshots: true });

        this.user = this.afAuth.authState
            .switchMap(user => {
                if (user) {
                    return this.afs
                        .collection('users', ref => ref.where('uid', '==', user.uid))
                        .valueChanges()
                        .map(u => {
                            return u[0];
                        });
                } else {
                    return Observable.of(null);
                }
            });
    }

    signUpWithEmail(email: string, password: string) {
        return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
            })
            .catch(error => {
                return error;
            });
    }

    signIn(email: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                this.authState = user;
            })
            .catch(error => {
                throw error;
            });
    }

    signOut() {
        this.afAuth.auth.signOut();
    }

}
