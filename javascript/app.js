var firebaseConfig = {
    apiKey: "AIzaSyDmV0AH-KZjS2aDDjz8jpROdpGqFkTRmzA",
    authDomain: "holy-shit-a-project.firebaseapp.com",
    databaseURL: "https://holy-shit-a-project.firebaseio.com",
    projectId: "holy-shit-a-project",
    storageBucket: "holy-shit-a-project.appspot.com",
    messagingSenderId: "704516627523",
    appId: "1:704516627523:web:11b3a2edc4bed1e62988f6",
    measurementId: "G-SDV0KNH561"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


    var database = firebase.database();


    $("#submit").on("click", function(){

        
        
        
        var trainName = $("#trainTime").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#firstTrainTime").val().trim();
        var frequency = $("#frequency").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(firstTrainTime);
        console.log(frequency);

        
        
        var nextArrival = 0;

        var minutesAway = 0;

        var format = moment(firstTrainTime, "HH:mm")

        var otherTime = format.toDate()

        console.log(otherTime)

        //var green = m.otherTime.diff(startOfDay, 'minutes')


        
        //var convertedTime = moment.duration(otherTime.asMinutes())

        var duration = moment.duration(format).minutes();

        var unixTime = 0;
        
        var timeDay = moment().startOf('day').fromNow();

        var timeHour =  moment().startOf('hour').fromNow();

        var startOfDay = moment().startOf('day'); 

        var time = moment.unix(645689);
        
        var m = moment();

        var red = m.diff(otherTime, 'minutes')

        var blue = moment().subtract(1.5, 'months')

        var remainder = red % frequency;

        var minutesAway = frequency - remainder;

        console.log(minutesAway)

        console.log(remainder)
    

        //var hoursToMinutes = timeDay * 60;

        console.log(moment())

        console.log(otherTime)
        console.log(red)
        //console.log(convertedTime)
        //console.log(green)
        
        //console.log(hoursToMinutes)

        var annoyingFormat = moment().add(minutesAway, 'minutes');

        var nextArrival = annoyingFormat.format("hh:mm")



        var newRow = $("<tr>")

        var tableTrainName = $("<td>").text(trainName)

        var tableDestination = $("<td>").text(destination)

        //var tableFirstTrainTime = $("<td>").text(firstTrainTime)

        var tableFrequency = $("<td>").text(frequency)

        var tableNextArrival = $("<td>").text(nextArrival)

        var tableMinutesAway = $("<td>").text(minutesAway)

        newRow.append(tableTrainName)
        newRow.append(tableDestination)
        newRow.append(tableFrequency)
        newRow.append(tableNextArrival)
        newRow.append(tableMinutesAway)

        $("#theTable").append(newRow)

        database.ref().push({
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

      


    });

    database.ref().on("child_added", function(childSnapshot) {

            
      console.log(childSnapshot.val());
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().nextArrival);
      console.log(childSnapshot.val().minutesAway);



      var firebaseNewRow = $("<tr>")

        var firebaseTableTrainName = $("<td>").text(childSnapshot.val().trainName)

        var firebaseTableDestination = $("<td>").text(childSnapshot.val().destination)

        //var tableFirstTrainTime = $("<td>").text(firstTrainTime)

        var firebaseTableFrequency = $("<td>").text(childSnapshot.val().frequency)

        var firebaseTableNextArrival = $("<td>").text(childSnapshot.val().nextArrival)

        var firebaseTableMinutesAway = $("<td>").text(childSnapshot.val().minutesAway)

        firebaseNewRow.append(firebaseTableTrainName)
        firebaseNewRow.append(firebaseTableDestination)
        firebaseNewRow.append(firebaseTableFrequency)
        firebaseNewRow.append(firebaseTableNextArrival)
        firebaseNewRow.append(firebaseTableMinutesAway)

        $("#theTable").prepend(firebaseNewRow)


     
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



 


// time logic steps 
// 1) create a variable named currentTime that's equall to the difference between the current time and start of day, then that converted that to unix
// 2) create variable called firstTrainTime for first train time converted to unix
// 3) variable called frequency for frequency to unix
// 4) create variable called timeBetween for the differenct of currentTime - firstTrainTime
// 5) create a variable called remainder for timeBetween % frequency
// 6) create a variable called timeUntilTrain for frequency - remainder
// 7) set the variable, minutesAway, to equal timeUntilTrain converted to minutes
// 8) do the moment function that gives you the current time + timeUntilTrain. have nextArrival equal that time
// 9) 