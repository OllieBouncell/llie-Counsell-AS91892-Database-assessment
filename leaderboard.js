var htmlZone;

function fb_gameScores(zone, url){
  htmlZone = zone
firebase.database().ref(url).once('value', fb_gameScoresRead, fb_error)
}   

function fb_gameScoresRead(snapshot){
  bigData = snapshot.val()
  text = ""
  
  for (key of Object.keys(bigData)){
    data = bigData[key]
    for ([gameName, score] of Object.entries(data)){
      text += gameName + ": " + score + "<br>"; 
    }
  }
  
  document.getElementById(htmlZone).innerHTML = text
}

function fb_error(error){
  console.log("fb_error");
  console.log(error)
}


function fb_logDatabaseRead(snapshot){
  if (snapshot.val()==null){
      console.error ("There was no data, the values are null.");
  }else{
      console.log (snapshot.val());
  }
}

