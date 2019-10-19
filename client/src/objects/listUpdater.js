import {Events} from '../controllers/EventController';

class ListUpdater {
  constructor(listRef, listenEvents) {
    this.list = listRef;

    Events.subscribe(listenEvents.add, this.add.bind(this));
    Events.subscribe(listenEvents.removeFirst, this.removeFirst.bind(this));
    Events.subscribe(listenEvents.editFirst, this.editFirst.bind(this));
    Events.subscribe(listenEvents.changeList, this.changeList.bind(this));
  }

  add(item){
    this.list.push(item);
  }

  removeFirst(testFunc) {
    for (let i = 0; i < this.items.length; i++){
      if (testFunc(this.items[i])){
        this.items.splice(i, 1);
        return;
      }
    }
  }

  editFirst(args){
    const matchFunc = args.matchFunc;
    const modifyFunc = args.modifyFunc;
    for (let i = 0; i < this.items.length; i++){
      if (matchFunc(this.items[i])){
        this.items[i] = modifyFunc(this.items[i]);
        return;
      }
    }
  }

  changeList(newList) {
    // Goal is to copy over the newList into the current one without replacing the reference
    this.list.splice(0, this.list.length);
    this.list.push(...newList);
  }
}

export default ListUpdater;
