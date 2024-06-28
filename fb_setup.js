var database;

/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase consol. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
function fb_initialise() {  
const firebaseConfig = {
  apiKey: "AIzaSyBZdkwcwBvs8t42zF089M0bVIWms_IETg4",
  authDomain: "ollie-counsell-12comp.firebaseapp.com",
  databaseURL: "https://ollie-counsell-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ollie-counsell-12comp",
  storageBucket: "ollie-counsell-12comp.appspot.com",
  messagingSenderId: "813147389337",
  appId: "1:813147389337:web:4373d816ec6956b34f6708",
  measurementId: "G-0XMR4BJ0LQ"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  // This log prints the firebase object to the console to show that it is working.
  // As soon as you have the script working, delete this log.
  console.log(firebase);	
}
fb_initialise()