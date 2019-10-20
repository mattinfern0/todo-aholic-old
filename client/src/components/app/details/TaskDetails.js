import React from 'react';
import moment from 'moment';
import { Events } from '../../../controllers/EventController';
import { apiEvents } from '../../../event_types';

export default function TaskDetails(props) {
  const taskInfo = props.taskInfo;
  return (
    <span>
      <header>
        <h2>{taskInfo.name ? taskInfo.name : 'No Name'}</h2>
        <button
          type="button"
          className="button-edit align-right"
          onClick={props.onEditClick}
        />
      </header>
      <p>
        Due: {moment(taskInfo.dueDate).format('MMMM D')}
      </p>
      <div className="description">
        <p>
          {
            taskInfo.description.length > 0
              ? taskInfo.description
              : 'No Description'
          }
        </p>
      </div>
      <button
        type="button"
        className="button-delete align-right"
        onClick={() => Events.publish(apiEvents.deleteTask, taskInfo._id)}
      />
    </span>
  );
}
