import { 
    checkAuth, 
    createTodo, 
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos, 
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');
const loadingEl = document.querySelector('.loading-spinner');

function toggleLoadingSpinner() {
    loadingEl.classList.toggle('invisible');
}

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('hello');
    const data = new FormData(todoForm);

    await createTodo({
        todo: data.get('todo')
    });

    todoForm.reset();


    displayTodos();
    // on submit, create a todo, reset the form, and display the todos
});

async function displayTodos() {

    toggleLoadingSpinner();
    todosEl.textContent = '';

    // fetch the todos
    const todos = await getTodos();

    for (let todo of todos){

        let todoList = renderTodo(todo);


        if (todo.complete === true){
            todoList.classList.add('complete');
            // todoList.sort();
        } else {
            todoList.addEventListener('click', async () => {
                await completeTodo(todo.id);

                await displayTodos();

            });
            
        }   
        todosEl.append(todoList);
    
    
    }
    toggleLoadingSpinner();


}


    // display the list of todos

    // be sure to give each todo an event listener

    // on click, complete that todo
window.addEventListener('load', async () => {
    await displayTodos();

    
});


// add an on load listener that fetches and displays todos on load

logoutButton.addEventListener('click', () => {
    logout();
});


deleteButton.addEventListener('click', async () => {

    await deleteAllTodos();
    await displayTodos();



    // delete all todos

    // then refetch and display the updated list of todos
});