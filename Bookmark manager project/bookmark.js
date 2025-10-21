const form = document.getElementById("bookmark-form");
const buttons = document.querySelectorAll(".filter-btn")
let bookmarks = [];
let filterArr =[];
let currentFilter = 'All';
const bookmarksList = document.getElementById('bookmarks-list')

// Load bookmarks when page loads

document.addEventListener("DOMContentLoaded", ()=> {
    loadBookmarks();                       
    applyFilter();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById('website-title').value;
     const url = document.getElementById('website-url').value;
      const category = document.getElementById('category').value;


      const bookmark = {
        id : Date.now(),
        title:title,
        url:url,
        category:category
      }

      bookmarks.push(bookmark);
      console.log(bookmarks);
      saveBookmarks()
      applyFilter()
      form.reset()
})


function renderBookmarks() {
    console.log("Render bookmark is working")

    bookmarksList.innerHTML = '';
    if(filterArr.length === 0){
        bookmarksList.innerHTML = '<i>No bookmarks found</i>';
        return;
    }
    filterArr.forEach((b) => {
        const bookmarkItem = document.createElement('div');
        bookmarkItem.classList.add('bookmark-item');

        bookmarkItem.innerHTML = `
        <div class="bookmark-info">
                        <h3>${b.title}</h3>
                        <a href="${b.url}" class="bookmark-link">${b.url}</a>
                        <div class="bookmark-category">${b.category}</div>
                    </div>
                    <button class="delete-btn">Delete</button>
        `
        bookmarksList.append(bookmarkItem);
        const deleteBtn = bookmarkItem.querySelector('.delete-btn')
        deleteBtn.addEventListener('click',()=>{
            handleDelete(b.id)
        });
    });

}
function handleDelete(index){
    bookmarks = bookmarks.filter(b =>b.id !== index); //reassigning again to bookmarks array using filter() to manipulate
   saveBookmarks();
   applyFilter();
}

buttons.forEach(btn =>{
    btn.addEventListener("click", () => {
        currentFilter =btn.getAttribute('data-filter');
        console.log(currentFilter);
        applyFilter()
    })
})

function applyFilter(){
    if (currentFilter === 'All'){
        console.log("filter is all")
        filterArr = bookmarks
    }else if(currentFilter === 'Work'){
        console.log("filter is Work")
        filterArr= bookmarks.filter(b => b.category === 'Work')
    }else if(currentFilter === 'Study'){
        console.log("filter is Study")
        filterArr= bookmarks.filter(b => b.category === 'Study')
    }else if(currentFilter === 'Entertainment'){
       console.log("filter is Entertainment")
       filterArr= bookmarks.filter(b => b.category === 'Entertainment')    
    }
  renderBookmarks()
}

function saveBookmarks(){
    localStorage.setItem("bookmarksArray", JSON.stringify(bookmarks));
   
}
function loadBookmarks(){
     storebookmarks = localStorage.getItem(("bookmarksArray"));
     bookmarks = JSON.parse(storebookmarks);
}

