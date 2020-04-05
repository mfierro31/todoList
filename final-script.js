//selecting the form, input box, ul
const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo');
const ul = document.querySelector('ul');

const savedTodos = JSON.parse(localStorage.getItem('lis')) || [];

for (let todo of savedTodos) {
  let li = document.createElement('li');
  li.innerText = todo.todo + ' ';
  li.done = todo.done; // this can be simplified
  li.removed = todo.removed;  // this can be simplified
  const doneBtn = document.createElement('button');
  const removeBtn = document.createElement('button');
  //set their innerText and class names
  doneBtn.innerText = 'Done!';
  doneBtn.className = 'done';
  removeBtn.innerText = 'Remove';
  removeBtn.className = 'remove';
  //append them to the li
  li.append(doneBtn);
  li.append(removeBtn);
  if (li.done) {
    li.style.textDecoration = "line-through";
  }

  //append the li to the ul
  ul.append(li);

  // needed to move this below so it actually removes the li after it's appended to the ul
  if (li.removed) {
    li.remove();
  }
}

form.addEventListener('submit', function (e) {
  //if they try to submit nothing, script will stop running and alert will pop up
  if (input.value === '') {
    alert('You have to put something in!');
    return;
  } else {
    //prevent the page from refreshing
    e.preventDefault();
    //create the li
    const li = document.createElement('li');
    //set li to whatever the user types in
    li.innerText = input.value + ' ';
    //create done and remove buttons
    const doneBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    //set their innerText and class names
    doneBtn.innerText = 'Done!';
    doneBtn.className = 'done';
    removeBtn.innerText = 'Remove';
    removeBtn.className = 'remove';
    //append them to the li
    li.append(doneBtn);
    li.append(removeBtn);
    //set the done property on the li to false
    li.done = false;
    li.removed = false;
    //append the li to the ul
    ul.append(li);
    //save todo and done value to local storage
    savedTodos.push({todo: input.value, done: false, removed: false});
    localStorage.setItem('lis', JSON.stringify(savedTodos));
    //clear the text inside the input box
    input.value = '';
  }
});

//add event listener to listen for the click of the done and remove buttons
ul.addEventListener('click', function (e) {
  let clickedItem = e.target; // I store the clicked button to a variable for easier access below

  if (e.target.className === 'done') { // handle done click logic
    if (!clickedItem.parentElement.done) {  // we check the li (parent of the button) is not done
      clickedItem.parentElement.style.textDecoration = "line-through";
      clickedItem.parentElement.done = true;
    } else { // handle situation when it's done
      clickedItem.parentElement.style.textDecoration = "none";
      clickedItem.parentElement.done = false;
    }

    for (let todo of savedTodos) {  // we loop over all the todo objects and compare the todo text to idenfity the one that we need to alter the .done property to (we use innerText)
      if (todo.todo + " Done!Remove" === clickedItem.parentElement.innerText) {
        todo.done = clickedItem.parentElement.done; // we set the .done property to the found todo
        localStorage.setItem("lis", JSON.stringify(savedTodos));  // we store the changes to localStorage
      }
    }
  }

  if (e.target.className === 'remove') {  // handling remove button logic
    e.target.parentElement.remove();  // we remove the li (parent of the button) from the page

    let deletedItem = e.target.parentElement;
    deletedItem.removed = true;  // we set the .removed property to true

    for (let todo of savedTodos) { // similarly we loop over all todo objects to find the current one by comparing innerText values
      if (todo.todo + " Done!Remove" === deletedItem.innerText) {
        todo.removed = clickedItem.parentElement.removed; // we mark that one as removed by setting .remove to true
        localStorage.setItem("lis", JSON.stringify(savedTodos));  // we store the changes to localStorage
      }
    }
  }
});
