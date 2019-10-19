import React from 'react';
import TaskElement from './TaskElement';

function TaskList(props) {
  const taskList = props.taskList;
  const onGoing = [];
  const completed = [];

  for (let i = taskList.length - 1; i >= 0; i--){
    const newElement = (
      <li className="task-item" key={taskList[i]._id}>
        <TaskElement task={taskList[i]} taskIndex={i} />
      </li>
    );
    if (taskList[i].completed){
      completed.push(newElement);
    } else {
      onGoing.push(newElement);
    }
  }

  if (onGoing.length === 0 && completed.length === 0){
    return (
      <h3>Add Some Tasks!</h3>
    );
  } else {
    return (
      <span>
        {onGoing.length > 0
          && <ul id="ongoing" className="task-list">{onGoing}</ul>
        }
        {completed.length > 0 // Separated because i don't want to wrap them in a container tag
          && <h3>Completed</h3>
        }
        {completed.length > 0
          && <ul id="completed" className="task-list">{completed}</ul>
        }
      </span>
    );
  }
}


export default TaskList;
