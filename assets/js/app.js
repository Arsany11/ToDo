const list = document.getElementById('todoItems');
let btn = document.getElementById('add');
let input = document.getElementById('inputtxt');
const items = document.querySelectorAll('.todo');
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
    if (event.target.classList.contains('trashIcon')) {
        const parentLi = event.target.closest('li');
        parentLi.remove();
    }
});
function additem() {
    const text = input.value;
    if (text) {
        // Add a new item to the list
        let li = document.createElement('li');
        li.classList.add("todo","draggable");
        li.setAttribute('draggable',true);
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

        attachDragevents(li);
        list.appendChild(li);
        //clear the input
        input.value = "";
    }
}

// adding event listener throw clicking on button or pressing enter
btn.addEventListener('click', additem);
input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        additem();
    }
});

// if working on dynamic data

function attachDragevents(item){
    item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
    });
}


list.addEventListener('dragover',(event)=>{
    event.preventDefault();
    const afterElement = getDrageAfterElement(list, event.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
        list.appendChild(draggable)
    } else {
        list.insertBefore(draggable, afterElement)
    }
})

// working on static data
//{
// items.forEach((item) => {
//     item.addEventListener('dragstart', () => {
//         item.classList.add('dragging');
//     });

//     item.addEventListener('dragend', () => {
//         item.classList.remove('dragging');
//     });
// })

// items.forEach(item => {
//     item.addEventListener('dragover', (event) => {
//         event.preventDefault();
//         const afterElement = getDrageAfterElement(list, event.clientY)
//         const draggable = document.querySelector('.dragging')
//         if (afterElement == null) {
//             list.appendChild(draggable)
//         } else {
//             list.insertBefore(draggable, afterElement)
//         }
//     })
// })
//}
function getDrageAfterElement(list, y) {
    const draggableElements = [...list.querySelectorAll('.todo:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        console.log(offset);
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
