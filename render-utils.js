export function renderTodo(todo) {
    // create a div and a p tag

    const todoContainer = document.createElement('div');
    const pTag = document.createElement('p');

    todoContainer.classList.add('incomplete');

    todoContainer.classList.add('todo');

    pTag.textContent = todo.todo;

    todoContainer.append(pTag);

    return todoContainer;

}