#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TODO_FILE = path.join(__dirname, 'todos.json');

class TodoApp {
  constructor() {
    this.todos = [];
    this.loadTodos();
  }

  async loadTodos() {
    try {
      const data = await fs.readFile(TODO_FILE, 'utf8');
      this.todos = JSON.parse(data);
    } catch (err) {
      this.todos = [];
    }
  }

  async saveTodos() {
    try {
      await fs.writeFile(TODO_FILE, JSON.stringify(this.todos, null, 2));
    } catch (err) {
      console.error('Save failed:', err.message);
    }
  }

  addTodo(text) {
    if (!text || text.trim() === '') {
      console.log('Need todo description');
      return;
    }

    const todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    this.todos.push(todo);
    this.saveTodos();
    console.log(`Added: ${todo.text}`);
  }

  listTodos() {
    if (this.todos.length === 0) {
      console.log('No todos yet');
      return;
    }

    this.todos.forEach((todo, index) => {
      const status = todo.completed ? '✓' : '○';
      console.log(`${index + 1}. ${status} ${todo.text}`);
    });
    
    const completed = this.todos.filter(t => t.completed).length;
    const total = this.todos.length;
    console.log(`${completed}/${total} done`);
  }

  completeTodo(id) {
    const todo = this.todos.find(t => t.id === parseInt(id));
    
    if (!todo) {
      console.log(`Todo ${id} not found`);
      return;
    }

    if (todo.completed) {
      console.log(`Already done: ${todo.text}`);
      return;
    }

    todo.completed = true;
    todo.completedAt = new Date().toISOString();
    this.saveTodos();
    console.log(`Done: ${todo.text}`);
  }

  deleteTodo(id) {
    const index = this.todos.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
      console.log(`Todo ${id} not found`);
      return;
    }

    const todo = this.todos[index];
    this.todos.splice(index, 1);
    this.saveTodos();
    console.log(`Deleted: ${todo.text}`);
  }

  clearCompleted() {
    const completedCount = this.todos.filter(t => t.completed).length;
    
    if (completedCount === 0) {
      console.log('No completed todos');
      return;
    }

    this.todos = this.todos.filter(t => !t.completed);
    this.saveTodos();
    console.log(`Cleared ${completedCount} todos`);
  }

  showHelp() {
    console.log(`
Commands:
  add <text>     Add todo
  list           List todos
  complete <id>  Mark done
  delete <id>    Delete todo
  clear          Clear completed
  help           Show help
`);
  }
}

async function main() {
  const todoApp = new TodoApp();
  const args = process.argv.slice(2);
  const command = args[0];
  const argument = args.slice(1).join(' ');

  await todoApp.loadTodos();

  switch (command) {
    case 'add':
      todoApp.addTodo(argument);
      break;
    
    case 'list':
    case 'ls':
      todoApp.listTodos();
      break;
    
    case 'complete':
    case 'done':
      if (!argument) {
        console.log('Need todo ID');
        break;
      }
      todoApp.completeTodo(argument);
      break;
    
    case 'delete':
    case 'remove':
    case 'rm':
      if (!argument) {
        console.log('Need todo ID');
        break;
      }
      todoApp.deleteTodo(argument);
      break;
    
    case 'clear':
      todoApp.clearCompleted();
      break;
    
    case 'help':
    case '--help':
    case '-h':
      todoApp.showHelp();
      break;
    
    default:
      if (!command) {
        todoApp.listTodos();
        console.log('Use "node todo-app.js help" for commands');
      } else {
        console.log(`Unknown command: ${command}`);
        console.log('Use "node todo-app.js help" for commands');
      }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
