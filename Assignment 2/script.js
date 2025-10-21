//new Date()  -->  creates a date object with date & time.
//getTime() --> gives the current time in milliseconds
//toLocaleTimeString() --> converts the time to a user-friendly format in human readable way.

// 1. using the date object to calculate the time 15 minutes ahead of the current time.
//javascript stores time as the number of milliseconds since jan 1, 1970
//1 minute= 60 seconds 
//1 second = 1000 milliseconds
//15 minutes = 15x60x1000 = 900000 milliseconds

// let currentTime = new Date();     //creating a new date object //new Date() |gets the current date & time.
// let currentMilsec = currentTime.getTime();   //.getTime | converts it to milliseconds
// let futureMilsec = currentMilsec + (15 * 60 * 1000);    //adding 15 minutes in milliseconds , 900000 adds 15 minutes
// let futureTime = new Date(futureMilsec);   //creating a new date from future millisec this gives the new time after 15 minutes. new date(...) converts back to readable date &time.
//      //logging both current and future 
// console.log("Current Time:", currentTime.toLocaleTimeString());    // toLocaleTimeString() displays output in  human readable format, based on the user local format.
// console.log("Time after 15 minutes:", futureTime.toLocaleTimeString());








// 2. using the Date  object to calculate the time 5 hours behind the current time.

// let currentTime = new Date(); //gets the current date & time
// let fiveHoursInMs = 5 * 60 * 60 * 1000; // calculates 5 hours in milliseconds
// let newTime = new Date (currentTime.getTime() - fiveHoursInMs); //subtracts 5 hours  from currentTime
//      //displays current and the 5 hours ago time
// console.log("current Time: " + currentTime.toLocaleTimeString());
// console.log("Time 5 hours ago: " + newTime.toLocaleTimeString());


// 3. 

// function isBackdated(inputTimeString){   //inputTimeString  is a parameter or placeholder used in the function to receive a date-time string whhen the function is called
//     //like : isBackdated("Tue jul 08 2025 10:23:04 GMT+0530 (India Standard Time)");
//     let inputDate = new Date(inputTimeString); //convert the input string into a Date object
//     let currentDate = new Date(); //gets the current date / time 

//     return inputDate < currentDate;  // it checks is inputDate before currentDate? , if yes the function returns true (means its backdated) , if not ,it returns false (its in the future or exactly now)
// }
//  let time = "Tue jul 08 2025 10:23:04 GMT+0530 (India Standard Time)"; //input time is stored in the variable time 
//  console.log(isBackdated(time)); //is called with that string // the result true or false is printed in the console
 

// 4. let now = new Date(); //gets the current date/time
//  let timeIn12HourFormat = now.toLocaleTimeString('en-US'); //convetsto 12hour time format using toLocaleTimeString()  in a human readable format , en-us makes sure its in 12-hour format
//  console.log("Current time in 12-hour format:",timeIn12HourFormat);


//  
//5.

// let currentYear = new Date().getFullYear(); //gets current year
// let birthday = new Date(currentYear , 3 , 17); // month is 0-based (3=april) , creates a date object for birthday this year
// let dayIndex = birthday.getDay(); //gets day index eg. 0=sunday,..1=monday,....6=saturday
// let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ]; //array of day names
// console.log("My birthday falls on :" + days[dayIndex] + " this year.");           //prints the result