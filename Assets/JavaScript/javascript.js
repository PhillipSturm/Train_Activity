// Initialize Firebase
var config = {
  apiKey: "AIzaSyBFn16cHLF16q9U-qFSe7SbQJ1d1Qf2g0Q",
  authDomain: "train-activity-324a0.firebaseapp.com",
  databaseURL: "https://train-activity-324a0.firebaseio.com",
  projectId: "train-activity-324a0",
  storageBucket: "train-activity-324a0.appspot.com",
  messagingSenderId: "466498239904"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});
// Need to capture the current time and calculate the frequency but couldn't remember how to do that // 

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
 

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
