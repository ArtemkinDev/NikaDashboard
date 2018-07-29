import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { Upload } from '../model/upload.model';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {
    snapshot: any;

    uploads: FirebaseListObservable<Upload[]>;

    private basePath = '/player-images';

    constructor(private db: AngularFireDatabase) {
    }

    pushUpload(upload: Upload) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        return uploadTask;

       /* url = uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
            },
            (error) => {
                // upload failed
                console.log(error);
            },
            () => {
                // upload success
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.saveFileData(upload);
                return upload.url;
            }
        );*/
    }

    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        this.db.list(`${this.basePath}/`).push(upload);
    }

    deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name);
            })
            .catch(error => console.log(error));
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
}
