/*
    Componente "Main" da aplicação
*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //#region Atributos
  public todos: Todo[] = []; //Criar um array do tipo any, e inicializando-o vazio
  public title: string = 'Minhas Tarefas';
  public formAdicionar: FormGroup;
  public mode  = 'list';
  //#endregion

  //#region Construtor
  constructor(private fb: FormBuilder) {
    this.formAdicionar = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(60),
          Validators.required,
        ]),
      ],
    });
    this.LoadLocalData();
  }
  //#endregion

  //#region Metodos ou Funções
  Add() {
    //this.formAdicionar.value => {title : 'Titulo'}
    const title = this.formAdicionar.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.SaveLocalData();
    this.Clear();
  }

  Clear() {
    this.formAdicionar.reset();
  }
  GetIndex(todo: Todo){
    const index = this.todos.indexOf(todo);
    return index;
  }

  MarkAsDone(todo: Todo) {
    todo.done = true;
    this.SaveLocalData();
  }

  MarkAsUndone(todo: Todo) {
    todo.done = false;
    this.SaveLocalData();
  }

  Remove(todo: Todo) {
    const index = this.GetIndex(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.SaveLocalData();
  }
  SaveLocalData(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }
  LoadLocalData(){
    const data = localStorage.getItem('todos');
    if (data) {
      this.todos = JSON.parse(data);
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

  //#endregion
}
