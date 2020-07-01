var mainApp = {};
var user = {};
var questionsArray = [];
(function () {
  var firebase = app_firebase;
  var uid = null;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      uid = user.uid;
      $(".user-name").append(user.displayName);
      getCurrentUser();
      createUserInDB();
      fetchLeaderBoard("maths");
    } else {
      uid = null;
      window.location.replace("index.html");
    }
  });

  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function () {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });

  function logOut() {
    firebase.auth().signOut();
  }

  function redirectToCategories(){
    window.location.replace("categories.html");
  }

  function getCurrentUser() {
    localStorage.setItem(
      "firebaseUser",
      firebase.auth().currentUser.displayName
    );
    user = firebase.auth().currentUser;
    console.log("currentUser", user);
  }

  function createUserInDB() {
    firebaseDB
      .collection("users")
      .doc(user.uid)
      .set({
        Name: user.displayName,
        Email: user.email
      })
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  function createQuestionsArray(category){
    questionsArray = [];
    for (let index = 0; index <= 5 ; index++) {
        fetchQuestions(category,index.toString());
      }
  }

  function fetchQuestions(category, index){
    var docRef = firebaseDB.collection("quizCategory").doc(category).collection("questions").doc(index);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          questionsArray.push(doc.data());
        } else {
          //No such document!
          console.log("No Such document");
        }
      })
      .catch(function (error) {
        //Error getting document:",error
        console.log("Error while fetching docs");
      });
  }

  function fetchLeaderBoard(cateogry){
    var docRef = firebaseDB.collection("leaderboard").doc(cateogry);
    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Fetched Data", doc.data());
          console.log("Fetched leaderboard Keys", Object.keys(doc.data()));
        } else {
          //No such document!
          console.log("No Such document");
        }
      })
      .catch(function (error) {
        //Error getting document:",error
        console.log("Error while fetching docs");
      });
  }

  mainApp.logOut = logOut;
  mainApp.redirectToCategories = redirectToCategories;
  mainApp.createQuestionsArray = createQuestionsArray;

})();
