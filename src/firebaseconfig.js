import firebase from 'firebase';

try{

  var config = {
      apiKey: "AIzaSyC4SaiXv6mfdI_1MJALZg7ZUH9MG-dIBLg",
      authDomain: "add-to-do.firebaseapp.com",
      databaseURL: "https://add-to-do.firebaseio.com",
      projectId: "add-to-do",
      storageBucket: "add-to-do.appspot.com",
      messagingSenderId: "254012619321"
    };

  firebase.initializeApp(config);

} catch(e) {
  console.log('its unable to establish a connection with firebase', e);
}

export var storageRef = firebase.storage().ref();
export default firebase;
