const list = document.getElementById('todoItems');
let btn = document.getElementById('add');
let input = document.getElementById('inputtxt');
list.addEventListener('click', (event) => {
    // Check if the clicked element is an icon
    if (event.target.classList.contains('checkIcon')) {
        // Find the parent <li> of the clicked icon
        const parentLi = event.target.closest('li');

        if (parentLi.classList.contains('done')) {
            parentLi.classList.remove('done');
        }
        else {
            parentLi.classList.add('done');
        }
    }
    if(event.target.classList.contains('trashIcon')) {
        const parentLi = event.target.closest('li');
        parentLi.remove();
    }
});


btn.addEventListener('click', (event) => {

    const text = input.value;
    if (text) {
        // Add a new item to the list
        let li = document.createElement('li');
        //first icon
        let listIcon = document.createElement('i');
        listIcon.classList.add("fa-solid", "fa-list", "listIcon");
        // second icon
        let checkIcon = document.createElement('i');
        checkIcon.classList.add("fa-regular", "fa-circle-check", "checkIcon");
        //third icon
        let trashIcon = document.createElement('i');
        trashIcon.classList.add("fa-solid", "fa-trash", "trashIcon");
        // forth icon
        let editIcon = document.createElement('i');
        editIcon.classList.add("fa-solid", "fa-pen", "editIcon");
        // craete span for text input
        let span = document.createElement('span');
        span.classList.add("mytext")
        span.textContent = text;
        // append all elements to li
        li.appendChild(listIcon);
        li.appendChild(checkIcon);
        li.appendChild(trashIcon);
        li.appendChild(span);
        li.appendChild(editIcon);
        list.appendChild(li);
        //clear the input
        input.value = "";
    }
    console.log(text);
});
