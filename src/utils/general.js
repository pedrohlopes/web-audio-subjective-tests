function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function getRandomIndexes(array){
    let indexes = []
    for (let i = 0; i < array.length; i++){
        indexes.push(i)
    }
    return shuffle(indexes)
}

function shuffleArrayByIndexes(array, indexes){
    let newArray = []
    for (let i = 0; i < array.length; i++){
        newArray.push(array[indexes[i]])
    }
    return newArray
}

export {shuffle,getRandomIndexes,shuffleArrayByIndexes}