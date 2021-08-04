const merge = (dupBlocks, l, mid, r, arraySteps) => {
  let i = l,
    j = mid + 1;

  const arr = [];

  while (i <= mid && j <= r) {
    if (dupBlocks[i] <= dupBlocks[j]) {
      arr.push(dupBlocks[i++]);
    } else {
      arr.push(dupBlocks[j++]);
    }
  }

  while (i <= mid) {
    arr.push(dupBlocks[i++]);
  }

  while (j <= r) {
    arr.push(dupBlocks[j++]);
  }

  for (i = l; i <= r; i++) {
    dupBlocks[i] = arr[i - l];
    console.log(dupBlocks, dupBlocks[i]);
  }
  console.log(arr);
};

const mergeSortHelper = (dupBlocks, l, r, arraySteps) => {
  if (l >= r) return;

  const mid = l + parseInt((r - l) / 2);

  mergeSortHelper(dupBlocks, l, mid, arraySteps);

  mergeSortHelper(dupBlocks, mid + 1, r, arraySteps);

  merge(dupBlocks, l, mid, r, arraySteps);
};

const mergeSort = (blocks, arraySteps, colorSteps) => {
  //   let colorKey = colorSteps[colorSteps.length - 1].slice();

  mergeSortHelper(blocks, 0, blocks.length - 1, arraySteps);

  for (let i = 0; i < blocks.length; i++) {}
  return;
};

export default mergeSort;
