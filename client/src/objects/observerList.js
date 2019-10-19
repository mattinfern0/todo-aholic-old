import {Events} from '../controllers/EventController';

// Wraps around a list
class ObserverList{
  // eventNames: {addEvent: str, removeEvent: str}
  constructor(eventArgs){
    this.items = [];

    this._registerEventHandlers(eventArgs);
  }

  _registerEventHandlers(eventArgs){
    this.listChangedEvent = eventArgs.listChangedEvent;
    this.itemChangedEvent = eventArgs.itemChangedEvent;
    /* Have to use .bind(this) to bind 'this' keyword
        to the instance or else it'll be undefined */
    // Events.subscribe(eventArgs.addEvent, this.add.bind(this));

    if (eventArgs.editFirstEvent){
      Events.subscribe(eventArgs.editFirstEvent, this.editFirst.bind(this));
    }

    if (eventArgs.changeListEvent){
      Events.subscribe(eventArgs.changeListEvent, this.setList.bind(this));
    }

    if (eventArgs.removeFirstEvent){
      Events.subscribe(eventArgs.removeFirstEvent, this.removeFirst.bind(this));
    }
  }

  add(item){
    this.items.push(item);

    Events.publish(this.listChangedEvent);
  }

  removeFirst(testFunc){
    for (let i = 0; i < this.items.length; i++){
      if (testFunc(this.items[i])){
        this.items.splice(i, 1);

        Events.publish(this.listChangedEvent);
        return;
      }
    }
  }

  getList(){
    return this.items;
  }

  editFirst(args){
    const matchFunc = args.matchFunc;
    const modifyFunc = args.modifyFunc;
    for (let i = 0; i < this.items.length; i++){
      if (matchFunc(this.items[i])){
        this.items[i] = modifyFunc(this.items[i]);

        Events.publish(this.itemChangedEvent);
        return;
      }
    }
  }

  setList(newList){
    this.items = newList;
    Events.publish(this.listChangedEvent);
  }

  printList(){
    console.log(this.items);
  }
}

export default ObserverList;
