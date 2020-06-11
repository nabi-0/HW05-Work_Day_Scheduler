var theAbyss = "NatBlahDayPlanner";
//localStorage.removeItem(theAbyss);
var now = moment();
//element ref
var timebox = $("#timebox");
var tryingAbyss = localStorage.getItem(theAbyss);
var storage = {
    slot: new Array(9).fill("")
};
if (tryingAbyss !== null)
    storage = JSON.parse(tryingAbyss);
console.log(storage);
// format current date and time
var currentDay = now.format('dddd, MMMM Do');
$("#currentDay").text(currentDay);
var currentHour = now.format('h A');
// change to test class conditions for hour block color
// var currentHour = "12 PM";
//console.log("currentHour: " + currentHour);
 
// create array of all times
var allTimes = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 PM"];
// get index of current hour
var currentTimeIndex = allTimes.indexOf(currentHour);
//console.log("currentIndex: " + currentTimeIndex);
// create array of work times
var workTimes = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
 
for (let i = 0; i < workTimes.length; i++) {
   var time = workTimes[i];
   // get index of current time block
   var currentTimeBlockIndex = allTimes.indexOf(time);
   //console.log("currentBlockIndex: " + currentTimeBlockIndex);
   // compare index of current hour and current time block
   var blockClass = "";
   if (currentTimeIndex == currentTimeBlockIndex) {
       blockClass = "present";
   } else if (currentTimeIndex < currentTimeBlockIndex) {
       blockClass = "future";
   } else {
       blockClass = "past";
   };
   //console.log(time + " " + blockClass);
   // remove spaces (for setting ids below)
   time = time.replace(/\s/g, '');
   //console.log(time);
   
   //creating elements
   var timeSlot = $("<section>");
   var timeCol = $("<div>");
   var textCol = $("<textarea>");
   var buttCol = $("<button>");
   
   //
   timeSlot.addClass("row");
   timeCol.addClass("hour");
   textCol.addClass(blockClass); //var
   buttCol.addClass("saveBtn far fa-save");
   buttCol.attr("id", i);
   
   timeCol.text(time);
   textCol.val(storage.slot[i]);
   
   //parent function timeSlot into section
   timeSlot.append(timeCol);
   timeSlot.append(textCol);
   timeSlot.append(buttCol);
   
   //timeCOl.appendChild(timeSlot);
   //textCol.appendChild(timeSlot);
   
   timebox.append(timeSlot);
}
//array of saved buttons
$(".saveBtn").on("click", function() {
    //var parent = $(this).parent();
    //var textIn = parent.children("textarea")
    var textIn = $(this).siblings("textarea");
    var index = $(this).attr("id");
    //console.log(index);
    var textValue = textIn.val();
    //console.log(textValue);
    storage.slot[index] = textValue;
    console.log(storage);
    localStorage.setItem(theAbyss, JSON.stringify(storage));
});
$("#refresh").on("click", function() {
    localStorage.removeItem(theAbyss);
    location.reload();
});
