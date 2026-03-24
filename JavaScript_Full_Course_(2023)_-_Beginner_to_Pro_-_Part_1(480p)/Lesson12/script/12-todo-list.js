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

    // Nan Ma na chanza shi Zuwa Arrow FNX
    // todoList.forEach(function(todoObject, index) {
    todoList.forEach((todoObject, index) => {
        const { name, dueData} = todoObject // Muna kiran wnn da Destructing Techniques.

        const html = `
                <div class="txt-style">${name}</div>
                <div class="txt-style">${dueData}</div>
                <button onclick="
                
                " class="delete-btn js-delete-btn">Delete</button>
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

    // Mun chanja wnn mun maida shi using addEvntLstener
    // Amma sai da nayi loooping nasu sabd ae code din cikin js na rubuta shi ba html ba.
    console.log(document.querySelectorAll('.js-delete-btn'));
    document.querySelectorAll('.js-delete-btn')// queryAll --> zai mana getting all btn class din
        .forEach((deleteBtn, index) => {
            deleteBtn.addEventListener('click', () => {
                todoList.splice(index, 1);
                renderTodo();
            })
        });
}

// Updating to use AddEvntLstner
document.querySelector('.js-todo-btn')
    .addEventListener('click', () => {
        addTodo();
    })

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