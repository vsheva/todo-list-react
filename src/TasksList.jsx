import React from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput';
import { createTask, fetchTasksList, updateTask, deleteTask } from './tasksGateway';

class TasksList extends React.Component {
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    fetchTasksList().then(tasksList => {
      this.setState({ tasks: tasksList });
    });
  };

  onCreate = text => {
    const newTask = {
      text,
      done: false,
    };

    return createTask(newTask).then(() => this.fetchTasks());
  };

  handleTaskStatusChange = id => {
    const { done, text } = this.state.tasks.find(task => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };

    updateTask(id, updatedTask).then(() => this.fetchTasks());
  };

  handleTaskDelete = id => {
    deleteTask(id).then(() => this.fetchTasks());
  };

  render() {
    const sortedList = this.state.tasks //сортировка массива
      .slice()
      .sort((a, b) => a.done - b.done);

    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map(elem => (
            <Task
              onDelete={this.handleTaskDelete}
              onChange={this.handleTaskStatusChange}
              key={elem.id}
              {...elem} //*
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default TasksList;

//*
// done={elem.done}
// text={elem.text}

//       { text: 'Buy milk', done: false, id: 1 },
//       { text: 'Pick up Tom from airport', done: false, id: 2 },
//       { text: 'Visit party', done: false, id: 3 },
//       { text: 'Visit doctor', done: true, id: 4 },
//       { text: 'Buy meat', done: true, id: 5 },

//handleTaskStatusChange
//1.найти задачу в списке
//2.переключить value в done
//3. сохранить изменения в setState

//1. найти задачу в состоянии по id
//2. создать updated task
//3. обновить задачу на сервере
//4. извлечь (fetch) обновленный список задач

//handleTaskDelete
//1. filter tasks и оставить все, кроме удаляемого
//2. обновить состояние
// const updatedTasks = this.state.tasks.filter(elem => elem.id !== id);
// this.setState({ tasks: updatedTasks });

//onCreate
//1. Создать задачу(обьект)
//2. запостить задачу на сервер
//3. извлечь (fetch) лист с сервера
// const { tasks } = this.state;
