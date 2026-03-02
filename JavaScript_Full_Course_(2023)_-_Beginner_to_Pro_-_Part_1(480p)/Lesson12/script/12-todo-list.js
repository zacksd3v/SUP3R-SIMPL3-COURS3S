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

    todoList.forEach(function(todoObject, index) {
        const { name, dueData} = todoObject // Muna kiran wnn da Destructing Techniques.

        const html = `
                <div class="txt-style">${name}</div>
                <div class="txt-style">${dueData}</div>
                <button onclick="
                todoList.splice(${index}, 1);
                renderTodo();
                " class="delete-btn">Delete</button>
        `;
        todoListHtml += html;

    })

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        // const name = todoObject.name;
        // const dueData = todoObject.dueData; //Muna da shortcut a lokacin da muka samu var name na object da kuma sunan key na cikin objt iri 1. shine kamar haka:

       
    }
    
    document.querySelector('.js-div-todo3')
    .innerHTML = todoListHtml;
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