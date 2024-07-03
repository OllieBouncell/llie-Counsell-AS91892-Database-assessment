var htmlZone;

function fb_gameScores(zone, url) {
  htmlZone = zone
  firebase.database().ref(url).once('value', fb_gameScoresRead, fb_error);
}

function fb_gameScoresRead(snapshot) {
  console.log(snapshot.val());
  //resets the html 
  document.getElementById(htmlZone).innerHTML = ""

  //sets object that is unordered
  result = {}
  
  //selects through snapshot.val() to keys and values
  for (var data of Object.values(snapshot.val())) {
    for (var [gameName, score] of Object.entries(data)) {
      result[gameName] = score
    }
  }

  //orders object
  newData = Object.fromEntries(Object.entries(result).sort((a, b) => b[1] - a[1]));

  //sets each value in object to the html
  for (var [gameName, score] of Object.entries(newData)) {
    document.getElementById(htmlZone).innerHTML += gameName + ": " + score + "<br>";
  }
}

function fb_error(error) {
  console.log("fb_error");
  console.log(error)
}


function fb_logDatabaseRead(snapshot) {
  if (snapshot.val() == null) {
    console.error("There was no data, the values are null.");
  } else {
    console.log(snapshot.val());
  }
}

