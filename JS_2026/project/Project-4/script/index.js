// Ajiye dukkan lists a cikin Object guda daya
let allLists = {
    'Work': [
        { name: 'Coding Project', dueData: '2026-04-10', completed: false },
        { name: 'Bug Fixing', dueData: '2026-04-12', completed: false }
    ],
    'Personal': [
        { name: 'Siyan Kayan Miya', dueData: '2026-04-05', completed: true }
    ]
};

let currentListName = 'Work';

// Fara nuna bayanan a allo
renderTodo();

function renderTodo() {
    let todoListHtml = '';
    const todoList = allLists[currentListName];

    todoList.forEach((todoObject, index) => {
        const { name, dueData, completed } = todoObject;

        const isCompletedClass = completed ? 'is-completed' : '';
        const isChecked = completed ? 'checked' : '';

        const html = `
            <input type="checkbox" ${isChecked} 
                onclick="toggleComplete(${index})" style="width:20px; height:20px; cursor:pointer;">
            <div class="txt-style ${isCompletedClass}">${name}</div>
            <div class="txt-style ${isCompletedClass}">${dueData}</div>
            <button onclick="deleteTodo(${index})" class="delete-btn">Delete</button>
        `;
        todoListHtml += html;
    });

    document.querySelector('.js-div-todo3').innerHTML = todoListHtml;
}

function addTodo() {
    const nameInput = document.querySelector('.js-todo-list3');
    const dateInput = document.querySelector('.js-date');
    
    const name = nameInput.value;
    const dueData = dateInput.value;

    if (name && dueData) {
        allLists[currentListName].push({
            name: name,
            dueData: dueData,
            completed: false
        });
        nameInput.value = '';
        renderTodo();
    } else {
        alert("Shigar da suna da kwanan wata!");
    }
}

function deleteTodo(index) {
    allLists[currentListName].splice(index, 1);
    renderTodo();
}

function toggleComplete(index) {
    // Sauya false zuwa true, ko true zuwa false
    allLists[currentListName][index].completed = !allLists[currentListName][index].completed;
    renderTodo();
}

function switchList(listName) {
    currentListName = listName;
    document.getElementById('list-header').innerText = `LIST: ${listName.toUpperCase()}`;
    renderTodo();
}