let currentFilter = "all";  
function generatetaskId(){
  return Math.floor(1000 + Math.random() * 9000);

}
generatetaskId()

const btn=document.getElementById("addbtn");
const input=document.getElementById("input");
const tasklist=document.getElementById("tasklist");

let task=[];
  
btn.addEventListener("click",function(){

    const taskText=input.value.trim();
    if(taskText === "") return;  //checks it is an empty space then return stops the function then no li will be created
    console.log(taskText);
    addTask(taskText)
    //task.push(taskText);
    console.log(task);

     tasklist.innerHTML = '';
     applyFilter();  
     updateCounter();  

    });

function addTask(userInput){
  const newtask ={
    id: generatetaskId(),
    text: userInput,
    completed: false
  }
  console.log("the new task is",newtask);
  task.push(newtask)

}  

function showtask(displayTasks = task){
    if(displayTasks.length === 0){
     tasklist.innerHTML='<li class="empty-message">your to do list is empty</li>'
     return;
    }

    tasklist.innerHTML = ''; // Clear list first

    displayTasks.forEach((tasks) => {
    

    const li1=document.createElement("li")
    li1.setAttribute("data-id", tasks.id);
    //console.log(li1);
    const checkbox=document.createElement("input");
    //console.log(liInput);
    const span1=document.createElement("span");
    //console.log(span1);
    const delbtn=document.createElement("button");

    //adding attributes and values
    checkbox.type="checkbox";
    checkbox.checked=tasks.completed;//false
    checkbox.addEventListener("change" ,() => {
        handleToggle(tasks.id)
    });

    span1.innerText=tasks.text;

    if(checkbox.checked === true){
      span1.classList.add('completed');
   }//else{
  //     span1.classList.remove('completed');
  //  }
    

    delbtn.innerHTML='<i class="fa fa-trash" aria-hidden="true"></i>'

    //append into li
    li1.append(checkbox);
    li1.append(span1);
    li1.append(delbtn);
    console.log(li1)
    tasklist.append(li1);         
     
    // Removes the <li> when the delete button is clicked.

    // delbtn.addEventListener("click", () => {  
    //     li1.remove();
    // });

   })
   input.value = "";   //Clears the input box after adding a task  

}

function handleToggle(id){
  task = task.map((tasks) => {
    if(tasks.id === id){
    return { ...tasks, completed: !tasks.completed };  // toggle complete
    }
      return tasks; 
  });
applyFilter();
updateCounter();  
}

document.addEventListener("DOMContentLoaded", () => {
    applyFilter();
    updateCounter();  
    
})

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Step 4.1: Remove 'active' from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        
        // Step 4.2: Add 'active' to the clicked button
        this.classList.add("active");
     
                // Step 2: Update filter
        currentFilter = this.dataset.filter;
        console.log("Current Filter:", currentFilter);

        applyFilter();
   
    });
});

function applyFilter() {
    let filterArr = [];

    if (currentFilter === "all") {
        filterArr = task;
    } else if (currentFilter === "active") {
        filterArr = task.filter(t => t.completed === false);
    } else if (currentFilter === "completed") {
        filterArr = task.filter(t => t.completed === true);
    }

    showtask(filterArr);
}

input.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    event.preventDefault();
    // Trigger the button element with a click
    btn.click();
  }
});

function updateCounter() {
  const activeCount = task.filter(t => !t.completed).length;
  const counter = document.getElementById("task-counter");

  if (activeCount === 0) {
    counter.innerText = "No items left";
  } else if (activeCount === 1) {
    counter.innerText = "1 item left";
  } else {
    counter.innerText = `${activeCount} items left`;
  }
}

const clearBtn = document.getElementById("clear-completed");

clearBtn.addEventListener("click", function () {
  // Step 2: Remove completed tasks
  task = task.filter(t => !t.completed);

  // Step 3: Re-render UI
  applyFilter();     // show updated task list
  updateCounter();   // update active task count
});

