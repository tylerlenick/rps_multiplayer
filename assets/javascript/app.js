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

  function updateTrackers() {
    $("#player-one-tracker").text("Wins:" + playerOne.wins + " " + "Losses:" + playerOne.losses);
    $("#player-two-tracker").text("Wins:" + playerTwo.wins + " " + "Losses:" + playerTwo.losses);
  }

  function choiceCompare() {

    if (playerOne.choice === playerTwo.choice) {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", the game is a tie!");
      console.log("the is a tie");
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");

    
    } else if (playerOne.choice === "r" && playerTwo.choice === "s") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerOneName + " wins!");
    
      database.ref().child("/players/playerOne/wins").set(playerOne.wins + 1);
      database.ref().child("/players/playerTwo/losses").set(playerTwo.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");

     

    } else if (playerOne.choice === "r" && playerTwo.choice === "p") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerTwoName + " wins!");
     
      database.ref().child("/players/playerTwo/wins").set(playerTwo.wins + 1);
      database.ref().child("/players/playerOne/losses").set(playerOne.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");

    } else if (playerOne.choice === "s" && playerTwo.choice === "r") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerTwoName + " wins!");
     
      database.ref().child("/players/playerTwo/wins").set(playerTwo.wins + 1);
      database.ref().child("/players/playerOne/losses").set(playerOne.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");

    
      
    } else if (playerOne.choice === "s" && playerTwo.choice === "p") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerOneName + " wins!");

      database.ref().child("/players/playerOne/wins").set(playerOne.wins + 1);
      database.ref().child("/players/playerTwo/losses").set(playerTwo.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");


      
    } else if (playerOne.choice === "p" && playerTwo.choice === "r") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerOneName + " wins!");

      database.ref().child("/players/playerOne/wins").set(playerOne.wins + 1);
      database.ref().child("/players/playerTwo/losses").set(playerTwo.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");

    

      
    } else if (playerOne.choice === "p" && playerTwo.choice === "s") {
      $("#game-result").text(playerOneName + " chose " + playerOne.choice + ", " + playerTwoName + " chose " + playerTwo.choice + ", " + playerTwoName + " wins!");
     
      database.ref().child("/players/playerTwo/wins").set(playerTwo.wins + 1);
      database.ref().child("/players/playerOne/losses").set(playerOne.losses + 1);
      
      database.ref().child("/players/playerOne/choice").set("");
      database.ref().child("/players/playerTwo/choice").set("");
      
      
    }
    
  };
  
//Any changes to the players database
database.ref("/players/").on("value", function(snapshot) {

  
  //check is playerOne exists in the database and update the page and js accordiingly
  if (snapshot.child("playerOne").exists()) {

    playerOne = snapshot.val().playerOne;
    playerOneName = playerOne.name;
    $("#player-one-name").text(playerOneName);

  } else {

    $("#game-state").text("Waiting for players to join...");
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

    $("#game-state").text("Waiting for players to join...");
    playerTwo = {};
    playerTwoName = "";

    $("#player-one-name").text("");
  }

  if (snapshot.child("playerOne").exists() && snapshot.child("playerTwo").exists()) {
    //Check in both players have values for their choice.
    if (playerOne.choice === "" && playerTwo.choice === "") {

      $("#game-state").text("Player one's turn");

    } else if (playerOne.choice != "" && playerTwo.choice === "") {

      $("#game-state").text("Player two's turn");
    
    } 

    updateTrackers();
  };

  
  
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


//When RPS button is clicked.
$(".player-rps-btn").on("click", function(){

  event.preventDefault();
  console.log("button clicked");

  if (playerOne != {} && playerTwo != {}) {

    if (playerOne.choice === "" && playerTwo.choice === "") {

      console.log("push to player one");
      //push choice to player one
      playerOne.choice = $(this).val();
      console.log(playerOne.choice);
      database.ref().child("/players/playerOne/choice/").set(playerOne.choice);
      

    } else if (playerOne.choice != "" && playerTwo.choice === "") {

      console.log("push to player two");
      //push choice to player two
      playerTwo.choice = $(this).val();
      database.ref().child("/players/playerTwo/choice/").set(playerTwo.choice);

    } else {

      choiceCompare();

    }

  } else {

    console.log("no players bitch");
    $("#game-state").text("Waiting for players to join");
  }

});



//On-click for ROCK PAPER SCISSORS

  //If other players selection not null, run game logic..

    //If playerOne and playTwo selection are the same. Game is a tie.
    //else if playerOne: rock and playerTwo: scissors. playOneWins++/Update wins/go to reset state
    //else if playerOne: rock and playerTwo: paper. playTwoWins++/Update wins text/go to reset state
    //else if playerOne: paper and playerTwo: scissors. playerTwoWins++Update wins text/go to reset state
    //else if playerOne: paper and playerTwo: rock. playOneWins++/Update wins/go to reset state
    //else if playerOne: scissors and playerTwo: paper. playOneWins++/Update wins/go to reset state
    //else if playerOne: scissors and playerTwo: rock. playerTwoWins++Update wins text/go to reset state


