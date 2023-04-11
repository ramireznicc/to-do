const date = document.querySelector('#date')
const list = document.querySelector('#to-do')
const input = document.querySelector('#input')
const addBtn = document.querySelector('#add-btn')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let todos

// Date
const showDate = new Date()
date.innerHTML = showDate.toLocaleDateString('en-UK',{weekday:'long', month:'long', day:'numeric'})

// Add task funciton

function addTask (task, done, deleted, id){

  if(deleted){return}
  
  const isDone = done ?check :uncheck
  const isLine = done ?lineThrough :''

  const element = `<li id='element'>
                     <i class="far ${isDone}" data="done" id="${id}"></i>
                     <p class="text ${isLine}">${task}</p>
                     <i class="fa-sharp fa-solid fa-trash-can" data="deleted" id="${id}"></i>
                   </li>
                  `

  list.insertAdjacentHTML("beforeend", element)
}

// Done Task function

function taskDone(element){
   element.classList.toggle(check)
   element.classList.toggle(uncheck)
   element.parentNode.querySelector('.text').classList.toggle(lineThrough)
   todos[element.id].done = todos[element.id].done ?false :true
}

// Deleted Task funciton

function taskDeleted(element){
  element.parentNode.parentNode.removeChild(element.parentNode)
  todos[element.id].deleted = true
}


// Events listeners

addBtn.addEventListener('click', () => {
  const task = input.value
  if(task){
    addTask(task, false, false, id) 
    todos.push({
      name: task,
      id: id,
      done: false,
      deleted: false
    })
  }
  localStorage.setItem('TODO', JSON.stringify(todos))
  input.value = ''
  id ++
})

document.addEventListener('keypress', function(event){
  if(event.key=='Enter'){
    const task = input.value
    if(task){
      addTask(task, false, false, id)
      todos.push({
        name: task,
        id: id,
        done: false,
        deleted: false
      })
    }
    localStorage.setItem('TODO', JSON.stringify(todos))
    input.value = ''
    id ++
  }
})

list.addEventListener('click', function(event){
  const element = event.target
  const elementData = element.attributes.data.value

  if(elementData === 'done'){
    taskDone(element)
  } else if(elementData === 'deleted'){
    taskDeleted(element)
  }
  localStorage.setItem('TODO', JSON.stringify(todos))
})

// LocalStorage get item

let data = localStorage.getItem('TODO')

if(data){
  todos = JSON.parse(data)
  id = todos.length
  loadList(todos)
} else{
  todos = []
  id = 0
}

function loadList(DATA){
  DATA.forEach(function(i){
    addTask(i.name, i.done, i.deleted, i.id)
  })
}