
$(document).ready(function() {
    var currentDate = moment().format("dddd, MMMM Do");
    var currentTime = parseInt(moment().format("H"));

    // Check if there is any lcoal storage of that time block
    if (localStorage.getItem("date") !== null) {
        if (localStorage.getItem("date") !== currentDate) {
            // clear local
            localStorage.clear();
            localStorage.setItem("date", currentDate);
        }
    }
    else if (localStorage.getItem("date") === null) {
        localStorage.setItem("date", currentDate);
    }
    // clear local
    // localStorage.clear();
    var timeBlocksList = [];

    function getListOfHours(){
        for(var index = 8; index < 18 ; index++){ //fill in all of the hours
            if (index == 0) {
                timeBlocksList.push((index + 12) + "AM");  //add to beginning of array
            }
            else if (index < 12) {
                timeBlocksList.push(index + "AM");  //add to beginning of array
            }
            else if (index == 12) {
                timeBlocksList.push(index + "PM");  //add to beginning of array
            }
            else if (index > 12) {
                timeBlocksList.push((index - 12) + "PM");  //add to beginning of array
            }
        }                                //do this for all 24 hours
    }
    getListOfHours();

    $("#currentDay").text(currentDate);

    $.each(timeBlocksList, function(index) {

        var timeBlockEl = $("<div>");
        timeBlockEl.addClass("row time-block");
        timeBlockEl.attr("data-hour", timeBlocksList[index]);

        var hourEl = $("<span>");
        hourEl.addClass("col-1 hour");
        // hourEl.css({ height: "80px;"});
        hourEl.text(timeBlocksList[index]);

        var meetingEl = $("<textarea>");
        if ((index + 8)  < currentTime) {
            meetingEl.addClass("col-10 description past");    
        } 
        else if ((index + 8) == currentTime) {
            meetingEl.addClass("col-10 description present");
        } 
        else if ((index + 8) > currentTime) {
            meetingEl.addClass("col-10 description future");
        } 

        // Check if there is any lcoal storage of that time block
        if (localStorage.getItem(timeBlocksList[index]) !== null) {
            meetingEl.text(localStorage.getItem(timeBlocksList[index]));
        }

        var buttonSave =$("<button>");
        buttonSave.addClass("col-1 saveBtn");
        buttonSave.html("<i class='fas fa-save'></i>");

        timeBlockEl.append(hourEl);
        timeBlockEl.append(meetingEl);
        timeBlockEl.append(buttonSave);
        $(".container").append(timeBlockEl);

    })

    // Event LIstening for Save Button
    $(".saveBtn").on("click", function() {
        var parentOfButton = $(this).parent();
        // find the sibling textarea and altert it content. 

        var siblingOfButton = $(this).siblings("textarea");  // Finds the textarea
        if (siblingOfButton.val() !== "") {
            localStorage.setItem(parentOfButton.attr("data-hour"), siblingOfButton.val())
        }
    })
})


