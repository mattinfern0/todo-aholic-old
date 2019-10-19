// Followed the publish-subscribe model shown in http://aspiringcraftsman.com/2011/12/08/solid-javascript-single-responsibility-principle/

class Event{
  constructor(name){
    this.name = name;
    this._handlers = [];
  }

  addHandler(handler){
    this._handlers.push(handler);
  }

  removeHandler(handler){
    const handlerIndex = this._handlers.indexOf(handler);
    if (handlerIndex !== -1){
      this._handlers.splice(handlerIndex, 1);
    }
  }

  runHandlers(args){
    console.log('Running event: ', this.name);
    console.log('Handlers: ', this._handlers);
    console.log('Args: ', args);
    this._handlers.forEach((handler) => {
      handler(args);
    });
  }
}

// Handle the list of Event objects
const EventAggregator = (() => {
  const events = [];

  const _getEvent = (name) => {
    for (let i = 0; i < events.length; i++){
      if (events[i].name === name){
        return events[i];
      }
    }
    return null;
  };

  const _tryGettingEvent = (eventName) => {
    let event = _getEvent(eventName);

    if (!event){
      event = new Event(eventName);
      events.push(event);
    }
    return event;
  };

  // For debugging
  const logEvents = () => {
    console.log(events);
  };

  const publish = (eventName, eventArgs) => {
    const event = _tryGettingEvent(eventName);
    event.runHandlers(eventArgs);
  };

  const subscribe = (eventName, newHandler) => {
    const event = _tryGettingEvent(eventName);
    event.addHandler(newHandler);
  };

  const unsubscribe = (eventName, handler) => {
    const event = _tryGettingEvent(eventName);
    event.removeHandler(handler);
  };

  return {
    publish,
    subscribe,
    unsubscribe,
    logEvents,
  };
})();

export {EventAggregator as Events};
