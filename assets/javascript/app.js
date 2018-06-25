  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA_JTZdfXcWGTGm0nMscWcd7rWrxz5v5NE",
    authDomain: "rpsgame-8acd7.firebaseapp.com",
    databaseURL: "https://rpsgame-8acd7.firebaseio.com",
    projectId: "rpsgame-8acd7",
    storageBucket: "",
    messagingSenderId: "40665868535"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

  //Declare global variables

  var playerOne = {};
  var playerTwo = {};

  var playerOneName = "";
  var playerTwoName = "";

  
//Any changes to the players database
database.ref("/players/").on("value", function(snapshot) {

  //check is playerOne exists in the database and update the page and js accordiingly
  if (snapshot.child("playerOne").exists()) {

    playerOne = snapshot.val().playerOne;
    playerOneName = playerOne.name;
    $("#player-one-name").text(playerOneName);

  } else {

    playerOne = {};
    playerOneName = "";

    $("#player-one-name").text("");
  }

  //check if playerTwo exists in the database and update the page and js accordinly
  if (snapshot.child("playerTwo").exists()) {

    playerTwo = snapshot.val().playerTwo;
    playerTwoName = playerTwo.name;
    $("#player-two-name").text(playerTwoName);

  } else {

    playerTwo = {};
    playerTwoName = "";

    $("#player-one-name").text("");
  }
});


//On-click add name
$("#name-submit").on("click", function() {
    
    event.preventDefault();
    
    //Chec to make sure there isnt a blank input, and that both player objects are empty
    if  ($("#nameInput").val().trim() !== "") {

      //Check if playerOne objects is Null
      if (jQuery.isEmptyObject(playerOne)) {

        playerOneName = $("#nameInput").val();
        //set playerOne object
        playerOne = {
          name: playerOneName,
          wins: 0,
          losses: 0,
          choice: ""
         };

        database.ref().child("/players/playerOne").set(playerOne);

        $("#player-one-name").text(playerOneName);

      } else if (jQuery.isEmptyObject(playerTwo)) {

        playerTwoName = $("#nameInput").val();
        //set playerTwo object
        playerTwo = {
          name: playerTwoName,
          wins: 0,
          losses: 0,
          choice: ""
         };

         database.ref().child("/players/playerTwo").set(playerTwo);

         $("#player-two-name").text(playerTwoName);
      }
    
    }
    
});



  //If playerOne is empty, assign the user to playerOne
  //Else if playerOne isnt empty but playerTwo is, assign player to playerTwo
  //Else, alert saying the game is full.

//On-click for ROCK PAPER SCISSORS

  //If other players selection not null, run game logic..

    //If playerOne and playTwo selection are the same. Game is a tie.
    //else if playerOne: rock and playerTwo: scissors. playOneWins++/Update wins/go to reset state
    //else if playerOne: rock and playerTwo: paper. playTwoWins++/Update wins text/go to reset state
    //else if playerOne: paper and playerTwo: scissors. playerTwoWins++Update wins text/go to reset state
    //else if playerOne: paper and playerTwo: rock. playOneWins++/Update wins/go to reset state
    //else if playerOne: scissors and playerTwo: paper. playOneWins++/Update wins/go to reset state
    //else if playerOne: scissors and playerTwo: rock. playerTwoWins++Update wins text/go to reset state


