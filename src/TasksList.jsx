import React from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput';

class TasksList extends React.Component {
  state = {
    tasks: [
      { text: 'Buy milk', done: false, id: 1 },
      { text: 'Pick up Tom from airport', done: false, id: 2 },
      { text: 'Visit party', done: false, id: 3 },
      { text: 'Visit doctor', done: true, id: 4 },
      { text: 'Buy meat', done: true, id: 5 },
    ],
  };

  handlerOnCreate = text => {
    const { tasks } = this.state;
    const newTask = {
      id: Math.random(),
      text,
      done: false,
    };

    const updatedTasks = tasks.concat(newTask);
    this.setState({ tasks: updatedTasks });
  };

  handleTaskStatusChange = id => {
    //1.найти задачу в списке
    //2.переключить value в done
    //3. сохранить изменения в setState

    const updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        //task.done= !task.done
        return {
          ...task, //ту же задачу
          done: !task.done, //тернарник
        };
      }
      return task;
    });
    this.setState({ tasks: updatedTasks });
  };

  handleTaskDelete = id => {
    //1. filter tasks и оставить все, кроме
    //2. обгновить состояник
    const updatedTasks = this.state.tasks.filter(elem => elem.id !== id);
    this.setState({ tasks: updatedTasks });
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
