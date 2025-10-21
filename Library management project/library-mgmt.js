const toggleFormBtn = document.getElementById("toggle-form");
const bookForm = document.getElementById("book-form");
const typeSelect = document.getElementById("type");
const ebookDetails = document.getElementById("ebook-details");
const bookList = document.getElementById("book-list");
const addBooksection = document.querySelector("#add-book-section");
let books = [];

toggleFormBtn.addEventListener("click", () => {
    if(addBooksection.style.display === 'none') {
        addBooksection.style.display = 'block';
        toggleFormBtn.textContent = 'Hide Form'
    } else {
         addBooksection.style.display = 'none';
          toggleFormBtn.textContent = 'Add New Book'
    }
})

typeSelect.addEventListener("change", () => {
    //if select element has value of ebook => display ebookdetails
    //else => hide ebookdetails

    if(typeSelect.value === 'E-Book') {
        ebookDetails.style.display = 'block';
    } else {
        ebookDetails.style.display = 'none';
    }
})

bookForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value
    let book;

    if(typeSelect.value === 'E-Book') {
        const fileSize = document.getElementById('fileSize').value;
        book = new EBook(title,author,fileSize);
    } else {
        book = new Book(title,author);
    }
    
    console.log('book submitted is:',book);
   // console.log(book.getHTML());
   // console.log(book.getHTML());
    books.push(book); //

    console.log('total books in the books array after submission: ',books)
    //console.log('submitted books: ',books)
   saveBooks(); //save books to local storage

   displayBooks();
   

    bookForm.reset();
})


class Book {
    constructor(title,author) {
        this.title = title 
        this.author = author 
        this.id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7); 
        this.type = 'physical'
        this.available = true
        this.borrower = null
    }

    borrow(borrower) {
        this.available = false
        this.borrower = borrower 
    }

    markReturn() {
         this.available = true
         this.borrower = null 
    }


    getHTML() {
        return `
        <div class="book-card" data-id="${this.id}">
         <h3 class="book-title">${this.title}</h3>
                        <div class="book-meta">Author: ${this.author}</div>
                        <div class="book-meta">Status: 
                        ${this.borrower? `borrowed by ${this.borrower}` : `Availble`}
                        </div>
                        <div class="book-actions">
                            ${this.available? `<button class="btn btn-borrow">Borrow</button>`:
                                `<button class="btn btn-return">Return</button>`
                            }
                              
                            <button class="btn btn-remove">Remove</button>
                        </div>
        </div>
            `
    }
}

class EBook extends Book {
    constructor(title,author,fileSize) {
        super(title,author)
        this.fileSize = fileSize;
        this.type = 'ebook';
    }

    borrow(borrower) {
        this.borrower = borrower;
    }

    markReturn() {
         this.borrower = null;
    }

    //include another div for file size
    //buttons text should change from borrow to download

    getHTML() {
        return `
        <div class="book-card ebook" data-id="${this.id}">
         <h3 class="book-title">${this.title}</h3>
                        <div class="book-meta">Author: ${this.author}</div>
                        <div class="book-meta">File Size: ${this.fileSize}</div>
                        <div class="book-meta">Status: 
                        ${this.borrower? `downloaded by ${this.borrower}` : `Availble`}
                        </div>
                        <div class="book-actions">
                            ${this.borrower? `<button class="btn btn-return">Return</button>`:
                                `<button class="btn btn-borrow">Download</button>`
                            }
                              
                            <button class="btn btn-remove">Remove</button>
                        </div>
        </div>
            `
    }
}

function displayBooks() {
    //console.log('books:',books)
    bookList.innerHTML = '';

    if(books.length === 0) {
        bookList.innerHTML = `No books found`
    } else {
        books.forEach(b => {
            bookList.innerHTML += b.getHTML();
           
        })
        
        document.querySelectorAll('.btn-borrow').forEach(btn => {
            btn.addEventListener("click", (e) => {

                const bookId = e.target.closest('.book-card').getAttribute("data-id");
                const bookBorrower = prompt('Enter your name');
                if(bookBorrower) {
                    borrowBooks(bookId, bookBorrower);
                }
                
            })
        }) 
       

         document.querySelectorAll('.btn-return').forEach(btn => {
            btn.addEventListener("click", (e) => {

                const bookId = e.target.closest('.book-card').getAttribute("data-id");
                
                returnBooks(bookId);
            })
        })


         document.querySelectorAll('.btn-remove').forEach(btn => {
            btn.addEventListener("click", (e) => {

                const confirmReturn = confirm("Are you sure you want to return?")
                if(confirmReturn) {
                    const bookId = e.target.closest('.book-card').getAttribute("data-id");
                    removeBooks(bookId);
                }  
            })
        })

        

    }
}


function borrowBooks(bookId,bookBorrower) {
    books.forEach(b => {
        if(b.id == bookId) {
            b.borrow(bookBorrower);
            //console.log(b);
        }
    })
    saveBooks();
    displayBooks();
} 

function returnBooks(bookId) {
     books.forEach(b => {
        if(b.id == bookId) {
            b.markReturn()
        }
    })
    saveBooks();
    displayBooks();
}

function removeBooks(bookId) {
    //find the matching element in the books array
    //remove that element from the books array
    //call the displayBooks function

    console.log('the books received by remove books function: ',books)
   books =  books.filter(book => book.id != bookId);
   console.log('the books array after filtering items:',books)
   //user clicked 1 book //books array has 10 books 
   //out of the 10 books which book has matching id??
   //find that one book and remove it from books
   //keep the remaining 9 books inside books array
   saveBooks(); 
   displayBooks();
} 


function saveBooks() {
    localStorage.setItem("booksArray", JSON.stringify(books))
}

function loadBooks() {
    const storedBooks = localStorage.getItem("booksArray"); //in string data type
    //convert it back into object //json.parse

    const bookObjects = storedBooks? JSON.parse(storedBooks) : [];
    books = bookObjects.map(obj => {
        if (obj.type === "ebook") {
          const book = new EBook(obj.title, obj.author, obj.fileSize);
          book.id = obj.id;
          book.borrower = obj.borrower;
          book.available = obj.available;

          return book;
        } else {
          const book = new Book(obj.title, obj.author);
          book.id = obj.id;
          book.borrower = obj.borrower;
          book.available = obj.available;

          return book;
        }
        
    })
    //console.log("updated books: ",bookObjects);
}

function addDefaultBooks() {
    //created defaultbooks and defaultebooks at the same time
    //merge bboth arrys into single array using spread operator
    //taking each book from the array we create and pushing it into books array
     const defaultBooks = [
      new Book("To Kill a Mockingbird", "Harper Lee"),
      new Book("1984", "George Orwell"),
      new Book("The Great Gatsby", "F. Scott Fitzgerald"),
      new Book("Pride and Prejudice", "Jane Austen")
    ];

  const defaultEbooks = [
      new EBook("The Digital Age", "Mark Stevenson", 3.5),
      new EBook("Programming Basics", "John Smith", 8.2),
      new EBook("Artificial Intelligence", "Alan Turing", 5.7)
    ];

    [...defaultBooks,...defaultEbooks].forEach(book => {
        books.push(book);
    })
    saveBooks(); //to save these 7 books in local storage
}


document.addEventListener("DOMContentLoaded", () =>{
   //addDefaultBooks();
   loadBooks();
   if(books.length === 0) {
        console.log('books array is empty')
        addDefaultBooks();
   }
   
     //if I don't call loadBooks here, why is it that default books are showing
    //but new entries are not appearing on reload?
   //populate the books array with items from local storage
     displayBooks();//so that it renders book cards on the page
});