// Followed the publish-subscribe model shown in http://aspiringcraftsman.com/2011/12/08/solid-javascript-single-responsibility-principle/

/* Maps an event (the name string) to a list of handlers to run
   whenever the event "occurs"*/
const EventTypes = Object.freeze({
    addTask: "addTask",
    removeTask: "removeTask",
    editTask: "editTask",
    editTaskById: "editTaskById",
    getTaskDetail: "getTaskDetail",
    deleteTaskById: "deleteTaskById",
    addProject: "addProject",
    removeProject: "removeProject",
    changeProject: "changeProject",
    changeProjectList: "changeProjectList"
});

const APIMessengerTypes = Object.freeze({
    addTask: "apiAddTask",
    deleteTask: "apiRemoveTask",
    editTask: "apiEditTask",
    
    addProject: "apiAddProject",
    removeProject: "apiRemoveProject",
    changeProject: "apiChangeProject",
    changeProjectList: "apiChangeProjectList"
})

class Event{
    constructor(name){
        this.name = name;
        this._handlers = [];
    }

    addHandler(handler){
        this._handlers.push(handler);
    }

    removeHandler(handler){
        let handlerIndex = this._handlers.indexOf(handler);
        if (handlerIndex !== -1){
            this._handlers.splice(handlerIndex, 1);
        }
    }

    runHandlers(args){
        this._handlers.forEach((handler) => {
            handler(args);
        })
    }
}

// Handle the list of Event objects
const EventAggregator = (function(){
    var events = []

    var _getEvent = (name) => {
        for (let i = 0; i < events.length; i++){
            if (events[i].name === name){
                return events[i];
            }
        }
        return null;
    }

    var _tryGettingEvent = (eventName) => {
        var event = _getEvent(eventName);

        if (!event){
            event = new Event(eventName);
            events.push(event);
        }
        return event;
    }

    // For debugging
    var logEvents = () => {
        console.log(events);
    }
 
    var publish = (eventName, eventArgs) => {
        var event = _tryGettingEvent(eventName);
        event.runHandlers(eventArgs);
    }

    var subscribe = (eventName, newHandler) => {
        var event = _tryGettingEvent(eventName);
        event.addHandler(newHandler)
    }

    var unsubscribe = (eventName, handler) => {
        var event = _tryGettingEvent(eventName);
        event.removeHandler(handler);
    }

    return {
        publish,
        subscribe,
        unsubscribe,
        logEvents
    }
})();

export {EventAggregator as Events, EventTypes, APIMessengerTypes};