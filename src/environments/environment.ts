// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
    firebase: {
        apiKey: 'AIzaSyAdgSVYHNhtPaGlrcuvEKutjoloPJIv1yA',
        authDomain: 'mfcnika-be47b.firebaseapp.com',
        databaseURL: 'https://mfcnika-be47b.firebaseio.com',
        projectId: 'mfcnika-be47b',
        storageBucket: 'mfcnika-be47b.appspot.com',
        messagingSenderId: '573457119607'
    }
};
