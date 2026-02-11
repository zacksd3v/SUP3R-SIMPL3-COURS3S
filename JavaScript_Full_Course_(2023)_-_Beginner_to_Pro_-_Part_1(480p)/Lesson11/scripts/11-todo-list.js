const todoList = [];

function addTodo() {
    const todo = document.querySelector('.js-todo-list');
        const name = todo.value;
            todoList.push(name);
            console.log(todoList);
            todo.value = '';
            

}