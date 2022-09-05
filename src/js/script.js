const todoTemplate = document.querySelector('#todo-template')
const todo = todoTemplate.content.querySelector('.todo')
const addInput = document.getElementById('description-task')
const addButton = document.getElementById('add-task-btn')
const ul = document.querySelector('#todos-ul')
const dynamicPadding = document.getElementById('dynamic-padding')

let todoList = [];

if (JSON.parse(localStorage.getItem('todo'))){
    todoList = JSON.parse(localStorage.getItem('todo'))
    displayMessages()
    dynamicPaddingFunction()

}


function dynamicPaddingFunction(){
    if((JSON.parse(localStorage.getItem('todo'))).length === 0){
        dynamicPadding.classList.add('padding-no-task')
        dynamicPadding.classList.remove('padding-one-task')
        dynamicPadding.classList.remove('padding-two-task')
        dynamicPadding.classList.remove('padding-three-task')
        dynamicPadding.classList.remove('padding-four-and-more-task')
    }
    else if((JSON.parse(localStorage.getItem('todo'))).length === 1){
        dynamicPadding.classList.remove('padding-no-task')
        dynamicPadding.classList.add('padding-one-task')
        dynamicPadding.classList.remove('padding-two-task')
        dynamicPadding.classList.remove('padding-three-task')
        dynamicPadding.classList.remove('padding-four-and-more-task')
    }
    else if((JSON.parse(localStorage.getItem('todo'))).length === 2){
        dynamicPadding.classList.remove('padding-no-task')
        dynamicPadding.classList.remove('padding-one-task')
        dynamicPadding.classList.add('padding-two-task')
        dynamicPadding.classList.remove('padding-three-task')
        dynamicPadding.classList.remove('padding-four-and-more-task')
    }
    else if((JSON.parse(localStorage.getItem('todo'))).length === 3){
        dynamicPadding.classList.remove('padding-no-task')
        dynamicPadding.classList.remove('padding-one-task')
        dynamicPadding.classList.remove('padding-two-task')
        dynamicPadding.classList.add('padding-three-task')
        dynamicPadding.classList.remove('padding-four-and-more-task')
    }
    else if((JSON.parse(localStorage.getItem('todo'))).length >= 4){
        dynamicPadding.classList.remove('padding-no-task')
        dynamicPadding.classList.remove('padding-one-task')
        dynamicPadding.classList.remove('padding-two-task')
        dynamicPadding.classList.remove('padding-three-task')
        dynamicPadding.classList.add('padding-four-and-more-task')
    }
}

let dynamicId = 0
addButton.addEventListener('click', () =>{
    if((JSON.parse(localStorage.getItem('todo')))){
        dynamicId = (JSON.parse(localStorage.getItem('todo'))).length
    }
    let newTodo = {
        todo: addInput.value,
        checked: false,
        id: dynamicId
    };
    dynamicId += 1
    let array = []

    if(JSON.parse(localStorage.getItem('todo'))) {
        array = JSON.parse(localStorage.getItem('todo'))
    }
    array.push(newTodo)
    console.log(array)
    todoList = array
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayMessages(array)
    dynamicPaddingFunction()
})

function displayMessages(){
    let childMustDie = document.querySelector('.todo')
    if(childMustDie){
        ul.removeChild(childMustDie)
    }
    let message = ''
    todoList.forEach(function (item, i){
        message += `
            <li >
            <label>
            <input type="checkbox" id="${item.id}" ${item.checked ? 'checked' : 2}>
            ${item.todo}
            <button class="delete_btn" id="${item.id}">x</button>
            </label>                   
            </li>
        `
    })
    todo.innerHTML = message
    const clone = todoTemplate.content.cloneNode(true)
    ul.append(clone)
}


ul.addEventListener('change', (event) => {
    let idInput = parseInt(event.target.getAttribute('id'))
    let foundedElem = todoList.find(item => item.id === idInput)
    foundedElem.checked = !foundedElem.checked
    localStorage.setItem('todo', JSON.stringify(todoList))
    displayMessages()
    window.location.reload()
})

ul.addEventListener('click', (event) => {
    if(event.target && event.target.matches('.delete_btn')){
        console.log(this)
        let idInput = this.id
        let foundedElem = todoList.findIndex(item => item.id === idInput)
        todoList.splice(foundedElem, 1)
        localStorage.setItem('todo', JSON.stringify(todoList))
        displayMessages()
        dynamicPaddingFunction()
    }
})
