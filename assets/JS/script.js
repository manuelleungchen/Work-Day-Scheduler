
// Call this function when the page load
$(document).ready(function() {
    var currentDate = moment().format("dddd, MMMM Do YYYY");    // Storage current date
    var currentTime = parseInt(moment().format("H"));   // Storage current hour

    // If there is a current date saved on local storage
    if (localStorage.getItem("date") !== null) {
        // if saved date is different than current date
        if (localStorage.getItem("date") !== currentDate) {     
            localStorage.clear();   // Clear local Storage
            localStorage.setItem("date", currentDate);  // Save the new date on local storage
        }
    }
    // If there isnt a current date saved on local storage
    else if (localStorage.getItem("date") === null) {
        localStorage.setItem("date", currentDate);  // Save the new date on local storage
    }

    // Update the div with id currentDay with the current date
    $("#currentDay").text(currentDate);
    
    var timeBlocksList = [];    // Empty list

    // This function pushes hours in string to the timeBlocksList array
    function getListOfHours(){
        for(var index = 8; index < 18 ; index++){ //fill in all of the hours
            if (index == 0) {   // if index = 0 
                timeBlocksList.push((index + 12) + "AM");  // Add hour to timeBlocksList
            }
            else if (index < 12) {  // if index < 12 
                timeBlocksList.push(index + "AM");  // Add hour to timeBlocksList
            }
            else if (index == 12) { // if index = 12 
                timeBlocksList.push(index + "PM");  // Add hour to timeBlocksList
            }
            else if (index > 12) {  // if index > 12 
                timeBlocksList.push((index - 12) + "PM");  // Add hour to timeBlocksList
            }
        }                                
    }
    getListOfHours();   // Call getListOfHours function

    // This loop through the timeBlocksList array and append time-block to the container div
    $.each(timeBlocksList, function(index) {
        // Create the row div
        var timeBlockEl = $("<div>");   // Create a div element
        timeBlockEl.addClass("row time-block"); // Add classes to the new div
        timeBlockEl.attr("data-hour", timeBlocksList[index]);   // Set data-hour attribute with timeBlocksList value

        // Create the hour span
        var hourEl = $("<span>");   // Create a span element
        hourEl.addClass("col-1 hour");  // Add classes to new span 
        hourEl.text(timeBlocksList[index]); // Set span text with timeBlocksList value

        // Create the textarea
        var meetingEl = $("<textarea>");    // Craete a textarea element
        if ((index + 8)  < currentTime) {   // if hour is before current hour
            meetingEl.addClass("col-10 description past");  // Add class of past to textarea
        } 
        else if ((index + 8) == currentTime) {  // if hour is current hour
            meetingEl.addClass("col-10 description present");   // Add class of present to textarea
        } 
        else if ((index + 8) > currentTime) {   // if hour is after current hour
            meetingEl.addClass("col-10 description future");    // Add class of future to textarea
        } 

        // Check if there is any local storage of each time-block
        if (localStorage.getItem(timeBlocksList[index]) !== null) {
            meetingEl.text(localStorage.getItem(timeBlocksList[index]));    // Set textarea content to be same as the local storage
        }

        // Create save button 
        var buttonSave =$("<button>");  // Create a button element
        buttonSave.addClass("col-1 saveBtn");   // Add classes to button
        buttonSave.html("<i class='fas fa-save'></i>"); // Add i tag with font awesome icon

        timeBlockEl.append(hourEl);             // Append hour span to row div
        timeBlockEl.append(meetingEl);          // Append textarea to row div
        timeBlockEl.append(buttonSave);         // Append button to row div
        $(".container").append(timeBlockEl);    // Append row div to container div
    })

    // Event LIstening for Save Button
    $(".saveBtn").on("click", function() {
        var parentOfButton = $(this).parent();  // Find parent of the button pressed
        var siblingOfButton = $(this).siblings("textarea");  // Finds the sibling (textarea) of the button pressed
        if (siblingOfButton.val() !== "") {     // If textarea content is not empty 
            localStorage.setItem(parentOfButton.attr("data-hour"), siblingOfButton.val())   // Save textarea content to local storage with data-hour attr value
        }
    })
})


