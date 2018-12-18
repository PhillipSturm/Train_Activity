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

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#frequency-input").val("");
});

var currentTime = moment().format('LT');


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  // console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    // $("<td>").text(trainArrival),
    // $("<td>").text(trainMinutes),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// var trainName = "";
// var destination = "";
// var startTime = "";
// var frequency = 0;

// function currentTime() {
//   var current = moment().format('LT');
//   $("#currentTime").html(current);
//   setTimeout(currentTime, 1000);
// };

// $(".form-field").on("keyup", function() {
//   var traintemp = $("#train-name").val().trim();
//   var citytemp = $("#destination").val().trim();
//   var timetemp = $("#first-train").val().trim();
//   var freqtemp = $("#frequency").val().trim();

//   sessionStorage.setItem("train", traintemp);
//   sessionStorage.setItem("city", citytemp);
//   sessionStorage.setItem("time", timetemp);
//   sessionStorage.setItem("freq", freqtemp);
// });

// $("#train-name").val(sessionStorage.getItem("train"));
// $("#destination").val(sessionStorage.getItem("city"));
// $("#first-train").val(sessionStorage.getItem("time"));
// $("#frequency").val(sessionStorage.getItem("freq"));

// $("#submit").on("click", function(event) {
//   event.preventDefault();

//   if( $("#train-name").val().trim() === "" ||
//     	$("#destination").val().trim() === "" ||
//     	$("#first-train").val().trim() === "" ||
//     	$("#frequency").val().trim() === "") {

//     alert("Please fill in all details to add new train");

//   } else {

//     trainName = $("#train-name").val().trim();
//     destination = $("#destination").val().trim();
//     startTime = $("#first-train").val().trim();
//     frequency = $("#frequency").val().trim();

//     $(".form-field").val("");

//     database.ref().push({
//       trainName: trainName,
//       destination: destination,
//       frequency: frequency,
//       startTime: startTime,
//       dateAdded: firebase.database.ServerValue.TIMESTAMP
//     });

//     sessionStorage.clear();
//   }

// });

// database.ref().on("child_added", function(childSnapshot) {
//   var startTimeConverted = moment(childSnapshot.val().startTime, "hh:mm").subtract(1, "years");
//   var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
//   var timeRemain = timeDiff % childSnapshot.val().frequency;
//   var minToArrival = childSnapshot.val().frequency - timeRemain;
//   var nextTrain = moment().add(minToArrival, "minutes");
//   var key = childSnapshot.key;

//   var newrow = $("<tr>");
//   newrow.append($("<td>" + childSnapshot.val().trainName + "</td>"));
//   newrow.append($("<td>" + childSnapshot.val().destination + "</td>"));
//   newrow.append($("<td class='text-center'>" + childSnapshot.val().frequency + "</td>"));
//   newrow.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
//   newrow.append($("<td class='text-center'>" + minToArrival + "</td>"));
//   newrow.append($("<td class='text-center'><button class='arrival btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));

//   if (minToArrival < 6) {
//     newrow.addClass("info");
//   }

//   $("#train-table-rows").append(newrow);

// });

// $(document).on("click", ".arrival", function() {
//   keyref = $(this).attr("data-key");
//   database.ref().child(keyref).remove();
//   window.location.reload();
// });

// currentTime();