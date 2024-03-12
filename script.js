const output = document.getElementById('output');
const form = document.getElementById('calc_form');
const operandButtons = document.querySelectorAll('button[data-type=operand]');
const operatorButtons = document.querySelectorAll('button[data-type=operator]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

let isOperator = false;
let equation = [];

const removeActive = () => {
  operatorButtons.forEach((btn) => {
    btn.classList.remove('active');
  });
};

operandButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    removeActive();
    if (output.value === '0') {
      output.value = e.target.value;
    } else if (isOperator) {
      isOperator = false;
      output.value = e.target.value;
    } else if (output.value.includes('.')) {
      output.value = `${output.value}${e.target.value.replace('.', '')}`;
    } else {
      output.value = `${output.value}${e.target.value}`;
    }
  });
});

operatorButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    removeActive();
    e.currentTarget.classList.add('active');

    switch (e.target.value) {
      case '%':
        output.value = parseFloat(output.value) / 100;
        break;
      case 'invert':
        output.value = parseFloat(output.value) * -1;
        break;
      case '=':
        equation.push(output.value);
        output.value = eval(equation.join(''));
        equation = [];
        break;
      default:
        const lastItem = equation[equation.length - 1];
        if (['/', '*', '+', '-'].includes(lastItem) && isOperator) {
          equation.pop();
          equation.push(e.target.value);
        } else {
          equation.push(output.value);
          equation.push(e.target.value);
        }
        isOperator = true;
        break;
    }
  });
});
