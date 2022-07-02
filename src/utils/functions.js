export const getIndexOfPokemons = (pokemons, find) => {
  let i = pokemons.findIndex(item => item.name === find[1]);
  return i + 1
}

export function createArrayFromObject(arrayObject) {
  const newArray = [];
  for (let index = 0; index < arrayObject.length; index++) {
    newArray.push(arrayObject[index].name);
  }
  return newArray;
}

export function getNameFromKey(pokemons, key) {
  const result = pokemons[key]
  return result
}

export function getKeyFromName(name, array) {

  let key = array.lastIndexOf(name);

  return key; //result
}


export function cleanLocationStr(arrLocations, item) {
  let result
  let { 2: lastLocation } = arrLocations

  if (lastLocation) {
    if (item === lastLocation['location_area']['name']) {
      result = item + '.'
    } else {
      result = item + ','
    }
  } else {
    result = item
  }
  result = result.replaceAll('-', ' ')
  result = result.charAt(0).toUpperCase() + result.slice(1);
  return result
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}