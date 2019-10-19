import { miscEvents } from '../event_types';
import { Events } from '../controllers/EventController';
import { getToken } from '../controllers/PersistentData';

async function parseBody(res) {
  const text = await res.text();
  let data = null;

  // Check if body is not empty before parsing
  if (text && text.length > 0) {
    data = JSON.parse(text);
  }
  return data;
}

async function processResponse(res) {
  console.log('Response: ', res);
  const data = await parseBody(res);
  console.log('Data: ', data);
  if (!res.ok) {
    if (res.status === 401 && getToken()) {
      // Logout if unauthorized
      Events.publish(miscEvents.logout);
    }
    const message = (data.message ? data.message : null);
    const errorObject = { 
      status: res.status,
      message,
    };
    const resError = {errorObject, data};
    throw resError;
  }

  return data;
}

export async function makeRequest(url, options) {
  // handle payload like a middleware in node
  const payload = {err: null, data: null};
  try {
    const res = await fetch(url, options);
    payload.data = await processResponse(res);
  } catch (err) {
    console.log(err);
    payload.err = err.errorObject;
    payload.data = err.data;
  }

  return payload;
}
