const heading = document.getElementById("main-heading");
heading.innerHTML = "Welcome <span>Student</span>";

const paragraph = document.getElementsByClassName("description");
paragraph[0].textContent ="DOM is powerful";
paragraph.style.color="blue";

const buttons = document.querySelectorAll("button");
buttons[1].textContent="Clicked!";


const hiddenSpan = document.querySelector("div span");
console.log("innerText:", hiddenSpan.innerText); // Won't show hidden content
console.log("textContent:", hiddenSpan.textContent); // Shows hidden content


// let count = 0;
// for(let i=0; i<5; i++){
//     let temp ='';
//     for(let j=0;j<5; j++){
//         count++
//         temp=temp+count+' ';
//     }
//     console.log(temp);
// }
