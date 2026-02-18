const todoList = [{
    name: 'Coding...',
    dueData: '2026-02-16'
}, {
    name: 'Hacking...',
    dueData: '2026-01-01'
}];

console.log(todoList[1].name);

renderTodo();

function renderTodo() {
    let todoListHtml = ''; //Accumulator var

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        // const dueData = todoObject.dueData; //Muna da shortcut a lokacin da muka samu var name na object da kuma sunan key na cikin objt iri 1. shine kamar haka:

        const { name, dueData} = todoObject // Muna kiran wnn da Destructing Techniques.

        const html = `
                <div class="txt-style">${name}</div>
                <div class="txt-style">${dueData}</div>
                <button onclick="
                todoList.splice(${i}, 1);
                renderTodo();
                " class="delete-btn">Delete</button>
        `;
        todoListHtml += html;
    }
    
    document.querySelector('.js-div-todo3')
    .innerHTML = todoListHtml;
}

function renderTodo1() {
    let todoListHtml = ''; //Accumulator var

    for (let i = 0; i < todoList2.length; i++) {
        const plan = todoList2[i];
        const html = `<p class="txt-style">${plan}</p>`;
        todoListHtml += html;
    }
    
    document.querySelector('.js-div-todo2')
    .innerHTML = todoListHtml;
}

const todoList1 = [];

function addTodo1() {
    const todo = document.querySelector('.js-todo-list1');
        const name = todo.value;
            todoList1.push(name);
            todo.value = ''; // zai mana reseting abun cikin input.           

}

const todoList2 = [];

function addTodo2() {
    const todo = document.querySelector('.js-todo-list2');
        const name = todo.value;
            todoList2.push(name);
            todo.value = ''; // zai mana reseting abun cikin input.
            renderTodo1();

}

function addTodo() {
    const todo = document.querySelector('.js-todo-list3');
        const name = todo.value;

        const addDate = document.querySelector('.js-date');
            const dueData = addDate.value;

            todoList.push({
                name: name,
                dueData: dueData
            });
            todo.value = ''; // zai mana reseting abun cikin input.    
            renderTodo();       

}

function enterKey1(event) {
    if (event.key === 'Enter') {
        renderTodo();
    }
}

function enterKey2(event) {
    if (event.key === 'Enter') {
        renderTodo1();
    }
}