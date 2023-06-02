export const calculateResult = (data) => {
  let sum = 0;
  let currentOperator = '+';

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    if (!isNaN(Number(item))) {
      if (currentOperator === '+') {
        sum += Number(item);
      } else if (currentOperator === '-') {
        sum -= Number(item);
      } else if (currentOperator === '*') {
        sum *= Number(item);
      } else if (currentOperator === '/') {
        sum /= Number(item);
      }
    } else if (item === '+' || item === '-' || item === '*' || item === '/') {
      currentOperator = item;
    }
  }

  return sum;
};

export const checkError = (arr) => {
  const pattern = /(\+\+|--)/g;
  return pattern.test(arr.join(''));
};

export const checkOperator = (showInput, length) => {
  return ['+', '-', '*', '/'].includes(showInput[length - 1]);
};
