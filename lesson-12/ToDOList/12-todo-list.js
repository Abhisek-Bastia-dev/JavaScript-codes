let todoList = JSON.parse(localStorage.getItem('todoList')) || [];
      renderToDO();
      
      
      document.querySelector('.js-add-button').addEventListener('click',() => {
        addTodoList();
      });

      function renderToDO(){
        const renderElement =document.querySelector('.js-render-area');

        let toDoHtml='';//toDoHtml is recreated every time renderToDO() runs so everyTime it runs starts with'';

        todoList.forEach((toDoObject,index) => {
          //loop not creates duplicate it starts from 0 the innerHtml deletes and creates new elements again;
        //no need define todoObject we will get by foreach.
        // const name = toDoObject.name;
        // const dueDate = toDoObject.dueDate;
        const { name } = toDoObject;
        const { dueDate } = toDoObject;
        const html= `
        <div>${name}</div> <div>${dueDate}</div><button
          " class="delete-todo-button js-delete-button">Delete</button>`;//Shows text in separate lines , Makes todos easier to read.JavaScript generates HTML code dynamically.It creates an HTML element as a string using the todo value.


        toDoHtml = toDoHtml + html;//Accumulator pattern.
        });
     
         renderElement.innerHTML=toDoHtml;// Build all HTML first, then update DOM once for better performance,Even though it looks like HTML, it is still a string in JavaScript.
        // //It becomes real HTML only when inserted into DOM:

        document.querySelectorAll('.js-delete-button').forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click',() => {
        todoList.splice(index,1);
          renderToDO();
          localStorage.setItem('todoList', JSON.stringify(todoList));
      })   
      });

      }
      
      function addTodoList(){
        const todoListElem = document.querySelector('.js-input-box');
        let name = todoListElem.value;
        const dueDateElem = document.querySelector('.js-duedate');
        let dueDate = dueDateElem.value;
        todoList.push({
          name,
          dueDate
        });
        localStorage.setItem('todoList', JSON.stringify(todoList));
        todoListElem.value ='';
        renderToDO();
         
      }
      