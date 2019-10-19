export function removeFirst(array, testFunc){
  for (let i = 0; i < array.length; i++){
    if (testFunc(array[i])){
      array.splice(i, 1);
      return;
    }
  }
}

export function editFirst(array, testFunc, modifyFunc) {
  console.log('editFirst testFunc: ',testFunc);
  for (let i = 0; i < array.length; i++) {
    if (testFunc(array[i])) {
      array[i] = modifyFunc(array[i]);
      return;
    }
  }
}
