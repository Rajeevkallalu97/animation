const swap = (array, i, j) => {
  let c = array[i];
  array[i] = array[j];
  array[j] = c;
  return array;
};

const insertion = (array, position, arraySteps, colorSteps) => {
  let colorKey = colorSteps[colorSteps.length - 1].slice();

  for (let i = 0; i < array.length; i++) {
    let j = i - 1;
    while (j >= 0 && array[j] > array[j + 1]) {
      swap(array, j, j + 1);
      arraySteps.push(array.slice());
      colorKey[j] = 1;
      colorKey[j + 1] = 1;
      colorSteps.push(colorKey.slice());
      colorKey[j] = 0;
      colorKey[j + 1] = 0;

      j -= 1;
    }
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());
  }

  colorSteps[colorSteps.length - 1] = new Array(array.length).fill(2);
  return;
};

export default insertion;
