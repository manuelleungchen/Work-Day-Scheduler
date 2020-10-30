# Work-Day-Scheduler
Work Day Scheduler with JQuery


Pseudo Coding


Create grip layout with rows and cols.
Each rows represents a timeblock (1 col for hour, 10 cols for textarea, 1 col for buttons)
Add the corresponding CSS classes
Create an array with the 24 hours of the day
Check current day and day saved on local storage
If it doesnt match, this is a new day. So clear local storage and save new current date
Loop throup the array to general the timer block for each hour with its button and description if available. 
Add a event listening to check for when a button is click
When a button is click and textarea is not empty, save hour and textarea text to localstorage


