import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD2g1rla5JCvemJ48xvvsH7oOKHpjlfTwU",
    authDomain: "test-react-ab0b0.firebaseapp.com",
    databaseURL: "https://test-react-ab0b0.firebaseio.com",
    projectId: "test-react-ab0b0",
    storageBucket: "test-react-ab0b0.appspot.com",
    messagingSenderId: "800550250354"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};
