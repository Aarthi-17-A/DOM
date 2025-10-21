// function updateTime(){
// const timediv = document.querySelector("#time")
// console.log(timediv.innerText);

// const now = new Date().toLocaleTimeString();
// console.log(now);

// timediv.innerText = now;

// }

// setInterval(updateTime,1000);

// function updateDate(){
//     const dateDiv = document.querySelector("#date");
//     const today = new Date().toLocaleDateString('en-IN');
//     dateDiv.innerText = today;
// }
// setInterval(updateTime);



// const button = document.getElementById("btn");
// button.addEventListener("click", myfunction);

// function myfunction(){
//     console.log("hello");
//     //is24hours= !is24hours;
//     // is24hours?
//     // btn.innerText = "switch to 12-hour format"
//     // btn.innerText = "switch to 24-hour format"
    
//     //updateTime()
// }

const timediv = document.querySelector("#time");
const datediv = document.querySelector("#date");
const button = document.getElementById("btn");
let is24hours = false;

function updateTime(){
    if(is24hours){
        timediv.innerText = new Date().toLocaleTimeString('en-us',{
            hour12: false
        });        
    }else{
        timediv.innerText = new Date().toLocaleTimeString();
    }
}
setInterval(updateTime, 1000);

function updateDate(){
    datediv.innerText = new Date().toLocaleDateString('en-IN');
}
updateDate();

btn.addEventListener("click",() => {
    console.log("hello");
    is24hours = !is24hours;
    is24hours?
      btn.innerText= "switch to 12-hour format" :
      btn.innerText="switch to 24-hour format"
    updateTime();
})