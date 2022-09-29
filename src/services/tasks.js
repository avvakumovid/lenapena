export const getRandomItam = length => {
  return Math.floor(Math.random() * length);
};

export const getRandomTasks = data => {
  const firstTaskIndex = getRandomItam(data.length);
  let secondTaskIndex;
  do {
    secondTaskIndex = getRandomItam(data.length);
  } while (firstTaskIndex === secondTaskIndex);
  return [data[firstTaskIndex], data[secondTaskIndex]];
};
