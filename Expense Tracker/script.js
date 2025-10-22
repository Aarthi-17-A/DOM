//selecting the elements
const form = document.getElementById('expense-form');
const list = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');


//getting data from local storage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

//saving data to local storage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

//calculating total ammount
function calculateTotal() {
  const total = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  totalDisplay.textContent = total;
}

//creating list
function createExpenseItem(expense, index) {
  const li = document.createElement('li');
  li.innerText = `${expense.description} - ₹${expense.amount} -${expense.category}`;
  //create that category element

const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('delete-btn');
  li.appendChild(deleteBtn);
  list.appendChild(li);
  //add event on delete btn
  deleteBtn.addEventListener("click",()=>{
    console.log("hello!")
    li.remove();
  
  });
 }
 

function renderExpenses() {
  list.innerHTML = '';
  expenses.forEach((exp, idx) => createExpenseItem(exp, idx));
  calculateTotal();
}

//code delete function 

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
 
  if (!description || isNaN(amount)) return;

  
  const expense = { description, amount ,category}; 

  expenses.push(expense);
  saveExpenses();
  renderExpenses();
  form.reset();
  localStorage();
});

renderExpenses();