import React from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput';

const baseUrl = 'https://6272c6bfa6522e24ac3e537b.mockapi.io/v1/users';

class TasksList extends React.Component {
  state = {
    tasks: [],
  };

  //показывать задачи при отрисовке компонента
  componentDidMount() {
    this.fetchTasksList();
  }

  //задачи берет с сервера и записывает в состояние
  fetchTasksList = () => {
    fetch(baseUrl)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(tasksList => {
        this.setState({
          tasks: tasksList,
        });
      });
  };

  handlerOnCreate = text => {
    //1. Создать задачу(обьект)
    //2. запостить задачу на сервер
    //3. извлечь (fetch) лист с сервера
    // const { tasks } = this.state;
    const newTask = {
      text,
      done: false,
    };

    fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    }).then(response => {
      if (response.ok) {
        this.fetchTasksList();
      }
      throw new Error('Failed to create task');
    });

    // const updatedTasks = tasks.concat(newTask);
    // this.setState({ tasks: updatedTasks });
  };

  handleTaskStatusChange = id => {
    //1.найти задачу в списке
    //2.переключить value в done
    //3. сохранить изменения в setState

    //1. найти задачу в состоянии по id
    //2. создать updated task
    //3. обновить задачу на сервере
    //4. извлечь (fetch) обновленный список задач

    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        //task.done= !task.done
        return {
          ...task, //ту же задачу
          done: !task.done,
        };
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  };

  handleTaskDelete = id => {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        this.fetchTasksList();
      }
      throw new Error('Failed to delete task');
    });

    //1. filter tasks и оставить все, кроме удаляемого
    //2. обновить состояние
    // const updatedTasks = this.state.tasks.filter(elem => elem.id !== id);
    // this.setState({ tasks: updatedTasks });
  };

  render() {
    const sortedList = this.state.tasks //сортировка массива
      .slice()
      .sort((a, b) => a.done - b.done);

    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.handlerOnCreate} />
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
