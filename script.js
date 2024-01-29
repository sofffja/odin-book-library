const myLibrary = [];

const libraryGrid = document.querySelector('.library');
const dialog = document.querySelector('dialog');
const totalStat = document.querySelector('.total-stat');
const readStat = document.querySelector('.read-stat');

const addBookBtn = document.querySelector('#add-book');
const submitBookBtn = document.querySelector('#submit');
const closeModalBtn = document.querySelector('.close');

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;    
  }

  toggleRead() {
    this.read = !this.read;
  }
}

//SAMPLE BOOKS
myLibrary.push(new Book('Utopia', "Thomas More", 111, false))
myLibrary.push(new Book('The Dispossessed', "Ursula K. Le Guin", 333, false))
displayLibrary();

//LIBRARY
function createBookDiv(title, author, pages, read) {
  const div = document.createElement('div');
  const titleH2 = document.createElement('h2');
  const authorP = document.createElement('p');
  const pagesP = document.createElement('p');
  const buttonsDiv = document.createElement('div');
  const readBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  
  div.classList.add('book');
  
  titleH2.innerText = title ? title : 'Unknown title';
  titleH2.classList.add('title');
  
  authorP.innerText = author ? author : 'Unknown author';
  authorP.classList.add('author');
  
  pagesP.innerText = pages ? `${pages} pages` : 'Unknown pages';
  pagesP.classList.add('small');
  
  if (read === true) {
    readBtn.innerText = 'Read';
    readBtn.classList.add('read-true', 'read-btn', 'button');
  } else {
    readBtn.innerText = 'Not read';
    readBtn.classList.add('read-btn', 'button');
  }

  removeBtn.innerText = 'Delete';
  removeBtn.classList.add('button', 'remove-btn');
  
  buttonsDiv.append(readBtn, removeBtn);
  buttonsDiv.classList.add('book-buttons');
  
  div.append(titleH2, authorP, pagesP, buttonsDiv);
  libraryGrid.appendChild(div);
}

function displayLibrary() {
  for (let i in myLibrary) {
    if (!libraryGrid.childNodes[i]) {
      let book = myLibrary[i];
      createBookDiv(book.title, book.author, book.pages, book.read, i);
      setEventListeners(libraryGrid.childNodes[i]);
    }
  }
  calcStats();
}

function setEventListeners(bookDiv) {
  setDataAttributes();
  bookDiv.querySelector('.remove-btn').addEventListener('click', removeChild);
  bookDiv.querySelector('.read-btn').addEventListener('click', toggleReadBtn);
}

function removeChild(e) {
  let index = e.target.getAttribute('data');
  libraryGrid.removeChild(libraryGrid.childNodes[index]);
  myLibrary.splice(index, 1);
  setDataAttributes();
  calcStats();
}

function toggleReadBtn(e) {
  let i = e.target.getAttribute('data');
  myLibrary[i].toggleRead();
  e.target.classList.toggle('read-true');
  e.target.innerText = myLibrary[i].read ? 'Read' : 'Not read';
  calcStats();
}

function setDataAttributes() {
  let i = 0;
  for (let child of libraryGrid.childNodes) {
    child.querySelector('.remove-btn').setAttribute('data', i);
    child.querySelector('.read-btn').setAttribute('data', i);
    i++;
  }
}

function calcStats() {
  totalStat.innerText = `${myLibrary.length} books`;
  let readCount = 0;
  for (let book of myLibrary) {
    if (book.read) readCount++
  }
  readStat.innerText = `${readCount} read`
}

//MODAL DIALOG
addBookBtn.addEventListener('click', () => {
  dialog.showModal();
})

closeModalBtn.addEventListener('click', () => {
  dialog.close();
})

submitBookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.checked);
  myLibrary.push(newBook);

  displayLibrary();

  dialog.close();
  document.querySelector('form').reset();
})