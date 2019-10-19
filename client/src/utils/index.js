export function removeFirst(array, testFunc){
  for (let i = 0; i < array.length; i++){
    if (testFunc(array[i])){
      array.splice(i, 1);
      return;
    }
  }
}
