var userName;
var uid;
var user;

function fb_login() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      userName = user.displayName;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      uid = user.uid;
      // ...
      fb_getRegistration(uid);

    } else {
      // User is signed out
      // ...
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user
      });

    }

  });

}

function fb_getRegistration(uid) {
  console.log("checking if " + '/users/' + uid + " is registered");
  firebase.database().ref('/users/' + uid).once('value', fb_checkRegistration, fb_error)
}

function fb_checkRegistration(snapshot) {
  if (snapshot.val() == null) {
    console.error("the user is not in the database go to the regestration page");
    window.location = 'login.html'
  } else {
    console.log(snapshot.val());
    console.log("the user is in the data go to the game page");
    window.location = 'gamepage.html'
  }
}
function fb_error(error) {
  console.log("fb_error");
  console.log(error)
}

function fb_register() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      userName = user.displayName;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      uid = user.uid;
      var data = {
        gameName: HTML_screen_name.value,
        age: HTML_age.value,
        googleName: userName
      }
      console.log(data)
      firebase.database().ref('/users/' + uid).set(data).then(_DOTHIS);
      // ...
      // ...

    } else {
      // User is signed out
      // ...
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user
      });
    }

  });
  function _DOTHIS() {
    window.location = 'gamepage.html'
  }
}

function fb_saveScore(game, score) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user);
      userName = user.displayName;
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      uid = user.uid;
      console.log(user);
      console.log(uid);
      // ...
      console.log(userName + " score was " + score)
      firebase.database().ref(game + uid).set({
        [userName]: score
      });
    } else {
      console.log(user);
      console.log(uid);
      // User is signed out
      // ...
      // Using a popup.
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user
        console.log(userName + " score was " + score)
        firebase.database().ref('geoDash/' + uid).set({
          [userName]: score
        });

      });
    }

  });
  console.log(user)


}

function fb_changePage(url){
  console.log(url)
  window.location = url
}

function fb_leaderboardtwo(){
  window.location = 'leaderboard.html'
  
}

function fb_gamepage(){
  window.location = 'gamepage.html'

}