var app_firebase = {};
var firebaseDB = {};
(function () {
  // Your web app's Firebase configuration
  var config = {
    apiKey: "AIzaSyC_F9XysfdVLJPXutV19RzHz5reSVdmUls",
    authDomain: "quiz-3d510.firebaseapp.com",
    databaseURL: "https://quiz-3d510.firebaseio.com",
    projectId: "quiz-3d510",
    storageBucket: "quiz-3d510.appspot.com",
    messagingSenderId: "1055482630844",
    appId: "1:1055482630844:web:22f40fb4dad5062b3036b9"
  };
  // Initialize Firebase
  firebase.initializeApp(config);

  app_firebase = firebase;
  firebaseDB = firebase.firestore();
})();
