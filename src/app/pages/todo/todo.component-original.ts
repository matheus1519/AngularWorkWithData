import { Component } from '@angular/core';
import { capitalizeFirstLetter } from 'src/helpers/capitalizeFirstLetter';

interface TodoItem{
  name: string
  isChecked: boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
  todos: TodoItem[] = [{ name: 'teste de nome', isChecked: true }]
  todo = ''
  
  editing = {
    is: false,
    index: -1
  }
  
  onAddNewOrExistingItem(){
    if(!this.todo) {
      return
    }

    if(!this.editing.is){
      this.todos.push({name: capitalizeFirstLetter(this.todo), isChecked: false})
    }

    if(this.editing.is){
      this.todos[this.editing.index].name = this.todo

      this.editing.is = false
    }    
      
    this.todo = ''
  }

  onRemoveItem(index: number){
    this.todos.splice(index, 1)

    this.editing.is = false
    this.todo = ''
  }

  onEditOrCancelItem(index: number){
    if(this.editing.is) {
      this.editing.is = false
      this.todo = ''

      return
    }
    

    this.editing = {
      is: true, 
      index
    }

    this.todo = this.todos[index].name
  }
}
